import React from "react";
import Link from "next/link";
import { ShieldAlert, Info } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <ShieldAlert className="w-4 h-4" />
          <span>الصفحات القانونية • القسم 4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          إخلاء المسؤولية (Disclaimer)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          إخلاء مسؤولية قانوني ومالي يوضح طبيعة أدوات وحاسبات منصة مكاسب رقمية.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white border-r-4 border-emerald-400 pr-3">1. المشورة المالية والقانونية</h2>
          <p>جميع الحاسبات التفاعلية (كحاسبة التسعير، ومولد العقود، والتحليلات الإعلانية) صُممت كأدوات استرشادية وتقديرية فقط. ولا تُعتبر مخرجات المنصة مشورة مالية أو قانونية رسمية بديلة عن الاستشارة التخصصية المرخصة.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white border-r-4 border-emerald-400 pr-3">2. دقة الحسابات والبيانات</h2>
          <p>تبذل المنصة قصارى جهدها لضمان دقة الخوارزميات والمعادلات المستعملة، إلا أنها لا تتحمل أي مسؤولية عن أي قرارات استثمارية أو تجارية أو اتخاذ إجراءات بناءً على نتائج الأدوات المتاحة.</p>
        </section>
      </div>
    </div>
  );
}
