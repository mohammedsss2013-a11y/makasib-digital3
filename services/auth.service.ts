import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error || !user ? null : user;
});

export const getCurrentUserProfile = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, full_name, username, avatar_url, specialty, bio, notification_settings, two_factor_enabled, created_at")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("خطأ في جلب بيانات ملف المستخدم:", error.message);
    return null;
  }

  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  if (roleError) {
    console.error("خطأ في جلب أدوار المستخدم:", roleError.message);
  }

  return {
    ...user,
    profile,
    roles: (roleData ?? []).map(({ role }) => role),
  };
});

export async function isAdmin() {
  const userProfile = await getCurrentUserProfile();
  return userProfile?.roles.some((role) => ["admin", "super_admin"].includes(role)) ?? false;
}