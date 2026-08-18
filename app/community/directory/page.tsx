import React from "react";
import Link from "next/link";
import { UserCheck, ShieldCheck, Award, Star } from "lucide-react";

export default function MemberDirectoryPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <UserCheck className="w-4 h-4" />
          <span>مجتمع مكاسب • القسم 2.5</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          دليل الأعضاء والموثوقية والشارات (Member Directory & Badges)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          استكشف دليل الخبرات الموثوقة من أعضاء مكاسب الرقمي وتتبع الشارات المكتسبة المساهمة في تنمية المجتمع.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-extrabold text-slate-950 text-2xl shadow-lg">
            أ
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
              <span>أحمد المحمود</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">مستشار أعمال وتجارة إلكترونية</p>
          </div>
          <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono">
            <Award className="w-3 h-3" /> شارة خبير الماليين
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center font-extrabold text-slate-950 text-2xl shadow-lg">
            س
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
              <span>سارة التميمي</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">مهندسة بنية تحتية وCloud</p>
          </div>
          <div className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 text-[10px] px-2.5 py-1 rounded-full border border-blue-500/20 font-mono">
            <Award className="w-3 h-3" /> شارة خبير التكنولوجيا
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center font-extrabold text-slate-950 text-2xl shadow-lg">
            م
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
              <span>محمد العتيبي</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">صانع بودكاست ومحتوى مرئي</p>
          </div>
          <div className="inline-flex items-center gap-1 bg-purple-500/10 text-purple-400 text-[10px] px-2.5 py-1 rounded-full border border-purple-500/20 font-mono">
            <Award className="w-3 h-3" /> شارة صناع الإعلام
          </div>
        </div>
      </div>
    </div>
  );
}
