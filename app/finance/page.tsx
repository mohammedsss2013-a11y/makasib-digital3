import React from "react";
import Link from "next/link";
import { TrendingUp, ArrowLeft, ShieldCheck, Calculator, FileCode, Zap } from "lucide-react";
import { FreelancePricingCalculator } from "@/components/tools/FreelancePricingCalculator";
import { ContractGenerator } from "@/components/tools/ContractGenerator";

export default function FinanceSectorPage() {
  return (
    <div className="space-y-12 py-4 dir-rtl">
      {/* Sector Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>قطاع المال والأعمال والتسعير</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          أدوات المال والعمل الحر والدلائل الإجرائية
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          دليلك التفاعلي لتسعير الخدمات المستقلة، حساب معدل الساعة الصافي، وصياغة عقود حماية المخرجات المالية والتجارية.
        </p>
      </div>

      {/* Embedded Tools */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold text-white border-r-4 border-emerald-500 pr-3">
          الأدوات التفاعلية الحية
        </h2>
        
        <FreelancePricingCalculator />
        <ContractGenerator />
      </section>

      {/* Detailed Guides Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-r-4 border-emerald-500 pr-3">
          الدلائل الإجرائية والأنشطة المقترحة
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl space-y-3 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
                دليل إجرائي مفصل
              </span>
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <Link href="/finance/freelancing/pricing-guide" className="block text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              هندسة تسعير الخدمات: الخروج من فخ التخمين
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              تعلم كيفية تكييف حساباتك الشخصية مع نماذج القيمة المضافة ومضاعفة أرباح عملك الحر بشكل دراماتيكي.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                <Zap className="h-3.5 w-3.5" /> يحتوي على أداة حية: حاسبة تسعير الخدمات
              </span>
              <span className="flex items-center gap-3 text-xs">
                <span className="text-slate-300">اقرأ المقال</span>
                <Link href="/finance/freelancing/pricing-guide#pricing-calculator" className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300">
                  قفز إلى الأداة <ArrowLeft className="h-3.5 w-3.5" />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
