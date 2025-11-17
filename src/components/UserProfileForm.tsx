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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gender) {
      toast({
        title: "Please complete required fields",
        description: "Name and gender are required to proceed.",
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
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-2 sm:p-4 py-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <Card className="w-full max-w-3xl bg-card/95 backdrop-blur-sm shadow-2xl border-primary/20 relative">
        <CardHeader className="text-center space-y-3 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mb-2 animate-bounce shadow-lg">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            {isForCouple ? "Couple Profile Setup" : "Create Your Profile"}
          </CardTitle>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            {isForCouple 
              ? "Set up your profile to discover your couple compatibility" 
              : "Tell us about yourself before we analyze your cognitive compatibility"
            }
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 pt-2">
            <div className="h-1.5 w-12 bg-primary rounded-full"></div>
            <div className="h-1.5 w-12 bg-primary/30 rounded-full"></div>
            <div className="h-1.5 w-12 bg-primary/30 rounded-full"></div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="space-y-3 group">
              <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                </div>
                Your Name
                <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg h-14 pl-4 pr-12 transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 border-2 focus:border-primary"
                />
                {name.trim() && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="bg-green-500 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Age Slider */}
            <div className="space-y-5">
              <Label className="text-base font-semibold flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                Your Age
                <span className="text-destructive">*</span>
              </Label>
              
              <div className="relative px-2">
                {/* Large Age Display */}
                <div className="text-center mb-6">
                  <div className="inline-block relative">
                    <span className="text-7xl font-bold bg-gradient-to-br from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                      {age[0]}
                    </span>
                    <span className="text-2xl text-muted-foreground ml-2">years</span>
                  </div>
                </div>

                <Slider
                  value={age}
                  onValueChange={setAge}
                  max={80}
                  min={18}
                  step={1}
                  className="w-full"
                />
                
                {/* Generation Badge */}
                <div className="mt-6 text-center">
                  <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl ${generationInfo.bgColor} border-2 ${generationInfo.borderColor} shadow-lg transition-all duration-500 hover:scale-105`}>
                    <div className={`p-2 bg-gradient-to-br ${generationInfo.gradient} rounded-xl`}>
                      <generationInfo.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className={`font-bold text-lg ${generationInfo.textColor}`}>
                        {generationInfo.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {generationInfo.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                Gender
                <span className="text-destructive">*</span>
              </Label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: 'male', label: 'Male', emoji: '👨', gradient: 'from-blue-500 to-blue-600' },
                  { value: 'female', label: 'Female', emoji: '👩', gradient: 'from-pink-500 to-pink-600' },
                  { value: 'other', label: 'Other', emoji: '✨', gradient: 'from-purple-500 to-purple-600' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      gender === option.value
                        ? `bg-gradient-to-br ${option.gradient} border-transparent text-white shadow-xl scale-105`
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
                    <span className="text-4xl mb-2">{option.emoji}</span>
                    <span className={`font-semibold text-lg ${gender === option.value ? 'text-white' : ''}`}>
                      {option.label}
                    </span>
                    {gender === option.value && (
                      <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-14 text-base border-2 hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-300"
                disabled={isSubmitting}
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-14 text-base bg-gradient-to-r from-primary via-primary-glow to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 font-semibold group"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? "Creating..." 
                  : (
                    <>
                      {isForCouple ? "Start Compatibility Quiz" : "Start Quiz"}
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default UserProfileForm;
