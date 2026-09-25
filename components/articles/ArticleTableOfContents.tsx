"use client";

import { useEffect, useMemo, useState } from "react";
import { List } from "lucide-react";

interface ArticleTableOfContentsProps {
  content: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(value: string, index: number) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
  return `article-heading-${slug || index}`;
}

export function ArticleTableOfContents({ content }: ArticleTableOfContentsProps) {
  const headings = useMemo<HeadingItem[]>(() => {
    if (typeof DOMParser === "undefined") return [];
    const parsedDocument = new DOMParser().parseFromString(content, "text/html");
    return Array.from(parsedDocument.querySelectorAll("h2, h3")).map((heading, index) => ({
      id: slugify(heading.textContent ?? "", index),
      text: heading.textContent?.trim() || "عنوان القسم",
      level: heading.tagName === "H3" ? 3 : 2,
    }));
  }, [content]);
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start" aria-label="جدول محتويات المقال">
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)]/80 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
          <List className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
          محتويات المقال
        </div>
        <nav className="space-y-1.5">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block border-r-2 py-1 text-xs leading-5 transition-colors ${heading.level === 3 ? "pr-4" : "pr-2"} ${activeId === heading.id ? "border-[var(--accent-primary)] text-[var(--accent-primary)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}