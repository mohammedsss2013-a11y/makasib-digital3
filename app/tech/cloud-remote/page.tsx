import React from "react";
import Link from "next/link";
import { Cloud, Server, Globe } from "lucide-react";

export default function CloudRemotePage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Cloud className="w-4 h-4" />
          <span>قطاع التكنولوجيا والابتكار • القسم 2.2</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          الحوسبة السحابية وأدوات العمل عن بُعد (Cloud & Remote)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          دليل اختيار وتكلفة الخوادم السحابية (AWS, Supabase, Vercel, Hetzner)، وبناء البنية التحتية لتطبيقات الويب الموزعة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Server className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">مقارن تكاليف الخوادم وقواعد البيانات (Serverless vs VPS)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            مقارنة العائد والتكلفة بين الخوادم الافتراضية الخاصة والخدمات الخالية من الخوادم مع حساب الباندويث وطاقة التخزين.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">دليل العمل والتنسيق الموزع عبر القارات</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            أدوات التواصل غير المتزامن (Async Work) ومزامنة المناطق الزمنية لإدارة الفرق التقنية البعيدة.
          </p>
        </div>
      </div>
    </div>
  );
}
