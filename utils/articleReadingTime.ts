import { cleanArticleSpeechText } from "@/utils/articleSpeechText";

export const WORDS_PER_READING_MINUTE = 220;

export function getArticleReadingMinutes(content: string): number {
  const words = cleanArticleSpeechText(content).match(/\S+/g)?.length ?? 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_READING_MINUTE));
}

export function formatArticleReadingTime(minutes: number): string {
  const safeMinutes = Math.max(1, Math.floor(minutes));
  if (safeMinutes === 1) return "دقيقة واحدة";
  if (safeMinutes === 2) return "دقيقتان";
  if (safeMinutes >= 3 && safeMinutes <= 10) return `${safeMinutes} دقائق`;
  return `${safeMinutes} دقيقة`;
}

export function getArticleReadingTime(content: string): string {
  return formatArticleReadingTime(getArticleReadingMinutes(content));
}
