import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variantClasses = {
    default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300/50",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300/50",
    danger: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300/50",
    neutral: "bg-slate-800 text-slate-200 dark:bg-slate-900 dark:text-slate-400 border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium dir-rtl ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
