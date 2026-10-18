export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

function decodeHtmlEntities(value: string) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const isHex = code[1]?.toLowerCase() === "x";
      const numericValue = Number.parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isInteger(numericValue)
        && numericValue >= 0
        && numericValue <= 0x10ffff
        && (numericValue < 0xd800 || numericValue > 0xdfff)
        ? String.fromCodePoint(numericValue)
        : entity;
    }

    const entities: Record<string, string> = {
      amp: "&",
      lt: "<",
      gt: ">",
      quot: "\"",
      apos: "'",
      nbsp: " ",
    };
    return entities[code.toLowerCase()] ?? entity;
  });
}

function getPlainText(html: string) {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

export function prepareArticleHeadings(content: string): {
  content: string;
  headings: ArticleHeading[];
} {
  const headings: ArticleHeading[] = [];
  const idCounts = new Map<string, number>();

  const preparedContent = content.replace(
    /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1\s*>/gi,
    (_match, rawLevel: string, rawAttributes: string, innerHtml: string) => {
      const text = getPlainText(innerHtml) || "عنوان القسم";
      const baseId = `article-heading-${slugifyHeading(text) || headings.length + 1}`;
      const occurrence = (idCounts.get(baseId) ?? 0) + 1;
      idCounts.set(baseId, occurrence);

      const id = occurrence === 1 ? baseId : `${baseId}-${occurrence}`;
      const level = Number(rawLevel) as 2 | 3;
      headings.push({ id, text, level });

      const attributes = rawAttributes.replace(/\s+id\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
      return `<h${level}${attributes} id="${id}">${innerHtml}</h${level}>`;
    },
  );

  return { content: preparedContent, headings };
}
