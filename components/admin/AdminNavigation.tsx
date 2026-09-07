"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  FileText,
  Headphones,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

const navigationItems = [
  { name: "1. نظرة عامة", href: "/admin", icon: LayoutDashboard },
  { name: "2. المحتوى والأدوات", href: "/admin/content", icon: FileText },
  { name: "3. إدارة المحتوى", href: "/admin/content/manage", icon: FileText },
  { name: "4. إدارة المستخدمين", href: "/admin/users", icon: Users },
  { name: "5. أدوار النظام", href: "/admin/roles", icon: ShieldCheck },
  { name: "6. المعاملات المالية", href: "/admin/finance", icon: CreditCard },
  { name: "7. الدعم الفني", href: "/admin/support", icon: Headphones },
  { name: "8. المراقبة والسجلات", href: "/admin/logs", icon: ShieldCheck },
  { name: "9. إعدادات النظام", href: "/admin/settings", icon: Settings },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return <nav className="flex gap-1 overflow-x-auto pb-1 lg:block lg:space-y-1" aria-label="التنقل الإداري">
    {navigationItems.map((item) => {
      const Icon = item.icon;
      const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
      return <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white lg:w-full ${isActive ? "bg-emerald-500/10 text-emerald-300" : "text-slate-300"}`}>
        <Icon className="h-4 w-4 text-slate-400" />
        <span>{item.name}</span>
      </Link>;
    })}
  </nav>;
}
