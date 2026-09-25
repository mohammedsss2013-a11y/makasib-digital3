"use client";

import { useState } from "react";

type AnalyticsView = "categories" | "tools" | "tickets";

interface AnalyticsData {
  categories: Array<{ label: string; value: number }>;
  tools: Array<{ label: string; value: number }>;
  tickets: Array<{ label: string; value: number }>;
}

export function InteractiveAnalytics({ data }: { data: AnalyticsData }) {
  const [view, setView] = useState<AnalyticsView>("categories");
  const views: Array<{ id: AnalyticsView; label: string }> = [
    { id: "categories", label: "المقالات حسب القطاع" },
    { id: "tools", label: "الأدوات المضافة" },
    { id: "tickets", label: "حالة التذاكر" },
  ];
  const rows = data[view];
  const max = Math.max(1, ...rows.map((row) => row.value));

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-white">تحليل تفاعلي</h2>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="نوع التحليل">
          {views.map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={view === item.id} onClick={() => setView(item.id)} className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${view === item.id ? "bg-emerald-400 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 space-y-4" role="tabpanel">
        {rows.length ? rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-xs"><span className="text-slate-300">{row.label}</span><strong className="text-emerald-300">{row.value}</strong></div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: `${(row.value / max) * 100}%` }} /></div>
          </div>
        )) : <p className="text-sm text-slate-400">لا توجد بيانات كافية لهذا التحليل.</p>}
      </div>
    </section>
  );
}