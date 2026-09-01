import { createClient } from "@/utils/supabase/server";

const roleLabels: Record<string, string> = {
  super_admin: "مدير عام",
  admin: "إدارة",
  editor: "محرر",
  user: "مستخدم",
};

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const [{ data: profiles }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("id, full_name, username, specialty").order("created_at", { ascending: false }),
    supabase.from("user_roles").select("user_id, email, role"),
  ]);

  const roleMap = new Map((roles ?? []).map((role) => [role.user_id, role.role]));

  const users = (profiles ?? []).map((profile) => {
    const email = (roles ?? []).find((role) => role.user_id === profile.id)?.email ?? "-";
    return {
      id: profile.id,
      name: profile.full_name || profile.username || "مستخدم",
      email,
      role: roleMap.get(profile.id) ?? "user",
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">إدارة المستخدمين</h1>
        <p className="mt-2 text-sm text-slate-400">مراجعة الأدوار، الصلاحيات، والوصول إلى الحسابات.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
        <div className="grid grid-cols-[1.2fr_1.4fr_0.8fr] border-b border-slate-800 bg-slate-950/70 px-4 py-3 text-xs font-bold text-slate-400">
          <span>المستخدم</span>
          <span>البريد الإلكتروني</span>
          <span>الدور</span>
        </div>

        {users.length ? users.map((user) => (
          <div key={user.id} className="grid grid-cols-[1.2fr_1.4fr_0.8fr] items-center border-b border-slate-800 px-4 py-4 last:border-b-0">
            <span className="text-sm font-bold text-white">{user.name}</span>
            <span className="text-sm text-slate-300">{user.email}</span>
            <span className="inline-flex w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
              {roleLabels[user.role] ?? user.role}
            </span>
          </div>
        )) : (
          <div className="px-4 py-6 text-sm text-slate-400">لا توجد بيانات مستخدمين حالياً.</div>
        )}
      </div>
    </div>
  );
}
