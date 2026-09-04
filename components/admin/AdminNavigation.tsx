"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

export interface AdminNavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function AdminNavigation({ items }: { items: AdminNavigationItem[] }) {
  const pathname = usePathname();

  return <nav className="flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1" aria-label="التنقل الإداري">
    {items.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
      return <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white lg:w-full ${isActive ? "bg-emerald-500/10 text-emerald-300" : "text-slate-300"}`}>
        <Icon className="h-4 w-4 text-slate-400" />
        <span>{item.name}</span>
      </Link>;
    })}
  </nav>;
}
