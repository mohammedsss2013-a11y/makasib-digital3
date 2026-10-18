function decodeHtmlEntities(value: string) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const isHex = code[1]?.toLowerCase() === "x";
      const numericValue = Number.parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      if (
        Number.isInteger(numericValue)
        && numericValue >= 0
        && numericValue <= 0x10ffff
        && (numericValue < 0xd800 || numericValue > 0xdfff)
      ) {
        return String.fromCodePoint(numericValue);
      }
      return entity;
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

export function cleanArticleSpeechText(content: string) {
  return decodeHtmlEntities(
    content
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(script|style|pre|code)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/~~~[\s\S]*?~~~/g, " ")
      .replace(/`[^`\n]*`/g, " ")
      .replace(/^\s{4,}.*$/gm, " ")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, " ")
      .replace(/!\[([^\]]*)\]\[[^\]]*\]/g, " ")
      .replace(/\[([^\]]+)\]\((?:https?:\/\/|mailto:)[^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
      .replace(/<https?:\/\/[^>]+>/gi, " ")
      .replace(/https?:\/\/\S+/gi, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/^\s{0,3}#{1,6}\s+/gm, "")
      .replace(/^\s{0,3}>\s?/gm, "")
      .replace(/^\s*(?:[-*+]|\d+[.)])\s+/gm, "")
      .replace(/^\s*\|/gm, " ")
      .replace(/\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?/g, " ")
      .replace(/[`*_~]/g, " ")
      .replace(/[ \t]+/g, " ")
      .replace(/\s*\n\s*/g, ". ")
      .replace(/([.!؟،؛:])(?:\s*[.!؟،؛:])+/g, "$1")
      .replace(/\s+([،؛.!؟:])/g, "$1")
      .replace(/([،؛.!؟:])(?=\S)/g, "$1 ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

export interface SpeechTextChunk {
  text: string;
  start: number;
}

export function splitSpeechText(text: string, maxChunkLength = 220): SpeechTextChunk[] {
  if (!text.trim() || !Number.isInteger(maxChunkLength) || maxChunkLength < 1) return [];

  const chunks: SpeechTextChunk[] = [];
  let start = 0;

  while (start < text.length) {
    while (/\s/.test(text[start] ?? "")) start += 1;
    if (start >= text.length) break;

    let end = Math.min(start + maxChunkLength, text.length);
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(" ", end);
      if (lastSpace > start) {
        end = lastSpace;
      } else {
        const lastSentenceBoundary = Math.max(
          text.lastIndexOf(".", end),
          text.lastIndexOf("!", end),
          text.lastIndexOf("؟", end),
          text.lastIndexOf("?", end),
        );
        if (lastSentenceBoundary >= start) end = lastSentenceBoundary + 1;
      }
    }

    const chunkText = text.slice(start, end).trimEnd();
    if (chunkText) chunks.push({ text: chunkText, start });
    start = end;
  }

  return chunks;
}
