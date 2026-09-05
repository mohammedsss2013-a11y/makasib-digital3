"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ensureAdminAccess } from "@/lib/admin";
import { createToolSchema, type CreateToolInput } from "@/lib/validations/tool.schema";
import { writeAdminAuditLog } from "@/lib/admin-audit";

export async function createToolAction(input: CreateToolInput) {
  const validation = createToolSchema.safeParse(input);
  if (!validation.success) {
    return { success: false as const, error: validation.error.issues[0]?.message ?? "بيانات الأداة غير صالحة" };
  }

  try {
    await ensureAdminAccess();
    const supabase = await createClient();
    const tool = validation.data;
    const { data, error } = await supabase
      .from("tools")
      .insert({
        title: tool.title,
        slug: tool.slug,
        description: tool.description,
        sector: tool.category,
        icon: tool.iconName,
        status: tool.status,
      })
      .select("id, title, slug")
      .single();

    if (error) {
      if (error.code === "23505") return { success: false as const, error: "الرابط المختصر مستخدم بالفعل" };
      return { success: false as const, error: "حدث خطأ أثناء حفظ الأداة في قاعدة البيانات" };
    }

    await writeAdminAuditLog("create_tool", "tools", {
      targetId: data.id,
      title: data.title,
      slug: data.slug,
      status: tool.status,
    });
    revalidatePath("/admin/tools");
    revalidatePath("/tools");

    return { success: true as const, data };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "حدث خطأ غير متوقع أثناء حفظ الأداة",
    };
  }
}
