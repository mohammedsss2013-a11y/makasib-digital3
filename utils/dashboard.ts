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

export async function getDashboardData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null, savedTools: [] as SavedTool[] };

  const [{ data: profile }, { data: savedTools }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, username, avatar_url, specialty").eq("id", user.id).maybeSingle(),
    supabase.from("saved_tools").select("id, category, tool_slug, tool_title, inputs, outputs, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
  ]);

  return { user, profile, savedTools: (savedTools ?? []) as SavedTool[] };
}
