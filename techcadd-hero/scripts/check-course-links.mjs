/**
 * Validates every /courses/<slug> link in the source against the catalogue.
 *
 * This replaces the throwaway console.log debugging: instead of watching for a
 * mismatch at runtime on one page, it proves in one pass that no card anywhere
 * points at a slug that does not exist.
 *
 *   node scripts/check-course-links.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SRC = "src";
const COURSE_DATA_DIR = "src/lib/courses";

/**
 * Slugs, read from every data file in the courses directory. Discovered rather
 * than listed: a hardcoded list silently under-reports the moment a new family
 * is added, which turns this checker into a source of false failures.
 */
const slugs = new Set();
for (const file of readdirSync(COURSE_DATA_DIR)) {
  if (extname(file) !== ".ts") continue;
  const text = readFileSync(join(COURSE_DATA_DIR, file), "utf8");
  for (const m of text.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) slugs.add(m[1]);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if ([".ts", ".tsx"].includes(extname(full))) out.push(full);
  }
  return out;
}

const broken = [];
const index = [];
const ok = new Set();

for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");
  text.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/["'`]\/courses\/([a-z0-9-]*)["'`]/g)) {
      const slug = m[1];
      if (!slug) continue; // "/courses/" is not a link we emit
      if (slugs.has(slug)) ok.add(slug);
      else broken.push({ file, line: i + 1, slug });
    }
    // bare index links are legitimate, but worth counting
    for (const _ of line.matchAll(/["'`]\/courses["'`]/g)) index.push({ file, line: i + 1 });
  });
}

console.log(`catalogue slugs      : ${slugs.size}`);
console.log(`slugs linked to      : ${ok.size}`);
console.log(`links to the index   : ${index.length}  (courses without a detail page)`);
console.log(`broken slug links    : ${broken.length}`);

const orphans = [...slugs].filter((s) => !ok.has(s)).sort();
if (orphans.length) {
  console.log(`\nreachable only by URL (no card links to them):\n  ${orphans.join("\n  ")}`);
}

if (broken.length) {
  console.log("\nBROKEN:");
  for (const b of broken) console.log(`  ${b.file}:${b.line}  ->  /courses/${b.slug}`);
  process.exit(1);
}

console.log("\nAll course links resolve to a real slug.");

/* --------------------------- duplicate slug guard ------------------------- */

const all = [];
for (const file of readdirSync(COURSE_DATA_DIR)) {
  if (extname(file) !== ".ts") continue;
  const text = readFileSync(join(COURSE_DATA_DIR, file), "utf8");
  for (const m of text.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) all.push([m[1], file]);
}

const first = new Map();
const duplicates = [];
for (const [slug, file] of all) {
  if (first.has(slug)) duplicates.push(`${slug}  (${first.get(slug)} + ${file})`);
  else first.set(slug, file);
}

console.log(`\nduplicate slugs      : ${duplicates.length}`);
for (const d of duplicates) console.log(`  ${d}`);
if (duplicates.length) process.exit(1);
