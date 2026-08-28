"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, MessageSquare, Sparkles, UserCheck, Users } from "lucide-react";

const communityTabs = [
  {
    name: "مساحة الاستشارات والتجريب",
    href: "/community/consultations",
    desc: "تجارب الأعضاء والمشورة",
    icon: MessageSquare,
  },
  {
    name: "مراجعات النتائج المرفقة",
    href: "/community/tool-results",
    desc: "مشاركة مخرجات الحاسبات",
    icon: BarChart3,
  },
  {
    name: "النقاشات الساخنة والأفكار",
    href: "/community/topics",
    desc: "حوارات حول المستقبل الرقمي",
    icon: Sparkles,
  },
  {
    name: "دليل الأعضاء والموثوقية",
    href: "/community/directory",
    desc: "قائمة الأعضاء والشارات",
    icon: UserCheck,
  },
];

export default function CommunityLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="dir-rtl mx-auto max-w-7xl py-2 relative">
      <header className="mb-8 border-b border-slate-800 pb-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
            <Users className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-400">مجتمع مكاسب التفاعلي</p>
            <h1 className="text-2xl font-black text-white">مساحة المشاركة والتجربة</h1>
          </div>
        </div>

        <nav aria-label="أقسام مجتمع مكاسب" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {communityTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`group rounded-xl border p-4 transition-all ${
                  isActive
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Icon aria-hidden="true" className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-emerald-400"}`} />
                  <span className="text-sm font-bold">{tab.name}</span>
                </div>
                <p className="text-xs text-slate-500">{tab.desc}</p>
              </Link>
            );
          })}
        </nav>
      </header>

      <div>{children}</div>
      {modal}
    </div>
  );
}