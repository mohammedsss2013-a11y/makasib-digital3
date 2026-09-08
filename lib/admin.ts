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
    return { isAdmin: false, user: null };
  }

  const { data: roleData, error: roleError } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  const isAdmin = !roleError && roleData?.role === "admin";

  return { isAdmin, user };
}
