-- Run this SQL in your Supabase SQL Editor to create the roast_reactions table

-- Create the roast_reactions table
CREATE TABLE IF NOT EXISTS public.roast_reactions (
  emoji TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.roast_reactions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read reactions
CREATE POLICY "Anyone can view reactions"
  ON public.roast_reactions
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow anyone to insert reactions
CREATE POLICY "Anyone can insert reactions"
  ON public.roast_reactions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow anyone to update reactions
CREATE POLICY "Anyone can update reactions"
  ON public.roast_reactions
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_roast_reactions_emoji ON public.roast_reactions(emoji);

-- Insert initial reaction emojis with 0 counts
INSERT INTO public.roast_reactions (emoji, count)
VALUES 
  ('😂', 0),
  ('💀', 0),
  ('🔥', 0),
  ('😭', 0)
ON CONFLICT (emoji) DO NOTHING;

-- Create a function to increment reaction count atomically
CREATE OR REPLACE FUNCTION increment_reaction(reaction_emoji TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO public.roast_reactions (emoji, count)
  VALUES (reaction_emoji, 1)
  ON CONFLICT (emoji)
  DO UPDATE SET 
    count = roast_reactions.count + 1,
    updated_at = NOW()
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_reaction(TEXT) TO public;
