import { createPublicClient } from "@/lib/supabase/public";
import { toCategorySlug, toSubcategorySlug, toTopicSlug } from "@/lib/articlePaths";

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  subcategorySlug: string;
  topicSlug: string;
  categoryLabel: string;
  subcategoryLabel: string;
  topicLabel: string;
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

const articleFields = "id, title, content, category, subcategory, topic, image_url, slug, description, image_alt, created_at";

function getCategoryLabel(category: string | null, fallback: string) {
  const normalized = toCategorySlug(category);
  if (normalized === "finance") return "المال والأعمال";
  if (normalized === "tech") return "التكنولوجيا والابتكار";
  if (normalized === "media") return "الإعلام الجديد";
  if (normalized === "digital-lifestyle") return "رقميون - أسلوب الحياة الرقمي";
  return category || fallback;
}

export const articlesService = {
  async getAllSlugPaths(): Promise<ArticleSlugPath[]> {
    try {
      const supabase = createPublicClient();
      const { data: posts } = await supabase
        .from("posts")
        .select("id, slug, category, subcategory, status")
        .eq("status", "published");

      if (!posts || posts.length === 0) {
        return [];
      }

      const paths: ArticleSlugPath[] = [];
      for (const post of posts) {
        if (!post.category || !post.subcategory) continue;
        const catSlug = toCategorySlug(post.category);
        const subcatSlug = toSubcategorySlug(post.category, post.subcategory);
        const articleSlug = post.slug || `post-${post.id}`;

        paths.push({ category: catSlug, subcategory: subcatSlug, slug: articleSlug });
        if (subcatSlug === "freelance-economy") {
          paths.push({ category: catSlug, subcategory: "freelancing", slug: articleSlug });
        }
      }
      return paths;
    } catch {
      return [];
    }
  },

  async getBySlug(category: string, subcategory: string, slug: string): Promise<Article | null> {
    try {
      const supabase = createPublicClient();

      // 1. البحث باسم الـ slug المباشر (دون تقييد خانة الفئة في الاستعلام لاستيعاب الأسماء بالعربية والإنجليزية)
      let { data: post } = await supabase
        .from("posts")
        .select(articleFields)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      // 2. المحاولة عن طريق الـ ID الرقمي في حال كان الـ slug رقماً
      if (!post) {
        const numericId = Number(slug);
        if (!isNaN(numericId) && numericId > 0) {
          const res = await supabase
            .from("posts")
            .select(articleFields)
            .eq("id", numericId)
            .eq("status", "published")
            .maybeSingle();
          post = res.data;
        }
      }

      // 3. المحاولة بالأسماء المستعارة لمقال تسعير القيمة في حال ادخل الزائر رابط قديم
      if (!post && (slug.includes("value") || slug.includes("pricing") || slug.includes("hourly"))) {
        const res = await supabase
          .from("posts")
          .select(articleFields)
          .eq("slug", "from-hourly-to-value-based-pricing")
          .eq("status", "published")
          .maybeSingle();
        post = res.data;
      }

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
        categoryLabel: getCategoryLabel(post.category, category),
        subcategoryLabel: post.subcategory || subcategory,
        topicSlug: toTopicSlug(post.topic),
        topicLabel: post.topic || "",
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
      const supabase = createPublicClient();
      const { data: posts } = await supabase
        .from("posts")
        .select(articleFields)
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
          categoryLabel: getCategoryLabel(post.category, "عام"),
          subcategoryLabel: post.subcategory || "عام",
          topicSlug: toTopicSlug(post.topic),
          topicLabel: post.topic || "",
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
