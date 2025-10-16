import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatArea } from "./ChatArea";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <ChatArea />
      </div>
    </div>
  );
};
