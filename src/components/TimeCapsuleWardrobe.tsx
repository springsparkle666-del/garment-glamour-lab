import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Calendar, Sparkles } from "lucide-react";

const timelineData = [
  {
    year: "2025",
    season: "Spring",
    items: 3,
    dominant: "Minimalist Chic",
    color: "from-green-400 to-emerald-500",
  },
  {
    year: "2024",
    season: "Winter",
    items: 5,
    dominant: "Classic Elegance",
    color: "from-blue-400 to-indigo-500",
  },
  {
    year: "2024",
    season: "Fall",
    items: 4,
    dominant: "Urban Edge",
    color: "from-amber-400 to-orange-500",
  },
];

const TimeCapsuleWardrobe = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-accent/5 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Time Capsule</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Your Style Evolution</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your fashion journey through time. See how your style has evolved and get AI-powered insights on your changing preferences.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary/20" />
          
          <div className="space-y-12">
            {timelineData.map((period, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-8 ${
                  idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${idx % 2 === 0 ? "text-right" : "text-left"}`}>
                  <Card className="inline-block max-w-md hover:scale-105 transition-transform">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <CardTitle className="text-xl">
                          {period.season} {period.year}
                        </CardTitle>
                      </div>
                      <CardDescription>{period.items} pieces added</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`p-4 rounded-lg bg-gradient-to-br ${period.color} text-white mb-4`}>
                        <p className="font-semibold text-lg">{period.dominant}</p>
                        <p className="text-sm opacity-90">Dominant Style</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Collection
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="relative z-10">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                </div>
                
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Style Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Evolution Score</h3>
                  <p className="text-3xl font-bold text-primary mb-2">85%</p>
                  <p className="text-sm text-muted-foreground">
                    Your style has evolved significantly, embracing more diverse aesthetics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Signature Elements</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">Minimalist</span>
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">Monochrome</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Core elements that define your style identity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Next Prediction</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your journey, AI predicts you'll embrace more sustainable luxury pieces
                  </p>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Explore Recommendations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-gradient-to-br from-primary to-accent text-white border-none">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to Restyle Past Favorites?</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our AI can reimagine your previous purchases with current trends, giving them a fresh modern twist
            </p>
            <Button size="lg" variant="secondary">
              Start AI Restyling
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TimeCapsuleWardrobe;
