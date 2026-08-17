"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeArticleHtml = sanitizeArticleHtml;
exports.stripHtml = stripHtml;
exports.safeImageUrl = safeImageUrl;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const ARTICLE_POLICY = {
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
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    transformTags: {
        a: (tagName, attribs) => ({
            tagName,
            attribs: attribs.href?.startsWith('http')
                ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' }
                : attribs,
        }),
    },
};
function sanitizeArticleHtml(html) {
    return (0, sanitize_html_1.default)(html, ARTICLE_POLICY);
}
function stripHtml(html) {
    return (0, sanitize_html_1.default)(html, { allowedTags: [], allowedAttributes: {} }).trim();
}
function safeImageUrl(url) {
    if (url.startsWith('/'))
        return url;
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol) ? url : null;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=sanitize.js.map