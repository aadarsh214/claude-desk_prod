import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatArea } from "./ChatArea";
import { Tutorial } from "./Tutorial";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  const handleNewChat = () => {
    setSelectedConversation(null);
  };

  return (
    <>
      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}
      
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <Sidebar
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          onNewChat={handleNewChat}
        />
        {/* Mobile overlay to close sidebar on outside click */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <div className="flex flex-1 flex-col min-w-0">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <ChatArea 
            conversationId={selectedConversation}
            onConversationCreated={setSelectedConversation}
          />
        </div>
      </div>
    </>
  );
};
