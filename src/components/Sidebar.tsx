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
  return (
    <aside
      className={`flex flex-col border-r border-border bg-background transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      {isOpen && (
        <>
          <div className="flex flex-col gap-2 p-4 border-b border-border">
            <Button onClick={onNewChat} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="py-2">
              <ConversationList
                selectedId={selectedConversation}
                onSelect={onSelectConversation}
              />
            </div>
          </ScrollArea>
        </>
      )}
    </aside>
  );
};
