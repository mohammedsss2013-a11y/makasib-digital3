"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, Trash2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
  const [savedTools, setSavedTools] = useState<any[]>([]);

  useEffect(() => {
    const tools = JSON.parse(localStorage.getItem("saved_tools") || "[]");
    setSavedTools(tools);
  }, []);

  const handleRemove = (index: number) => {
    const updated = savedTools.filter((_, i) => i !== index);
    localStorage.setItem("saved_tools", JSON.stringify(updated));
    setSavedTools(updated);
  };

  return (
    <div className="space-y-8 dir-rtl py-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-black text-white">لوحة أدواتي الحافظة</h1>
        <p className="text-xs text-slate-400 mt-1">
          استعرض كافة الحسابات والبيانات التي قمت بحفظها أثناء تصفحك المنصة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedTools.length > 0 ? (
          savedTools.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                    {item.toolSlug}
                  </span>
                  <button
                    onClick={() => handleRemove(idx)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-base font-bold text-white mb-3">
                  {item.toolTitle}
                </h3>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs space-y-1 font-mono">
                  {Object.entries(item.outputs).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-400">{k}:</span>
                      <span className="text-emerald-400 font-bold">
                        {String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/finance/freelancing/pricing-guide"
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 justify-end transition-colors"
              >
                <span>الانتقال إلى حاسبة الأداة</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
            <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-400">
              لم تقم بحفظ أي أدوات أو حسابات في لوحتك بعد.
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg"
            >
              استكشف الأدوات الحية
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}