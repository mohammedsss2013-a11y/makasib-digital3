import { redirect } from "next/navigation";
import { getCurrentUser, getCurrentUserProfile } from "@/services/auth.service";

export const ADMIN_EMAIL = "mohammed.sss2013@gmail.com";

export async function getAdminAccessState() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      isAdmin: false,
      role: null,
    };
  }

  if (user.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    return {
      user,
      isAdmin: true,
      role: "super_admin",
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
  const access = await getAdminAccessState();

  if (!access.user || !access.isAdmin) {
    redirect("/");
  }

  return access;
}
