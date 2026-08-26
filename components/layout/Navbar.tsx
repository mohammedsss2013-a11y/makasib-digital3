"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BriefcaseBusiness, Cpu, Home, LayoutDashboard, LogIn, LogOut, Menu, Radio, Search, Sparkles, UserCircle, Users, Wrench, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { createClient } from "@/utils/supabase/client";

interface NavbarProps {
  onOpenSearch: () => void;
}

const navLinks = [
  { name: "الرئيسية", href: "/", icon: Home },
  { name: "المال والأعمال", href: "/finance", icon: BriefcaseBusiness },
  { name: "التكنولوجيا والابتكار", href: "/tech", icon: Cpu },
  { name: "الإعلام الجديد", href: "/media", icon: Radio },
  { name: "رقميون", href: "/digital-lifestyle", icon: Sparkles },
  { name: "مجتمع مكاسب", href: "/community", icon: Users },
];

export const Navbar = ({ onOpenSearch }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

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
            <kbd className="pointer-events-none absolute left-3 rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400">
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
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-emerald-400 px-3 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/10 transition-colors hover:bg-emerald-300 sm:px-4 sm:text-sm"
              title="لوحة التحكم"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">لوحة التحكم</span>
            </Link>
            <Link
              href="/dashboard/tools"
              className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:border-emerald-500/70 hover:text-emerald-300 sm:px-4 sm:text-sm"
              title="لوحة أدواتي"
            >
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">لوحة أدواتي</span>
            </Link>
            {userEmail ? (
              <>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2.5 text-xs font-bold text-emerald-300 transition-colors hover:border-emerald-400/60 hover:bg-emerald-400/15 sm:px-4 sm:text-sm"
                  title="ملفي الشخصي"
                >
                  <UserCircle className="h-4 w-4" />
                  <span className="hidden max-w-32 truncate sm:inline">{userEmail}</span>
                  <span className="sm:hidden">ملفي</span>
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-2.5 text-slate-300 transition-colors hover:border-red-400/60 hover:text-red-300"
                  title="تسجيل الخروج"
                  aria-label="تسجيل الخروج"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
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
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <nav aria-label="التصفح الرئيسي" className="hidden items-center justify-center gap-7 overflow-x-auto border-t border-white/5 py-3 text-sm font-medium lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 transition-colors ${isActive(link.href) ? "font-bold text-emerald-400" : "text-slate-300 hover:text-white"}`}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {mobileMenuOpen && (
        <nav aria-label="التصفح الرئيسي" className="border-t border-slate-800/70 bg-slate-950/95 px-4 py-3 lg:hidden">
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