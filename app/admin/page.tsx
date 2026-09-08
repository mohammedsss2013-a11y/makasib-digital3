import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const [postsResult, toolsResult, reportsResult] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("tools").select("*", { count: "exact", head: true }),
    supabase.from("instant_reports").select("*", { count: "exact", head: true }),
  ]);

  const queryError = postsResult.error ?? toolsResult.error ?? reportsResult.error;
  const metrics = [
    { label: "إجمالي المقالات", value: postsResult.count, accent: "text-emerald-400" },
    { label: "الأدوات المتاحة", value: toolsResult.count, accent: "text-blue-400" },
    { label: "التقارير الفورية النشطة", value: reportsResult.count, accent: "text-indigo-400" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white sm:text-3xl">نظرة عامة على المنصة</h1>
        <p className="mt-2 text-sm leading-7 text-slate-400">إحصائيات حية من قاعدة بيانات المنصة.</p>
      </div>

      {queryError ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          تعذر تحميل إحصائيات المنصة حالياً. يرجى المحاولة مرة أخرى لاحقاً.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className={`mt-2 text-3xl font-black ${metric.accent}`}>{metric.value ?? 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
