import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getArticlesBySubcategory } from "@/data/articles";

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export function generateStaticParams() {
  return Array.from(
    new Set(
      ARTICLES_PATHS.map((path) => `${path.category}/${path.subcategory}`),
    ),
  ).map((path) => {
    const [category, subcategory] = path.split("/");
    return { category, subcategory };
  });
}

const ARTICLES_PATHS = [
  { category: "tech", subcategory: "ai" },
  { category: "finance", subcategory: "freelancing" },
];

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, subcategory } = await params;
  const articles = getArticlesBySubcategory(category, subcategory);
  const section = articles[0];

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-6 dir-rtl">
      <header className="border-b border-slate-800/80 pb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
          <BookOpen className="h-4 w-4" /> المكتبة المعرفية
        </div>
        <h1 className="text-3xl font-black text-white sm:text-4xl">
          {section?.subcategoryLabel ?? `قسم: ${subcategory}`}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          تصفح المقالات والأدلة العملية التابعة لهذا الفرع.
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          لا توجد مقالات متوفرة في هذا القسم حاليًا.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.categorySlug}/${article.subcategorySlug}/${article.slug}`}
              className="group flex min-h-64 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900"
            >
              <div>
                <div className="mb-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">{article.categoryLabel}</span>
                  <span className="rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-slate-400">{article.readTime}</span>
                </div>
                <h2 className="text-xl font-bold leading-8 text-white transition-colors group-hover:text-emerald-300">{article.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">{article.description}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500">
                <span>{new Date(article.publishedAt).toLocaleDateString("ar-EG")}</span>
                <span className="flex items-center gap-2 font-bold text-emerald-300">قراءة المقال <ArrowLeft className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
