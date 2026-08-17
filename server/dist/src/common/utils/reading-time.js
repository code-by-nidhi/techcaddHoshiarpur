"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readingTimeOf = readingTimeOf;
const WORDS_PER_MINUTE = 220;
function readingTimeOf(content) {
    const words = content
        .replace(/<[^>]+>/g, ' ')
        .split(/\s+/)
        .filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
//# sourceMappingURL=reading-time.js.map