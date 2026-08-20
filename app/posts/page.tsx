import Link from 'next/link';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const supabase = await createServerClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500 text-center">حدث خطأ أثناء جلب المقالات: {error.message}</div>;
  }

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
            {posts?.length || 0} مقال
          </span>
        </div>
      </header>
      
      {posts?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="border border-slate-800 rounded-2xl p-5 shadow-lg shadow-black/10 hover:border-emerald-500/40 transition-colors bg-slate-900 flex flex-col justify-between min-h-[280px]">
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
                  <Link href={`/posts/${post.id}`} className="hover:text-emerald-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <div 
                  className="text-slate-400 text-sm line-clamp-3 mb-4 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                />
              </div>
              
              <div className="text-xs text-slate-500 mt-2 border-t border-slate-800 pt-3">
                <Link href={`/posts/${post.id}`} className="hover:text-emerald-400 transition-colors">
                  قراءة المقال · {new Date(post.created_at).toLocaleDateString('ar-EG')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-2xl p-10">لا توجد مقالات منشورة حتى الآن.</p>
      )}
    </div>
  );
}
