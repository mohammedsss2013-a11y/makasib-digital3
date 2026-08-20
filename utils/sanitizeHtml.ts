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

function sanitizeAttributes(tagName: string, rawAttributes: string) {
  const attributes: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = attributePattern.exec(rawAttributes)) !== null) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? "";

    if (name === "alt" || name === "title") {
      attributes.push(`${name}="${escapeAttribute(value)}"`);
    }

    if ((name === "src" || name === "href") && isSafeUrl(value)) {
      attributes.push(`${name}="${escapeAttribute(value)}"`);
    }
  }

  if (tagName === "a" && attributes.some((attribute) => attribute.startsWith("href="))) {
    attributes.push('rel="noopener noreferrer"');
  }

  return attributes.length ? ` ${attributes.join(" ")}` : "";
}

export function sanitizeHtml(html: string) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?(?:script|style|iframe|object|embed|form|input|button|textarea|select)[^>]*>/gi, "")
    .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (wholeTag, rawTagName: string, rawAttributes: string) => {
      const tagName = rawTagName.toLowerCase();
      if (!allowedTags.has(tagName)) return "";
      if (wholeTag.startsWith("</")) return `</${tagName}>`;
      const selfClosing = /\/\s*>$/.test(wholeTag) || tagName === "br" || tagName === "img";
      return `<${tagName}${sanitizeAttributes(tagName, rawAttributes)}${selfClosing ? " />" : ">"}`;
    });
}
