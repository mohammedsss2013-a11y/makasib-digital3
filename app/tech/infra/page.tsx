import React from "react";
import Link from "next/link";
import { Layers, Cpu, Code2 } from "lucide-react";

export default function InfraPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Layers className="w-4 h-4" />
          <span>قطاع التكنولوجيا والابتكار • القسم 2.2</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          تطوير البنية الرقمية وتقنيات المستقبل (Next-Gen Infra)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          دليل الهيكلة البرمجية المعاصرة (Next.js, Microservices, Edge Computing)، معايير السرعة واستجابة الخوادم.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">دليل التحسين ومعايير السرعة (Core Web Vitals)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            استراتيجيات تقليل زمن الاستجابة (TTFB) وضغط الأصول وتطبيق معايير الأداء الحديثة لتطبيقات الويب.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">معمارية المعالجة على الحافة (Edge Runtime vs Node)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            متى تعتمد على الدعامة الطرفية القريبة من المستخدم وكيف تقلل تكاليف الاستعلام والـ Latency.
          </p>
        </div>
      </div>
    </div>
  );
}
