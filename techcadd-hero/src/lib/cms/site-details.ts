import { safely } from "./client";
import { getSite, socialUrl, type CmsSite } from "./content";
import { WHATSAPP_NUMBER, whatsappLink as buildWhatsappLink } from "@/lib/cta";
import { MEGA_FOOTER } from "@/lib/site";

/**
 * The institute's own details, resolved from the CMS.
 *
 * Deliberately not a client module. The provider in `site-context.tsx` is what
 * carries these to client components, but three server components render a
 * WhatsApp CTA and cannot call a hook — so the resolution itself lives here,
 * where both sides can reach it, and there is one definition of what a blank
 * settings row falls back to rather than two that drift.
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

/**
 * The built-in wordmark.
 *
 * A matched pair, not one file: the navbar prints the navy version on its light
 * background and the white one on its dark, and the two share an alpha channel
 * so every glyph edge survives the colour swap. A logo uploaded to the CMS
 * replaces both — an administrator uploads one mark and it is used wherever the
 * site shows one, which is why `logo()` below takes the background rather than
 * exposing a URL.
 */
export const LOGO_FALLBACK = {
  onDark: "/images/techcadd-logo-white.png",
  onLight: "/images/techcadd-logo-navy.png",
  width: 899,
  height: 242,
  alt: "Techcadd — Your Skill & Technology Partner",
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
  /**
   * The wordmark to print on a given background.
   *
   * A CMS logo wins on both; without one the built-in pair is used, which is
   * why this is a function rather than a URL — the caller says which ground it
   * is drawing on and does not have to know whether a logo has been uploaded.
   */
  logo: (on: "dark" | "light") => { src: string; alt: string; width: number; height: number };
  favicon?: { url: string; mimeType?: string };
  /** GA4 measurement id, only when it looks like one. */
  analyticsId?: string;
  /** reCAPTCHA v3 site key. Absent means the forms submit without a token. */
  recaptchaSiteKey?: string;
  /** Digits for a wa.me link — the CMS number if usable, else the built-in one. */
  whatsappDigits: string;
  /**
   * Anchor attributes for a WhatsApp CTA, already pointed at the right number.
   *
   * Every lead CTA on the site goes through this rather than importing
   * `whatsappLink` from `@/lib/cta` directly, so a number changed in Settings
   * changes all of them at once. A CTA that imports the module helper instead
   * keeps the built-in number, which is how you get half a site on one number
   * and half on another.
   */
  whatsappLink: (message?: string) => { href: string; target: "_blank"; rel: string };
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

  /*
   * Not the phone number as a fallback: the counselling team's WhatsApp line is
   * a different number from the one printed on the contact cards, and falling
   * back to the phone would silently point every lead CTA on the site at an
   * account that may not exist.
   */
  const whatsappDigits = validWhatsappDigits(site?.whatsappNumber) ?? WHATSAPP_NUMBER;

  return {
    siteName: site?.siteName?.trim() || "Techcadd",
    tagline: site?.tagline?.trim() || undefined,
    phone,
    phoneDigits: phone.replace(/\D/g, ""),
    email: site?.contactEmail?.trim() || CONTACT_FALLBACK.email,
    address: site?.address?.trim() || CONTACT_FALLBACK.address,
    stats: site?.stats ?? [],
    logo: (on) => {
      const uploaded = site?.logo;
      if (uploaded?.url) {
        return {
          src: uploaded.url,
          alt: uploaded.alt || LOGO_FALLBACK.alt,
          // The media library records dimensions on upload; fall back to the
          // built-in ratio so `next/image` always has something to reserve.
          width: uploaded.width ?? LOGO_FALLBACK.width,
          height: uploaded.height ?? LOGO_FALLBACK.height,
        };
      }

      return {
        src: on === "dark" ? LOGO_FALLBACK.onDark : LOGO_FALLBACK.onLight,
        alt: LOGO_FALLBACK.alt,
        width: LOGO_FALLBACK.width,
        height: LOGO_FALLBACK.height,
      };
    },
    favicon: site?.favicon?.url ? site.favicon : undefined,
    analyticsId: validAnalyticsId(site?.analyticsId),
    recaptchaSiteKey: site?.recaptchaSiteKey?.trim() || undefined,
    whatsappDigits: whatsappDigits,
    whatsappLink: (message) => buildWhatsappLink(message, whatsappDigits),
    socials: NETWORKS.flatMap(({ network, label }) => {
      const href = socialUrl(network, site?.social?.[network]);
      return href ? [{ network, label, href }] : [];
    }),
  };
}

/**
 * A GA4 measurement id, or nothing.
 *
 * Real ids are `G-` and ten more characters. Anything shorter is a typo or a
 * leftover placeholder — the live settings row currently holds `G-TEST` — and
 * injecting a tag for one would put a script that can never report on every
 * page of the site, silently, which is worse than not measuring at all. Eight
 * is the floor rather than ten so a legitimately shorter id is not refused.
 */
function validAnalyticsId(value: string | undefined): string | undefined {
  const id = value?.trim() ?? "";
  return /^G-[A-Z0-9]{8,}$/i.test(id) ? id : undefined;
}

/**
 * Digits for a wa.me link, or nothing so the caller falls back to the phone.
 *
 * wa.me wants a full international number with no leading zero — a national
 * trunk prefix makes the link resolve to no account at all, and WhatsApp shows
 * the visitor an error page rather than a chat. The live settings row holds
 * `0123456789`, which is exactly that shape, so this is not hypothetical.
 */
function validWhatsappDigits(value: string | undefined): string | undefined {
  const digits = (value ?? "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return undefined;
  return digits.startsWith("0") ? undefined : digits;
}

/**
 * Fetches and resolves in one call, for server components.
 *
 * Next dedupes the underlying request against the one the root layout already
 * made, so a page calling this does not cost a second round trip. `safely`
 * means an unreachable CMS yields the fallbacks rather than failing the route.
 */
export async function getSiteDetails(): Promise<SiteDetails> {
  return resolveSite(await safely(getSite(), null as CmsSite | null));
}
