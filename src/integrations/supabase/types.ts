export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      closet_items: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          product_data: Json
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          product_data: Json
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          product_data?: Json
          product_id?: string
          user_id?: string
        }
        Relationships: []
      }
      designer_bookings: {
        Row: {
          booking_type: string
          created_at: string
          designer_id: string
          id: string
          notes: string | null
          scheduled_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_type: string
          created_at?: string
          designer_id: string
          id?: string
          notes?: string | null
          scheduled_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_type?: string
          created_at?: string
          designer_id?: string
          id?: string
          notes?: string | null
          scheduled_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mood_history: {
        Row: {
          created_at: string | null
          id: string
          intensity: number | null
          mood: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          intensity?: number | null
          mood: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          intensity?: number | null
          mood?: string
          user_id?: string
        }
        Relationships: []
      }
      outfit_films: {
        Row: {
          created_at: string | null
          film_url: string
          id: string
          outfit_id: string | null
          product_id: string | null
          theme: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          film_url: string
          id?: string
          outfit_id?: string | null
          product_id?: string | null
          theme: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          film_url?: string
          id?: string
          outfit_id?: string | null
          product_id?: string | null
          theme?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "outfit_films_outfit_id_fkey"
            columns: ["outfit_id"]
            isOneToOne: false
            referencedRelation: "outfits"
            referencedColumns: ["id"]
          },
        ]
      }
      outfit_items: {
        Row: {
          closet_item_id: string
          created_at: string
          id: string
          outfit_id: string
        }
        Insert: {
          closet_item_id: string
          created_at?: string
          id?: string
          outfit_id: string
        }
        Update: {
          closet_item_id?: string
          created_at?: string
          id?: string
          outfit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "outfit_items_closet_item_id_fkey"
            columns: ["closet_item_id"]
            isOneToOne: false
            referencedRelation: "closet_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outfit_items_outfit_id_fkey"
            columns: ["outfit_id"]
            isOneToOne: false
            referencedRelation: "outfits"
            referencedColumns: ["id"]
          },
        ]
      }
      outfits: {
        Row: {
          created_at: string
          id: string
          name: string
          occasion: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          occasion?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          occasion?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      style_dna: {
        Row: {
          archetype: string | null
          color_preferences: Json | null
          created_at: string
          id: string
          personality_traits: Json | null
          style_preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          archetype?: string | null
          color_preferences?: Json | null
          created_at?: string
          id?: string
          personality_traits?: Json | null
          style_preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          archetype?: string | null
          color_preferences?: Json | null
          created_at?: string
          id?: string
          personality_traits?: Json | null
          style_preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_tiers: {
        Row: {
          created_at: string
          features: Json
          id: string
          name: string
          price: number
          stripe_price_id: string | null
        }
        Insert: {
          created_at?: string
          features?: Json
          id?: string
          name: string
          price: number
          stripe_price_id?: string | null
        }
        Update: {
          created_at?: string
          features?: Json
          id?: string
          name?: string
          price?: number
          stripe_price_id?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          description: string | null
          earned_at: string | null
          icon: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          description?: string | null
          earned_at?: string | null
          icon?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          description?: string | null
          earned_at?: string | null
          icon?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      wardrobe_suggestions: {
        Row: {
          created_at: string | null
          id: string
          occasion: string
          suggested_items: Json
          user_id: string
          weather: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          occasion: string
          suggested_items: Json
          user_id: string
          weather?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          occasion?: string
          suggested_items?: Json
          user_id?: string
          weather?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "designer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "designer", "admin"],
    },
  },
} as const
