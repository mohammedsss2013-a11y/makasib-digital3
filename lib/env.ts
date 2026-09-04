import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("رابط Supabase غير صالح"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "مفتاح Supabase Anon مطلوب"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

if (!parsedEnv.success) {
  console.error("خطأ في متغيرات البيئة الخاصة بـ Supabase:", parsedEnv.error.format());
  throw new Error("متغيرات بيئة Supabase مفقودة أو غير صحيحة.");
}

export const env = parsedEnv.data;