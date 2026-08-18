import React from "react";
import Link from "next/link";
import { Calendar, CheckSquare, Clock } from "lucide-react";

export default function LifeManagementPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Calendar className="w-4 h-4" />
          <span>قطاع رقميون • القسم 2.4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          إدارة الحياة الرقمية والتنظيم (Life Management)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          أنظمة تنظيم الوقت الشاملة (Second Brain & Notion & PARA Method)، أتمتة المهام الشخصية، وبناء العادات الرقمية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">دليل بناء الدماغ الثاني (Building a Second Brain)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            كيف تنظم معرفتك ومقالاتك وملاحظاتك باستخدام منهجية CODE لمنع التشتت وتسهيل الاسترجاع.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">حاسبة توازن الوقت والإنتاجية العميق (Deep Work Ratio)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            احسب نسبة تركيزك الصافي يومياً مقارنة بساعات المشتتات والرسائل لتوجيه طاقتك للأعمال العالية القيمة.
          </p>
        </div>
      </div>
    </div>
  );
}
