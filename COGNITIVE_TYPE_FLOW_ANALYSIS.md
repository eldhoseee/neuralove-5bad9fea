# Cognitive Type Flow Analysis

## Current Flow (BROKEN):

### Step 1: User Profile Creation
**File:** `UserProfileForm.tsx`
**When:** User clicks "Find Your MindMatch" → Profile form opens
**Issue:** `cognitiveType={quizResult?.cognitiveType}` is passed, but `quizResult` is NULL
**Result:** Profile created with `cognitive_type: null` or `undefined`

```tsx
// HeroSection.tsx line 398
<UserProfileForm
  cognitiveType={quizResult?.cognitiveType}  // ❌ quizResult is null!
  isForCouple={isForCouple}
  onComplete={handleProfileComplete}
/>
```

### Step 2: Quiz Completion
**File:** `HeroSection.tsx`
**When:** User completes quiz
**Result:** `quizResult` is set with cognitive type

```tsx
// Line 141
setQuizResult(data);  // ✅ Now quizResult has cognitiveType
```

### Step 3: Profile Update Attempt
**File:** `QuizResult.tsx`
**When:** Quiz result component mounts
**Issue:** Tries to UPDATE profile, but may be blocked by RLS

```tsx
// Line 64-75
const { data: updateData, error: updateError } = await supabase
  .from('profiles')
  .update({ cognitive_type: cognitiveType })
  .eq('id', profileData.id)
  .select();
```

**Potential Blockers:**
- RLS policy doesn't allow public updates
- Profile ID mismatch
- Supabase not configured for public access

---

## SOLUTION OPTIONS:

### Option 1: Set cognitive_type to "Pending" on creation (CURRENT)
```tsx
// UserProfileForm.tsx
cognitive_type: cognitiveType ?? "Pending"
```
**Pros:** Visible status in admin
**Cons:** Still requires UPDATE to work, RLS may block

### Option 2: Don't set cognitive_type on creation (RECOMMENDED)
```tsx
// UserProfileForm.tsx - Don't pass cognitiveType at all
cognitive_type: null  // Will be set after quiz
```
**Pros:** Cleaner, explicit null vs Pending
**Cons:** Still needs RLS policy to allow updates

### Option 3: Fix RLS Policy (REQUIRED FOR ANY SOLUTION)
```sql
-- Add this policy in Supabase SQL Editor
CREATE POLICY "Allow public profile updates" 
ON public.profiles 
FOR UPDATE 
TO public 
USING (true) 
WITH CHECK (true);
```
**Required for:** Any update to work

---

## VERIFICATION STEPS:

1. **Check RLS Status:**
   ```sql
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'profiles';
   ```

2. **Check Existing Policies:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'profiles';
   ```

3. **Test Update Manually:**
   ```sql
   -- Try updating a profile manually
   UPDATE profiles 
   SET cognitive_type = 'Test Type'
   WHERE id = 'some-profile-id';
   ```

4. **Check Browser Console:**
   Look for these logs:
   - `=== PROFILE COMPLETED ===`
   - `=== SAVING QUIZ RESPONSE ===`
   - `=== UPDATING PROFILE ===`
   - Any errors with ❌

---

## RECOMMENDED FIX:

1. **Add RLS Policy** (in Supabase):
   ```sql
   CREATE POLICY "Allow public profile updates" 
   ON public.profiles 
   FOR UPDATE 
   TO public 
   USING (true) 
   WITH CHECK (true);
   ```

2. **Change Profile Creation** (already done):
   Profile created with `cognitive_type: "Pending"` to show status

3. **Verify Update Works**:
   - Create NEW profile
   - Take quiz
   - Check admin dashboard
   - Should show actual cognitive type, not "Pending"

4. **Fix Old Profiles** (optional):
   ```sql
   -- Reset old "Pending" profiles so users can retake quiz
   UPDATE profiles 
   SET cognitive_type = null
   WHERE cognitive_type = 'Pending';
   ```
