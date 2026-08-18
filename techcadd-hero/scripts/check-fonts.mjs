/**
 * Which font weights each family actually uses.
 *
 * next/font emits and preloads one woff2 per weight, so a declared-but-unused
 * weight is dead bytes on every page load. Fonts are applied through CSS vars
 * (`font-[family-name:var(--font-poppins)]`), so this looks at the Tailwind
 * weight utility sitting in the same class string.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const WEIGHTS = {
  "font-thin": 100, "font-extralight": 200, "font-light": 300, "font-normal": 400,
  "font-medium": 500, "font-semibold": 600, "font-bold": 700, "font-extrabold": 800,
  "font-black": 900,
};

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) walk(f);
    else if ([".tsx", ".ts", ".css"].includes(extname(f))) files.push(f);
  }
})("src");

const used = {};
for (const file of files) {
  const text = readFileSync(file, "utf8");
  // each className="..." / class="..." / a css rule block
  for (const m of text.matchAll(/(?:className|class)=(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
    const cls = m[1] ?? m[2] ?? "";
    const fam = cls.match(/var\(--font-([a-z-]+)\)/);
    if (!fam) continue;
    const weights = Object.keys(WEIGHTS).filter((w) => new RegExp(`(^|[\s:])${w}(\s|$)`).test(cls));
    used[fam[1]] ??= new Set();
    // no explicit weight means it inherits — record 400 as the safe assumption
    if (weights.length === 0) used[fam[1]].add(400);
    for (const w of weights) used[fam[1]].add(WEIGHTS[w]);
  }
}

// globals.css applies families too
const css = readFileSync("src/app/globals.css", "utf8");
for (const m of css.matchAll(/var\(--font-([a-z-]+)\)[\s\S]{0,240}?font-weight:\s*(\d{3})/g)) {
  used[m[1]] ??= new Set();
  used[m[1]].add(Number(m[2]));
}

for (const [fam, set] of Object.entries(used)) {
  console.log(`--font-${fam.padEnd(11)} uses ${[...set].sort((a, b) => a - b).join(", ")}`);
}
