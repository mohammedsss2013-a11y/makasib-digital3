import React from "react";
import Link from "next/link";
import { Briefcase, Calculator, FileText, ArrowLeft, ShieldCheck, Clock, Zap } from "lucide-react";

export default function FreelancingPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      {/* البانر العلوي */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 z-10 relative">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
            <Briefcase className="w-4 h-4" />
            <span>قطاع المال والأعمال • القسم 2.1</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            العمل الحر وإدارة المشاريع المصغرة (Freelancing)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            منظومة حاسبات التسعير الهندسية، توليد العقود المباشرة لحماية حقوقك، والدلائل الإجرائية لزيادة الدخل وتدفق المشاريع.
          </p>
        </div>
      </div>

      {/* الأدوات والحاسبات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/finance/freelancing/pricing-guide"
          className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl transition-all group space-y-4 hover:shadow-xl hover:shadow-emerald-500/5"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
            <Calculator className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>حاسبة تسعير الخدمات ومعدل الساعة</span>
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              احسب سعر ساعتك الأدنى والمستهدف بناءً على التكاليف التشغيلية والأرباح المرجوة مع حساب أوقات التوقف.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1 text-emerald-400"><Clock className="w-3.5 h-3.5" /> أداة تفاعلية حية</span>
            <span>دليل إجرائي مرفق</span>
          </div>
        </Link>

        <Link
          href="/finance/freelancing/pricing-guide"
          className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl transition-all group space-y-4 hover:shadow-xl hover:shadow-emerald-500/5"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>مولد عقود العمل الحر المباشر</span>
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              أنشئ عقوداً مخصصة مع شروط الدفع والتسليم وحفظ الحقوق الفكرية وطباعتها بصيغة PDF مباشرة.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> جاهز للطباعة والشرعنة</span>
            <span>PDF Export</span>
          </div>
        </Link>
      </div>

      {/* المقالات التكتيكية والدلائل */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white border-r-4 border-emerald-500 pr-3">
          الدلائل التكتيكية في العمل الحر
        </h2>
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300">
              <Zap className="h-3.5 w-3.5" /> يحتوي على أداة حية: حاسبة تسعير العقود
            </span>
            <div className="flex items-center gap-3 text-xs">
              <Link href="/finance/freelancing/pricing-guide" className="text-slate-300 hover:text-white">اقرأ المقال</Link>
              <Link href="/finance/freelancing/pricing-guide#pricing-calculator" className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300">قفز إلى الأداة <ArrowLeft className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-emerald-400 font-semibold">استراتيجية #1</span>
              <h4 className="text-sm font-bold text-white">الانتقال من نظام الساعة إلى نظام القيمة</h4>
              <p className="text-[11px] text-slate-400">كيف ترفع دخل مشروعك بفرض تسعير مبني على العائد بدلاً من ساعات العمل.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-emerald-400 font-semibold">استراتيجية #2</span>
              <h4 className="text-sm font-bold text-white">إدارة العلاقات والاحتفاظ بالعملاء</h4>
              <p className="text-[11px] text-slate-400">بناء نظام متابعة واشتراكات شهرية متكررة (Retainer Agreements).</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-emerald-400 font-semibold">استراتيجية #3</span>
              <h4 className="text-sm font-bold text-white">الوقاية من تأخر الدفع والمماطلة</h4>
              <p className="text-[11px] text-slate-400">صياغة بند الدفعة المقدمة 50% وغرامات التأخير في العقود.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
