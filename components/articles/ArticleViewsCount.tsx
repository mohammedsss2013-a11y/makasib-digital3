"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const VIEW_COOLDOWN_MS = 24 * 60 * 60 * 1000;

interface ArticleViewsCountProps {
  initialCount: number;
  articleId?: string;
  articleSlug?: string;
  className?: string;
}

function formatViewCount(count: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Math.max(0, count));
}

export function ArticleViewsCount({
  initialCount,
  articleId,
  articleSlug,
  className = "",
}: ArticleViewsCountProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (!articleId || !articleSlug) return;

    const storageKey = `article-viewed:${articleId}`;
    const now = Date.now();

    try {
      const lastViewedAt = Number(window.localStorage.getItem(storageKey));
      if (Number.isFinite(lastViewedAt) && now - lastViewedAt < VIEW_COOLDOWN_MS) return;
      window.localStorage.setItem(storageKey, String(now));
    } catch (error) {
      console.warn("تعذر حفظ علامة مشاهدة المقال محليًا:", error);
    }

    void fetch(`/api/articles/${encodeURIComponent(articleSlug)}/view`, {
      method: "POST",
      cache: "no-store",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: Number(articleId) }),
    })
      .then(async (response) => {
        if (!response.ok) {
          window.localStorage.removeItem(storageKey);
          console.error("تعذر تسجيل مشاهدة المقال:", response.status);
          return;
        }

        const result: { counted?: boolean; viewsCount?: number } = await response.json();
        if (result.counted && typeof result.viewsCount === "number" && Number.isInteger(result.viewsCount)) {
          setCount(result.viewsCount);
        }
      })
      .catch((error: unknown) => {
        try {
          window.localStorage.removeItem(storageKey);
        } catch (storageError) {
          console.warn("تعذر إزالة علامة المشاهدة المحلية:", storageError);
        }
        console.error("تعذر الاتصال بخدمة تسجيل المشاهدات:", error);
      });
  }, [articleId, articleSlug]);

  return (
    <span
      className={`inline-flex items-center gap-1 text-[var(--text-muted)] ${className}`}
      aria-label={`${formatViewCount(count)} مشاهدة`}
      title={`${formatViewCount(count)} مشاهدة`}
    >
      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{formatViewCount(count)} مشاهدة</span>
    </span>
  );
}
