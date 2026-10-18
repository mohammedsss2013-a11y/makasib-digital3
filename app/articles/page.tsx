import Link from "next/link";
import type { Metadata } from "next";
import { TrendingUp, Cpu, Tv, Brain, BookOpen, Search, Sparkles, Clock, ArrowLeft } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import { articlesService } from "@/services/articles.service";
import { getArticlePath } from "@/lib/articlePaths";
import { Badge } from "@/components/ui/Badge";
import { ArticleViewsCount } from "@/components/articles/ArticleViewsCount";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "جميع المقالات | مكاسب رقمية",
  description: "أرشيف المقالات الكامل لمدونة مكاسب رقمية — تحليلات وأدلة عملية في المال والأعمال، التكنولوجيا، الإعلام الرقمي، وأسلوب الحياة الرقمي.",
  alternates: { canonical: "/articles" },
};

const CATEGORIES = [
  { id: "finance", label: "المال والأعمال", icon: TrendingUp, color: "text-emerald-500", bgLight: "bg-emerald-500/10", href: "/finance" },
  { id: "tech", label: "التكنولوجيا", icon: Cpu, color: "text-blue-500", bgLight: "bg-blue-500/10", href: "/tech" },
  { id: "media", label: "الإعلام الجديد", icon: Tv, color: "text-purple-500", bgLight: "bg-purple-500/10", href: "/media" },
  { id: "digital-lifestyle", label: "أسلوب الحياة الرقمي", icon: Brain, color: "text-amber-500", bgLight: "bg-amber-500/10", href: "/digital-lifestyle" },
];

export default async function ArticlesIndexPage() {
  const allArticles = await articlesService.getAllArticles();

  // Group by category
  const grouped: Record<string, typeof allArticles> = {};
  for (const article of allArticles) {
    if (!grouped[article.categorySlug]) grouped[article.categorySlug] = [];
    grouped[article.categorySlug].push(article);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-16 py-8 dir-rtl px-4 sm:px-6">
      {/* ── Page Header ── */}
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-primary)]/30 bg-[var(--accent-light)] px-4 py-1.5 text-xs font-bold text-[var(--accent-primary)]">
          <Sparkles className="h-3.5 w-3.5" />
          أرشيف المقالات الكاملة
        </div>
        <h1 id="articles-heading" className="text-4xl font-black tracking-tight text-[var(--text-main)] sm:text-5xl">
          جميع المقالات
        </h1>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          تحليلات عمقية، أدلة تطبيقية، ومحتوى مختار يساعدك على الارتقاء برقميّتك واتخاذ قرارات أذكى.
        </p>
        <p className="text-xs font-semibold text-[var(--accent-primary)]">
          {allArticles.length} مقال منشور
        </p>
      </header>

      {/* ── Category Filter Chips ── */}
      <nav aria-label="تصفية حسب القسم" className="flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-primary)] bg-[var(--accent-light)] px-5 py-2 text-xs font-bold text-[var(--accent-primary)] shadow-xs">
          <BookOpen className="h-3.5 w-3.5" />
          الجميع
        </span>
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} href={cat.href}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-main)]/80 bg-[var(--bg-card)] px-5 py-2 text-xs font-medium text-[var(--text-muted)] transition-all hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-main)] whitespace-nowrap cursor-pointer">
              <cat.icon className={`h-3.5 w-3.5 ${cat.color}`} />
              {cat.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* ── Articles by Category ── */}
      {CATEGORIES.map((cat) => {
        const articles = (grouped[cat.id] || []).slice(0, 6);
        if (articles.length === 0) return null;
        return (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-main)]/60 pb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${cat.bgLight}`}>
                  <cat.icon className={`h-4.5 w-4.5 ${cat.color}`} />
                </div>
                <h2 id={`cat-${cat.id}`} className="text-xl font-black text-[var(--text-main)]">
                  {cat.label}
                </h2>
                <Badge variant="outline" size="sm" className="font-semibold">
                  {(grouped[cat.id] || []).length} مقال
                </Badge>
              </div>
              <Link
                href={cat.href}
                className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-primary)] transition-all hover:opacity-80"
              >
                عرض الكل <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={getArticlePath(article)}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-main)]/70 bg-[var(--bg-card)]/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-primary)]/50 hover:shadow-lg"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-muted)]">
                    <AppImage
                      src={article.coverImage}
                      alt={article.coverImageAlt || article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <Badge variant="accent" size="sm" className="backdrop-blur-md bg-[var(--bg-surface)]/90 font-bold shadow-xs text-[10px]">
                        {article.subcategoryLabel}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1 p-4 space-y-3">
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[var(--text-main)] transition-colors group-hover:text-[var(--accent-primary)]">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
                        {article.description}
                      </p>
                    )}
                    {/* Meta */}
                    <div className="flex items-center justify-between border-t border-[var(--border-main)]/50 pt-3 text-[11px] text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <ArticleViewsCount initialCount={article.viewsCount} className="text-[11px]" />
                      <span className="font-bold text-[var(--accent-primary)] transition-transform group-hover:-translate-x-1 flex items-center gap-1">
                        قراءة <ArrowLeft className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* ── Empty State ── */}
      {allArticles.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--border-main)] p-16 text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-[var(--text-muted)] opacity-30" />
          <p className="text-sm font-semibold text-[var(--text-muted)]">لا توجد مقالات منشورة حاليًا.</p>
        </div>
      )}
    </div>
  );
}
