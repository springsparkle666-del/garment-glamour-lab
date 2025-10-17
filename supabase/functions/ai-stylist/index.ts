import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) throw new Error("User not authenticated");

    const { mood, occasion, styleDNA, preferences } = await req.json();

    // Get user's style DNA from database if not provided
    let userStyleDNA = styleDNA;
    if (!userStyleDNA) {
      const { data: dnaData } = await supabaseClient
        .from("style_dna")
        .select("*")
        .eq("user_id", user.id)
        .single();
      userStyleDNA = dnaData;
    }

    // Build prompt for AI
    const systemPrompt = `You are an expert fashion stylist for ÉLITE Fashion, a luxury brand. 
    Analyze the user's preferences and provide personalized outfit recommendations.`;

    const userPrompt = `
    User preferences:
    - Mood: ${mood || "not specified"}
    - Occasion: ${occasion || "casual"}
    - Style DNA: ${JSON.stringify(userStyleDNA || {})}
    - Additional preferences: ${JSON.stringify(preferences || {})}
    
    Provide 3-5 outfit recommendations. For each recommendation, include:
    1. A descriptive name
    2. Key pieces (top, bottom, accessories)
    3. Color palette
    4. Why it matches their mood and occasion
    5. Confidence score (0-1)
    
    Format as JSON array with this structure:
    {
      "recommendations": [
        {
          "name": "Elegant Evening",
          "pieces": ["Black silk blazer", "High-waist trousers", "Gold accessories"],
          "colors": ["Black", "Gold", "Ivory"],
          "rationale": "Perfect for confident evening occasions",
          "score": 0.95
        }
      ]
    }`;

    // Call Lovable AI Gateway
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices[0].message.content;
    
    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : { recommendations: [] };

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("AI Stylist error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
