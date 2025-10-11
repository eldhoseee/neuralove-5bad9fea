import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, age, gender, cognitive_type, cognitiveType } = await req.json();

    // Basic validation
    const cleanName = typeof name === 'string' ? String(name).trim() : '';
    const numAge = typeof age === 'number' ? Math.round(age) : NaN;
    const gen = typeof gender === 'string' ? String(gender).toLowerCase().trim() : '';

    if (!cleanName || cleanName.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid name: must be 1-100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!Number.isFinite(numAge) || numAge < 18 || numAge > 80) {
      return new Response(
        JSON.stringify({ error: "Invalid age: must be between 18 and 80" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!["male", "female", "other"].includes(gen)) {
      return new Response(
        JSON.stringify({ error: "Invalid gender" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      console.error("Missing Supabase environment variables");
      return new Response(
        JSON.stringify({ error: "Server not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data, error } = await admin
      .from('profiles')
      .insert({
        name: cleanName,
        age: numAge,
        gender: gen,
        cognitive_type: cognitive_type ?? cognitiveType ?? null,
      })
      .select('*')
      .single();

    if (error) {
      console.error("DB insert error:", error);
      return new Response(
        JSON.stringify({ error: error.message ?? 'Insert failed' }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-profile error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});