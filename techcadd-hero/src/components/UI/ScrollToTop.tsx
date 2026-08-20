"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/*
 * Every page opens at the top.
 *
 * Two halves to this, because they fix different things:
 *
 *  - `history.scrollRestoration = "manual"` stops the browser restoring the
 *    previous offset on a refresh. It is set by an inline script in the root
 *    layout as well, because by the time this component hydrates the browser
 *    has already decided where to put the viewport — setting it here alone
 *    would show a visible jump.
 *
 *  - the effect below handles route changes.
 *
 * Hash links are deliberately left alone. The navbar links to `/#included`,
 * `/#outcomes`, `/#faq` and others; forcing the top on those would land the
 * visitor on the hero every time instead of the section they asked for.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, searchParams]);

  return null;
}
