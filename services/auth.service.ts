import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "mohammed.sss2013@gmail.com";

export const getCurrentUser = cache(async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return error || !user ? null : user;
  } catch (error) {
    console.error("خطأ في التحقق من جلسة المستخدم:", error);
    return null;
  }
});

export const getCurrentUserProfile = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const supabase = await createClient();
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, username, avatar_url, specialty, bio, notification_settings, two_factor_enabled, created_at")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("خطأ في جلب بيانات ملف المستخدم:", profileError.message);
    }

    let roleData: Array<{ role: string }> = [];
    try {
      const { data, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (roleError) {
        console.error("خطأ في جلب أدوار المستخدم:", roleError.message);
      } else {
        roleData = data ?? [];
      }
    } catch (error) {
      console.error("استثناء أثناء جلب أدوار المستخدم:", error);
    }

    return {
      ...user,
      profile: profile ?? null,
      roles: roleData.map(({ role }) => role),
    };
  } catch (error) {
    console.error("استثناء أثناء جلب بيانات المستخدم:", error);
    return {
      ...user,
      profile: null,
      roles: [],
    };
  }
});

export async function isAdmin() {
  const user = await getCurrentUser();
  if (user?.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) return true;

  const userProfile = await getCurrentUserProfile();
  return userProfile?.roles.some((role) => ["admin", "super_admin"].includes(role)) ?? false;
}