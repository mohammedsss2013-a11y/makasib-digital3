import Link from "next/link";
import {
  BarChart3,
  Bookmark,
  ChevronLeft,
  Clock3,
  FilePlus2,
  Headphones,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
  UserCircle,
  Bell,
} from "lucide-react";
import { getDashboardData } from "@/utils/dashboard";

const dashboardLinks = [
  {
    title: "إعدادات الحساب والأمان",
    description: "إدارة الملف الشخصي، كلمة المرور، الأجهزة النشطة، والتفضيلات.",
    href: "/dashboard/settings",
    icon: Settings,
    badge: "إعدادات",
  },
  {
    title: "المفضلة والنتائج المحفوظة",
    description: "الوصول السريع للأدوات والحاسبات التي قمت بحفظها.",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
    badge: "مفضلة",
  },
  {
    title: "لوحة أدواتي الحاسبة",
    description: "تصفح الأدوات الحاسبة المالية والتكنولوجية حسب القطاع.",
    href: "/dashboard/tools",
    icon: FilePlus2,
    badge: "أدوات",
  },
  {
    title: "الأنشطة والإحصائيات",
    description: "مراجعة إحصائيات استخدامك وتفاعلك داخل منصة مكاسب.",
    href: "/dashboard/analytics",
    icon: BarChart3,
    badge: "إحصائيات",
  },
  {
    title: "الدعم الفني والمساعدة",
    description: "مراسلة الإدارة عبر التذاكر ومتابعة حالة الاستفسارات.",
    href: "/dashboard/support",
    icon: Headphones,
    badge: "تذاكر الدعم",
  },
];

export default async function DashboardPage() {
  const { user, profile, savedTools, communityCount, ticketsCount, userRole } = await getDashboardData();
  const displayName = profile?.full_name || user?.email?.split("@")[0] || "مستخدم مكاسب";
  const userEmail = user?.email || "";
  const lastSaved = savedTools[0];
  const roleTitle = userRole === "super_admin" ? "مدير النظام الرئيسي" : userRole === "admin" ? "مدير نظام" : "عضو (Member)";

  return (
    <div className="space-y-8 py-2 dir-rtl">
      {/* 1. البطاقة الترحيبية الهامة */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 -mt-10 -ml-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-inner">
              {profile?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar_url} alt={displayName} className="h-full w-full rounded-2xl object-cover" />
              ) : (
                <UserCircle className="h-10 w-10 text-emerald-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white sm:text-3xl">{displayName}</h1>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                  {roleTitle}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{userEmail}</p>
              {profile?.bio && <p className="mt-2 text-xs text-slate-300 max-w-xl">{profile.bio}</p>}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:border-emerald-500/50 hover:bg-slate-800"
            >
              <Settings className="h-4 w-4 text-emerald-400" />
              تعديل البروفايل والأمان
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ملخص سريع لنشاط المستخدم (Overview Activity Grid) */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="ملخص الحساب">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>النتائج والمفضلة</span>
            <Bookmark className="h-4 w-4 text-emerald-400" />
          </div>
          <strong className="mt-3 block text-3xl font-black text-emerald-400">{savedTools.length}</strong>
          <span className="mt-1 block text-[11px] text-slate-500">أداة وحاسبة محفوظة</span>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>تفاعلات المجتمع</span>
            <MessageSquare className="h-4 w-4 text-blue-400" />
          </div>
          <strong className="mt-3 block text-3xl font-black text-blue-400">{communityCount}</strong>
          <span className="mt-1 block text-[11px] text-slate-500">منشور ومشاركة بمكاسب</span>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>تذاكر الدعم الفني</span>
            <Headphones className="h-4 w-4 text-teal-400" />
          </div>
          <strong className="mt-3 block text-3xl font-black text-teal-400">{ticketsCount}</strong>
          <span className="mt-1 block text-[11px] text-slate-500">استفسارات وتذاكر مفتوحة</span>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>حالة الحساب والأمان</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <strong className="mt-3 block text-sm font-bold text-emerald-300">حساب موثق وخاص</strong>
          <span className="mt-1 block text-[11px] text-slate-500">
            {profile?.two_factor_enabled ? "التحقق بخطوتين مفعّل" : "صلاحيات عضو مفعلة"}
          </span>
        </div>
      </section>

      {/* 3. الإشعارات الهامة والتحديثات */}
      <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5">
        <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
          <Bell className="h-4 w-4 text-emerald-400" />
          <span>التنبيهات والأخبار الهامة للمستخدمين</span>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-200">
          مرحباً بك في منصة مكاسب! حسابك مسجل بصلاحيات <strong>عضو (Member)</strong> آمنة. يمكنك تعديل معلوماتك الشخصية، إدارة كلمات المرور، حفظ نتائج الحاسبات، ومراسلة الدعم الفني في أي وقت.
        </div>
      </section>

      {/* 4. شبكة الوصول السريع لأقسام اللوحة */}
      <section className="grid gap-4 sm:grid-cols-2">
        {dashboardLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 transition-all hover:border-emerald-500/50 hover:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-300">
                  {item.badge}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white transition-colors group-hover:text-emerald-300">
                  {item.title}
                </h2>
                <ChevronLeft className="h-5 w-5 text-slate-600 transition-transform group-hover:-translate-x-1 group-hover:text-emerald-300" />
              </div>
              <p className="mt-2 text-xs leading-6 text-slate-400">{item.description}</p>
            </Link>
          );
        })}
      </section>

      {/* 5. سجل النتائج والأدوات المحفوظة مؤخراً */}
      <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold text-white">آخر المحفوظات والتفاعلات</h2>
          <Link href="/dashboard/bookmarks" className="text-xs font-bold text-emerald-300 hover:text-emerald-200">
            عرض الكل
          </Link>
        </div>
        {savedTools.length ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {savedTools.slice(0, 4).map((tool) => (
              <Link
                key={tool.id}
                href="/dashboard/bookmarks"
                className="group rounded-xl border border-slate-800/80 bg-slate-950 p-4 transition-all hover:border-emerald-500/40"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white transition-colors group-hover:text-emerald-300">
                    {tool.tool_title}
                  </p>
                  <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {tool.category}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 className="h-3.5 w-3.5 text-slate-500" />
                  <span>{new Date(tool.created_at).toLocaleDateString("ar-EG")}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-400">
            لم تحفظ أي نتائج أو أدوات حاسبة بعد. ابدأ الآن من لوحة الأدوات الرقمية.
          </p>
        )}
      </section>
    </div>
  );
}
