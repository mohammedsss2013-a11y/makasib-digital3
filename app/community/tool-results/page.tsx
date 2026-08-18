import React from "react";
import Link from "next/link";
import { BarChart, Share2, Calculator, CheckCircle2 } from "lucide-react";

export default function ToolResultsPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <BarChart className="w-4 h-4" />
          <span>مجتمع مكاسب • القسم 2.5</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          مراجعات النتائج المرفقة من الأدوات (Tool Results Review)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          شارِك مخرجات حاسبات التسعير، الأمان، والعوائد مع مجتمع مكاسب للحصول على تقييمات ونقد تحليلي مباشر.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">نتيجة حاسبة التسعير</span>
            <span className="text-[11px] text-slate-500">تمت المشاركة اليوم</span>
          </div>
          <h3 className="text-base font-bold text-white">تسعير مشروع متجر إلكتروني كامل لمدة 40 ساعة</h3>
          <div className="bg-slate-950 p-3 rounded-xl font-mono text-emerald-400 text-sm border border-slate-800 flex justify-between">
            <span>معدل الساعة المقترح:</span>
            <span className="font-bold">45.00 $/ساعة</span>
          </div>
          <p className="text-xs text-slate-400">شارك العضو هذه النتيجة لمقارنة تكاليف الحياة في المنطقة وتقييم هل السعر مناسب لعميل خليجي.</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-teal-400 font-bold bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">نتيجة حاسبة الأمان</span>
            <span className="text-[11px] text-slate-500">تمت المشاركة أمس</span>
          </div>
          <h3 className="text-base font-bold text-white">درجة عشوائية مفتاح التشفير المحتسب</h3>
          <div className="bg-slate-950 p-3 rounded-xl font-mono text-teal-400 text-sm border border-slate-800 flex justify-between">
            <span>الإنتروبي (Entropy):</span>
            <span className="font-bold">128 Bits (Ultra Secure)</span>
          </div>
          <p className="text-xs text-slate-400">مشاركة مخرجات الفحص الأمني لتأكيد سلامة المفاتيح قبل النشر على الخوادم.</p>
        </div>
      </div>
    </div>
  );
}
