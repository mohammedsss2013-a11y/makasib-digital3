import React from "react";
import Link from "next/link";
import { Wrench, Calculator, ShieldCheck, ArrowLeft } from "lucide-react";

export default function DashboardToolsPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Wrench className="w-4 h-4" />
          <span>لوحة تحكم المستخدم • القسم 3</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          مكتبة الأدوات والحاسبات المحفوظة (Saved Tools & Inputs)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          جميع المدخلات والمخرجات المخزنة للأدوات التفاعلية لإعادة استخدامها والتعديل عليها دون البدء من الصفر.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">حاسبة تسعير الخدمات</span>
            <span className="text-[11px] text-slate-500">تم التحديث منذ 3 أيام</span>
          </div>
          <h3 className="text-base font-bold text-white">إعدادات تسعير الخدمات الاستشارية 2026</h3>
          <div className="bg-slate-950 p-3 rounded-xl text-xs space-y-1 border border-slate-800 font-mono text-slate-300">
            <div>المحتسب النهائي: <span className="text-emerald-400 font-bold">52.50 $/ساعة</span></div>
            <div>المصاريف الثابتة: <span className="text-slate-400">450 $/شهر</span></div>
          </div>
          <Link href="/finance/freelancing/pricing-guide" className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1">
            <span>فتح الأداة وتعديل المدخلات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
