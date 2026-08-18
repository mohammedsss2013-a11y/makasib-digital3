import React from "react";
import Link from "next/link";
import { MessageSquare, Users, HelpCircle, ArrowLeft } from "lucide-react";

export default function ConsultationsPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <MessageSquare className="w-4 h-4" />
          <span>مجتمع مكاسب • القسم 2.5</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          مساحة الاستشارات والتجريب (Consultations Feed)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          اطرح تساؤلاتك الإجرائية حول التسعير، الأمان، البرمجة، والنمو التكنولوجي لتحصل على إجابات موثوقة من أقرانك والمطورين.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <span>أحدث الاستشارات المطروحة</span>
          </h2>
          <button className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all">
            + طرح استشارة جديدة
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold">استشارة تسعير • منذ ساعتين</span>
              <span className="bg-slate-900 text-slate-400 px-2 py-0.5 rounded text-[10px]">6 إجابات</span>
            </div>
            <h4 className="text-sm font-bold text-white">كيف اتعامل مع عميل يطلب تخفيض السعر بنسبة 40% بعد الموافقة الأولى؟</h4>
            <p className="text-xs text-slate-400 line-clamp-2">قدّمت عرض سعر لمشروع برمجة واجهة بقيمة 1500$ وتمت الموافقة المبدئية، لكن العميل طلب تعديل الميزانية لتصبح 900$. كيف اصوغ الرد الاحترافي؟</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold">استشارة تقنية • منذ 5 ساعات</span>
              <span className="bg-slate-900 text-slate-400 px-2 py-0.5 rounded text-[10px]">12 إجابة</span>
            </div>
            <h4 className="text-sm font-bold text-white">ما هي أفضل قاعدة بيانات مكملة لـ Supabase لعلاج الاستعلامات المعقدة؟</h4>
            <p className="text-xs text-slate-400 line-clamp-2">أقوم ببناء منصة تحليل بيانات وتحتاج لاستعلامات سريعة جداً. هل تنصحون بدمج Redis أو ClickHouse؟</p>
          </div>
        </div>
      </div>
    </div>
  );
}
