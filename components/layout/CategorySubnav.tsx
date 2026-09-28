"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, Sparkles, type LucideIcon } from "lucide-react";

export interface SubcategoryItem {
  key: string;
  title: string;
  icon: LucideIcon;
  href: string;
  topics: Array<{ title: string; href: string }>;
}

interface CategorySubnavProps {
  categoryName?: string;
  mainHref?: string;
  items: SubcategoryItem[];
  counts?: Record<string, number>;
  totalCount?: number;
}

export function CategorySubnav({
  mainHref,
  items,
  counts = {},
  totalCount,
}: CategorySubnavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isMainActive = mainHref
    ? pathname === mainHref && !searchParams.get("sub")
    : false;

  return (
    <div className="sticky top-[4.5rem] z-30 mb-6 border-b border-[var(--border-main)] bg-[var(--bg-surface)]/90 shadow-md backdrop-blur-xl dir-rtl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2.5 px-4 py-3 sm:px-6">
        {/* زر "كل المقالات" */}
        {mainHref && (
          <Link href={mainHref} className={`flex shrink-0 select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
            isMainActive
              ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-600 shadow-md dark:text-emerald-300"
              : "border border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
          }`}>
            <Sparkles className={`h-4 w-4 ${isMainActive ? "text-emerald-500 dark:text-emerald-400" : "text-[var(--text-subtle)]"}`} />
            <span>كل المقالات</span>
            {typeof totalCount === "number" && (
              <span className="mr-1 rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-main)]">
                {totalCount}
              </span>
            )}
          </Link>
        )}

        {items.map((item) => {
          const Icon = item.icon;
          const count = counts[item.key];
          const isActive = pathname === item.href;

          return (
            <div key={item.key} className="group relative shrink-0">
              <Link href={item.href} aria-haspopup="true" className={`flex select-none items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 ${isActive ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300" : "border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"}`}>
                <Icon className="h-4 w-4 text-[var(--accent-primary)]" />
                <span>{item.title}</span>
                {typeof count === "number" && <span className="rounded-full border border-[var(--border-main)] bg-[var(--bg-muted)] px-2 py-0.5 text-[10px]">{count}</span>}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
              </Link>
              <div className="invisible absolute right-0 top-full z-50 min-w-60 translate-y-1 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {item.topics.map((topic) => (
                  <Link key={topic.href} href={topic.href} className="block rounded-lg px-3 py-2.5 text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--accent-primary)] focus-visible:bg-[var(--bg-muted)] focus-visible:text-[var(--accent-primary)]">
                    {topic.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
