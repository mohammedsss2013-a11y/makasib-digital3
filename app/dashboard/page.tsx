import Link from "next/link";
import { BarChart3, Bookmark, ChevronLeft, LayoutDashboard, Settings, Wrench } from "lucide-react";

const dashboardLinks = [
  {
    title: "إعدادات الحساب",
    description: "إدارة بياناتك الشخصية والأمان والربط الخارجي.",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "لوحة أدواتي",
    description: "الوصول إلى الأدوات الرقمية والحاسبات حسب القطاع.",
    href: "/dashboard/tools",
    icon: Wrench,
  },
  {
    title: "الأنشطة والإحصائيات",
    description: "مراجعة استخدامك وتفاعلك داخل المنصة.",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "الأدوات المحفوظة",
    description: "الوصول السريع إلى الأدوات والنتائج التي حفظتها.",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 py-6 dir-rtl">
      <section className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl sm:p-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
          <LayoutDashboard className="h-4 w-4" />
          لوحة التحكم
        </div>
        <h1 className="text-2xl font-black leading-tight text-white sm:text-4xl">مساحتك الشخصية</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
          أدر حسابك وراجع نشاطك وإعداداتك من مكان واحد. الأدوات الرقمية لها لوحة مستقلة.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {dashboardLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-colors hover:border-emerald-500/50 hover:bg-slate-900"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <ChevronLeft className="h-5 w-5 text-slate-600 transition-colors group-hover:text-emerald-300" />
              </div>
              <h2 className="text-base font-bold text-white">{item.title}</h2>
              <p className="mt-2 text-xs leading-6 text-slate-400">{item.description}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
