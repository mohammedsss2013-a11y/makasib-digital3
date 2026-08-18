import React from "react";
import Link from "next/link";
import { MessageSquare, ThumbsUp } from "lucide-react";

export default function MyPostsPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <MessageSquare className="w-4 h-4" />
          <span>لوحة تحكم المستخدم • القسم 3</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          مشاركاتي وتفاعلاتي في مجتمع مكاسب (My Posts & Responses)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          سجل استشاراتك وردودك ومشاركاتك المرفقة في مجتمع مكاسب الرقمي.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold">رد في مساحة الاستشارات</span>
            <span className="text-slate-500">منذ 3 أيام</span>
          </div>
          <h4 className="text-sm font-bold text-white">رد على: &ldquo;كيف احدد نسبة الدفعة الأولى قبل بدء التنفيذ؟&rdquo;</h4>
          <p className="text-xs text-slate-400">انصحك بالالتزام بـ 50% مقدم لا يقبل الاسترداد لضمان حجز وقتك وتغطية تكاليف السيرفرات البدائية.</p>
        </div>
      </div>
    </div>
  );
}
