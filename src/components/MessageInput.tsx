import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput = (props: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !props.disabled) {
      props.onSend(message);
      setMessage("");
    }
  };

  const handleContainerClick = () => {
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-background/80 backdrop-blur-lg p-3 sm:p-4">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div 
          onClick={handleContainerClick}
          className="relative flex items-end gap-2 rounded-2xl glass-card p-3 sm:p-4 shadow-lg transition-all duration-300 focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary/20 cursor-text min-h-[56px]"
        >
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message Axora AI..."
            className="min-h-[24px] max-h-[200px] resize-none border-0 bg-transparent px-0 py-0 focus-visible:ring-0 placeholder:text-muted-foreground/70 text-base"
            rows={1}
            disabled={props.disabled}
          />
          
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
            disabled={!message.trim() || props.disabled}
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  );
};
