'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, FolderCheck, Calculator, FileText, Cpu, Radio, Users, Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { TOOLS_REGISTRY } from '@/config/toolsRegistry';

const CATEGORIES = [
  { id: 'finance', name: 'المال والأعمال', description: 'التسعير، العقود، ونمو المشاريع الرقمية.', icon: Calculator },
  { id: 'tech', name: 'التكنولوجيا والذكاء الاصطناعي', description: 'الأمان، الذكاء الاصطناعي، والبنية التقنية.', icon: Cpu },
  { id: 'media', name: 'الإعلام الجديد', description: 'صناعة المحتوى، التفاعل، والنشر الرقمي.', icon: Radio },
  { id: 'digital-lifestyle', name: 'رقميون ومجتمع مكاسب', description: 'إدارة الحياة الرقمية وتجارب المجتمع.', icon: Users },
];

const SUBCATEGORIES: Record<string, string[]> = {
  finance: ['العمل الحر والخدمات', 'التجارة الإلكترونية', 'الذكاء الاصطناعي للأعمال'],
  tech: ['الأمن السيبراني', 'تطبيقات الذكاء الاصطناعي', 'الحوسبة السحابية', 'البنية التحتية'],
  media: ['صناعة المحتوى', 'البودكاست', 'البث المباشر'],
  'digital-lifestyle': ['إدارة الحياة الرقمية', 'الصحة الرقمية', 'مجتمع مكاسب'],
};

const ICONS: Record<string, typeof Calculator> = { FileText, Calculator, ShieldCheck };

export default function ToolsWorkspacePage() {
  const [activeCategory, setActiveCategory] = useState<string>('finance');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = TOOLS_REGISTRY.filter((tool) => {
    const matchesCategory = tool.category === activeCategory;
    const matchesSubcategory = activeSubcategory === 'الكل' || tool.subcategory === activeSubcategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || `${tool.title} ${tool.description} ${tool.categoryLabel}`.toLowerCase().includes(query);
    return matchesCategory && matchesSubcategory && matchesSearch;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 dir-rtl" dir="rtl">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">منصة الأدوات التفاعلية</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">أدوات رقمية</h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              اختر قطاعًا، ثم ابدأ بالأداة التي تساعدك على اتخاذ الخطوة التالية.
            </p>
          </div>
          <Link
            href="/dashboard/tools"
            className="inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-5 py-3 rounded-xl transition-colors"
          >
            <FolderCheck className="w-5 h-5" />
            <span>أدواتي المحفوظة</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-2xl">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أداة أو حاسبة..."
            aria-label="البحث في الأدوات الرقمية"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-12 pl-4 py-3.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Main Categories Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-end justify-between gap-4 mb-4"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-400">01 / القطاعات</p><h2 className="mt-1 text-xl font-bold text-white">من أين نبدأ؟</h2></div><span className="text-xs text-slate-500">{TOOLS_REGISTRY.length} أدوات في السجل</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveSubcategory('الكل');
              }}
              aria-pressed={activeCategory === cat.id}
              className={`flex items-start gap-3 p-4 rounded-xl border text-right transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className={`p-2 rounded-lg ${activeCategory === cat.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`} aria-hidden="true">
                <cat.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <span><span className="block font-semibold text-sm sm:text-base">{cat.name}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{cat.description}</span></span>
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories Filter Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div id="tool-subcategories" className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4" role="tablist" aria-label="الفروع الفرعية">
          <button
            type="button"
            onClick={() => setActiveSubcategory('الكل')}
            role="tab"
            aria-selected={activeSubcategory === 'الكل'}
            aria-controls="tools-results"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSubcategory === 'الكل'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            الكل
          </button>
          {SUBCATEGORIES[activeCategory]?.map((sub) => (
            <button
              type="button"
              key={sub}
              onClick={() => setActiveSubcategory(sub)}
              role="tab"
              aria-selected={activeSubcategory === sub}
              aria-controls="tools-results"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSubcategory === sub
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Display Grid */}
      <div id="tools-results" role="tabpanel" aria-label="نتائج الأدوات الرقمية" className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-400">02 / الأدوات</p><h2 className="mt-1 text-xl font-bold text-white">الأحدث في هذا القطاع</h2></div><span className="text-xs text-slate-500">{filteredTools.length} نتيجة</span></div>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const Icon = ICONS[tool.iconName] ?? Calculator;
              return (
              <div
                key={tool.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:shadow-lg group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-800/80 rounded-xl"><Icon className="w-6 h-6 text-emerald-400" /></div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                      {tool.isNew ? 'جديدة' : new Date(tool.createdAt).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{tool.description}</p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                  <span className="text-xs text-slate-500 font-medium">{tool.subcategory}</span>
                  <Link
                    href={`/tools/${tool.category}/${tool.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>تشغيل الأداة</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-lg">لا توجد أدوات متاحة ضمن هذا الفرع حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
}