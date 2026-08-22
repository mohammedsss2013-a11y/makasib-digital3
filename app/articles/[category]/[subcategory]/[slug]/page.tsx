import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { ARTICLES_DATA, getArticle } from "@/data/articles";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return ARTICLES_DATA.map(({ categorySlug, subcategorySlug, slug }) => ({
    category: categorySlug,
    subcategory: subcategorySlug,
    slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, subcategory, slug } = await params;
  const article = getArticle(category, subcategory, slug);

  if (!article) notFound();

  const paragraphs = article.content.split("\n\n");

  return (
    <article className="mx-auto max-w-4xl py-6 dir-rtl">
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
      </header>

      <div className="prose prose-invert prose-emerald mt-10 max-w-none text-slate-300">
        {paragraphs.map((paragraph, index) => {
          const isList = /^\d+\./.test(paragraph.trim());
          if (isList) {
            return (
              <ol key={index} className="list-decimal space-y-2 pr-6 leading-8 marker:text-emerald-400">
                {paragraph.split("\n").map((item) => <li key={item}>{item.replace(/^\d+\.\s*/, "")}</li>)}
              </ol>
            );
          }
          return <p key={index} className="leading-9">{paragraph}</p>;
        })}
      </div>

      <div className="mt-12 border-t border-slate-800 pt-6">
        <Link href={`/articles/${article.categorySlug}/${article.subcategorySlug}`} className="inline-flex items-center gap-2 text-sm font-bold text-emerald-300 hover:text-emerald-200">
          <ArrowRight className="h-4 w-4" /> العودة إلى مقالات القسم
        </Link>
      </div>
    </article>
  );
}
