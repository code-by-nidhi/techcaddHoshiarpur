"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { CmsSite } from "./content";
import { resolveSite, type SiteDetails } from "./site-details";

/**
 * The institute's own details, available to every component on every page.
 *
 * These are site-wide singular facts — one phone number, one address, one set
 * of social profiles — printed in the footer, across the contact page and on
 * every WhatsApp CTA. Passing them down as props from each route would mean
 * eight pages threading the same strings through four levels of client
 * components, so they are read from context instead and fetched once, in the
 * root layout.
 *
 * The values themselves, and what they fall back to when the CMS has nothing to
 * say, are resolved in `site-details.ts` — which server components share.
 */

export { CONTACT_FALLBACK, LOGO_FALLBACK, resolveSite, getSiteDetails } from "./site-details";
export type { SiteDetails } from "./site-details";

const SiteContext = createContext<SiteDetails | null>(null);

export function SiteProvider({
  site,
  children,
}: {
  site: CmsSite | null;
  children: ReactNode;
}) {
  const value = useMemo(() => resolveSite(site), [site]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/**
 * The resolved details.
 *
 * Falls back to the same defaults when there is no provider above it, so a
 * component rendered outside the app tree still gets a complete object rather
 * than throwing.
 */
export function useSite(): SiteDetails {
  return useContext(SiteContext) ?? resolveSite(null);
}
