import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

interface FeedbackFormProps {
  userName: string;
  cognitiveType: string;
}

export const FeedbackForm = ({ userName, cognitiveType }: FeedbackFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Please add a rating",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('user_feedback')
        .insert({
          session_id: `feedback_${Date.now()}_${userName}`,
          feedback_type: cognitiveType,
          rating,
          comments: comment || null,
          would_recommend: rating >= 4
        });

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve."
      });

      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Failed to submit feedback",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Rate your experience</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Comments (optional)</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your experience..."
          rows={4}
        />
      </div>

      <Button type="submit" disabled={submitting || rating === 0}>
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
};
