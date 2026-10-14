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

type ArticleRouteRow = {
  id: number | string;
  slug: string | null;
  category: string | null;
  subcategory: string | null;
};

function getUniqueArticleSlugs(posts: ArticleRouteRow[]) {
  const slugs = posts.map((post) => post.slug || `post-${post.id}`);
  const routeKeys = posts.map((post, index) =>
    `${toCategorySlug(post.category)}/${toSubcategorySlug(post.category, post.subcategory)}/${slugs[index]}`,
  );
  const routeCounts = new Map<string, number>();

  for (const routeKey of routeKeys) {
    routeCounts.set(routeKey, (routeCounts.get(routeKey) ?? 0) + 1);
  }

  return posts.map((post, index) =>
    (routeCounts.get(routeKeys[index]) ?? 0) > 1
      ? `post-${post.id}-${slugs[index]}`
      : slugs[index],
  );
}

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
      const routeSlugs = getUniqueArticleSlugs(posts);
      for (const [index, post] of posts.entries()) {
        if (!post.category || !post.subcategory) continue;
        const catSlug = toCategorySlug(post.category);
        const subcatSlug = toSubcategorySlug(post.category, post.subcategory);
        const articleSlug = routeSlugs[index];

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

      // A slug may be shared by posts in different categories; resolve it in route context.
      const { data: slugMatches, error: slugError } = await supabase
        .from("posts")
        .select(articleFields)
        .eq("slug", slug)
        .eq("status", "published");

      if (slugError) throw slugError;

      const matchingPosts = slugMatches ?? [];
      let post = matchingPosts.find((candidate) =>
        toCategorySlug(candidate.category) === toCategorySlug(category)
        && toSubcategorySlug(candidate.category, subcategory) === toSubcategorySlug(candidate.category, candidate.subcategory),
      ) ?? (matchingPosts.length === 1 ? matchingPosts[0] : null);
      let resolvedRouteSlug: string | null = null;

      // 2. إذا لم يُعثر عليه بالـ slug وكان رقماً أو بمعرف post- / article-
      if (!post) {
        const idMatch = slug.match(/^(?:post-|article-)?(\d+)(?:-.*)?$/);
        if (idMatch) {
          const numericId = Number(idMatch[1]);
          if (!isNaN(numericId) && numericId > 0) {
            const res = await supabase
              .from("posts")
              .select(articleFields)
              .eq("id", numericId)
              .eq("status", "published")
              .maybeSingle();
            if (res.error) throw res.error;
            post = res.data;
            if (post) resolvedRouteSlug = slug;
          }
        }
      }

      // 3. دعم محدد وحصري لرابط المقال الجديد المستعار دون التأثير على بقية المقالات
      if (!post && (slug === "value-pricing-freelancing" || slug === "value-based-pricing")) {
        const res = await supabase
          .from("posts")
          .select(articleFields)
          .eq("slug", "from-hourly-to-value-based-pricing")
          .eq("status", "published")
          .maybeSingle();
        if (res.error) throw res.error;
        post = res.data;
      }

      if (!post) {
        return null;
      }

      const content = typeof post.content === "string" ? post.content : "";
      const description = post.description || `${content.slice(0, 150).replace(/<[^>]*>/g, "").trim()}...`;

      return {
        id: String(post.id),
        slug: resolvedRouteSlug || post.slug || `post-${post.id}`,
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
    } catch (error) {
      console.error("تعذر جلب المقال من قاعدة البيانات:", error);
      throw error;
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

      const routeSlugs = getUniqueArticleSlugs(posts);
      return posts.map((post, index) => {
        const content = typeof post.content === "string" ? post.content : "";

        return {
          id: String(post.id),
          slug: routeSlugs[index],
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
