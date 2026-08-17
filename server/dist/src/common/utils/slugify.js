"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
exports.uniqueSlug = uniqueSlug;
function slugify(value) {
    return value
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 96);
}
async function uniqueSlug(base, exists) {
    const root = slugify(base);
    let candidate = root;
    let suffix = 1;
    while (await exists(candidate)) {
        suffix += 1;
        candidate = `${root}-${suffix}`;
    }
    return candidate;
}
//# sourceMappingURL=slugify.js.map