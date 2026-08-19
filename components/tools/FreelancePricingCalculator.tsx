"use client";

import React, { useEffect, useState, useId } from "react";
import { DollarSign, Clock, Calculator, Bookmark, Check, Copy, Expand, Minimize2, BookOpen, Sparkles } from "lucide-react";
import { recordToolUsage } from "@/config/toolsRegistry";
import { ArticleDrawer } from "@/components/drawers/ArticleDrawer";

export const FreelancePricingCalculator = () => {
  const [targetIncome, setTargetIncome] = useState<number>(2500);
  const [fixedExpenses, setFixedExpenses] = useState<number>(500);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(30);
  const [adminRatio, setAdminRatio] = useState<number>(25); // % non-billable
  const [taxReserve, setTaxReserve] = useState<number>(15); // % reserve
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    recordToolUsage("freelance-pricing");
  }, []);

  // Generate unique IDs for form elements
  const incomeId = useId();
  const expensesId = useId();
  const hoursId = useId();
  const adminId = useId();
  const taxId = useId();

  // Calculation Math
  const totalMonthlyTarget = (targetIncome + fixedExpenses) * (1 + taxReserve / 100);
  const totalHoursMonth = hoursPerWeek * 4.2;
  const billableHoursMonth = totalHoursMonth * (1 - adminRatio / 100);
  const hourlyRateRecommended = billableHoursMonth > 0 ? Math.ceil(totalMonthlyTarget / billableHoursMonth) : 0;
  const hourlyRateMinimum = billableHoursMonth > 0 ? Math.ceil((targetIncome + fixedExpenses) / billableHoursMonth) : 0;

  const handleSave = () => {
    try {
      const existing = JSON.parse(localStorage.getItem("saved_tools") || "[]");
      const newItem = {
        toolSlug: "pricing-guide",
        toolTitle: "حاسبة تسعير خدمات العمل الحر",
        inputs: { targetIncome, fixedExpenses, hoursPerWeek, adminRatio, taxReserve },
        outputs: {
          "سعر الساعة الموصى به": `${hourlyRateRecommended} $`,
          "سعر الساعة الأدنى": `${hourlyRateMinimum} $`,
          "ساعات العمل المستهدفة": `${Math.round(billableHoursMonth)} ساعة/شهر`
        },
        savedAt: new Date().toISOString()
      };
      localStorage.setItem("saved_tools", JSON.stringify([newItem, ...existing]));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = () => {
    const summary = `📊 **تقرير تسعير الخدمات الشخصي - مكاسب رقمية**\n- الدخل المستهدف: ${targetIncome} $/شهر\n- المصاريف الثابتة: ${fixedExpenses} $/شهر\n- سعر الساعة الموصى به: ${hourlyRateRecommended} $/ساعة\n- الحد الأدنى لسعر الساعة: ${hourlyRateMinimum} $/ساعة`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${isFocusMode ? "fixed inset-0 z-40 overflow-y-auto rounded-none" : ""} bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 dir-rtl text-slate-100 shadow-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">حاسبة تسعير الخدمات ومعدل الساعة</h3>
            <p className="text-xs text-slate-400">احسب سعر ساعتك المستهدف بناءً على مصاريفك وأهدافك الصافية.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsGuideOpen(true)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 transition-colors text-xs flex items-center gap-1.5" title="قراءة الدليل الإجرائي">
            <BookOpen className="w-3.5 h-3.5" /><span className="hidden sm:inline">اقرأ الدليل</span>
          </button>
          <button onClick={() => setIsFocusMode((value) => !value)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors" title={isFocusMode ? "إغلاق وضع التركيز" : "وضع التركيز"}>
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Expand className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-xs flex items-center gap-1.5"
            title="نسخ ملخص النتيجة"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "تم النسخ" : "نسخ"}</span>
          </button>
          <button
            onClick={handleSave}
            className="p-2 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all text-xs font-bold flex items-center gap-1.5"
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? "تم الحفظ بـ لوحتي" : "حفظ النتيجة"}</span>
          </button>
        </div>
      </div>
      <ArticleDrawer isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} articleTitle="هندسة تسعير الخدمات: الخروج من فخ التخمين" articleHref="/finance/freelancing/pricing-guide">
        <p>السعر المستدام لا يبدأ من متوسط السوق، بل من هدفك الصافي وتكاليفك وساعاتك القابلة للفوترة.</p>
        <ul>
          <li>احسب المصاريف الثابتة والاحتياطي قبل تحديد السعر.</li>
          <li>افصل ساعات الإدارة والتسويق عن ساعات التنفيذ المدفوعة.</li>
          <li>استخدم السعر الموصى به كنقطة تفاوض، والحد الأدنى كخط حماية.</li>
        </ul>
      </ArticleDrawer>

      {/* Grid Inputs & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label htmlFor={incomeId} className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>الدخل الشهري المستهدف الصافي ($)</span>
              <span className="text-emerald-400 font-bold">{targetIncome} $</span>
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id={incomeId}
                type="number"
                value={targetIncome}
                onChange={(e) => setTargetIncome(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors pl-9"
              />
            </div>
          </div>

          <div>
            <label htmlFor={expensesId} className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>المصاريف الثابتة والتكاليف التشغيلية ($/شهر)</span>
              <span className="text-slate-400 font-mono">{fixedExpenses} $</span>
            </label>
            <input
              id={expensesId}
              type="number"
              value={fixedExpenses}
              onChange={(e) => setFixedExpenses(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor={hoursId} className="block text-[11px] font-semibold text-slate-400 mb-1">
                ساعات العمل / أسبوع
              </label>
              <input
                id={hoursId}
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor={adminId} className="block text-[11px] font-semibold text-slate-400 mb-1">
                نسبة الإدارة التسويق (%)
              </label>
              <input
                id={adminId}
                type="number"
                value={adminRatio}
                onChange={(e) => setAdminRatio(Math.min(90, Math.max(0, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor={taxId} className="block text-[11px] font-semibold text-slate-400 mb-1">
                نسبة الطوارئ والضرائب (%)
              </label>
              <input
                id={taxId}
                type="number"
                value={taxReserve}
                onChange={(e) => setTaxReserve(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 border border-emerald-500/30 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-2">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> السعر الموصى به لساعتك
              </span>
              <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">آمن مستدام</span>
            </div>

            <div className="text-3xl font-black text-white tracking-tight">
              {hourlyRateRecommended} <span className="text-emerald-400 text-lg">$ / ساعة</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              يغطي هدفك الصافي بالإضافة إلى مصاريفك ونسب الطوارئ وحجم العمل غير المدفوع (التسويق والمتابعة).
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-800/80 pt-3 text-xs">
            <div className="flex justify-between items-center text-slate-400">
              <span>الحد الأدنى لسعر الساعة (التعادل):</span>
              <span className="font-mono text-slate-200 font-bold">{hourlyRateMinimum} $</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>الساعات القابلة للفوترة شهرياً:</span>
              <span className="font-mono text-slate-200 font-bold">{Math.round(billableHoursMonth)} ساعة</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>الإيراد الشهري الإجمالي المطلوب:</span>
              <span className="font-mono text-emerald-400 font-bold">{Math.ceil(totalMonthlyTarget)} $</span>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full sm:hidden py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-lg text-xs transition-colors"
          >
            {isSaved ? "تم الحفظ في لوحتك" : "حفظ النتيجة في لوحة أدواتي"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancePricingCalculator;