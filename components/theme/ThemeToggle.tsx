"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-[var(--border-main)]/60 bg-[var(--bg-muted)]/40" />
    );
  }

  const isDark = (resolvedTheme || theme) === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-main)]/60 bg-[var(--bg-card)]/80 text-[var(--text-muted)] backdrop-blur-md transition-all duration-300 hover:border-[var(--accent-primary)]/50 hover:bg-[var(--bg-muted)] hover:text-[var(--text-main)] active:scale-95 focus-ring"
      title={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
      aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-500 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}

export default ThemeToggle;
