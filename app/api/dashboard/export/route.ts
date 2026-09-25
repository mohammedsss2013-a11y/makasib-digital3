import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "تسجيل الدخول مطلوب" }, { status: 401 });

  const [{ data: profile }, { data: savedTools }, { data: posts }, { data: tickets }, { data: comments }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, username, avatar_url, specialty, bio, notification_settings, two_factor_enabled, created_at").eq("id", user.id).maybeSingle(),
    supabase.from("saved_tools").select("id, category, tool_slug, tool_title, inputs, outputs, created_at, updated_at").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("community_posts").select("id, category, title, content, attached_tool_data, likes_count, created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("support_tickets").select("id, subject, category, status, message, created_at, updated_at").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("community_post_comments").select("id, post_id, parent_id, content, created_at, updated_at").eq("user_id", user.id).order("created_at", { ascending: false }),
  ]);

  return new NextResponse(JSON.stringify({
    exportedAt: new Date().toISOString(),
    account: { id: user.id, email: user.email, createdAt: user.created_at },
    profile,
    savedTools: savedTools ?? [],
    communityPosts: posts ?? [],
    communityComments: comments ?? [],
    supportTickets: tickets ?? [],
  }, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="makasib-data-${user.id}.json"`,
      "Cache-Control": "private, no-store",
    },
  });
}