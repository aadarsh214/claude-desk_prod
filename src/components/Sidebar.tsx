import { Plus, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ConversationList } from "./ConversationList";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export const Sidebar = ({ 
  isOpen, 
  onToggle, 
  selectedConversation, 
  onSelectConversation, 
  onNewChat 
}: SidebarProps) => {
  const handleSelect = (id: string) => {
    onSelectConversation(id);
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  const handleNewChat = () => {
    onNewChat();
    if (window.innerWidth < 768) {
      onToggle();
    }
  };
  return (
    <aside
      className={`flex flex-col glass-sidebar backdrop-blur-xl bg-background/70 border-r border-border/50 transition-all duration-300 z-40 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      {isOpen && (
        <>
          <div className="flex flex-col gap-2 p-4 border-b border-border/50">
            <Button 
              onClick={handleNewChat} 
              className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                placeholder="Search conversations..."
                className="pl-9 glass-card border-border/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 custom-scrollbar">
            <div className="py-2 px-2">
              <ConversationList
                selectedId={selectedConversation}
                onSelect={handleSelect}
              />
            </div>
          </ScrollArea>
        </>
      )}
    </aside>
  );
};
