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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json
          email: string | null
          id: number
          target_resource: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json
          email?: string | null
          id?: number
          target_resource: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json
          email?: string | null
          id?: number
          target_resource?: string
          user_id?: string | null
        }
        Relationships: []
      }
      community_post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_post_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "community_post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post_likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          attached_tool_data: Json | null
          category: string
          content: string
          created_at: string
          id: string
          likes_count: number
          title: string
          user_id: string
        }
        Insert: {
          attached_tool_data?: Json | null
          category: string
          content: string
          created_at?: string
          id?: string
          likes_count?: number
          title: string
          user_id: string
        }
        Update: {
          attached_tool_data?: Json | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          likes_count?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      instant_reports: {
        Row: {
          badge: string | null
          category_slug: string
          created_at: string
          description: string | null
          id: string
          sub_category_slug: string | null
          title: string
        }
        Insert: {
          badge?: string | null
          category_slug: string
          created_at?: string
          description?: string | null
          id?: string
          sub_category_slug?: string | null
          title: string
        }
        Update: {
          badge?: string | null
          category_slug?: string
          created_at?: string
          description?: string | null
          id?: string
          sub_category_slug?: string | null
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          actor_id: string | null
          created_at: string
          href: string | null
          id: string
          message: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          href?: string | null
          id?: string
          message: string
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          href?: string | null
          id?: string
          message?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          article_type: string
          category: string | null
          content: string
          created_at: string | null
          description: string | null
          id: number
          image_alt: string | null
          image_url: string | null
          legacy_category: string | null
          legacy_subcategory: string | null
          published_at: string | null
          slug: string | null
          status: string
          subcategory: string | null
          title: string
          tool_slug: string | null
          topic: string | null
          updated_at: string
        }
        Insert: {
          article_type?: string
          category?: string | null
          content: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_alt?: string | null
          image_url?: string | null
          legacy_category?: string | null
          legacy_subcategory?: string | null
          published_at?: string | null
          slug?: string | null
          status?: string
          subcategory?: string | null
          title: string
          tool_slug?: string | null
          topic?: string | null
          updated_at?: string
        }
        Update: {
          article_type?: string
          category?: string | null
          content?: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_alt?: string | null
          image_url?: string | null
          legacy_category?: string | null
          legacy_subcategory?: string | null
          published_at?: string | null
          slug?: string | null
          status?: string
          subcategory?: string | null
          title?: string
          tool_slug?: string | null
          topic?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          notification_settings: Json | null
          specialty: string | null
          theme_accent: string | null
          theme_mode: string | null
          two_factor_enabled: boolean | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          notification_settings?: Json | null
          specialty?: string | null
          theme_accent?: string | null
          theme_mode?: string | null
          two_factor_enabled?: boolean | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          notification_settings?: Json | null
          specialty?: string | null
          theme_accent?: string | null
          theme_mode?: string | null
          two_factor_enabled?: boolean | null
          username?: string | null
        }
        Relationships: []
      }
      saved_tools: {
        Row: {
          category: string
          created_at: string
          id: string
          inputs: Json
          outputs: Json
          tool_slug: string
          tool_title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          inputs: Json
          outputs: Json
          tool_slug: string
          tool_title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          inputs?: Json
          outputs?: Json
          tool_slug?: string
          tool_title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_tools_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_tools_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          category: string
          created_at: string
          id: string
          message: string
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          message: string
          status?: string
          subject: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          message?: string
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_definitions: {
        Row: {
          category: string
          created_at: string
          description: string
          icon_name: string
          id: string
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          is_interactive: boolean
          sector: string
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          is_interactive?: boolean
          sector: string
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          is_interactive?: boolean
          sector?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          email: string | null
          id: number
          role: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          role?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          role?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      public_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          full_name: string | null
          id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_admin_role_by_id: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      is_admin_user: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
