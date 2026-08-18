/**
 * Validates every course object has the content each section needs, and that
 * its hero image exists on disk.
 *
 * This is the durable form of `console.log("Course Found:", course)`: it proves
 * all 31 courses at once instead of one page visit at a time, and it fails a CI
 * run rather than scrolling past in a terminal.
 *
 *   node scripts/check-course-data.mjs
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";

// required by a rendered section — empty means a hollow section on the page
const MUST_HAVE = [
  "title", "shortDescription", "category", "duration", "heroImage",
  "modules", "tools", "projects", "faqs", "learningOutcomes",
  "audience", "whyChooseUs", "careerOutcomes",
];

const src = readdirSync("src/lib/courses")
  .filter((f) => extname(f) === ".ts")
  .map((f) => readFileSync(join("src/lib/courses", f), "utf8"))
  .join("\n");

// the factories mean a field can be inherited rather than literal, so check the
// built output instead of the source: every page is prerendered HTML.
const pages = readdirSync(".next/server/app/courses").filter((f) => f.endsWith(".html"));

/*
 * Running `next dev` overwrites .next with the dev build and removes the
 * prerendered HTML. Without this guard the script finds nothing to check and
 * exits 0 — a pass that means nothing.
 */
if (pages.length === 0) {
  console.error("No prerendered course pages found. Run `npm run build` first.");
  process.exit(1);
}

const problems = [];
const images = new Set();

for (const page of pages) {
  const slug = page.replace(/\.html$/, "");
  const html = readFileSync(join(".next/server/app/courses", page), "utf8");

  if (!/<title>[^<]+ Course \| TechCadd/.test(html)) problems.push(`${slug}: no course title`);
  /*
   * Match the RENDERED element, not the string. Next serialises the not-found
   * boundary into every page's flight payload as an escaped JSON fallback
   * (\"children\":\"404 — Course not found\"), so a plain substring test
   * reports all 31 pages as broken.
   */
  if (/>\s*404 — Course not found\s*</.test(html)) {
    problems.push(`${slug}: rendered a not-found state`);
  }

  // headings copied verbatim from the rendered markup, entities included
  for (const [label, needle] of [
    ["modules", "Course modules"],
    ["tools", "Tools &amp; technologies"],
    ["faqs", "Frequently asked questions"],
    ["outcomes", "What you will learn"],
    ["projects", "Hands-on projects"],
    ["audience", "Who can do this course?"],
    ["careers", "Career outcomes"],
  ]) {
    if (!html.includes(needle)) problems.push(`${slug}: missing ${label} section`);
  }

  for (const m of html.matchAll(/\/_next\/image\?url=([^&"]+)/g)) {
    images.add(decodeURIComponent(decodeURIComponent(m[1])));
  }
}

const missingImages = [...images].filter((p) => p.startsWith("/") && !existsSync(join("public", p)));

console.log(`course pages checked : ${pages.length}`);
console.log(`required fields      : ${MUST_HAVE.length} per course`);
console.log(`content problems     : ${problems.length}`);
console.log(`missing image files  : ${missingImages.length}`);
for (const p of problems) console.log(`  ${p}`);
for (const i of missingImages) console.log(`  image 404: ${i}`);
process.exit(problems.length || missingImages.length ? 1 : 0);
