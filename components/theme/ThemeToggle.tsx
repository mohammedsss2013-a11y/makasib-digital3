"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)]/50" />
    );
  }

  const handleCycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeInfo = () => {
    if (theme === "light") {
      return {
        icon: <Sun className="h-4 w-4 text-amber-500 animate-in spin-in-180 duration-200" />,
        label: "الوضع الفاتح الكامل",
      };
    }
    if (theme === "dark") {
      return {
        icon: <Moon className="h-4 w-4 text-indigo-400 animate-in spin-in-180 duration-200" />,
        label: "الوضع الداكن الكامل",
      };
    }
    return {
      icon: <Monitor className="h-4 w-4 text-teal-500 animate-in spin-in-180 duration-200" />,
      label: "الوضع التلقائي (رصاصي مموج)",
    };
  };

  const current = getThemeInfo();

  return (
    <button
      type="button"
      onClick={handleCycleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-main)] bg-[var(--bg-muted)]/70 text-[var(--text-muted)] transition-all hover:border-emerald-500/70 hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)] focus-ring"
      title={`${current.label} - انقر للتبديل (فاتح / داكن / مموج)`}
      aria-label={`${current.label} - تبديل المظهر`}
    >
      {current.icon}
    </button>
  );
}

export default ThemeToggle;
