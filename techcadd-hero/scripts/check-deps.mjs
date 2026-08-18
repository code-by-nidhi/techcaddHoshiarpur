/**
 * Flags declared dependencies that no source file imports.
 *
 *   node scripts/check-deps.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const deps = Object.keys(pkg.dependencies ?? {});

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) walk(f);
    else if ([".ts", ".tsx", ".mjs", ".js", ".css"].includes(extname(f))) files.push(f);
  }
})("src");
files.push("next.config.ts");

const src = files.map((f) => readFileSync(f, "utf8")).join("\n");

// every module specifier that appears in an import/require/@import
const specifiers = new Set();
// `import "pkg/style.css"` has no `from`, so it needs its own alternative
for (const m of src.matchAll(
  /from\s+["']([^"']+)["']|import\s+["']([^"']+)["']|require\(["']([^"']+)["']\)|@import\s+["']([^"']+)["']/g
)) {
  specifiers.add(m[1] ?? m[2] ?? m[3] ?? m[4]);
}

// react/react-dom are the runtime itself — Next requires them whether or not
// a file names them directly
const IMPLICIT = new Set(["react", "react-dom", "next"]);
const unused = deps.filter(
  (d) => !IMPLICIT.has(d) && ![...specifiers].some((s) => s === d || s.startsWith(d + "/")),
);

console.log(`dependencies declared : ${deps.length}`);
console.log(`never imported        : ${unused.length}`);
for (const u of unused) console.log(`  ${u}`);
