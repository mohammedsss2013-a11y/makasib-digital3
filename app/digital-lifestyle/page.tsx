"use client";

import React, { useState } from "react";
import { CategoryArticlesClient } from "@/components/articles/CategoryArticlesClient";
import { Brain, HeartPulse, Clock, Sparkles } from "lucide-react";

export default function DigitalLifestylePage() {
  const [screenHours, setScreenHours] = useState<number>(7);
  const [sleepHours, setSleepHours] = useState<number>(7);

  const screenPercentage = Math.round((screenHours / 24) * 100);

  const getWellnessScore = (screen: number, sleep: number) => {
    if (screen > 9 || sleep < 6) return { label: "إجهاد رقمي مرتفع - بحاجة لفترات انقطاع", color: "text-red-400" };
    if (screen > 6) return { label: "توازن متوسط - يفضل تقليل استخدام الشاشات ليلاً", color: "text-yellow-400" };
    return { label: "نمط حياة رقمي صحي ومتوازن جداً", color: "text-emerald-400" };
  };

  const status = getWellnessScore(screenHours, sleepHours);

  return <CategoryArticlesClient category="رقميون - أسلوب الحياة" categoryLabel="رقميون - أسلوب الحياة" description="رؤى وأدلة لبناء علاقة أكثر توازنًا وإنتاجية ووعيًا مع العالم الرقمي." subcategorySection="lifestyle" />;

  return (
    <div className="space-y-12 py-4 dir-rtl">
      {/* Sector Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs px-3 py-1 rounded-full font-semibold">
          <Brain className="w-4 h-4" />
          <span>قطاع رقميون | أسلوب الحياة والتوازن الرقمي</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          إدارة الحياة الرقمية، الصحة الرقمية، وعلم النفس التفاعلي
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          أدوات ودلائل إجرائية للتحكم في الإجهاد الرقمي، تقييم زمن الشاشة (Screen Time)، والحفاظ على التركيز.
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">مؤشر الصحة الرقمية وزمن الشاشة</h3>
            <p className="text-xs text-slate-400">احسب النسبة المئوية من يومك التي تقضيها أمام الأجهزة الإلكترونية.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ساعات استخدام الشاشة اليومية</label>
              <input
                type="number"
                max={24}
                min={0}
                value={screenHours}
                onChange={(e) => setScreenHours(Math.min(24, Math.max(0, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ساعات النوم اليومية</label>
              <input
                type="number"
                max={24}
                min={0}
                value={sleepHours}
                onChange={(e) => setSleepHours(Math.min(24, Math.max(0, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div className="bg-slate-950 border border-pink-500/30 rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs text-slate-400">استهلاك يومك أمام الشاشات:</span>
              <div className="text-4xl font-black text-pink-400 mt-2 font-mono">{screenPercentage}% من يومك</div>
              <div className={`text-xs font-bold mt-2 ${status.color}`}>{status.label}</div>
            </div>
            <p className="text-[11px] text-slate-500">
              ينصح بأخذ استراحة لمدة 5 دقائق كل 45 دقيقة عمل متواصل لمنع التعب البصري والذهني.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
