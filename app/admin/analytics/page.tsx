import { createClient } from "@/lib/supabase/server";
import { InteractiveAnalytics } from "@/components/admin/InteractiveAnalytics";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();
  const [{ data: posts }, { data: tools }, { data: community }, { data: tickets }] = await Promise.all([
    supabase.from("posts").select("category, created_at").order("created_at", { ascending: false }).limit(500),
    supabase.from("tools").select("slug, title, created_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("community_posts").select("created_at, likes_count").order("created_at", { ascending: false }).limit(500),
    supabase.from("support_tickets").select("status, created_at, updated_at").order("created_at", { ascending: false }).limit(500),
  ]);
  const categoryCounts = Object.entries((posts ?? []).reduce<Record<string, number>>((counts, post) => { const key = post.category ?? "عام"; counts[key] = (counts[key] ?? 0) + 1; return counts; }, {})).sort((a, b) => b[1] - a[1]);
  const toolCounts = (tools ?? []).reduce<Record<string, number>>((counts, tool) => { const month = new Date(tool.created_at).toLocaleDateString("ar-EG", { year: "numeric", month: "long" }); counts[month] = (counts[month] ?? 0) + 1; return counts; }, {});
  const ticketCounts = (tickets ?? []).reduce<Record<string, number>>((counts, ticket) => { counts[ticket.status] = (counts[ticket.status] ?? 0) + 1; return counts; }, {});
  const openTickets = (tickets ?? []).filter((ticket) => ticket.status === "open").length;
  const totalLikes = (community ?? []).reduce((sum, post) => sum + post.likes_count, 0);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-black text-white">تحليلات المنصة</h1><p className="mt-2 text-sm text-slate-400">مؤشرات تشغيلية من المقالات والأدوات والمجتمع والدعم.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[{ label: "المقالات", value: posts?.length ?? 0 }, { label: "الأدوات", value: tools?.length ?? 0 }, { label: "إعجابات المجتمع", value: totalLikes }, { label: "تذاكر مفتوحة", value: openTickets }].map((metric) => <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-xs text-slate-400">{metric.label}</p><strong className="mt-2 block text-3xl font-black text-emerald-400">{metric.value}</strong></div>)}
      </div>
      <InteractiveAnalytics data={{ categories: categoryCounts.map(([label, value]) => ({ label, value })), tools: Object.entries(toolCounts).map(([label, value]) => ({ label, value })), tickets: Object.entries(ticketCounts).map(([label, value]) => ({ label, value })) }} />
    </div>
  );
}