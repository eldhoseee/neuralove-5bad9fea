-- Create quiz_responses table
CREATE TABLE IF NOT EXISTS public.quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  cognitive_type TEXT NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create couple_responses table
CREATE TABLE IF NOT EXISTS public.couple_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  person1_name TEXT NOT NULL,
  person2_name TEXT NOT NULL,
  person1_type TEXT NOT NULL,
  person2_type TEXT NOT NULL,
  person1_answers JSONB NOT NULL,
  person2_answers JSONB NOT NULL,
  compatibility_score INTEGER,
  match_quality TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_feedback table
CREATE TABLE IF NOT EXISTS public.user_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  feedback_type TEXT NOT NULL,
  related_response_id UUID,
  rating INTEGER NOT NULL,
  would_recommend BOOLEAN,
  comments TEXT,
  suggestions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON public.quiz_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_cognitive_type ON public.quiz_responses(cognitive_type);
CREATE INDEX IF NOT EXISTS idx_couple_responses_created_at ON public.couple_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_user_feedback_feedback_type ON public.user_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_user_feedback_rating ON public.user_feedback(rating);

-- Enable Row Level Security
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.couple_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public insert (anyone can submit feedback)
CREATE POLICY "Anyone can insert quiz responses" 
  ON public.quiz_responses 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can insert couple responses" 
  ON public.couple_responses 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can insert feedback" 
  ON public.user_feedback 
  FOR INSERT 
  WITH CHECK (true);

-- Create RLS policies for authenticated read (only authenticated users can view data)
CREATE POLICY "Authenticated users can view quiz responses" 
  ON public.quiz_responses 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view couple responses" 
  ON public.couple_responses 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view feedback" 
  ON public.user_feedback 
  FOR SELECT 
  USING (auth.role() = 'authenticated');