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
    const { cognitiveType } = await req.json();
    
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

    const systemPrompt = `You are an expert cognitive psychologist. Generate detailed insights for someone with the cognitive type: "${cognitiveType}".

Provide comprehensive insights in the following JSON format:
{
  "keyStrengths": [
    "First key cognitive strength",
    "Second key cognitive strength", 
    "Third key cognitive strength"
  ],
  "idealMatches": [
    "Compatible cognitive type 1",
    "Compatible cognitive type 2",
    "Compatible cognitive type 3"
  ],
  "relationshipDynamics": [
    "How they approach relationships - insight 1",
    "Communication style - insight 2", 
    "Partnership style - insight 3"
  ],
  "relationshipLikes": [
    "First thing they appreciate and value in relationships",
    "Second thing they seek and enjoy in partnerships",
    "Third thing that makes them feel connected and fulfilled"
  ],
  "relationshipHates": [
    "First thing that frustrates or drains them in relationships",
    "Second behavior or dynamic they cannot tolerate",
    "Third dealbreaker or major relationship concern"
  ]
}

Keep each array item to 1-2 sentences. Focus on authentic insights about their relationship preferences and dealbreakers based on their cognitive type.`;

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
          { role: 'user', content: `Generate detailed cognitive insights for: ${cognitiveType}` }
        ],
        temperature: 0.8,
        max_tokens: 800
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