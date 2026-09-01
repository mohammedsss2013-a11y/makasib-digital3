import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const ADMIN_EMAIL = "mohammed.sss2013@gmail.com";

export async function getAdminAccessState() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      isAdmin: false,
      role: null,
    };
  }

  if (user.email === ADMIN_EMAIL) {
    return {
      user,
      isAdmin: true,
      role: "super_admin",
    };
  }

  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  const role = roleData?.role ?? null;

  return {
    user,
    isAdmin: Boolean(role && ["super_admin", "admin"].includes(role)),
    role,
  };
}

export async function ensureAdminAccess() {
  const access = await getAdminAccessState();

  if (!access.user || !access.isAdmin) {
    redirect("/");
  }

  return access;
}
