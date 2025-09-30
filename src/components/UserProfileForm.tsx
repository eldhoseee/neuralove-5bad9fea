import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Brain, Sparkles, Users, Heart } from 'lucide-react';

interface UserProfileFormProps {
  cognitiveType?: string;
  isForCouple?: boolean;
  onComplete?: (userData: { name: string; age: number; gender: string }) => void;
  onClose?: () => void;
}

const getGenerationInfo = (age: number) => {
  if (age >= 18 && age <= 27) return { 
    label: 'Gen Z', 
    emoji: '📱', 
    bgColor: 'bg-neural-blue/10', 
    borderColor: 'border-neural-blue/20',
    textColor: 'text-neural-blue'
  };
  if (age >= 28 && age <= 43) return { 
    label: 'Millennial', 
    emoji: '💻', 
    bgColor: 'bg-neural-purple/10', 
    borderColor: 'border-neural-purple/20',
    textColor: 'text-neural-purple'
  };
  if (age >= 44 && age <= 59) return { 
    label: 'Gen X', 
    emoji: '📼', 
    bgColor: 'bg-neural-pink/10', 
    borderColor: 'border-neural-pink/20',
    textColor: 'text-neural-pink'
  };
  if (age >= 60 && age <= 78) return { 
    label: 'Boomer', 
    emoji: '📺', 
    bgColor: 'bg-primary/10', 
    borderColor: 'border-primary/20',
    textColor: 'text-primary'
  };
  return { 
    label: 'Silent Generation', 
    emoji: '📻', 
    bgColor: 'bg-accent/10', 
    borderColor: 'border-accent/20',
    textColor: 'text-accent'
  };
};

const UserProfileForm: React.FC<UserProfileFormProps> = ({ 
  cognitiveType, 
  isForCouple = false,
  onComplete, 
  onClose 
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState([25]);
  const [gender, setGender] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const generationInfo = getGenerationInfo(age[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gender) {
      toast({
        title: "Please complete all fields",
        description: "Name and gender are required to proceed.",
        variant: "destructive"
      });
      return;
    }

    // Validate against test names
    const testNamePattern = /^test\d*$/i;
    if (testNamePattern.test(name.trim())) {
      toast({
        title: "Invalid name",
        description: "Please enter your real name to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          name: name.trim(),
          age: age[0],
          gender,
          cognitive_type: cognitiveType
        });

      if (error) throw error;

      toast({
        title: isForCouple ? "Couple profile created! 💕" : "Profile created successfully! 🎉",
        description: isForCouple ? "Ready to analyze your compatibility!" : "Ready to start your cognitive quiz!",
      });

      onComplete?.({
        name: name.trim(),
        age: age[0],
        gender
      });
    } catch (error: any) {
      toast({
        title: "Error creating profile",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card shadow-glow border-primary/20">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mb-2">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
            {isForCouple ? "Couple Profile Setup" : "Create Your Profile"}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {isForCouple 
              ? "Set up your profile to discover your couple compatibility" 
              : "Tell us about yourself before we analyze your mind"
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="transition-all duration-300 focus:shadow-glow/20"
              />
            </div>

            {/* Age Slider */}
            <div className="space-y-4">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Age: {age[0]}
              </Label>
              
              <div className="relative px-4">
                <Slider
                  value={age}
                  onValueChange={setAge}
                  max={80}
                  min={18}
                  step={1}
                  className="w-full"
                />
                
                {/* Generation Display */}
                <div className="mt-4 text-center">
                  <div className={`inline-block px-4 py-2 rounded-full ${generationInfo.bgColor} border ${generationInfo.borderColor}`}>
                    <span className="text-lg mr-2">{generationInfo.emoji}</span>
                    <span className={`font-semibold ${generationInfo.textColor}`}>
                      {generationInfo.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                Gender
              </Label>
              <RadioGroup value={gender} onValueChange={setGender} className="grid grid-cols-3 gap-3">
                {['Male', 'Female', 'Other'].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.toLowerCase()} id={option.toLowerCase()} />
                    <Label 
                      htmlFor={option.toLowerCase()} 
                      className="text-sm cursor-pointer flex-1 text-center py-2 px-3 rounded-md border border-input hover:bg-accent/50 transition-colors"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-hero hover:shadow-glow transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? "Creating..." 
                  : isForCouple 
                    ? "Start Compatibility Quiz" 
                    : "Start Quiz"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileForm;