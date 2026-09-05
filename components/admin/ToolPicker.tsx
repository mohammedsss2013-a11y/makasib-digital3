"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Loader2, Wrench } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ActiveTool = {
  title: string;
  slug: string;
  sector: string;
};

type ToolPickerProps = {
  onInsert: (tag: string) => void;
};

export default function ToolPicker({ onInsert }: ToolPickerProps) {
  const [tools, setTools] = useState<ActiveTool[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inserted, setInserted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadTools() {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("tools")
        .select("title, slug, sector")
        .eq("status", "active")
        .order("created_at", { ascending: true });

      if (cancelled) return;
      if (queryError) {
        setError("تعذر تحميل الأدوات النشطة.");
      } else {
        setTools(data ?? []);
      }
      setIsLoading(false);
    }

    void loadTools();
    return () => {
      cancelled = true;
    };
  }, []);

  const insertTool = () => {
    if (!selectedSlug) return;
    onInsert(`[tool:${selectedSlug}]`);
    setInserted(true);
    window.setTimeout(() => setInserted(false), 1800);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 bg-slate-50 p-2" dir="rtl">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
        <Wrench className="h-4 w-4 text-emerald-600" aria-hidden="true" />
        إدراج أداة
      </div>
      <div className="relative min-w-52 flex-1 sm:flex-none">
        <select
          value={selectedSlug}
          onChange={(event) => setSelectedSlug(event.target.value)}
          disabled={isLoading || Boolean(error)}
          aria-label="اختر أداة لإدراجها في المقال"
          className="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 pl-8 text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="">{isLoading ? "جاري تحميل الأدوات..." : "اختر أداة نشطة"}</option>
          {tools.map((tool) => (
            <option key={tool.slug} value={tool.slug}>
              {tool.title} ({tool.sector})
            </option>
          ))}
        </select>
        {isLoading ? <Loader2 className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-slate-400" aria-hidden="true" /> : <ChevronDown className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />}
      </div>
      <button type="button" onClick={insertTool} disabled={!selectedSlug || isLoading} className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
        {inserted ? <Check className="h-4 w-4" aria-hidden="true" /> : <Wrench className="h-4 w-4" aria-hidden="true" />}
        {inserted ? "تم الإدراج" : "إدراج"}
      </button>
      {error && <p role="alert" className="basis-full text-xs text-red-600">{error}</p>}
    </div>
  );
}
