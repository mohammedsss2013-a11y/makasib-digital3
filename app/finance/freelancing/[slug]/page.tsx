import React from "react";
import Link from "next/link";
import { DynamicToolRenderer } from "@/components/tools/DynamicToolRenderer";
import { Clock, User, MessageSquare } from "lucide-react";

export default function PricingGuideArticlePage() {
  return (
    <article className="max-w-4xl mx-auto space-y-8 dir-rtl py-4">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 border-b border-slate-800/80 pb-4">
        <Link href="/finance" className="hover:text-emerald-400">
          المال والأعمال
        </Link>
        <span>/</span>
        <Link href="/finance/freelancing" className="hover:text-emerald-400">
          العمل الحر
        </Link>
        <span>/</span>
        <span className="text-slate-200">هندسة تسعير الخدمات</span>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          الدليل الشامل لهندسة تسعير الخدمات: كيف تخرج من فخ التخمين وتضاعف أرباحك
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-emerald-400" /> فريق تحرير مكاسب
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" /> زمن القراءة: 15 دقيقة
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            تحديث أغسطس 2026
          </span>
        </div>
      </header>

      {/* Section 1 */}
      <section className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
        <h2 className="text-xl font-bold text-white border-r-4 border-emerald-500 pr-3">
          لماذا يُعد التسعير هندسة وليس مجرد رقم؟
        </h2>
        <p>
          التسعير القائم على القيمة (Value-Based Pricing) يتطلب مراعاة نفقاتك العملية الثابتة والهدف المالي الصافي الذي تسعى للوصول إليه بدلاً من الاعتماد العشوائي على متوسطات السوق.
        </p>
      </section>

      {/* Embedded Tool 1 */}
      <section id="pricing-calculator" className="scroll-mt-24 my-8">
        <div className="bg-slate-900/50 border border-emerald-500/30 p-2 rounded-2xl">
          <DynamicToolRenderer slug="freelance-pricing-calculator" />
        </div>
      </section>

      {/* Section 2 */}
      <section className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
        <h2 className="text-xl font-bold text-white border-r-4 border-emerald-500 pr-3">
          استراتيجيات التأطير والتفاوض الإجرائية
        </h2>
        <p>
          عند تحديد السعر الصافي الموصى به، تكمن الخطوة التالية في صياغة اتفاقية قانونية تحمي مخرجاتك وتمنع تمدد نطاق العمل (Scope Creep) دون مقابل.
        </p>
      </section>

      {/* Embedded Tool 2 */}
      <section id="contract-generator" className="scroll-mt-24 my-8">
        <div className="bg-slate-900/50 border border-emerald-500/30 p-2 rounded-2xl">
          <DynamicToolRenderer slug="contract-generator" />
        </div>
      </section>

      {/* Community CTA */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
        <div>
          <h3 className="text-base font-bold text-white">
            شارك تجربتك في التسعير
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            ناقش التحديات وحسابات التكلفة مع المطورين والمستقلين في مجتمع مكاسب.
          </p>
        </div>
        <Link
          href="/community"
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs whitespace-nowrap flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>الانضمام للنقاش</span>
        </Link>
      </div>
    </article>
  );
}