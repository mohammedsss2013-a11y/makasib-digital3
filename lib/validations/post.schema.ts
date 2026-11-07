import { z } from "zod";

export const PostStatusEnum = z.enum(["draft", "published", "archived"]);

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().nullable();

const coverImageUrl = z.string()
  .trim()
  .url("رابط الصورة غير صالح")
  .refine((value) => {
    try {
      return new URL(value).protocol === "https:";
    } catch {
      return false;
    }
  }, "يجب أن يستخدم رابط الصورة اتصالًا آمنًا");

export const createPostSchema = z.object({
  title: z.string().trim().min(5, "عنوان المقال يجب أن يكون 5 أحرف على الأقل").max(180, "عنوان المقال لا يتجاوز 180 حرفًا"),
  slug: z.string().trim().min(3, "الرابط اللطيف قصير جدًا").regex(/^[a-z0-9-]+$/, "الرابط اللطيف يجب أن يحتوي على أحرف إنجليزية صغيرة ورقم وشرطات فقط"),
  content: z.string().trim().min(50, "محتوى المقال يجب أن لا يقل عن 50 حرفًا"),
  category: z.string().trim().min(1, "القسم مطلوب").max(100),
  subcategory: optionalText(100),
  topic: optionalText(100),
  description: optionalText(300),
  image_url: coverImageUrl,
  image_alt: optionalText(180),
  article_type: z.string().trim().min(1).max(50).default("guide"),
  tool_slug: optionalText(100),
  status: PostStatusEnum.default("draft"),
});

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.coerce.number().int().positive("معرف المقال غير صالح"),
}).superRefine((post, context) => {
  if (post.status === "published" && !post.image_url) {
    context.addIssue({
      code: "custom",
      path: ["image_url"],
      message: "أضف صورة غلاف قبل نشر المقال",
    });
  }
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export function parsePostFormData(formData: FormData): CreatePostInput;
export function parsePostFormData(formData: FormData, includeId: true): UpdatePostInput;
export function parsePostFormData(formData: FormData, includeId = false): CreatePostInput | UpdatePostInput {
  const title = formData.get("title")?.toString().trim() ?? "";
  const submittedSlug = formData.get("slug")?.toString().trim() ?? "";
  const generatedSlug = submittedSlug ||
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-") ||
    `post-${Date.now()}`;
  const rawInput = {
    title,
    slug: generatedSlug,
    content: formData.get("content")?.toString() ?? "",
    category: formData.get("category")?.toString() || "general",
    subcategory: formData.get("subcategory")?.toString() || null,
    topic: formData.get("topic")?.toString() || null,
    description: formData.get("description")?.toString() || null,
    image_url: formData.get("image_url")?.toString() || null,
    image_alt: formData.get("image_alt")?.toString() || null,
    article_type: formData.get("article_type")?.toString() || "guide",
    tool_slug: formData.get("tool_slug")?.toString() || null,
    status: formData.get("status")?.toString() || "draft",
  };

  if (!includeId) return createPostSchema.parse(rawInput);

  const updateInput: Record<string, unknown> = {
    id: formData.get("postId")?.toString(),
  };
  for (const [key, value] of Object.entries(rawInput)) {
    if (formData.has(key) && value !== "") updateInput[key] = value;
  }

  return updatePostSchema.parse(updateInput);
}
