import sanitizeHtml from 'sanitize-html';

/**
 * Article HTML is sanitised on the way *in*, so what the database holds is
 * already safe and every reader — the site, a future admin preview, an RSS
 * feed — gets the same guarantee without repeating the work.
 *
 * The allow-list is deliberately editorial: everything an article needs to be
 * written well, and nothing that can execute.
 */
const ARTICLE_POLICY: sanitizeHtml.IOptions = {
  allowedTags: [
    'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'strong', 'em',
    'code', 'pre', 'img', 'figure', 'figcaption', 'hr', 'br', 'table', 'thead',
    'tbody', 'tr', 'th', 'td', 'span',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    code: ['class'],
    span: ['class'],
    th: ['scope'],
  },
  // no data: or javascript: URLs anywhere
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  transformTags: {
    // every outbound link leaves safely, whatever the author typed
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.href?.startsWith('http')
        ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' }
        : attribs,
    }),
  },
};

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, ARTICLE_POLICY);
}

/** Plain text, for excerpts and search indexing. */
export function stripHtml(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).trim();
}

/**
 * An image URL is only accepted if it is a same-origin path or an http(s) URL.
 * Anything else — `javascript:`, `data:` — is rejected by returning null.
 */
export function safeImageUrl(url: string): string | null {
  if (url.startsWith('/')) return url;

  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) ? url : null;
  } catch {
    return null;
  }
}
