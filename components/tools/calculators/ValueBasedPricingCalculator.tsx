"use client";

import React, { useState, useId } from "react";
import { Calculator, DollarSign, ArrowUpRight, CheckCircle2, AlertCircle, Info, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ValueBasedPricingCalculator() {
  const estimatedValueId = useId();
  const valueSharePercentId = useId();
  const complexityFactorId = useId();
  const riskFactorId = useId();
  const estimatedHoursId = useId();
  const hourlyRateId = useId();

  const [estimatedValue, setEstimatedValue] = useState<number>(150000);
  const [valueSharePercent, setValueSharePercent] = useState<number>(15);
  const [complexityFactor, setComplexityFactor] = useState<number>(0.2);
  const [riskFactor, setRiskFactor] = useState<number>(0.1);
  const [estimatedHours, setEstimatedHours] = useState<number>(50);
  const [hourlyRate, setHourlyRate] = useState<number>(80);

  // حساب التسعير القائم على القيمة VBP
  const ev = Math.max(estimatedValue, 0);
  const share = Math.min(Math.max(valueSharePercent, 1), 50) / 100;
  const comp = Math.min(Math.max(complexityFactor, 0), 0.5);
  const risk = Math.min(Math.max(riskFactor, 0), 0.3);

  const baseValuePrice = ev * share;
  const finalVBP = Math.round(baseValuePrice * (1 + comp) * (1 - risk));

  // حساب التسعير التقليدي بالساعة
  const hourlyTotal = Math.round(Math.max(estimatedHours, 0) * Math.max(hourlyRate, 0));

  // الفارق الربحي ونسبة الزيادة
  const profitDifference = finalVBP - hourlyTotal;
  const percentageIncrease = hourlyTotal > 0 ? Math.round((profitDifference / hourlyTotal) * 100) : 0;

  const isMoreProfitable = finalVBP > hourlyTotal;

  return (
    <Card className="not-prose overflow-hidden border-2 border-[var(--accent-primary)]/30 bg-[var(--bg-card)] shadow-xl dir-rtl">
      <CardHeader className="border-b border-[var(--border-main)] bg-[var(--bg-surface)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-light)] text-[var(--accent-primary)]">
              <Calculator className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-lg font-black text-[var(--text-main)] sm:text-xl">
                حاسبة معادلة التسعير المبني على القيمة (VBP)
              </CardTitle>
              <CardDescription className="mt-1 text-xs text-[var(--text-muted)]">
                ادخل بيانات مشروع العميل للحصول على السعر العادل ومقارنته بنظام الساعة
              </CardDescription>
            </div>
          </div>
          <Badge variant="accent" size="md" className="gap-1.5 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5" />
            أداة تفاعلية
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Value Parameters */}
          <div className="space-y-5 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-muted)]/40 p-5">
            <h4 className="flex items-center gap-2 text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" />
              1. معايير القيمة والأثر (Value & Impact)
            </h4>

            {/* Estimated Value */}
            <div className="space-y-2">
              <label htmlFor={estimatedValueId} className="flex justify-between text-xs font-bold text-[var(--text-main)]">
                <span>العائد المالي المتوقع للعميل سنوياً ($)</span>
                <span className="text-[var(--accent-primary)] dir-ltr">${estimatedValue.toLocaleString()}</span>
              </label>
              <input
                id={estimatedValueId}
                type="number"
                min={1000}
                step={5000}
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(Number(e.target.value))}
                className="w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3.5 py-2.5 text-sm font-mono text-[var(--text-main)] outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20"
              />
              <p className="text-[11px] text-[var(--text-muted)]">الإيراد الإضافي أو التوفير التقديري للعميل خلال 12 شهراً</p>
            </div>

            {/* Value Share Percent */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[var(--text-main)]">
                <label htmlFor={valueSharePercentId}>نسبة المشاركة بالقيمة (%)</label>
                <span className="text-[var(--accent-primary)]">{valueSharePercent}%</span>
              </div>
              <input
                id={valueSharePercentId}
                type="range"
                min={5}
                max={30}
                step={1}
                value={valueSharePercent}
                onChange={(e) => setValueSharePercent(Number(e.target.value))}
                className="w-full accent-[var(--accent-primary)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                <span>5% (مشاريع كبيرة)</span>
                <span>15% (المعيار الذهبي)</span>
                <span>30% (مشاريع حرجة)</span>
              </div>
            </div>

            {/* Complexity Factor */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[var(--text-main)]">
                <label htmlFor={complexityFactorId}>معامل تعقيد التنفيذ (Complexity)</label>
                <span className="text-[var(--accent-primary)]">{(complexityFactor * 100).toFixed(0)}%</span>
              </div>
              <input
                id={complexityFactorId}
                type="range"
                min={0}
                max={0.5}
                step={0.05}
                value={complexityFactor}
                onChange={(e) => setComplexityFactor(Number(e.target.value))}
                className="w-full accent-[var(--accent-primary)] cursor-pointer"
              />
              <p className="text-[11px] text-[var(--text-muted)]">درجة الصعوبة الفنية أو التخصص الدقيق المطلوب</p>
            </div>

            {/* Risk Factor */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[var(--text-main)]">
                <label htmlFor={riskFactorId}>معامل المخاطرة (Risk Factor)</label>
                <span className="text-[var(--accent-primary)]">{(riskFactor * 100).toFixed(0)}%</span>
              </div>
              <input
                id={riskFactorId}
                type="range"
                min={0}
                max={0.3}
                step={0.05}
                value={riskFactor}
                onChange={(e) => setRiskFactor(Number(e.target.value))}
                className="w-full accent-[var(--accent-primary)] cursor-pointer"
              />
              <p className="text-[11px] text-[var(--text-muted)]">احتمالية التأخر بسبب اعتماد المشروع على فريق العميل</p>
            </div>
          </div>

          {/* Column 2: Hourly Comparison Inputs */}
          <div className="space-y-5 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-muted)]/40 p-5 flex flex-col justify-between">
            <div className="space-y-5">
              <h4 className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
                <DollarSign className="h-4 w-4" />
                2. التسعير بالساعة التقليدي (للمقارنة)
              </h4>

              {/* Estimated Hours */}
              <div className="space-y-2">
                <label htmlFor={estimatedHoursId} className="flex justify-between text-xs font-bold text-[var(--text-main)]">
                  <span>ساعات العمل التقديرية</span>
                  <span className="font-mono text-amber-500">{estimatedHours} ساعة</span>
                </label>
                <input
                  id={estimatedHoursId}
                  type="number"
                  min={1}
                  max={500}
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3.5 py-2.5 text-sm font-mono text-[var(--text-main)] outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              {/* Hourly Rate */}
              <div className="space-y-2">
                <label htmlFor={hourlyRateId} className="flex justify-between text-xs font-bold text-[var(--text-main)]">
                  <span>سعر الساعة الحالي ($)</span>
                  <span className="font-mono text-amber-500dir-ltr">${hourlyRate}/ساعة</span>
                </label>
                <input
                  id={hourlyRateId}
                  type="number"
                  min={10}
                  max={500}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3.5 py-2.5 text-sm font-mono text-[var(--text-main)] outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            {/* Mathematical Formula Preview Box */}
            <div className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
                <Info className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>المعادلة المطبقة:</span>
              </div>
              <code className="block text-[11px] font-mono text-[var(--text-muted)] leading-relaxed dir-ltr text-left bg-[var(--bg-muted)] p-2 rounded-lg">
                VBP = (V × Share) × (1 + Comp) × (1 - Risk)
              </code>
            </div>
          </div>
        </div>

        {/* Results Banner */}
        <div className="rounded-3xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-6 space-y-6 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
            {/* VBP Result */}
            <div className="rounded-2xl border-2 border-[var(--accent-primary)] bg-[var(--accent-light)] p-5 space-y-1">
              <p className="text-xs font-bold text-[var(--accent-primary)]">السعر المبني على القيمة (VBP)</p>
              <p className="text-3xl font-black text-[var(--text-main)] font-mono dir-ltr">
                ${finalVBP.toLocaleString()}
              </p>
              <span className="inline-block text-[10px] text-[var(--accent-primary)] font-semibold">العرض الموصى به للعميل</span>
            </div>

            {/* Hourly Result */}
            <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-muted)] p-5 space-y-1">
              <p className="text-xs font-bold text-[var(--text-muted)]">السعر التقليدي بالساعة</p>
              <p className="text-2xl font-bold text-[var(--text-muted)] font-mono dir-ltr">
                ${hourlyTotal.toLocaleString()}
              </p>
              <span className="inline-block text-[10px] text-[var(--text-muted)]">({estimatedHours} ساعة × ${hourlyRate})</span>
            </div>

            {/* Profit Uplift */}
            <div className={`rounded-2xl border p-5 space-y-1 ${isMoreProfitable ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500" : "border-amber-500/30 bg-amber-500/10 text-amber-500"}`}>
              <p className="text-xs font-bold">الفارق في الأرباح الصافية</p>
              <p className="text-3xl font-black font-mono dir-ltr flex items-center justify-center gap-1">
                {profitDifference > 0 ? "+" : ""}${profitDifference.toLocaleString()}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold">
                <ArrowUpRight className="h-3.5 w-3.5" />
                زيادة بنسبة {percentageIncrease}%
              </span>
            </div>
          </div>

          {/* Recommendation Note */}
          <div className={`flex items-start gap-3 rounded-2xl border p-4 text-xs leading-relaxed ${isMoreProfitable ? "border-emerald-500/30 bg-emerald-500/5 text-[var(--text-main)]" : "border-amber-500/30 bg-amber-500/5 text-[var(--text-main)]"}`}>
            {isMoreProfitable ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm">
                {isMoreProfitable ? "توصية: اعتمد نموذج التسعير القائم على القيمة" : "توصية: راجع تقييم العائد مع العميل"}
              </p>
              <p className="mt-1 text-[var(--text-muted)]">
                {isMoreProfitable
                  ? `باعتمادك تسعير القيمة بدلاً من الساعات، ستحقق أرباحاً إضافية قدرها $${profitDifference.toLocaleString()} دون الحكْم على كفاءتك وسرعتك بعقوبة انخفاض الدخل.`
                  : "السعر بالساعة الحالية يغطي التكلفة ولكن يحرمك من بناء شراكة استراتيجية مستمدة من نتائج المشروع المستقبلي."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
