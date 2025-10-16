import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatArea } from "./ChatArea";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const handleNewChat = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        onNewChat={handleNewChat}
      />
      
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <ChatArea 
          conversationId={selectedConversation}
          onConversationCreated={setSelectedConversation}
        />
      </div>
    </div>
  );
};
