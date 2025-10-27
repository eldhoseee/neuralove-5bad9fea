import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { person1Type, person2Type, person1Name, person2Name, person1Answers, person2Answers } = await req.json();

    if (!person1Type || !person2Type || !person1Name || !person2Name) {
      throw new Error("Missing required fields");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `You are an expert relationship compatibility analyst specializing in cognitive personality types. Analyze the compatibility between two people based on their cognitive profiles and quiz responses.

Cognitive types being analyzed:
- ${person1Name}: ${person1Type}
- ${person2Name}: ${person2Type}

Provide a detailed compatibility analysis with these sections:
1. Match Quality: Assess if they're a good match (excellent/good/moderate/challenging)
2. Relationship Strengths: 3-4 specific reasons why their relationship works well
3. Potential Friction Points: 3-4 areas where cognitive differences might create challenges (but can be overcome with awareness)
4. Overall Recommendation: A supportive message about their relationship

Be empathetic, specific, and focus on growth opportunities. If the match is challenging, emphasize that love and understanding can overcome differences.`;

    const userPrompt = `Analyze compatibility between:
- ${person1Name} (${person1Type})
- ${person2Name} (${person2Type})

Provide a warm, insightful analysis that helps them understand their relationship dynamics.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [{
          type: "function",
          function: {
            name: "provide_compatibility_analysis",
            description: "Provide structured compatibility analysis",
            parameters: {
              type: "object",
              properties: {
                matchQuality: {
                  type: "string",
                  enum: ["excellent", "good", "moderate", "challenging"],
                  description: "Overall match quality assessment"
                },
                matchScore: {
                  type: "number",
                  description: "Compatibility score from 0-100"
                },
                isStrictMismatch: {
                  type: "boolean",
                  description: "True if profiles are fundamentally incompatible"
                },
                strengths: {
                  type: "array",
                  items: { type: "string" },
                  description: "3-4 reasons why the relationship works well"
                },
                frictionPoints: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      issue: { type: "string", description: "The friction point" },
                      insight: { type: "string", description: "How to understand and overcome it" }
                    }
                  },
                  description: "3-4 potential areas of friction with insights"
                },
                recommendation: {
                  type: "string",
                  description: "Overall supportive message about their relationship"
                }
              },
              required: ["matchQuality", "matchScore", "isStrictMismatch", "strengths", "frictionPoints", "recommendation"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "provide_compatibility_analysis" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response:", JSON.stringify(data, null, 2));

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify(analysis),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in analyze-couple-compatibility:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
