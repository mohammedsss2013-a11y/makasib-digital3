import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import type { Metadata } from "next";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { articlesService } from "@/services/articles.service";
import { redirect } from "next/navigation";
import { toSubcategorySlug } from "@/lib/articlePaths";
import { Badge } from "@/components/ui/Badge";
import { ArticleViewsCount } from "@/components/articles/ArticleViewsCount";

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
  searchParams: Promise<{ topic?: string }>;
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const paths = await articlesService.getAllSlugPaths();

  return Array.from(
    new Map(
      paths.map((path) => [`${path.category}/${path.subcategory}`, { category: path.category, subcategory: path.subcategory }]),
    ).values(),
  );
}

export async function generateMetadata({ params, searchParams }: SubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const { topic } = await searchParams;
  const canonicalSubcategory = toSubcategorySlug(category, subcategory);
  if (canonicalSubcategory !== subcategory) {
    redirect(`/articles/${category}/${canonicalSubcategory}${topic ? `?topic=${topic}` : ""}`);
  }
  const article = (await articlesService.getAllArticles()).find(
    (item) => item.categorySlug === category && item.subcategorySlug === subcategory,
  );

  return {
    title: `${article?.subcategoryLabel ?? subcategory} | مكاسب رقمية`,
    description: "أدلة ومقالات عملية تساعدك على اتخاذ خطوة رقمية أوضح.",
    alternates: { canonical: `/articles/${category}/${subcategory}${topic ? `?topic=${topic}` : ""}` },
  };
}

export default async function SubcategoryPage({ params, searchParams }: SubcategoryPageProps) {
  const { category, subcategory } = await params;
  const { topic } = await searchParams;
  const allArticles = await articlesService.getAllArticles();
  const articles = allArticles.filter((item) => {
    return item.categorySlug === category
      && item.subcategorySlug === subcategory
      && (!topic || item.topicSlug === topic);
  });
  const section = articles[0];

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6 dir-rtl">
      {/* Page Header */}
      <header className="border-b border-[var(--border-main)]/70 pb-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-xs text-[var(--text-muted)]" aria-label="مسار التنقل">
          <Link href="/" className="hover:text-[var(--accent-primary)] transition-colors">الرئيسية</Link>
          <span className="opacity-50">/</span>
          <Link href="/articles" className="hover:text-[var(--accent-primary)] transition-colors">المقالات</Link>
          <span className="opacity-50">/</span>
          <span className="text-[var(--text-main)] font-semibold">
            {topic ? (articles[0]?.topicLabel ?? `موضوع: ${topic}`) : (section?.subcategoryLabel ?? `قسم: ${subcategory}`)}
          </span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[var(--text-main)] sm:text-4xl">
              {topic ? (articles[0]?.topicLabel ?? `موضوع: ${topic}`) : (section?.subcategoryLabel ?? `قسم: ${subcategory}`)}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
              المقالات المرتبطة بهذا الفرع، بما في ذلك المقالات التي تذكره أو تتناول موضوعاته بشكل مباشر.
            </p>
          </div>

          {articles.length > 0 && (
            <Badge variant="accent" size="sm" className="font-bold mt-2">
              <BookOpen className="h-3.5 w-3.5" />
              {articles.length} مقال{articles.length !== 1 ? "ات" : ""}
            </Badge>
          )}
        </div>
      </header>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border-main)] bg-[var(--bg-card)]/50 p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-[var(--text-muted)] opacity-40" />
          <p className="text-sm font-semibold text-[var(--text-muted)]">لا توجد مقالات مرتبطة بهذا الفرع حاليًا.</p>
          <p className="mt-1 text-xs text-[var(--text-subtle)]">يتم إضافة مقالات جديدة بشكل منتظم، تابعونا!</p>
          <Link
            href="/articles"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-4 py-2 text-xs font-bold text-[var(--text-main)] transition-all hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)]"
          >
            تصفح جميع المقالات
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-main)]/70 bg-[var(--bg-card)]/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/50 hover:shadow-xl"
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-muted)]">
                <AppImage
                  src={article.coverImage}
                  alt={article.coverImageAlt}
                  fallbackType="article"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category badge overlay */}
                <div className="absolute top-3 right-3">
                  <Badge variant="accent" size="sm" className="backdrop-blur-md bg-[var(--bg-surface)]/90 font-bold shadow-xs">
                    {article.categoryLabel}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 p-6 space-y-4">
                <div className="space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border border-[var(--accent-primary)]/20 bg-[var(--accent-light)] px-2.5 py-1 text-[var(--accent-primary)] font-semibold">
                      {article.subcategoryLabel}
                    </span>
                    {article.topicLabel && (
                      <span className="rounded-full border border-[var(--border-main)]/80 bg-[var(--bg-muted)] px-2.5 py-1 text-[var(--text-muted)]">
                        {article.topicLabel}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold leading-snug text-[var(--text-main)] transition-colors group-hover:text-[var(--accent-primary)]">
                    {article.title}
                  </h2>

                  {/* Description */}
                  {article.description && (
                    <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      {article.description}
                    </p>
                  )}
                </div>

                {/* Footer meta */}
                <div className="flex items-center justify-between border-t border-[var(--border-main)]/60 pt-4 text-xs">
                  <div className="flex items-center gap-3 text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                    <ArticleViewsCount initialCount={article.viewsCount} className="text-[11px]" />
                    <span>•</span>
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString("ar-EG")}
                    </time>
                  </div>
                  <span className="inline-flex items-center gap-1 font-bold text-[var(--accent-primary)] transition-transform group-hover:-translate-x-1">
                    اقرأ المقال
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
