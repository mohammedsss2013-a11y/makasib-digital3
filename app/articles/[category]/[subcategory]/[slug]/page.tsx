import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Clock3, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { articlesService } from "@/services/articles.service";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { SectionInteractiveTools } from "@/components/articles/SectionInteractiveTools";
import ArticleToolEmbedder from "@/components/articles/ArticleToolEmbedder";
import ArticleInteractiveBoundary from "@/components/articles/ArticleInteractiveBoundary";

// The article query uses the SSR Supabase client, which reads request cookies.
export const dynamic = "force-dynamic";

// السماح بتوليد الصفحات غير المُنشأة مسبقاً عند أول طلب (On-Demand ISR)
export const dynamicParams = true;

// إنشاء المسارات الثابتة أثناء عملية الـ Build
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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, subcategory, slug } = await params;
  let article;

  try {
    article = await articlesService.getBySlug(category, subcategory, slug);
  } catch (error) {
    console.error("تعذر جلب المقال:", error);
    notFound();
  }

  if (!article) notFound();

  return (
    <article className="mx-auto max-w-4xl py-6 dir-rtl" dir="rtl">
      <nav aria-label="مسار المقال" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-emerald-300">الرئيسية</Link>
        <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        <Link href={`/${article.categorySlug}`} className="hover:text-emerald-300">{article.categoryLabel}</Link>
        <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        <Link href={`/articles/${article.categorySlug}/${article.subcategorySlug}`} className="hover:text-emerald-300">{article.subcategoryLabel}</Link>
      </nav>

      <header className="space-y-5 border-b border-slate-800/80 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
          <BookOpen className="h-4 w-4" /> مقال تطبيقي
        </div>
        <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">{article.title}</h1>
        <p className="text-base leading-8 text-slate-400 sm:text-lg">{article.description}</p>
        <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
          <span className="flex items-center gap-2"><UserRound className="h-4 w-4 text-emerald-400" />{article.author}</span>
          <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-emerald-400" />{article.readTime}</span>
          <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("ar-EG")}</time>
        </div>
        <div className="relative mt-6 aspect-[16/7] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <AppImage src={article.coverImage} alt={article.coverImageAlt} fallbackType="article" fill priority sizes="(max-width: 768px) 100vw, 896px" className="object-cover" />
        </div>
      </header>

      <div className="prose prose-invert prose-emerald mt-10 max-w-none text-slate-300">
        <ArticleInteractiveBoundary>
          <ArticleToolEmbedder content={article.content} />
        </ArticleInteractiveBoundary>
      </div>

      {article.categorySlug === "finance" && article.subcategorySlug === "freelancing" && (
        <div className="mt-12 border-t border-slate-800 pt-10">
          <ArticleInteractiveBoundary>
            <SectionInteractiveTools section="finance" />
          </ArticleInteractiveBoundary>
        </div>
      )}

      <div className="mt-12 border-t border-slate-800 pt-6">
        <Link href={`/articles/${article.categorySlug}/${article.subcategorySlug}`} className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">
          <ArrowRight className="h-4 w-4" /> العودة إلى مقالات القسم
        </Link>
      </div>
    </article>
  );
}
