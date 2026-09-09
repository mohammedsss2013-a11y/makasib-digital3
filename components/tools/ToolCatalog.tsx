'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  BarChart2,
  BookOpen,
  Bookmark,
  Calculator,
  Clock,
  DollarSign,
  FileText,
  Heart,
  PenTool,
  Search,
  Server,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  Video,
  Wrench,
  Zap,
} from 'lucide-react';
import { TOOLS_REGISTRY, type ToolItem } from '@/config/toolsRegistry';
import { DynamicToolRenderer } from '@/components/tools/DynamicToolRenderer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/providers/ToastProvider';

const iconMap = {
  Activity,
  BarChart2,
  BookOpen,
  Calculator,
  Clock,
  DollarSign,
  FileText,
  Heart,
  PenTool,
  Server,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  Video,
  Wrench,
  Zap,
} as const;

type CategoryFilter = 'all' | ToolItem['category'];

const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'كل القطاعات' },
  { id: 'finance', label: 'مال وأعمال' },
  { id: 'tech', label: 'تكنولوجيا' },
  { id: 'media', label: 'إعلام' },
  { id: 'digital-lifestyle', label: 'حياة رقمية' },
];

export default function ToolCatalog({ tools = TOOLS_REGISTRY }: { tools?: ToolItem[] }) {
  const allTools = useMemo(() => tools, [tools]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [activeId, setActiveId] = useState(allTools[0]?.id ?? '');
  const [isBookmarking, setIsBookmarking] = useState(false);
  const { showToast } = useToast();

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ar');
    return allTools.filter((tool) => {
      const matchesCategory = category === 'all' || tool.category === category;
      const searchableText = `${tool.title} ${tool.description} ${tool.categoryLabel} ${tool.subcategory}`.toLocaleLowerCase('ar');
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [allTools, category, query]);

  const activeTool = filteredTools.find((tool) => tool.id === activeId) ?? filteredTools[0] ?? null;

  const handleBookmark = async () => {
    if (!activeTool) return;
    setIsBookmarking(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        showToast('يرجى تسجيل الدخول لحفظ الأدوات في مفضلتك', 'info');
        return;
      }

      const { error } = await supabase.from('saved_tools').insert({
        user_id: user.id,
        category: activeTool.category,
        tool_slug: activeTool.slug,
        tool_title: activeTool.title,
        inputs: {},
        outputs: {},
      });

      if (error) {
        if (error.code === '23505') {
          showToast('الأداة محفوطة بالفعل في قائمة مفضلتك', 'info');
        } else {
          showToast('حدث خطأ أثناء حفظ الأداة', 'error');
        }
      } else {
        showToast('تمت إضافة الأداة بنجاح إلى لوحة المفضلة الخاصة بك', 'success');
      }
    } catch {
      showToast('تعذر الاتصال بالخادم لحفظ الأداة', 'error');
    } finally {
      setIsBookmarking(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Search and Filters */}
      <Card className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <span className="sr-only">البحث عن أداة</span>
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن أداة أو موضوع..."
            className="h-11 w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-main)] pr-10 pl-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
          />
        </label>
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="group" aria-label="تصفية الأدوات حسب القطاع">
          {categoryFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={category === filter.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setCategory(filter.id)}
              className="shrink-0"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
        {/* Tools List */}
        <section aria-labelledby="tools-list-title" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="tools-list-title" className="text-sm font-bold text-[var(--text-main)]">الأدوات المتاحة</h2>
            <span className="text-xs text-[var(--text-muted)]">{filteredTools.length} من {allTools.length}</span>
          </div>
          {filteredTools.length ? (
            filteredTools.map((tool) => {
              const Icon = iconMap[tool.iconName as keyof typeof iconMap] ?? Sparkles;
              const isActive = activeTool?.id === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveId(tool.id)}
                  aria-pressed={isActive}
                  className="w-full text-right block"
                >
                  <Card
                    hoverEffect
                    className={`flex items-start gap-3 p-4 transition-colors ${
                      isActive ? 'border-[var(--accent-primary)] bg-[var(--accent-light)]' : ''
                    }`}
                  >
                    <span className={`rounded-xl p-2 shrink-0 ${isActive ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-muted)] text-[var(--accent-primary)]'}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-sm text-[var(--text-main)]">{tool.title}</strong>
                      <span className="mt-1 block text-xs leading-6 text-[var(--text-muted)]">{tool.description}</span>
                      <span className="mt-2 flex items-center gap-2 text-[11px]">
                        <Badge variant="accent" size="sm">{tool.categoryLabel}</Badge>
                        <Badge variant="outline" size="sm">{tool.isInteractive === false ? 'تعريفية' : 'تفاعلية'}</Badge>
                      </span>
                    </span>
                  </Card>
                </button>
              );
            })
          ) : (
            <Card className="p-6 text-center text-sm text-[var(--text-muted)]">
              لا توجد أدوات مطابقة للبحث الحالي.
            </Card>
          )}
        </section>

        {/* Active Tool View */}
        <section aria-labelledby="active-tool-title" className="min-w-0">
          {activeTool ? (
            <Card className="p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-main)] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="active-tool-title" className="text-lg font-black text-[var(--text-main)]">{activeTool.title}</h2>
                    <Badge variant="accent" size="sm">{activeTool.categoryLabel}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{activeTool.subcategory}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    isLoading={isBookmarking}
                    icon={<Bookmark className="h-4 w-4 text-[var(--accent-primary)]" />}
                  >
                    حفظ في المفضلة
                  </Button>
                </div>
              </div>

              {activeTool.isCatalogOnly || activeTool.isInteractive === false ? (
                <div className="rounded-2xl border border-dashed border-[var(--border-main)] bg-[var(--bg-main)] p-8 text-center">
                  <p className="text-sm font-bold text-[var(--text-main)]">هذه الأداة مضافة إلى سجل المنصة</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">سيتم ربط واجهتها التفاعلية عند اكتمال تطويرها.</p>
                </div>
              ) : (
                <DynamicToolRenderer slug={activeTool.slug} />
              )}
            </Card>
          ) : (
            <Card className="p-8 text-center text-sm text-[var(--text-muted)]">
              اختر أداة لبدء الاستخدام.
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
