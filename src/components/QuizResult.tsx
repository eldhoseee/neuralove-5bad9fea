import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Heart, Sparkles, Share2, ArrowRight, CheckCircle, Users, MessageCircle, Compass, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QuizResultProps {
  cognitiveType: string;
  explanation: string;
  motivation: string;
  onClose: () => void;
  onFindMatches: () => void;
}

interface CognitiveInsights {
  keyStrengths: string[];
  idealMatches: string[];
  relationshipDynamics: string[];
  validationStatements: string[];
}

const QuizResult = ({ cognitiveType, explanation, motivation, onClose, onFindMatches }: QuizResultProps) => {
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [insights, setInsights] = useState<CognitiveInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const generateInsights = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-cognitive-insights', {
          body: { cognitiveType }
        });
        
        if (error) {
          console.error('Error generating insights:', error);
          toast({
            title: "Insights Loading Failed",
            description: "Using default insights instead.",
            variant: "destructive"
          });
        } else {
          setInsights(data);
        }
      } catch (error) {
        console.error('Error calling insights function:', error);
      } finally {
        setIsLoadingInsights(false);
      }
    };

    generateInsights();
  }, [cognitiveType, toast]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card className="p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 text-2xl"
          >
            ×
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 text-primary mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6" />
                <span className="font-semibold">Your Cognitive Profile</span>
              </div>
              
              <button
                onClick={() => setIsSimpleMode(!isSimpleMode)}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                title={isSimpleMode ? "Switch to detailed view" : "Switch to simple view"}
              >
                {isSimpleMode ? (
                  <>
                    <ToggleLeft className="w-4 h-4" />
                    <span>Simple</span>
                  </>
                ) : (
                  <>
                    <ToggleRight className="w-4 h-4" />
                    <span>Detailed</span>
                  </>
                )}
              </button>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              You're {cognitiveType}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {explanation}
            </p>
          </div>

          {/* Simple Mode Content */}
          {isSimpleMode ? (
            <div className="space-y-6">
              {/* Basic Explanation */}
              <Card className="p-6 bg-muted/30">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Your Cognitive Profile
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {explanation}
                </p>
              </Card>

              {/* Superpower */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Your Superpower
                </h3>
                <p className="text-foreground leading-relaxed font-medium">
                  {motivation}
                </p>
              </Card>
            </div>
          ) : (
            /* Detailed Mode Content */
            <div className="space-y-8">
              {/* Cognitive Profile */}
              <Card className="p-6 bg-muted/30">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Your Cognitive Profile
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {explanation}
                </p>
                
                {/* Key Strengths */}
                <div className="mt-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Key Strengths
                  </h4>
                  {isLoadingInsights ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>AI is analyzing your unique strengths...</span>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {insights?.keyStrengths?.map((strength, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{strength}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* Validation Statements */}
              <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  What Makes You Special
                </h3>
                {isLoadingInsights ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating personalized insights...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {insights?.validationStatements?.map((validation, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <p className="text-foreground">{validation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Ideal Matches */}
              <Card className="p-6 bg-gradient-to-br from-secondary/5 to-primary/5 border-secondary/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  Your Ideal Mind Matches
                </h3>
                {isLoadingInsights ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Finding compatible cognitive types...</span>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {insights?.idealMatches?.map((match, index) => (
                      <div key={index} className="p-4 bg-background/50 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">{match}</h4>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Relationship Dynamics */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Your Relationship Style
                </h3>
                {isLoadingInsights ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing relationship insights...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {insights?.relationshipDynamics?.map((style, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
                        <Compass className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-foreground">{style}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Superpower */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Your Superpower
                </h3>
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  {motivation}
                </p>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button 
              size="lg" 
              onClick={onFindMatches}
              className="flex-1 group shadow-glow hover:shadow-xl transition-all duration-300"
            >
              <span className="mr-2">Find Your Mind Matches</span>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-foreground/30 text-foreground hover:bg-foreground/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Result
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizResult;