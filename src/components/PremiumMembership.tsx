import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Tier {
  id: string;
  name: string;
  price: number;
  stripe_price_id: string | null;
  features: string[];
}

const PremiumMembership = () => {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const { subscription, refreshSubscription } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadTiers();
  }, []);

  const loadTiers = async () => {
    try {
      const { data, error } = await supabase
        .from("subscription_tiers")
        .select("*")
        .order("price", { ascending: true });

      if (error) throw error;
      
      const parsedTiers = (data || []).map(tier => ({
        ...tier,
        features: (tier.features as unknown as string[]) || [],
      }));
      
      setTiers(parsedTiers);
    } catch (error: any) {
      toast({
        title: "Error loading tiers",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (priceId: string, tierId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe",
      });
      navigate("/auth");
      return;
    }

    if (!priceId) {
      toast({
        title: "Configuration error",
        description: "Stripe is not configured for this tier yet",
        variant: "destructive",
      });
      return;
    }

    setCheckoutLoading(tierId);

    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
        // Refresh subscription after a delay
        setTimeout(() => {
          refreshSubscription();
        }, 5000);
      }
    } catch (error: any) {
      toast({
        title: "Checkout error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTierIcon = (tierName: string) => {
    if (tierName.includes("Gold") || tierName.includes("Diamond")) {
      return Crown;
    }
    return Sparkles;
  };

  const getTierGradient = (index: number) => {
    const gradients = [
      "from-accent/20 to-accent/5",
      "from-accent/30 to-accent/10",
      "from-accent/40 to-accent/15",
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <section id="premium" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
        </div>
      </section>
    );
  }

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
          {subscription.subscribed && (
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={handleManageSubscription}
              >
                Manage Subscription
              </Button>
            </div>
          )}
        </div>

        <div className={`grid gap-8 max-w-5xl mx-auto ${
          tiers.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
        }`}>
          {tiers.map((tier, index) => {
            const IconComponent = getTierIcon(tier.name);
            const isFeatured = index === 1;
            const isActive = subscription.subscribed; // Could compare with current tier

            return (
              <div
                key={tier.id}
                className={`relative overflow-hidden rounded-lg border-2 ${
                  isFeatured ? "border-accent" : "border-accent/30"
                } bg-gradient-to-br ${getTierGradient(index)} backdrop-blur-sm p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-slide-up group`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {isFeatured && (
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
                      ₹{tier.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">/year</span>
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
                    isFeatured
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                  onClick={() => handleCheckout(tier.stripe_price_id || "", tier.id)}
                  disabled={checkoutLoading === tier.id || !tier.stripe_price_id}
                >
                  {checkoutLoading === tier.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : isActive ? (
                    "Current Plan"
                  ) : (
                    "Subscribe Now"
                  )}
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
