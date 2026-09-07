"use client";

import { useState, type FormEvent } from "react";
import { Pencil, Save, X } from "lucide-react";
import { updateInstantReportAction } from "@/actions/admin.actions";

export interface InstantReportItem {
  id: string;
  category_slug: string;
  sub_category_slug: string | null;
  badge: string | null;
  title: string;
  description: string | null;
}

interface Props {
  initialReports: InstantReportItem[];
}

export default function ReportManagement({ initialReports }: Props) {
  const [reports, setReports] = useState(initialReports);
  const [editingReport, setEditingReport] = useState<InstantReportItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingReport) return;

    setLoading(true);
    setMessage(null);
    const result = await updateInstantReportAction(editingReport);
    setLoading(false);

    if (!result.success) {
      setMessage({ type: "error", text: result.error });
      return;
    }

    setReports((currentReports) => currentReports.map((report) => report.id === result.data.id ? result.data : report));
    setEditingReport(null);
    setMessage({ type: "success", text: "تم تحديث التقرير بنجاح." });
  }

  return (
    <div className="space-y-6 dir-rtl">
      <div className="flex flex-col gap-2 border-b border-slate-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">إدارة التقارير الفورية</h2>
          <p className="mt-1 text-sm text-slate-400">تعديل البطاقات الديناميكية المخصصة للأقسام والفروع.</p>
        </div>
        <span className="text-xs text-slate-500">{reports.length} تقرير</span>
      </div>

      {message && (
        <div className={`rounded-xl border p-3 text-sm ${message.type === "success" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "border-red-500/20 bg-red-500/10 text-red-300"}`} role="status">
          {message.text}
        </div>
      )}

      {editingReport && (
        <form onSubmit={handleUpdate} className="space-y-4 rounded-2xl border border-emerald-500/30 bg-slate-950/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-emerald-300">تعديل التقرير: {editingReport.category_slug} {editingReport.sub_category_slug ? `(${editingReport.sub_category_slug})` : "(عام)"}</h3>
            <button type="button" onClick={() => setEditingReport(null)} className="text-slate-400 hover:text-white" aria-label="إلغاء التعديل"><X className="h-4 w-4" /></button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300"><span>الشارة</span><input type="text" value={editingReport.badge ?? ""} onChange={(event) => setEditingReport({ ...editingReport, badge: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white" /></label>
            <label className="space-y-2 text-sm text-slate-300"><span>العنوان</span><input type="text" required value={editingReport.title} onChange={(event) => setEditingReport({ ...editingReport, title: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white" /></label>
          </div>
          <label className="block space-y-2 text-sm text-slate-300"><span>الوصف</span><textarea rows={3} value={editingReport.description ?? ""} onChange={(event) => setEditingReport({ ...editingReport, description: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white" /></label>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setEditingReport(null)} className="rounded-xl px-3 py-2 text-sm text-slate-400 hover:text-white">إلغاء</button><button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 disabled:opacity-50"><Save className="h-4 w-4" />{loading ? "جاري الحفظ..." : "حفظ التعديلات"}</button></div>
        </form>
      )}

      {reports.length ? (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[720px] text-right text-sm">
            <thead><tr className="border-b border-slate-800 text-xs text-slate-400"><th className="px-3 py-3">القسم</th><th className="px-3 py-3">الفرع</th><th className="px-3 py-3">الشارة</th><th className="px-3 py-3">العنوان</th><th className="px-3 py-3">الإجراء</th></tr></thead>
            <tbody>{reports.map((report) => <tr key={report.id} className="border-b border-slate-800/60 text-slate-300 last:border-0 hover:bg-slate-800/30"><td className="px-3 py-3 font-mono text-xs">{report.category_slug}</td><td className="px-3 py-3 font-mono text-xs">{report.sub_category_slug || "التقرير العام"}</td><td className="px-3 py-3 text-xs">{report.badge || "-"}</td><td className="px-3 py-3 font-medium text-white">{report.title}</td><td className="px-3 py-3"><button type="button" onClick={() => { setEditingReport(report); setMessage(null); }} className="inline-flex items-center gap-1 text-xs text-emerald-300 hover:text-emerald-200"><Pencil className="h-3.5 w-3.5" />تعديل</button></td></tr>)}</tbody>
          </table>
        </div>
      ) : <p className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">لا توجد تقارير فورية بعد.</p>}
    </div>
  );
}
