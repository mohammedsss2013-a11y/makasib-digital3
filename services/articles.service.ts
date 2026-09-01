import { createClient } from "@/lib/supabase/server";
import { toCategorySlug, toSubcategorySlug } from "@/lib/articlePaths";

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  subcategorySlug: string;
  categoryLabel: string;
  subcategoryLabel: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  coverImageAlt: string;
  content: string;
}

export interface ArticleSlugPath {
  category: string;
  subcategory: string;
  slug: string;
}

export const articlesService = {
  async getAllSlugPaths(): Promise<ArticleSlugPath[]> {
    try {
      const supabase = await createClient();
      const { data: posts } = await supabase
        .from("posts")
        .select("id, slug, category, subcategory, status")
        .eq("status", "published");

      if (!posts || posts.length === 0) {
        return [];
      }

      return posts
        .filter((post) => post.category && post.subcategory)
        .map((post) => ({
          category: toCategorySlug(post.category),
          subcategory: toSubcategorySlug(post.category, post.subcategory),
          slug: post.slug || `post-${post.id}`,
        }));
    } catch {
      return [];
    }
  },

  async getBySlug(category: string, subcategory: string, slug: string): Promise<Article | null> {
    try {
      const supabase = await createClient();

      const { data: postBySlug } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      const post = postBySlug || (await supabase
        .from("posts")
        .select("*")
        .eq("id", Number(slug) || 0)
        .eq("status", "published")
        .maybeSingle()).data;

      if (!post) {
        return null;
      }

      const content = typeof post.content === "string" ? post.content : "";
      const description = post.description || `${content.slice(0, 150).replace(/<[^>]*>/g, "").trim()}...`;

      return {
        id: String(post.id),
        slug: post.slug || `post-${post.id}`,
        title: post.title,
        description,
        categorySlug: toCategorySlug(post.category) || category,
        subcategorySlug: toSubcategorySlug(post.category, post.subcategory) || subcategory,
        categoryLabel: post.category || category,
        subcategoryLabel: post.subcategory || subcategory,
        author: "فريق تحرير مكاسب",
        publishedAt: post.created_at || new Date().toISOString(),
        readTime: "5 دقائق",
        coverImage: post.image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85",
        coverImageAlt: post.title,
        content,
      };
    } catch {
      return null;
    }
  },

  async getAllArticles(): Promise<Article[]> {
    try {
      const supabase = await createClient();
      const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (!posts || posts.length === 0) {
        return [];
      }

      return posts.map((post) => {
        const content = typeof post.content === "string" ? post.content : "";

        return {
          id: String(post.id),
          slug: post.slug || `post-${post.id}`,
          title: post.title,
          description: post.description || `${content.slice(0, 150).replace(/<[^>]*>/g, "").trim()}...`,
          categorySlug: toCategorySlug(post.category),
          subcategorySlug: toSubcategorySlug(post.category, post.subcategory),
          categoryLabel: post.category || "عام",
          subcategoryLabel: post.subcategory || "عام",
          author: "فريق تحرير مكاسب",
          publishedAt: post.created_at || new Date().toISOString(),
          readTime: "5 دقائق",
          coverImage: post.image_url || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=85",
          coverImageAlt: post.title,
          content,
        };
      });
    } catch {
      return [];
    }
  },
};
