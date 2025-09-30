import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cognitiveType, quizAnswers, profileData } = await req.json();
    
    if (!cognitiveType) {
      return new Response(
        JSON.stringify({ error: 'Cognitive type is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build context from profile and quiz answers
    const QUIZ_QUESTIONS = [
      "I prefer to focus on the big picture rather than small details.",
      "I make decisions based on logic and data rather than feelings.",
      "I enjoy exploring new ideas and possibilities.",
      "I like to have a plan and stick to it rather than being spontaneous.",
      "I get energized by being around other people.",
      "I prefer tried-and-true methods over experimental approaches.",
      "I'm comfortable making decisions quickly with limited information.",
      "I find patterns and connections easily in complex information.",
      "I prefer working in teams rather than alone.",
      "I trust my gut feelings when making important choices.",
      "I like to analyze all possible outcomes before acting.",
      "I'm motivated by achieving personal excellence and mastery.",
      "I feel responsible for maintaining group harmony.",
      "I prefer familiar routines over constant change and variety.",
      "I express my thoughts and feelings openly and directly.",
      "I'm naturally skeptical and question assumptions.",
      "I adapt easily to unexpected changes in plans.",
      "I prefer concrete facts over abstract theories.",
      "I make decisions by considering how they affect others emotionally.",
      "I like to finish projects completely before starting new ones.",
      "I'm comfortable being the center of attention.",
      "I prefer to observe and understand before taking action.",
      "I'm motivated by opportunities to help and support others.",
      "I enjoy debating ideas and challenging different viewpoints."
    ];

    let profileContext = '';
    if (profileData) {
      profileContext = `\n\nProfile: ${profileData.name}, ${profileData.age} years old, ${profileData.gender}`;
    }

    let quizContext = '';
    if (quizAnswers && Array.isArray(quizAnswers) && quizAnswers.length >= 24) {
      const answers = quizAnswers.slice(0, 24);
      quizContext = '\n\nQuiz Responses:\n' + QUIZ_QUESTIONS.map((q, i) => 
        `${i + 1}. ${q}: ${answers[i] ? 'Yes' : 'No'}`
      ).join('\n');
    }

    const systemPrompt = `You are an expert cognitive psychologist and relationship expert. Analyze the person's cognitive type, their quiz responses, and profile to generate deeply personalized insights about their relationship preferences.

CRITICAL: You MUST generate ALL five fields, especially relationshipLikes and relationshipHates. These are essential for helping people understand their relationship compatibility.

Based on their cognitive type "${cognitiveType}"${profileContext}${quizContext}

Provide comprehensive insights in this EXACT JSON format:
{
  "keyStrengths": [
    "First key cognitive strength based on their responses",
    "Second key cognitive strength based on their responses", 
    "Third key cognitive strength based on their responses"
  ],
  "idealMatches": [
    "Compatible cognitive type 1 with brief explanation",
    "Compatible cognitive type 2 with brief explanation",
    "Compatible cognitive type 3 with brief explanation"
  ],
  "relationshipDynamics": [
    "How they approach relationships based on quiz responses",
    "Their communication style in relationships", 
    "Their partnership style and what they bring to a relationship"
  ],
  "relationshipLikes": [
    "Specific thing they deeply appreciate in relationships based on their quiz responses",
    "Second thing they actively seek and enjoy in partnerships",
    "Third thing that makes them feel connected and fulfilled in relationships"
  ],
  "relationshipHates": [
    "Specific behavior or dynamic that frustrates them based on their quiz responses",
    "Second thing they cannot tolerate in relationships",
    "Third dealbreaker or major relationship concern for their type"
  ]
}

IMPORTANT: Make relationshipLikes and relationshipHates specific and personalized based on their actual quiz responses. For example:
- If they value logic over emotions, they might dislike "emotionally volatile or unpredictable partners"
- If they prefer social interaction, they might value "partners who enjoy socializing and meeting new people"
- If they like planning, they might dislike "partners who are constantly spontaneous without consideration"

Keep each item to 1-2 sentences. Be authentic and insightful.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate detailed, personalized cognitive and relationship insights based on all the information provided above.` }
        ],
        temperature: 0.8,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      console.error('AI API error:', response.status, await response.text());
      return new Response(
        JSON.stringify({ error: 'AI insights generation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices[0]?.message?.content;

    if (!aiContent) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'AI insights generation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      // Clean up the AI response - remove markdown code blocks if present
      let cleanContent = aiContent.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/```\n?/, '').replace(/\n?```$/, '');
      }
      
      // Parse the cleaned JSON
      const result = JSON.parse(cleanContent);
      
      // Validate the response structure
      if (!result.keyStrengths || !result.idealMatches || !result.relationshipDynamics || !result.relationshipLikes || !result.relationshipHates) {
        throw new Error('Invalid AI response structure');
      }

      console.log('AI insights generated for cognitive type:', cognitiveType);
      
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (parseError) {
      console.error('Failed to parse AI insights response:', parseError, 'Content:', aiContent);
      
      // Fallback insights based on cognitive type
      const fallbackInsights = {
        keyStrengths: [
          "You approach problems with a unique cognitive perspective.",
          "Your thinking style brings valuable insights to any team or relationship.",
          "You have natural abilities that complement many different personality types."
        ],
        idealMatches: [
          "People who appreciate your thinking style",
          "Partners who value intellectual connection",
          "Individuals who complement your cognitive approach"
        ],
        relationshipDynamics: [
          "You bring depth and thoughtfulness to relationships.",
          "Your communication style creates meaningful connections.",
          "You value authentic and intellectually stimulating partnerships."
        ],
        relationshipLikes: [
          "Partners who respect your unique way of thinking and processing.",
          "Genuine intellectual connection and meaningful conversations.",
          "Emotional authenticity and mutual understanding."
        ],
        relationshipHates: [
          "Being misunderstood or having your perspective dismissed.",
          "Superficial interactions that lack depth or authenticity.",
          "Rigid expectations that don't allow for your natural cognitive style."
        ]
      };
      
      return new Response(
        JSON.stringify(fallbackInsights),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in generate-cognitive-insights function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});