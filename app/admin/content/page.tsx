import { createClient } from "@/lib/supabase/server";
import ReportManagement, { type InstantReportItem } from "./_components/ReportManagement";

export default async function AdminContentPage() {
  const supabase = await createClient();

  const [{ count: publishedCount }, { count: draftCount }, { count: usersCount }, { count: savedCount }, { data: reports }] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("id", { count: "exact", head: true }).neq("status", "published"),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("saved_tools").select("id", { count: "exact", head: true }),
    supabase
      .from("instant_reports")
      .select("id, category_slug, sub_category_slug, badge, title, description")
      .order("category_slug")
      .order("sub_category_slug", { nullsFirst: true }),
  ]);

  const contentStats = [
    { label: "المقالات المنشورة", value: String(publishedCount ?? 0) },
    { label: "المسودات", value: String(draftCount ?? 0) },
    { label: "المستخدمين المسجلين", value: String(usersCount ?? 0) },
    { label: "النتائج المحفوظة", value: String(savedCount ?? 0) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">المحتوى والأدوات</h1>
        <p className="mt-2 text-sm text-slate-400">إدارة المقالات، الفئات، والأدوات الرقمية داخل المنصة.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {contentStats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-3 text-2xl font-black text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-lg font-bold text-white">آخر التحديثات</h2>
        <div className="mt-5 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span>إحصاءات المقالات والأدوات متاحة بشكل مباشر من قاعدة البيانات</span>
            <span className="text-slate-500">الآن</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span>عدد المستخدمين والنتائج المحفوظة محسوب مباشرة من الجداول</span>
            <span className="text-slate-500">مباشر</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span>لوحة الإدارة تستهدف التوسع التدريجي دون كسر البنية</span>
            <span className="text-slate-500">جاهز</span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <ReportManagement initialReports={(reports ?? []) as InstantReportItem[]} />
      </section>
    </div>
  );
}
