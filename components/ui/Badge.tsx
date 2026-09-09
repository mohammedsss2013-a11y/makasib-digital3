import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "accent"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "default"
  | "danger"
  | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

export function Badge({ className, variant = "accent", size = "sm", children, ...props }: BadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
  };

  const variantStyles: Record<BadgeVariant, string> = {
    accent:
      "bg-[var(--accent-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 font-bold",
    secondary:
      "bg-[var(--bg-muted)] text-[var(--text-muted)] border border-[var(--border-main)] font-medium",
    outline:
      "bg-transparent text-[var(--text-main)] border border-[var(--border-subtle)] font-medium",
    success:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold",
    warning:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold",
    default:
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 font-medium",
    danger:
      "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold",
    neutral:
      "bg-slate-800 text-slate-200 dark:bg-slate-900 dark:text-slate-400 border-slate-700 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full tracking-wide transition-colors shrink-0 dir-rtl",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
