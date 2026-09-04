"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SavedTool } from "@/utils/dashboard";

export function SavedToolsList({ initialTools }: { initialTools: SavedTool[] }) {
  const [tools, setTools] = useState(initialTools);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function removeTool(id: string) {
    setDeletingId(id);
    const supabase = createClient();
    const { error } = await supabase.from("saved_tools").delete().eq("id", id);
    if (!error) setTools((current) => current.filter((tool) => tool.id !== id));
    setDeletingId(null);
  }

  if (!tools.length) {
    return <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-12 text-center"><p className="text-sm font-bold text-white">لا توجد نتائج محفوظة بعد</p><p className="mt-2 text-xs text-slate-400">استخدم أي أداة ثم اضغط «حفظ النتيجة» لتظهر هنا.</p><Link href="/dashboard/tools" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-slate-950">لوحة أدواتي <ArrowLeft className="h-4 w-4" /></Link></div>;
  }

  return <div className="grid gap-4 md:grid-cols-2">{tools.map((tool) => <article key={tool.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"><div className="flex items-start justify-between gap-3"><div><span className="text-[10px] font-bold text-emerald-400">{tool.category}</span><h2 className="mt-2 text-sm font-bold text-white">{tool.tool_title}</h2><time className="mt-1 block text-[11px] text-slate-500" dateTime={tool.created_at}>{new Date(tool.created_at).toLocaleDateString("ar-EG")}</time></div><button type="button" onClick={() => removeTool(tool.id)} disabled={deletingId === tool.id} className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50" title="حذف النتيجة" aria-label={`حذف ${tool.tool_title}`}><Trash2 className="h-4 w-4" /></button></div><dl className="mt-4 space-y-2 border-t border-slate-800 pt-3">{Object.entries(tool.outputs).slice(0, 3).map(([label, value]) => <div key={label} className="flex justify-between gap-3 text-xs"><dt className="text-slate-500">{label}</dt><dd className="truncate font-bold text-slate-200">{String(value)}</dd></div>)}</dl></article>)}</div>;
}
