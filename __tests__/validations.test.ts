import { describe, expect, it } from "vitest";
import { createPostSchema, parsePostFormData, updatePostSchema } from "@/lib/validations/post.schema";
import { sanitizeHtml } from "@/lib/sanitize";
import { getUserRoleDisplayName } from "@/utils/dashboard";
import { ARTICLE_SECTORS } from "@/lib/constants/sectors";
import { getCanonicalArticlePath, toCategorySlug, toSubcategorySlug } from "@/lib/articlePaths";
import {
  generateArticleContent,
  getArticleDisplayContent,
} from "@/utils/generatedArticleContent";
import { selectRelatedArticles } from "@/components/articles/RelatedArticles";
import type { Article } from "@/services/articles.service";
import { prepareArticleHeadings } from "@/lib/articleHeadings";
import { cleanArticleSpeechText, splitSpeechText } from "@/utils/articleSpeechText";
import {
  formatArticleReadingTime,
  getArticleReadingMinutes,
  getArticleReadingTime,
  WORDS_PER_READING_MINUTE,
} from "@/utils/articleReadingTime";

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

  it("preserves safe generated heading IDs through HTML sanitization", () => {
    expect(sanitizeHtml('<h2 id="article-heading-section-1">Section</h2>')).toContain(
      '<h2 id="article-heading-section-1">Section</h2>',
    );
    expect(sanitizeHtml('<h2 id="bad id">Section</h2>')).not.toContain('id="bad id"');
  });
});

describe("Article heading extraction", () => {
  it("adds unique IDs to H2 and H3 headings and returns their text and hierarchy", () => {
    const { content, headings } = prepareArticleHeadings(
      "<h2>مقدمة &amp; أهداف</h2><h3>خطوة أولى</h3><h2 id=\"existing\">مقدمة &amp; أهداف</h2><h4>تجاهل</h4>",
    );

    expect(headings).toEqual([
      { id: "article-heading-مقدمة-أهداف", text: "مقدمة & أهداف", level: 2 },
      { id: "article-heading-خطوة-أولى", text: "خطوة أولى", level: 3 },
      { id: "article-heading-مقدمة-أهداف-2", text: "مقدمة & أهداف", level: 2 },
    ]);
    expect(content).toContain('<h2 id="article-heading-مقدمة-أهداف">');
    expect(content).toContain('<h2 id="article-heading-مقدمة-أهداف-2">');
    expect(content).toContain("<h4>تجاهل</h4>");
  });
});

describe("Article speech text", () => {
  it("cleans HTML and Markdown while excluding code, images, and formatting", () => {
    const text = cleanArticleSpeechText(
      "# **مرحباً** بالعالم\n\n<p>نص عربي مع &amp; ترميز.</p>\n\n`inline code` ![صورة](https://example.com/image.png)\n\n```ts\nconst secret = true;\n```\n\n[رابط مفيد](https://example.com)",
    );

    expect(text).toContain("مرحباً بالعالم");
    expect(text).toContain("نص عربي مع & ترميز.");
    expect(text).toContain("رابط مفيد");
    expect(text).not.toContain("inline code");
    expect(text).not.toContain("secret");
    expect(text).not.toContain("example.com");
    expect(text).not.toContain("صورة");
  });

  it("splits long text into speech-friendly chunks with source offsets", () => {
    const text = "أ".repeat(140) + " كلمة. " + "ب".repeat(140);
    const chunks = splitSpeechText(text, 160);

    expect(chunks).toHaveLength(2);
    expect(chunks[0].start).toBe(0);
    expect(chunks[1].start).toBeGreaterThan(0);
    expect(chunks.every((chunk) => chunk.text.length <= 160)).toBe(true);
  });

  it("hard-splits words longer than the maximum chunk length", () => {
    const chunks = splitSpeechText("ك".repeat(25), 10);

    expect(chunks.map((chunk) => chunk.text.length)).toEqual([10, 10, 5]);
    expect(chunks.map((chunk) => chunk.start)).toEqual([0, 10, 20]);
  });
});

describe("Article reading time", () => {
  it("calculates minutes from cleaned article words with a one-minute minimum", () => {
    expect(getArticleReadingMinutes("<p>كلمة&nbsp; أخرى</p>")).toBe(1);
    expect(getArticleReadingMinutes("كلمة ".repeat(220))).toBe(1);
    expect(getArticleReadingMinutes("كلمة ".repeat(221))).toBe(2);
    expect(getArticleReadingMinutes("")).toBe(1);
  });

  it("formats Arabic minute quantities consistently", () => {
    expect(formatArticleReadingTime(1)).toBe("دقيقة واحدة");
    expect(formatArticleReadingTime(2)).toBe("دقيقتان");
    expect(formatArticleReadingTime(5)).toBe("5 دقائق");
    expect(formatArticleReadingTime(11)).toBe("11 دقيقة");
    expect(getArticleReadingTime("كلمة ".repeat(221))).toBe("دقيقتان");
  });

  it("uses the same generated draft content as the article page for short source content", () => {
    const article = {
      title: "دليل عملي",
      description: "ملخص قصير",
      categorySlug: "tech",
      categoryLabel: "التكنولوجيا",
      subcategoryLabel: "الابتكار",
      topicLabel: "الأدوات",
      content: "ملخص قصير",
    };
    const displayContent = getArticleDisplayContent(article);
    const displayWordCount = cleanArticleSpeechText(displayContent).match(/\S+/g)?.length ?? 0;

    expect(displayContent).toBe(generateArticleContent(article));
    expect(getArticleReadingMinutes(displayContent)).toBe(
      Math.max(1, Math.ceil(displayWordCount / WORDS_PER_READING_MINUTE)),
    );
    expect(getArticleReadingMinutes(displayContent)).toBeGreaterThan(
      getArticleReadingMinutes(article.content),
    );
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
