import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ReactionData {
  emoji: string;
  label: string;
  count: number;
}

const REACTION_EMOJIS = [
  { emoji: '😂', label: 'Crying' },
  { emoji: '💀', label: 'Dead' },
  { emoji: '🔥', label: 'Fire' },
  { emoji: '😭', label: 'Brutal' },
];

// Simple hash function to create a unique ID for each roast
const hashRoast = (roast: string): string => {
  let hash = 0;
  for (let i = 0; i < roast.length; i++) {
    const char = roast.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString();
};

export const useRoastReactions = (roastText: string) => {
  const roastId = hashRoast(roastText);
  const [reactions, setReactions] = useState<ReactionData[]>(
    REACTION_EMOJIS.map(r => ({ ...r, count: 0 }))
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial reaction counts
  useEffect(() => {
    fetchReactions();
    
    // Subscribe to real-time updates for this specific roast
    const channel = supabase
      .channel(`roast_reactions_${roastId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'roast_reactions',
          filter: `roast_id=eq.${roastId}`
        },
        () => {
          // Refetch when any change occurs
          fetchReactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roastId]);

  const fetchReactions = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('roast_reactions')
        .select('emoji, count')
        .eq('roast_id', roastId)
        .order('emoji');

      if (error) {
        console.error('Error fetching reactions:', error);
        return;
      }

      if (data && Array.isArray(data)) {
        // Merge fetched data with emoji definitions
        const updatedReactions = REACTION_EMOJIS.map(reactionDef => {
          const found = data.find((d: any) => d.emoji === reactionDef.emoji);
          return {
            ...reactionDef,
            count: found?.count || 0,
          };
        });
        setReactions(updatedReactions);
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementReaction = async (emoji: string) => {
    // Optimistic update for instant UI feedback
    setReactions(prev =>
      prev.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r)
    );

    try {
      // Use the database function for atomic increment with roast_id
      const { data, error } = await (supabase as any).rpc('increment_roast_reaction', {
        p_roast_id: roastId,
        p_emoji: emoji
      });

      if (error) {
        console.error('Error incrementing reaction:', error);
        // Revert optimistic update on error
        fetchReactions();
      }
    } catch (error) {
      console.error('Error incrementing reaction:', error);
      // Revert optimistic update on error
      fetchReactions();
    }
  };

  return { reactions, incrementReaction, isLoading };
};
