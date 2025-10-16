import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput = (props: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !props.disabled) {
      props.onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl relative flex items-end gap-2 rounded-2xl border border-border bg-background p-3">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Message Axora AI..."
          className="min-h-[24px] max-h-[200px] resize-none border-0 bg-transparent px-0 py-0 focus-visible:ring-0"
          rows={1}
          disabled={props.disabled}
        />
        
        <Button
          type="submit"
          size="icon"
          className="h-8 w-8 flex-shrink-0"
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
      </form>
    </div>
  );
};
