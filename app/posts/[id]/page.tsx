import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function SinglePostPage({ params }: PostPageProps) {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-4 dir-rtl" dir="rtl">
      <Link href="/posts" className="inline-flex text-sm text-emerald-400 hover:text-emerald-300 mb-6">
        العودة إلى المقالات
      </Link>
      <div className="flex gap-2 mb-4">
        <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-sm px-3 py-1 rounded-full">
          {post.category}
        </span>
        {post.subcategory && (
          <span className="bg-slate-900 text-slate-400 border border-slate-800 text-sm px-3 py-1 rounded-full">
            {post.subcategory}
          </span>
        )}
      </div>

      <h1 className="text-4xl font-black mb-3 text-white">{post.title}</h1>
      <p className="text-sm text-slate-500 mb-8">
        تاريخ النشر: {new Date(post.created_at).toLocaleDateString('ar-EG')}
      </p>
      
      <div 
        className="prose prose-lg prose-invert max-w-none text-slate-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
      />
    </article>
  );
}