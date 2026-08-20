"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { MEGA_FOOTER } from "@/lib/site";
import { socialUrl, type CmsSite } from "./content";

/**
 * The institute's own details, available to every component on every page.
 *
 * These are site-wide singular facts — one phone number, one address, one set
 * of social profiles — printed in the footer, across the contact page and in
 * the blog's career CTA. Passing them down as props from each route would mean
 * eight pages threading the same four strings through four levels of client
 * components, so they are read from context instead and fetched once, in the
 * root layout.
 *
 * The CMS is the source; the constants below are the fallback. A settings row
 * with a blank phone number must not produce a `tel:` link to nothing, and the
 * site has to render correctly with the CMS switched off entirely — so every
 * field resolves here rather than at each use site.
 */

/**
 * What the site prints when the CMS has nothing to say.
 *
 * Read from `MEGA_FOOTER.contact` rather than written out a second time
 * here. Two hand-maintained copies of the number is how the footer once
 * printed a different one from the contact page — and with the CMS off,
 * this fallback is what every page renders, so a stale value hides well.
 */
export const CONTACT_FALLBACK = {
  phone: MEGA_FOOTER.contact.phone,
  email: MEGA_FOOTER.contact.email,
  address: MEGA_FOOTER.contact.address,
} as const;

export interface SiteDetails {
  siteName: string;
  tagline?: string;
  phone: string;
  /** Digits only, for `tel:` and `wa.me` links. */
  phoneDigits: string;
  email: string;
  address: string;
  /** Headline figures, empty when the CMS has none — the caller decides what to show. */
  stats: { value: string; label: string }[];
  /** Only the networks with a usable link, in a fixed display order. */
  socials: { network: string; label: string; href: string }[];
}

/** Display order and labels. A network absent from the CMS is simply not shown. */
const NETWORKS: { network: keyof CmsSite["social"]; label: string }[] = [
  { network: "linkedin", label: "LinkedIn" },
  { network: "instagram", label: "Instagram" },
  { network: "youtube", label: "YouTube" },
  { network: "facebook", label: "Facebook" },
  { network: "x", label: "X" },
];

/** Applies the fallbacks, so nothing downstream has to. */
export function resolveSite(site: CmsSite | null): SiteDetails {
  const phone = site?.contactPhone?.trim() || CONTACT_FALLBACK.phone;

  return {
    siteName: site?.siteName?.trim() || "Techcadd",
    tagline: site?.tagline?.trim() || undefined,
    phone,
    phoneDigits: phone.replace(/\D/g, ""),
    email: site?.contactEmail?.trim() || CONTACT_FALLBACK.email,
    address: site?.address?.trim() || CONTACT_FALLBACK.address,
    stats: site?.stats ?? [],
    socials: NETWORKS.flatMap(({ network, label }) => {
      const href = socialUrl(network, site?.social?.[network]);
      return href ? [{ network, label, href }] : [];
    }),
  };
}

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
 * component rendered outside the app tree — in a test, or in Storybook — still
 * gets a complete object rather than throwing.
 */
export function useSite(): SiteDetails {
  return useContext(SiteContext) ?? resolveSite(null);
}
