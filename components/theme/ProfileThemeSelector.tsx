"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check, Palette, Loader2 } from "lucide-react";
import { ACCENT_COLORS, AccentColor, ThemeMode } from "@/lib/themes/theme-config";
import { createClient } from "@/lib/supabase/client";

export function ProfileThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [accent, setAccent] = useState<AccentColor>("emerald");
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  // 1. استرجاع التفضيلات من Supabase ومزامنتها مع المحلية
  useEffect(() => {
    setMounted(true);

    // تطبيق اللون المحلي أولاً لمنع التأخير
    const savedAccent = (localStorage.getItem("makasib_accent_theme") as AccentColor) || "emerald";
    setAccent(savedAccent);
    document.documentElement.setAttribute("data-accent", savedAccent);

    // جلب التفضيلات من حساب المستخدم إن كان مسجلاً
    async function fetchUserTheme() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("theme_mode, theme_accent")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        if (profile.theme_mode && profile.theme_mode !== theme) {
          setTheme(profile.theme_mode);
        }
        if (profile.theme_accent && profile.theme_accent !== savedAccent) {
          setAccent(profile.theme_accent as AccentColor);
          localStorage.setItem("makasib_accent_theme", profile.theme_accent);
          document.documentElement.setAttribute("data-accent", profile.theme_accent);
        }
      }
    }

    fetchUserTheme();
  }, []);

  // 2. دالة حفظ التغييرات في Supabase
  const syncPreferencesToSupabase = useCallback(
    async (newMode?: string, newAccent?: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return; // إذا كان زائراً (Guest)، نحفظ في localStorage فقط

      setIsSaving(true);
      try {
        await supabase
          .from("profiles")
          .update({
            theme_mode: newMode || theme,
            theme_accent: newAccent || accent,
          })
          .eq("id", user.id);
      } catch (err) {
        console.error("Failed to sync theme preferences to Supabase:", err);
      } finally {
        setIsSaving(false);
      }
    },
    [supabase, theme, accent]
  );

  // 3. معالجة تغيير المظهر (Light/Dark/System)
  const handleModeChange = (newMode: ThemeMode) => {
    setTheme(newMode);
    syncPreferencesToSupabase(newMode, accent);
  };

  // 4. معالجة تغيير لون التمييز (Accent Color)
  const handleAccentChange = (newAccent: AccentColor) => {
    setAccent(newAccent);
    localStorage.setItem("makasib_accent_theme", newAccent);
    document.documentElement.setAttribute("data-accent", newAccent);
    syncPreferencesToSupabase(theme, newAccent);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800 dir-rtl">
      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Palette className="h-3.5 w-3.5 text-emerald-500" />
          <span>تخصيص المظهر والألوان</span>
        </div>
        {isSaving && <Loader2 className="h-3 w-3 animate-spin text-slate-400" />}
      </div>

      {/* اختيار المظهر (فاتح / داكن / تلقائي) */}
      <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/80">
        <button
          type="button"
          onClick={() => handleModeChange("light")}
          className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-bold transition-all ${
            theme === "light"
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
          title="الوضع الفاتح"
        >
          <Sun className="h-3.5 w-3.5 text-amber-500" />
          <span>فاتح</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("dark")}
          className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-bold transition-all ${
            theme === "dark"
              ? "bg-slate-900 text-white shadow-sm dark:bg-slate-700"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
          title="الوضع الداكن"
        >
          <Moon className="h-3.5 w-3.5 text-indigo-400" />
          <span>داكن</span>
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("system")}
          className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-bold transition-all ${
            theme === "system"
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
          title="حسب إعدادات النظام"
        >
          <Monitor className="h-3.5 w-3.5 text-emerald-400" />
          <span>تلقائي</span>
        </button>
      </div>

      {/* لوحة لون التمييز */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-slate-500 dark:text-slate-400">لون التمييز:</span>
        <div className="flex items-center gap-2 justify-between px-1">
          {ACCENT_COLORS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleAccentChange(item.id)}
              title={item.label}
              className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-transform hover:scale-110 ${item.bgClass} ${
                accent === item.id ? "ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900" : ""
              }`}
            >
              {accent === item.id && <Check className="h-3 w-3 text-white stroke-[3]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileThemeSelector;
