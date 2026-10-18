"use client";

import Link from "next/link";
import { Clock3 } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import { ArticleViewsCount } from "@/components/articles/ArticleViewsCount";

interface RelatedArticleCardProps {
  href: string;
  title: string;
  categoryLabel: string;
  coverImage: string;
  coverImageAlt: string;
  readTime: string;
  viewsCount: number;
}

export function RelatedArticleCard({
  href,
  title,
  categoryLabel,
  coverImage,
  coverImageAlt,
  readTime,
  viewsCount,
}: RelatedArticleCardProps) {
  return (
    <Link
      href={href}
      onNavigate={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group block overflow-hidden rounded-2xl border border-[var(--border-main)]/70 bg-[var(--bg-card)]/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/50 hover:shadow-lg"
    >
      <article>
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-muted)]">
          <AppImage
            src={coverImage}
            alt={coverImageAlt}
            fallbackType="article"
            fill
            sizes="(max-width: 1023px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4 p-5">
          <span className="inline-flex rounded-full border border-[var(--accent-primary)]/20 bg-[var(--accent-light)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-primary)]">
            {categoryLabel}
          </span>

          <h3 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-[var(--text-main)] transition-colors group-hover:text-[var(--accent-primary)]">
            {title}
          </h3>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-main)]/60 pt-3 text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5 text-[var(--accent-primary)]" aria-hidden="true" />
              <span>وقت القراءة: {readTime}</span>
            </span>
            <ArticleViewsCount initialCount={viewsCount} />
          </div>
        </div>
      </article>
    </Link>
  );
}
