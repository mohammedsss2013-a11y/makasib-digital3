"use client";

import { Search } from "lucide-react";

export function HomeSearchButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-site-search"))}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/80 px-5 py-3.5 text-xs font-semibold text-white transition-colors hover:border-emerald-400/50 hover:bg-slate-700 sm:text-sm"
    >
      <Search className="h-4 w-4 text-emerald-400" />
      ابحث داخل الموقع
    </button>
  );
}
