import React from "react";
import Link from "next/link";
import { GraduationCap, BookOpen, Compass } from "lucide-react";

export default function LearningPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>قطاع رقميون • القسم 2.4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          التعليم والتعلم الرقمي المستمر (Continuous Learning)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          دليل التعلم الذاتي السريع، التكيف مع تحولات السوق، وأفضل المنصات والمصادر المفتوحة لإتقان المهارات التكنولوجية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">دليل إتقان المهارات الجديدة في 20 ساعة (Meta-Learning)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            تفكيك المهارات المعقدة إلى عناصرها الأساسية والتركيز على الممارسة المركزة لمنع التسويف.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">خرائط الطريق المهنية (Skill Roadmaps)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            مسارات موجهة للمطورين، المصممين، والمجموعات التسويقية لمواكبة متطلبات الذكاء الاصطناعي.
          </p>
        </div>
      </div>
    </div>
  );
}
