import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Brain, Sparkles, Users, Heart, User, Calendar, Check, X, ArrowRight, Smartphone, Monitor, TrendingUp, Tv, Radio } from 'lucide-react';

interface UserProfileFormProps {
  cognitiveType?: string;
  isForCouple?: boolean;
  onComplete?: (userData: { id: string; name: string; age: number; gender: string }) => void;
  onClose?: () => void;
}

const getGenerationInfo = (age: number) => {
  if (age >= 18 && age <= 27) return {
    label: 'Gen Z',
    icon: Smartphone,
    emoji: '📱',
    gradient: 'from-primary to-primary-glow',
    bgColor: 'bg-primary/5',
    borderColor: 'border-primary/20',
    textColor: 'text-primary',
    description: 'Digital native, socially conscious'
  };
  if (age >= 28 && age <= 43) return {
    label: 'Millennial',
    icon: Monitor,
    emoji: '💻',
    gradient: 'from-primary-glow to-accent',
    bgColor: 'bg-primary-glow/5',
    borderColor: 'border-primary-glow/20',
    textColor: 'text-primary-glow',
    description: 'Tech-savvy, value experiences'
  };
  if (age >= 44 && age <= 59) return {
    label: 'Gen X',
    icon: TrendingUp,
    emoji: '📈',
    gradient: 'from-accent to-primary',
    bgColor: 'bg-accent/5',
    borderColor: 'border-accent/20',
    textColor: 'text-accent',
    description: 'Independent, adaptable'
  };
  if (age >= 60 && age <= 78) return {
    label: 'Boomer',
    icon: Tv,
    emoji: '📺',
    gradient: 'from-primary to-accent',
    bgColor: 'bg-secondary/5',
    borderColor: 'border-secondary/20',
    textColor: 'text-foreground',
    description: 'Hardworking, optimistic'
  };
  return {
    label: 'Silent Generation',
    icon: Radio,
    emoji: '📻',
    gradient: 'from-secondary to-primary',
    bgColor: 'bg-muted/30',
    borderColor: 'border-muted',
    textColor: 'text-muted-foreground',
    description: 'Traditional, loyal'
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

  const handleCancel = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Enhanced validation
    if (!name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name to continue.",
        variant: "destructive"
      });
      return;
    }

    // Name validation: 2-50 characters, letters and spaces only
    if (name.trim().length < 2) {
      toast({
        title: "Name too short",
        description: "Name must be at least 2 characters long.",
        variant: "destructive"
      });
      return;
    }

    if (name.trim().length > 50) {
      toast({
        title: "Name too long",
        description: "Name must be less than 50 characters.",
        variant: "destructive"
      });
      return;
    }

    // Allow letters, spaces, hyphens, and apostrophes (for names like O'Brien)
    const namePattern = /^[a-zA-Z\s'-]+$/;
    if (!namePattern.test(name.trim())) {
      toast({
        title: "Invalid name format",
        description: "Name can only contain letters, spaces, hyphens, and apostrophes.",
        variant: "destructive"
      });
      return;
    }

    if (!gender) {
      toast({
        title: "Gender is required",
        description: "Please select your gender to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Check if it's a test name
    const testNamePattern = /^test\d*$/i;
    const isTestName = testNamePattern.test(name.trim());

    if (isTestName) {
      // Skip database save for test names
      toast({
        title: "Test Mode",
        description: "Proceeding without saving to database",
      });

      onComplete?.({
        id: 'test-id',
        name: name.trim(),
        age: age[0],
        gender
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data: insertedProfile, error } = await supabase.functions.invoke('create-profile', {
        body: {
          name: name.trim(),
          age: age[0],
          gender,
          cognitive_type: cognitiveType,
        }
      });

      if (error) throw error;

      toast({
        title: isForCouple ? "Couple profile created! 💕" : "Profile created successfully! 🎉",
        description: isForCouple ? "Ready to analyze your compatibility!" : "Ready to start your cognitive quiz!",
      });

      onComplete?.({
        id: (insertedProfile as any).id,
        name: name.trim(),
        age: age[0],
        gender
      });
    } catch (error: any) {
      console.error("create-profile failed, trying direct DB insert:", error);
      try {
        const { data: row, error: dbError } = await supabase
          .from('profiles')
          .insert({
            name: name.trim(),
            age: age[0],
            gender,
            cognitive_type: cognitiveType ?? null,
          })
          .select('*')
          .maybeSingle();

        if (dbError) throw dbError;

        toast({
          title: isForCouple ? "Couple profile saved! 💾" : "Profile saved! 💾",
          description: "Saved directly to database.",
        });

        onComplete?.({
          id: (row as any).id,
          name: name.trim(),
          age: age[0],
          gender,
        });
      } catch (finalErr) {
        console.error("Direct DB insert failed, proceeding without backend:", finalErr);
        toast({
          title: "Proceeding without saving",
          description: "We couldn't save your profile, but you can continue the quiz.",
        });
        onComplete?.({
          id: `local-${Date.now()}`,
          name: name.trim(),
          age: age[0],
          gender,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Decorative background elements - Reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-sm bg-card/95 backdrop-blur-md shadow-2xl border-primary/20 relative rounded-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        <CardHeader className="text-center space-y-1 pb-2 pt-4 px-4 shrink-0">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center animate-bounce shadow-lg">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              {isForCouple ? "Couple Setup" : "Create Profile"}
            </CardTitle>
          </div>
          <p className="text-muted-foreground text-xs max-w-md mx-auto line-clamp-1">
            {isForCouple
              ? "Discover your couple compatibility"
              : "Tell us about yourself"
            }
          </p>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-1.5 pt-1">
            <div className="h-1 w-8 bg-primary rounded-full"></div>
            <div className="h-1 w-8 bg-primary/30 rounded-full"></div>
            <div className="h-1 w-8 bg-primary/30 rounded-full"></div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 p-4 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-3 h-full flex flex-col">
            {/* Name Field */}
            <div className="space-y-1.5 group">
              <Label htmlFor="name" className="text-xs font-semibold flex items-center gap-1.5">
                <div className="p-1 bg-primary/10 rounded-md">
                  <User className="h-3 w-3 text-primary" />
                </div>
                Name
                <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm h-9 pl-3 pr-8 transition-all duration-300 focus:shadow-md focus:shadow-primary/10 border-input focus:border-primary"
                />
                {name.trim() && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="bg-green-500 rounded-full p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Age Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <div className="p-1 bg-primary/10 rounded-md">
                    <Calendar className="h-3 w-3 text-primary" />
                  </div>
                  Age
                  <span className="text-destructive">*</span>
                </Label>
                <span className="text-xl font-bold bg-gradient-to-br from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  {age[0]}
                </span>
              </div>

              <div className="px-1 py-1">
                <Slider
                  value={age}
                  onValueChange={setAge}
                  max={80}
                  min={18}
                  step={1}
                  className="w-full"
                />

                {/* Compact Generation Badge */}
                <div className="mt-2 flex justify-center">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${generationInfo.bgColor} border ${generationInfo.borderColor} shadow-sm`}>
                    <generationInfo.icon className="h-3 w-3 text-primary" />
                    <span className={`font-semibold text-xs ${generationInfo.textColor}`}>
                      {generationInfo.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold flex items-center gap-1.5">
                <div className="p-1 bg-primary/10 rounded-md">
                  <Brain className="h-3 w-3 text-primary" />
                </div>
                Gender
                <span className="text-destructive">*</span>
              </Label>

              <div className="flex gap-2">
                {[
                  { value: 'male', label: 'Male', emoji: '👨', gradient: 'from-blue-500 to-blue-600' },
                  { value: 'female', label: 'Female', emoji: '👩', gradient: 'from-pink-500 to-pink-600' },
                  { value: 'other', label: 'Other', emoji: '✨', gradient: 'from-purple-500 to-purple-600' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex-1 flex flex-col items-center justify-center p-2 rounded-lg border cursor-pointer transition-all duration-300 ${gender === option.value
                      ? `bg-gradient-to-br ${option.gradient} border-transparent text-white shadow-md`
                      : 'bg-card border-input hover:border-primary/50'
                      }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option.value}
                      checked={gender === option.value}
                      onChange={(e) => setGender(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-lg mb-0.5">{option.emoji}</span>
                    <span className={`font-medium text-xs ${gender === option.value ? 'text-white' : ''}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 mt-auto sm:mt-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-10 text-xs border hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300"
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-1.5" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-[2] h-10 text-xs bg-gradient-to-r from-primary via-primary-glow to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold group"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating..."
                  : (
                    <>
                      {isForCouple ? "Start Quiz" : "Start Quiz"}
                      <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )
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
