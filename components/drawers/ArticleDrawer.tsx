"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, X } from "lucide-react";

interface ArticleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  articleHref: string;
  children: React.ReactNode;
}

export function ArticleDrawer({
  isOpen,
  onClose,
  articleTitle,
  articleHref,
  children,
}: ArticleDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])",
        ),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={articleTitle}>
      <button aria-label="إغلاق الدليل" onClick={onClose} className="absolute inset-0 w-full cursor-default bg-slate-950/75 backdrop-blur-sm" />
      <aside ref={drawerRef} tabIndex={-1} className="absolute inset-y-0 left-0 flex w-full max-w-2xl flex-col border-r border-slate-700 bg-slate-900 text-white shadow-2xl focus:outline-none motion-safe:animate-[slide-in-left_250ms_ease-out]">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
            <BookOpen className="h-4 w-4" />
            الدليل الإجرائي المرفق
          </div>
          <button onClick={onClose} aria-label="إغلاق" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <h2 className="mb-6 text-2xl font-black leading-tight">{articleTitle}</h2>
          <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300">
            {children}
          </div>
        </div>
        <footer className="flex items-center justify-between gap-4 border-t border-slate-800 bg-slate-950 px-5 py-4 text-xs text-slate-400">
          <span>قراءة أعمق دون فقدان بيانات الأداة</span>
          <Link href={articleHref} target="_blank" className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300">
            فتح المقال كاملاً <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </footer>
      </aside>
    </div>
  );
}