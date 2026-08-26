import { FileOutput, FileText } from "lucide-react";
import { getDashboardData } from "@/utils/dashboard";

export default async function ExportCenterPage() {
  const { savedTools } = await getDashboardData();
  const contracts = savedTools.filter((tool) => tool.tool_slug.includes("contract"));
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <FileOutput className="w-4 h-4" />
          <span>لوحة تحكم المستخدم</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          إدارة العقود والتقارير المطبوعة (Export Center - PDF/Excel)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          جميع العقود التي قمت بتوليدها وتقارير الأداء القابلة للتنزيل بصيغ PDF أو Excel مباشرة.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>سجل الملفات والعقود الجاهزة</span>
        </h3>

        {contracts.length ? <div className="space-y-3">{contracts.map((contract) => <article key={contract.id} className="rounded-xl border border-slate-800 bg-slate-950 p-4"><h4 className="text-xs font-bold text-white">{contract.tool_title}</h4><span className="mt-1 block text-[10px] text-slate-400">تاريخ الحفظ: {new Date(contract.created_at).toLocaleDateString("ar-EG")}</span><dl className="mt-3 space-y-1 border-t border-slate-800 pt-3">{Object.entries(contract.outputs).slice(0, 3).map(([label, value]) => <div key={label} className="flex justify-between gap-3 text-xs"><dt className="text-slate-500">{label}</dt><dd className="font-bold text-slate-200">{String(value)}</dd></div>)}</dl></article>)}</div> : <p className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">لا توجد عقود محفوظة بعد. أنشئ عقدًا من لوحة الأدوات أولًا.</p>}
      </div>
    </div>
  );
}
