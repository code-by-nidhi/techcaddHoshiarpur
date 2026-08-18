"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiLoader,
  FiStar,
  FiX,
} from "react-icons/fi";
import { GoogleMark } from "@/components/UI/BrandMarks";
import { demoBus } from "@/lib/demoBus";
import { PUBLIC_API_URL } from "@/lib/blog/api";
import { MEGA_FOOTER } from "@/lib/site";

const COURSES = [
  "MERN Stack Development",
  "Full Stack Development",
  "AI & Machine Learning",
  "Data Science",
  "Cyber Security",
  "Cloud & DevOps",
  "Digital Marketing",
  "AutoCAD / Civil CAD",
];

type Fields = { course: string; name: string; phone: string };
const EMPTY: Fields = { course: "", name: "", phone: "" };

function validate(v: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!v.course) e.course = "Pick the course you're interested in.";
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  // Indian mobile numbers: 10 digits, leading digit never below 6
  if (!/^[6-9]\d{9}$/.test(v.phone.replace(/\D/g, ""))) e.phone = "Enter a 10-digit number.";
  return e;
}

/**
 * The Book Demo enquiry modal. Mounted once in the root layout and opened from
 * anywhere via `demoBus.open()`.
 */
export default function DemoModal() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => demoBus.subscribe(setOpen), []);

  const close = useCallback(() => demoBus.close(), []);

  // escape to dismiss, and the page must not scroll behind the overlay
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closerRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  // a fresh dialog every time it is opened
  useEffect(() => {
    if (open) {
      setValues(EMPTY);
      setErrors({});
      setSent(false);
      setSending(false);
      setServerError(null);
    }
  }, [open]);

  const set = (key: keyof Fields) => (v: string) => {
    setValues((p) => ({ ...p, [key]: v }));
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  };

  /**
   * Sends the enquiry to the API, which writes it to MySQL.
   *
   * The submission is not treated as fire-and-forget: until the row is stored
   * the visitor is not told it was, because a "we'll call you" that never
   * reached the counselling team is worse than an error message.
   */
  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    setServerError(null);

    try {
      const response = await fetch(`${PUBLIC_API_URL}/demo-bookings`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.replace(/\D/g, "").slice(-10),
          course: values.course,
          source: demoBus.getSource(),
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string | string[];
      };

      if (!response.ok) {
        const message = Array.isArray(payload.message) ? payload.message[0] : payload.message;

        setServerError(
          response.status === 429
            ? "Too many attempts. Please wait a minute and try again."
            : (message ?? "We couldn't submit that. Please call us instead."),
        );
        return;
      }

      setSent(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (!panelRef.current?.contains(e.target as Node)) close();
          }}
          className="fixed inset-0 z-[10000] grid place-items-center overflow-y-auto bg-[#050B1F]/80 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-auto w-full max-w-[780px] overflow-hidden rounded-[28px] shadow-[0_50px_120px_-40px_rgba(5,11,31,0.95)]"
          >
            <button
              ref={closerRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
            >
              <FiX className="size-4" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* left: the pitch */}
              <div className="relative overflow-hidden bg-[linear-gradient(160deg,#141b3d_0%,#1b2452_55%,#241a4d_100%)] p-6 sm:p-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-16 -top-20 size-64 rounded-full bg-[#2563EB]/25 blur-3xl"
                />

                <h2
                  id="demo-modal-title"
                  className="relative font-[family-name:var(--font-sora)] text-[clamp(1.15rem,1.9vw,1.4rem)] font-extrabold leading-tight tracking-[-0.02em] text-white"
                >
                  <span aria-hidden className="mr-2">👋</span>
                  Still exploring? Let us help
                </h2>
                <p className="relative mt-2.5 text-[13px] leading-relaxed text-white/65">
                  Talk to a counsellor and we&apos;ll map the shortest route from where you are to
                  the job you want.
                </p>

                <figure className="relative mt-5 rounded-2xl border border-white/12 bg-white/[0.05] p-4 backdrop-blur-xl">
                  <blockquote className="text-[13.5px] font-medium leading-relaxed text-white/90">
                    &ldquo;AI is the new electricity for modern computing.&rdquo;
                  </blockquote>
                  <figcaption className="mt-3.5 flex items-center gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2563EB]/40 to-[#60A5FA]/40 ring-1 ring-inset ring-white/15">
                      <NvidiaGlyph />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[13.5px] font-semibold text-white">
                        Jensen Huang
                      </span>
                      <span className="block text-[12px] text-white/55">CEO, NVIDIA Corporation</span>
                    </span>
                  </figcaption>
                </figure>

                <div className="relative mt-4 flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-24px_rgba(5,11,31,0.9)]">
                  <span className="flex items-center gap-2.5">
                    <GoogleMark className="size-5" />
                    <span className="text-[13.5px] font-semibold text-[#0F172A]">
                      Google Verified
                    </span>
                    <FiCheckCircle aria-hidden className="size-4 text-[#2563EB]" />
                  </span>
                  <span className="flex gap-0.5" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar key={i} aria-hidden className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </span>
                </div>

                <p className="relative mt-4 text-[12px] leading-relaxed text-white/50">
                  You can also share your requirements at{" "}
                  <a
                    href={`mailto:${MEGA_FOOTER.contact.email}`}
                    className="font-semibold text-[#93C5FD] underline-offset-2 hover:underline"
                  >
                    {MEGA_FOOTER.contact.email}
                  </a>
                  , and our team will get back to you right away.
                </p>
              </div>

              {/* right: the form */}
              <div className="relative overflow-hidden bg-[linear-gradient(150deg,#1d4ed8_0%,#3b82f6_45%,#60a5fa_100%)] p-6 sm:p-7">
                <motion.span
                  aria-hidden
                  animate={{ opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -right-20 top-1/3 size-72 rounded-full bg-white/25 blur-3xl"
                />

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex h-full flex-col items-center justify-center py-12 text-center"
                    >
                      <span className="grid size-16 place-items-center rounded-full bg-white/20 ring-1 ring-inset ring-white/40">
                        <FiCheck aria-hidden className="size-8 text-white" />
                      </span>
                      <h3 className="mt-5 font-[family-name:var(--font-sora)] text-[20px] font-bold text-white">
                        Request received
                      </h3>
                      <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-white/80">
                        A counsellor will call you within the next few minutes.
                      </p>
                      <button
                        type="button"
                        onClick={close}
                        className="mt-6 rounded-full bg-white px-6 py-2.5 text-[13.5px] font-semibold text-[#0F172A]"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={submit}
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative"
                    >
                      <h3 className="font-[family-name:var(--font-sora)] text-[15.5px] font-bold leading-snug text-white sm:text-[16.5px]">
                        Tell us your goal. We&apos;ll code it into reality.
                      </h3>

                      <div className="mt-5 space-y-3">
                        <div>
                          <div className="relative">
                            <select
                              aria-label="Course of interest"
                              value={values.course}
                              onChange={(e) => set("course")(e.target.value)}
                              aria-invalid={!!errors.course}
                              className={`w-full appearance-none rounded-2xl border bg-white/15 px-4 py-3 pr-11 text-[13.5px] text-white outline-none backdrop-blur-md transition-colors duration-300 focus:bg-white/25 ${
                                errors.course ? "border-[#FCA5A5]" : "border-white/25 focus:border-white/70"
                              }`}
                            >
                              <option value="" disabled className="bg-[#1e3a8a]">
                                Select Your Course of Interest*
                              </option>
                              {COURSES.map((c) => (
                                <option key={c} value={c} className="bg-[#1e3a8a]">
                                  {c}
                                </option>
                              ))}
                            </select>
                            <FiChevronDown
                              aria-hidden
                              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/80"
                            />
                          </div>
                          <FieldError message={errors.course} />
                        </div>

                        <div>
                          <input
                            aria-label="Full name"
                            value={values.name}
                            onChange={(e) => set("name")(e.target.value)}
                            placeholder="Full Name*"
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                            className={`w-full rounded-2xl border bg-white/15 px-4 py-3 text-[13.5px] text-white outline-none backdrop-blur-md transition-colors duration-300 placeholder:text-white/70 focus:bg-white/25 ${
                              errors.name ? "border-[#FCA5A5]" : "border-white/25 focus:border-white/70"
                            }`}
                          />
                          <FieldError message={errors.name} />
                        </div>

                        <div>
                          <input
                            aria-label="Contact number"
                            value={values.phone}
                            onChange={(e) => set("phone")(e.target.value)}
                            placeholder="Contact Number (10 Digits)*"
                            inputMode="numeric"
                            autoComplete="tel"
                            aria-invalid={!!errors.phone}
                            className={`w-full rounded-2xl border bg-white/15 px-4 py-3 text-[13.5px] text-white outline-none backdrop-blur-md transition-colors duration-300 placeholder:text-white/70 focus:bg-white/25 ${
                              errors.phone ? "border-[#FCA5A5]" : "border-white/25 focus:border-white/70"
                            }`}
                          />
                          <FieldError message={errors.phone} />
                        </div>
                      </div>

                      <p className="mt-4 flex items-center gap-2.5 rounded-2xl bg-[#84CC16] px-4 py-2.5 text-[13px] font-semibold text-[#14310a]">
                        <FiCheckCircle aria-hidden className="size-4 shrink-0" />
                        Expert response within 5 minutes.
                      </p>

                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileHover={sending ? undefined : { y: -2, scale: 1.02 }}
                        whileTap={sending ? undefined : { scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 340, damping: 22 }}
                        className="group mt-4 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F172A] shadow-[0_16px_40px_-16px_rgba(5,11,31,0.8)] disabled:cursor-wait disabled:opacity-75"
                      >
                        {sending ? "Submitting…" : "Submit"}
                        {sending ? (
                          <FiLoader aria-hidden className="size-4 animate-spin" />
                        ) : (
                          <FiArrowRight
                            aria-hidden
                            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                          />
                        )}
                      </motion.button>

                      {/* Server-side failures — a rejected number, the rate
                          limiter, or MySQL being unreachable. */}
                      {serverError ? (
                        <p
                          role="alert"
                          className="mt-3 flex items-start gap-2 rounded-2xl bg-[#7f1d1d]/40 px-4 py-2.5 text-[12.5px] font-medium text-[#FEE2E2] ring-1 ring-inset ring-[#FCA5A5]/30"
                        >
                          <FiAlertCircle aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                          {serverError}
                        </p>
                      ) : null}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className="mt-1.5 pl-1 text-[12px] font-medium text-[#FEE2E2]"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/** Small stand-in mark for the quote attribution. */
function NvidiaGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 text-white/80" fill="none">
      <path
        d="M4 8h6a6 6 0 0 1 0 12H4V8Zm3 3v6h3a3 3 0 0 0 0-6H7Z"
        fill="currentColor"
      />
      <path d="M14 4h6v3h-6z" fill="currentColor" opacity=".6" />
    </svg>
  );
}
