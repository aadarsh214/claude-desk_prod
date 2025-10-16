import { Menu, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Select defaultValue="sonnet">
          <SelectTrigger className="w-[200px] border-border bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sonnet">AI Assistant</SelectItem>
            <SelectItem value="opus">AI Pro</SelectItem>
            <SelectItem value="haiku">AI Fast</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="ghost" size="sm" className="gap-2">
        <Plus className="h-4 w-4" />
        New Chat
      </Button>
    </header>
  );
};
