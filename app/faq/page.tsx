import React from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "ما هي منصة مكاسب رقمية؟",
      a: "منصة معرفية تفاعلية تقدم أدوات وحاسبات حية ودلائل إجرائية تطبيقية لتطوير الأعمال والعمل الحر والتقنيات المعاصرة."
    },
    {
      q: "هل استخدام الأدوات والحاسبات مجاني؟",
      a: "نعم، كافة الأدوات الأساسية وحاسبات التسعير وتوليد العقود مجانية ومتاحة مباشرة للمستخدمين."
    },
    {
      q: "هل يتم حفظ بياناتي أو المدخلات المالية في خوادمكم؟",
      a: "معظم الحاسبات تعمل محلياً في متصفحك مباشرة لضمان أقصى درجات الخصوصية، وتخزن مدخلاتك فقط عند قيامك بحفظها في لوحة تحكمك الشخصية."
    },
    {
      q: "كيف يمكنني تصدير العقود المولدّة؟",
      a: "تتيح المنصة زر تصدير مباشر بصيغة PDF وطباعتها بنسخة منسقة ومجهزة قانونياً."
    }
  ];

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <HelpCircle className="w-4 h-4" />
          <span>مركز المساعدة • القسم 4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          مركز المساعدة والأسئلة الشائعة (FAQ Hub)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          إجابات فورية وشاملة على كافة تساؤلاتك حول الاستخدام، الخصوصية، والأدوات التفاعلية.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>{faq.q}</span>
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
