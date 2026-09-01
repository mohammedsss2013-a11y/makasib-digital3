import React from "react";
import Link from "next/link";
import { Sparkles, Target, Compass, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4 text-center md:text-right">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>عن المنصة • القسم 4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          عن منصة مكاسب رقمية (Makasib Digital)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
          منصة تمكين رقمي عربية تهدف إلى تحويل المهارات الفردية والجهد الشخصي إلى خبرات قابلة للتنفيذ، وأدوات عملية، ومجتمع يفتح فرصاً حقيقية في الاقتصاد الرقمي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">رؤيتنا ورسالتنا</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            تمكين صناع القرار والمهنيين والمستقلين العرب بأدوات رقمية دقيقة تحول الأفكار والاستراتيجيات إلى أرقام وقرارات تنفيذية فورية.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">الركائز الخمس الرئيسية</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            تغطي المنظومة قطاعات المال والأعمال، التكنولوجيا والابتكار، الإعلام الجديد، نمط حياة رقميون، ومجتمع مكاسب الرقمي التفاعلي.
          </p>
        </div>
      </div>
    </div>
  );
}
