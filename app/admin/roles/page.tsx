import { upsertAdminRoleAction, deleteAdminRoleAction } from "@/actions/admin.actions";
import { createClient } from "@/lib/supabase/server";

const roleMeta: Record<string, string> = {
  super_admin: "إدارة كاملة للنظام ومقابل كل صفحاته.",
  admin: "إدارة العمليات التشغيلية والإعدادات المتقدمة.",
  editor: "تحديث المحتوى ومراجعة المقالات والأدوات.",
  user: "وصول أساسي فقط للمحتوى الشخصي.",
};

export default async function AdminRolesPage() {
  const supabase = await createClient();
  const [{ data: roleRows }, { data: profiles }] = await Promise.all([
    supabase.from("user_roles").select("id, user_id, email, role, created_at").order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, full_name, username").order("created_at", { ascending: false }),
  ]);

  const roles = [
    { title: "super_admin", description: roleMeta.super_admin },
    { title: "admin", description: roleMeta.admin },
    { title: "editor", description: roleMeta.editor },
    { title: "user", description: roleMeta.user },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">أدوار النظام</h1>
        <p className="mt-2 text-sm text-slate-400">إدارة صلاحيات المستخدمين وتحديد مستويات الوصول.</p>
      </div>

      <form action={upsertAdminRoleAction} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-bold text-white">تعيين دور جديد</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-300">
            <span>المستخدم</span>
            <select name="userId" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
              <option value="">اختيار مستخدم</option>
              {(profiles ?? []).map((profile) => (
                <option key={profile.id} value={profile.id}>{profile.full_name || profile.username || profile.id}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span>البريد الإلكتروني</span>
            <input name="email" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" placeholder="user@example.com" />
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            <span>الدور</span>
            <select name="role" defaultValue="admin" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
              {roles.map((role) => (
                <option key={role.title} value={role.title}>{role.title}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-400">
          حفظ الدور
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((role) => (
          <div key={role.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm font-black text-emerald-300">{role.title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{role.description}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <h2 className="text-lg font-bold text-white">تسجيلات الأدوار الحالية</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          {(roleRows ?? []).length ? (roleRows ?? []).slice(0, 8).map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div>
                <p>{row.email || row.user_id}</p>
                <p className="text-[10px] text-slate-500">{new Date(row.created_at).toLocaleDateString("ar-EG")}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-300">
                  {row.role}
                </span>
                <form action={async (formData: FormData) => {
                  "use server";
                  await deleteAdminRoleAction(formData.get("userId")?.toString() || "");
                }}>
                  <input type="hidden" name="userId" value={row.user_id ?? ""} />
                  <button type="submit" className="text-xs text-red-400 hover:text-red-300">حذف</button>
                </form>
              </div>
            </div>
          )) : (
            <p className="text-slate-400">لا توجد أدوار مخصصة بعد.</p>
          )}
        </div>
      </section>
    </div>
  );
}
