import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import type { ReactNode } from "react";
import { ArrowLeft, BookOpen, Database, RefreshCw } from "lucide-react";
import { getHtmlExcerpt } from "@/utils/sanitizeHtml";
import { SubcategoryLinks } from "@/components/articles/SubcategoryLinks";
import { getArticlePath } from "@/lib/articlePaths";
import { getPostsService } from "@/services/posts.service";

interface CategoryArticlesProps {
  category: string;
  categoryLabel: string;
  description: string;
    accent?: "emerald" | "blue" | "rose" | "amber";
  subcategorySection?: "finance" | "tech" | "media" | "lifestyle" | "community";
  interactiveTools?: ReactNode;
}


const accentStyles = {
  emerald: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
  blue: "border-blue-500/30 text-blue-300 bg-blue-500/10",
  rose: "border-rose-500/30 text-rose-300 bg-rose-500/10",
  amber: "border-amber-500/30 text-amber-300 bg-amber-500/10",
};

export async function CategoryArticles({ category, categoryLabel, description, accent = "emerald", subcategorySection, interactiveTools }: CategoryArticlesProps) {
  let posts = null;
  let error = false;
  try {
    posts = (await getPostsService({ category, status: "published", limit: 100 })).posts;
  } catch {
    error = true;
  }

  const style = accentStyles[accent];

  return (
    <div className="space-y-8 py-4 dir-rtl" dir="rtl">
      <header className="border-b border-slate-800/80 pb-8">
        <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${style}`}>
          <BookOpen className="h-4 w-4" /> مدونة مكاسب رقمية
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">{categoryLabel}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{description}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400">
            <Database className="h-3.5 w-3.5 text-emerald-400" /> {posts?.length ?? 0} مقال من قاعدة البيانات
          </span>
        </div>
      </header>

      {subcategorySection && <SubcategoryLinks section={subcategorySection} />}

      {interactiveTools}

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center text-sm text-red-300">
          تعذر جلب مقالات هذا القسم حاليًا. حاول تحديث الصفحة.
        </div>
      ) : posts?.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group flex min-h-72 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/50">
              <div className="relative mb-5 aspect-[16/8] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <AppImage src={post.image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"} alt={post.title} fallbackType="article" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div>
                <div className="mb-4 flex flex-wrap gap-2 text-xs">
                  {post.subcategory && <span className="rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-slate-400">{post.subcategory}</span>}
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">مقال جديد</span>
                </div>
                <h2 className="text-xl font-bold leading-8 text-white transition-colors group-hover:text-emerald-300">
                  <Link href={getArticlePath(post)} className="hover:text-emerald-300">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400">{getHtmlExcerpt(post.content)}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500">
                <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString("ar-EG")}</time>
                <Link href={getArticlePath(post)} className="inline-flex items-center gap-2 font-bold text-emerald-300 hover:text-emerald-200">قراءة المقال <ArrowLeft className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
          <RefreshCw className="mx-auto mb-3 h-8 w-8 text-slate-600" />
          <p className="text-sm text-slate-400">لا توجد مقالات منشورة في هذا القسم حتى الآن.</p>
        </div>
      )}
    </div>
  );
}
