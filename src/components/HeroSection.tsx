import { useState } from "react";
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

const HeroSection = () => {
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

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-30">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8 max-w-xl mx-auto lg:mx-0">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-primary-foreground/80 mt-12">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide">POWERED BY PSYCHOLOGY</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              <span className="lg:whitespace-nowrap">Find someone who</span>
              <span className="block bg-gradient-accent bg-clip-text text-transparent">
                *thinks* like you
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl">
              MindMatch helps you discover people who vibe with your thoughts, not just your looks.
            </p>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl font-medium">
              From late-night deep conversations to building dreams together — it starts with your mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-start lg:max-w-xl">
            <Button 
              size="lg" 
              variant="secondary" 
              className="group shadow-glow hover:shadow-xl transition-all duration-300 w-full"
              onClick={handleStartQuiz}
            >
              <span className="mr-2">Find Your MindMatch</span>
              <div className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                <Heart className="w-4 h-4 text-secondary-foreground group-hover:animate-pulse" />
              </div>
            </Button>
            
            <Button 
              size="lg" 
              className="group shadow-glow hover:shadow-xl transition-all duration-300 bg-accent hover:bg-accent/90 w-full"
              onClick={handleStartCoupleMatch}
            >
              <span className="mr-2">Relationship Compatibility Test</span>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <Heart className="w-4 h-4 group-hover:animate-pulse" />
              </div>
            </Button>
            
            <Link to="/psychology" className="sm:col-span-2">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-foreground/30 text-foreground hover:bg-foreground/10 w-full"
              >
                How It Works
              </Button>
            </Link>
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