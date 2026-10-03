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
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
  { name: "أدوات", href: "/tools", icon: Sparkles },
  { name: "المجتمع", href: "/community", icon: Users },
];

export const Navbar = ({ onOpenSearch }: NavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadUserData(email: string | null, userId?: string) {
      setUserEmail(email);
      if (userId) {
        const [{ data: profile }, { data: roleRow }] = await Promise.all([
          supabase
            .from("public_profiles")
            .select("full_name, avatar_url")
            .eq("id", userId)
            .maybeSingle(),
          supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", userId)
            .maybeSingle(),
        ]);

        if (profile) {
          setAvatarUrl(profile.avatar_url ?? null);
          setFullName(profile.full_name ?? null);
        }
        setIsAdmin(roleRow?.role === "admin" || roleRow?.role === "super_admin");
      } else {
        setAvatarUrl(null);
        setFullName(null);
        setIsAdmin(false);
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
    setIsAdmin(false);
    setUserDropdownOpen(false);
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const displayName = fullName || userEmail?.split("@")[0] || "المستخدم";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-main)] bg-[var(--bg-surface)]/95 text-[var(--text-main)] backdrop-blur-xl dir-rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <BrandLogo compact />

          {/* Navigation Links for Desktop */}
          <nav aria-label="التصفح الرئيسي" className="hidden items-center gap-1 text-xs font-semibold lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 transition-colors ${
                  isActive(link.href)
                    ? "bg-[var(--accent-light)] font-bold text-[var(--accent-primary)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Tools & User Profile */}
          <div className="flex items-center gap-2">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)]/70 px-3 py-2 text-xs font-semibold text-[var(--text-muted)] transition-colors hover:border-[var(--accent-primary)]/70 hover:text-[var(--text-main)]"
              title="البحث السريع (Cmd+K)"
              aria-label="فتح البحث السريع"
            >
              <Search className="h-4 w-4 text-[var(--accent-primary)]" />
              <span className="hidden sm:inline">بحث</span>
              <kbd className="hidden font-mono text-[10px] text-[var(--text-muted)] sm:inline-block border border-[var(--border-main)] rounded px-1">
                Cmd+K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Dropdown / Login */}
            {userEmail ? (
              <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-2">
                  <AdminNavButton isAdmin={isAdmin} />
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen((open) => !open)}
                    className="flex items-center gap-1.5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)]/80 p-1.5 transition-all hover:border-[var(--accent-primary)]/60 focus-ring"
                    aria-label="قائمة الملف الشخصي"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="relative h-7 w-7 flex-shrink-0 rounded-lg overflow-hidden border border-[var(--accent-primary)]/30 bg-[var(--bg-muted)] flex items-center justify-center">
                      {avatarUrl ? (
                        <AppImage src={avatarUrl} alt={displayName} fallbackType="avatar" fill sizes="28px" className="object-cover" />
                      ) : (
                        <UserCircle className="h-4 w-4 text-[var(--accent-primary)]" />
                      )}
                    </div>
                    <ChevronDown className={`h-3.5 w-3.5 text-[var(--text-muted)] transition-transform ${userDropdownOpen ? "rotate-180 text-[var(--accent-primary)]" : ""}`} />
                  </button>
                </div>

                {/* Profile Popup Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] p-4 shadow-2xl backdrop-blur-2xl z-50 dir-rtl animate-in fade-in zoom-in-95 text-[var(--text-main)]">
                    <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-main)]">
                      <div className="relative h-11 w-11 flex-shrink-0 rounded-xl border border-[var(--accent-primary)]/40 bg-[var(--bg-muted)] overflow-hidden flex items-center justify-center">
                        {avatarUrl ? (
                          <AppImage src={avatarUrl} alt={displayName} fallbackType="avatar" fill sizes="44px" className="object-cover" />
                        ) : (
                          <UserCircle className="h-7 w-7 text-[var(--accent-primary)]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{displayName}</p>
                        <p className="text-xs text-[var(--text-muted)] truncate dir-ltr text-right">{userEmail}</p>
                        <span className="mt-1 inline-block rounded-full bg-[var(--accent-light)] border border-[var(--accent-primary)]/30 px-2 py-0.5 text-[10px] font-bold text-[var(--accent-primary)]">
                          {isAdmin ? "مدير النظام (Admin)" : "عضو (Member)"}
                        </span>
                      </div>
                    </div>

                    <div className="py-2 space-y-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--accent-primary)]"
                      >
                        <LayoutDashboard className="h-4 w-4 text-[var(--accent-primary)]" />
                        <span>لوحة التحكم الرئيسية</span>
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--accent-primary)]"
                      >
                        <Settings className="h-4 w-4 text-[var(--accent-primary)]" />
                        <span>تعديل وإعدادات الحساب</span>
                      </Link>

                      <Link
                        href="/dashboard/bookmarks"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--accent-primary)]"
                      >
                        <Bookmark className="h-4 w-4 text-[var(--accent-primary)]" />
                        <span>المفضلة والنتائج المحفوظة</span>
                      </Link>

                      <Link
                        href="/dashboard/support"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-[var(--text-main)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--accent-primary)]"
                      >
                        <Headphones className="h-4 w-4 text-teal-500" />
                        <span>الدعم الفني والمساعدة</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 bg-rose-500/10 border border-rose-500/20 transition-colors hover:bg-rose-500/20"
                        >
                          <ShieldAlert className="h-4 w-4 text-rose-500" />
                          <span>لوحة الإدارة التنفيذية</span>
                        </Link>
                      )}
                    </div>

                    <ProfileThemeSelector />

                    <div className="pt-2 border-t border-[var(--border-main)] mt-2">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-rose-500 transition-colors hover:bg-rose-500/10"
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
                className="flex items-center gap-1.5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)]/70 px-3 py-2 text-xs font-bold text-[var(--text-main)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                title="تسجيل الدخول"
              >
                <LogIn className="h-4 w-4" />
                <span>دخول</span>
              </Link>
            )}

            {/* Mobile Navigation Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)]/70 p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] lg:hidden"
              aria-label="القائمة الرئيسية"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="التصفح المحمول" className="border-t border-[var(--border-main)] bg-[var(--bg-surface)] px-4 py-3 lg:hidden">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${
                  isActive(link.href)
                    ? "bg-[var(--accent-light)] text-[var(--accent-primary)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                }`}
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
