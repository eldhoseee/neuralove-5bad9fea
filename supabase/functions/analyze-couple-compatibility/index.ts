import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      person1Type,
      person2Type,
      person1Name,
      person2Name,
      person1Answers,
      person2Answers,
    } = await req.json();

    if (!person1Type || !person2Type || !person1Name || !person2Name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build prompts – ask for STRICT JSON only
    const systemPrompt = `You are a precise relationship compatibility analyst.
Return ONLY strict JSON with no markdown. Analyze cognitive compatibility and output fields exactly as specified.`;

    const answersContext = `Person 1 answers (${person1Name}): ${Array.isArray(person1Answers) ? person1Answers.join(',') : 'n/a'}\nPerson 2 answers (${person2Name}): ${Array.isArray(person2Answers) ? person2Answers.join(',') : 'n/a'}`;

    const userPrompt = `Analyze compatibility for:\n- ${person1Name} (${person1Type})\n- ${person2Name} (${person2Type})\n\n${answersContext}\n\nReturn JSON with this exact shape:\n{\n  "matchQuality": "excellent|good|moderate|challenging",\n  "matchScore": number (0-100),\n  "isStrictMismatch": boolean,\n  "strengths": string[3..5],\n  "frictionPoints": {"issue": string, "insight": string}[],\n  "recommendation": string\n}\n\nRules:\n- No extra keys.\n- No markdown.\n- No text outside JSON.`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        // Keep it simple; no tool-calls for maximum compatibility
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, t);
      throw new Error(`AI gateway error: ${aiResp.status}`);
    }

    const aiJson = await aiResp.json();
    const content = aiJson.choices?.[0]?.message?.content as string | undefined;

    if (!content) {
      throw new Error("Empty AI response");
    }

    // Clean possible code fences and parse JSON
    let jsonText = content.trim();
    if (jsonText.startsWith("```json")) jsonText = jsonText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    else if (jsonText.startsWith("```")) jsonText = jsonText.replace(/^```\n?/, "").replace(/\n?```$/, "");

    let parsed: any;
    try {
      parsed = JSON.parse(jsonText);
      // Basic validation
      if (
        !parsed ||
        typeof parsed.matchQuality !== "string" ||
        typeof parsed.matchScore !== "number" ||
        typeof parsed.isStrictMismatch !== "boolean" ||
        !Array.isArray(parsed.strengths) ||
        !Array.isArray(parsed.frictionPoints) ||
        typeof parsed.recommendation !== "string"
      ) {
        throw new Error("Invalid JSON structure");
      }
    } catch (e) {
      console.warn("Failed to parse AI JSON, using fallback:", e);
      // Fallback analysis (safe default)
      parsed = {
        matchQuality: "good",
        matchScore: 72,
        isStrictMismatch: false,
        strengths: [
          `${person1Name}'s ${person1Type} works well with ${person2Name}'s ${person2Type} in long-term planning.`,
          "You balance each other by approaching problems from different angles.",
          "You both bring complementary strengths to communication and decision-making.",
        ],
        frictionPoints: [
          {
            issue: "Different processing speeds or priorities",
            insight: "Align expectations early; use check-ins to stay in sync.",
          },
          {
            issue: "Contrasting communication styles",
            insight: "Summarize and reflect back what you heard; clarify intent vs. impact.",
          },
        ],
        recommendation:
          `${person1Name} and ${person2Name}, your profiles suggest solid potential. Stay curious about each other's perspective and make space for how each of you best thinks and decides.`,
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in analyze-couple-compatibility:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
