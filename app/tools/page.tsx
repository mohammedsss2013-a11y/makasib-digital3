'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  FilePlus2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { TOOLS_REGISTRY } from '@/config/toolsRegistry';
import ToolCatalog from '@/components/tools/ToolCatalog';

export default function ToolsWorkspacePage() {
  return (
    <div className="space-y-8 py-4 dir-rtl" dir="rtl">
      <section className="overflow-hidden rounded-[28px] border border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            منصة أدوات رقمية
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <h1 className="text-3xl font-black text-white sm:text-4xl">أدوات رقمية تفاعلية</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                حاسبات ومولدات عملية مصممة لكل قطاع بحيث يمكنك الانتقال من الفكرة إلى القرار في دقائق بدل التشتت.
              </p>
            </div>

          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              {TOOLS_REGISTRY.length} أداة متاحة
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-[11px] text-slate-300">
              <ArrowLeft className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              بحث + تصنيف + استخدام فوري
            </span>
          </div>

        </div>

      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-white">الأدوات الرقمية الحية</h2>
          <span className="text-[11px] text-slate-400">عرض مباشر</span>
        </div>

        <ToolCatalog />
      </section>

      <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold text-emerald-300">تجربة عملية</p>
            <h2 className="mt-1 text-xl font-black text-white">استخدم الأدوات الرقمية المناسبة لقطاعك</h2>
          </div>
          <Link
            href="/dashboard/tools"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-xs font-black text-slate-950 transition-colors hover:bg-emerald-300"
          >
            <FilePlus2 className="h-4 w-4" aria-hidden="true" />
            لوحة أدواتي
          </Link>
        </div>
      </section>
    </div>
  );
}