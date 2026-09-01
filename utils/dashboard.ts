import { createClient } from "@/utils/supabase/server";

export interface SavedTool {
  id: string;
  category: string;
  tool_slug: string;
  tool_title: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  specialty: string | null;
  bio: string | null;
  notification_settings: {
    email_articles?: boolean;
    email_updates?: boolean;
    community_alerts?: boolean;
  } | null;
  two_factor_enabled: boolean;
}

export async function getDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null, savedTools: [] as SavedTool[], communityCount: 0, ticketsCount: 0, userRole: 'member' };

  const [{ data: profile }, { data: savedTools }, { count: communityCount }, { count: ticketsCount }, { data: roleRow }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, username, avatar_url, specialty, bio, notification_settings, two_factor_enabled").eq("id", user.id).maybeSingle(),
    supabase.from("saved_tools").select("id, category, tool_slug, tool_title, inputs, outputs, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("community_posts").select("id", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("support_tickets").select("id", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle(),
  ]);

  return {
    user,
    profile: profile as Profile | null,
    savedTools: (savedTools ?? []) as SavedTool[],
    communityCount: communityCount ?? 0,
    ticketsCount: ticketsCount ?? 0,
    userRole: roleRow?.role || 'member',
  };
}
