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
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mt-4 md:mt-0">
              <span className="block md:inline lg:whitespace-nowrap">Date someone who</span>
              <span className="block bg-gradient-accent bg-clip-text text-transparent">
                gets your brain
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

          {/* Mobile: Stack buttons, Desktop: Grid */}
          <div className="flex flex-col gap-4 md:gap-4 justify-start lg:max-w-xl">
            {/* Primary CTA - Most prominent */}
            <Button 
              size="lg" 
              variant="secondary" 
              className="group shadow-glow hover:shadow-xl transition-all duration-300 w-full py-7 md:py-4 text-base md:text-lg font-semibold"
              onClick={handleStartQuiz}
            >
              <span className="mr-2">Find Your MindMatch</span>
              <div className="flex items-center gap-1">
                <Brain className="w-4 h-4 md:w-5 md:h-5" />
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-secondary-foreground group-hover:animate-pulse" />
              </div>
            </Button>
            
            {/* Secondary CTAs - Side by side on mobile too */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Button 
                size="lg" 
                variant="outline"
                className="group border-2 border-accent/40 hover:border-accent hover:bg-accent/10 w-full py-6 md:py-3"
                onClick={handleStartCoupleMatch}
              >
                <span className="mr-1 text-xs md:text-base"><span className="md:hidden">Couple</span><span className="hidden md:inline">Couple Test</span></span>
                <Users className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
              
              <Link to="/psychology" className="w-full">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-foreground/30 text-foreground hover:bg-foreground/10 w-full py-6 md:py-3 text-xs md:text-base"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
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

        {/* Right Visual - Abstract Brain/Neural Network */}
        <div className="relative lg:ml-8 hidden lg:block">
          <div className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary-glow/5 to-accent/10 shadow-glow">
            {/* Animated neural network visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Center brain icon */}
              <div className="relative z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Orbiting connection nodes */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-accent/80 to-accent rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-primary-glow/80 to-primary-glow rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-14 h-14 bg-gradient-to-br from-primary/80 to-primary rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-gradient-to-br from-accent/60 to-accent rounded-full shadow-lg"></div>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" />
                <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="url(#gradient2)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                <line x1="33%" y1="75%" x2="50%" y2="50%" stroke="url(#gradient3)" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1s' }} />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary-glow))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating particles */}
              <div className="absolute top-10 left-10 w-2 h-2 bg-accent rounded-full animate-float opacity-60"></div>
              <div className="absolute top-20 right-16 w-3 h-3 bg-primary-glow rounded-full animate-float opacity-70" style={{ animationDelay: '0.8s' }}></div>
              <div className="absolute bottom-16 left-20 w-2.5 h-2.5 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute bottom-20 right-12 w-2 h-2 bg-accent rounded-full animate-float opacity-60" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
          
          {/* Floating stat cards */}
          <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-glow animate-float border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Match Rate</div>
                <div className="text-lg font-bold text-foreground">94%</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-glow animate-float border border-accent/10" style={{ animationDelay: '1.5s' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary-glow rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Avg Time</div>
                <div className="text-lg font-bold text-foreground">5 min</div>
              </div>
            </div>
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