"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Bookmark,
  BarChart3,
  FilePlus2,
  Headphones,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { name: "نظرة عامة", href: "/dashboard", icon: LayoutDashboard },
  { name: "إعدادات الحساب والأمان", href: "/dashboard/settings", icon: Settings },
  { name: "المفضلة والنتائج", href: "/dashboard/bookmarks", icon: Bookmark },
  { name: "الأنشطة والإحصائيات", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "لوحة أدواتي", href: "/dashboard/tools", icon: FilePlus2 },
  { name: "الدعم والمساعدة", href: "/dashboard/support", icon: Headphones },
];

export function DashboardNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="mb-8 border-b border-[var(--border-main)] bg-[var(--bg-surface)]/90 backdrop-blur-md sticky top-[4rem] z-30 dir-rtl">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 no-scrollbar sm:px-6">
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] pl-4 border-l border-[var(--border-main)] hidden md:flex">
          <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          <span>لوحة المستخدم</span>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                active
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 shadow-sm"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-emerald-500 dark:text-emerald-400" : "text-[var(--text-subtle)]"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
