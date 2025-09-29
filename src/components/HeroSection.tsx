import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Sparkles, Clock } from "lucide-react";
import brainHeartImage from "@/assets/brain-heart.png";
import CognitiveQuiz from "./CognitiveQuiz";
import QuizResult from "./QuizResult";
import UserProfileForm from "./UserProfileForm";
import QuizAnalyzing from "./QuizAnalyzing";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profileData, setProfileData] = useState<{
    name: string;
    age: number;
    gender: string;
  } | null>(null);
  const [quizResult, setQuizResult] = useState<{
    cognitiveType: string;
    explanation: string;
    motivation: string;
  } | null>(null);
  const { toast } = useToast();

  const handleQuizComplete = async (answers: boolean[]) => {
    setIsAnalyzing(true);
    setShowQuiz(false);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-cognitive-quiz', {
        body: { answers }
      });
      
      if (error) {
        console.error('Error analyzing quiz:', error);
        toast({
          title: "Analysis Failed",
          description: "We couldn't analyze your quiz results. Please try again.",
          variant: "destructive"
        });
        setIsAnalyzing(false);
        setShowQuiz(true);
        return;
      }
      
      // Update the user's profile with the cognitive type
      if (profileData && data.cognitiveType) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ cognitive_type: data.cognitiveType })
          .eq('name', profileData.name)
          .eq('age', profileData.age)
          .eq('gender', profileData.gender);
          
        if (updateError) {
          console.error('Error updating profile with cognitive type:', updateError);
        }
      }
      
      setQuizResult(data);
      setIsAnalyzing(false);
      setShowResult(true);
      
      toast({
        title: "Analysis Complete!",
        description: "Your cognitive profile has been successfully analyzed.",
      });
      
    } catch (error) {
      console.error('Error calling quiz analysis function:', error);
      toast({
        title: "Analysis Failed",
        description: "We couldn't analyze your quiz results. Please try again.",
        variant: "destructive"
      });
      setIsAnalyzing(false);
      setShowQuiz(true);
    }
  };

  const handleStartQuiz = () => {
    setShowProfileForm(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setQuizResult(null);
  };

  const handleProfileComplete = (userData: { name: string; age: number; gender: string }) => {
    setProfileData(userData);
    setShowProfileForm(false);
    setShowQuiz(true);
  };

  const handleCloseProfileForm = () => {
    setShowProfileForm(false);
  };

  const handleFindMatches = () => {
    setShowResult(false);
    // Here you could navigate to a matches page or show matches
    toast({
      title: "Profile Complete! 🎉",
      description: "Your profile has been saved. Check the Cloud panel to see your data!",
    });
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Heart className="w-4 h-4" fill="currentColor" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="text-left space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white/80">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide uppercase">POWERED BY PSYCHOLOGY</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Find someone
              <br />
              who <span className="text-yellow-400">thinks</span>
              <br />
              like you
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-lg">
              MindMatch helps you discover people who vibe with your thoughts, not just your looks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-4 text-lg rounded-full"
              onClick={handleStartQuiz}
            >
              Find Your MindMatch
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-full"
            >
              How It Works
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">5-minute quiz</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium">Psychology-backed</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Real connections</span>
            </div>
          </div>
        </div>

        {/* Right Brain-Heart Image */}
        <div className="relative flex items-center justify-center">
          <div className="relative">
            <img 
              src={brainHeartImage} 
              alt="Brain Heart - Connecting minds and hearts"
              className="w-full max-w-lg h-auto object-contain animate-float"
            />
            
            {/* Additional floating hearts around the brain */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-pink-400 opacity-70 animate-float"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 1}s`
                }}
              >
                <Heart className="w-6 h-6" fill="currentColor" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <CognitiveQuiz 
          onComplete={handleQuizComplete}
          onClose={handleCloseQuiz}
        />
      )}

      {/* Analyzing Modal */}
      {isAnalyzing && <QuizAnalyzing />}

      {/* Result Modal */}
      {showResult && quizResult && (
        <QuizResult
          cognitiveType={quizResult.cognitiveType}
          explanation={quizResult.explanation}
          motivation={quizResult.motivation}
          onClose={handleCloseResult}
          onFindMatches={handleFindMatches}
        />
      )}

      {showProfileForm && (
        <UserProfileForm
          cognitiveType={quizResult?.cognitiveType}
          onComplete={handleProfileComplete}
          onClose={handleCloseProfileForm}
        />
      )}
    </section>
  );
};

export default HeroSection;