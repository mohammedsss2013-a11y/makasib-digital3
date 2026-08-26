import { ARTICLES_DATA, Article, getArticle } from "@/data/articles";
import { createClient } from "@/lib/supabase/server";

export interface ArticleSlugPath {
  category: string;
  subcategory: string;
  slug: string;
}

export const articlesService = {
  async getAllSlugPaths(): Promise<ArticleSlugPath[]> {
    // 1. مسارات البيانات المحلية الثابتة
    const localPaths: ArticleSlugPath[] = ARTICLES_DATA.map((item) => ({
      category: item.categorySlug,
      subcategory: item.subcategorySlug,
      slug: item.slug,
    }));

    // 2. مسارات المقالات من قاعدة البيانات Supabase (اختياري عند توفرها)
    try {
      const supabase = await createClient();
      const { data: posts } = await supabase
        .from("posts")
        .select("id, category, subcategory");

      if (posts && posts.length > 0) {
        const dbPaths: ArticleSlugPath[] = posts
          .filter((p) => p.category && p.subcategory)
          .map((p) => ({
            category: p.category as string,
            subcategory: p.subcategory as string,
            slug: String(p.id),
          }));
        return [...localPaths, ...dbPaths];
      }
    } catch {
      // التجاوز واستخدام المسارات المحلية عند عدم الاتصال بالسيرفر
    }

    return localPaths;
  },

  async getBySlug(category: string, subcategory: string, slug: string): Promise<Article | null> {
    // 1. البحث في البيانات المحلية
    const localArticle = getArticle(category, subcategory, slug);
    if (localArticle) return localArticle;

    // 2. البحث في قاعدة البيانات Supabase
    try {
      const supabase = await createClient();
      const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("id", Number(slug) || 0)
        .single();

      if (post) {
        return {
          id: String(post.id),
          slug: String(post.id),
          title: post.title,
          description: post.content.slice(0, 150) + "...",
          categorySlug: post.category || category,
          subcategorySlug: post.subcategory || subcategory,
          categoryLabel: post.category || category,
          subcategoryLabel: post.subcategory || subcategory,
          author: "فريق تحرير مكاسب",
          publishedAt: post.created_at,
          readTime: "5 دقائق",
          content: post.content,
        };
      }
    } catch {
      // خطأ أثناء جلب المقال من السيرفر
    }

    return null;
  },

  async getAllArticles(): Promise<Article[]> {
    return ARTICLES_DATA;
  },
};
