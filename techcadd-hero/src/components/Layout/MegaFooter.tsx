"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Mail, MapPin, Phone, MessageCircle, Linkedin, Instagram, Youtube, Facebook, X, Globe,
  ArrowRight, Check, Loader2,
} from "lucide-react";
import { MEGA_FOOTER } from "@/lib/site";
import { PUBLIC_CMS_API_URL } from "@/lib/cms/client";
import { useSite } from "@/lib/cms/site-context";

/**
 * Icons for the networks the CMS can hold. Which of them actually render is
 * decided by the settings row — a network nobody has filled in is not shown at
 * all, rather than linking to `#`.
 */
const SOCIAL_ICONS: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  x: X,
  website: Globe,
};

/** The glass recipe every panel down here shares. */
const GLASS =
  "border border-white/[0.08] bg-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-[20px]";

/**
 * Star field. Positions come from index arithmetic rather than Math.random so
 * the server and client agree on the markup.
 */
const STARS = Array.from({ length: 48 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 96}%`,
  size: i % 4 === 0 ? 2 : 1,
  delay: (i % 9) * 0.55,
  duration: 4 + (i % 5),
}));

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const riseUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/** Indian mobile numbers: ten digits, and the first is 6–9. */
const MOBILE = /^[6-9]\d{9}$/;

export default function MegaFooter() {
  const site = useSite();
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Records the number as an enquiry in the CMS.
   *
   * There is no separate "updates" list to join: the counselling team works out
   * of the enquiries inbox, and a number left here is a person asking to be
   * told when a batch opens — which is a lead. `formType` is what tells them
   * apart from a course enquiry once they arrive.
   *
   * Straight to the CMS, matching the course enquiry form. The CMS refuses any
   * field it does not recognise, so a public form cannot set a status or assign
   * itself to a colleague.
   */
  const subscribe = async () => {
    if (!MOBILE.test(phone)) {
      setError(
        phone.length === 0
          ? "Enter your mobile number."
          : "That doesn't look like a 10-digit mobile number.",
      );
      return;
    }

    setError(null);
    setSending(true);

    try {
      const response = await fetch(`${PUBLIC_CMS_API_URL}/enquiries`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          // The form asks for a number and nothing else, so there is no name to
          // send. The CMS requires one, and this is the honest description of
          // what the row is.
          studentName: "Footer updates request",
          phone,
          message: "Asked to be notified when the next batch opens.",
          source: "website",
          formType: "Footer Updates",
          sourceUrl: typeof window === "undefined" ? undefined : window.location.href,
          userAgent: typeof navigator === "undefined" ? undefined : navigator.userAgent,
        }),
      });

      /*
       * A 429 here is the CMS's duplicate guard far more often than a flood —
       * the number did reach us, we are simply not recording it twice. Telling
       * the visitor it worked is the truthful answer.
       */
      if (!response.ok && response.status !== 429) {
        const payload = (await response.json().catch(() => ({}))) as { message?: string };
        setError(payload.message ?? "That didn't go through. Please try again, or call us.");
        return;
      }

      setSent(true);
      setPhone("");
    } catch {
      setError("We couldn't reach the server. Please try again, or call us.");
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#050B1F] pt-24 text-white">
      <Atmosphere />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]"
      >
        {/* newsletter + whatsapp */}
        <motion.div
          variants={riseUp}
          className={`grid gap-6 rounded-[30px] p-8 lg:grid-cols-[1.3fr_1fr] lg:p-10 ${GLASS}`}
        >
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] text-[22px] font-extrabold tracking-tight text-white">
              Get the batch calendar and career notes
            </h3>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/60">
              One message a month: new batch dates, mentor articles, and openings from our network.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* The +91 sits in the field as a fixed prefix rather than in the
                  placeholder, so the reader types ten digits and nothing else —
                  and the value we validate is never ambiguous. */}
              <div className="flex w-full items-center gap-2 rounded-full border border-[#142C8E]/45 bg-white/[0.04] px-5 py-3.5 transition-colors focus-within:border-[#3B82F6] focus-within:bg-white/[0.07] sm:max-w-sm">
                <span aria-hidden className="text-[14.5px] font-medium text-white/45">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    // digits only, capped at ten: a pasted "+91 98765 43210"
                    // becomes the ten digits we actually want
                    setPhone(e.target.value.replace(/\D/g, "").slice(-10));
                    setSent(false);
                    setError(null);
                  }}
                  placeholder="98765 43210"
                  aria-label="Mobile number"
                  aria-invalid={error !== null}
                  aria-describedby="footer-subscribe-status"
                  className="w-full bg-transparent text-[14.5px] text-white outline-none placeholder:text-white/35"
                />
              </div>
              <motion.button
                type="button"
                onClick={subscribe}
                disabled={sending}
                aria-busy={sending}
                whileHover={sending ? undefined : { y: -2 }}
                whileTap={sending ? undefined : { scale: 0.98 }}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.9)] transition-shadow duration-300 hover:shadow-[0_0_44px_-4px_rgba(59,130,246,1)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? "Sending" : sent ? "Subscribed" : "Subscribe"}
                {sending ? (
                  <Loader2 aria-hidden className="size-4 animate-spin" />
                ) : sent ? (
                  <Check aria-hidden className="size-4" />
                ) : (
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </motion.button>
            </div>

            {/* One live region for both outcomes, so either is announced */}
            <p
              id="footer-subscribe-status"
              role="status"
              aria-live="polite"
              className="mt-3 min-h-[1.25rem] text-[13px]"
            >
              {error ? <span className="text-rose-300">{error}</span> : null}
              {sent && !error ? (
                <span className="text-emerald-300">
                  Done — we&apos;ll message you when the next batch opens.
                </span>
              ) : null}
            </p>
          </div>

          <motion.a
            href={`https://wa.me/${site.phoneDigits}`}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="group flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] p-6 text-white shadow-[0_18px_46px_-22px_rgba(34,197,94,0.9)]"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-inset ring-white/30">
              <MessageCircle aria-hidden className="size-6" />
            </span>
            <span>
              <span className="block font-[family-name:var(--font-poppins)] text-[16px] font-bold">
                Chat on WhatsApp
              </span>
              <span className="mt-0.5 block text-[13px] text-white/85">
                Counsellors reply within the hour
              </span>
            </span>
            <ArrowRight
              aria-hidden
              className="ml-auto size-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.a>
        </motion.div>

        {/* sitemap */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <motion.div variants={riseUp} className="relative">
            {/* soft blue bloom behind the mark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-12 size-56 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_0%,transparent_70%)] blur-2xl"
            />

            <div className="relative">
              <Image
                src="/images/techcadd-logo-white.png"
                alt="Techcadd — Your Skill & Technology Partner"
                width={899}
                height={242}
                className="h-[46px] w-auto"
              />
              <p className="mt-6 max-w-xs text-[13.5px] leading-relaxed text-white/60">
                A decade of turning students into working engineers — through live projects,
                industry mentors and career support that doesn&apos;t stop at the certificate.
              </p>

              {/* Only the profiles an admin has actually filled in. A row of
                  icons that all link to "#" is worse than no row at all. */}
              {site.socials.length > 0 && (
                <ul className="mt-7 flex gap-3">
                  {site.socials.map(({ network, label, href }) => {
                    const Icon = SOCIAL_ICONS[network] ?? Globe;
                    return (
                      <li key={network}>
                        <motion.a
                          href={href}
                          aria-label={label}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.08, y: -3 }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 340, damping: 20 }}
                          className={`grid size-11 place-items-center rounded-full text-white/70 transition-colors duration-300 hover:border-[#60A5FA]/70 hover:text-[#93C5FD] hover:shadow-[0_0_28px_-4px_rgba(59,130,246,0.95)] ${GLASS}`}
                        >
                          <Icon aria-hidden className="size-[17px]" />
                        </motion.a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>

          {MEGA_FOOTER.columns.map((col) => (
            <motion.nav key={col.title} variants={riseUp} aria-label={col.title}>
              <h3 className="font-[family-name:var(--font-poppins)] text-[14px] font-bold text-white">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* contact bar */}
        <motion.ul variants={riseUp} className="mt-16 grid gap-4 sm:grid-cols-3">
          <ContactCard icon={MapPin} label="Location">
            {site.address}
          </ContactCard>
          <ContactCard icon={Phone} label="Phone" href={`tel:+${site.phoneDigits}`}>
            {site.phone}
          </ContactCard>
          <ContactCard icon={Mail} label="Email" href={`mailto:${site.email}`}>
            {site.email}
          </ContactCard>
        </motion.ul>

        <Divider className="mt-16" />

        {/* bottom strip */}
        <motion.div
          variants={riseUp}
          className="flex flex-col items-center justify-between gap-4 py-8 text-[12.5px] text-white/50 sm:flex-row"
        >
          <p>© {new Date().getFullYear()} {site.siteName}. All rights reserved.</p>
          {/* The legal row was three links to "#". A privacy policy and terms
              page have to be written before they can be linked, so the row is
              the sitemap — which exists — until they are. */}
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            <li>
              <FooterLink href="/sitemap.xml" className="text-[12.5px]">
                Sitemap
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/contact" className="text-[12.5px]">
                Contact
              </FooterLink>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ------------------------------- atmosphere ------------------------------- */

/**
 * The hero's night sky, reproduced with the same colour stops and mirrored so
 * the bloom sits on the left — the footer reads as the other end of the page,
 * not a repeat of the top of it.
 */
function Atmosphere() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_22%_40%,rgba(12,26,74,0.95)_0%,rgba(6,10,26,0.6)_45%,transparent_75%)]" />

      {/* violet bloom, left edge */}
      <div className="absolute -left-[12%] top-[-10%] size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.26)_0%,transparent_68%)] blur-3xl" />

      {/* electric blue pool, bottom right */}
      <div className="absolute -bottom-[18%] right-[10%] size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.26)_0%,transparent_70%)] blur-3xl" />

      {/* cool wash across the middle */}
      <div className="absolute right-[-14%] top-[26%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(30,64,175,0.18)_0%,transparent_70%)] blur-3xl" />

      {/* star field — opacity only, so it costs nothing to animate */}
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={reduced ? undefined : { opacity: [0.16, 0.7, 0.16] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          className="absolute rounded-full bg-[#93C5FD] opacity-40"
        />
      ))}

      {/* the seam with the section above */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050B1F] to-transparent" />
    </div>
  );
}

/* --------------------------------- pieces --------------------------------- */

/** Hairline that fades out at both ends. */
function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-px w-full bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.4),transparent)] ${className}`}
    />
  );
}

/** Nudges right on hover while an underline draws itself in from the left. */
function FooterLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/link relative inline-block text-[13.5px] text-white/60 transition-[color,transform] duration-300 hover:translate-x-1 hover:text-[#93C5FD] ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#60A5FA] transition-[width] duration-300 ease-out group-hover/link:w-full"
      />
    </Link>
  );
}

/** One glass tile in the contact bar. */
function ContactCard({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  href?: string;
  children: ReactNode;
}) {
  const body = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB]/25 to-[#60A5FA]/20 ring-1 ring-inset ring-white/10">
        <Icon aria-hidden className="size-[18px] text-[#93C5FD]" />
      </span>
      <span className="min-w-0">
        <span className="block font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.18em] text-white/40">
          {label}
        </span>
        <span className="mt-1 block truncate text-[14px] text-white/85 transition-colors duration-300 group-hover:text-white">
          {children}
        </span>
      </span>
    </>
  );

  return (
    <motion.li
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`group rounded-3xl p-5 ${GLASS}`}
    >
      {href ? (
        <a href={href} className="flex items-center gap-4">
          {body}
        </a>
      ) : (
        <span className="flex items-center gap-4">{body}</span>
      )}
    </motion.li>
  );
}
