"use client";

import type { ReactNode } from "react";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { isMarkdown, markdownToHtml } from "@/utils/markdownToHtml";
import { DynamicToolRenderer } from "@/components/tools/DynamicToolRenderer";

type ArticleToolEmbedderProps = {
  content: string;
};

function renderHtmlBlock(html: string, key: string): ReactNode {
  return (
    <div
      key={key}
      className="leading-9"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}

export default function ArticleToolEmbedder({ content }: ArticleToolEmbedderProps) {
  // Auto-detect format and convert Markdown → HTML if needed
  const processedContent = isMarkdown(content) ? markdownToHtml(content) : content;

  const tokenPattern = /\[tool:([a-zA-Z0-9-]+)\]/g;
  const blocks = processedContent.split("\n\n");

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const parts = block.split(tokenPattern);
        if (parts.length === 1) return renderHtmlBlock(block, `text-${blockIndex}`);

        return parts.map((part, partIndex) => {
          if (partIndex % 2 === 1) {
            return (
              <div key={`tool-${blockIndex}-${partIndex}`} className="not-prose my-8">
                <DynamicToolRenderer slug={part} />
              </div>
            );
          }
          return part ? renderHtmlBlock(part, `text-${blockIndex}-${partIndex}`) : null;
        });
      })}
    </>
  );
}
