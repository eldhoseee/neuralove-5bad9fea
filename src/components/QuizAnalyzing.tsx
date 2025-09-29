import { Card } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";

const QuizAnalyzing = () => {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center space-y-6">
          {/* Animated Brain Icon */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            <div className="relative bg-primary rounded-full p-5 shadow-glow">
              <Brain className="w-10 h-10 text-primary-foreground animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Analyzing Your Mind
              <Sparkles className="w-5 h-5 text-primary" />
            </h2>
            <p className="text-muted-foreground">
              Our AI is processing your responses to reveal your unique cognitive profile...
            </p>
          </div>

          {/* Loading Animation */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            {/* Progress steps */}
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Processing 24 cognitive responses</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                <span>Identifying thinking patterns</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span>Generating personalized insights</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            This usually takes 5-10 seconds
          </p>
        </div>
      </Card>
    </div>
  );
};

export default QuizAnalyzing;