-- Create mood history table for Mood Mode
CREATE TABLE public.mood_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  intensity INTEGER CHECK (intensity >= 1 AND intensity <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.mood_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own mood history"
  ON public.mood_history
  FOR ALL
  USING (auth.uid() = user_id);

-- Create outfit films table for AI-generated mood films
CREATE TABLE public.outfit_films (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  outfit_id UUID REFERENCES public.outfits(id) ON DELETE CASCADE,
  product_id TEXT,
  film_url TEXT NOT NULL,
  theme TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.outfit_films ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own outfit films"
  ON public.outfit_films
  FOR ALL
  USING (auth.uid() = user_id);

-- Create achievements table for Fashion Passport
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, achievement_type)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON public.user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create achievements"
  ON public.user_achievements
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create wardrobe suggestions table for AI Wardrobe Curator
CREATE TABLE public.wardrobe_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  occasion TEXT NOT NULL,
  weather TEXT,
  suggested_items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.wardrobe_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own wardrobe suggestions"
  ON public.wardrobe_suggestions
  FOR ALL
  USING (auth.uid() = user_id);

-- Add indexes for better performance
CREATE INDEX idx_mood_history_user_id ON public.mood_history(user_id);
CREATE INDEX idx_mood_history_created_at ON public.mood_history(created_at DESC);
CREATE INDEX idx_outfit_films_user_id ON public.outfit_films(user_id);
CREATE INDEX idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX idx_wardrobe_suggestions_user_id ON public.wardrobe_suggestions(user_id);