type ClassValue = string | number | false | null | undefined;

/**
 * Joins class names, dropping anything falsy.
 *
 * Deliberately not `clsx` + `tailwind-merge`: neither is a dependency of this
 * project, and no caller here relies on later utilities overriding earlier
 * conflicting ones.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
