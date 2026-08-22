"use client";

import { useState } from "react";
import { BarChart3, Calculator, HeartPulse, ShieldCheck } from "lucide-react";
import { ContractGenerator } from "@/components/tools/ContractGenerator";
import { FreelancePricingCalculator } from "@/components/tools/FreelancePricingCalculator";

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Calculator; children: React.ReactNode }) {
  return <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"><div className="flex items-center gap-3 border-b border-slate-800 pb-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"><Icon className="h-5 w-5" /></div><h2 className="text-lg font-bold text-white">{title}</h2></div>{children}</section>;
}

export function CalculatorWorkspace() {
  const [tokenCount, setTokenCount] = useState(500000);
  const [tokenPrice, setTokenPrice] = useState(2.5);
  const [password, setPassword] = useState("");
  const [followers, setFollowers] = useState(10000);
  const [interactions, setInteractions] = useState(535);
  const [screenHours, setScreenHours] = useState(7);
  const [sleepHours, setSleepHours] = useState(7);
  const passwordScore = [password.length >= 8, password.length >= 12, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length * 20;
  const engagement = followers > 0 ? ((interactions / followers) * 100).toFixed(2) : "0.00";
  const screenPercentage = Math.round((screenHours / 24) * 100);

  return <div className="space-y-8" dir="rtl">
    <section className="space-y-4"><h2 className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-white">مال وأعمال</h2><div className="grid grid-cols-1 gap-6 xl:grid-cols-2"><FreelancePricingCalculator /><ContractGenerator /></div></section>
    <section className="space-y-4"><h2 className="border-r-4 border-blue-500 pr-3 text-xl font-bold text-white">تكنولوجيا وإعلام وأسلوب حياة</h2><div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <Panel title="حاسبة تكلفة نماذج الذكاء الاصطناعي" icon={Calculator}><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs text-slate-300">عدد الـ Tokens<input type="number" value={tokenCount} onChange={(e) => setTokenCount(Math.max(0, Number(e.target.value)))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white" /></label><label className="text-xs text-slate-300">سعر المليون ($)<input type="number" step="0.1" value={tokenPrice} onChange={(e) => setTokenPrice(Math.max(0, Number(e.target.value)))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white" /></label></div><output className="block rounded-xl border border-slate-800 bg-slate-950 p-5 text-3xl font-black text-blue-400">{((tokenCount / 1000000) * tokenPrice).toFixed(3)} $</output></Panel>
      <Panel title="فاحص قوة كلمة المرور" icon={ShieldCheck}><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="اكتب كلمة مرور تجريبية" className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white" /><div className="h-2 overflow-hidden rounded-full bg-slate-950"><div className={`h-full transition-all ${passwordScore < 40 ? "bg-red-500" : passwordScore < 80 ? "bg-yellow-500" : "bg-emerald-500"}`} style={{ width: `${passwordScore}%` }} /></div><p className="text-xs text-slate-400">درجة الأمان: <strong className="text-white">{passwordScore}%</strong></p></Panel>
      <Panel title="حاسبة معدل التفاعل" icon={BarChart3}><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs text-slate-300">عدد المتابعين<input type="number" value={followers} onChange={(e) => setFollowers(Math.max(1, Number(e.target.value)))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white" /></label><label className="text-xs text-slate-300">إجمالي التفاعلات<input type="number" value={interactions} onChange={(e) => setInteractions(Math.max(0, Number(e.target.value)))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white" /></label></div><output className="block text-3xl font-black text-rose-400">{engagement}%</output></Panel>
      <Panel title="مؤشر الصحة الرقمية" icon={HeartPulse}><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs text-slate-300">ساعات الشاشة<input type="number" min="0" max="24" value={screenHours} onChange={(e) => setScreenHours(Math.min(24, Math.max(0, Number(e.target.value))))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white" /></label><label className="text-xs text-slate-300">ساعات النوم<input type="number" min="0" max="24" value={sleepHours} onChange={(e) => setSleepHours(Math.min(24, Math.max(0, Number(e.target.value))))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white" /></label></div><output className="block text-3xl font-black text-pink-400">{screenPercentage}% من يومك</output><p className="text-xs text-slate-400">{screenHours > 9 || sleepHours < 6 ? "إجهاد رقمي مرتفع" : screenHours > 6 ? "توازن متوسط" : "نمط حياة رقمي متوازن"}</p></Panel>
    </div></section>
    <p className="text-xs text-slate-500">تُحفظ النتائج من داخل كل أداة عند توفر خيار الحفظ، وتبقى الحسابات المحلية داخل المتصفح.</p>
  </div>;
}
