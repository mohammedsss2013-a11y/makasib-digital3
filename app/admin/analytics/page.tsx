import { BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminAnalyticsPage() {
  const supabase = await createClient();
  const [{ data: posts }, { data: tools }, { data: community }, { data: tickets }] = await Promise.all([
    supabase.from("posts").select("category, created_at").order("created_at", { ascending: false }).limit(500),
    supabase.from("tools").select("slug, title, created_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("community_posts").select("created_at, likes_count").order("created_at", { ascending: false }).limit(500),
    supabase.from("support_tickets").select("status, created_at, updated_at").order("created_at", { ascending: false }).limit(500),
  ]);
  const categoryCounts = Object.entries((posts ?? []).reduce<Record<string, number>>((counts, post) => { const key = post.category ?? "عام"; counts[key] = (counts[key] ?? 0) + 1; return counts; }, {})).sort((a, b) => b[1] - a[1]);
  const maxCategory = Math.max(1, ...categoryCounts.map(([, count]) => count));
  const openTickets = (tickets ?? []).filter((ticket) => ticket.status === "open").length;
  const totalLikes = (community ?? []).reduce((sum, post) => sum + post.likes_count, 0);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-black text-white">تحليلات المنصة</h1><p className="mt-2 text-sm text-slate-400">مؤشرات تشغيلية من المقالات والأدوات والمجتمع والدعم.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[{ label: "المقالات", value: posts?.length ?? 0 }, { label: "الأدوات", value: tools?.length ?? 0 }, { label: "إعجابات المجتمع", value: totalLikes }, { label: "تذاكر مفتوحة", value: openTickets }].map((metric) => <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><p className="text-xs text-slate-400">{metric.label}</p><strong className="mt-2 block text-3xl font-black text-emerald-400">{metric.value}</strong></div>)}
      </div>
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="flex items-center gap-2 text-base font-bold text-white"><BarChart3 className="h-5 w-5 text-emerald-400" /> المقالات حسب القطاع</h2>
        <div className="mt-6 space-y-4">{categoryCounts.map(([category, count]) => <div key={category}><div className="mb-1 flex justify-between text-xs"><span className="text-slate-300">{category}</span><strong className="text-emerald-300">{count}</strong></div><div className="h-3 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${(count / maxCategory) * 100}%` }} /></div></div>)}</div>
      </section>
    </div>
  );
}