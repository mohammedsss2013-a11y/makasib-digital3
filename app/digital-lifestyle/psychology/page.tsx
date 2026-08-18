import React from "react";
import Link from "next/link";
import { Sparkles, Brain, Eye } from "lucide-react";

export default function PsychologyPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Brain className="w-4 h-4" />
          <span>قطاع رقميون • القسم 2.4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          علم النفس الرقمي وسلوك الجمهور (Digital Psychology)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          دليل دراسة الانتباه والانحيازات المعرفية، سيكولوجية إتمام الشراء والتفاعل مع الواجهات الرقمية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">دليل هندسة الانتباه وخفوت التشتت (Attention Architecture)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            كيف تؤثر المحفزات البصرية والدوبامين على سلوك المستخدم فور دخوله لصفحات الهبوط والتطبيقات.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">الانحيازات المعرفية العشرة في تصميم العروض</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            تطبيق مبادئ الإرساء (Anchoring)، الدليل الاجتماعي (Social Proof)، والندرة الأخلاقية لرفع المبيعات.
          </p>
        </div>
      </div>
    </div>
  );
}
