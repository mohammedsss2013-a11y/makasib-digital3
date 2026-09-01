import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  CreditCard,
  FileText,
  Headphones,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

const ADMIN_EMAIL = "mohammed.sss2013@gmail.com";

const navigationItems = [
  { name: "1. نظرة عامة", href: "/admin", icon: LayoutDashboard },
  { name: "2. المحتوى والأدوات", href: "/admin/content", icon: FileText },
  { name: "3. إدارة المحتوى", href: "/admin/content/manage", icon: FileText },
  { name: "4. إدارة المستخدمين", href: "/admin/users", icon: Users },
  { name: "5. أدوار النظام", href: "/admin/roles", icon: ShieldCheck },
  { name: "6. المعاملات المالية", href: "/admin/finance", icon: CreditCard },
  { name: "7. الدعم الفني", href: "/admin/support", icon: Headphones },
  { name: "8. المراقبة والسجلات", href: "/admin/logs", icon: ShieldCheck },
  { name: "9. إعدادات النظام", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.email !== ADMIN_EMAIL) {
    try {
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (roleError || !roleData || !["super_admin", "admin"].includes(roleData.role)) {
        redirect("/");
      }
    } catch {
      redirect("/");
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 dir-rtl" dir="rtl">
      <aside className="w-full max-w-72 border-l border-slate-800 bg-slate-900/90 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3 border-b border-slate-800 px-2 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 font-black text-white">
                A
              </div>
              <div>
                <h2 className="text-sm font-black text-white">لوحة الإدارة التنفيذية</h2>
                <p className="text-xs text-slate-400">النظام الداخلي</p>
              </div>
            </div>

            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>العودة للموقع الرئيسي</span>
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 sm:p-8">{children}</main>
    </div>
  );
}
