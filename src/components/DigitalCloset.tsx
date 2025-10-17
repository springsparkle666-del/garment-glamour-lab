import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Heart, Plus, Trash2, Sparkles } from "lucide-react";

interface ClosetItem {
  id: string;
  product_id: string;
  product_data: any;
  notes?: string;
  created_at: string;
}

interface Outfit {
  id: string;
  name: string;
  occasion?: string;
  items: ClosetItem[];
}

const DigitalCloset = () => {
  const [closetItems, setClosetItems] = useState<ClosetItem[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [newOutfitName, setNewOutfitName] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadClosetData();
  }, []);

  const loadClosetData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load closet items
      const { data: items, error: itemsError } = await supabase
        .from("closet_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (itemsError) throw itemsError;
      setClosetItems(items || []);

      // Load outfits
      const { data: outfitsData, error: outfitsError } = await supabase
        .from("outfits")
        .select(`
          *,
          outfit_items (
            closet_item:closet_items (*)
          )
        `)
        .eq("user_id", user.id);

      if (outfitsError) throw outfitsError;
      
      // Transform the data to match Outfit interface
      const transformedOutfits = (outfitsData || []).map((outfit: any) => ({
        id: outfit.id,
        name: outfit.name,
        occasion: outfit.occasion,
        items: outfit.outfit_items?.map((oi: any) => oi.closet_item) || [],
      }));
      
      setOutfits(transformedOutfits);
    } catch (error: any) {
      toast({
        title: "Error loading closet",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("closet_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      setClosetItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Item removed",
        description: "The item has been removed from your closet.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const createOutfit = async () => {
    if (!newOutfitName.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("outfits")
        .insert({
          user_id: user.id,
          name: newOutfitName,
        });

      if (error) throw error;

      setNewOutfitName("");
      loadClosetData();
      toast({
        title: "Outfit created",
        description: "Your new outfit has been created!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Loading your closet...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Digital Closet
          </h2>
          <p className="text-lg text-muted-foreground">
            Your personal fashion collection
          </p>
        </div>

        {/* Closet Items */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Saved Items
          </h3>
          {closetItems.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">
                Your closet is empty. Start adding items you love!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {closetItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5" />
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{item.product_data.name || "Item"}</h4>
                    {item.notes && (
                      <p className="text-sm text-muted-foreground">{item.notes}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Outfits */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            My Outfits
          </h3>
          
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="New outfit name..."
              value={newOutfitName}
              onChange={(e) => setNewOutfitName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && createOutfit()}
            />
            <Button onClick={createOutfit}>
              <Plus className="w-4 h-4 mr-2" />
              Create Outfit
            </Button>
          </div>

          {outfits.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">
                No outfits created yet. Create your first outfit combination!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <h4 className="font-semibold text-lg mb-2">{outfit.name}</h4>
                  {outfit.occasion && (
                    <p className="text-sm text-muted-foreground mb-4">{outfit.occasion}</p>
                  )}
                  <div className="text-sm text-muted-foreground">
                    {outfit.items?.length || 0} items
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

export default DigitalCloset;
