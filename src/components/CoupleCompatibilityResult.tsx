import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, AlertCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CoupleCompatibilityResultProps {
  person1Name: string;
  person2Name: string;
  person1Type: string;
  person2Type: string;
  person1Answers: boolean[];
  person2Answers: boolean[];
  onClose: () => void;
}

interface CompatibilityAnalysis {
  matchQuality: "excellent" | "good" | "moderate" | "challenging";
  matchScore: number;
  isStrictMismatch: boolean;
  strengths: string[];
  frictionPoints: Array<{
    issue: string;
    insight: string;
  }>;
  recommendation: string;
}

export const CoupleCompatibilityResult = ({
  person1Name,
  person2Name,
  person1Type,
  person2Type,
  person1Answers,
  person2Answers,
  onClose,
}: CoupleCompatibilityResultProps) => {
  const [analysis, setAnalysis] = useState<CompatibilityAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "analyze-couple-compatibility",
          {
            body: {
              person1Type,
              person2Type,
              person1Name,
              person2Name,
              person1Answers,
              person2Answers,
            },
          }
        );

        if (error) throw error;
        setAnalysis(data);
      } catch (error) {
        console.error("Failed to fetch compatibility analysis:", error);
        
        // Fallback analysis based on cognitive types
        const fallbackAnalysis: CompatibilityAnalysis = {
          matchQuality: "good",
          matchScore: 75,
          isStrictMismatch: false,
          strengths: [
            `${person1Name}'s ${person1Type} perspective complements ${person2Name}'s ${person2Type} approach.`,
            "You both bring unique strengths that can balance each other out.",
            "Your different thinking styles create opportunities for growth and learning.",
          ],
          frictionPoints: [
            {
              issue: "Different decision-making approaches",
              insight: "Recognize that you process information differently. Take time to explain your reasoning to each other.",
            },
            {
              issue: "Varied communication styles",
              insight: "Be patient and adapt your communication to meet each other's needs.",
            },
          ],
          recommendation: `${person1Name} and ${person2Name}, your cognitive profiles show promising compatibility. While you think differently in some ways, these differences can actually strengthen your relationship when approached with understanding and appreciation. Keep communicating openly about your perspectives.`,
        };
        
        setAnalysis(fallbackAnalysis);
        
        toast({
          title: "Using Backup Analysis",
          description: "Generated a basic compatibility report. For detailed AI insights, please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [person1Type, person2Type, person1Name, person2Name, person1Answers, person2Answers, toast]);

  const getMatchColor = (quality: string) => {
    switch (quality) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "moderate": return "text-yellow-600";
      case "challenging": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl p-8 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse text-primary" />
          <h3 className="text-xl font-semibold mb-2">Analyzing Your Compatibility...</h3>
          <p className="text-muted-foreground">Understanding your unique connection</p>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  // Strict mismatch view
  if (analysis.isStrictMismatch) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <Card className="w-full max-w-2xl p-8 my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <Heart className="w-16 h-16 mx-auto mb-4 text-rose-500" />
            <h2 className="text-3xl font-bold mb-4">
              {person1Name} & {person2Name}
            </h2>
            <div className="inline-block px-4 py-2 bg-rose-100 rounded-full mb-4">
              <p className="text-rose-700 font-medium">
                {person1Type} × {person2Type}
              </p>
            </div>
          </div>

          <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 mb-6">
            <p className="text-lg text-center leading-relaxed text-gray-800">
              {analysis.recommendation}
            </p>
          </Card>

          <div className="flex gap-4">
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Normal compatibility view
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-3xl p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">
            {person1Name} & {person2Name}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
              {person1Type}
            </span>
            <Heart className="w-5 h-5 text-rose-500" />
            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
              {person2Type}
            </span>
          </div>
        </div>

        {/* Match Quality */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="text-center">
            <div className={`text-5xl font-bold mb-2 ${getMatchColor(analysis.matchQuality)}`}>
              {analysis.matchScore}%
            </div>
            <p className="text-xl font-semibold capitalize mb-2">
              {analysis.matchQuality} Match
            </p>
            <p className="text-muted-foreground">
              Based on your cognitive profiles and personalities
            </p>
          </div>
        </Card>

        {/* Strengths Section */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-green-900">Why Your Relationship Works</h3>
          </div>
          <ul className="space-y-3">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span className="text-gray-800">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Friction Points Section */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-bold text-amber-900">Growth Opportunities</h3>
          </div>
          <p className="text-sm text-amber-700 mb-4">
            Understanding these differences can strengthen your bond
          </p>
          <div className="space-y-4">
            {analysis.frictionPoints.map((point, index) => (
              <div key={index} className="border-l-4 border-amber-400 pl-4">
                <p className="font-semibold text-gray-900 mb-1">{point.issue}</p>
                <p className="text-sm text-gray-700">{point.insight}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendation */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 mb-6">
          <h3 className="text-xl font-bold text-purple-900 mb-3">Our Insight</h3>
          <p className="text-gray-800 leading-relaxed">{analysis.recommendation}</p>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
          <Button 
            onClick={() => {
              const text = `${person1Name} (${person1Type}) & ${person2Name} (${person2Type}) - ${analysis.matchScore}% Match!`;
              navigator.clipboard.writeText(text);
              toast({ title: "Copied to clipboard!" });
            }}
            className="flex-1"
          >
            Share Result
          </Button>
        </div>
      </Card>
    </div>
  );
};
