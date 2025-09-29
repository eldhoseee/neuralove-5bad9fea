import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, ChevronLeft, Sparkles, HelpCircle } from "lucide-react";

interface QuizProps {
  onComplete: (answers: boolean[]) => void;
  onClose: () => void;
  isForCouple?: boolean;
  coupleNames?: { person1Name: string; person2Name: string } | null;
}

const CognitiveQuiz = ({ onComplete, onClose, isForCouple = false, coupleNames }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(24).fill(null));
  const [coupleAnswers, setCoupleAnswers] = useState<{
    person1: (boolean | null)[];
    person2: (boolean | null)[];
  }>({
    person1: new Array(24).fill(null),
    person2: new Array(24).fill(null)
  });

  const questions = [
    "I prefer to focus on the big picture rather than small details.",
    "I make decisions based on logic and data rather than feelings.",
    "I enjoy exploring new ideas and possibilities.",
    "I like to have a plan and stick to it rather than being spontaneous.",
    "I get energized by being around other people.",
    "I prefer tried-and-true methods over experimental approaches.",
    "I'm comfortable making decisions quickly with limited information.",
    "I find patterns and connections easily in complex information.",
    "I prefer working in teams rather than alone.",
    "I trust my gut feelings when making important choices.",
    "I like to analyze all possible outcomes before acting.",
    "I'm motivated by achieving personal excellence and mastery.",
    "I feel responsible for maintaining group harmony.",
    "I prefer familiar routines over constant change and variety.",
    "I express my thoughts and feelings openly and directly.",
    "I'm naturally skeptical and question assumptions.",
    "I adapt easily to unexpected changes in plans.",
    "I prefer concrete facts over abstract theories.",
    "I make decisions by considering how they affect others emotionally.",
    "I like to finish projects completely before starting new ones.",
    "I'm comfortable being the center of attention.",
    "I prefer to observe and understand before taking action.",
    "I'm motivated by opportunities to help and support others.",
    "I enjoy debating ideas and challenging different viewpoints."
  ];

  const handleAnswer = (answer: boolean, person?: 'person1' | 'person2') => {
    if (isForCouple && person) {
      const newCoupleAnswers = { ...coupleAnswers };
      newCoupleAnswers[person][currentQuestion] = answer;
      setCoupleAnswers(newCoupleAnswers);
      
      // Check if both people have answered this question
      if (newCoupleAnswers.person1[currentQuestion] !== null && 
          newCoupleAnswers.person2[currentQuestion] !== null) {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Quiz complete for couple
          const finalAnswers1 = newCoupleAnswers.person1.map(a => a !== null ? a : false);
          const finalAnswers2 = newCoupleAnswers.person2.map(a => a !== null ? a : false);
          onComplete([...finalAnswers1, ...finalAnswers2]);
        }
      }
    } else {
      // Individual mode
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
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion) / questions.length) * 100;

  if (isForCouple && coupleNames) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-6xl p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 text-2xl"
          >
            ×
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Brain className="w-6 h-6" />
              <span className="font-semibold">Relationship Compatibility Test</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <Progress value={progress} className="w-full max-w-md mx-auto mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Person 1 Side */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-foreground font-bold text-lg">
                    {coupleNames.person1Name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{coupleNames.person1Name}</h3>
              </div>
              
              <Card className="p-6 border-primary/20 bg-primary/5">
                <p className="text-lg text-foreground text-center mb-6 leading-relaxed">
                  {questions[currentQuestion]}
                </p>
                
                <div className="space-y-3">
                  <Button
                    variant={coupleAnswers.person1[currentQuestion] === true ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => handleAnswer(true, 'person1')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0" />
                      <span>This sounds like me</span>
                    </div>
                  </Button>
                  
                  <Button
                    variant={coupleAnswers.person1[currentQuestion] === false ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => handleAnswer(false, 'person1')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-muted-foreground flex-shrink-0" />
                      <span>This doesn't sound like me</span>
                    </div>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Person 2 Side */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-accent-foreground font-bold text-lg">
                    {coupleNames.person2Name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{coupleNames.person2Name}</h3>
              </div>
              
              <Card className="p-6 border-accent/20 bg-accent/5">
                <p className="text-lg text-foreground text-center mb-6 leading-relaxed">
                  {questions[currentQuestion]}
                </p>
                
                <div className="space-y-3">
                  <Button
                    variant={coupleAnswers.person2[currentQuestion] === true ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => handleAnswer(true, 'person2')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-accent flex-shrink-0" />
                      <span>This sounds like me</span>
                    </div>
                  </Button>
                  
                  <Button
                    variant={coupleAnswers.person2[currentQuestion] === false ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-4 px-6"
                    onClick={() => handleAnswer(false, 'person2')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-muted-foreground flex-shrink-0" />
                      <span>This doesn't sound like me</span>
                    </div>
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {coupleAnswers.person1[currentQuestion] !== null && coupleAnswers.person2[currentQuestion] !== null 
                  ? "Both answered - advancing automatically" 
                  : `Waiting for ${coupleAnswers.person1[currentQuestion] === null ? coupleNames.person1Name : ''}${coupleAnswers.person1[currentQuestion] === null && coupleAnswers.person2[currentQuestion] === null ? ' and ' : ''}${coupleAnswers.person2[currentQuestion] === null ? coupleNames.person2Name : ''}`
                }
              </p>
            </div>
            
            <div className="w-24" />
          </div>
        </Card>
      </div>
    );
  }

  // Individual mode (original quiz layout)
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close quiz"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Brain className="w-6 h-6" />
            <span className="font-semibold">Cognitive Assessment</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <Progress value={progress} className="w-full max-w-md mx-auto" />
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="bg-muted/30 rounded-lg p-6 mb-6">
            <p className="text-lg text-foreground text-center leading-relaxed">
              {questions[currentQuestion]}
            </p>
          </div>

          <TooltipProvider>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Choose the option that best describes how you naturally think or behave in most situations.</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-sm text-muted-foreground">Choose what feels most natural to you</span>
            </div>
          </TooltipProvider>
        </div>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          <Button
            variant={answers[currentQuestion] === true ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-6 px-6 hover:shadow-card transition-all duration-300"
            onClick={() => handleAnswer(true)}
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-sm font-bold">✓</span>
              </div>
              <div>
                <div className="font-medium text-base">This sounds like me</div>
                <div className="text-sm text-muted-foreground mt-1">This description matches how I typically think or behave</div>
              </div>
            </div>
          </Button>
          
          <Button
            variant={answers[currentQuestion] === false ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-6 px-6 hover:shadow-card transition-all duration-300"
            onClick={() => handleAnswer(false)}
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-muted-foreground flex items-center justify-center flex-shrink-0">
                <span className="text-background text-sm font-bold">✗</span>
              </div>
              <div>
                <div className="font-medium text-base">This doesn't sound like me</div>
                <div className="text-sm text-muted-foreground mt-1">This description doesn't match how I typically think or behave</div>
              </div>
            </div>
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>{currentQuestion + 1} of {questions.length} questions</span>
          </div>
          
          <div className="w-20" />
        </div>
      </Card>
    </div>
  );
};

export default CognitiveQuiz;