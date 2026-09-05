import Link from "next/link";
import { PlusCircle, Wrench } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const categoryLabels: Record<string, string> = {
  finance: "المال والأعمال",
  tech: "التكنولوجيا والابتكار",
  media: "الإعلام الجديد",
  "digital-lifestyle": "رقميون",
};

const statusLabels: Record<string, string> = {
  active: "نشطة",
  inactive: "غير نشطة",
  archived: "مؤرشفة",
};

export default async function AdminToolsPage() {
  const supabase = await createClient();
  const { data: tools, error } = await supabase
    .from("tools")
    .select("id, title, slug, description, sector, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 dir-rtl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">الأدوات الرقمية</h1>
          <p className="mt-2 text-sm text-slate-400">إدارة الأدوات المضافة إلى سجل المنصة.</p>
        </div>
        <Link href="/admin/tools/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-emerald-300">
          <PlusCircle className="h-4 w-4" aria-hidden="true" />
          إضافة أداة جديدة
        </Link>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-200">
          تعذر تحميل سجل الأدوات. تأكد من تطبيق ترحيل قاعدة البيانات أولًا.
        </div>
      ) : tools?.length ? (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
          <div className="divide-y divide-slate-800">
            {tools.map((tool) => (
              <article key={tool.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300">
                    <Wrench className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white">{tool.title}</h2>
                    <p className="mt-1 text-xs text-slate-500" dir="ltr">{tool.slug}</p>
                    <p className="mt-2 text-sm text-slate-400">{tool.description || "بدون وصف"}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-xs">
                  <span className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-300">{categoryLabels[tool.sector] ?? tool.sector}</span>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">{statusLabels[tool.status] ?? tool.status}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-12 text-center">
          <Wrench className="mx-auto h-8 w-8 text-slate-600" aria-hidden="true" />
          <p className="mt-3 text-sm text-slate-300">لا توجد أدوات مضافة من لوحة الإدارة بعد.</p>
        </div>
      )}
    </div>
  );
}
