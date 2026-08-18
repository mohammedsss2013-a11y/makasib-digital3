"use client";

import React from "react";
import Link from "next/link";
import { Settings, Shield, Bell, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Settings className="w-4 h-4" />
          <span>لوحة تحكم المستخدم • القسم 3</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          إعدادات الحساب والأمان والربط (Settings & Integrations)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          إدارة بياناتك الشخصية، الخصوصية، إشعارات البريد، والمحافظ والربط الخارجي.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-2xl">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-r-2 border-emerald-400 pr-2">البيانات الشخصية والملف</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">الاسم الظاهر</label>
              <input type="text" defaultValue="مستخدم مكاسب" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">البريد الإلكتروني</label>
              <input type="email" defaultValue="user@makasib.digital" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all">
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}
