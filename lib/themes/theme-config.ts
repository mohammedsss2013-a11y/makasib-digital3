export type ThemeMode = "light" | "dark" | "system";
export type AccentColor = "emerald" | "sapphire" | "gold" | "teal" | "rose";

export interface ThemeConfig {
  mode: ThemeMode;
  accent: AccentColor;
}

export const ACCENT_COLORS: {
  id: AccentColor;
  label: string;
  bgClass: string;
  borderClass: string;
}[] = [
  { id: "emerald", label: "زمردي", bgClass: "bg-emerald-500", borderClass: "border-emerald-500" },
  { id: "sapphire", label: "ياقوتي", bgClass: "bg-blue-500", borderClass: "border-blue-500" },
  { id: "gold", label: "ذهبي", bgClass: "bg-amber-500", borderClass: "border-amber-500" },
  { id: "teal", label: "تيال", bgClass: "bg-teal-500", borderClass: "border-teal-500" },
  { id: "rose", label: "وردي", bgClass: "bg-rose-500", borderClass: "border-rose-500" },
];
