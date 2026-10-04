"use client";

import React, { useState, useId } from "react";
import { Layers, Copy, Check, Sparkles, Zap, ShieldCheck, Crown, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ProposalPackageGenerator() {
  const basePriceId = useId();
  const projectTitleId = useId();

  const [basePrice, setBasePrice] = useState<number>(20000);
  const [projectTitle, setProjectTitle] = useState<string>("تطوير النظام وتجربة المستخدم");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const pBase = Math.max(basePrice, 100);

  const tiers = [
    {
      id: "basic",
      title: "الحزمة الأساسية (Minimum Viable)",
      badge: "الحل الأساسي",
      badgeVariant: "secondary" as const,
      priceRatio: 0.75,
      price: Math.round(pBase * 0.75),
      icon: Zap,
      color: "text-blue-500",
      borderColor: "border-blue-500/30",
      bgColor: "bg-blue-500/5",
      features: [
        "حل النواة الرئيسية للمشكلة دون إضافات ناتجة",
        "تسليم المخرجات الجوهرية فقط خلال الإطار الزمني المحدد",
        "دعم وتصحيح لمدة 14 يوماً بعد الإطلاق",
      ],
    },
    {
      id: "target",
      title: "الحزمة الموصى بها (Target Growth)",
      badge: "الأكثر شعبية والقيمة العادلة",
      badgeVariant: "accent" as const,
      priceRatio: 1.0,
      price: Math.round(pBase * 1.0),
      icon: ShieldCheck,
      color: "text-[var(--accent-primary)]",
      borderColor: "border-[var(--accent-primary)]",
      bgColor: "bg-[var(--accent-light)]",
      recommended: true,
      features: [
        "تغطية الشروط الكاملة وتحقيق أقصى عائد مستهدف (ROI)",
        "تسليم المخرجات المتكاملة + التحسين والتكامل المهني",
        "دعم فني واختبارات مكثفة لمدة 30 يوماً بعد الإطلاق",
        "جلسة تدريبية وتوثيق استراتيجي لفريق العمل",
      ],
    },
    {
      id: "premium",
      title: "الحزمة الشاملة (Premium Transformation)",
      badge: "أقصى تحول وأولوية قصوى",
      badgeVariant: "warning" as const,
      priceRatio: 1.8,
      price: Math.round(pBase * 1.8),
      icon: Crown,
      color: "text-amber-500",
      borderColor: "border-amber-500/40",
      bgColor: "bg-amber-500/5",
      features: [
        "كل منافع الحزمة الموصى بها + أولوية التنفيذ الفوري",
        "استشارات نمو مستمرة وتطوير دوري لمدة 90 يوماً",
        "تكامل متقدم مع أنظمة الشركة وتجهيز البيئة للنمو العالي",
        "إدارة المخاطر وحماية كاملة للأداء والتسليم السريع",
      ],
    },
  ];

  const handleCopyTier = (tier: typeof tiers[0], index: number) => {
    const text = `📦 ${tier.title} - مشروع: ${projectTitle}
السعر: $${tier.price.toLocaleString()}

المميزات:
${tier.features.map((f) => `• ${f}`).join("\n")}
`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const text = `📋 خيارات العرض المقترح للمشروع: ${projectTitle}

${tiers
  .map(
    (t) => `-----------------------------------
🔹 ${t.title}
💰 السعر: $${t.price.toLocaleString()}
${t.features.map((f) => `  - ${f}`).join("\n")}`
  )
  .join("\n\n")}
`;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <Card className="not-prose overflow-hidden border-2 border-purple-500/30 bg-[var(--bg-card)] shadow-xl dir-rtl">
      <CardHeader className="border-b border-[var(--border-main)] bg-[var(--bg-surface)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500">
              <Layers className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-lg font-black text-[var(--text-main)] sm:text-xl">
                مولّد حزم العروض الثلاثية (3-Tier Proposal Generator)
              </CardTitle>
              <CardDescription className="mt-1 text-xs text-[var(--text-muted)]">
                طبق استراتيجية Anchor Pricing لتوجيه العميل نحو الحزمة الأنسب ومنع الفصال في الساعات
              </CardDescription>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={handleCopyAll} icon={copiedAll ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}>
            {copiedAll ? "تم نسخ كل العرض" : "نسخ العرض الكامل"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        {/* Input parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-muted)]/40 p-5">
          <div className="space-y-2">
            <label htmlFor={projectTitleId} className="text-xs font-bold text-[var(--text-main)]">اسم المشروع / الخدمة</label>
            <input
              id={projectTitleId}
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3.5 py-2.5 text-sm font-bold text-[var(--text-main)] outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder="مثل: إعادة تصميم المتجر وتطوير الأداء"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={basePriceId} className="flex justify-between text-xs font-bold text-[var(--text-main)]">
              <span>السعر الأساسي المقدر ($)</span>
              <span className="text-purple-500 font-mono dir-ltr">${basePrice.toLocaleString()}</span>
            </label>
            <input
              id={basePriceId}
              type="number"
              min={500}
              step={1000}
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3.5 py-2.5 text-sm font-mono text-[var(--text-main)] outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between rounded-3xl border-2 p-6 transition-all duration-300 ${
                  tier.recommended ? "scale-105 shadow-xl " + tier.borderColor + " " + tier.bgColor : tier.borderColor + " bg-[var(--bg-card)] shadow-sm"
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[var(--accent-primary)] px-3 py-1 text-[10px] font-black text-white shadow-md">
                      ⭐ الخيار الموصى به
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tier.bgColor} ${tier.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant={tier.badgeVariant}>{tier.badge}</Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[var(--text-main)]">{tier.title}</h3>
                    <div className="mt-3 flex items-baseline gap-1 font-mono">
                      <span className="text-3xl font-black text-[var(--text-main)] dir-ltr">${tier.price.toLocaleString()}</span>
                      <span className="text-xs text-[var(--text-muted)]">إجمالي العقد</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 border-t border-[var(--border-main)] pt-4 text-xs text-[var(--text-muted)]">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${tier.color}`} />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[var(--border-main)] mt-6">
                  <Button
                    variant={tier.recommended ? "primary" : "secondary"}
                    size="sm"
                    className="w-full"
                    onClick={() => handleCopyTier(tier, idx)}
                    icon={copiedIndex === idx ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  >
                    {copiedIndex === idx ? "تم نسخ الحزمة" : "نسخ تفاصيل الحزمة"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
