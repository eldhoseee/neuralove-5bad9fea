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

export const useRoastReactions = () => {
  const [reactions, setReactions] = useState<ReactionData[]>(
    REACTION_EMOJIS.map(r => ({ ...r, count: 0 }))
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial reaction counts
  useEffect(() => {
    fetchReactions();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('roast_reactions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'roast_reactions'
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
  }, []);

  const fetchReactions = async () => {
    try {
      const { data, error } = await supabase
        .from('roast_reactions' as any)
        .select('emoji, count')
        .order('emoji');

      if (error) {
        console.error('Error fetching reactions:', error);
        return;
      }

      if (data) {
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
      // Use the database function for atomic increment
      const { data, error } = await supabase.rpc('increment_reaction' as any, {
        reaction_emoji: emoji
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
