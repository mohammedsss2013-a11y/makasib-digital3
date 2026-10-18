import { describe, expect, it } from "vitest";
import { createPostSchema, parsePostFormData, updatePostSchema } from "@/lib/validations/post.schema";
import { sanitizeHtml } from "@/lib/sanitize";
import { getUserRoleDisplayName } from "@/utils/dashboard";
import { ARTICLE_SECTORS } from "@/lib/constants/sectors";
import { getCanonicalArticlePath, toCategorySlug, toSubcategorySlug } from "@/lib/articlePaths";
import { generateArticleContent } from "@/utils/generatedArticleContent";
import { selectRelatedArticles } from "@/components/articles/RelatedArticles";
import type { Article } from "@/services/articles.service";

const validPost = {
  title: "عنوان مقال تجريبي مفيد",
  slug: "valid-slug-123",
  content: "هذا نص محتوى تجريبي يتجاوز الخمسين حرفًا لضمان نجاح التحقق من بيانات المقال بشكل صحيح.",
  category: "finance",
  status: "published" as const,
};

describe("Post validation", () => {
  it("accepts a valid post", () => {
    expect(createPostSchema.safeParse(validPost).success).toBe(true);
  });

  it("rejects invalid title, slug, and short content", () => {
    const result = createPostSchema.safeParse({
      ...validPost,
      title: "قصير",
      slug: "Invalid Slug!",
      content: "محتوى قصير",
    });
    expect(result.success).toBe(false);
  });

  it("allows partial updates with the numeric post id", () => {
    const result = updatePostSchema.safeParse({ id: 12, status: "archived" });
    expect(result.success).toBe(true);
  });

  it("parses the admin form and generates a slug when omitted", () => {
    const formData = new FormData();
    formData.set("title", "Testing Post Title");
    formData.set("content", validPost.content);
    formData.set("category", "finance");
    formData.set("status", "draft");

    const result = parsePostFormData(formData);
    expect(result.slug).toBe("testing-post-title");
  });
});

describe("HTML sanitization", () => {
  it("removes dangerous elements and preserves safe markup", () => {
    const cleaned = sanitizeHtml("<p>نص آمن</p><script>alert('XSS')</script><a href='https://example.com'>رابط</a>");

    expect(cleaned).toContain("<p>نص آمن</p>");
    expect(cleaned).toContain("<a href=\"https://example.com\" rel=\"noopener noreferrer\">رابط</a>");
    expect(cleaned).not.toContain("script");
    expect(cleaned).not.toContain("alert");
  });

  it("rejects unsafe URL protocols", () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">رابط</a>')).not.toContain("javascript:");
  });
});

describe("Dashboard role labels", () => {
  it("maps persisted roles to the correct dashboard labels", () => {
    expect(getUserRoleDisplayName("super_admin")).toBe("مدير النظام الرئيسي");
    expect(getUserRoleDisplayName("admin")).toBe("مدير نظام");
    expect(getUserRoleDisplayName("editor")).toBe("محرر");
    expect(getUserRoleDisplayName("user")).toBe("عضو (Member)");
    expect(getUserRoleDisplayName("member")).toBe("عضو (Member)");
    expect(getUserRoleDisplayName(null)).toBe("عضو (Member)");
  });
});

describe("Article taxonomy", () => {
  it("keeps the approved 4x3x3 taxonomy shape", () => {
    expect(ARTICLE_SECTORS).toHaveLength(4);
    for (const sector of ARTICLE_SECTORS) {
      expect(sector.branches).toHaveLength(3);
      for (const branch of sector.branches) expect(branch.topics).toHaveLength(3);
    }
  });

  it("maps legacy branches into the approved taxonomy without dropping content", () => {
    expect(toCategorySlug("التكنولوجيا والابتكار")).toBe("tech");
    expect(toSubcategorySlug("finance", "التجارة الإلكترونية")).toBe("freelance-economy");
    expect(toSubcategorySlug("media", "البودكاست")).toBe("content-creation");
    expect(toSubcategorySlug("digital-lifestyle", "إدارة الحياة الرقمية")).toBe("remote-work");
  });

  it("supports the live route slugs used by the app while preserving legacy aliases", () => {
    expect(toCategorySlug("technology")).toBe("tech");
    expect(toCategorySlug("digitalists")).toBe("digital-lifestyle");
    expect(toSubcategorySlug("finance", "ecommerce")).toBe("ecommerce");
    expect(toSubcategorySlug("media", "podcasting")).toBe("podcasting");
    expect(toSubcategorySlug("digital-lifestyle", "culture")).toBe("culture");
  });

  it("builds article links from canonical category, subcategory, and article slugs", () => {
    expect(getCanonicalArticlePath({
      categorySlug: "tech",
      subcategorySlug: "artificial-intelligence",
      slug: "active-article",
    })).toBe("/articles/tech/artificial-intelligence/active-article");
  });
});

describe("Related articles", () => {
  const makeArticle = (
    id: string,
    categorySlug: string,
    subcategorySlug: string,
    publishedAt: string,
  ): Article => ({
    id,
    slug: `article-${id}`,
    title: `Article ${id}`,
    description: "",
    categorySlug,
    subcategorySlug,
    topicSlug: "",
    categoryLabel: categorySlug,
    subcategoryLabel: subcategorySlug,
    topicLabel: "",
    author: "",
    publishedAt,
    readTime: "5 دقائق",
    viewsCount: 0,
    coverImage: "",
    coverImageAlt: "",
    content: "",
  });

  it("prioritizes the same normalized subcategory, excludes the current article, then fills from other categories", () => {
    const current = makeArticle("current", "finance", "ecommerce", "2026-10-18");
    const articles = [
      current,
      makeArticle("fallback", "media", "gaming", "2026-10-17"),
      makeArticle("same-category", "finance", "investment", "2026-10-16"),
      makeArticle("same-subcategory", "finance", "ecommerce", "2026-10-15"),
      makeArticle("same-both-newer", "finance", "ecommerce", "2026-10-16"),
      makeArticle("newer-fallback", "tech", "cybersecurity", "2026-10-18"),
    ];

    expect(selectRelatedArticles(current, articles).map((article) => article.id)).toEqual([
      "same-both-newer",
      "same-subcategory",
      "same-category",
    ]);

    expect(
      selectRelatedArticles(current, [
        current,
        articles[1],
        articles[3],
        articles[5],
      ]).map((article) => article.id),
    ).toEqual(["same-subcategory", "newer-fallback", "fallback"]);
  });
});

describe("Generated article drafts", () => {
  it("creates structured, category-specific Arabic drafts", () => {
    const categories = [
      ["finance", "المال والأعمال"],
      ["tech", "التكنولوجيا والابتكار"],
      ["media", "الإعلام الجديد"],
      ["digital-lifestyle", "أسلوب الحياة الرقمي"],
    ] as const;

    for (const [categorySlug, categoryLabel] of categories) {
      const content = generateArticleContent({
        title: "دليل عملي للنمو المستدام",
        description: "خطوات تساعد على اتخاذ قرار أوضح.",
        categorySlug,
        categoryLabel,
        subcategoryLabel: "مسار متخصص",
        topicLabel: "موضوع المقال",
      });

      expect(content).toContain("## مقدمة");
      expect(content).toContain("### ابدأ بالسياق");
      expect(content).toContain("- ");
      expect(content).toContain("## خلاصة");
      expect(content.length).toBeGreaterThan(1800);
    }

    expect(generateArticleContent({
      title: "اختبار التقنية",
      description: "",
      categorySlug: "tech",
      categoryLabel: "التكنولوجيا والابتكار",
      subcategoryLabel: "الابتكار",
      topicLabel: "",
    })).toContain("الخصوصية");
  });
});
