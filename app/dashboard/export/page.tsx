"use client";

import React from "react";
import Link from "next/link";
import { FileOutput, Download, FileText } from "lucide-react";

export default function ExportCenterPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <FileOutput className="w-4 h-4" />
          <span>لوحة تحكم المستخدم • القسم 3</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          إدارة العقود والتقارير المطبوعة (Export Center - PDF/Excel)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          جميع العقود التي قمت بتوليدها وتقارير الأداء القابلة للتنزيل بصيغ PDF أو Excel مباشرة.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>سجل الملفات والعقود الجاهزة</span>
        </h3>

        <div className="space-y-3">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">عقد تطوير تطبيق ويب - العميل شركة الأفق</h4>
              <span className="text-[10px] text-slate-400">تاريخ الإنشاء: 14 أغسطس 2026 • PDF • 142 KB</span>
            </div>
            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
              <Download className="w-3.5 h-3.5" />
              <span>تحميل PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
