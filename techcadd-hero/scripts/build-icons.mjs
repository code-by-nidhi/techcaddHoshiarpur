/**
 * Generates the site's favicons from the techcadd wordmark.
 *
 *   node scripts/build-icons.mjs
 *
 * The source is `public/images/techcadd-logo-navy.png` — the same lockup the
 * Jalandhar site serves as its own icon. That file is 3.7:1, which is why it
 * cannot simply be dropped in as a favicon: squeezed into a 16px tab slot the
 * word collapses into an unreadable smear.
 *
 * So two marks come out of the one source:
 *
 *   favicon.ico + icon.png   the "t" alone, white on brand navy. Legible at
 *                            16px, which is the only size that really has to
 *                            survive.
 *   apple-icon.png           the full "techcadd." wordmark. At 180px the word
 *                            reads, so the touch icon keeps the whole lockup.
 *
 * Both are white-on-navy, matching the poster: the source art is navy ink on
 * transparent, which would vanish against a dark tab bar.
 *
 * Outputs land in `src/app/`, where Next's file conventions pick them up
 * automatically — see the note in `layout.tsx` about the CMS favicon.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "public/images/techcadd-logo-navy.png";
const OUT = "src/app";

/** The poster navy, and the `themeColor` already declared in layout.tsx. */
const NAVY = { r: 0x10, g: 0x1e, b: 0x52, alpha: 1 };

/* -------------------------------------------------------------------------
 * Reading the source
 * ---------------------------------------------------------------------- */

const raw = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { data, info } = raw;
const { width: W, height: H, channels: CH } = info;

const alphaAt = (x, y) => data[(y * W + x) * CH + 3];

/** Tight box around everything that is not fully transparent. */
function contentBox() {
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (alphaAt(x, y) > 8) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

const box = contentBox();

/*
 * The lockup is the word with "Your Skill & Technology Partner" set beneath
 * it. The tagline is unreadable at every icon size, so both marks are cut from
 * the word only — the top ~72% of the trimmed art.
 */
const wordHeight = Math.round(box.height * 0.72);
const word = { ...box, height: wordHeight };

/**
 * Where the "t" ends.
 *
 * Found rather than hard-coded: a re-export of the logo at another size would
 * silently invalidate a literal column number, and the failure — a sliver of
 * the "e" hanging off the mark — is subtle enough to ship unnoticed. The first
 * fully transparent column after the glyph starts is the letter gap.
 */
function tGlyphWidth() {
  const empty = (x) => {
    for (let y = word.top; y < word.top + word.height; y++) {
      if (alphaAt(x, y) > 40) return false;
    }
    return true;
  };
  let seenInk = false;
  for (let x = word.left; x < word.left + word.width; x++) {
    if (!empty(x)) { seenInk = true; continue; }
    if (seenInk) return x - word.left;
  }
  throw new Error("no letter gap found — is the source still the wordmark?");
}

const tWidth = tGlyphWidth();

/* -------------------------------------------------------------------------
 * Building the marks
 * ---------------------------------------------------------------------- */

/**
 * Cuts `region` out of the source and repaints it white, keeping its alpha.
 *
 * Done on raw pixels rather than by chaining sharp's `extract`/`trim`/
 * `composite`: sharp applies those in its own fixed order, not the order they
 * are written, which makes a cut-then-recolour pipeline read correctly and
 * behave otherwise. One pass over the bytes has no such surprise, and the
 * tight box falls out of the same loop.
 */
function whiten(region) {
  // tighten the region to its own ink before cutting, so the mark is not
  // padded by whatever transparent margin the region happened to include
  let x0 = region.left + region.width, y0 = region.top + region.height, x1 = -1, y1 = -1;
  for (let y = region.top; y < region.top + region.height; y++) {
    for (let x = region.left; x < region.left + region.width; x++) {
      if (alphaAt(x, y) > 8) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }

  const width = x1 - x0 + 1;
  const height = y1 - y0 + 1;
  const out = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const at = (y * width + x) * 4;
      out[at] = 255;
      out[at + 1] = 255;
      out[at + 2] = 255;
      out[at + 3] = alphaAt(x0 + x, y0 + y);
    }
  }

  return { data: out, width, height };
}

/**
 * Centres `art` on a navy square, leaving `pad` of the side as margin on the
 * tightest axis.
 */
async function tile(art, size, pad) {
  const inner = Math.round(size * (1 - 2 * pad));
  const fitted = await sharp(art.data, { raw: { width: art.width, height: art.height, channels: 4 } })
    .resize({ width: inner, height: inner, fit: "inside", kernel: "lanczos3" })
    .png()
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: fitted, gravity: "center" }])
    .png({ compressionLevel: 9 });
}

const tMark = () => whiten({ left: word.left, top: word.top, width: tWidth, height: word.height });
const wordMark = () => whiten(word);

/* -------------------------------------------------------------------------
 * ICO
 * ---------------------------------------------------------------------- */

/**
 * An .ico is a thin directory wrapped around images; since Vista the entries
 * may be PNGs, so no BMP encoding is needed here. sharp has no ICO writer,
 * hence the 20 lines rather than a second image dependency.
 */
function ico(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);      // reserved
  header.writeUInt16LE(1, 2);      // 1 = icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;

  pngs.forEach(({ size, buf }, i) => {
    const at = i * 16;
    dir[at] = size >= 256 ? 0 : size;      // 0 means 256
    dir[at + 1] = size >= 256 ? 0 : size;
    dir[at + 2] = 0;                       // palette size
    dir[at + 3] = 0;                       // reserved
    dir.writeUInt16LE(1, at + 4);          // colour planes
    dir.writeUInt16LE(32, at + 6);         // bits per pixel
    dir.writeUInt32LE(buf.length, at + 8);
    dir.writeUInt32LE(offset, at + 12);
    offset += buf.length;
  });

  return Buffer.concat([header, dir, ...pngs.map((p) => p.buf)]);
}

/* -------------------------------------------------------------------------
 * Writing
 * ---------------------------------------------------------------------- */

/* 0.17 on the "t" and 0.09 on the word: the glyph is a lone upright and needs
   air around it to read as a mark, where the word is already mostly margin. */
const icoSizes = [16, 32, 48];
const entries = [];
for (const size of icoSizes) {
  entries.push({ size, buf: await (await tile(tMark(), size, 0.17)).toBuffer() });
}
writeFileSync(join(OUT, "favicon.ico"), ico(entries));

await (await tile(tMark(), 512, 0.17)).toFile(join(OUT, "icon.png"));
await (await tile(wordMark(), 180, 0.09)).toFile(join(OUT, "apple-icon.png"));

console.log(`source      ${SRC} (${W}x${H})`);
console.log(`wordmark    ${word.width}x${word.height} at ${word.left},${word.top}`);
console.log(`"t" glyph   ${tWidth}px wide`);
console.log(`written     ${OUT}/favicon.ico (${icoSizes.join(", ")}), icon.png (512), apple-icon.png (180)`);
