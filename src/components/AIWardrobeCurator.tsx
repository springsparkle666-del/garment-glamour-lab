import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Calendar, Cloud, Shuffle, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Suggestion {
  id: string;
  occasion: string;
  weather?: string;
  suggested_items: any;
  created_at: string;
}

const occasions = [
  "Casual Day",
  "Work Meeting",
  "Dinner Date",
  "Party",
  "Wedding",
  "Gym",
  "Beach",
  "Travel",
  "Interview",
  "Brunch",
];

const weatherOptions = ["Sunny", "Rainy", "Cold", "Hot", "Mild"];

const AIWardrobeCurator = () => {
  const [occasion, setOccasion] = useState("");
  const [weather, setWeather] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("wardrobe_suggestions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error: any) {
      console.error("Error loading suggestions:", error);
    }
  };

  const generateSuggestion = async () => {
    if (!occasion) {
      toast({
        title: "Select an occasion",
        description: "Please choose what you need the outfit for.",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to get suggestions.",
          variant: "destructive",
        });
        return;
      }

      // Get user's closet items
      const { data: closetItems } = await supabase
        .from("closet_items")
        .select("*")
        .eq("user_id", user.id);

      // Get style DNA
      const { data: styleDNA } = await supabase
        .from("style_dna")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      // Call AI to generate suggestion
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke(
        "ai-stylist",
        {
          body: {
            type: "wardrobe_suggestion",
            occasion,
            weather,
            closetItems: closetItems || [],
            styleDNA: styleDNA || {},
          },
        }
      );

      if (aiError) throw aiError;

      // Save suggestion
      const { error: saveError } = await supabase
        .from("wardrobe_suggestions")
        .insert({
          user_id: user.id,
          occasion,
          weather: weather || null,
          suggested_items: aiResponse.suggestion,
        });

      if (saveError) throw saveError;

      toast({
        title: "Perfect Match! ✨",
        description: `We've created the ideal outfit for your ${occasion.toLowerCase()}.`,
      });

      loadSuggestions();
    } catch (error: any) {
      toast({
        title: "Error generating suggestion",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const generateSmartMix = async () => {
    setGenerating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get random items from closet
      const { data: closetItems } = await supabase
        .from("closet_items")
        .select("*")
        .eq("user_id", user.id)
        .limit(10);

      if (!closetItems || closetItems.length === 0) {
        toast({
          title: "Empty Closet",
          description: "Add some items to your closet first!",
          variant: "destructive",
        });
        return;
      }

      // Generate 3 random combinations
      for (let i = 0; i < 3; i++) {
        const randomOccasion = occasions[Math.floor(Math.random() * occasions.length)];
        await generateSuggestion();
      }
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AI Wardrobe Curator
          </h2>
          <p className="text-lg text-muted-foreground">
            Your intelligent closet assistant - never run out of outfit ideas
          </p>
        </div>

        {/* Generator */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Generate Perfect Outfit
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Occasion</label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occ) => (
                      <SelectItem key={occ} value={occ}>
                        {occ}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Weather (Optional)</label>
                <Select value={weather} onValueChange={setWeather}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherOptions.map((w) => (
                      <SelectItem key={w} value={w}>
                        {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={generateSuggestion}
                  disabled={generating}
                  className="flex-1"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {generating ? "Generating..." : "Generate Outfit"}
                </Button>
                
                <Button
                  onClick={generateSmartMix}
                  disabled={generating}
                  variant="outline"
                >
                  <Shuffle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Suggestions */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            Your Recent Suggestions
          </h3>

          {suggestions.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No suggestions yet. Generate your first outfit above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold">{suggestion.occasion}</h4>
                  </div>
                  
                  {suggestion.weather && (
                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <Cloud className="w-4 h-4" />
                      <span>{suggestion.weather}</span>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    {new Date(suggestion.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIWardrobeCurator;