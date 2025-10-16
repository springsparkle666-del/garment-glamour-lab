import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Camera, Heart, Zap, Sun, Moon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const moods = [
  { id: "confident", label: "Confident", icon: Zap, color: "from-amber-500 to-orange-600" },
  { id: "romantic", label: "Romantic", icon: Heart, color: "from-pink-500 to-rose-600" },
  { id: "calm", label: "Calm", icon: Moon, color: "from-blue-400 to-indigo-500" },
  { id: "energetic", label: "Energetic", icon: Sun, color: "from-yellow-400 to-amber-500" },
];

const AIStyleAssistant = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId);
    setIsAnalyzing(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Style recommendations ready!",
        description: `Based on your ${moodId} mood, we've curated perfect outfits for you.`,
      });
    }, 2000);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Style Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your mood-aware fashion companion. Let AI understand your emotions and recommend outfits that match your energy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return (
              <Card
                key={mood.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedMood === mood.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleMoodSelect(mood.id)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{mood.label}</CardTitle>
                  <CardDescription>
                    {mood.id === "confident" && "Bold, structured pieces that command attention"}
                    {mood.id === "romantic" && "Soft textures and elegant flowing designs"}
                    {mood.id === "calm" && "Minimalist, neutral tones for peaceful elegance"}
                    {mood.id === "energetic" && "Vibrant colors and dynamic silhouettes"}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-none">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Camera className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-2">Emotion Detection</h3>
                <p className="text-muted-foreground mb-4">
                  Enable camera access for advanced mood detection. Our AI analyzes facial expressions to provide even more personalized recommendations.
                </p>
                <Button className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Enable Camera
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {isAnalyzing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="max-w-md">
              <CardContent className="p-8 text-center">
                <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Analyzing Your Style...</h3>
                <p className="text-muted-foreground">Our AI is curating perfect outfits for you</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIStyleAssistant;
