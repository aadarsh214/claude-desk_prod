import { useState, useEffect } from "react";
import { X, MessageSquare, Send, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface TutorialProps {
  onClose: () => void;
}

export const Tutorial = ({ onClose }: TutorialProps) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: MessageSquare,
      title: "Welcome to Axora AI",
      description: "Let's take a quick tour to get you started with your AI assistant",
    },
    {
      icon: Send,
      title: "Start Chatting",
      description: "Click anywhere in the chat field at the bottom to start typing your message. Press Enter to send or Shift+Enter for new line",
    },
    {
      icon: Menu,
      title: "Your Conversations",
      description: "Access your chat history anytime from the sidebar. All your conversations are automatically saved",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in">
      <Card className="w-full max-w-md glass-card shadow-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-2xl font-semibold mb-3 text-foreground">
            {currentStep.title}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === step
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {step < steps.length - 1 ? (
                <>
                  <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                    Skip
                  </Button>
                  <Button onClick={handleNext} className="bg-gradient-to-br from-primary to-accent">
                    Next
                  </Button>
                </>
              ) : (
                <Button onClick={handleNext} className="bg-gradient-to-br from-primary to-accent">
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
