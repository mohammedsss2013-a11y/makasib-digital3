import React from "react";
import { FilePlus2, Sparkles } from "lucide-react";
import { CalculatorWorkspace } from "@/components/dashboard/CalculatorWorkspace";
import { getRecentTools, TOOLS_REGISTRY } from "@/config/toolsRegistry";

export default function DashboardToolsPage() {
  const recentTools = getRecentTools();
  const totalToolsCount = TOOLS_REGISTRY.length;

  return (
    <div className="space-y-8 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <FilePlus2 className="w-4 h-4" />
            <span>لوحة أدواتي ({totalToolsCount} أداة متاحة)</span>
          </div>
          {recentTools.length > 0 && (
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1.5 rounded-full font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{recentTools.length} أدوات محدثة حديثاً</span>
            </div>
          )}
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
