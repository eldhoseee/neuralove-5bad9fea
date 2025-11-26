-- Enable Row Level Security for user_feedback table
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert feedback (public access)
CREATE POLICY "Allow public insert feedback" ON user_feedback
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow anyone to read all feedback (for admin dashboard)
CREATE POLICY "Allow public read feedback" ON user_feedback
  FOR SELECT
  TO public
  USING (true);

-- Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'user_feedback';
