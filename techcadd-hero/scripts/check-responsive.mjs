/**
 * Static responsive audit.
 *
 * Finds the mechanical causes of horizontal overflow and cramped touch
 * targets — the things a browser would show you, but that are detectable in
 * the class strings without one. It cannot judge visual balance.
 *
 *   node scripts/check-responsive.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) walk(f);
    else if ([".tsx", ".css"].includes(extname(f))) files.push(f);
  }
})("src");

const findings = { fixedWidth: [], minWidth: [], rigidGrid: [], smallTap: [], nowrap: [] };

/** A width that cannot shrink below a 320px viewport minus gutters. */
const RISKY_PX = 300;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const short = file.replace(/^src[\/]/, "");

  text.split("\n").forEach((line, i) => {
    const at = `${short}:${i + 1}`;

    // w-[420px] with no responsive prefix and no max-w on the same element
    for (const m of line.matchAll(/(?<!:)\bw-\[(\d+)px\]/g)) {
      const px = Number(m[1]);
      if (px > RISKY_PX && !/max-w-|w-full|sm:w-|md:w-|lg:w-/.test(line)) {
        findings.fixedWidth.push(`${at}  w-[${px}px]`);
      }
    }

    // min-w traps the element open regardless of viewport
    for (const m of line.matchAll(/\bmin-w-\[(\d+)px\]/g)) {
      if (Number(m[1]) > RISKY_PX) findings.minWidth.push(`${at}  min-w-[${m[1]}px]`);
    }

    // grid-cols-N with no single-column base
    for (const m of line.matchAll(/(?<![a-z:])grid-cols-([3-9]|1[0-2])\b/g)) {
      if (!/grid-cols-1\b/.test(line)) findings.rigidGrid.push(`${at}  grid-cols-${m[1]}`);
    }

    // interactive elements shorter than a 44px target
    if (/<(button|a)\b/.test(line) || /className=.*(rounded-full|rounded-\[)/.test(line)) {
      const py = line.match(/\bpy-(\d+(?:\.\d+)?)\b/);
      const h = /\b(h|min-h)-\[(\d+)px\]|\bsize-\d+/.test(line);
      if (py && Number(py[1]) < 2.5 && !h && /<(button|a)\b/.test(line)) {
        findings.smallTap.push(`${at}  py-${py[1]}`);
      }
    }

    // nowrap on something that can hold a long string
    if (/whitespace-nowrap/.test(line) && !/text-\[1[01]|text-\[9|shrink-0/.test(line)) {
      findings.nowrap.push(`${at}`);
    }
  });
}

const label = {
  fixedWidth: "fixed px widths that cannot shrink",
  minWidth: "min-widths wider than a small phone",
  rigidGrid: "grids with no single-column base",
  smallTap: "tap targets under ~44px",
  nowrap: "whitespace-nowrap on long-form text",
};

let total = 0;
for (const [k, list] of Object.entries(findings)) {
  console.log(`\n${label[k]}: ${list.length}`);
  for (const f of list.slice(0, 10)) console.log(`  ${f}`);
  if (list.length > 10) console.log(`  … ${list.length - 10} more`);
  total += list.length;
}
console.log(`\ntotal findings: ${total}`);
