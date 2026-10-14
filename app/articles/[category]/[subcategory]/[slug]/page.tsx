import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Clock3, UserRound, Calendar, Sparkles } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { articlesService } from "@/services/articles.service";
import { SectionInteractiveTools } from "@/components/articles/SectionInteractiveTools";
import ArticleToolEmbedder from "@/components/articles/ArticleToolEmbedder";
import ArticleInteractiveBoundary from "@/components/articles/ArticleInteractiveBoundary";
import { ArticleTableOfContents } from "@/components/articles/ArticleTableOfContents";
import { ReadingProgress } from "@/components/articles/ReadingProgress";
import { ArticleSpeechControls } from "@/components/articles/ArticleSpeechControls";
import { Badge } from "@/components/ui/Badge";
import { isMarkdown, markdownToHtml } from "@/utils/markdownToHtml";
import { generateArticleContent } from "@/utils/generatedArticleContent";

// تمكين إعادة التحقق التزايدي الذكي (ISR) كل ساعة
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const articles = await articlesService.getAllSlugPaths();

    return articles.map((article) => ({
      category: article.category,
      subcategory: article.subcategory,
      slug: article.slug,
    }));
  } catch (error) {
    console.error("تعذر إنشاء المسارات الثابتة للمقالات:", error);
    return [];
  }
}

interface ArticlePageProps {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, subcategory, slug } = await params;
  try {
    const article = await articlesService.getBySlug(category, subcategory, slug);
    if (!article) return { title: "المقال غير موجود | مكاسب رقمية" };

    return {
      title: `${article.title} | مكاسب رقمية`,
      description: article.description,
      alternates: { canonical: `/articles/${article.categorySlug}/${article.subcategorySlug}/${article.slug}` },
      openGraph: {
        type: "article",
        title: article.title,
        description: article.description,
        images: [{ url: article.coverImage, alt: article.coverImageAlt }],
      },
    };
  } catch (error) {
    console.error("تعذر إنشاء بيانات المقال الوصفية:", error);
    return { title: "المقال غير موجود | مكاسب رقمية" };
  }
}

/** Short seeded summaries are not complete article bodies. */
function isContentRich(content: string): boolean {
  if (!content) return false;
  // Strip HTML tags
  const stripped = content.replace(/<[^>]*>/g, " ").replace(/[#*_`>~\[\]]/g, " ").replace(/\s+/g, " ").trim();
  return stripped.length > 1200;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, subcategory, slug } = await params;
  let article;

  try {
    article = await articlesService.getBySlug(category, subcategory, slug);
  } catch (error) {
    console.error("تعذر جلب المقال:", error);
    throw error;
  }

  if (!article) notFound();
  if (article.categorySlug !== category || article.subcategorySlug !== subcategory) {
    redirect(`/articles/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`);
  }

  // Pre-process content: convert Markdown → HTML for both TOC and renderer
  const hasRichContent = isContentRich(article.content);
  const articleContent = hasRichContent
    ? article.content
    : generateArticleContent(article);
  const processedContent = isMarkdown(articleContent) ? markdownToHtml(articleContent) : articleContent;
  const speechText = processedContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  return (
    <>
      {/* ── Fixed Reading Progress Bar ── */}
      <ReadingProgress />

      {/* ── Single-Column Optimized Reading Container (65-75 chars per line) ── */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 dir-rtl space-y-10" dir="rtl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="مسار المقال" className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--accent-primary)] transition-colors">
            الرئيسية
          </Link>
          <ArrowRight className="h-3.5 w-3.5 rotate-180 opacity-60" />
          <Link href={`/${article.categorySlug}`} className="hover:text-[var(--accent-primary)] transition-colors">
            {article.categoryLabel}
          </Link>
          <ArrowRight className="h-3.5 w-3.5 rotate-180 opacity-60" />
          <Link href={`/articles/${article.categorySlug}/${article.subcategorySlug}`} className="hover:text-[var(--accent-primary)] transition-colors">
            {article.subcategoryLabel}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="accent" size="sm" className="font-bold">
              <BookOpen className="h-3 w-3" />
              {article.categoryLabel}
            </Badge>
            <span className="text-xs text-[var(--text-muted)]">•</span>
            <span className="text-xs font-semibold text-[var(--text-muted)]">{article.subcategoryLabel}</span>
          </div>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-[var(--text-main)] sm:text-5xl">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-base sm:text-xl leading-relaxed text-[var(--text-muted)] font-normal">
              {article.description}
            </p>
          )}

          {/* Author, Read Time & Date Bar directly under title */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[var(--border-main)]/70 py-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] font-bold text-sm shadow-xs">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-[var(--text-main)] text-sm">{article.author}</p>
                <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] mt-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock3 className="h-3 w-3 text-[var(--accent-primary)]" />
                    وقت القراءة: {article.readTime}
                  </span>
                  <span>•</span>
                  <time dateTime={article.publishedAt} className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.publishedAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </div>

            <ArticleSpeechControls text={speechText} />
          </div>

          {/* Immersive Cover Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-[var(--border-main)]/70 bg-[var(--bg-muted)] shadow-md">
            <AppImage
              src={article.coverImage}
              alt={article.coverImageAlt}
              fallbackType="article"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </header>

        {/* ── Content Area ── */}
        {!hasRichContent && (
          <aside className="flex items-start gap-3 rounded-xl border border-[var(--accent-primary)]/25 bg-[var(--accent-light)]/60 p-4 text-sm leading-relaxed text-[var(--text-muted)]" aria-label="حالة المحتوى">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <p>مسودة تحريرية أولية أُعدت بناءً على عنوان المقال وتصنيفه، وتحتاج إلى مراجعة تحريرية قبل اعتمادها.</p>
          </aside>
        )}

        <ArticleTableOfContents content={processedContent} />

        <div className="prose prose-lg dark:prose-invert prose-emerald max-w-none text-[var(--text-main)] prose-headings:font-black prose-headings:tracking-tight prose-p:leading-loose prose-p:text-[var(--text-muted)] prose-li:leading-relaxed prose-img:rounded-2xl">
          <ArticleInteractiveBoundary>
            <ArticleToolEmbedder content={processedContent} />
          </ArticleInteractiveBoundary>
        </div>

        {article.categorySlug === "finance" && article.subcategorySlug === "freelancing" && (
          <div className="border-t border-[var(--border-main)]/70 pt-8 not-prose">
            <ArticleInteractiveBoundary>
              <SectionInteractiveTools section="finance" />
            </ArticleInteractiveBoundary>
          </div>
        )}

        {/* Article Footer & Return Nav */}
        <footer className="border-t border-[var(--border-main)]/70 pt-8 not-prose flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/articles/${article.categorySlug}/${article.subcategorySlug}`}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-main)]/80 bg-[var(--bg-card)] px-4 py-2.5 text-xs font-bold text-[var(--text-main)] shadow-xs transition-all hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى مقالات {article.subcategoryLabel}
          </Link>

          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent-primary)] hover:underline"
          >
            تصفح جميع المقالات ←
          </Link>
        </footer>
      </article>
    </>
  );
}
