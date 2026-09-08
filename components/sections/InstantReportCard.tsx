"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type InstantReport = {
  badge: string | null;
  title: string;
  description: string | null;
};

type InstantReportCardProps = {
  category: string;
  sub?: string;
};

const fallbackReport: InstantReport = {
  badge: "تقرير فوري",
  title: "لا يوجد تقرير فوري متاح حالياً",
  description: "سيظهر التقرير عند توفر بيانات هذا القطاع أو الفرع في قاعدة البيانات.",
};

export default function InstantReportCard({ category, sub }: InstantReportCardProps) {
  const [report, setReport] = useState<InstantReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadReport() {
      setIsLoading(true);
      try {
        const supabase = createClient();
        let selectedReport: InstantReport | null = null;

        if (sub) {
          const { data } = await supabase
            .from("instant_reports")
            .select("badge, title, description")
            .eq("category_slug", category)
            .eq("sub_category_slug", sub)
            .maybeSingle();
          selectedReport = data;
        }

        if (!selectedReport) {
          const { data } = await supabase
            .from("instant_reports")
            .select("badge, title, description")
            .eq("category_slug", category)
            .is("sub_category_slug", null)
            .maybeSingle();
          selectedReport = data;
        }

        if (!cancelled) setReport(selectedReport);
      } catch (error) {
        console.error("تعذر تحميل التقرير الفوري:", error);
        if (!cancelled) setReport(null);
      }

      if (!cancelled) setIsLoading(false);
    }

    void loadReport();
    return () => {
      cancelled = true;
    };
  }, [category, sub]);

  const currentReport = report ?? fallbackReport;

  return (
    <div className="mt-2 rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
          {isLoading ? "جاري تحميل التقرير" : "تقرير فوري"}
        </span>
        <span className="text-[10px] text-slate-400">{currentReport.badge}</span>
      </div>
      <div className="mt-4 text-sm leading-7 text-slate-300">
        <p className="text-[10px] text-slate-400">أكثر مسار يطلبه الزوار</p>
        <p className="mt-2 text-lg font-black text-white">{currentReport.title}</p>
        <p className="mt-2 text-sm text-slate-300">{currentReport.description}</p>
      </div>
    </div>
  );
}
