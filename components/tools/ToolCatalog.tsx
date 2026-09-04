'use client';

import { useMemo, useState } from 'react';
import { Calculator, FileText, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { TOOLS_REGISTRY, type ToolItem } from '@/config/toolsRegistry';
import { CalculatorWorkspace } from '@/components/dashboard/CalculatorWorkspace';

const iconMap = { Calculator, FileText, ShieldCheck } as const;
type CategoryFilter = 'all' | ToolItem['category'];

const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'كل القطاعات' },
  { id: 'finance', label: 'مال وأعمال' },
  { id: 'tech', label: 'تكنولوجيا' },
  { id: 'media', label: 'إعلام' },
  { id: 'digital-lifestyle', label: 'حياة رقمية' },
];

export default function ToolCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [activeId, setActiveId] = useState(TOOLS_REGISTRY[0]?.id ?? '');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ar');
    return TOOLS_REGISTRY.filter((tool) => {
      const matchesCategory = category === 'all' || tool.category === category;
      const searchableText = `${tool.title} ${tool.description} ${tool.categoryLabel} ${tool.subcategory}`.toLocaleLowerCase('ar');
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, query]);

  const activeTool = filteredTools.find((tool) => tool.id === activeId) ?? filteredTools[0] ?? null;
  const workspaceSection = activeTool?.category === 'digital-lifestyle' ? 'lifestyle' : activeTool?.category ?? 'finance';

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <span className="sr-only">البحث عن أداة</span>
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن أداة أو موضوع..." className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950 pr-10 pl-4 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20" />
        </label>
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="group" aria-label="تصفية الأدوات حسب القطاع">
          {categoryFilters.map((filter) => <button key={filter.id} type="button" onClick={() => setCategory(filter.id)} aria-pressed={category === filter.id} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${category === filter.id ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>{filter.label}</button>)}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
        <section aria-labelledby="tools-list-title" className="space-y-3">
          <div className="flex items-center justify-between"><h2 id="tools-list-title" className="text-sm font-bold text-white">الأدوات المتاحة</h2><span className="text-xs text-slate-500">{filteredTools.length} من {TOOLS_REGISTRY.length}</span></div>
          {filteredTools.length ? filteredTools.map((tool) => {
            const Icon = iconMap[tool.iconName as keyof typeof iconMap] ?? Sparkles;
            const isActive = activeTool?.id === tool.id;
            return <button key={tool.id} type="button" onClick={() => setActiveId(tool.id)} aria-pressed={isActive} className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-right transition-colors ${isActive ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'}`}><span className={`rounded-xl p-2 ${isActive ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-emerald-300'}`}><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="min-w-0"><strong className="block truncate text-sm text-white">{tool.title}</strong><span className="mt-1 block text-xs leading-6 text-slate-400">{tool.description}</span><span className="mt-2 block text-[11px] text-emerald-300">{tool.categoryLabel}</span></span></button>;
          }) : <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-400">لا توجد أدوات مطابقة للبحث الحالي.</div>}
        </section>

        <section aria-labelledby="active-tool-title" className="min-w-0">
          {activeTool ? <><div className="mb-4 flex items-center justify-between gap-3"><div><h2 id="active-tool-title" className="text-lg font-black text-white">{activeTool.title}</h2><p className="mt-1 text-xs text-slate-400">{activeTool.subcategory}</p></div><Sparkles className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" /></div><CalculatorWorkspace initialSection={workspaceSection as 'finance' | 'tech' | 'media' | 'lifestyle'} showSectionTabs={false} /></> : <p className="rounded-2xl border border-slate-800 p-8 text-center text-sm text-slate-400">اختر أداة لبدء الاستخدام.</p>}
        </section>
      </div>
    </div>
  );
}
