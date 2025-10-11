import { Card } from "@/components/ui/card";
import { Sparkles, Palette, TrendingUp } from "lucide-react";

const dnaProfiles = [
  {
    title: "Classic Elegance",
    percentage: 40,
    color: "from-purple-500 to-pink-500",
    icon: Sparkles,
    traits: ["Timeless", "Sophisticated", "Refined"],
  },
  {
    title: "Modern Edge",
    percentage: 35,
    color: "from-blue-500 to-cyan-500",
    icon: TrendingUp,
    traits: ["Bold", "Contemporary", "Dynamic"],
  },
  {
    title: "Artistic Vision",
    percentage: 25,
    color: "from-amber-500 to-rose-500",
    icon: Palette,
    traits: ["Creative", "Expressive", "Unique"],
  },
];

const colorPalette = [
  { name: "Monochrome", percentage: 45, color: "bg-gray-800" },
  { name: "Earth Tones", percentage: 30, color: "bg-amber-700" },
  { name: "Jewel Tones", percentage: 15, color: "bg-purple-600" },
  { name: "Pastels", percentage: 10, color: "bg-pink-300" },
];

const FashionDNA = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-serif">
            Your Fashion DNA
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover your unique style identity through data-driven insights
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Style Profile Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {dnaProfiles.map((profile, index) => {
              const IconComponent = profile.icon;
              return (
                <Card
                  key={profile.title}
                  className="relative overflow-hidden border-2 border-muted hover:border-accent transition-all duration-500 p-6 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="w-8 h-8 text-accent" />
                      <span className="text-3xl font-bold text-foreground">
                        {profile.percentage}%
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-foreground font-serif">
                      {profile.title}
                    </h3>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-muted rounded-full mb-4 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${profile.color} transition-all duration-1000`}
                        style={{ width: `${profile.percentage}%` }}
                      />
                    </div>
                    
                    {/* Traits */}
                    <div className="flex flex-wrap gap-2">
                      {profile.traits.map((trait) => (
                        <span
                          key={trait}
                          className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Color Palette DNA */}
          <Card className="border-2 border-muted p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground font-serif text-center">
              Your Color Palette DNA
            </h3>
            
            <div className="space-y-6">
              {colorPalette.map((color, index) => (
                <div key={color.name} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full ${color.color} border-2 border-muted`} />
                      <span className="font-medium text-foreground">{color.name}</span>
                    </div>
                    <span className="text-muted-foreground font-semibold">
                      {color.percentage}%
                    </span>
                  </div>
                  
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color.color} transition-all duration-1000`}
                      style={{ width: `${color.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Style Summary */}
            <div className="mt-8 p-6 bg-accent/5 rounded-lg border border-accent/20">
              <p className="text-center text-foreground">
                <span className="font-bold text-accent">Your Style Identity:</span>{" "}
                <span className="font-serif text-lg">
                  Elegant Minimalist
                </span>
              </p>
              <p className="text-center text-muted-foreground text-sm mt-2">
                You gravitate toward timeless sophistication with a modern twist, favoring clean lines and a refined color palette.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FashionDNA;
