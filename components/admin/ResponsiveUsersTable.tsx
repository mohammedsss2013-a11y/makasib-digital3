import AppImage from "@/components/ui/AppImage";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  avatarUrl?: string | null;
}

const roleLabels: Record<string, string> = {
  super_admin: "مدير عام",
  admin: "إدارة",
  editor: "محرر",
  user: "مستخدم",
};

function RoleBadge({ role }: { role: string }) {
  return <span className="inline-flex w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-300">{roleLabels[role] ?? role}</span>;
}

export default function ResponsiveUsersTable({ users }: { users: UserItem[] }) {
  return (
    <div className="w-full" dir="rtl">
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 md:block">
        <table className="w-full min-w-[640px] text-right text-sm">
          <caption className="sr-only">قائمة مستخدمي المنصة وأدوارهم</caption>
          <thead className="border-b border-slate-800 bg-slate-950/70 text-xs text-slate-400">
            <tr><th scope="col" className="p-4">المستخدم</th><th scope="col" className="p-4">البريد الإلكتروني</th><th scope="col" className="p-4">الدور</th><th scope="col" className="p-4">تاريخ الانضمام</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => <tr key={user.id} className="hover:bg-slate-800/30">
              <td className="p-4"><div className="flex items-center gap-3"><div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-800"><AppImage src={user.avatarUrl} alt="" fallbackType="avatar" fill sizes="36px" className="object-cover" /></div><span className="font-bold text-white">{user.name}</span></div></td>
              <td className="max-w-[260px] break-all p-4 text-slate-300" dir="ltr">{user.email}</td>
              <td className="p-4"><RoleBadge role={user.role} /></td>
              <td className="whitespace-nowrap p-4 text-slate-400">{new Date(user.createdAt).toLocaleDateString("ar-SA")}</td>
            </tr>)}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {users.map((user) => <article key={user.id} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center gap-3"><div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-800"><AppImage src={user.avatarUrl} alt="" fallbackType="avatar" fill sizes="44px" className="object-cover" /></div><div className="min-w-0"><h2 className="truncate text-sm font-bold text-white">{user.name}</h2><RoleBadge role={user.role} /></div></div>
          <dl className="grid gap-2 border-t border-slate-800 pt-3 text-xs"><div className="flex items-start justify-between gap-4"><dt className="text-slate-500">البريد</dt><dd className="max-w-[75%] break-all text-left text-slate-300" dir="ltr">{user.email}</dd></div><div className="flex items-center justify-between"><dt className="text-slate-500">الانضمام</dt><dd className="text-slate-400">{new Date(user.createdAt).toLocaleDateString("ar-SA")}</dd></div></dl>
        </article>)}
      </div>
    </div>
  );
}
