"use client";

import React, { useEffect, useState } from "react";
import { Settings, Shield, Bell, Key } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");
      const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle();
      setFullName(profile?.full_name ?? "");
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setErrorMessage("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setErrorMessage("انتهت الجلسة. سجّل الدخول مرة أخرى.");
      setIsSaving(false);
      return;
    }
    const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name: fullName.trim() || null }, { onConflict: "id" });
    setIsSaving(false);
    if (error) setErrorMessage("تعذر حفظ بيانات الملف الشخصي.");
    else setMessage("تم حفظ بياناتك بنجاح.");
  }

  return (
    <div className="space-y-10 py-6 dir-rtl">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold">
          <Settings className="w-4 h-4" />
          <span>لوحة تحكم المستخدم</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          إعدادات الحساب والأمان والربط (Settings & Integrations)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          إدارة بياناتك الشخصية، الخصوصية، إشعارات البريد، والمحافظ والربط الخارجي.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-2xl">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-r-2 border-emerald-400 pr-2">البيانات الشخصية والملف</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">الاسم الظاهر</label>
              <input type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} disabled={isLoading} placeholder="اكتب اسمك الظاهر" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">البريد الإلكتروني</label>
              <input type="email" value={email} readOnly className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 outline-none" />
            </div>
          </div>
        </div>

        {(message || errorMessage) && <p role={errorMessage ? "alert" : "status"} className={`text-xs ${errorMessage ? "text-red-300" : "text-emerald-300"}`}>{errorMessage || message}</p>}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button disabled={isSaving || isLoading} className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all disabled:cursor-not-allowed disabled:opacity-50">
            {isSaving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
}
