/**
 * URL slug from a title: "Python or Java First?" -> "python-or-java-first".
 *
 * Diacritics are decomposed and stripped rather than dropped whole, so
 * "Résumé" becomes "resume" instead of "rsum".
 */
export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

/**
 * A slug guaranteed not to collide, given a check against the store.
 *
 * Appends -2, -3 … rather than a random suffix: the second article about MERN
 * should read `/blog/mern-vs-mean-2`, not `/blog/mern-vs-mean-x7f2`.
 */
export async function uniqueSlug(
  base: string,
  exists: (candidate: string) => Promise<boolean>,
): Promise<string> {
  const root = slugify(base);
  let candidate = root;
  let suffix = 1;

  while (await exists(candidate)) {
    suffix += 1;
    candidate = `${root}-${suffix}`;
  }

  return candidate;
}
