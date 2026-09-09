import { createClient } from "@/lib/supabase/server";
import { ensureAdminAccess } from "@/lib/admin";
import type { Json } from "@/types/database.types";

type AuditDetails = { [key: string]: Json | undefined };

export async function writeAdminAuditLog(action: string, targetResource: string, details: AuditDetails) {
  const { user } = await ensureAdminAccess();
  if (!user) return;
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
