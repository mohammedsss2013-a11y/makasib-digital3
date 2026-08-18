"use client";

import React from "react";
import Link from "next/link";
import { Mail, MessageSquare, Send, Globe, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Mail className="w-4 h-4" />
          <span>الدعم والاتصال • القسم 4</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          اتصل بنا ومركز الدعم الفني (Contact Us & Support)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          نرحب باستفساراتك، مقترحات الأدوات الجديدة، وطلبات الشراكة المؤسسية عبر القنوات التالية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white border-r-2 border-emerald-400 pr-2">إرسال رسالة مباشرة</h3>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs text-slate-400 block mb-1">الاسم الكريم</label>
              <input type="text" placeholder="أدخل اسمك" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">البريد الإلكتروني</label>
              <input type="email" placeholder="name@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">نص الرسالة أو الاستفسار</label>
              <textarea rows={4} placeholder="اكتب استفسارك هنا..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"></textarea>
            </div>
            <button type="button" className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold text-xs p-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
              إرسال الرسالة
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white border-r-2 border-emerald-400 pr-2">قنوات التواصل المباشر</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@makasib.digital</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>قناة تلغرام: @MakasibDigital</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>مجتمع مكاسب التفاعلي</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
