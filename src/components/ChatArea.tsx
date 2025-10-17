import { useState, useEffect, useRef } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { MessageInput } from "./MessageInput";
import { Message } from "./Message";
import { TypingIndicator } from "./TypingIndicator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface MessageType {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ChatAreaProps {
  conversationId: string | null;
  onConversationCreated: (id: string) => void;
}

export const ChatArea = ({ conversationId, onConversationCreated }: ChatAreaProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (conversationId) {
      loadMessages();
      
      // Subscribe to new messages
      const channel = supabase
        .channel(`messages-${conversationId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            const newMessage = payload.new as MessageType;
            if (!streaming) {
              setMessages((prev) => [...prev, newMessage]);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setMessages([]);
    }
  }, [conversationId, streaming]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const loadMessages = async () => {
    if (!conversationId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
    } else {
      setMessages((data || []) as MessageType[]);
    }
    setLoading(false);
  };

  const handleSend = async (message: string) => {
    if (!user || !session) return;

    let currentConvId = conversationId;

    // Create new conversation if needed
    if (!currentConvId) {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
        })
        .select()
        .single();

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create conversation',
          variant: 'destructive',
        });
        return;
      }

      currentConvId = data.id;
      onConversationCreated(currentConvId);
    }

    // Add user message optimistically
    const tempUserMessage: MessageType = {
      id: 'temp-' + Date.now(),
      role: 'user',
      content: message,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);
    setStreaming(true);
    setStreamingContent('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            conversationId: currentConvId,
            message,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullContent += parsed.content;
                  setStreamingContent(fullContent);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      setStreaming(false);
      setStreamingContent('');
      
      // Reload messages to get the final saved messages
      await loadMessages();
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
      setStreaming(false);
      setStreamingContent('');
    }
  };

  if (!conversationId && messages.length === 0) {
    return (
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <WelcomeScreen />
        </div>
        <MessageInput onSend={handleSend} disabled={streaming} />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="animate-pulse-soft">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl py-6">
            {messages.map((msg) => (
              <Message key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {streaming && streamingContent && (
              <Message role="assistant" content={streamingContent} />
            )}
            {streaming && !streamingContent && (
              <TypingIndicator />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <MessageInput onSend={handleSend} disabled={streaming} />
    </main>
  );
};
