import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/services/auth.service";
import type { CreatePostInput, UpdatePostInput } from "@/lib/validations/post.schema";
import { sanitizeHtml } from "@/lib/sanitize";
import { cache } from "react";

export const getPostsService = cache(async function getPostsService({
  page = 1,
  limit = 10,
  status = "published",
  category,
}: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
} = {}) {
  const supabase = await createClient();
  const safePage = Math.max(1, Math.floor(page));
  const safeLimit = Math.min(100, Math.max(1, Math.floor(limit)));
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;

  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("status", status)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category) query = query.eq("category", category);

  const { data, count, error } = await query;
  if (error) {
    console.error("خطأ في جلب المقالات:", error.message);
    throw new Error("تعذر جلب المقالات من قاعدة البيانات");
  }

  return { posts: data ?? [], totalCount: count ?? 0 };
});

export async function getPostBySlugService(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();
  if (error) {
    console.error("خطأ في جلب المقال:", error.message);
    return null;
  }
  return data;
}

export async function createPostService(input: CreatePostInput) {
  const user = await getCurrentUser();
  if (!user) throw new Error("غير مصرح لك بإجراء هذه العملية");

  const supabase = await createClient();
  const safeInput = { ...input, content: sanitizeHtml(input.content) };
  const { data, error } = await supabase
    .from("posts")
    .insert({ ...safeInput, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    console.error("خطأ في إنشاء المقال:", error.message);
    throw new Error("فشل في إنشاء المقال");
  }
  return data;
}

export async function updatePostService(input: UpdatePostInput) {
  const { id, ...updates } = input;
  const supabase = await createClient();
  const safeUpdates = updates.content ? { ...updates, content: sanitizeHtml(updates.content) } : updates;
  const { data, error } = await supabase
    .from("posts")
    .update({ ...safeUpdates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("خطأ في تحديث المقال:", error.message);
    throw new Error("فشل في تحديث المقال");
  }
  return data;
}

export async function deletePostService(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    console.error("خطأ في حذف المقال:", error.message);
    throw new Error("فشل في حذف المقال");
  }
}
