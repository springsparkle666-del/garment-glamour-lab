import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, Smile, Zap, Cloud, Sun, Moon, Sparkles } from "lucide-react";

const moods = [
  { name: "Happy", icon: Smile, color: "from-yellow-400 to-orange-400", theme: "vibrant" },
  { name: "Calm", icon: Cloud, color: "from-blue-300 to-purple-300", theme: "pastel" },
  { name: "Confident", icon: Zap, color: "from-gray-800 to-black", theme: "bold" },
  { name: "Romantic", icon: Heart, color: "from-pink-400 to-red-400", theme: "soft" },
  { name: "Energetic", icon: Sun, color: "from-orange-500 to-yellow-500", theme: "bright" },
  { name: "Peaceful", icon: Moon, color: "from-indigo-400 to-purple-500", theme: "muted" },
];

const MoodMode = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(3);
  const { toast } = useToast();

  useEffect(() => {
    loadTodaysMood();
  }, []);

  const loadTodaysMood = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from("mood_history")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", `${today}T00:00:00`)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setSelectedMood(data.mood);
        setIntensity(data.intensity);
      }
    } catch (error: any) {
      console.error("Error loading mood:", error);
    }
  };

  const saveMood = async (mood: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to save your mood.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("mood_history")
        .insert({
          user_id: user.id,
          mood,
          intensity,
        });

      if (error) throw error;

      setSelectedMood(mood);
      toast({
        title: "Mood set! ✨",
        description: `Your fashion recommendations will now match your ${mood.toLowerCase()} mood.`,
      });

      // Apply theme
      applyMoodTheme(mood);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const applyMoodTheme = (mood: string) => {
    const moodData = moods.find(m => m.name === mood);
    if (!moodData) return;

    // Store theme preference
    localStorage.setItem('moodTheme', moodData.theme);
    
    // Trigger theme update event
    window.dispatchEvent(new CustomEvent('moodThemeChange', { detail: moodData.theme }));
  };

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Mood Mode
          </h2>
          <p className="text-lg text-muted-foreground">
            How are you feeling today? Let's match your fashion to your mood ✨
          </p>
        </div>

        {/* Mood Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.name;
            
            return (
              <button
                key={mood.name}
                onClick={() => saveMood(mood.name)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected
                    ? "border-primary shadow-xl scale-105"
                    : "border-border/50 hover:border-primary/50 hover:scale-102"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                <div className="relative flex flex-col items-center gap-3">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${mood.color} ${
                    isSelected ? "animate-pulse" : ""
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="font-semibold">{mood.name}</span>
                  
                  {isSelected && (
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-6 h-6 text-primary animate-spin-slow" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Intensity Slider */}
        {selectedMood && (
          <div className="max-w-md mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Mood Intensity</h3>
              <input
                type="range"
                min="1"
                max="5"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Subtle</span>
                <span>Intense</span>
              </div>
              <Button
                onClick={() => saveMood(selectedMood)}
                className="w-full mt-4"
              >
                Update Mood
              </Button>
            </div>
          </div>
        )}

        {/* Mood Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
            <p className="text-sm text-muted-foreground">
              Get outfit suggestions that match your current emotional state
            </p>
          </div>

          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Emotional Connection</h3>
            <p className="text-sm text-muted-foreground">
              Fashion that understands and elevates your mood
            </p>
          </div>

          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Mood Tracking</h3>
            <p className="text-sm text-muted-foreground">
              See how your style evolves with your emotions over time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodMode;