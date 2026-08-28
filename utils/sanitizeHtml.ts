const allowedTags = new Set([
  "article",
  "a",
  "blockquote",
  "br",
  "code",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "strong",
  "ul",
]);

const attributePattern = /([a-zA-Z:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function escapeAttribute(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isSafeUrl(value: string) {
  return /^(https?:\/\/|\/|#)/i.test(value.trim());
}

function sanitizeAttributes(tagName: string, rawAttributes: string, imageIndex?: number) {
  const attributes: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = attributePattern.exec(rawAttributes)) !== null) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? "";

    if (name === "alt" || name === "title") {
      attributes.push(`${name}="${escapeAttribute(value)}"`);
    }

    if ((name === "width" || name === "height") && /^\d+$/.test(value)) {
      attributes.push(`${name}="${value}"`);
    }

    if ((name === "src" || name === "href") && isSafeUrl(value)) {
      attributes.push(`${name}="${escapeAttribute(value)}"`);
    }
  }

  if (tagName === "a" && attributes.some((attribute) => attribute.startsWith("href="))) {
    attributes.push('rel="noopener noreferrer"');
  }

  if (tagName === "img" && imageIndex !== undefined) {
    attributes.push(`loading="${imageIndex === 0 ? "eager" : "lazy"}"`);
    attributes.push('decoding="async"');
    if (imageIndex === 0) attributes.push('fetchpriority="high"');
  }

  return attributes.length ? ` ${attributes.join(" ")}` : "";
}

export function sanitizeHtml(html: string, prioritizeImages = false) {
  let imageIndex = 0;

  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?(?:script|style|iframe|object|embed|form|input|button|textarea|select)[^>]*>/gi, "")
    .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (wholeTag, rawTagName: string, rawAttributes: string) => {
      const tagName = rawTagName.toLowerCase();
      if (!allowedTags.has(tagName)) return "";
      if (wholeTag.startsWith("</")) return `</${tagName}>`;
      const selfClosing = /\/\s*>$/.test(wholeTag) || tagName === "br" || tagName === "img";
      const currentImageIndex = tagName === "img" && prioritizeImages ? imageIndex++ : undefined;
      return `<${tagName}${sanitizeAttributes(tagName, rawAttributes, currentImageIndex)}${selfClosing ? " />" : ">"}`;
    });
}

export function getHtmlExcerpt(html: string) {
  return sanitizeHtml(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
