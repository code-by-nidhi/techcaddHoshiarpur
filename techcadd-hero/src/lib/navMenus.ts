/**
 * Short-list navbar dropdowns — a list rather than a full mega panel.
 *
 * Currently empty: AI, Internship & Training and After 12th all graduated to
 * their own mega panels. The machinery stays because it is the cheap option
 * for any future nav item that only needs a handful of links.
 */

export type NavMenuItem = {
  label: string;
  href: string;
  /** one line under the label, for the wider items */
  note?: string;
};

export const SIMPLE_MENUS = {} satisfies Record<string, NavMenuItem[]>;

export type SimpleLabel = keyof typeof SIMPLE_MENUS;

export const isSimpleLabel = (label: string): label is SimpleLabel =>
  label in SIMPLE_MENUS;
