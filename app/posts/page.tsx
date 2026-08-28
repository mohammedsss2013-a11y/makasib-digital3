import Link from 'next/link';
import Image from 'next/image';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { getHtmlExcerpt } from '@/utils/sanitizeHtml';
import { getArticlePath } from '@/lib/articlePaths';

export const revalidate = 60;
const PAGE_SIZE = 12;

interface PostsPageProps {
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { page } = await searchParams;
  const requestedPage = Number.parseInt(typeof page === 'string' ? page : '1', 10);
  const pageNumber = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const from = (pageNumber - 1) * PAGE_SIZE;
  const supabase = await createServerClient();
  const { data: posts, error, count } = await supabase
    .from('posts')
    .select('id, title, content, category, subcategory, image_url, slug, created_at, status', { count: 'exact' })
    .eq('status', 'published')
    .order('id', { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center" dir="rtl">
        <h1 className="text-lg font-bold text-red-200">تعذر تحميل المقالات</h1>
        <p className="mt-2 text-sm text-red-300">حدث خلل مؤقت أثناء الاتصال. حاول تحديث الصفحة لاحقًا.</p>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
  const currentPage = Math.min(pageNumber, totalPages);

  return (
    <div className="space-y-8 py-4" dir="rtl">
      <header className="border-b border-slate-800/80 pb-6">
        <p className="text-xs font-bold text-emerald-400 mb-2">المكتبة المعرفية</p>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-black text-white">جميع المقالات</h1>
            <p className="text-sm text-slate-400 mt-2">أفكار وأدلة عملية حول المال والتكنولوجيا والحياة الرقمية.</p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5">
            {count || 0} مقال
          </span>
        </div>
      </header>
      
      {posts?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="border border-slate-800 rounded-2xl p-5 shadow-lg shadow-black/10 hover:border-emerald-500/40 transition-colors bg-slate-900 flex flex-col justify-between min-h-[280px]">
              <div className="relative mb-5 aspect-[16/8] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                <Image src={post.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div>
                <div className="flex gap-2 mb-3">
                  {post.category && (
                    <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                  )}
                  {post.subcategory && (
                    <span className="bg-slate-950 text-slate-400 border border-slate-800 text-xs px-2.5 py-1 rounded-full font-medium">
                      {post.subcategory}
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  <Link href={getArticlePath(post)} className="hover:text-emerald-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-400 text-sm leading-7 line-clamp-3 mb-4">
                  {getHtmlExcerpt(post.content)}
                </p>
              </div>
              
              <div className="text-xs text-slate-500 mt-2 border-t border-slate-800 pt-3">
                <Link href={getArticlePath(post)} className="hover:text-emerald-400 transition-colors">
                  قراءة المقال · {new Date(post.created_at).toLocaleDateString('ar-EG')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl p-10">لا توجد مقالات منشورة حتى الآن.</p>
      )}

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-3 border-t border-slate-800/80 pt-6" aria-label="التنقل بين صفحات المقالات">
          {currentPage > 1 ? (
            <Link href={`/posts?page=${currentPage - 1}`} className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-300">
              السابق
            </Link>
          ) : (
            <span className="rounded-lg border border-slate-800 px-4 py-2 text-sm text-slate-600">السابق</span>
          )}
          <span className="text-sm text-slate-500" aria-current="page">
            صفحة {currentPage} من {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link href={`/posts?page=${currentPage + 1}`} className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-300">
              التالي
            </Link>
          ) : (
            <span className="rounded-lg border border-slate-800 px-4 py-2 text-sm text-slate-600">التالي</span>
          )}
        </nav>
      )}
    </div>
  );
}
