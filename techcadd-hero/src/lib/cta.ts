/**
 * Every call to action's destination, in one place.
 *
 * Two kinds of CTA exist on this site and they behave differently:
 *
 *  - a lead CTA — counselling, admission, enquiry, demo, training, internship,
 *    enrolment — opens WhatsApp in a new tab, because a conversation converts
 *    better than a form and the counselling team already works out of WhatsApp;
 *  - a navigation CTA — "Contact Us", "Explore Course" — goes to the page it
 *    names, through next/link.
 *
 * Nothing here decides which is which. Each CTA site picks `CTA.whatsapp` or a
 * route, and the helpers below hand back the attributes that go with it, so a
 * changed number or message is a one-line edit rather than a sweep of twenty
 * components.
 */

/** Digits only, in international form, as wa.me requires. */
export const WHATSAPP_NUMBER = "916284347710";

/** What the chat is pre-filled with when no CTA asks for something narrower. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi TechCadd, I would like to know more about your courses.";

/**
 * A wa.me link, optionally with its own opening message.
 *
 * Pass `message` where the context is worth carrying into the chat — a course
 * page can open with the course name, which saves the counsellor a question.
 */
export function whatsappHref(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** The destinations themselves. */
export const CTA = {
  /** Every lead CTA on the site. */
  whatsapp: whatsappHref(),
  /** Where a CTA that names the contact page goes. */
  contact: "/contact",
} as const;

/**
 * The attributes an external CTA needs, spread onto an anchor.
 *
 * `rel="noopener noreferrer"` is not optional on a `_blank` link: without
 * `noopener` the opened tab gets a handle on `window.opener` and can navigate
 * this one somewhere else.
 *
 *     <motion.a {...whatsappLink()} className="…">Book Demo</motion.a>
 */
export function whatsappLink(message?: string) {
  return {
    href: message ? whatsappHref(message) : CTA.whatsapp,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}

/* -------------------------------------------------------------------------- */
/*  the other three ways to reach us                                          */
/* -------------------------------------------------------------------------- */

/*
 * The phone number, address and email are CMS content — Settings holds one of
 * each and `useSite()` serves it, falling back to MEGA_FOOTER.contact. So these
 * are builders that take the current value rather than constants that would go
 * stale the moment somebody edits Settings.
 */

/** `tel:` from any formatting of a number: "+91 62843 47710" -> "tel:+916284347710". */
export function telHref(phone: string): string {
  return `tel:+${phone.replace(/\D/g, "")}`;
}

export function mailtoHref(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}

/**
 * A Google Maps link for a written address.
 *
 * The `search/?api=1&query=` form is Google's documented URL scheme: it needs
 * no API key and no coordinates, which matters because we do not have verified
 * coordinates for the campus and inventing them would drop a pin on the wrong
 * building.
 */
export function mapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/**
 * The campus, written out in full.
 *
 * Separate from the address `useSite()` serves, which is the short line the
 * footer and the contact cards display. This is the precise one, and it is what
 * a map lookup and the LocalBusiness schema need: "Techcadd, Hoshiarpur,
 * Punjab" drops a pin on the town, not on the door.
 */
export const POSTAL_ADDRESS = {
  street: "Shop No 4, City Center, near Bus Stand",
  locality: "Model Town, Hoshiarpur",
  region: "Punjab",
  postalCode: "146001",
  country: "IN",
} as const;

/** The full address on one line, as a map query wants it. */
export const FULL_ADDRESS =
  `${POSTAL_ADDRESS.street}, ${POSTAL_ADDRESS.locality}, ${POSTAL_ADDRESS.region} ${POSTAL_ADDRESS.postalCode}`;

/** The campus on Google Maps. Every location card points here. */
export const MAPS_HREF = mapsHref(FULL_ADDRESS);

/** Attributes for any link that leaves the site — maps, WhatsApp, socials. */
export function externalLink(href: string) {
  return { href, target: "_blank" as const, rel: "noopener noreferrer" };
}
