"use client";

import type { ReactNode } from "react";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { DynamicToolRenderer } from "@/components/tools/DynamicToolRenderer";

type ArticleToolEmbedderProps = {
  content: string;
};

function renderTextBlock(block: string, key: string): ReactNode {
  const isList = /^\d+\./.test(block.trim());
  if (isList) {
    return (
      <ol key={key} className="list-decimal space-y-2 pr-6 leading-8 marker:text-emerald-400">
        {block.split("\n").map((item) => <li key={`${key}-${item}`}>{item.replace(/^\d+\.\s*/, "")}</li>)}
      </ol>
    );
  }

  return <div key={key} className="leading-9" dangerouslySetInnerHTML={{ __html: sanitizeHtml(block) }} />;
}

export default function ArticleToolEmbedder({ content }: ArticleToolEmbedderProps) {
  const tokenPattern = /\[tool:([a-zA-Z0-9-]+)\]/g;
  const blocks = content.split("\n\n");

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const parts = block.split(tokenPattern);
        if (parts.length === 1) return renderTextBlock(block, `text-${blockIndex}`);

        return parts.map((part, partIndex) => {
          if (partIndex % 2 === 1) {
            return (
              <div key={`tool-${blockIndex}-${partIndex}`} className="not-prose my-8">
                <DynamicToolRenderer slug={part} />
              </div>
            );
          }
          return part ? renderTextBlock(part, `text-${blockIndex}-${partIndex}`) : null;
        });
      })}
    </>
  );
}
