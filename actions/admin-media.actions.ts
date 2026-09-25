"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function ensureMediaAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("يجب تسجيل الدخول.");

  const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
  if (!role || !["admin", "super_admin"].includes(role.role)) throw new Error("ليس لديك صلاحية إدارة الوسائط.");
  return supabase;
}

export async function deleteArticleMediaAction(path: string) {
  if (!path || path.includes("..") || path.startsWith("/")) throw new Error("مسار الملف غير صالح.");
  const supabase = await ensureMediaAdmin();
  const { error } = await supabase.storage.from("article-images").remove([path]);
  if (error) throw new Error(`تعذر حذف الملف: ${error.message}`);
  revalidatePath("/admin/media");
}