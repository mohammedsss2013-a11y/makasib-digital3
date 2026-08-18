import React from "react";
import Link from "next/link";
import { FileText, Video, Sparkles } from "lucide-react";

export default function ContentCreationPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <FileText className="w-4 h-4" />
          <span>قطاع الإعلام الجديد • القسم 2.3</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          صناعة المحتوى المرئي والمكتوب (Content Creation)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          دليل صياغة النصوص الممركبة (Hooking Scripts)، هندسة العناوين الجذابة، واستراتيجيات التوزيع عبر المنصات الرقمية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">دليل صياغة مقاطع الفيديو القصيرة (Short-Form Mastery)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            هيكلية ثواني الخطاف الـ 3 الأولى وقواعد المونتاج التفاعلي لرفع معدل الاستبقاء (Retention Rate).
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">مولد أفكار وعناوين المحتوى المقنع</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            استكشف صيغ الأطروحات والعناوين الأكثر انتشاراً لتحفيز الفضول والنقر بدون إثارة رخيصة (Clickbait).
          </p>
        </div>
      </div>
    </div>
  );
}
