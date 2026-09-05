"use client";

import { ShieldCheck } from "lucide-react";
import { DynamicToolRenderer } from "@/components/tools/DynamicToolRenderer";

type Section = "finance" | "tech" | "media" | "lifestyle";

const sectionTools: Record<Section, string[]> = {
  finance: ["freelance-pricing-calculator", "contract-generator", "break-even-calculator", "cash-flow-calculator"],
  tech: ["prompt-optimizer", "privacy-policy-generator", "cloud-cost-calculator", "web-speed-checker"],
  media: ["engagement-rate-calculator", "headline-generator", "posting-time-optimizer", "creator-earnings-calculator"],
  lifestyle: ["aura-life-score", "focus-time-calculator", "learning-path-builder", "burnout-prevention-checker"],
};

const sectionTitles: Record<Section, string> = {
  finance: "أدوات المال والأعمال",
  tech: "أدوات التكنولوجيا والابتكار",
  media: "أدوات الإعلام الجديد",
  lifestyle: "أدوات الحياة الرقمية",
};

export function SectionInteractiveTools({ section }: { section: Section }) {
  return (
    <section className="space-y-5" aria-labelledby={`${section}-interactive-tools`}>
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" />
        <div>
          <h2 id={`${section}-interactive-tools`} className="text-xl font-bold text-white">{sectionTitles[section]}</h2>
          <p className="mt-1 text-xs text-slate-500">أدوات هذا القسم محمّلة من سجل الأدوات النشطة.</p>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {sectionTools[section].map((slug) => (
          <DynamicToolRenderer key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}
