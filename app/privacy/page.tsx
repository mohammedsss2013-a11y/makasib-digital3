import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Globe } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>الصفحات القانونية • القسم 4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          سياسة الخصوصية (Privacy Policy - AdSense & GDPR Ready)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          نلتزم بحماية خصوصية زوارنا ومستخدمينا وفق أعلى المعايير الدولية واللوائح الأوروبية (GDPR) ومتطلبات Google AdSense.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white border-r-4 border-emerald-400 pr-3">1. جمع البيانات ومعالجتها (Data Collection)</h2>
          <p>نحن لا نجمع أي بيانات شخصية إلا ما تزوّدنا به طوعاً عند التسجيل أو استخدام الحاسبات. يتم إجراء الحسابات والعمليات التفاعلية محلياً في متصفحك دون نقل بياناتك المالية الخاصة لخوادمنا.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white border-r-4 border-emerald-400 pr-3">2. ملفات تعريف الارتباط والإعلانات (Cookies & Google AdSense)</h2>
          <p>تستخدم منصتنا ملفات تعريف الارتباط لتخصيص التجربة وتحسين الأداء. قد تستخدم الأطراف الثالثة مثل Google AdSense ملفات تعريف الارتباط (مثل DART cookie) لعرض الإعلانات بناءً على زياراتك السابقة لمنصتنا أو للمواقع الأخرى على الإنترنت.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white border-r-4 border-emerald-400 pr-3">3. حقوق المستخدم بموجب GDPR والأنظمة المحليه</h2>
          <p>لك الحق الكامل في الوصول إلى بياناتك الشخصية، أو طلب تعديلها أو حذفها بالكامل من لوحة تحكمك، أو إيقاف تتبع ملفات الارتباط عبر إعدادات متصفحك.</p>
        </section>
      </div>
    </div>
  );
}
