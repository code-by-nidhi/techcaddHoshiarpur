import type { Article } from "./types";

/** "Jul 28, 2026" — the format used on cards, article headers and JSON-LD alike. */
export function formatDate(value: string | null): string {
  if (!value) return "";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Machine-readable date for `<time dateTime>` and structured data. */
export function isoDate(value: string | null): string | undefined {
  return value ?? undefined;
}

/** "TechCADD Team" -> "TT". Used by the avatar when an author has no image. */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => /[a-z]/i.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function readingLabel(article: Pick<Article, "readingTime">): string {
  return `${article.readingTime} min read`;
}

/**
 * Stand-in artwork for an article with no cover image.
 *
 * next/image treats an empty src as a bug and throws, so a card would take the
 * whole page down over a missing photograph. A house image is the right answer
 * anyway: an article is worth reading whether or not anyone found a picture
 * for it.
 */
const PLACEHOLDER_COVER = "/images/courses/default-course.webp";

export function coverOf(article: Pick<Article, "featuredImage">): string {
  return article.featuredImage || PLACEHOLDER_COVER;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Adds stable ids to an article's H2/H3 headings and returns the table of
 * contents built from the same pass.
 *
 * Done here, on the server, rather than in the browser: generating the list
 * client-side means the contents panel pops in after hydration and the anchors
 * do not exist for anyone arriving on a deep link.
 */
export function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const withIds = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();

      const base =
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 60) || "section";

      // two headings can legitimately share a title; the anchor cannot
      let id = base;
      let suffix = 1;
      while (used.has(id)) {
        suffix += 1;
        id = `${base}-${suffix}`;
      }
      used.add(id);

      toc.push({ id, text, level: level === "2" ? 2 : 3 });

      return `<h${level} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: withIds, toc };
}
