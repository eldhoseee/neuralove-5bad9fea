import { useState, useEffect, useRef } from "react";
import { Flame, RefreshCw, Share2, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { useRoastReactions } from "@/hooks/useRoastReactions";

const roasts = [
  "bestie your entire love life is just main character energy with zero character development 💀",
  "not you swiping right on red flags and calling it 'manifesting' babes that's just denial ✨",
  "your tinder bio really said 'good vibes only' and you thought that was a whole personality??? the delusion 🤡",
  "nahhh you really out here judging compatibility by their spotify playlist like you're not basic too 🎵",
  "imagine matching with someone hot and immediately losing all ability to form sentences. couldn't be me (it's you) 😭",
  "you've ghosted 15 people this month but get anxiety when someone takes 10 minutes to reply. make it make sense 👻",
  "POV: you're on your 4th dating app thinking the problem is the algorithm and not your commitment issues 📱",
  "babe wake up, your situationship just posted another girl. time to download hinge again! 🚨",
  "you really thought 'no hookups' would work when all your pics are thirst traps. the math ain't mathing 🧮",
  "not the 'im different from other girls/guys' in your bio while having the EXACT same profile as everyone else 💀",
  "you unmatched someone for using 'your' instead of 'you're' but can't spell commitment. iconic! 📖",
  "telling yourself it's a 'roster' when really you just have trust issues and can't pick one. therapy babes! 🛋️",
  "you've been breadcrumbed so many times you're basically a whole loaf at this point. rise up! 🍞",
  "your standards: 6ft+, 6 figures, 6 pack. what YOU bring to the table: red flags and spotify wrapped 📊",
  "babygirl really said 'let's see where this goes' knowing damn well it's going NOWHERE like always 🚶",
  "you saw 'entrepreneur' in their bio and ignored all the other red flags. you played yourself! 💼",
  "not you screenshot-ing convos for the group chat but wondering why dating feels performative. chronically online! 💬",
  "bestie you rejected your soulmate because their rising sign was incompatible with your made-up standards 🔮",
  "you've got 47 situationships but zero relationships. collecting men/women like infinity stones fr 💎",
  "matching at 2am and expecting husband/wife material. baby the math is not mathing 🌙",
  "your toxic trait is thinking you can fix them. newsflash: you can't even fix your sleep schedule 🔧",
  "you really said 'i don't do drama' and then proceeded to BE the drama. self-awareness who? 🎭",
  "imagine thinking height is a personality trait. you're the reason dating apps are a nightmare bestie 📏",
  "POV: you're ignoring green flags because red flags are more exciting. seek help! 🚩",
  "you've been 'talking' for 6 months. that's not dating, that's a podcast no one asked for 🎙️",
  "your love language is leaving people on read and wondering why you're single. a mystery! 📬",
  "not you having 'no games' in your bio while playing the MOST games. gaslight gatekeep girlboss! ⚽",
  "you deadass swiped left on your perfect match because they had an android. touch grass! 🌱",
  "thinking 'wyd' is an acceptable conversation starter in 2025. the bar is in hell bestie 🕳️",
  "you're out here romanticizing toxic behavior and calling it 'chemistry'. that's just trauma bonding babe 💔",
  "your idea of compatibility: they laughed at your meme. the bar is literally underground 😂",
  "POV: you're still using photos from 2019 and wondering why dates look confused. catfish energy! 🎣",
  "babe you've had the same bio for 3 years. at least the apps are consistent unlike your matches 📝",
  "you really think you're gonna meet the love of your life while swiping on the toilet. respectfully, no 🚽",
  "imagine being 'too busy to date' but spending 4 hours daily scrolling through profiles. okay bestie 📲",
  "not you making a pros and cons list for a person you met once. certified overthinker moment 📋",
  "your attachment style is 'anxious avoidant' and it SHOWS. literally everyone can tell 🎯",
  "you've perfected the art of self-sabotage but call it 'protecting your peace'. delulu is not the solulu! ☮️",
  "thinking you'll find depth on tinder is like shopping for vegetables at a gas station. technically possible but... 🍅",
  "you're really out here with a whole roster but can't remember anyone's middle name. player era! 🎮",
  "your rizz is just copy-pasted pickup lines from tiktok and everyone knows it. do better! 📹",
  "not you having main character syndrome while being literally everyone's side quest 🎮",
  "POV: it's been 3 weeks and you still don't know if you're dating or just 'hanging out'. communication is free! 🗣️",
  "you've trauma dumped on every first date this year. maybe try therapy instead of tinder? just saying 🛋️",
  "bestie your whole vibe is 'i can make them worse' and you're succeeding. congrats? 🎊"
];

const RoastOfTheDay = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const [showBurst, setShowBurst] = useState(false);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use the persistent reaction hook
  const { reactions, incrementReaction } = useRoastReactions();

  const getRandomRoast = () => {
    const randomIndex = Math.floor(Math.random() * roasts.length);
    return roasts[randomIndex];
  };

  const [currentRoast, setCurrentRoast] = useState(getRandomRoast());

  // Typewriter effect
  useEffect(() => {
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
    }
    
    setDisplayedText('');
    setIsTyping(true);
    setShowBurst(true);
    
    let currentIndex = 0;
    const typeNextChar = () => {
      if (currentIndex < currentRoast.length) {
        setDisplayedText(currentRoast.slice(0, currentIndex + 1));
        currentIndex++;
        typewriterRef.current = setTimeout(typeNextChar, 20); // 20ms per character
      } else {
        setIsTyping(false);
        setTimeout(() => setShowBurst(false), 2000);
      }
    };
    
    setTimeout(typeNextChar, 300);
    
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
      }
    };
  }, [currentRoast]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setShowBurst(false);
    setTimeout(() => {
      setCurrentRoast(getRandomRoast());
      setIsRefreshing(false);
    }, 300);
  };

  const handleReaction = (emoji: string) => {
    // Increment counter using the hook (persists across sessions)
    incrementReaction(emoji);
    
    // Create floating emoji
    const id = Date.now() + Math.random();
    const x = Math.random() * 80 + 10; // Random x position between 10-90%
    setFloatingEmojis(prev => [...prev, { id, emoji, x }]);
    
    // Remove floating emoji after animation
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 1500);
  };

  const handleShare = (platform: 'instagram' | 'copy') => {
    const shareText = `I just got roasted by Neuralove 💀\n\n"${currentRoast}"\n\nGet your own roast at`;
    const url = 'https://neuralove.app';
    
    if (platform === 'instagram') {
      // Copy to clipboard for Instagram (Instagram doesn't have web share intent)
      navigator.clipboard.writeText(`${shareText} ${url}`);
      // Open Instagram in a new tab - user can paste in stories/posts
      window.open('https://www.instagram.com/', '_blank');
    } else {
      navigator.clipboard.writeText(`${shareText} ${url}`);
      // Could add a toast notification here
    }
  };

  return (
    <section className="py-6 md:py-8 bg-gradient-to-br from-destructive/5 via-background to-accent/5 relative overflow-hidden">
      {/* Decorative background elements - desktop only */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-5 left-10 w-20 h-20 bg-destructive/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-5 right-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-3 md:mb-4">
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-destructive/10 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full mb-2">
              <Flame className="w-4 h-4 text-destructive animate-pulse" />
              <span className="text-xs font-bold text-destructive uppercase tracking-wider">
                Roast of the Day
              </span>
            </div>
          </div>

          {/* Roast Card */}
          <div className="relative">
            {/* Animated flame border */}
            <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-destructive via-orange-500 to-yellow-500 rounded-2xl blur-md opacity-30 animate-flame-border"></div>
            <div className="relative bg-card/95 backdrop-blur-sm border-2 border-destructive/30 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg">
              
              {/* Quote marks - desktop only */}
              <div className="hidden md:block absolute top-3 left-3 text-3xl text-destructive/15 font-serif leading-none">"</div>
              <div className="hidden md:block absolute bottom-3 right-3 text-3xl text-destructive/15 font-serif leading-none rotate-180">"</div>
              
              {/* Roast content with typewriter effect */}
              <div className="relative z-10 min-h-[50px] md:min-h-[60px] flex items-center justify-center px-3 md:px-6">
                <p className={`text-sm md:text-base lg:text-lg text-center font-medium text-foreground leading-relaxed transition-all duration-300 ${
                  isRefreshing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}>
                  {displayedText}
                  {isTyping && <span className="inline-block w-0.5 h-5 md:h-6 bg-destructive ml-1 animate-pulse"></span>}
                </p>
              </div>

              {/* Floating reaction emojis */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {floatingEmojis.map((item) => (
                  <div
                    key={item.id}
                    className="absolute text-3xl"
                    style={{
                      left: `${item.x}%`,
                      bottom: '30%',
                      animation: 'float-up 1.5s ease-out forwards',
                    }}
                  >
                    {item.emoji}
                  </div>
                ))}
              </div>

              {/* Reaction Buttons */}
              <div className="flex justify-center items-center gap-2 mt-4 mb-3">
                {reactions.map((reaction) => (
                  <button
                    key={reaction.emoji}
                    onClick={() => handleReaction(reaction.emoji)}
                    className="group relative flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-destructive/10 transition-all duration-300 transform hover:scale-110 active:scale-95"
                    title={reaction.label}
                  >
                    <span className="text-2xl group-hover:animate-bounce">{reaction.emoji}</span>
                    {reaction.count > 0 && (
                      <span className="text-xs font-bold text-destructive bg-destructive/10 px-1.5 rounded-full min-w-[20px] text-center">
                        {reaction.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Button
                  onClick={handleRefresh}
                  variant="ghost"
                  size="sm"
                  className="group text-xs hover:bg-destructive/10 transition-all duration-300"
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-3 h-3 mr-1.5 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  Get Roasted Again
                </Button>
                
                <Button
                  onClick={() => handleShare('instagram')}
                  variant="ghost"
                  size="sm"
                  className="group text-xs hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white transition-all duration-300"
                >
                  <Instagram className="w-3 h-3 mr-1.5 group-hover:scale-110 transition-transform" />
                  Share to Instagram
                </Button>
                
                <Button
                  onClick={() => handleShare('copy')}
                  variant="ghost"
                  size="sm"
                  className="group text-xs hover:bg-accent/10 hover:text-accent transition-all duration-300"
                >
                  <Share2 className="w-3 h-3 mr-1.5 group-hover:scale-110 transition-transform" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoastOfTheDay;
