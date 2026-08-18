import React from "react";
import Link from "next/link";
import { Bot, Zap, Calculator } from "lucide-react";

export default function AIBusinessPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Bot className="w-4 h-4" />
          <span>قطاع المال والأعمال • القسم 2.1</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          الذكاء الاصطناعي في المال والأعمال (AI in Business)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          دليل أتمتة الأعمال باستخدام الذكاء الاصطناعي، حاسبة توفير الساعات والتكاليف التشغيلية، ودمج الوكلاء الأوتوماتيكيين.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">حاسبة العائد على الاستثمار في أتمتة الذكاء الاصطناعي</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            احسب كم ساعة دولار تضمن توفيرها شهرياً عند دمج أدوات الذكاء الاصطناعي في إدارة خدمة العملاء وإنشاء المحتوى.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">مكتبة سير العمل المؤتمت (AI Workflow Blueprints)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            قوالب جاهزة للربط عبر Make / n8n / Zapier لبناء وكلاء أوتوماتيكيين يقدمون التقارير ويردون على البريد.
          </p>
        </div>
      </div>
    </div>
  );
}
