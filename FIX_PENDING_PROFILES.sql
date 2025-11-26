-- This script fixes the "Pending" cognitive type issue
-- It checks RLS policies and provides options to fix existing profiles

-- First, check if RLS is enabled on profiles table
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- Check existing RLS policies on profiles table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'profiles';

-- Option 1: If you want to allow public updates (NOT RECOMMENDED for production)
-- Uncomment the following to add a policy that allows anyone to update their own profile:
/*
CREATE POLICY "Allow public profile updates" 
ON public.profiles 
FOR UPDATE 
TO public 
USING (true) 
WITH CHECK (true);
*/

-- Option 2: Better approach - Allow updates based on user authentication
-- This requires that users are authenticated when updating
/*
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid()::text = id) 
WITH CHECK (auth.uid()::text = id);
*/

-- TEMPORARY FIX: Manually update existing "Pending" profiles
-- NOTE: This won't fix the root cause, only existing data
-- Run this in your Supabase SQL Editor if you want to clear "Pending" statuses:
/*
UPDATE profiles 
SET cognitive_type = 'Unknown'
WHERE cognitive_type = 'Pending';
*/

-- To see all profiles and their current status:
SELECT id, name, age, cognitive_type, created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 20;
