-- Updated Roast Reactions Table Schema
-- This version binds reactions to individual roasts using roast_id

-- Drop old table and function if they exist
DROP TABLE IF EXISTS roast_reactions CASCADE;
DROP FUNCTION IF EXISTS increment_reaction(TEXT) CASCADE;
DROP FUNCTION IF EXISTS increment_roast_reaction(TEXT, TEXT) CASCADE;

-- Create the updated roast_reactions table with roast_id
CREATE TABLE roast_reactions (
  roast_id TEXT NOT NULL,
  emoji TEXT NOT NULL,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (roast_id, emoji)
);

-- Enable Row Level Security
ALTER TABLE roast_reactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can view roast reactions"
  ON roast_reactions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert roast reactions"
  ON roast_reactions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update roast reactions"
  ON roast_reactions FOR UPDATE
  TO public
  USING (true);

-- Create function to increment reaction count for a specific roast
CREATE OR REPLACE FUNCTION increment_roast_reaction(p_roast_id TEXT, p_emoji TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  -- Insert or update the reaction count
  INSERT INTO roast_reactions (roast_id, emoji, count, updated_at)
  VALUES (p_roast_id, p_emoji, 1, NOW())
  ON CONFLICT (roast_id, emoji)
  DO UPDATE SET
    count = roast_reactions.count + 1,
    updated_at = NOW()
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_roast_reaction(TEXT, TEXT) TO public;

-- Create index for better query performance
CREATE INDEX idx_roast_reactions_roast_id ON roast_reactions(roast_id);
CREATE INDEX idx_roast_reactions_emoji ON roast_reactions(emoji);

-- Note: No need to insert initial data since reactions are created on-demand per roast
