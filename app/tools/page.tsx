import Link from 'next/link';
import {
  ArrowLeft,
  FilePlus2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import ToolCatalog from '@/components/tools/ToolCatalog';
import { createClient } from '@/lib/supabase/server';
import { TOOLS_REGISTRY, type ToolItem } from '@/config/toolsRegistry';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const sectorLabels: Record<ToolItem['category'], string> = {
  finance: 'قطاع المال والأعمال',
  tech: 'قطاع التكنولوجيا',
  media: 'قطاع الإعلام الجديد',
  'digital-lifestyle': 'قطاع رقميون',
};

const sectorSubcategories: Record<ToolItem['category'], string> = {
  finance: 'المال والأعمال',
  tech: 'التكنولوجيا',
  media: 'الإعلام الجديد',
  'digital-lifestyle': 'الحياة الرقمية',
};

function isToolCategory(value: string): value is ToolItem['category'] {
  return value in sectorLabels;
}

export default async function ToolsWorkspacePage() {
  const supabase = await createClient();
  const { data: databaseTools, error } = await supabase
    .from('tools')
    .select('id, slug, title, description, sector, icon, is_interactive, created_at')
    .eq('status', 'active')
    .order('created_at', { ascending: true });

  const mappedTools = (databaseTools ?? []).flatMap((tool): ToolItem[] => {
    if (!isToolCategory(tool.sector)) return [];

    return [{
      id: `database-${tool.id}`,
      slug: tool.slug,
      title: tool.title,
      description: tool.description,
      category: tool.sector,
      categoryLabel: sectorLabels[tool.sector],
      subcategory: sectorSubcategories[tool.sector],
      iconName: tool.icon,
      href: `/tools/${tool.sector}/${tool.slug}`,
      createdAt: tool.created_at,
      isInteractive: tool.is_interactive,
      isCatalogOnly: !tool.is_interactive,
    }];
  });

  if (error) {
    console.error('تعذر جلب الأدوات الرقمية من Supabase:', error.message);
  }

  const tools = mappedTools.length > 0 ? mappedTools : TOOLS_REGISTRY;
  return (
    <div className="space-y-8 py-4 dir-rtl" dir="rtl">
      <section className="overflow-hidden rounded-[28px] border border-[var(--border-main)] bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-2xl sm:p-8">
        <div className="space-y-5">
          <Badge variant="accent" size="md">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            منصة أدوات رقمية
          </Badge>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <h1 className="text-3xl font-black text-white sm:text-4xl">أدوات رقمية تفاعلية</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                حاسبات ومولدات عملية مصممة لكل قطاع بحيث يمكنك الانتقال من الفكرة إلى القرار في دقائق بدل التشتت.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" size="md">
              <TrendingUp className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              {tools.length} أداة متاحة
            </Badge>
            <Badge variant="secondary" size="md">
              <ArrowLeft className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              بحث + تصنيف + استخدام فوري
            </Badge>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="border-r-4 border-[var(--accent-primary)] pr-3 text-xl font-bold text-[var(--text-main)]">الأدوات الرقمية الحية</h2>
          <span className="text-[11px] text-[var(--text-muted)]">عرض مباشر</span>
        </div>

        <ToolCatalog tools={tools} />
      </section>

      <Card className="p-5 sm:p-6 bg-[var(--accent-light)] border-[var(--accent-primary)]/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold text-[var(--accent-primary)]">تجربة عملية</p>
            <h2 className="mt-1 text-xl font-black text-[var(--text-main)]">استخدم الأدوات الرقمية المناسبة لقطاعك</h2>
          </div>
          <Link href="/dashboard/tools">
            <Button variant="primary" icon={<FilePlus2 className="h-4 w-4" aria-hidden="true" />}>
              لوحة أدواتي
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}