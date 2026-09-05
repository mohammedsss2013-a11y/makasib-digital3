"use client";

import { useState } from "react";
import { DynamicToolRenderer } from "@/components/tools/DynamicToolRenderer";

type Section = "finance" | "tech" | "media" | "lifestyle";

const sectionTools: Record<Section, string[]> = {
  finance: ["freelance-pricing-calculator", "contract-generator", "break-even-calculator", "cash-flow-calculator"],
  tech: ["prompt-optimizer", "privacy-policy-generator", "cloud-cost-calculator", "web-speed-checker"],
  media: ["engagement-rate-calculator", "headline-generator", "posting-time-optimizer", "creator-earnings-calculator"],
  lifestyle: ["aura-life-score", "focus-time-calculator", "learning-path-builder", "burnout-prevention-checker"],
};

const sectionLabels: Record<Section, string> = {
  finance: "مال وأعمال",
  tech: "تكنولوجيا",
  media: "إعلام جديد",
  lifestyle: "حياة رقمية",
};

const sectionTitles: Record<Section, string> = {
  finance: "أدوات المال والأعمال",
  tech: "أدوات التكنولوجيا",
  media: "أدوات الإعلام الجديد",
  lifestyle: "أدوات الحياة الرقمية",
};

export function CalculatorWorkspace({
  initialSection = "finance",
  showSectionTabs = true,
  showAllSections = false,
}: {
  initialSection?: Section;
  showSectionTabs?: boolean;
  showAllSections?: boolean;
}) {
  const [activeSection, setActiveSection] = useState<Section>(initialSection);
  const visibleSections = showAllSections ? (Object.keys(sectionTools) as Section[]) : [activeSection];

  return (
    <div className="space-y-6" dir="rtl">
      {showSectionTabs && (
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-2 sm:grid-cols-4">
          {(Object.keys(sectionTools) as Section[]).map((section) => (
            <button key={section} type="button" onClick={() => setActiveSection(section)} className={`rounded-xl px-3 py-3 text-xs font-bold transition-colors sm:text-sm ${activeSection === section ? "bg-emerald-400 text-slate-950" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
              {sectionLabels[section]}
            </button>
          ))}
        </div>
      )}

      {visibleSections.map((section) => (
        <section key={section} className="space-y-4">
          <h2 className="border-r-4 border-emerald-500 pr-3 text-xl font-bold text-white">{sectionTitles[section]}</h2>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {sectionTools[section].map((slug) => <DynamicToolRenderer key={slug} slug={slug} />)}
          </div>
        </section>
      ))}

      <p className="text-xs text-slate-500">تُحفظ النتائج من داخل كل أداة عند توفر خيار الحفظ، وتبقى الحسابات المحلية داخل المتصفح.</p>
    </div>
  );
}
