"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { ChevronDown, List } from "lucide-react";
import type { ArticleHeading } from "@/lib/articleHeadings";

interface ArticleTableOfContentsProps {
  headings: ArticleHeading[];
}

export function ArticleTableOfContents({ headings }: ArticleTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0 || !("IntersectionObserver" in window)) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const updateActiveHeading = () => {
      const activationLine = window.innerHeight * 0.3;
      const passedHeadings = elements.filter((element) => element.getBoundingClientRect().top <= activationLine);
      setActiveId((passedHeadings[passedHeadings.length - 1] ?? elements[0]).id);
    };

    const observer = new IntersectionObserver(updateActiveHeading, {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    });

    elements.forEach((element) => observer.observe(element));
    updateActiveHeading();
    return () => observer.disconnect();
  }, [headings]);

  const navigateToHeading = useCallback((event: MouseEvent<HTMLAnchorElement>, heading: ArticleHeading) => {
    event.preventDefault();
    const target = document.getElementById(heading.id);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: window.scrollY + target.getBoundingClientRect().top - 96,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", `#${encodeURIComponent(heading.id)}`);
    setActiveId(heading.id);
    setIsOpen(false);
  }, []);

  if (headings.length === 0) return null;

  const renderHeadingLinks = (location: "mobile" | "desktop") => (
    <nav
      aria-label="عناوين المقال"
      className="relative space-y-1 border-r border-[var(--border-main)]/70"
    >
      {headings.map((heading) => (
        <a
          key={`${location}-${heading.id}`}
          href={`#${encodeURIComponent(heading.id)}`}
          onClick={(event) => navigateToHeading(event, heading)}
          aria-current={activeId === heading.id ? "location" : undefined}
          className={`relative block rounded-l-lg py-1.5 text-sm leading-relaxed transition-colors ${
            heading.level === 3 ? "pr-6 pl-2 text-xs" : "pr-3 pl-2 font-medium"
          } ${
            activeId === heading.id
              ? "font-bold text-[var(--accent-primary)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
        >
          {activeId === heading.id && (
            <span
              className="absolute -right-px inset-y-0 w-0.5 rounded-full bg-[var(--accent-primary)]"
              aria-hidden="true"
            />
          )}
          {heading.text}
        </a>
      ))}
    </nav>
  );

  return (
    <div className="not-prose">
      <section className="rounded-2xl border border-[var(--border-main)]/70 bg-[var(--bg-card)]/90 p-4 shadow-xs backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 text-sm font-bold text-[var(--text-main)]"
          aria-expanded={isOpen}
          aria-controls="article-toc-mobile"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
            <span>محتويات المقال</span>
            <span className="text-xs font-normal text-[var(--text-muted)]">({headings.length})</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <div id="article-toc-mobile" className="mt-4 border-t border-[var(--border-main)]/50 pt-3">
            {renderHeadingLinks("mobile")}
          </div>
        )}
      </section>

      <section className="hidden rounded-2xl border border-[var(--border-main)]/70 bg-[var(--bg-card)]/90 p-5 shadow-xs backdrop-blur-md lg:block">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--text-main)]">
          <List className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
          محتويات المقال
        </h2>
        {renderHeadingLinks("desktop")}
      </section>
    </div>
  );
}

export default ArticleTableOfContents;
