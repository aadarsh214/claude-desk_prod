import { Home, LayoutTemplate, Compass, Clock, Wallet, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutTemplate, label: "Templates", href: "/templates" },
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: Clock, label: "History", href: "/history" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
];

const conversations = {
  Tomorrow: [
    "What's one lesson life has taught you r...",
    "What's one mistake that taught you a val...",
    "What's one goal that excites you the mos...",
  ],
  "10 daysAgo": [
    "If animals could talk, which one would be...",
    "What's one word to describe your day?",
    "What's one habit you want to break?",
  ],
};

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300",
        isOpen ? "w-64" : "w-0 overflow-hidden"
      )}
    >
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">Axora</span>
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search chats"
            className="h-9 bg-sidebar-accent pl-9 text-sm"
          />
        </div>
      </div>

      <nav className="space-y-1 px-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>

      <ScrollArea className="flex-1 px-2 py-4">
        {Object.entries(conversations).map(([timeLabel, items]) => (
          <div key={timeLabel} className="mb-4">
            <h3 className="mb-2 px-2 text-xs font-medium text-muted-foreground">
              {timeLabel}
            </h3>
            <div className="space-y-1">
              {items.map((conv, idx) => (
                <button
                  key={idx}
                  className="w-full truncate rounded-md px-2 py-1.5 text-left text-sm text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  {conv}
                </button>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
};
