import { Card } from "@/components/ui/card";
import { Leaf, Droplets, Recycle, Award, MapPin, Users } from "lucide-react";

const sustainabilityMetrics = [
  {
    icon: Leaf,
    label: "Carbon Footprint",
    value: "Low",
    score: 85,
    color: "text-green-500",
    description: "15kg CO₂ saved per garment",
  },
  {
    icon: Droplets,
    label: "Water Usage",
    value: "Efficient",
    score: 90,
    color: "text-blue-500",
    description: "40% less than industry standard",
  },
  {
    icon: Recycle,
    label: "Recyclability",
    value: "High",
    score: 95,
    color: "text-purple-500",
    description: "100% recyclable materials",
  },
  {
    icon: Award,
    label: "Ethical Rating",
    value: "Certified",
    score: 100,
    color: "text-amber-500",
    description: "Fair trade certified",
  },
];

const materialOrigins = [
  {
    material: "Organic Cotton",
    origin: "Gujarat, India",
    icon: MapPin,
    sustainability: "100% Organic",
  },
  {
    material: "Silk",
    origin: "Varanasi, India",
    icon: MapPin,
    sustainability: "Ethically Sourced",
  },
  {
    material: "Hemp Fabric",
    origin: "Himachal Pradesh, India",
    icon: MapPin,
    sustainability: "Carbon Negative",
  },
];

const SustainabilityTracker = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-green-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif">
              Sustainability Tracker
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Know your outfit's story — from origin to environmental impact
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Sustainability Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {sustainabilityMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card
                  key={metric.label}
                  className="p-6 border-2 border-muted hover:border-accent transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className={`w-8 h-8 ${metric.color}`} />
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-2">
                      {metric.label}
                    </h3>
                    
                    <div className="text-2xl font-bold text-accent mb-2">
                      {metric.value}
                    </div>
                    
                    {/* Score Ring */}
                    <div className="relative w-20 h-20 mb-3">
                      <svg className="transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-muted"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={metric.color}
                          strokeWidth="3"
                          strokeDasharray={`${metric.score}, 100`}
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-foreground">
                          {metric.score}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      {metric.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Material Origins */}
          <Card className="border-2 border-muted p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-foreground font-serif text-center flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6 text-accent" />
              Material Origins
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {materialOrigins.map((item, index) => (
                <div
                  key={item.material}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">
                    {item.material}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.origin}
                  </p>
                  <span className="text-xs px-3 py-1 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                    {item.sustainability}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Impact Summary */}
          <Card className="border-2 border-accent/30 p-8 bg-gradient-to-br from-accent/5 to-transparent">
            <div className="text-center">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-foreground font-serif">
                Your Sustainable Impact
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">2.5kg</div>
                  <p className="text-sm text-muted-foreground">CO₂ Saved</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">150L</div>
                  <p className="text-sm text-muted-foreground">Water Conserved</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">5+</div>
                  <p className="text-sm text-muted-foreground">Lives Empowered</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                Every ÉLITE piece you choose contributes to a more sustainable fashion future. 
                Together, we're redefining luxury through conscious creation.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityTracker;
