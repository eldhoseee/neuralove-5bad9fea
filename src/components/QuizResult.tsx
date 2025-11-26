import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultCard } from "@/components/ui/result-card";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { Brain, Heart, Sparkles, Share2, ArrowRight, CheckCircle, Users, MessageCircle, Compass, ToggleLeft, ToggleRight, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getInsightsForType } from "@/utils/cognitiveInsightsData";
import { ResultFeedbackForm } from "@/components/ResultFeedbackForm";

interface QuizResultProps {
  cognitiveType: string;
  explanation: string;
  motivation: string;
  onClose: () => void;
  onFindMatches: () => void;
  isForCouple?: boolean;
  coupleNames?: { person1Name: string; person2Name: string } | null;
  quizAnswers?: boolean[];
  profileData?: { id: string; name: string; age: number; gender: string };
}

interface CognitiveInsights {
  keyStrengths: string[];
  idealMatches: string[];
  relationshipDynamics: string[];
  relationshipLikes: string[];
  relationshipHates: string[];
}

const QuizResult = ({ cognitiveType, explanation, motivation, onClose, onFindMatches, isForCouple = false, coupleNames, quizAnswers, profileData }: QuizResultProps) => {
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  const [insights, setInsights] = useState<CognitiveInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [savedResponseId, setSavedResponseId] = useState<string | null>(null);
  const { toast } = useToast();

  // Save quiz response to database
  useEffect(() => {
    const saveQuizResponse = async () => {
      try {
        console.log('=== SAVING QUIZ RESPONSE ===');
        console.log('Session ID:', sessionId);
        console.log('Cognitive Type:', cognitiveType);
        console.log('Profile Data:', profileData);
        
        // Only insert columns that exist in quiz_responses table
        const { data, error } = await supabase.from('quiz_responses').insert({
          session_id: sessionId,
          cognitive_type: cognitiveType,
          answers: quizAnswers || [],
        }).select('id').single();

        if (error) {
          // Silently fail if table doesn't exist yet
          if (!error?.message?.includes('Could not find the table')) {
            console.error('Error saving quiz response:', error);
          }
          return;
        }
        if (data) {
          console.log('Quiz response saved with ID:', data.id);
          setSavedResponseId(data.id);
        }

        // Update the user's profile with their cognitive type
        if (profileData?.id) {
          console.log('=== UPDATING PROFILE ===');
          console.log('Profile ID:', profileData.id);
          console.log('Updating to cognitive type:', cognitiveType);
          
          const { data: updateData, error: updateError } = await supabase
            .from('profiles')
            .update({ cognitive_type: cognitiveType })
            .eq('id', profileData.id)
            .select();

          if (updateError) {
            console.error('❌ Error updating profile cognitive type:', updateError);
          } else {
            console.log('✅ Successfully updated profile with cognitive type');
            console.log('Updated data:', updateData);
          }
        } else {
          console.warn('⚠️ No profile ID available to update. ProfileData:', profileData);
        }
      } catch (error: any) {
        // Silently fail if table doesn't exist yet
        if (!error?.message?.includes('Could not find the table')) {
          console.error('Error saving quiz response:', error);
        }
      }
    };

    saveQuizResponse();
  }, [sessionId, cognitiveType, quizAnswers, motivation, explanation, profileData]);

  useEffect(() => {
    const generateInsights = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-cognitive-insights', {
          body: { 
            cognitiveType,
            quizAnswers,
            profileData
          }
        });
        
        const ensureArray = (v: any): string[] => Array.isArray(v) ? v.map((x) => String(x)) : [];
        const localFallback = getInsightsForType(cognitiveType);
        
        if (error) {
          console.error('Error generating insights, using local data:', error);
          setInsights(localFallback);
        } else {
          const normalized = {
            keyStrengths: ensureArray((data as any)?.keyStrengths),
            idealMatches: ensureArray((data as any)?.idealMatches),
            relationshipDynamics: ensureArray((data as any)?.relationshipDynamics),
            relationshipLikes: ensureArray((data as any)?.relationshipLikes),
            relationshipHates: ensureArray((data as any)?.relationshipHates),
          } as CognitiveInsights;
          
          // Use local fallback for any empty arrays
          setInsights({
            keyStrengths: normalized.keyStrengths.length ? normalized.keyStrengths : localFallback.keyStrengths,
            idealMatches: normalized.idealMatches.length ? normalized.idealMatches : localFallback.idealMatches,
            relationshipDynamics: normalized.relationshipDynamics.length ? normalized.relationshipDynamics : localFallback.relationshipDynamics,
            relationshipLikes: normalized.relationshipLikes.length ? normalized.relationshipLikes : localFallback.relationshipLikes,
            relationshipHates: normalized.relationshipHates.length ? normalized.relationshipHates : localFallback.relationshipHates,
          });
        }
      } catch (error) {
        console.error('Error calling insights function, using local data:', error);
        setInsights(getInsightsForType(cognitiveType));
      } finally {
        setIsLoadingInsights(false);
      }
    };

    generateInsights();
  }, [cognitiveType, toast]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <Card className="p-6 md:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 text-2xl"
          >
            ×
          </button>

          {/* Hero Header with Gradient Background */}
          <div className="text-center mb-8 -mx-6 md:-mx-8 -mt-6 md:-mt-8 p-8 md:p-12 pb-10 bg-gradient-to-br from-primary/10 via-accent/5 to-background rounded-t-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Your Result</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 pb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {cognitiveType}
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {motivation}
            </p>

            {/* Primary CTA - Most Prominent */}
            <Button 
              size="lg" 
              onClick={onFindMatches}
              className="group shadow-glow hover:shadow-xl transition-all duration-300 text-lg px-8 py-6 mb-4"
            >
              <Heart className="w-5 h-5 mr-2" />
              <span>Find Your Mind Matches</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-xs text-muted-foreground">Discover people who think like you</p>
          </div>

          <div className="space-y-6">
            {/* Key Strengths - Always Visible, Compact */}
            <ResultCard variant="base">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Your Key Strengths
              </h3>
              {isLoadingInsights ? (
                <LoadingIndicator message="Loading..." />
              ) : (
                <div className="grid md:grid-cols-2 gap-2">
                  {insights?.keyStrengths?.map((strength, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-background/50 rounded text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{strength}</span>
                    </div>
                  ))}
                </div>
              )}
            </ResultCard>

            {/* Compact Likes/Dislikes Grid */}
            <>
              <div className="grid md:grid-cols-2 gap-4">
                  {/* What You Value */}
                  <ResultCard variant="accent">
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-accent" />
                      You Value
                    </h3>
                    {isLoadingInsights ? (
                      <LoadingIndicator message="Loading..." />
                    ) : (
                      <div className="space-y-2">
                        {insights?.relationshipLikes?.map((like, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-background/50 rounded text-sm">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <p className="text-foreground">{like}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </ResultCard>

                  {/* Dealbreakers */}
                  <ResultCard variant="secondary">
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                      <ThumbsDown className="w-5 h-5 text-secondary" />
                      Dealbreakers
                    </h3>
                    {isLoadingInsights ? (
                      <LoadingIndicator message="Loading..." />
                    ) : (
                      <div className="space-y-2">
                        {insights?.relationshipHates?.map((hate, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-background/50 rounded text-sm">
                            <div className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0">⚠️</div>
                            <p className="text-foreground">{hate}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </ResultCard>
                </div>

                {/* Ideal Matches - Compact Cards */}
                <ResultCard variant="primary">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Best Match Types
                  </h3>
                  {isLoadingInsights ? (
                    <LoadingIndicator message="Loading..." />
                  ) : (
                    <div className="space-y-3">
                      {insights?.idealMatches?.map((match, index) => {
                        // Extract type name and description
                        const [typeName, ...descParts] = match.split(':');
                        const description = descParts.join(':').trim();
                        
                        return (
                          <div 
                            key={index} 
                            className="group p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                                <Heart className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm text-primary mb-1">{typeName}</h4>
                                {description && (
                                  <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ResultCard>

                {/* Relationship Dynamics - Compact */}
                <ResultCard variant="base">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Your Relationship Style
                  </h3>
                  {isLoadingInsights ? (
                    <LoadingIndicator message="Loading..." />
                  ) : (
                    <div className="space-y-2">
                      {insights?.relationshipDynamics?.map((style, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-background/50 rounded text-sm">
                          <Compass className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-foreground">{style}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ResultCard>
              </>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 pb-4">
            <Button 
              size="default" 
              variant="outline" 
              className="flex-1 border-foreground/20"
              onClick={() => {
                toast({
                  title: "Coming Soon! 🚀",
                  description: "Share feature will be available soon!",
                });
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Your Result
            </Button>
          </div>

          {/* Blurred Potential Matches Preview - Streamlined */}
          <div className="mt-4 space-y-2 border-t border-border/30 pt-4">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-foreground">Preview Your Matches</h3>
              <p className="text-xs text-muted-foreground">Click "Find Your Mind Matches" to see profiles</p>
            </div>
            
            <div 
              onClick={onFindMatches}
              className="relative cursor-pointer group"
            >
              {/* Blur overlay */}
              <div className="absolute inset-0 z-10 backdrop-blur-md bg-background/30 rounded-lg flex items-center justify-center group-hover:bg-background/40 transition-all">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs font-semibold text-foreground">Tap to View Matches</p>
                </div>
              </div>

              {/* Floating Profile Icons - Compact Grid */}
              <div className="grid grid-cols-6 md:grid-cols-8 gap-3 p-4">
                {[
                  { name: "Sarah", age: 28, match: "95%" },
                  { name: "James", age: 31, match: "92%" },
                  { name: "Emma", age: 26, match: "89%" },
                  { name: "Alex", age: 29, match: "87%" },
                  { name: "Maya", age: 27, match: "85%" },
                  { name: "Ryan", age: 30, match: "83%" },
                  { name: "Lisa", age: 25, match: "92%" },
                  { name: "David", age: 32, match: "88%" },
                ].map((profile, index) => (
                  <div key={index} className="relative group/avatar">
                    {/* Blurred floating profile icon with soft faded edges */}
                    <div 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full blur-[3px] group-hover/avatar:blur-[2px] transition-all duration-300"
                      style={{
                        background: `radial-gradient(circle, hsl(${315 + index * 30}, 65%, 55%) 0%, hsl(${200 + index * 40}, 65%, 60%) 50%, transparent 100%)`,
                        opacity: 0.5
                      }}
                    >
                      {/* Profile silhouette */}
                      <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                        {/* Face */}
                        <div className="absolute w-1/3 h-1/3 top-1/4 bg-white/30 rounded-full blur-[0.5px]"></div>
                        {/* Body */}
                        <div className="absolute w-2/3 h-1/2 bottom-0 bg-white/20 rounded-t-full blur-[0.5px]"></div>
                      </div>
                    </div>
                    
                    {/* Match percentage badge */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary/90 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-lg backdrop-blur-sm">
                      {profile.match.replace('%', '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Rating & Feedback */}
          <div className="mt-6 pt-6 border-t border-border/30">
            <div className="text-center mb-4">
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                Rate Your Experience
              </h4>
              <ResultFeedbackForm 
                sessionId={sessionId}
                feedbackType="quiz"
                relatedResponseId={savedResponseId || undefined}
                compactMode={true}
              />
            </div>
            
            <details className="group mt-4">
              <summary className="cursor-pointer list-none flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">Share detailed feedback</span>
                </div>
                <span className="text-xs text-muted-foreground group-open:hidden">Optional</span>
              </summary>
              <div className="mt-4">
                <ResultFeedbackForm 
                  sessionId={sessionId}
                  feedbackType="quiz"
                  relatedResponseId={savedResponseId || undefined}
                  compactMode={false}
                  showRating={false}
                />
              </div>
            </details>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizResult;