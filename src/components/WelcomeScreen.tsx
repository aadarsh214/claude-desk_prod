import { Sparkles, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export const WelcomeScreen = () => {
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
    <div className="flex h-full flex-col items-center justify-center px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">
          How can I help you today?
        </h1>
        <p className="text-lg text-muted-foreground">
          Start a conversation by typing a message below
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        {suggestions.map((suggestion, idx) => (
          <Card key={idx} className="cursor-pointer transition-all hover:bg-accent">
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold text-foreground">{suggestion.title}</h3>
              <p className="text-sm text-muted-foreground">{suggestion.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};