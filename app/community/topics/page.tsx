import React from "react";
import Link from "next/link";
import { Sparkles, MessageSquare, Flame, TrendingUp } from "lucide-react";

export default function TopicsPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>مجتمع مكاسب • القسم 2.5</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          النقاشات الساخنة والأفكار المبتكرة (Discussion Topics)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          حوارات حول المستقبل الرقمي، اقتصاد الذكاء الاصطناعي، والفرص الاستثمارية المستجدة في العالم العربي.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
            <Flame className="w-4 h-4" />
            <span>نقاش ساخن للأسبوع</span>
          </div>
          <h3 className="text-lg font-bold text-white">هل سيقضي الذكاء الاصطناعي على مطوري الواجهات الأمامية أم سيزيد من أجورهم؟</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            حوار افتتحه 48 خبيراً ومطوراً حول التحول من كتابة الأكواد التقليدية إلى هندسة التعليمات والأدوار المتقدمة.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-800">
            <span>342 مشارك</span>
            <span>89 تعليق مفصل</span>
          </div>
        </div>
      </div>
    </div>
  );
}
