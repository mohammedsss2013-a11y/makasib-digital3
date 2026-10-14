/**
 * Lightweight Markdown → safe HTML converter.
 * Supports: headings, bold, italic, blockquote, unordered/ordered lists,
 * horizontal rules, inline code, code blocks, and paragraphs.
 * All output is then sanitized via sanitizeHtml.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Render inline markdown (bold, italic, code, links) within a text segment.
 */
function renderInline(text: string): string {
  return text
    // Inline code `code`
    .replace(/`([^`]+)`/g, (_, c) => `<code>${escapeHtml(c)}</code>`)
    // Bold **text** or __text__
    .replace(/\*\*(.+?)\*\*|__(.+?)__/g, (_, a, b) => `<strong>${a ?? b}</strong>`)
    // Italic *text* or _text_
    .replace(/\*(.+?)\*|_(.+?)_/g, (_, a, b) => `<em>${a ?? b}</em>`)
    // Links [text](url)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, (_, t, u) =>
      `<a href="${escapeHtml(u)}" rel="noopener noreferrer">${escapeHtml(t)}</a>`)
    // Emoji shortcodes 📊 etc. pass through as-is
    ;
}

/**
 * Detects whether a string is markdown (starts with # or ** or has markdown patterns).
 */
export function isMarkdown(content: string): boolean {
  const trimmed = content.trimStart();
  // Starts with a markdown pattern
  if (/^#{1,6}\s/.test(trimmed)) return true;
  if (/^\*\*/.test(trimmed)) return true;
  if (/^##/.test(trimmed)) return true;
  if (/^[-*+]\s/.test(trimmed)) return true;
  if (/^\d+\.\s/.test(trimmed)) return true;
  if (/^>\s/.test(trimmed)) return true;
  if (/^```/.test(trimmed)) return true;
  // If the string has multiple lines and markdown patterns
  const markdownPatternCount = (trimmed.match(/^#{1,6}\s|^\*\*|^[-*+]\s|^\d+\.\s|^>\s/gm) || []).length;
  if (markdownPatternCount >= 2) return true;
  return false;
}

/**
 * Convert a markdown string to sanitized HTML.
 */
export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let i = 0;
  let inList: "ul" | "ol" | null = null;
  let inCodeBlock = false;
  let codeLines: string[] = [];

  const closeList = () => {
    if (inList) {
      html.push(`</${inList}>`);
      inList = null;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        closeList();
        inCodeBlock = true;
        codeLines = [];
      } else {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        inCodeBlock = false;
        codeLines = [];
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}\s*$/.test(line)) {
      closeList();
      html.push("<hr />");
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      closeList();
      html.push(`<blockquote><p>${renderInline(line.slice(2))}</p></blockquote>`);
      i++;
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[-*+]\s+(.*)/);
    if (ulMatch) {
      if (inList !== "ul") {
        closeList();
        html.push("<ul>");
        inList = "ul";
      }
      html.push(`<li>${renderInline(ulMatch[1])}</li>`);
      i++;
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.*)/);
    if (olMatch) {
      if (inList !== "ol") {
        closeList();
        html.push("<ol>");
        inList = "ol";
      }
      html.push(`<li>${renderInline(olMatch[1])}</li>`);
      i++;
      continue;
    }

    // Empty line = paragraph break
    if (line.trim() === "") {
      closeList();
      i++;
      continue;
    }

    // Otherwise: paragraph — collect consecutive non-empty, non-special lines
    closeList();
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/^#{1,6}\s|^[-*+]\s|^\d+\.\s|^>\s|^```|^[-*_]{3,}\s*$/)) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      html.push(`<p>${renderInline(paraLines.join(" "))}</p>`);
    }
    continue;
  }

  closeList();

  return html.join("\n");
}
