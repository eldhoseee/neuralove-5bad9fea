import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Star, ThumbsUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Feedback {
  id: string;
  session_id: string;
  feedback_type: string;
  rating: number;
  comments: string | null;
  would_recommend: boolean | null;
  created_at: string;
}

export const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('user_feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFeedbacks(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast({
        title: "Error",
        description: "Failed to load feedback",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0.0';

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Loading feedback...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Feedback Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Total Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{feedbacks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">User responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Star className="w-4 h-4" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              {averageRating}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              Satisfaction Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {feedbacks.length > 0 
                ? `${((feedbacks.filter(f => f.rating >= 4).length / feedbacks.length) * 100).toFixed(0)}%`
                : '0%'
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">4+ star ratings</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            User Feedback & Reviews
          </CardTitle>
          <CardDescription>
            Recent feedback from users about their experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          {feedbacks.length > 0 ? (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">Session: {feedback.session_id.substring(0, 20)}...</p>
                      <p className="text-sm text-muted-foreground">
                        Type: {feedback.feedback_type}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {feedback.comments && (
                    <p className="text-sm mb-2">{feedback.comments}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(feedback.created_at).toLocaleDateString()}</span>
                    {feedback.would_recommend && (
                      <span className="text-green-600 font-medium">✓ Would recommend</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No Feedback Yet</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Feedback will appear here once users start submitting reviews about their experience.
                Consider adding a feedback form to collect user insights.
              </p>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg max-w-2xl mx-auto text-left">
                <h4 className="font-semibold mb-2">To enable feedback collection:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Create a 'feedbacks' table in Supabase with columns: id, user_name, cognitive_type, rating, comment, created_at</li>
                  <li>Add a feedback form component to your app</li>
                  <li>Connect the form to submit data to the feedbacks table</li>
                  <li>Enable Row Level Security (RLS) policies for the table</li>
                </ol>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
