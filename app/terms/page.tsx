import React from "react";
import Link from "next/link";
import { FileText, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <FileText className="w-4 h-4" />
          <span>الصفحات القانونية • القسم 4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          شروط الاستخدام (Terms of Service)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          تحدد هذه الشروط والأحكام القواعد والإرشادات المنظمة لاستخدام منصة وأدوات مكاسب رقمية.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white border-r-4 border-emerald-400 pr-3">1. القبول بالشروط</h2>
          <p>بدخولك واستخدامك لمنصة &ldquo;مكاسب رقمية&rdquo;، فإنك توافق على الالتزام بكافة البنود والشروط الواردة في هذه الاتفاقية. إذا كنت لا توافق على هذه الشروط، يرجى الامتناع عن استخدام المنصة.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white border-r-4 border-emerald-400 pr-3">2. الملكية الفكرية والأدوات</h2>
          <p>جميع الحاسبات، الخوارزميات، الدلائل الإجرائية، والتصاميم المتاحة على المنصة هي ملك حصري لمنصة &ldquo;مكاسب رقمية&rdquo; وحاصدة لحقوق الملكية الفكرية. يُسمح باستخدام المخرجات للأغراض الشخصية والتجارية الخاصة بك.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white border-r-4 border-emerald-400 pr-3">3. الاستخدام المقبول</h2>
          <p>يلتزم المستخدم بعدم استغلال الأدوات أو المحتوى لأغراض غير قانونية، أو محاولة الهندسة العكسية للمنصة أو تعطيل خوادمها.</p>
        </section>
      </div>
    </div>
  );
}
