import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Sparkles, X } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: { reaction: string; message?: string }) => void;
}

const FeedbackModal = ({ isOpen, onClose, onSubmit }: FeedbackModalProps) => {
  const [selectedReaction, setSelectedReaction] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reactions = [
    { emoji: "😍", label: "Love it!", value: "love" },
    { emoji: "🤔", label: "Interesting", value: "interesting" },
    { emoji: "😐", label: "Meh", value: "meh" },
    { emoji: "😤", label: "Frustrated", value: "frustrated" },
    { emoji: "💡", label: "Great idea!", value: "idea" },
    { emoji: "🚀", label: "Amazing!", value: "amazing" }
  ];

  const handleSubmit = async () => {
    if (!selectedReaction) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        reaction: selectedReaction,
        message: message.trim() || undefined
      });
      
      // Reset form
      setSelectedReaction("");
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          aria-label="Close feedback modal"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Tell us what you think!</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your feedback helps us make MindMatch better for everyone 💖
          </p>
        </div>

        {/* Emoji Reactions */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">How are you feeling about MindMatch?</h3>
          <div className="grid grid-cols-3 gap-3">
            {reactions.map((reaction) => (
              <button
                key={reaction.value}
                onClick={() => setSelectedReaction(reaction.value)}
                aria-label={`Select ${reaction.label} reaction`}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  selectedReaction === reaction.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-2xl mb-1">{reaction.emoji}</div>
                <div className="text-xs text-muted-foreground">{reaction.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Message */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Want to share more? (optional)
          </h3>
          <Textarea
            placeholder="Tell us what's on your mind... 💭"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[80px] resize-none"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {message.length}/500
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedReaction || isSubmitting}
          className="w-full group"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 group-hover:animate-pulse" />
              Send Feedback
            </div>
          )}
        </Button>
      </Card>
    </div>
  );
};

export default FeedbackModal; 