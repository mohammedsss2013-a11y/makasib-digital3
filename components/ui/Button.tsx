import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, icon, children, disabled, ...props }, ref) => {
    // أنماط المقاسات
    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
      md: "h-10 px-4 text-sm gap-2 rounded-xl",
      lg: "h-12 px-6 text-base gap-2.5 rounded-2xl",
    };

    // أنماط المظهر المستندة إلى متغيرات CSS
    const variantStyles = {
      primary:
        "bg-[var(--accent-primary)] text-white shadow-sm hover:opacity-90 active:scale-[0.98] focus:ring-2 focus:ring-[var(--accent-ring)]",
      secondary:
        "bg-[var(--bg-muted)] text-[var(--text-main)] hover:bg-[var(--border-subtle)] active:scale-[0.98]",
      outline:
        "border border-[var(--border-main)] bg-transparent text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-[0.98]",
      ghost:
        "bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-muted)]",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98] focus:ring-2 focus:ring-rose-500/30",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-bold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer",
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon ? <span className="shrink-0">{icon}</span> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
