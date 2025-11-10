-- Run this SQL in your Lovable Cloud Database
-- Go to Cloud tab → Database → SQL Editor and paste this

-- Create table for storing quiz responses
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  session_id TEXT NOT NULL,
  user_name TEXT,
  cognitive_type TEXT NOT NULL,
  answers JSONB NOT NULL,
  motivation TEXT,
  explanations JSONB,
  user_agent TEXT,
  ip_address TEXT
);

-- Create table for storing couple compatibility responses
CREATE TABLE IF NOT EXISTS couple_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  session_id TEXT NOT NULL,
  person1_name TEXT NOT NULL,
  person1_type TEXT NOT NULL,
  person1_answers JSONB NOT NULL,
  person2_name TEXT NOT NULL,
  person2_type TEXT NOT NULL,
  person2_answers JSONB NOT NULL,
  compatibility_score INTEGER,
  match_quality TEXT,
  user_agent TEXT,
  ip_address TEXT
);

-- Create table for storing user feedback
CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  session_id TEXT NOT NULL,
  related_response_id UUID,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('quiz', 'couple', 'general')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  would_recommend BOOLEAN,
  improvement_suggestions TEXT,
  user_agent TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_cognitive_type ON quiz_responses(cognitive_type);
CREATE INDEX IF NOT EXISTS idx_couple_responses_created_at ON couple_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_feedback_created_at ON user_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_feedback_type ON user_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_user_feedback_rating ON user_feedback(rating);

-- Enable Row Level Security
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE couple_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anyone to insert (for public feedback)
CREATE POLICY "Allow public insert quiz_responses" ON quiz_responses
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public insert couple_responses" ON couple_responses
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public insert user_feedback" ON user_feedback
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Create policies for reading (only authenticated users can read)
CREATE POLICY "Allow authenticated read quiz_responses" ON quiz_responses
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read couple_responses" ON couple_responses
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read user_feedback" ON user_feedback
  FOR SELECT TO authenticated
  USING (true);
