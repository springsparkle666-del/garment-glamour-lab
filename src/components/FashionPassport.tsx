import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Star, Sparkles, Award, Crown, Heart, Camera, ShoppingBag } from "lucide-react";

interface Achievement {
  id: string;
  achievement_type: string;
  achievement_name: string;
  description: string;
  icon: string;
  earned_at: string;
}

const allAchievements = [
  { type: "first_login", name: "Fashion Explorer", description: "Joined ÉLITE Fashion", icon: "Star" },
  { type: "first_purchase", name: "Trendsetter", description: "Made your first purchase", icon: "ShoppingBag" },
  { type: "first_ar_tryon", name: "Virtual Fashionista", description: "Tried AR for the first time", icon: "Camera" },
  { type: "style_dna_complete", name: "DNA Decoded", description: "Completed Style DNA Profile", icon: "Sparkles" },
  { type: "10_outfits", name: "Wardrobe Curator", description: "Created 10 outfits", icon: "Heart" },
  { type: "first_mood_film", name: "Cinema Star", description: "Generated your first Mood Film", icon: "Award" },
  { type: "premium_member", name: "Elite Member", description: "Became a Premium Member", icon: "Crown" },
  { type: "mood_tracker", name: "Mood Master", description: "Tracked mood for 7 days", icon: "Heart" },
  { type: "designer_collab", name: "Co-Creator", description: "Collaborated with a designer", icon: "Sparkles" },
  { type: "social_share", name: "Brand Ambassador", description: "Shared 5 times on social", icon: "Star" },
];

const iconMap: { [key: string]: any } = {
  Star,
  ShoppingBag,
  Camera,
  Sparkles,
  Heart,
  Award,
  Crown,
  Trophy,
};

const FashionPassport = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
    checkAndAwardAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id)
        .order("earned_at", { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error: any) {
      console.error("Error loading achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndAwardAchievements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check for first login achievement
      const { data: loginAchievement } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id)
        .eq("achievement_type", "first_login")
        .maybeSingle();

      if (!loginAchievement) {
        await supabase.from("user_achievements").insert({
          user_id: user.id,
          achievement_type: "first_login",
          achievement_name: "Fashion Explorer",
          description: "Joined ÉLITE Fashion",
          icon: "Star",
        });
      }

      // Check other achievements based on user data
      const { data: outfits } = await supabase
        .from("outfits")
        .select("*")
        .eq("user_id", user.id);

      if (outfits && outfits.length >= 10) {
        const { data: outfitAchievement } = await supabase
          .from("user_achievements")
          .select("*")
          .eq("user_id", user.id)
          .eq("achievement_type", "10_outfits")
          .maybeSingle();

        if (!outfitAchievement) {
          await supabase.from("user_achievements").insert({
            user_id: user.id,
            achievement_type: "10_outfits",
            achievement_name: "Wardrobe Curator",
            description: "Created 10 outfits",
            icon: "Heart",
          });
        }
      }

      loadAchievements();
    } catch (error: any) {
      console.error("Error checking achievements:", error);
    }
  };

  const earnedTypes = achievements.map(a => a.achievement_type);
  const progress = (achievements.length / allAchievements.length) * 100;

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Loading your passport...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-background to-purple-500/10 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
            Fashion Passport
          </h2>
          <p className="text-lg text-muted-foreground">
            Your journey through ÉLITE Fashion ✨
          </p>
        </div>

        {/* Progress Overview */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                Your Progress
              </h3>
              <span className="text-2xl font-bold text-primary">
                {achievements.length}/{allAchievements.length}
              </span>
            </div>

            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-muted-foreground mt-2 text-center">
              {Math.round(progress)}% Complete
            </p>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {allAchievements.map((achievement) => {
            const isEarned = earnedTypes.includes(achievement.type);
            const Icon = iconMap[achievement.icon] || Star;
            const earnedData = achievements.find(a => a.achievement_type === achievement.type);

            return (
              <div
                key={achievement.type}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isEarned
                    ? "border-amber-500 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 shadow-xl"
                    : "border-border/50 bg-card/30 opacity-50"
                }`}
              >
                {isEarned && (
                  <div className="absolute -top-3 -right-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center animate-pulse">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`p-4 rounded-full ${
                    isEarned
                      ? "bg-gradient-to-br from-amber-500 to-yellow-500"
                      : "bg-muted"
                  }`}>
                    <Icon className={`w-8 h-8 ${isEarned ? "text-white" : "text-muted-foreground"}`} />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">{achievement.name}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>

                  {isEarned && earnedData && (
                    <div className="text-xs text-amber-500 mt-2">
                      {new Date(earnedData.earned_at).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {!isEarned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm text-center px-4">Keep exploring to unlock!</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Motivational Message */}
        {achievements.length < allAchievements.length && (
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-500/30 rounded-xl px-8 py-4">
              <p className="text-lg font-medium">
                {achievements.length === 0 && "Start your fashion journey and earn your first stamp!"}
                {achievements.length > 0 && achievements.length < 5 && "You're off to a great start! Keep going! 🌟"}
                {achievements.length >= 5 && achievements.length < 8 && "Amazing progress! You're a true fashionista! ✨"}
                {achievements.length >= 8 && "Almost there! Complete your passport! 🏆"}
              </p>
            </div>
          </div>
        )}

        {achievements.length === allAchievements.length && (
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl px-8 py-6">
              <Crown className="w-12 h-12 text-white mx-auto mb-4" />
              <p className="text-2xl font-bold text-white mb-2">
                Passport Complete! 👑
              </p>
              <p className="text-white/90">
                You've mastered the ÉLITE Fashion experience!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FashionPassport;