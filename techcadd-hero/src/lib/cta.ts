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
  "Hi TechCadd, I would like to know more about your courses and training programs.";

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
