export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type NotificationSettings = {
  email_articles?: boolean
  email_updates?: boolean
  community_alerts?: boolean
}

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          title: string
          content: string
          category: string | null
          subcategory: string | null
          image_url: string | null
          slug: string | null
          description: string | null
          image_alt: string | null
          article_type: string
          tool_slug: string | null
          status: string
          published_at: string | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          category?: string | null
          subcategory?: string | null
          image_url?: string | null
          slug?: string | null
          description?: string | null
          image_alt?: string | null
          article_type?: string
          tool_slug?: string | null
          status?: string
          published_at?: string | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          category?: string | null
          subcategory?: string | null
          image_url?: string | null
          slug?: string | null
          description?: string | null
          image_alt?: string | null
          article_type?: string
          tool_slug?: string | null
          status?: string
          published_at?: string | null
          updated_at?: string
          created_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          specialty: string | null
          bio: string | null
          notification_settings: NotificationSettings | null
          two_factor_enabled: boolean
          theme_mode: string | null
          theme_accent: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          specialty?: string | null
          bio?: string | null
          notification_settings?: NotificationSettings | null
          two_factor_enabled?: boolean
          theme_mode?: string | null
          theme_accent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          specialty?: string | null
          bio?: string | null
          notification_settings?: NotificationSettings | null
          two_factor_enabled?: boolean
          theme_mode?: string | null
          theme_accent?: string | null
          created_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: number
          user_id: string | null
          email: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          email?: string | null
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          email?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      instant_reports: {
        Row: {
          id: string
          category_slug: string
          sub_category_slug: string | null
          badge: string | null
          title: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          category_slug: string
          sub_category_slug?: string | null
          badge?: string | null
          title: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          category_slug?: string
          sub_category_slug?: string | null
          badge?: string | null
          title?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          id: number
          user_id: string | null
          email: string | null
          action: string
          target_resource: string
          details: Json
          created_at: string
        }
        Insert: {
          id?: number
          user_id?: string | null
          email?: string | null
          action: string
          target_resource: string
          details?: Json
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string | null
          email?: string | null
          action?: string
          target_resource?: string
          details?: Json
          created_at?: string
        }
        Relationships: []
      }
      saved_tools: {
        Row: {
          id: string
          user_id: string
          category: string
          tool_slug: string
          tool_title: string
          inputs: Json
          outputs: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          tool_slug: string
          tool_title: string
          inputs: Json
          outputs: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          tool_slug?: string
          tool_title?: string
          inputs?: Json
          outputs?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_tools_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tools: {
        Row: {
          id: string
          title: string
          slug: string
          sector: string
          description: string
          icon: string
          is_interactive: boolean
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          sector: string
          description?: string
          icon?: string
          is_interactive?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          sector?: string
          description?: string
          icon?: string
          is_interactive?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tool_definitions: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          category: string
          icon_name: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string
          category: string
          icon_name?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          category?: string
          icon_name?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          id: string
          user_id: string
          category: string
          title: string
          content: string
          attached_tool_data: Json | null
          likes_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          title: string
          content: string
          attached_tool_data?: Json | null
          likes_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          title?: string
          content?: string
          attached_tool_data?: Json | null
          likes_count?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_post_likes: {
        Row: {
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          post_id?: string
          user_id?: string
          created_at?: string
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
          }
        ]
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          subject: string
          category: string
          status: string
          message: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject: string
          category?: string
          status?: string
          message: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string
          category?: string
          status?: string
          message?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      public_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
