// Comprehensive local fallback data for all cognitive types
export interface CognitiveInsights {
  keyStrengths: string[];
  idealMatches: string[];
  relationshipDynamics: string[];
  relationshipLikes: string[];
  relationshipHates: string[];
}

export const cognitiveInsightsData: Record<string, CognitiveInsights> = {
  "Analytical Thinker": {
    keyStrengths: [
      "Strong logical reasoning and problem-solving abilities that help you navigate complex situations",
      "Data-driven decision making that brings clarity and objectivity to relationships",
      "Systematic approach to understanding your partner's needs and communication patterns",
      "Excellent at identifying relationship patterns and finding practical solutions to conflicts"
    ],
    idealMatches: [
      "Systematic Organizer - Your logical thinking complements their structured approach, creating a well-organized and efficient partnership",
      "Strategic Visionary - Their big-picture thinking balances your detail-orientation, leading to comprehensive planning and growth",
      "Practical Implementer - Your analytical skills combined with their action-oriented nature creates productive partnerships"
    ],
    relationshipDynamics: [
      "You approach relationships with careful analysis and rational thinking, preferring to understand the 'why' behind emotions",
      "Direct and honest communication is your strength - you value clarity over ambiguity in all interactions",
      "You invest time in understanding your partner's needs through observation and thoughtful questions",
      "Conflict resolution comes naturally through your systematic approach to identifying root causes"
    ],
    relationshipLikes: [
      "Partners who appreciate logical discussions and can engage in intellectual conversations",
      "Clear, direct communication without excessive emotional drama or manipulation",
      "Relationships built on mutual respect for each other's thinking processes and independence"
    ],
    relationshipHates: [
      "Irrational behavior or decisions made purely on emotions without any logical foundation",
      "Partners who avoid direct communication or expect you to 'just know' what they're thinking",
      "Unnecessary drama, overreactions, or inability to have calm, rational discussions about problems"
    ]
  },
  
  "Creative Innovator": {
    keyStrengths: [
      "Imaginative thinking that brings fresh perspectives and excitement to relationships",
      "Natural ability to see possibilities and potential in your partner and relationship",
      "Spontaneous and adaptable nature that keeps relationships dynamic and interesting",
      "Strong intuition that helps you understand deeper emotional connections and meanings"
    ],
    idealMatches: [
      "Strategic Visionary - Your creativity combined with their vision creates innovative and exciting partnerships",
      "Empathetic Connector - Their emotional intelligence complements your imaginative nature for deep, meaningful connections",
      "Analytical Thinker - Their logical grounding balances your creative flights, creating well-rounded decisions"
    ],
    relationshipDynamics: [
      "You bring spontaneity and creativity to relationships, always finding new ways to express love and connection",
      "Boredom is your enemy - you constantly seek new experiences and ways to grow together",
      "You view relationships as an ever-evolving creative project, always finding room for improvement and innovation",
      "Your intuitive nature helps you sense your partner's unspoken needs and emotions"
    ],
    relationshipLikes: [
      "Partners who embrace spontaneity and are open to new experiences and adventures",
      "Freedom to express your creativity and pursue your passions without judgment",
      "Deep, meaningful conversations about possibilities, dreams, and imaginative ideas"
    ],
    relationshipHates: [
      "Rigid routines and resistance to change or trying new things together",
      "Partners who dismiss your ideas as impractical or unrealistic without consideration",
      "Being confined to traditional relationship expectations or societal norms"
    ]
  },
  
  "Systematic Organizer": {
    keyStrengths: [
      "Exceptional planning and organizational skills that create stability in relationships",
      "Reliable and consistent presence that partners can depend on through all circumstances",
      "Detail-oriented approach that ensures nothing important is overlooked in the relationship",
      "Natural ability to create structure and routines that benefit both partners"
    ],
    idealMatches: [
      "Analytical Thinker - Your organizational skills paired with their logical thinking creates highly efficient partnerships",
      "Practical Implementer - Together you create action-oriented relationships that accomplish shared goals",
      "Strategic Visionary - Their vision combined with your execution skills builds successful long-term partnerships"
    ],
    relationshipDynamics: [
      "You provide structure and stability that helps relationships thrive through clear expectations and routines",
      "Planning for the future comes naturally - you enjoy setting goals and working systematically toward them",
      "You show love through acts of service and by ensuring your partner's practical needs are met",
      "Consistency and reliability are your relationship hallmarks - your partner always knows they can count on you"
    ],
    relationshipLikes: [
      "Partners who appreciate structure, planning, and respect for established routines and commitments",
      "Clear communication about expectations, boundaries, and relationship goals",
      "Mutual respect for organization and tidiness in shared spaces and responsibilities"
    ],
    relationshipHates: [
      "Chaos, disorganization, or partners who are chronically late or unreliable",
      "Last-minute changes to plans without good reason or proper communication",
      "Partners who resist structure or view your organizational nature as controlling"
    ]
  },
  
  "Empathetic Connector": {
    keyStrengths: [
      "Exceptional emotional intelligence that creates deep, understanding connections",
      "Natural ability to sense and respond to your partner's emotional needs intuitively",
      "Strong communication skills that help resolve conflicts with compassion and care",
      "Genuine desire to nurture and support your partner's emotional well-being and growth"
    ],
    idealMatches: [
      "Creative Innovator - Their imagination combined with your emotional depth creates meaningful, expressive partnerships",
      "Strategic Visionary - Your empathy grounds their ambition, creating balanced and supportive relationships",
      "Another Empathetic Connector - Together you create deeply understanding and emotionally fulfilling bonds"
    ],
    relationshipDynamics: [
      "You prioritize emotional connection and invest deeply in understanding your partner's inner world",
      "Creating harmony and resolving conflicts peacefully is central to your relationship approach",
      "You express love through emotional availability, active listening, and genuine care",
      "Your relationships are characterized by warmth, support, and mutual emotional growth"
    ],
    relationshipLikes: [
      "Partners who value emotional intimacy and are willing to be vulnerable and authentic",
      "Open, honest communication about feelings, fears, and dreams in a safe space",
      "Shared values around compassion, kindness, and supporting each other's well-being"
    ],
    relationshipHates: [
      "Emotional unavailability or partners who struggle to express or acknowledge feelings",
      "Dismissiveness toward your emotional needs or being told you're 'too sensitive'",
      "Coldness, harsh criticism, or lack of empathy during conflicts or vulnerable moments"
    ]
  },
  
  "Strategic Visionary": {
    keyStrengths: [
      "Big-picture thinking that helps you envision and work toward an inspiring shared future",
      "Natural leadership abilities that guide relationships through challenges toward growth",
      "Innovative problem-solving that finds creative solutions to relationship obstacles",
      "Risk-taking confidence that encourages both partners to step outside comfort zones"
    ],
    idealMatches: [
      "Creative Innovator - Your vision paired with their creativity creates dynamic, forward-thinking partnerships",
      "Systematic Organizer - Their execution skills turn your vision into reality, creating powerful teamwork",
      "Analytical Thinker - Their logical analysis helps refine and strengthen your strategic plans"
    ],
    relationshipDynamics: [
      "You view relationships as partnerships working toward shared long-term goals and aspirations",
      "Forward-thinking is natural - you're always planning the next adventure or milestone together",
      "You inspire your partner to think bigger and pursue their full potential",
      "Calculated risks and new challenges excite you - stagnation is the enemy of your relationships"
    ],
    relationshipLikes: [
      "Partners who share your ambition and are excited about building a future together",
      "Freedom to pursue your goals while maintaining a supportive, growth-oriented relationship",
      "Intellectual stimulation and conversations about possibilities, strategies, and big ideas"
    ],
    relationshipHates: [
      "Short-term thinking or partners who lack ambition or direction in life",
      "Resistance to change or fear of taking necessary risks for growth",
      "Being held back from pursuing opportunities or having your vision dismissed as unrealistic"
    ]
  },
  
  "Practical Implementer": {
    keyStrengths: [
      "Action-oriented approach that turns relationship goals into tangible results",
      "Grounded in reality, providing stability and practical solutions to everyday challenges",
      "Results-focused mindset that ensures the relationship progresses and improves over time",
      "Hands-on problem-solving that addresses issues directly and effectively"
    ],
    idealMatches: [
      "Systematic Organizer - Your action-orientation combined with their planning creates highly productive partnerships",
      "Analytical Thinker - Their analysis paired with your implementation skills leads to well-executed decisions",
      "Strategic Visionary - You turn their big ideas into concrete reality, creating balanced partnerships"
    ],
    relationshipDynamics: [
      "You demonstrate love through actions rather than words - showing up and getting things done",
      "Practical problem-solving is your forte - you prefer fixing issues over dwelling on them",
      "You value efficiency and effectiveness in how you spend time together",
      "Building a comfortable, functional life together is a primary relationship focus for you"
    ],
    relationshipLikes: [
      "Partners who appreciate your practical nature and value tangible progress over abstract discussions",
      "Shared responsibilities and working together to achieve concrete relationship goals",
      "Direct communication that focuses on solutions rather than prolonged emotional processing"
    ],
    relationshipHates: [
      "Over-analysis and excessive discussion without taking action to resolve issues",
      "Impractical expectations or unrealistic demands that ignore real-world constraints",
      "Partners who talk about change but never follow through with actual effort or commitment"
    ]
  }
};

export const getInsightsForType = (cognitiveType: string): CognitiveInsights => {
  return cognitiveInsightsData[cognitiveType] || cognitiveInsightsData["Analytical Thinker"];
};
