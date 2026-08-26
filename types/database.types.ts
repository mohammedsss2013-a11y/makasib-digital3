export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          content: string
          category?: string | null
          subcategory?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          content?: string
          category?: string | null
          subcategory?: string | null
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
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          specialty?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          specialty?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
