import { Sparkles, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
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
  return <div className="flex h-full flex-col items-center justify-center px-4 py-8">
      <div className="mb-8 animate-pulse-glow">
        
      </div>

      <div className="mb-12 text-center animate-fade-in">
        <h1 className="mb-2 text-3xl font-semibold text-foreground">
          Good Evening, DeepAI.
        </h1>
        <p className="text-xl text-muted-foreground">
          Can I help you with anything?
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3 animate-fade-in-up">
        {suggestions.map((suggestion, idx) => {})}
      </div>
    </div>;
};