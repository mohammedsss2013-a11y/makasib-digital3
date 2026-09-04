import { createClient } from "@/lib/supabase/server";
import ResponsiveUsersTable, { type UserItem } from "@/components/admin/ResponsiveUsersTable";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const [{ data: profiles }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, username, specialty").order("created_at", { ascending: false }),
    supabase.from("user_roles").select("user_id, email, role"),
  ]);

  const roleMap = new Map((roles ?? []).map((role) => [role.user_id, role.role]));

  const users: UserItem[] = (profiles ?? []).map((profile) => {
    const email = (roles ?? []).find((role) => role.user_id === profile.id)?.email ?? "-";
    return {
      id: profile.id,
      name: profile.full_name || profile.username || "مستخدم",
      email,
      role: roleMap.get(profile.id) ?? "user",
      createdAt: profile.created_at,
      avatarUrl: profile.avatar_url,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">إدارة المستخدمين</h1>
        <p className="mt-2 text-sm text-slate-400">مراجعة الأدوار، الصلاحيات، والوصول إلى الحسابات.</p>
      </div>

      {users.length ? <ResponsiveUsersTable users={users} /> : <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-6 text-sm text-slate-400">لا توجد بيانات مستخدمين حالياً.</div>}
    </div>
  );
}
