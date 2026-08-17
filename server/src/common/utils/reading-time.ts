/** Words an average technical reader gets through in a minute. */
const WORDS_PER_MINUTE = 220;

/**
 * Reading time in whole minutes, never less than one.
 *
 * Tags are stripped first so markup does not inflate the count — an article
 * heavy with code blocks would otherwise read as twice its real length.
 */
export function readingTimeOf(content: string): number {
  const words = content
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
