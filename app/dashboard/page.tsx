"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Calculator,
  Check,
  Clipboard,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { getRecentTools, TOOLS_REGISTRY, type ToolItem } from "@/config/toolsRegistry";
import { createClient } from "@/utils/supabase/client";

interface SavedTool {
  id: string;
  category: string;
  toolSlug: string;
  toolTitle: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  createdAt: string;
}

const CATEGORY_FILTERS = [
  { id: "all", label: "كل القطاعات" },
  { id: "finance", label: "مال وأعمال" },
  { id: "tech", label: "تكنولوجيا" },
  { id: "media", label: "إعلام جديد" },
  { id: "digital-lifestyle", label: "رقميون" },
] as const;

const ICONS: Record<string, LucideIcon> = {
  Calculator,
  FileText,
  ShieldCheck,
};

const supabase = createClient();

export default function UserDashboardPage() {
  const [savedTools, setSavedTools] = useState<SavedTool[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [savedToolsError, setSavedToolsError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORY_FILTERS)[number]["id"]>("all");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      const [{ data: savedData, error }, { data: authData }] = await Promise.all([
        supabase
          .from("saved_tools")
          .select("id, category, tool_slug, tool_title, inputs, outputs, created_at")
          .order("created_at", { ascending: false }),
        supabase.auth.getUser(),
      ]);

      if (error || !authData.user) {
        setSavedToolsError("تعذر تحميل النتائج المحفوظة حاليًا.");
      } else {
        setSavedTools(savedData?.map((item) => ({
          id: item.id,
          category: item.category,
          toolSlug: item.tool_slug,
          toolTitle: item.tool_title,
          inputs: item.inputs as Record<string, unknown>,
          outputs: item.outputs as Record<string, unknown>,
          createdAt: item.created_at,
        })) ?? []);
      }

      try {
        setFavoriteIds(JSON.parse(localStorage.getItem("favorite_tools") || "[]") as string[]);
        setRecentIds(JSON.parse(localStorage.getItem("recent_tools") || "[]") as string[]);
      } catch {
        setFavoriteIds([]);
        setRecentIds([]);
      }
    }

    loadDashboard();
  }, []);

  const recentlyUsedTools = useMemo(() => {
    const byUsage = recentIds
      .map((id) => TOOLS_REGISTRY.find((tool) => tool.id === id))
      .filter((tool): tool is ToolItem => Boolean(tool));
    return byUsage.slice(0, 6);
  }, [recentIds]);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return TOOLS_REGISTRY.filter((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const matchesQuery = !normalizedQuery || `${tool.title} ${tool.description} ${tool.categoryLabel}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const toggleFavorite = (toolId: string) => {
    const updated = favoriteIds.includes(toolId)
      ? favoriteIds.filter((id) => id !== toolId)
      : [toolId, ...favoriteIds];
    localStorage.setItem("favorite_tools", JSON.stringify(updated));
    setFavoriteIds(updated);
  };

  const rememberTool = (toolId: string) => {
    const updated = [toolId, ...recentIds.filter((id) => id !== toolId)].slice(0, 6);
    localStorage.setItem("recent_tools", JSON.stringify(updated));
    setRecentIds(updated);
  };

  const handleRemove = async (id: string) => {
    const { error } = await supabase.from("saved_tools").delete().eq("id", id);
    if (error) {
      setSavedToolsError("تعذر حذف النتيجة المحفوظة.");
      return;
    }
    setSavedTools((currentTools) => currentTools.filter((item) => item.id !== id));
  };

  const copySavedTool = async (item: SavedTool, index: number) => {
    const summary = Object.entries(item.outputs || {}).map(([key, value]) => `${key}: ${String(value)}`).join("\n");
    await navigator.clipboard.writeText(`${item.toolTitle}\n${summary}`);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const printSavedTool = (item: SavedTool) => {
    const summary = Object.entries(item.outputs || {}).map(([key, value]) => `${key}: ${String(value)}`).join("\n");
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;
    printWindow.document.write(`<html dir="rtl"><head><title>${item.toolTitle}</title></head><body><h1>${item.toolTitle}</h1><pre>${summary}</pre></body></html>`);
    printWindow.document.close();
    printWindow.print();
  };

  const ToolCard = ({ tool, compact = false }: { tool: ToolItem; compact?: boolean }) => {
    const Icon = ICONS[tool.iconName] || Wrench;
    const isFavorite = favoriteIds.includes(tool.id);
    return (
      <div className={`bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between gap-5 hover:border-emerald-500/40 transition-colors ${compact ? "min-w-[260px]" : ""}`}>
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Icon className="w-5 h-5" />
            </div>
            <button onClick={() => toggleFavorite(tool.id)} aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"} className="p-2 text-slate-500 hover:text-amber-300 transition-colors">
              <Star className={`w-4 h-4 ${isFavorite ? "text-amber-300 fill-amber-300" : ""}`} />
            </button>
          </div>
          <span className="text-[10px] text-emerald-400">{tool.categoryLabel}</span>
          <h3 className="text-base font-bold text-white mt-2">{tool.title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed mt-2">{tool.description}</p>
        </div>
        <Link href={tool.href} onClick={() => rememberTool(tool.id)} className="text-xs text-emerald-400 inline-flex items-center gap-1 hover:text-emerald-300">
          الانتقال للأداة <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  };

  return (
    <div className="space-y-10 dir-rtl py-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-5">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold"><Wrench className="w-4 h-4" /> مساحة العمل التفاعلية</div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">لوحة الأدوات</h1>
        <p className="text-xs text-slate-400 mt-1">
          استعرض نتائجك، ثبّت أدواتك اليومية، واكتشف إضافات المنصة من مكان واحد.
        </p>
        <div className="relative max-w-2xl">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن أداة أو قطاع..." className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pr-10 pl-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((filter) => <button key={filter.id} onClick={() => setCategory(filter.id)} className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${category === filter.id ? "bg-emerald-400 text-slate-950 font-bold" : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"}`}>{filter.label}</button>)}
        </div>
      </div>

      {getRecentTools().length > 0 && <section className="space-y-4"><div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-300" /><h2 className="text-lg font-bold text-white">أُضيفت حديثاً</h2><span className="text-[10px] text-amber-300 bg-amber-300/10 border border-amber-300/20 px-2 py-1 rounded-full">NEW · 30 يوماً</span></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{getRecentTools().map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div></section>}

      {favoriteIds.length > 0 && <section className="space-y-4"><div className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-300 fill-amber-300" /><h2 className="text-lg font-bold text-white">أدواتي المفضلة</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{TOOLS_REGISTRY.filter((tool) => favoriteIds.includes(tool.id)).map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div></section>}

      {recentlyUsedTools.length > 0 && <section className="space-y-4"><div className="flex items-center gap-2"><Wrench className="w-5 h-5 text-teal-300" /><h2 className="text-lg font-bold text-white">المستعملة مؤخراً</h2></div><div className="flex gap-4 overflow-x-auto pb-2">{recentlyUsedTools.map((tool) => <ToolCard key={tool.id} tool={tool} compact />)}</div></section>}

      <section className="space-y-4">
        <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-white">دليل الأدوات الشامل</h2><p className="text-xs text-slate-500 mt-1">{filteredTools.length} أدوات متاحة في السجل المركزي</p></div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{filteredTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2"><Bookmark className="w-5 h-5 text-emerald-400" /><h2 className="text-lg font-bold text-white">النتائج واللقطات المحفوظة</h2></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedTools.length > 0 ? (
          savedTools.map((item, idx) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                    {item.toolSlug}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    aria-label={`حذف ${item.toolTitle}`}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-base font-bold text-white mb-3">
                  {item.toolTitle}
                </h3>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs space-y-1 font-mono">
                  {item.outputs &&
                    Object.entries(item.outputs).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-slate-400">{k}:</span>
                        <span className="text-emerald-400 font-bold">
                          {String(v)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                <button onClick={() => copySavedTool(item, idx)} className="text-xs text-slate-300 hover:text-emerald-400 inline-flex items-center gap-1"><Clipboard className="w-3.5 h-3.5" />{copiedIndex === idx ? "تم النسخ" : "نسخ سريع"}</button>
                <button onClick={() => printSavedTool(item)} className="text-xs text-slate-300 hover:text-emerald-400 inline-flex items-center gap-1"><FileText className="w-3.5 h-3.5" />تصدير / طباعة</button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
            <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-400">
              لم تقم بحفظ أي أدوات أو حسابات في لوحتك بعد.
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg"
            >
              استكشف الأدوات الحية
            </Link>
          </div>
        )}
      </div>
      {savedToolsError && <p role="alert" className="text-sm text-red-400">{savedToolsError}</p>}
      </section>
    </div>
  );
}