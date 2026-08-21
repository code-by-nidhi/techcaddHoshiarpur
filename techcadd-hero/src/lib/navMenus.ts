/**
 * Short-list navbar dropdowns — a list rather than a full mega panel.
 *
 * AI, Internship & Training and After 12th all graduated to their own mega
 * panels; Branches is the one item that only needs a handful of links, which
 * is exactly what this was kept for.
 */

export type NavMenuItem = {
  label: string;
  href: string;
  /** one line under the label, for the wider items */
  note?: string;
};

/**
 * The branch campuses.
 *
 * Every href is `#` on purpose: each branch runs its own website and none of
 * the addresses has been supplied yet. Nothing here creates a page or a route,
 * and nothing needs to — when an address arrives, replace the `#` with it:
 *
 *     { label: "Jalandhar", href: "https://jalandhar.techcadd.com" },
 *
 * An `http(s)` href is recognised by the dropdown and opened in a new tab with
 * `rel="noopener noreferrer"`, so an external branch site needs no other
 * change. A path such as `/branches/jalandhar` is client-navigated instead.
 */
const BRANCHES: NavMenuItem[] = [
  { label: "Hoshiarpur", href: "#" },
  { label: "Jalandhar", href: "#" },
  { label: "Amritsar", href: "#" },
  { label: "Mohali", href: "#" },
  { label: "Phagwara", href: "#" },
  { label: "Ludhiana", href: "#" },
];

export const SIMPLE_MENUS = { Branches: BRANCHES } satisfies Record<string, NavMenuItem[]>;

export type SimpleLabel = keyof typeof SIMPLE_MENUS;

export const isSimpleLabel = (label: string): label is SimpleLabel =>
  label in SIMPLE_MENUS;
