import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, getCurrentUserProfile } from "@/services/auth.service";

export async function getAdminAccessState() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      isAdmin: false,
      role: null,
    };
  }

  const userProfile = await getCurrentUserProfile();

  if (!userProfile) {
    return {
      user: null,
      isAdmin: false,
      role: null,
    };
  }

  const { roles, ...profileUser } = userProfile;

  const role = roles[0] ?? null;

  return {
    user: profileUser,
    isAdmin: Boolean(role && ["super_admin", "admin"].includes(role)),
    role,
  };
}

export async function ensureAdminAccess() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("غير مصرح: يجب تسجيل الدخول أولاً");
  }

  const { data: isAdmin } = await supabase.rpc("is_admin_user");

  if (!isAdmin) {
    throw new Error("غير مصرح: لا تملك صلاحيات أدمن");
  }

  return { user, supabase };
}
