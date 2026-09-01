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
    <div className="mb-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-[4rem] z-30 dir-rtl">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 no-scrollbar sm:px-6">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pl-4 border-l border-slate-800 hidden md:flex">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
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
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-sm"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-emerald-400" : "text-slate-500"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
