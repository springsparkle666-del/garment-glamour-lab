import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Film, Sparkles, Share2, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OutfitFilm {
  id: string;
  outfit_id?: string;
  product_id?: string;
  film_url: string;
  theme: string;
  created_at: string;
}

const filmThemes = [
  { value: "paris_runway", label: "Paris Runway", description: "Elegant Parisian fashion show" },
  { value: "tokyo_street", label: "Tokyo Street", description: "Vibrant urban Japanese style" },
  { value: "desert_sunset", label: "Desert Sunset", description: "Golden hour in the desert" },
  { value: "neon_city", label: "Neon City", description: "Futuristic cyberpunk vibes" },
  { value: "garden_bloom", label: "Garden Bloom", description: "Romantic floral setting" },
  { value: "beach_breeze", label: "Beach Breeze", description: "Coastal elegance" },
  { value: "winter_palace", label: "Winter Palace", description: "Luxurious winter scene" },
  { value: "art_gallery", label: "Art Gallery", description: "Sophisticated museum backdrop" },
];

const OutfitMoodFilms = () => {
  const [films, setFilms] = useState<OutfitFilm[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [outfits, setOutfits] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadFilms();
    loadOutfits();
  }, []);

  const loadFilms = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("outfit_films")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFilms(data || []);
    } catch (error: any) {
      console.error("Error loading films:", error);
    }
  };

  const loadOutfits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("outfits")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      setOutfits(data || []);
    } catch (error: any) {
      console.error("Error loading outfits:", error);
    }
  };

  const generateFilm = async () => {
    if (!selectedOutfit || !selectedTheme) {
      toast({
        title: "Missing information",
        description: "Please select an outfit and theme.",
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
          description: "You need to be signed in to create films.",
          variant: "destructive",
        });
        return;
      }

      // Call AI to generate film
      toast({
        title: "Creating your cinematic experience... 🎬",
        description: "This may take 30-60 seconds",
      });

      const { data: aiResponse, error: aiError } = await supabase.functions.invoke(
        "ai-stylist",
        {
          body: {
            type: "outfit_film",
            outfitId: selectedOutfit,
            theme: selectedTheme,
          },
        }
      );

      if (aiError) throw aiError;

      // Save film
      const { error: saveError } = await supabase
        .from("outfit_films")
        .insert({
          user_id: user.id,
          outfit_id: selectedOutfit,
          film_url: aiResponse.filmUrl,
          theme: selectedTheme,
        });

      if (saveError) throw saveError;

      toast({
        title: "Your mood film is ready! 🎬",
        description: "Check it out below.",
      });

      loadFilms();
    } catch (error: any) {
      toast({
        title: "Error generating film",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const shareFilm = (filmUrl: string) => {
    if (navigator.share) {
      navigator.share({
        title: "My ÉLITE Fashion Mood Film",
        text: "Check out my fashion mood film!",
        url: filmUrl,
      });
    } else {
      navigator.clipboard.writeText(filmUrl);
      toast({
        title: "Link copied!",
        description: "Share your mood film with friends.",
      });
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Outfit Mood Films
          </h2>
          <p className="text-lg text-muted-foreground">
            Transform your outfits into cinematic mini-stories 🎬
          </p>
        </div>

        {/* Film Generator */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Film className="w-6 h-6 text-primary" />
              Create Mood Film
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Outfit</label>
                <Select value={selectedOutfit} onValueChange={setSelectedOutfit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose outfit" />
                  </SelectTrigger>
                  <SelectContent>
                    {outfits.map((outfit) => (
                      <SelectItem key={outfit.id} value={outfit.id}>
                        {outfit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Film Theme</label>
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {filmThemes.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        <div>
                          <div className="font-medium">{theme.label}</div>
                          <div className="text-xs text-muted-foreground">{theme.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateFilm}
                disabled={generating}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {generating ? "Creating Film..." : "Generate Mood Film"}
              </Button>
            </div>
          </div>
        </div>

        {/* Film Gallery */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Film className="w-6 h-6 text-primary" />
            Your Cinematic Collection
          </h3>

          {films.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No mood films yet. Create your first cinematic experience!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {films.map((film) => (
                <div
                  key={film.id}
                  className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Film className="w-12 h-12 text-white/50" />
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                      {film.theme.replace("_", " ").toUpperCase()}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareFilm(film.film_url)}
                        className="flex-1"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(film.film_url, "_blank")}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
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

export default OutfitMoodFilms;