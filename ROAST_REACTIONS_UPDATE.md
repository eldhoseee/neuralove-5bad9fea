# Updated Roast Reactions Setup

## What Changed

The reaction system has been updated to **bind each reaction count to individual roasts** instead of having global counts. This means:
- Each roast has its own set of reaction counts
- When you refresh to a new roast, you'll see that roast's specific reaction counts
- Reactions persist per roast across all users

## Database Changes

### Updated Schema
- **Primary Key**: Now uses `(roast_id, emoji)` composite key
- **Roast ID**: Each roast gets a unique hash-based ID
- **Function**: New `increment_roast_reaction(p_roast_id, p_emoji)` function

## Setup Instructions

### 1. Run the Updated SQL

Go to your Supabase project dashboard:
1. Navigate to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase-roast-reactions-updated.sql`
4. Click **Run**

### 2. What This Does

The SQL script will:
- Drop the old global reactions table and function
- Create a new table with `roast_id` + `emoji` as the composite primary key
- Set up Row Level Security for public access
- Create the new `increment_roast_reaction()` function
- Add indexes for performance

## How It Works

1. **Roast Identification**: Each roast text is hashed to create a unique `roast_id`
2. **Per-Roast Reactions**: Reactions are stored with `(roast_id, emoji)` combinations
3. **Real-time Updates**: Users see live reaction counts for the current roast
4. **On-Demand Creation**: Reaction records are created when first clicked

## Testing

1. Open your site in two browser windows
2. Note the current roast
3. Click a reaction emoji in one window
4. See it update in real-time in the other window
5. Refresh to get a different roast
6. Notice the new roast has different (likely zero) reaction counts
7. Go back to the original roast (you may need to refresh several times)
8. See that the original roast's reaction counts were preserved!

## Managing Data

### View all reactions for a specific roast
```sql
SELECT * FROM roast_reactions 
WHERE roast_id = 'YOUR_ROAST_ID_HERE'
ORDER BY emoji;
```

### View reaction counts across all roasts
```sql
SELECT roast_id, emoji, count 
FROM roast_reactions 
ORDER BY count DESC;
```

### Reset all reactions
```sql
TRUNCATE TABLE roast_reactions;
```

### Reset reactions for a specific roast
```sql
DELETE FROM roast_reactions 
WHERE roast_id = 'YOUR_ROAST_ID_HERE';
```

## Migration Notes

- All previous global reaction counts will be lost when you run the updated SQL
- This is expected as we're changing from a global to a per-roast system
- The system will start fresh with on-demand reaction creation

## Troubleshooting

**Reactions not updating?**
- Check browser console for errors
- Verify the SQL was run successfully in Supabase
- Confirm the function `increment_roast_reaction` exists

**Same roast showing different counts?**
- This shouldn't happen - the hash function is deterministic
- Check if you're testing in incognito vs normal mode (shouldn't matter but worth checking)

**Real-time not working?**
- Ensure Supabase Realtime is enabled for the `roast_reactions` table
- Check your network connection
- Try refreshing the page
