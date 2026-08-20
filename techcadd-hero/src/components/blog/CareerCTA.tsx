"use client";

import Link from "next/link";
import { BadgeCheck, Phone, Sparkles, Wallet } from "lucide-react";
import { useState, type FormEvent } from "react";

import { useSite } from "@/lib/cms/site-context";

const TRUST = [
  { icon: Sparkles, label: "Free career counselling" },
  { icon: Wallet, label: "No registration fee" },
  { icon: BadgeCheck, label: "Placement support" },
];

/**
 * The site's standing career CTA, in the blog's voice.
 *
 * The phone field validates an Indian mobile number and hands off to the
 * counselling page with the number prefilled, rather than inventing a second
 * lead pipeline the team would have to monitor separately.
 */
export default function CareerCTA() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const contactPhone = useSite().phone;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const digits = phone.replace(/\D/g, "").slice(-10);
    if (digits.length !== 10) {
      setError("Enter a 10-digit mobile number.");
      return;
    }

    setError(null);
    window.location.href = `/contact?phone=${digits}`;
  }

  return (
    <section
      aria-labelledby="career-cta-heading"
      className="surface-dark relative isolate overflow-hidden bg-royal-deep px-0 py-16 lg:py-20"
    >
      {/* the decorative circles the rest of the site uses, at CTA scale */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-16 size-[24rem] rounded-full bg-brand/25 blur-[130px]" />
        <div className="absolute -right-20 -bottom-28 size-[26rem] rounded-full bg-accent/15 blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      </div>

      <div className="shell text-center">
        <h2 id="career-cta-heading" className="type-h2 mx-auto max-w-2xl">
          Ready to build your career?
        </h2>

        <p className="type-lead mx-auto mt-5 max-w-xl text-ink-muted">
          Talk to a TechCADD counselor and discover the right learning path for your goals.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="cta-phone" className="sr-only">
            Mobile number
          </label>
          <input
            id="cta-phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Your mobile number"
            autoComplete="tel"
            aria-invalid={error !== null}
            aria-describedby={error ? "cta-phone-error" : undefined}
            className="chip-border min-w-0 flex-1 rounded-full bg-white/10 px-6 py-3.5 text-[15px] text-ink placeholder:text-ink-dim backdrop-blur-md transition-shadow duration-300 focus:shadow-[0_0_0_3px_rgb(37_99_235/0.35)] focus:outline-none"
          />

          <button
            type="submit"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-royal-deep transition-shadow duration-300 hover:shadow-[0_18px_40px_-16px_rgb(255_255_255/0.6)]"
          >
            Book Demo
          </button>

          <a
            href={`tel:${contactPhone.replace(/\s+/g, "")}`}
            className="chip-border inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur-md transition-colors duration-300 hover:bg-white/15"
          >
            <Phone aria-hidden="true" className="size-4" />
            Call Now
          </a>
        </form>

        {error ? (
          <p id="cta-phone-error" role="alert" className="mt-3 text-sm text-rose-300">
            {error}
          </p>
        ) : null}

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {TRUST.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm text-ink-muted">
              <item.icon aria-hidden="true" className="size-4 text-brand-bright" />
              {item.label}
            </li>
          ))}
        </ul>

        <p className="mt-7 text-sm text-ink-dim">
          Prefer to read first?{" "}
          <Link href="/about" className="font-semibold text-brand-bright underline-offset-4 hover:underline">
            See how TechCADD trains
          </Link>
        </p>
      </div>
    </section>
  );
}
