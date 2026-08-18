import React from "react";
import Link from "next/link";
import { Bookmark, Star, ArrowLeft } from "lucide-react";

export default function BookmarksPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Bookmark className="w-4 h-4" />
          <span>لوحة تحكم المستخدم • القسم 3</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          قائمة المفضلة السريعة (Pinned Bookmarks)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          الصفحات والمقالات والأدوات المفضلة لديك للوصول الفوري إليها بزر واحد.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/finance/freelancing" className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl hover:border-emerald-500/50 transition-all flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">حاسبة ومولد عقود العمل الحر</span>
          </div>
          <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
        </Link>
        <Link href="/tech/ai-apps" className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl hover:border-emerald-500/50 transition-all flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">حاسبة الـ API & Tokens للذكاء الاصطناعي</span>
          </div>
          <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
