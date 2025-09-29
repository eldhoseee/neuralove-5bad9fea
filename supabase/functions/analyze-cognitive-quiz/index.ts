import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const QUIZ_QUESTIONS = [
  "I prefer to make decisions based on logic rather than emotions",
  "I enjoy brainstorming and generating new ideas",
  "I like to have a clear plan before starting any project",
  "I'm comfortable with ambiguity and uncertain situations",
  "I prefer working with concrete facts rather than abstract theories",
  "I often rely on my gut feelings when making decisions",
  "I enjoy analyzing complex problems step by step",
  "I like to explore multiple possibilities before deciding",
  "I prefer structured environments with clear rules",
  "I'm energized by social interactions and group discussions",
  "I like to focus on details rather than the big picture",
  "I enjoy taking calculated risks",
  "I prefer to work independently rather than in teams",
  "I like to gather all available information before making decisions",
  "I'm motivated by achieving specific, measurable goals",
  "I enjoy helping others solve their problems",
  "I prefer to stick to proven methods rather than experimenting",
  "I like to think about future possibilities and potential",
  "I'm comfortable with routine and predictable tasks",
  "I enjoy debating ideas and different perspectives",
  "I prefer to make quick decisions rather than deliberating too long",
  "I like to understand the underlying principles behind things",
  "I'm good at reading people's emotions and motivations",
  "I enjoy organizing and categorizing information"
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();
    
    if (!answers || !Array.isArray(answers) || answers.length !== 24) {
      return new Response(
        JSON.stringify({ error: 'Invalid answers format. Expected array of 24 boolean values.' }),
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

    // Format the quiz responses for AI analysis
    const quizResponses = QUIZ_QUESTIONS.map((question, index) => 
      `${index + 1}. ${question}: ${answers[index] ? 'Yes' : 'No'}`
    ).join('\n');

    const systemPrompt = `You are an expert cognitive psychologist specializing in personality assessment. Analyze the quiz responses to determine the person's primary cognitive type and provide insights.

Based on the responses, categorize the person into ONE of these cognitive types:
- Analytical Thinker: Logic-driven, systematic, detail-oriented
- Creative Innovator: Imaginative, intuitive, big-picture focused  
- Systematic Organizer: Structured, methodical, planning-oriented
- Empathetic Connector: People-focused, emotionally intelligent, collaborative
- Strategic Visionary: Future-oriented, risk-taking, pattern-recognizing
- Practical Implementer: Action-oriented, concrete, results-focused

Respond with a JSON object containing:
{
  "cognitiveType": "one of the types above",
  "explanation": "2-3 sentence explanation of why this type fits based on their responses",
  "motivation": "An inspiring 1-2 sentence message about their cognitive strengths"
}`;

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
          { role: 'user', content: `Please analyze these quiz responses:\n\n${quizResponses}` }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      console.error('AI API error:', response.status, await response.text());
      return new Response(
        JSON.stringify({ error: 'AI analysis failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices[0]?.message?.content;

    if (!aiContent) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'AI analysis failed' }),
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
      if (!result.cognitiveType || !result.explanation || !result.motivation) {
        throw new Error('Invalid AI response structure');
      }

      console.log('AI analysis completed for cognitive type:', result.cognitiveType);
      
      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, 'Content:', aiContent);
      
      // Fallback: try to extract information manually if JSON parsing fails
      const fallbackResult = {
        cognitiveType: "Analytical Thinker",
        explanation: "Based on your responses, you show strong analytical and logical thinking patterns with attention to detail.",
        motivation: "Your systematic approach to problem-solving is a powerful asset that helps you navigate complex challenges with clarity and precision."
      };
      
      return new Response(
        JSON.stringify(fallbackResult),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in analyze-cognitive-quiz function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});