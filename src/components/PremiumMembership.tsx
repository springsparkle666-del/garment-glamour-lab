import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "ÉLITE Access",
    price: "₹2,999",
    period: "/year",
    icon: Sparkles,
    features: [
      "Early access to new collections",
      "Exclusive designer previews",
      "Limited-edition pieces",
      "Behind-the-scenes content",
      "Monthly style newsletter",
      "Members-only digital events",
    ],
    gradient: "from-accent/20 to-accent/5",
    borderColor: "border-accent/30",
  },
  {
    name: "Luxe Gold",
    price: "₹5,999",
    period: "/year",
    icon: Crown,
    featured: true,
    features: [
      "Everything in ÉLITE Access",
      "Personal stylist consultation",
      "Virtual wardrobe curation",
      "Priority access to couture pieces",
      "Complimentary styling sessions",
      "Exclusive private event invitations",
      "Free premium shipping",
      "Dedicated concierge service",
    ],
    gradient: "from-accent/30 to-accent/10",
    borderColor: "border-accent",
  },
];

const PremiumMembership = () => {
  return (
    <section id="premium" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Premium Membership
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlock exclusive access to luxury fashion experiences and personalized styling
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <div
                key={tier.name}
                className={`relative overflow-hidden rounded-lg border-2 ${tier.borderColor} bg-gradient-to-br ${tier.gradient} backdrop-blur-sm p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-slide-up group`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {tier.featured && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    MOST POPULAR
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-serif">
                    {tier.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className={`w-full transition-all duration-300 ${
                    tier.featured
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {tier.featured ? "Upgrade to Gold" : "Join Now"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembership;
