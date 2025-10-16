import { useState } from "react";
import { Paperclip, Sparkles, Globe, Mic } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div className="mb-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 border-border bg-secondary hover:bg-secondary/80"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 border-border bg-secondary hover:bg-secondary/80"
          >
            <Sparkles className="h-4 w-4" />
            Create an image
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 border-border bg-secondary hover:bg-secondary/80"
          >
            <Globe className="h-4 w-4" />
            Search the web
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="ml-auto border-border bg-secondary hover:bg-secondary/80"
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message AI Chat..."
            className="min-h-[60px] resize-none border-border bg-input pr-12 text-foreground placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim()}
            className="absolute bottom-2 right-2 h-8 w-8 bg-primary hover:bg-primary/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m5 12 7-7 7 7" />
              <path d="M12 19V5" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
};
