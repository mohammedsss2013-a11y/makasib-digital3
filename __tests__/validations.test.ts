import { describe, expect, it } from "vitest";
import { createPostSchema, parsePostFormData, updatePostSchema } from "@/lib/validations/post.schema";
import { sanitizeHtml } from "@/lib/sanitize";
import { getUserRoleDisplayName } from "@/utils/dashboard";

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
