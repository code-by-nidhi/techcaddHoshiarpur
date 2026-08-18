/**
 * Verifies every icon imported from react-icons actually exists in the package.
 * A typo'd icon name is a runtime `undefined is not a component`, which no
 * amount of type-checking catches because the barrel files are all `any`-ish.
 *
 *   node scripts/check-icons.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if ([".ts", ".tsx"].includes(extname(full))) out.push(full);
  }
  return out;
}

const bad = [];
let checked = 0;

for (const file of walk("src")) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*["'](react-icons\/[a-z0-9]+)["']/g)) {
    const pack = await import(m[2]);
    for (const raw of m[1].split(",")) {
      const name = raw.replace(/\btype\b/, "").trim();
      if (!name) continue;
      checked++;
      if (!(name in pack)) bad.push({ file, name, pack: m[2] });
    }
  }
}

console.log(`icon imports checked : ${checked}`);
console.log(`nonexistent icons    : ${bad.length}`);
for (const b of bad) console.log(`  ${b.file}  ->  ${b.name} not in ${b.pack}`);
process.exit(bad.length ? 1 : 0);
