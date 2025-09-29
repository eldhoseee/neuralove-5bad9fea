import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, ChevronLeft, ChevronRight, Sparkles, HelpCircle } from "lucide-react";

interface QuizProps {
  onComplete: (answers: boolean[]) => void;
  onClose: () => void;
}

const CognitiveQuiz = ({ onComplete, onClose }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(24).fill(null));

  const questions = [
    "I prefer to focus on the big picture rather than small details.",
    "I make decisions based on logic and data rather than feelings.",
    "I enjoy exploring new ideas and possibilities.",
    "I like to have a clear plan before starting any project.",
    "I'm sensitive to other people's emotions and moods.",
    "I prefer working with my hands and testing things out.",
    "I often daydream and let my mind wander.",
    "I like to break down complex problems into smaller parts.",
    "I trust my gut feelings when making important decisions.",
    "I enjoy organizing and categorizing information.",
    "I'm drawn to creative and artistic activities.",
    "I prefer practical, real-world applications over theories.",
    "I easily pick up on patterns and connections.",
    "I express myself better through words than actions.",
    "I feel energized when helping others solve problems.",
    "I rely heavily on facts and evidence when making decisions.",
    "I love coming up with innovative solutions to problems.",
    "I prefer stability and predictability in my daily routine.",
    "I can easily imagine different scenarios and outcomes.",
    "I enjoy analyzing data to find insights and trends.",
    "I care deeply about maintaining harmony in relationships.",
    "I like to experiment and try different approaches.",
    "I'm comfortable with ambiguity and uncertainty.",
    "I focus on efficiency and getting results quickly."
  ];

  const analogies = [
    "Mural – some step back to see the whole scene; others examine each brushstroke.",
    "Choosing a phone – comparing specs vs. going with what feels right.",
    "Buffet – eager to try unfamiliar dishes to see what you like.",
    "Assembling furniture – reading instructions and laying out parts before starting.",
    "Sensing moods – noticing whether a room feels happy or tense and adjusting behavior.",
    "Baking bread – learning by kneading and adjusting instead of just reading theory.",
    "Train ride daydream – watching the scenery and letting thoughts drift freely.",
    "Cleaning a messy room – tackling one corner at a time, sorting items into piles.",
    "Ordering at a restaurant – choosing a meal because it feels right rather than overanalyzing.",
    "Sorting papers – organizing into neat piles or folders for easy retrieval.",
    "Unwinding creatively – doodling, making music, or crafting instead of logic puzzles.",
    "Learning to ride – practicing on the bike rather than reading about balance.",
    "Picking up patterns – noticing repeating motifs in music or wallpaper quickly.",
    "Showing care – writing a heartfelt message instead of relying on a gesture.",
    "Helping energizes – feeling upbeat after assisting someone with a problem.",
    "Choosing insurance – comparing coverage details rather than making a snap judgment.",
    "Organizing cables – inventing a clever solution instead of just bundling them.",
    "Morning routine – feeling comfortable with the same coffee and commute each day.",
    "Vacation planning – picturing several itineraries and what each would feel like.",
    "Budget analysis – making charts or lists to spot spending patterns.",
    "Peacemaker – actively smoothing over tension so everyone feels comfortable.",
    "Cooking experiments – changing ingredients or spices to see how it tastes.",
    "Starting a hobby – beginning without knowing exactly how it will turn out.",
    "Finishing quickly – finding the fastest way to complete chores to move on."
  ];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete, convert nulls to false for incomplete answers
      const finalAnswers = newAnswers.map(a => a !== null ? a : false);
      onComplete(finalAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Brain className="w-6 h-6" />
            <span className="font-semibold">Cognitive Profile Quiz</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          
          {/* Enhanced Progress Bar */}
          <div className="space-y-3">
            <div className="relative">
              <Progress 
                value={progress} 
                className="w-full h-3 bg-slate-200" 
              />
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#e75480] via-[#ff6b9d] to-[#e75480] rounded-full transition-all duration-500 ease-out animate-pulse"
                style={{ 
                  width: `${progress}%`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite'
                }}
              />
            </div>
            
            {/* Progress indicators */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">
                {Math.round(progress)}% complete
              </span>
              <div className="flex items-center gap-1 text-[#e75480]">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">
                  {questions.length - currentQuestion - 1} questions left
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <TooltipProvider>
          <div className="mb-8 text-center">
            <p className="text-xl text-foreground leading-relaxed mb-2">
              {questions[currentQuestion]}
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-sm text-primary hover:text-primary/80 underline transition-colors">
                  Need an example?
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-sm">
                <p className="text-sm">{analogies[currentQuestion]}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        {/* Answer buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => handleAnswer(true)}
            className="w-full justify-center text-lg py-6"
          >
            Yes, that's me
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleAnswer(false)}
            className="w-full justify-center text-lg py-6"
          >
            Not really
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1 text-[#e75480]">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{Math.round(progress)}% complete</span>
          </div>

          {currentQuestion < questions.length - 1 && (
            <Button
              variant="ghost"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={answers[currentQuestion] === null}
              className="flex items-center gap-2"
            >
              Skip
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CognitiveQuiz;