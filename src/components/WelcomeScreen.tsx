import { Sparkles, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface WelcomeScreenProps {
  onSelectSuggestion?: (text: string) => void;
}

export const WelcomeScreen = ({ onSelectSuggestion }: WelcomeScreenProps) => {
  const suggestions = [{
    title: "Smart Budget",
    description: "A budget that fits your lifestyle, not the other way around"
  }, {
    title: "Analytics",
    description: "Analytics empowers individuals and businesses to make smarter"
  }, {
    title: "Spending",
    description: "Spending is the way individuals and businesses use their financial"
  }];
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-12 text-center animate-fade-in-up">
        <h1 className="mb-4 text-6xl font-semibold text-foreground leading-[75px] bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          How can I help you today?
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Start a conversation by typing a message below
        </p>
      </div>

      <div className="hidden sm:grid w-full max-w-4xl grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
        {suggestions.map((suggestion, idx) => (
          <Card 
            key={idx}
            role="button"
            tabIndex={0}
            aria-label={`Start with ${suggestion.title}`}
            onClick={() => onSelectSuggestion?.(suggestion.title)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectSuggestion?.(suggestion.title);
              }
            }}
            className="cursor-pointer glass-card glass-hover border-border/50 group outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <CardContent className="p-5">
              <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary transition-colors">{suggestion.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};