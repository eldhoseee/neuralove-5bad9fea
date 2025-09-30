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
import { Brain, Sparkles, Users, Heart, GraduationCap, Activity, Wine, Cigarette, Target, Baby, Dog, MapPin } from 'lucide-react';

interface UserProfileFormProps {
  cognitiveType?: string;
  isForCouple?: boolean;
  onComplete?: (userData: { id: string; name: string; age: number; gender: string }) => void;
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
  const [education, setEducation] = useState('');
  const [height, setHeight] = useState([170]);
  const [exercise, setExercise] = useState('');
  const [drinking, setDrinking] = useState('');
  const [smoking, setSmoking] = useState('');
  const [relationshipGoal, setRelationshipGoal] = useState('');
  const [childrenPreference, setChildrenPreference] = useState('');
  const [pets, setPets] = useState('');
  const [location, setLocation] = useState('');
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
      const { data: insertedProfile, error } = await supabase
        .from('profiles')
        .insert({
          name: name.trim(),
          age: age[0],
          gender,
          cognitive_type: cognitiveType,
          education: education || null,
          height_cm: height[0],
          exercise: exercise || null,
          drinking: drinking || null,
          smoking: smoking || null,
          relationship_goal: relationshipGoal || null,
          children_preference: childrenPreference || null,
          pets: pets || null,
          location: location.trim() || null,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: isForCouple ? "Couple profile created! 💕" : "Profile created successfully! 🎉",
        description: isForCouple ? "Ready to analyze your compatibility!" : "Ready to start your cognitive quiz!",
      });

      onComplete?.({
        id: insertedProfile.id,
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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl bg-gradient-card shadow-glow border-primary/20 my-8">
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
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Your Name <span className="text-destructive">*</span>
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

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="transition-all duration-300 focus:shadow-glow/20"
                />
              </div>
            </div>

            {/* Age Slider */}
            <div className="space-y-4">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Age: {age[0]} <span className="text-destructive">*</span>
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
                Gender <span className="text-destructive">*</span>
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

            <div className="grid md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Education
                </Label>
                <Select value={education} onValueChange={setEducation}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Exercise */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Exercise
                </Label>
                <Select value={exercise} onValueChange={setExercise}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="How often?" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="sometimes">Sometimes</SelectItem>
                    <SelectItem value="regularly">Regularly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Drinking */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Wine className="h-4 w-4 text-primary" />
                  Drinking
                </Label>
                <Select value={drinking} onValueChange={setDrinking}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select habit" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="socially">Socially</SelectItem>
                    <SelectItem value="regularly">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Smoking */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Cigarette className="h-4 w-4 text-primary" />
                  Smoking
                </Label>
                <Select value={smoking} onValueChange={setSmoking}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select habit" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="sometimes">Sometimes</SelectItem>
                    <SelectItem value="regularly">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Relationship Goal */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Looking For
                </Label>
                <Select value={relationshipGoal} onValueChange={setRelationshipGoal}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="What are you seeking?" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="friendship">Friendship</SelectItem>
                    <SelectItem value="dating">Dating</SelectItem>
                    <SelectItem value="relationship">Relationship</SelectItem>
                    <SelectItem value="marriage">Marriage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Children Preference */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Baby className="h-4 w-4 text-primary" />
                  Children
                </Label>
                <Select value={childrenPreference} onValueChange={setChildrenPreference}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Your preference" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="have_and_want_more">Have & want more</SelectItem>
                    <SelectItem value="have_and_dont_want">Have & don't want more</SelectItem>
                    <SelectItem value="dont_have_but_want">Don't have but want</SelectItem>
                    <SelectItem value="dont_have_and_dont_want">Don't have & don't want</SelectItem>
                    <SelectItem value="open">Open to discussion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pets */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Dog className="h-4 w-4 text-primary" />
                  Pets
                </Label>
                <Select value={pets} onValueChange={setPets}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Pet preference" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="dog">Dog person</SelectItem>
                    <SelectItem value="cat">Cat person</SelectItem>
                    <SelectItem value="both">Love both</SelectItem>
                    <SelectItem value="other">Other pets</SelectItem>
                    <SelectItem value="none">No pets</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Height */}
              <div className="space-y-4 md:col-span-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  Height: {height[0]} cm ({Math.floor(height[0] / 30.48 / 12)}'{Math.round((height[0] / 30.48) % 12)}")
                </Label>
                <Slider
                  value={height}
                  onValueChange={setHeight}
                  max={220}
                  min={140}
                  step={1}
                  className="w-full"
                />
              </div>
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
