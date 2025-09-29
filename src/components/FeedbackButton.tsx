import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
import FeedbackModal from "./FeedbackModal";
import { useToast } from "@/hooks/use-toast";

const FeedbackButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleFeedbackSubmit = async (feedback: { reaction: string; message?: string }) => {
    try {
      // TODO: Replace with actual backend call to Firebase Firestore
      // Example Firebase call:
      // await addDoc(collection(db, 'feedback'), {
      //   reaction: feedback.reaction,
      //   message: feedback.message,
      //   timestamp: serverTimestamp(),
      //   userAgent: navigator.userAgent
      // });

      // For now, just log to console
      console.log('Feedback submitted:', feedback);

      // Show success toast
      toast({
        title: "Thanks! We 💖 feedback like yours.",
        description: "Your feedback helps us make MindMatch better for everyone.",
        duration: 4000,
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast({
        title: "Oops! Something went wrong.",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group"
        size="lg"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
          <span className="hidden sm:inline">👋 Tell us what you think</span>
          <span className="sm:hidden">Feedback</span>
        </div>
      </Button>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </>
  );
};

export default FeedbackButton; 