import React from "react";
import { Wrench } from "lucide-react";
import { CalculatorWorkspace } from "@/components/dashboard/CalculatorWorkspace";

export default function DashboardToolsPage() {
  return (
    <div className="space-y-8 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Wrench className="w-4 h-4" />
          <span>لوحة أدواتي</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          لوحة أدواتي
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          كل حاسبات مكاسب رقمية في لوحة واحدة، مرتبة حسب المجال لتعود إلى نتائجك وتكمل عملك بسرعة.
        </p>
      </div>
      <CalculatorWorkspace />
    </div>
  );
}
