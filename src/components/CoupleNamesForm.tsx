import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart, Users, X } from 'lucide-react';
import { z } from 'zod';

const coupleNamesSchema = z.object({
  person1Name: z.string().trim().min(1, "First person's name is required").max(50, "Name must be less than 50 characters"),
  person2Name: z.string().trim().min(1, "Second person's name is required").max(50, "Name must be less than 50 characters")
});

interface CoupleNamesFormProps {
  onComplete: (names: { person1Name: string; person2Name: string }) => void;
  onClose: () => void;
}

const CoupleNamesForm: React.FC<CoupleNamesFormProps> = ({ onComplete, onClose }) => {
  const [person1Name, setPerson1Name] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [errors, setErrors] = useState<{ person1Name?: string; person2Name?: string }>({});
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = coupleNamesSchema.parse({
        person1Name: person1Name.trim(),
        person2Name: person2Name.trim()
      });
      
      if (validated.person1Name.toLowerCase() === validated.person2Name.toLowerCase()) {
        toast({
          title: "Please use different names",
          description: "Each person should have a unique name for the analysis.",
          variant: "destructive"
        });
        return;
      }
      
      setErrors({});
      onComplete({
        person1Name: validated.person1Name,
        person2Name: validated.person2Name
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { person1Name?: string; person2Name?: string } = {};
        error.issues.forEach((issue) => {
          if (issue.path[0] === 'person1Name') {
            fieldErrors.person1Name = issue.message;
          } else if (issue.path[0] === 'person2Name') {
            fieldErrors.person2Name = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-gradient-card shadow-glow border-primary/20">
        <CardHeader className="text-center space-y-2 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
            Relationship Compatibility Test
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Enter both names to start your compatibility analysis
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Person 1 Name */}
            <div className="space-y-2">
              <Label htmlFor="person1" className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                First Person's Name
              </Label>
              <Input
                id="person1"
                type="text"
                placeholder="Enter first person's name"
                value={person1Name}
                onChange={(e) => setPerson1Name(e.target.value)}
                className={`transition-all duration-300 focus:shadow-glow/20 ${errors.person1Name ? 'border-destructive' : ''}`}
                maxLength={50}
              />
              {errors.person1Name && (
                <p className="text-sm text-destructive">{errors.person1Name}</p>
              )}
            </div>

            {/* Person 2 Name */}
            <div className="space-y-2">
              <Label htmlFor="person2" className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                Second Person's Name
              </Label>
              <Input
                id="person2"
                type="text"
                placeholder="Enter second person's name"
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
                className={`transition-all duration-300 focus:shadow-glow/20 ${errors.person2Name ? 'border-destructive' : ''}`}
                maxLength={50}
              />
              {errors.person2Name && (
                <p className="text-sm text-destructive">{errors.person2Name}</p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                How it works
              </h4>
              <p className="text-sm text-muted-foreground">
                Both people will answer the same cognitive assessment questions. 
                Our AI will analyze your thinking patterns and show how compatible you are as a couple.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-hero hover:shadow-glow transition-all duration-300"
              >
                Start Compatibility Test
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoupleNamesForm;