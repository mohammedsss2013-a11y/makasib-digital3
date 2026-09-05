import { z } from "zod";

export const ToolCategoryEnum = z.enum(["finance", "tech", "media", "digital-lifestyle"]);
export const ToolStatusEnum = z.enum(["active", "inactive", "archived"]);

export const createToolSchema = z.object({
  title: z.string().trim().min(3, "اسم الأداة يجب أن يكون 3 أحرف على الأقل").max(100, "اسم الأداة طويل جدًا"),
  slug: z.string().trim().min(3, "الرابط المختصر يجب أن يكون 3 أحرف على الأقل").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "الرابط المختصر يجب أن يحتوي على حروف إنجليزية صغيرة وأرقام وشرطات فقط"),
  description: z.string().trim().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل").max(500, "الوصف طويل جدًا"),
  category: ToolCategoryEnum,
  iconName: z.string().trim().min(1).max(50).default("Wrench"),
  status: ToolStatusEnum.default("active"),
});

export type CreateToolInput = z.infer<typeof createToolSchema>;
