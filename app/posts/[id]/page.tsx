import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { getArticlePath } from '@/lib/articlePaths';

// التوليد الثابت مع التحديث الدوري (ISR) كل ساعة
export const revalidate = 3600;
export const dynamicParams = true;

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getPost(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('posts')
    .select('id, title, content, category, subcategory, image_url, slug, created_at')
    .eq('id', id)
    .single();
  return data;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: 'المقال غير موجود | مكاسب رقمية' };

  return {
    title: `${post.title} | مكاسب رقمية`,
    description: post.content.replace(/<[^>]*>/g, '').slice(0, 155),
    alternates: { canonical: getArticlePath(post) },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.content.replace(/<[^>]*>/g, '').slice(0, 155),
      images: post.image_url ? [{ url: post.image_url, alt: post.title }] : undefined,
    },
  };
}

export default async function SinglePostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) return notFound();

  redirect(getArticlePath(post));
}