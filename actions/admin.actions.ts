"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ensureAdminAccess } from "@/lib/admin";
import { createPostService, deletePostService, updatePostService } from "@/services/posts.service";
import { parsePostFormData } from "@/lib/validations/post.schema";
import { deleteRoleSchema, upsertRoleSchema } from "@/lib/validations/role.schema";
import type { Json } from "@/types/database.types";

type AuditDetails = { [key: string]: Json | undefined };

async function writeAuditLog(action: string, targetResource: string, details: AuditDetails) {
  const { user } = await ensureAdminAccess();
  const supabase = await createClient();
  const { error } = await supabase.from("audit_logs").insert({
    user_id: user.id,
    email: user.email ?? null,
    action,
    target_resource: targetResource,
    details,
  });

  if (error) console.warn("تعذر تسجيل العملية الإدارية:", error.message);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "حدث خطأ غير متوقع";
}

export async function createAdminPostAction(formData: FormData) {
  try {
    await ensureAdminAccess();
    const post = await createPostService(parsePostFormData(formData));
    await writeAuditLog("create_post", "posts", { targetId: post.id, title: post.title, status: post.status });
    revalidatePath("/admin/content");
    revalidatePath("/admin/content/manage");
    revalidatePath("/articles");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateAdminPostAction(formData: FormData) {
  try {
    await ensureAdminAccess();
    const post = await updatePostService(parsePostFormData(formData, true));
    await writeAuditLog("update_post", "posts", { targetId: post.id, title: post.title, status: post.status });
    revalidatePath("/admin/content");
    revalidatePath("/admin/content/manage");
    revalidatePath("/articles");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteAdminPostAction(postId: string) {
  try {
    await ensureAdminAccess();
    const id = Number(postId);
    if (!Number.isInteger(id) || id <= 0) throw new Error("معرف المقال غير صالح");
    await deletePostService(id);
    await writeAuditLog("delete_post", "posts", { targetId: id });
    revalidatePath("/admin/content");
    revalidatePath("/admin/content/manage");
    revalidatePath("/articles");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function upsertAdminRoleAction(formData: FormData) {
  try {
    await ensureAdminAccess();
    const input = upsertRoleSchema.parse({
      userId: formData.get("userId")?.toString().trim() || null,
      email: formData.get("email")?.toString().trim() || null,
      role: formData.get("role")?.toString().trim() || "user",
    });
    const supabase = await createClient();
    const { error } = await supabase.from("user_roles").upsert({
      user_id: input.userId,
      email: input.email,
      role: input.role,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    if (error) throw new Error(error.message);
    await writeAuditLog("assign_role", "user_roles", input);
    revalidatePath("/admin/roles");
    revalidatePath("/admin/users");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteAdminRoleAction(userId: string) {
  try {
    await ensureAdminAccess();
    const id = deleteRoleSchema.parse(userId);
    const supabase = await createClient();
    const { error } = await supabase.from("user_roles").delete().eq("user_id", id);
    if (error) throw new Error(error.message);
    await writeAuditLog("remove_role", "user_roles", { userId: id });
    revalidatePath("/admin/roles");
    revalidatePath("/admin/users");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

