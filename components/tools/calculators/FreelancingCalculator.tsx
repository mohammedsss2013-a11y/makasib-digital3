"use client";

import React, { useState, useId } from "react";

export function FreelancingCalculator() {
  const [targetIncome, setTargetIncome] = useState(3500);
  const [operatingCosts, setOperatingCosts] = useState(250);
  const [billableHours, setBillableHours] = useState(64);

  const targetIncomeId = useId();
  const operatingCostsId = useId();
  const billableHoursId = useId();

  const hourlyRate = billableHours > 0 ? (targetIncome + operatingCosts) / billableHours : 0;

  return (
    <div className="w-full md:w-96 bg-slate-950/95 border border-slate-800 rounded-2xl p-5 shadow-2xl relative backdrop-blur-md dir-rtl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">freelancing_calc.exe</span>
      </div>

      <div className="space-y-3 font-mono text-right">
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-[11px] text-slate-400">
          <label htmlFor={targetIncomeId} className="block font-sans text-slate-300 font-medium">
            دخلُك الشهري المستهدف؟
          </label>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-slate-500">$</span>
            <input
              id={targetIncomeId}
              type="number"
              min="0"
              value={targetIncome}
              onChange={(event) => setTargetIncome(Math.max(0, Number(event.target.value)))}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-left font-bold text-emerald-400 outline-none transition-colors focus:border-emerald-400"
              aria-label="الدخل الشهري المستهدف بالدولار"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-[11px] text-slate-400">
          <label htmlFor={operatingCostsId} className="block font-sans text-slate-300 font-medium">
            مصاريفك التشغيلية؟
          </label>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-slate-500">$</span>
            <input
              id={operatingCostsId}
              type="number"
              min="0"
              value={operatingCosts}
              onChange={(event) => setOperatingCosts(Math.max(0, Number(event.target.value)))}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-left font-bold text-white outline-none transition-colors focus:border-emerald-400"
              aria-label="المصاريف التشغيلية بالدولار"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-[11px] text-slate-400">
          <label htmlFor={billableHoursId} className="block font-sans text-slate-300 font-medium">
            ساعات العمل القابلة للفوترة شهريًا؟
          </label>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-slate-500">h</span>
            <input
              id={billableHoursId}
              type="number"
              min="1"
              value={billableHours}
              onChange={(event) => setBillableHours(Math.max(1, Number(event.target.value)))}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-left font-bold text-white outline-none transition-colors focus:border-emerald-400"
              aria-label="ساعات العمل القابلة للفوترة شهريًا"
            />
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center space-y-1">
          <span className="text-[10px] text-slate-400 font-sans block">
            معدل الساعة المستهدف المقترح:
          </span>
          <span className="text-xl font-black text-emerald-400">
            {hourlyRate.toFixed(2)} $ / ساعة
          </span>
        </div>
      </div>
    </div>
  );
}