"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Cpu, Home, LayoutDashboard, LogIn, Menu, Radio, Search, Sparkles, Users, Wrench, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0d1615]/95 text-white backdrop-blur-xl dir-rtl">
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
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:border-emerald-500/70 hover:text-emerald-300 sm:px-4 sm:text-sm"
              title="تسجيل الدخول"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">تسجيل الدخول</span>
            </Link>
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
        <nav aria-label="التصفح الرئيسي" className="border-t border-white/5 bg-[#0b1211] px-4 py-3 lg:hidden">
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