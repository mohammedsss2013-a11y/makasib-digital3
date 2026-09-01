import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { articlesService } from "@/services/articles.service";

interface SubcategoryArticlesFeedProps {
  category: string;
  subcategory: string;
  title: string;
  description: string;
  keywords?: string[];
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function SubcategoryArticlesFeed({
  category,
  subcategory,
  title,
  description,
  keywords = [],
}: SubcategoryArticlesFeedProps) {
  const articles = await articlesService.getAllArticles();
  const searchTerms = [subcategory, title, ...keywords].filter(Boolean);

  const filteredArticles = articles.filter((article) => {
    if (article.categorySlug !== category) return false;

    const isDirectMatch = article.subcategorySlug === subcategory;
    const haystack = [
      article.title,
      article.description,
      article.content,
      article.subcategoryLabel,
      article.categoryLabel,
    ]
      .join(" ")
      .toLowerCase();

    const matchesReference = searchTerms.some((term) => {
      const normalizedTerm = normalizeText(term);
      if (!normalizedTerm) return false;
      return haystack.includes(normalizeText(term));
    });

    return isDirectMatch || matchesReference;
  });

  return (
    <div className="space-y-8 py-6 dir-rtl" dir="rtl">
      <header className="rounded-[28px] border border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            مقالات مكاسب رقمية
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black text-white sm:text-4xl">{title}</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
          </div>
        </div>
      </header>

      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center text-sm text-slate-400">
          لا توجد مقالات منشورة في هذا الفرع حاليًا. جرّب قسمًا آخر أو عد إلى القائمة الكاملة.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:-translate-y-1 hover:border-emerald-500/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-800 bg-slate-950">
                <Image
                  src={article.coverImage}
                  alt={article.coverImageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] text-slate-300">
                      {article.subcategoryLabel}
                    </span>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                      مقال معرفي
                    </span>
                  </div>

                  <h2 className="text-lg font-black leading-8 text-white transition-colors group-hover:text-emerald-300">
                    <Link href={`/articles/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">{article.description}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("ar-EG")}
                  </time>
                  <Link
                    href={`/articles/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`}
                    className="inline-flex items-center gap-2 font-bold text-emerald-300 hover:text-emerald-200"
                  >
                    قراءة المقال <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
