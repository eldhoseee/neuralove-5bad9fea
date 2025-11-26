# Admin Dashboard - Setup Guide

## Overview
Your admin dashboard is now set up at `/admin` route with the following features:

### ✅ Features Implemented

1. **User Profile Viewing**
   - See all registered users
   - View their assessment results (cognitive types)
   - Search and filter by name, gender, or cognitive type
   - Export data to CSV

2. **Bias Detection System**
   - Automatic detection of uneven profile distribution
   - Visual indicators for over/under-represented types
   - Statistical analysis with deviation percentages
   - Alert system when bias threshold (±20%) is exceeded

3. **Profile Distribution Analytics**
   - Count of users assigned to each cognitive type
   - Percentage breakdown
   - Visual progress bars
   - Color-coded warnings for biased types (red) vs normal (blue)

4. **Feedback Section** (placeholder ready)
   - Average rating display
   - Satisfaction rate calculation
   - Individual feedback reviews
   - Instructions for setting up feedback collection

## How to Access

Visit: `http://localhost:8080/admin` (or your production URL + /admin)

## Understanding Bias Detection

### What is Being Checked?
- The system calculates how many users are assigned to each cognitive type
- It compares actual distribution vs. expected even distribution
- Flags any type that deviates more than 20% from the expected average

### Example:
- If you have 12 cognitive types, each should ideally have ~8.33% of users
- If "Analytical Thinker" has 25% while others have 5%, it will be flagged
- This helps ensure your assessment algorithm is fair and unbiased

### Visual Indicators:
- **Green "Normal" badge**: Distribution is balanced
- **Red "Warning" badge**: Significant bias detected
- **Red progress bars**: Over-represented types
- **Blue progress bars**: Normal distribution types

## Feedback Collection System

✅ **Feedback collection is already set up and working!**

### Current Implementation

The feedback system uses the existing `user_feedback` table with the following schema:

```typescript
interface UserFeedback {
  id: string;                          // UUID primary key
  session_id: string;                  // Unique session identifier
  feedback_type: string;               // Type of feedback (e.g., 'quiz', 'couple')
  rating: number;                      // 1-5 star rating
  comments: string | null;             // Optional user comments
  suggestions: string | null;          // Optional improvement suggestions
  would_recommend: boolean | null;     // Auto-calculated from rating >= 4
  related_response_id: string | null;  // Link to quiz response
  created_at: string;                  // Timestamp
}
```

### Where Feedback is Collected

1. **Quiz Results Page** (`QuizResult.tsx`)
   - Shows `ResultFeedbackForm` after quiz completion
   - Collects rating, comments, recommendations, and improvement suggestions
   - Automatically links feedback to quiz response

2. **Admin Dashboard** (`/admin`)
   - `FeedbackSection` displays all collected feedback
   - Shows average rating and satisfaction rate
   - Lists individual feedback with star ratings
   - Filters and analytics ready

### Components Already Created

✅ `ResultFeedbackForm.tsx` - Comprehensive feedback form with:
- Interactive star rating (1-5)
- Comment text area
- Would recommend toggle
- Improvement suggestions field
- Success/error toast notifications

✅ `FeedbackSection.tsx` - Admin feedback viewer with:
- Total feedback count
- Average rating calculation
- Satisfaction rate (% of 4+ star ratings)
- Individual feedback cards with session IDs and timestamps

✅ `FeedbackForm.tsx` - Standalone simple feedback form (optional alternative)

## Exporting Data

Click the "Export CSV" button in the admin dashboard to download all user data including:
- Name
- Age
- Gender
- Cognitive Type
- Registration Date

## Next Steps

1. ✅ Access your admin dashboard at `/admin`
2. ✅ Monitor bias in profile distribution
3. ✅ Feedback collection is active and working
4. ✅ View user feedback in FeedbackSection
5. ⏳ Set up authentication for admin route (recommended for production)
6. ⏳ Add email notifications for new feedback (optional)

## Security Recommendation

For production, protect the `/admin` route with authentication:

```typescript
// In Admin.tsx
useEffect(() => {
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Redirect to login
      window.location.href = '/';
    }
  };
  checkAuth();
}, []);
```

---

**Dashboard is ready to use! Visit /admin to start monitoring your users.**
