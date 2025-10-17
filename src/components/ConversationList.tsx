import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { MessageSquare, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  title: string;
  updated_at: string;
}

interface ConversationListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const ConversationList = ({ selectedId, onSelect }: ConversationListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadConversations();
      
      // Subscribe to changes
      const channel = supabase
        .channel('conversations-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'conversations',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            loadConversations();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('conversations')
      .select('id, title, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }

    setConversations(data || []);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete conversation',
        variant: 'destructive',
      });
      return;
    }

    if (selectedId === id) {
      onSelect('');
    }

    toast({
      title: 'Success',
      description: 'Conversation deleted',
    });
  };

  return (
    <div className="flex flex-col gap-1 px-2">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-200 ${
            selectedId === conv.id
              ? 'glass-card bg-primary/5 text-primary shadow-sm'
              : 'hover:glass-card hover:bg-secondary/40'
          }`}
        >
          <MessageSquare className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 truncate text-sm font-medium">{conv.title}</span>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10 hover:text-destructive rounded-lg"
            onClick={(e) => handleDelete(conv.id, e)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ))}
    </div>
  );
};
