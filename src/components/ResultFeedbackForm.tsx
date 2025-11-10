import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ResultFeedbackFormProps {
  sessionId: string;
  feedbackType: 'quiz' | 'couple';
  relatedResponseId?: string;
}

export const ResultFeedbackForm = ({ sessionId, feedbackType, relatedResponseId }: ResultFeedbackFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [improvements, setImprovements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('user_feedback').insert({
        session_id: sessionId,
        related_response_id: relatedResponseId || null,
        feedback_type: feedbackType,
        rating,
        comment: comment.trim() || null,
        would_recommend: wouldRecommend,
        improvement_suggestions: improvements.trim() || null,
        user_agent: navigator.userAgent,
      } as any);

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve MindMatch.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setRating(0);
        setComment("");
        setWouldRecommend(null);
        setImprovements("");
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6 md:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-primary animate-in zoom-in duration-300" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Thank You!</h3>
          <p className="text-sm md:text-base text-muted-foreground">Your feedback helps us create better experiences.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-border/50">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="text-center space-y-1 md:space-y-2">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">How was your experience?</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Your feedback helps us improve MindMatch</p>
        </div>

        {/* Rating Stars */}
        <div className="space-y-2 md:space-y-3">
          <Label className="text-sm md:text-base font-semibold">Rate your experience *</Label>
          <div className="flex justify-center gap-1 md:gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 active:scale-95 touch-manipulation"
              >
                <Star
                  className={`w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-xs md:text-sm text-muted-foreground">
              {rating === 5 && "Amazing! 🎉"}
              {rating === 4 && "Great! 😊"}
              {rating === 3 && "Good 👍"}
              {rating === 2 && "Okay 😐"}
              {rating === 1 && "Not great 😞"}
            </p>
          )}
        </div>

        {/* Would Recommend */}
        <div className="space-y-2 md:space-y-3">
          <Label className="text-sm md:text-base font-semibold">Would you recommend MindMatch?</Label>
          <div className="flex gap-2 md:gap-3 justify-center flex-wrap">
            <Button
              type="button"
              variant={wouldRecommend === true ? "default" : "outline"}
              onClick={() => setWouldRecommend(true)}
              className="flex-1 min-w-[100px] md:min-w-[120px] text-sm md:text-base"
            >
              Yes 👍
            </Button>
            <Button
              type="button"
              variant={wouldRecommend === false ? "default" : "outline"}
              onClick={() => setWouldRecommend(false)}
              className="flex-1 min-w-[100px] md:min-w-[120px] text-sm md:text-base"
            >
              No 👎
            </Button>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2 md:space-y-3">
          <Label htmlFor="comment" className="text-sm md:text-base font-semibold">
            What did you think? (Optional)
          </Label>
          <Textarea
            id="comment"
            placeholder="Share your thoughts about the accuracy, insights, or overall experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px] md:min-h-[100px] resize-none text-sm md:text-base"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground text-right">{comment.length}/500</p>
        </div>

        {/* Improvements */}
        <div className="space-y-2 md:space-y-3">
          <Label htmlFor="improvements" className="text-sm md:text-base font-semibold">
            How can we improve? (Optional)
          </Label>
          <Textarea
            id="improvements"
            placeholder="Any suggestions for features, improvements, or changes..."
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            className="min-h-[60px] md:min-h-[80px] resize-none text-sm md:text-base"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground text-right">{improvements.length}/500</p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="w-full h-10 md:h-12 text-sm md:text-base font-semibold"
          size="lg"
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          * Required field
        </p>
      </form>
    </Card>
  );
};
