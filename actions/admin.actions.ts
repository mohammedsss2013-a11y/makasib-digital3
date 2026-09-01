"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

const ADMIN_EMAIL = "mohammed.sss2013@gmail.com";

async function ensureAdminAccess() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("غير مسجل الدخول");
  }

  if (user.email === ADMIN_EMAIL) {
    return { supabase, user };
  }

  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!roleData || !["super_admin", "admin"].includes(roleData.role)) {
    throw new Error("ليس لديك صلاحية الإدارة");
  }

  return { supabase, user };
}

async function writeAuditLog(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: { id: string; email?: string | null },
  action: string,
  resource: string,
  details?: Record<string, unknown>,
) {
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    email: user.email ?? null,
    action,
    target_resource: resource,
    details: details ?? {},
  });
}

export async function createAdminPostAction(formData: FormData) {
  const { supabase, user } = await ensureAdminAccess();

  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "general";
  const subcategory = formData.get("subcategory")?.toString().trim() || null;
  const description = formData.get("description")?.toString().trim() || null;
  const slug = formData.get("slug")?.toString().trim() || title?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-") || "post";
  const status = formData.get("status")?.toString() || "draft";

  if (!title || !content) {
    throw new Error("العنوان والمحتوى مطلوبان");
  }

  const payload = {
    title,
    content,
    category,
    subcategory,
    description,
    slug,
    status,
    article_type: "guide",
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("posts").insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  await writeAuditLog(supabase, user, "create_post", "posts", { title, status });
  revalidatePath("/admin/content");
  revalidatePath("/admin/content/manage");
}

export async function updateAdminPostAction(formData: FormData) {
  const { supabase, user } = await ensureAdminAccess();

  const postId = formData.get("postId")?.toString();
  const title = formData.get("title")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const category = formData.get("category")?.toString().trim() || "general";
  const subcategory = formData.get("subcategory")?.toString().trim() || null;
  const description = formData.get("description")?.toString().trim() || null;
  const slug = formData.get("slug")?.toString().trim() || "post";
  const status = formData.get("status")?.toString() || "draft";

  if (!postId || !title || !content) {
    throw new Error("بيانات المقال غير مكتملة");
  }

  const { error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      category,
      subcategory,
      description,
      slug,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", Number(postId));

  if (error) {
    throw new Error(error.message);
  }

  await writeAuditLog(supabase, user, "update_post", "posts", { postId, title, status });
  revalidatePath("/admin/content");
  revalidatePath("/admin/content/manage");
}

export async function deleteAdminPostAction(postId: string) {
  const { supabase, user } = await ensureAdminAccess();

  const { error } = await supabase.from("posts").delete().eq("id", Number(postId));

  if (error) {
    throw new Error(error.message);
  }

  await writeAuditLog(supabase, user, "delete_post", "posts", { postId });
  revalidatePath("/admin/content");
  revalidatePath("/admin/content/manage");
}

export async function upsertAdminRoleAction(formData: FormData) {
  const { supabase, user } = await ensureAdminAccess();

  const userId = formData.get("userId")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const role = formData.get("role")?.toString().trim() || "user";

  if (!userId && !email) {
    throw new Error("يجب إدخال معرف المستخدم أو البريد الإلكتروني");
  }

  const payload = {
    user_id: userId || null,
    email: email || null,
    role,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("user_roles").upsert(payload, { onConflict: "user_id" });

  if (error) {
    throw new Error(error.message);
  }

  await writeAuditLog(supabase, user, "assign_role", "user_roles", { userId, email, role });
  revalidatePath("/admin/roles");
  revalidatePath("/admin/users");
}

export async function deleteAdminRoleAction(userId: string) {
  const { supabase, user } = await ensureAdminAccess();

  const { error } = await supabase.from("user_roles").delete().eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  await writeAuditLog(supabase, user, "remove_role", "user_roles", { userId });
  revalidatePath("/admin/roles");
  revalidatePath("/admin/users");
}
