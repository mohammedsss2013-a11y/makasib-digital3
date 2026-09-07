import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminAccessState } from "@/lib/admin";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let access;
  try {
    access = await getAdminAccessState();
  } catch (error) {
    console.error("تعذر التحقق من صلاحيات لوحة الإدارة:", error);
    access = { user: null, isAdmin: false, role: null };
  }

  if (!access.user) {
    redirect("/login");
  }

  if (!access.isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 dir-rtl" dir="rtl">
      <aside className="w-full border-b border-slate-800 bg-slate-900/90 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-l">
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

            <AdminNavigation />
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

      <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
    </div>
  );
}
