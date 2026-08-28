"use client";

import { useState } from "react";
import { Bookmark, Check, Share2 } from "lucide-react";

interface ToolActionsProps {
  toolSlug: string;
  toolTitle: string;
}

export function ToolActions({ toolSlug, toolTitle }: ToolActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bookmarked_tools") || "[]") as string[];
      return saved.includes(toolSlug);
    } catch {
      return false;
    }
  });
  const [isShared, setIsShared] = useState(false);

  function toggleBookmark() {
    try {
      const saved = JSON.parse(localStorage.getItem("bookmarked_tools") || "[]") as string[];
      const next = isBookmarked ? saved.filter((slug) => slug !== toolSlug) : [...saved, toolSlug];
      localStorage.setItem("bookmarked_tools", JSON.stringify(next));
      setIsBookmarked(!isBookmarked);
    } catch {
      setIsBookmarked(!isBookmarked);
    }
  }

  async function shareTool() {
    const shareData = { title: toolTitle, text: toolTitle, url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setIsShared(true);
      window.setTimeout(() => setIsShared(false), 2000);
    } catch {
      setIsShared(false);
    }
  }

  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <button
        type="button"
        onClick={shareTool}
        className="rounded-xl bg-slate-800 p-2.5 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        title="مشاركة الأداة"
        aria-label={isShared ? "تم نسخ رابط الأداة" : "مشاركة الأداة"}
      >
        {isShared ? <Check className="h-5 w-5 text-emerald-400" aria-hidden="true" /> : <Share2 className="h-5 w-5" aria-hidden="true" />}
      </button>
      <button
        type="button"
        onClick={toggleBookmark}
        className="rounded-xl bg-slate-800 p-2.5 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        title={isBookmarked ? "إزالة الأداة من المفضلة" : "حفظ الأداة في المفضلة"}
        aria-label={isBookmarked ? "إزالة الأداة من المفضلة" : "حفظ الأداة في المفضلة"}
        aria-pressed={isBookmarked}
      >
        {isBookmarked ? <Check className="h-5 w-5 text-emerald-400" aria-hidden="true" /> : <Bookmark className="h-5 w-5" aria-hidden="true" />}
      </button>
    </div>
  );
}
