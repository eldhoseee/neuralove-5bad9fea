-- NOTE: The quiz_responses table does not have a user_name column to match with profiles
-- The actual schema only has: session_id, cognitive_type, answers, created_at, id
-- 
-- SOLUTION: The QuizResult component now updates profiles.cognitive_type directly
-- when a quiz is completed using the profileData.id that's passed to it.
--
-- For existing users with "Pending" status, they need to retake the quiz OR
-- you need to manually update them based on session_id patterns if they exist.

-- Check current state of profiles
SELECT 
  name,
  cognitive_type,
  age,
  gender,
  created_at
FROM profiles
ORDER BY created_at DESC;

-- If you need to manually set a cognitive type for a specific user:
-- UPDATE profiles 
-- SET cognitive_type = 'The Architect', updated_at = NOW()
-- WHERE name = 'John Doe';
