import { BarChart } from "lucide-react";
import { getDashboardData } from "@/utils/dashboard";

export default async function DashboardAnalyticsPage() {
  const { savedTools } = await getDashboardData();
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <BarChart className="w-4 h-4" />
          <span>لوحة تحكم المستخدم</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          ملخص الأنشطة والإحصائيات الشخصية (Personal Analytics)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          تتبع استخدامك للأدوات والحاسبات، النماذج المنفذة، ونشاطك الإجمالي داخل المنظومة.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">عدد العمليات المحسوبة</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">{savedTools.length}</div>
          <span className="text-[10px] text-slate-500 block">نتائج محفوظة</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">العقود المولدة والمصدرة</span>
          <div className="text-3xl font-black text-teal-400 font-mono">{savedTools.filter((tool) => tool.tool_slug.includes("contract")).length}</div>
          <span className="text-[10px] text-slate-500 block">عقود محفوظة</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">تفاعلات المجتمعات</span>
          <div className="text-3xl font-black text-blue-400 font-mono">{new Set(savedTools.map((tool) => tool.category)).size}</div>
          <span className="text-[10px] text-slate-500 block">مجالات مستخدمة</span>
        </div>
      </div>
    </div>
  );
}
