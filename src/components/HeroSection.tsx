import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Sparkles, Users } from "lucide-react";
import heroImage from "@/assets/hero-mindmatch.jpg";
import CognitiveQuiz from "./CognitiveQuiz";
import QuizResult from "./QuizResult";
import { CoupleCompatibilityResult } from "./CoupleCompatibilityResult";
import UserProfileForm from "./UserProfileForm";
import CoupleNamesForm from "./CoupleNamesForm";
import QuizAnalyzing from "./QuizAnalyzing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { analyzeLocally } from "@/utils/localCognitiveAnalyzer";

interface HeroSectionProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const HeroSection = ({ onModalStateChange }: HeroSectionProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showCoupleNamesForm, setShowCoupleNamesForm] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profileData, setProfileData] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
  } | null>(null);
  const [coupleNames, setCoupleNames] = useState<{
    person1Name: string;
    person2Name: string;
  } | null>(null);
  const [isForCouple, setIsForCouple] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    cognitiveType: string;
    explanation: string;
    motivation: string;
  } | null>(null);
  const [coupleResult, setCoupleResult] = useState<{
    person1Type: string;
    person2Type: string;
  } | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<boolean[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const isAnyModalOpen = showQuiz || showResult || showProfileForm || showCoupleNamesForm || isAnalyzing;
    onModalStateChange?.(isAnyModalOpen);
  }, [showQuiz, showResult, showProfileForm, showCoupleNamesForm, isAnalyzing, onModalStateChange]);

  const handleQuizComplete = async (answers: boolean[]) => {
    setIsAnalyzing(true);
    setShowQuiz(false);
    setQuizAnswers(answers);

    try {
      let data;
      let backendFailed = false;

      try {
        const result = await supabase.functions.invoke('analyze-cognitive-quiz', {
          body: {
            answers,
            isForCouple,
            coupleNames,
            profileData
          }
        });

        if (result.error) {
          throw result.error;
        }

        data = result.data;
      } catch (backendError) {
        console.error('Backend analysis failed, using local analyzer:', backendError);
        backendFailed = true;

        // Use local fallback
        data = analyzeLocally(answers, isForCouple);

        toast({
          title: "Analysis Complete (Local)",
          description: "Generated results locally - backend unavailable.",
        });
      }

      // Update the user's profile with the cognitive type (skip for test profiles and couple tests)
      if (profileData && data.cognitiveType && !isForCouple) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(profileData.id);
        if (isUuid) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ cognitive_type: data.cognitiveType })
            .eq('id', profileData.id);

          if (updateError) {
            console.error('Error updating profile with cognitive type:', updateError);
            toast({
              title: "Update Warning",
              description: "Profile analyzed but cognitive type wasn't saved. Please retake the quiz.",
              variant: "destructive"
            });
          } else {
            console.log('Successfully updated profile with cognitive type:', data.cognitiveType);
          }
        } else {
          console.log('Skipping DB update for test profile id:', profileData.id);
        }
      }

      // Store results based on quiz type
      if (isForCouple && data.cognitiveType && data.person2CognitiveType) {
        setCoupleResult({
          person1Type: data.cognitiveType,
          person2Type: data.person2CognitiveType
        });
      } else {
        setQuizResult(data);
      }

      setIsAnalyzing(false);
      setShowResult(true);

      if (!backendFailed) {
        toast({
          title: "Analysis Complete!",
          description: "Your cognitive profile has been successfully analyzed.",
        });
      }

    } catch (error) {
      console.error('Unexpected error in quiz analysis, using local fallback:', error);

      // Use local analyzer as final fallback
      const data = analyzeLocally(answers, isForCouple);

      setQuizResult(data);
      setIsAnalyzing(false);
      setShowResult(true);

      toast({
        title: "Analysis Complete (Local)",
        description: "Generated results locally - backend unavailable.",
      });
    }
  };

  const handleStartQuiz = () => {
    setIsForCouple(false);
    setShowProfileForm(true);
  };

  const handleStartCoupleMatch = () => {
    setIsForCouple(true);
    setShowCoupleNamesForm(true);
  };

  const handleCoupleNamesComplete = (names: { person1Name: string; person2Name: string }) => {
    setCoupleNames(names);
    setShowCoupleNamesForm(false);
    setShowQuiz(true);
  };

  const handleCloseCoupleNames = () => {
    setShowCoupleNamesForm(false);
    setIsForCouple(false);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setQuizResult(null);
    setCoupleResult(null);
  };

  const handleProfileComplete = (userData: { id: string; name: string; age: number; gender: string }) => {
    console.log('=== PROFILE COMPLETED ===');
    console.log('User Data:', userData);
    setProfileData(userData);
    setShowProfileForm(false);
    setShowQuiz(true);
  };

  const handleCloseProfileForm = () => {
    setShowProfileForm(false);
  };

  const handleFindMatches = () => {
    setShowResult(false);
    const message = isForCouple
      ? "Couple compatibility analysis complete! 💕 Check the Cloud panel to see your data!"
      : "Profile Complete! 🎉 Your profile has been saved. Check the Cloud panel to see your data!";

    toast({
      title: isForCouple ? "Couple Analysis Complete! 💕" : "Profile Complete! 🎉",
      description: message,
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative z-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-neural-pink rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-neural-blue rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-neural-purple rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-3 h-3 bg-accent rounded-full animate-float opacity-70" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 lg:gap-20 items-center relative z-30">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8 md:space-y-10 max-w-xl mx-auto lg:mx-0">
          <div className="space-y-4 md:space-y-6">
            {/* Desktop: Full badge, Mobile: Hidden */}
            <div className="hidden md:flex items-center justify-center lg:justify-start gap-2 text-primary-foreground/80 mt-12">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">POWERED BY PSYCHOLOGY</span>
            </div>

            {/* Mobile: Shorter, Desktop: Full */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mt-4 md:mt-0">
              <span className="block md:inline lg:whitespace-nowrap">Find someone who</span>
              <span className="block bg-gradient-accent bg-clip-text text-transparent">
                thinks like you
              </span>
            </h1>

            {/* Mobile: Single line, Desktop: Two paragraphs */}
            <p className="text-base md:text-xl lg:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl mt-4 md:mt-6">
              <span className="md:hidden">Where minds match first, not just looks.</span>
              <span className="hidden md:inline">MindMatch helps you discover people who vibe with your thoughts, not just your looks.</span>
            </p>

            <p className="hidden md:block text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl font-medium">
              From late-night deep conversations to building dreams together — it starts with your mind.
            </p>
          </div>

          {/* Value Props - Authentic & Clean */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-2 border border-white/10">
            <div className="grid grid-cols-3 gap-3 md:gap-4 text-center divide-x divide-white/10">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-bold text-primary-foreground">Cognitive</div>
                  <div className="text-[10px] md:text-xs text-primary-foreground/70">Profiling</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-secondary-foreground" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-bold text-primary-foreground">Jungian</div>
                  <div className="text-[10px] md:text-xs text-primary-foreground/70">Theory</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-bold text-primary-foreground">Soul</div>
                  <div className="text-[10px] md:text-xs text-primary-foreground/70">Connections</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Simplified */}
          <div className="flex flex-col gap-6 justify-start lg:max-w-xl">
            {/* Primary CTA - Most prominent with floating avatars */}
            <div className="relative">
              {/* Floating profile avatars behind button */}
              <div className="absolute inset-0 overflow-visible pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-float-vapor"
                    style={{
                      animationDelay: `${i * 2}s`,
                      animationDuration: `${7 + i * 0.5}s`,
                      left: `${25 + i * 15}%`,
                    }}
                  >
                    {/* Profile pic with inner circle to mimic face */}
                    <div
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full relative blur-[1.5px] shadow-lg"
                      style={{
                        background: `linear-gradient(${45 + i * 90}deg, 
                          hsl(${315 + i * 30} 70% 60% / 0.85), 
                          hsl(${200 + i * 40} 65% 65% / 0.75))`
                      }}
                    >
                      {/* Inner face circle */}
                      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/3 h-1/3 rounded-full bg-white/30" />
                      {/* Body shape */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 rounded-t-full bg-white/20" />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                variant="secondary"
                className="group shadow-glow hover:shadow-xl transition-all duration-300 w-full py-7 md:py-8 text-lg md:text-xl font-bold relative z-10"
                onClick={handleStartQuiz}
              >
                <span className="mr-2">Find Your MindMatch</span>
                <div className="flex items-center gap-1">
                  <Brain className="w-5 h-5 md:w-6 md:h-6" />
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-secondary-foreground group-hover:animate-pulse" />
                </div>
              </Button>
            </div>

            {/* Secondary CTAs - Simple text links */}
            <div className="flex items-center justify-center gap-6 text-sm md:text-base">
              <button
                onClick={handleStartCoupleMatch}
                className="group flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Users className="w-4 h-4" />
                <span className="underline underline-offset-4 decoration-dotted">Couple Test</span>
              </button>

              <span className="text-primary-foreground/40">•</span>

              <Link to="/psychology" className="group flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Brain className="w-4 h-4" />
                <span className="underline underline-offset-4 decoration-dotted">How It Works</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 pt-2">
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">5-minute quiz</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Brain className="w-4 h-4" />
              <span className="text-sm">Psychology-backed</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Real connections</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative lg:ml-8">
          <div className="relative rounded-3xl overflow-hidden shadow-glow">
            <img
              src={heroImage}
              alt="MindMatch - Connect minds, not just hearts"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 bg-secondary p-3 rounded-full shadow-card animate-float">
            <Heart className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-secondary p-3 rounded-full shadow-card animate-float" style={{ animationDelay: '1.5s' }}>
            <Brain className="w-6 h-6 text-secondary-foreground" />
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <CognitiveQuiz
          onComplete={handleQuizComplete}
          onClose={handleCloseQuiz}
          isForCouple={isForCouple}
          coupleNames={coupleNames}
        />
      )}

      {/* Analyzing Modal */}
      {isAnalyzing && <QuizAnalyzing />}

      {/* Result Modal */}
      {showResult && isForCouple && coupleResult && coupleNames && (
        <CoupleCompatibilityResult
          person1Name={coupleNames.person1Name}
          person2Name={coupleNames.person2Name}
          person1Type={coupleResult.person1Type}
          person2Type={coupleResult.person2Type}
          person1Answers={quizAnswers.slice(0, 24)}
          person2Answers={quizAnswers.slice(24, 48)}
          onClose={handleCloseResult}
        />
      )}

      {showResult && !isForCouple && quizResult && (
        <QuizResult
          cognitiveType={quizResult.cognitiveType}
          explanation={quizResult.explanation}
          motivation={quizResult.motivation}
          onClose={handleCloseResult}
          onFindMatches={handleFindMatches}
          isForCouple={isForCouple}
          coupleNames={coupleNames}
          quizAnswers={quizAnswers}
          profileData={profileData || undefined}
        />
      )}

      {/* Profile Form Modal */}
      {showProfileForm && (
        <UserProfileForm
          cognitiveType={quizResult?.cognitiveType}
          isForCouple={isForCouple}
          onComplete={handleProfileComplete}
          onClose={handleCloseProfileForm}
        />
      )}

      {/* Couple Names Form Modal */}
      {showCoupleNamesForm && (
        <CoupleNamesForm
          onComplete={handleCoupleNamesComplete}
          onClose={handleCloseCoupleNames}
        />
      )}
    </section>
  );
};

export default HeroSection;