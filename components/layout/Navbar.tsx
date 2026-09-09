"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Brain,
  ChevronDown,
  Cpu,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Search,
  Sparkles,
  TrendingUp,
  Tv,
  UserCircle,
  Users,
  X,
  Settings,
  Bookmark,
  Headphones,
  ShieldAlert,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import AdminNavButton from "@/components/admin/AdminNavButton";
import { createClient } from "@/lib/supabase/client";
import AppImage from "@/components/ui/AppImage";
import { ARTICLE_SECTORS } from "@/lib/constants/sectors";
import { ProfileThemeSelector } from "@/components/theme/ProfileThemeSelector";

interface NavbarProps {
  onOpenSearch: () => void;
}

const sectorIcons = {
  finance: TrendingUp,
  technology: Cpu,
  media: Tv,
  digitalists: Brain,
} as const;

const navLinks = [
  { name: "الرئيسية", href: "/", icon: Home },
  ...ARTICLE_SECTORS.map((sector) => ({
    name: sector.title,
    href: sector.href,
    icon: sectorIcons[sector.id],
  })),
  { name: "أدوات رقمية", href: "/tools", icon: Sparkles },
  { name: "مجتمع مكاسب", href: "/community", icon: Users },
];

const ADMIN_EMAIL = "mohammed.sss2013@gmail.com";

export const Navbar = ({ onOpenSearch }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadUserData(email: string | null, userId?: string) {
      setUserEmail(email);
      if (userId) {
        const { data: profile } = await supabase
          .from("public_profiles")
          .select("full_name, avatar_url")
          .eq("id", userId)
          .maybeSingle();

        if (profile) {
          setAvatarUrl(profile.avatar_url ?? null);
          setFullName(profile.full_name ?? null);
        }
      } else {
        setAvatarUrl(null);
        setFullName(null);
      }
    }

    supabase.auth.getUser().then(({ data }) => {
      loadUserData(data.user?.email ?? null, data.user?.id);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUserData(session?.user?.email ?? null, session?.user?.id);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  // إغلاق المستطيل المنبثق عند النقر خارجه
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    setAvatarUrl(null);
    setFullName(null);
    setUserDropdownOpen(false);
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const displayName = fullName || userEmail?.split("@")[0] || "المستخدم";
  const isAdmin = userEmail?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/70 bg-slate-950/90 text-white backdrop-blur-xl dir-rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[5.5rem] items-center justify-between gap-4 py-3">
          <BrandLogo />

          <button
            type="button"
            onClick={onOpenSearch}
            className="group relative hidden w-full max-w-md items-center md:flex"
            title="البحث السريع (Cmd+K)"
            aria-label="فتح البحث السريع"
          >
            <span className="flex w-full items-center rounded-xl border border-slate-700/60 bg-slate-900/60 py-2.5 pr-10 pl-16 text-right text-xs text-slate-400 transition-colors group-hover:border-emerald-500/70">
              للبحث السريع
            </span>
            <Search className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
            <kbd className="pointer-events-none absolute left-3 rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-xs text-slate-400">
              Cmd+K
            </kbd>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-2.5 text-slate-300 transition-colors hover:border-emerald-500/70 hover:text-emerald-300 md:hidden"
              title="البحث السريع (Cmd+K)"
              aria-label="فتح البحث السريع"
            >
              <Search className="h-4 w-4" />
            </button>

            {userEmail ? (
              <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="hidden sm:flex items-center gap-2 rounded-xl bg-emerald-400 px-3 py-2 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/10 transition-colors hover:bg-emerald-300"
                    title="لوحة التحكم"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>لوحة التحكم</span>
                  </Link>

                  {/* زر صورة البروفايل الذي يفتح المستطيل المنبثق */}
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen((open) => !open)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700/70 bg-slate-900/80 p-1.5 transition-all hover:border-emerald-500/60 focus-ring"
                    aria-label="قائمة الملف الشخصي"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="relative h-8 w-8 flex-shrink-0 rounded-lg overflow-hidden border border-emerald-500/30 bg-slate-800 flex items-center justify-center">
                      {avatarUrl ? (
                        <AppImage src={avatarUrl} alt={displayName} fallbackType="avatar" fill sizes="32px" className="object-cover" />
                      ) : (
                        <UserCircle className="h-5 w-5 text-emerald-400" />
                      )}
                    </div>
                    <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${userDropdownOpen ? "rotate-180 text-emerald-400" : ""}`} />
                  </button>
                </div>

                {/* المستطيل المنبثق المصغر عند الضغط على صورة البروفايل */}
                {userDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl z-50 dir-rtl animate-in fade-in zoom-in-95 text-slate-900 dark:text-white">
                    {/* أعلى المستطيل: صورة البروفايل والبريد */}
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div className="relative h-12 w-12 flex-shrink-0 rounded-xl border-2 border-emerald-500/40 bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
                        {avatarUrl ? (
                          <AppImage src={avatarUrl} alt={displayName} fallbackType="avatar" fill sizes="48px" className="object-cover" />
                        ) : (
                          <UserCircle className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 dark:text-white truncate">{displayName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate dir-ltr text-right">{userEmail}</p>
                        <span className="mt-1 inline-block rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                          {isAdmin ? "مدير النظام (Admin)" : "عضو (Member)"}
                        </span>
                      </div>
                    </div>

                    {/* قائمة الخيارات السريعة */}
                    <div className="py-2 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800 hover:text-emerald-300"
                      >
                        <LayoutDashboard className="h-4 w-4 text-emerald-400" />
                        <span>لوحة التحكم الرئيسية</span>
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800 hover:text-emerald-300"
                      >
                        <Settings className="h-4 w-4 text-emerald-400" />
                        <span>تعديل وإعدادات الحساب</span>
                      </Link>

                      <Link
                        href="/dashboard/bookmarks"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800 hover:text-emerald-300"
                      >
                        <Bookmark className="h-4 w-4 text-emerald-400" />
                        <span>المفضلة والنتائج المحفوظة</span>
                      </Link>

                      <Link
                        href="/dashboard/support"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800 hover:text-emerald-300"
                      >
                        <Headphones className="h-4 w-4 text-teal-400" />
                        <span>الدعم الفني والمساعدة</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-red-300 bg-red-500/10 border border-red-500/20 transition-colors hover:bg-red-500/20"
                        >
                          <ShieldAlert className="h-4 w-4 text-red-400" />
                          <span>لوحة الإدارة التنفيذية</span>
                        </Link>
                      )}
                    </div>

                    {/* محول الثيمات التفاعلي */}
                    <ProfileThemeSelector />

                    {/* زر تسجيل الخروج */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <span className="flex items-center gap-2">
                          <LogOut className="h-4 w-4" />
                          تسجيل الخروج
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:border-emerald-500/70 hover:text-emerald-300 sm:px-4 sm:text-sm"
                title="تسجيل الدخول"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">تسجيل الدخول</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-2.5 text-slate-300 hover:text-white lg:hidden"
              aria-label="القائمة الرئيسية"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav aria-label="التصفح الرئيسي" className="hidden items-center justify-center gap-4 border-t border-white/5 py-3 text-sm font-medium lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`flex items-center gap-2 whitespace-nowrap transition-colors ${isActive(link.href) ? "font-bold text-emerald-400" : "text-slate-300 hover:text-white"}`}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="التصفح الرئيسي" className="border-t border-slate-800/70 bg-slate-950/95 px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive(link.href) ? "bg-emerald-500/10 font-bold text-emerald-400" : "text-slate-300 hover:bg-slate-900 hover:text-white"}`}
              >
                <span className="flex items-center gap-2">
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
