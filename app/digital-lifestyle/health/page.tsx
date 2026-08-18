import React from "react";
import Link from "next/link";
import { HeartPulse, ShieldAlert, Sun } from "lucide-react";

export default function HealthPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <HeartPulse className="w-4 h-4" />
          <span>قطاع رقميون • القسم 2.4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          الصحة الرقمية والوقاية من الاحتراق (Digital Health)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          دليل الوقاية من الإجهاد البصري والاحتراق الوظيفي (Burnout)، تنظيم النوم والاستخدام الصحي للشاشات.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">اختبار قياس مؤشرات الاحتراق الرقمي (Burnout Assessment)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            قياس مستويات التعب الذهني والإنهاك الرقمي للحصول على توصيات فورية لعادة فصل الشاشات.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sun className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">بروتوكول تنظيم الإيقاع الحيوي (Circadian Rhythm & Tech)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            قواعد التعامل مع الضوء الأزرق وتقليل التشتت الليلي لتحسين جودة النوم والتركيز الصباحي.
          </p>
        </div>
      </div>
    </div>
  );
}
