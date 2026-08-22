"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Database, RefreshCw } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { SubcategoryLinks } from "@/components/articles/SubcategoryLinks";

interface Post { id: number; title: string; content: string; subcategory: string | null; created_at: string; }
interface Props { category: string; categoryLabel: string; description: string; subcategorySection?: "tech" | "media" | "lifestyle"; }

export function CategoryArticlesClient({ category, categoryLabel, description, subcategorySection }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.from("posts").select("id, title, content, subcategory, created_at").eq("category", category).order("created_at", { ascending: false }).then(({ data, error: queryError }) => {
      if (!active) return;
      setPosts((data as Post[]) ?? []);
      setError(Boolean(queryError));
      setLoading(false);
    });
    return () => { active = false; };
  }, [category]);

  return <div className="space-y-8 py-4 dir-rtl" dir="rtl">
    <header className="border-b border-slate-800/80 pb-8"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300"><BookOpen className="h-4 w-4" /> مدونة مكاسب رقمية</div><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-black text-white sm:text-4xl">{categoryLabel}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{description}</p></div><span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400"><Database className="h-3.5 w-3.5 text-emerald-400" /> {posts.length} مقال من قاعدة البيانات</span></div></header>
    {subcategorySection && <SubcategoryLinks section={subcategorySection} />}
    {loading ? <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center text-sm text-slate-400">جارٍ تحميل مقالات القسم...</div> : error ? <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center text-sm text-red-300">تعذر جلب مقالات هذا القسم حاليًا.</div> : posts.length ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <article key={post.id} className="group flex min-h-72 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/50"><div><div className="mb-4 flex flex-wrap gap-2 text-xs">{post.subcategory && <span className="rounded-full border border-slate-800 bg-slate-950 px-2.5 py-1 text-slate-400">{post.subcategory}</span>}<span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">مقال جديد</span></div><h2 className="text-xl font-bold leading-8 text-white transition-colors group-hover:text-emerald-300"><Link href={`/posts/${post.id}`} className="hover:text-emerald-300">{post.title}</Link></h2><div className="prose prose-invert mt-3 line-clamp-3 max-w-none text-sm leading-7 text-slate-400" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} /></div><div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-500"><time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString("ar-EG")}</time><Link href={`/posts/${post.id}`} className="inline-flex items-center gap-2 font-bold text-emerald-300">قراءة المقال <ArrowLeft className="h-4 w-4" /></Link></div></article>)}</div> : <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center"><RefreshCw className="mx-auto mb-3 h-8 w-8 text-slate-600" /><p className="text-sm text-slate-400">لا توجد مقالات منشورة في هذا القسم حتى الآن.</p></div>}
  </div>;
}
