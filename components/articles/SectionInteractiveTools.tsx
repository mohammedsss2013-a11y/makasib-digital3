"use client";

import { useState } from "react";
import { BarChart3, Calculator, HeartPulse, LockKeyhole, ShieldCheck } from "lucide-react";
import { ContractGenerator } from "@/components/tools/generators/ContractGenerator";
import { FreelancePricingCalculator } from "@/components/tools/calculators/FreelancePricingCalculator";

type Section = "finance" | "tech" | "media" | "lifestyle";

function ToolPanel({ title, description, icon: Icon, children }: { title: string; description: string; icon: typeof Calculator; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-black/10">
      <div className="mb-5 flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function TechTools() {
  const [tokens, setTokens] = useState(500000);
  const [price, setPrice] = useState(2.5);
  const [password, setPassword] = useState("");
  const passwordScore = [password.length >= 8, password.length >= 12, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length * 20;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <ToolPanel title="حاسبة تكلفة نماذج الذكاء الاصطناعي" description="قدّر تكلفة استخدام الـ API بناءً على عدد Tokens وسعر المليون." icon={Calculator}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-slate-300">عدد الـ Tokens<input type="number" min="0" value={tokens} onChange={(event) => setTokens(Math.max(0, Number(event.target.value)))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /></label>
          <label className="text-xs text-slate-300">سعر المليون ($)<input type="number" min="0" step="0.1" value={price} onChange={(event) => setPrice(Math.max(0, Number(event.target.value)))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /></label>
        </div>
        <output className="mt-4 block rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-2xl font-black text-emerald-400">{((tokens / 1000000) * price).toFixed(3)} $</output>
      </ToolPanel>
      <ToolPanel title="فاحص قوة كلمة المرور" description="الفحص محلي داخل المتصفح ولا يتم إرسال كلمة المرور." icon={LockKeyhole}>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="اكتب كلمة مرور تجريبية" className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-950"><div className={`h-full transition-all ${passwordScore < 40 ? "bg-red-500" : passwordScore < 80 ? "bg-amber-400" : "bg-emerald-400"}`} style={{ width: `${passwordScore}%` }} /></div>
        <p className="mt-3 text-xs text-slate-400">درجة الأمان: <strong className="text-white">{passwordScore}%</strong></p>
      </ToolPanel>
    </div>
  );
}

function MediaTool() {
  const [followers, setFollowers] = useState(10000);
  const [likes, setLikes] = useState(450);
  const [comments, setComments] = useState(60);
  const [shares, setShares] = useState(25);
  const engagement = followers > 0 ? ((likes + comments + shares) / followers) * 100 : 0;

  return <ToolPanel title="حاسبة معدل التفاعل" description="قِس فاعلية المحتوى قبل تقييم الحملة أو توقيع العقد الإعلاني." icon={BarChart3}>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[["المتابعون", followers, setFollowers], ["الإعجابات", likes, setLikes], ["التعليقات", comments, setComments], ["المشاركات", shares, setShares]].map(([label, value, setter]) => (
        <label key={label as string} className="text-xs text-slate-300">{label as string}<input type="number" min="0" value={value as number} onChange={(event) => (setter as (value: number) => void)(Math.max(0, Number(event.target.value)))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /></label>
      ))}
    </div>
    <output className="mt-4 block rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-2xl font-black text-emerald-400">{engagement.toFixed(2)}%</output>
  </ToolPanel>;
}

function LifestyleTool() {
  const [screenHours, setScreenHours] = useState(7);
  const [sleepHours, setSleepHours] = useState(7);
  const screenPercentage = Math.round((screenHours / 24) * 100);
  const status = screenHours > 9 || sleepHours < 6 ? "إجهاد رقمي مرتفع" : screenHours > 6 ? "توازن متوسط" : "نمط حياة رقمي متوازن";

  return <ToolPanel title="مؤشر الصحة الرقمية وزمن الشاشة" description="اعرف نسبة يومك أمام الشاشات واحصل على مؤشر أولي للتوازن الرقمي." icon={HeartPulse}>
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="text-xs text-slate-300">ساعات الشاشة اليومية<input type="number" min="0" max="24" value={screenHours} onChange={(event) => setScreenHours(Math.min(24, Math.max(0, Number(event.target.value))))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /></label>
      <label className="text-xs text-slate-300">ساعات النوم اليومية<input type="number" min="0" max="24" value={sleepHours} onChange={(event) => setSleepHours(Math.min(24, Math.max(0, Number(event.target.value))))} className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /></label>
    </div>
    <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4"><div className="text-2xl font-black text-emerald-400">{screenPercentage}% من يومك</div><p className="mt-2 text-xs font-bold text-slate-300">{status}</p></div>
  </ToolPanel>;
}

export function SectionInteractiveTools({ section }: { section: Section }) {
  const content = {
    finance: <div className="grid gap-5 xl:grid-cols-2"><FreelancePricingCalculator /><ContractGenerator /></div>,
    tech: <TechTools />,
    media: <MediaTool />,
    lifestyle: <LifestyleTool />,
  }[section];
  const title = { finance: "أدوات المال والأعمال", tech: "أدوات التكنولوجيا والابتكار", media: "أدوات الإعلام الجديد", lifestyle: "أدوات الحياة الرقمية" }[section];

  return <section className="space-y-5" aria-labelledby={`${section}-interactive-tools`}><div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-400" /><div><h2 id={`${section}-interactive-tools`} className="text-xl font-bold text-white">{title}</h2><p className="mt-1 text-xs text-slate-500">شاشات تفاعلية مرتبطة بموضوعات هذا القسم.</p></div></div>{content}</section>;
}
