"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Sparkles, type LucideIcon } from "lucide-react";

export interface SubcategoryItem {
  key: string;
  title: string;
  icon: LucideIcon;
  href?: string;
}

interface CategorySubnavProps {
  categoryName?: string;
  mainHref?: string;
  items: SubcategoryItem[];
  activeKey?: string;
  onSelectKey?: (key: string) => void;
  counts?: Record<string, number>;
  totalCount?: number;
}

export function CategorySubnav({
  mainHref,
  items,
  activeKey,
  onSelectKey,
  counts = {},
  totalCount,
}: CategorySubnavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isMainActive = mainHref
    ? pathname === mainHref && !searchParams.get("sub")
    : activeKey === "الكل" || !activeKey;

  function navigateTo(href: string) {
    const target = new URL(href, window.location.origin);
    router.replace(`${target.pathname}${target.search}`, { scroll: false });
  }

  return (
    <div className="sticky top-[4.5rem] z-30 mb-6 border-b border-[var(--border-main)] bg-[var(--bg-surface)]/90 shadow-md backdrop-blur-xl dir-rtl">
      <div className="mx-auto flex max-w-7xl items-center gap-2.5 overflow-x-auto px-4 py-3 no-scrollbar sm:px-6">
        {/* زر "كل المقالات" */}
        {mainHref ? (
          <button
            type="button"
            onClick={() => navigateTo(mainHref)}
            className={`flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] flex-shrink-0 ${
              isMainActive
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 shadow-md"
                : "bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Sparkles className={`h-4 w-4 ${isMainActive ? "text-emerald-500 dark:text-emerald-400" : "text-[var(--text-subtle)]"}`} />
            <span>كل المقالات</span>
            {typeof totalCount === "number" && (
              <span className="mr-1 rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-main)]">
                {totalCount}
              </span>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onSelectKey?.("الكل")}
            className={`flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] flex-shrink-0 ${
              isMainActive
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 shadow-md"
                : "bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Sparkles className={`h-4 w-4 ${isMainActive ? "text-emerald-500 dark:text-emerald-400" : "text-[var(--text-subtle)]"}`} />
            <span>كل المقالات</span>
            {typeof totalCount === "number" && (
              <span className="mr-1 rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-main)]">
                {totalCount}
              </span>
            )}
          </button>
        )}

        {/* أزرار الفروع والأقسام الفرعية */}
        {items.map((item) => {
          const Icon = item.icon;
          const count = counts[item.key];
          const canNavigate = Boolean(item.href);
          const target = item.href ? new URL(item.href, "http://localhost") : null;
          const isActive = canNavigate
            ? pathname === target?.pathname && searchParams.get("sub") === target.searchParams.get("sub")
            : activeKey === item.key;

          if (canNavigate) {
            return (
              <button
                type="button"
                key={item.key}
                onClick={() => navigateTo(item.href!)}
                className={`flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] flex-shrink-0 ${
                  isActive
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 shadow-md"
                    : "bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-emerald-500 dark:text-emerald-400" : "text-[var(--text-subtle)]"}`} />
                <span>{item.title}</span>
                {typeof count === "number" && (
                  <span
                    className={`mr-1 rounded-full px-2 py-0.5 text-[10px] font-mono border ${
                      isActive
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-300"
                        : "bg-[var(--bg-muted)] border-[var(--border-main)] text-[var(--text-muted)]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          }

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectKey?.(item.key)}
              className={`flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] flex-shrink-0 ${
                isActive
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 shadow-md"
                  : "bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-emerald-500 dark:text-emerald-400" : "text-[var(--text-subtle)]"}`} />
              <span>{item.title}</span>
              {typeof count === "number" && (
                <span
                  className={`mr-1 rounded-full px-2 py-0.5 text-[10px] font-mono border ${
                    isActive
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-300"
                      : "bg-[var(--bg-muted)] border-[var(--border-main)] text-[var(--text-muted)]"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
