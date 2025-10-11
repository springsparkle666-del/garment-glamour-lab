import { useState } from "react";
import { Sparkles } from "lucide-react";

interface FabricType {
  name: string;
  texture: string;
  sound: string;
  color: string;
  description: string;
}

const fabrics: FabricType[] = [
  {
    name: "Silk",
    texture: "Smooth & Luxurious",
    sound: "whisper",
    color: "from-purple-500/20 to-pink-500/20",
    description: "Pure silk with a lustrous sheen",
  },
  {
    name: "Velvet",
    texture: "Rich & Plush",
    sound: "soft",
    color: "from-blue-500/20 to-purple-500/20",
    description: "Deep pile velvet for ultimate luxury",
  },
  {
    name: "Linen",
    texture: "Natural & Breathable",
    sound: "crisp",
    color: "from-amber-500/20 to-yellow-500/20",
    description: "Eco-conscious natural fibers",
  },
  {
    name: "Cashmere",
    texture: "Ultra-Soft & Warm",
    sound: "gentle",
    color: "from-rose-500/20 to-orange-500/20",
    description: "Premium cashmere blend",
  },
  {
    name: "Denim",
    texture: "Sturdy & Textured",
    sound: "robust",
    color: "from-slate-500/20 to-blue-500/20",
    description: "Heavy-weight premium denim",
  },
  {
    name: "Chiffon",
    texture: "Lightweight & Flowing",
    sound: "airy",
    color: "from-cyan-500/20 to-teal-500/20",
    description: "Delicate sheer chiffon",
  },
];

const FabricInteraction = () => {
  const [activeFabric, setActiveFabric] = useState<FabricType | null>(null);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-serif">
            Touch the Fabric
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hover over each fabric to experience its unique texture and character
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {fabrics.map((fabric, index) => (
            <div
              key={fabric.name}
              className="group relative aspect-square cursor-pointer"
              onMouseEnter={() => setActiveFabric(fabric)}
              onMouseLeave={() => setActiveFabric(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`
                  absolute inset-0 rounded-lg border-2 border-muted
                  bg-gradient-to-br ${fabric.color}
                  backdrop-blur-sm
                  transition-all duration-500
                  group-hover:scale-105 group-hover:shadow-2xl
                  group-hover:border-accent
                  flex items-center justify-center
                  overflow-hidden
                `}
              >
                {/* Texture Pattern Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div
                    className={`w-full h-full ${
                      fabric.name === "Silk"
                        ? "bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.3)_75%)] bg-[length:4px_4px]"
                        : fabric.name === "Velvet"
                        ? "bg-[radial-gradient(circle,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[length:8px_8px]"
                        : fabric.name === "Denim"
                        ? "bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,.1)_50%)] bg-[length:2px_2px]"
                        : "bg-[linear-gradient(transparent_50%,rgba(255,255,255,.1)_50%)] bg-[length:20px_20px]"
                    }`}
                  />
                </div>

                {/* Fabric Name */}
                <div className="relative z-10 text-center p-6">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-2xl font-bold text-foreground font-serif mb-2">
                    {fabric.name}
                  </h3>
                  <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {fabric.texture}
                  </p>
                </div>

                {/* Ripple Effect on Hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-0 rounded-lg bg-accent/10 animate-ping" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Fabric Details */}
        {activeFabric && (
          <div className="mt-12 text-center animate-fade-in">
            <div className="inline-block bg-card border border-accent/30 rounded-lg p-6 shadow-lg">
              <p className="text-lg text-foreground font-medium mb-2">
                {activeFabric.name}
              </p>
              <p className="text-muted-foreground">{activeFabric.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FabricInteraction;
