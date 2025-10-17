import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex gap-4 px-4 py-6 animate-slide-up-fade">
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>

      <div className="flex items-center gap-1 glass-card px-4 py-3 rounded-2xl">
        <div 
          className="h-2 w-2 rounded-full bg-primary"
          style={{ animation: 'typing-dots 1.4s infinite', animationDelay: '0s' }}
        />
        <div 
          className="h-2 w-2 rounded-full bg-primary"
          style={{ animation: 'typing-dots 1.4s infinite', animationDelay: '0.2s' }}
        />
        <div 
          className="h-2 w-2 rounded-full bg-primary"
          style={{ animation: 'typing-dots 1.4s infinite', animationDelay: '0.4s' }}
        />
      </div>
    </div>
  );
};
