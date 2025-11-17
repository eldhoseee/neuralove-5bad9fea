# Roast Reactions - Supabase Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Run SQL in Supabase
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `ofcktyrnwvlfiqnnhkoc`
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the entire contents of `supabase-setup.sql`
6. Click **Run** (or press Ctrl/Cmd + Enter)

You should see a success message. This creates:
- ✅ `roast_reactions` table
- ✅ Row Level Security policies (allows public read/write)
- ✅ `increment_reaction()` function for atomic updates
- ✅ Initial emoji data (all starting at 0)

### Step 2: Update TypeScript Types (Optional)
To remove TypeScript errors, regenerate your Supabase types:

```bash
npx supabase gen types typescript --project-id ofcktyrnwvlfiqnnhkoc > src/integrations/supabase/types.ts
```

Or just ignore the TypeScript warnings - the code will work fine!

### Step 3: Deploy to Netlify
```bash
git add .
git commit -m "Add global real-time reaction counts with Supabase"
git push
```

Netlify will automatically deploy your changes.

## ✨ How It Works

### Global Real-Time Updates
- **All users see the same counts** - stored in Supabase database
- **Instant updates** - uses Supabase Realtime subscriptions
- **No refresh needed** - counts update automatically across all browsers
- **Atomic increments** - prevents race conditions with database function

### User Experience
1. User clicks a reaction emoji (😂, 💀, 🔥, or 😭)
2. Count increments immediately (optimistic update)
3. Database updates in background
4. All connected users see the update in real-time
5. Counts persist forever (unless you reset them)

## 🔧 Management

### View Current Counts
Run this in Supabase SQL Editor:
```sql
SELECT emoji, count FROM roast_reactions ORDER BY count DESC;
```

### Reset All Counts
```sql
UPDATE roast_reactions SET count = 0;
```

### Reset Specific Emoji
```sql
UPDATE roast_reactions SET count = 0 WHERE emoji = '💀';
```

### Check Real-Time Connections
Your app subscribes to the `roast_reactions_changes` channel. You can see active connections in:
- Supabase Dashboard > Database > Realtime

## 🐛 Troubleshooting

### Counts not updating?
1. Check browser console for errors
2. Verify Supabase project is running (green status in dashboard)
3. Check that Row Level Security policies are enabled

### TypeScript errors?
- Add `as any` type assertions (already done in the code)
- Or regenerate types using the command above

### Want to see it in action?
1. Open your Netlify site in two browser windows
2. Click a reaction in one window
3. Watch it update in the other window instantly! 🎉

## 📊 Analytics Ideas

You can query popular reactions:
```sql
SELECT 
  emoji,
  count,
  ROUND(count * 100.0 / SUM(count) OVER (), 2) as percentage
FROM roast_reactions
ORDER BY count DESC;
```

This shows which roasts hit hardest with your users! 💀🔥
