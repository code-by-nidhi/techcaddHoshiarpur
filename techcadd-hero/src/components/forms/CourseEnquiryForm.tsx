"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { PUBLIC_API_URL } from "@/lib/blog/api";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, fadeUp } from "@/components/courses/shared";

/*
 * One enquiry form for all 32 course pages.
 *
 * Everything that varies — the heading, the read-only course field, the
 * benefit list, the hidden metadata — is derived from the `course` object the
 * page already has. Adding a course to the catalogue gives it a working,
 * correctly-labelled form with no change here.
 *
 * The course is taken as a prop rather than read from useParams(): the page is
 * a server component that has already resolved the course, so a prop cannot
 * drift out of sync with what the rest of the page is rendering.
 */

type Fields = { name: string; phone: string; email: string; message: string };

const EMPTY: Fields = { name: "", phone: "", email: "", message: "" };

const MESSAGE_PLACEHOLDER =
  "Ask about batch timings, fees, placement support, certification, internship or career guidance.";

function validate(v: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};

  if (v.name.trim().length < 2) errors.name = "Please tell us your name.";

  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "A 10-digit mobile number, please.";

  // optional, but a typo is worth catching before it costs a reply
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) {
    errors.email = "That email address looks incomplete.";
  }

  return errors;
}

export default function CourseEnquiryForm({ course }: { course: Course }) {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const courseName = course.shortTitle ?? course.title;

  /* Course-specific, straight from the catalogue: every course declares its
     own learning outcomes, so no two forms show the same three. */
  const benefits = course.learningOutcomes.slice(0, 3);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    setServerError(null);

    try {
      const response = await fetch(`${PUBLIC_API_URL}/course-enquiries`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.replace(/\D/g, "").slice(-10),
          email: values.email.trim() || undefined,
          message: values.message.trim() || undefined,
          // hidden metadata — collected here so every enquiry is traceable to
          // the page it came from without the visitor typing anything
          courseName,
          courseSlug: course.slug,
          courseCategory: course.category,
          pageUrl: typeof window === "undefined" ? "" : window.location.href,
          referrer: typeof document === "undefined" ? "" : document.referrer,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { message?: string | string[] };
        const message = Array.isArray(payload.message) ? payload.message[0] : payload.message;

        setServerError(
          response.status === 429
            ? "Too many attempts. Please wait a minute and try again."
            : (message ?? "We couldn't submit that. Please call us instead."),
        );
        return;
      }

      setSent(true);
      setValues(EMPTY);
    } catch {
      setServerError("We couldn't reach the server. Please call us instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="enquiry" tint>
      <Reveal>
        <div className="row g-4 g-lg-5 align-items-center">
          {/* ---------------------------- left ---------------------------- */}
          <motion.div variants={fadeUp} className="col-12 col-lg-5">
            <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-[#2563EB]">
              Course enquiry
            </span>

            <h2 className="mt-3 font-[family-name:var(--font-sora)] text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-[-0.025em] text-[#0F172A]">
              Ask About {courseName}
            </h2>

            <p className="mt-3 text-[14.5px] leading-[1.8] text-[#475569]">
              Send your question and a counsellor will call you back. No obligation to enrol.
            </p>

            <ul className="mt-6 grid gap-3 p-0">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-[14px] text-[#334155]">
                  <span className="mt-0.5 grid size-5 shrink-0 place-content-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white">
                    <FiCheck aria-hidden size={11} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-[#64748B]">
              <FiClock aria-hidden className="size-3.5 text-[#2563EB]" />
              {course.duration} · {course.mode}
            </p>
          </motion.div>

          {/* ---------------------------- form ---------------------------- */}
          <motion.div variants={fadeUp} className="col-12 col-lg-7">
            <div className="relative overflow-hidden rounded-[26px] border border-white/70 bg-white/70 p-5 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-7 lg:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-[#2563EB]/10 blur-3xl"
              />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative py-10 text-center"
                >
                  <span className="mx-auto grid size-14 place-content-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white">
                    <FiCheckCircle aria-hidden size={26} />
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-sora)] text-[19px] font-bold text-[#0F172A]">
                    Enquiry received
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-[14px] leading-[1.8] text-[#475569]">
                    A counsellor will call you about {courseName} shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate className="relative row g-3">
                  <Field
                    className="col-12 col-sm-6"
                    id="enq-name"
                    label="Full name"
                    icon={<FiUser aria-hidden className="size-4" />}
                    value={values.name}
                    onChange={set("name")}
                    error={errors.name}
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />

                  <Field
                    className="col-12 col-sm-6"
                    id="enq-phone"
                    label="Phone number"
                    icon={<FiPhone aria-hidden className="size-4" />}
                    value={values.phone}
                    onChange={set("phone")}
                    error={errors.phone}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10-digit mobile"
                    required
                  />

                  <Field
                    className="col-12"
                    id="enq-email"
                    label="Email"
                    hint="optional"
                    icon={<FiMail aria-hidden className="size-4" />}
                    value={values.email}
                    onChange={set("email")}
                    error={errors.email}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                  />

                  {/* auto-filled from the page's course — never typed or chosen */}
                  <div className="col-12">
                    <label htmlFor="enq-course" className={LABEL}>
                      Course or service
                    </label>
                    <div className="relative mt-1.5">
                      <input
                        id="enq-course"
                        name="course"
                        value={courseName}
                        readOnly
                        aria-readonly="true"
                        className="w-full cursor-default rounded-[14px] border border-[#2563EB]/25 bg-[#2563EB]/[0.06] px-4 py-3 text-[14px] font-semibold text-[#1D4ED8]"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="enq-message" className={LABEL}>
                      Message <span className="font-normal text-[#94A3B8]">optional</span>
                    </label>
                    <div className="relative mt-1.5">
                      <span className="pointer-events-none absolute left-3.5 top-3.5 text-[#94A3B8]">
                        <FiMessageSquare aria-hidden className="size-4" />
                      </span>
                      <textarea
                        id="enq-message"
                        name="message"
                        rows={3}
                        value={values.message}
                        onChange={set("message")}
                        placeholder={MESSAGE_PLACEHOLDER}
                        className={`${INPUT} pl-10`}
                      />
                    </div>
                  </div>

                  {serverError && (
                    <div className="col-12">
                      <p
                        role="alert"
                        className="flex items-start gap-2 rounded-[14px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700"
                      >
                        <FiAlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
                        {serverError}
                      </p>
                    </div>
                  )}

                  <div className="col-12">
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={sending ? undefined : { y: -2 }}
                      whileTap={sending ? undefined : { scale: 0.98 }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.9)] transition-shadow duration-300 hover:shadow-[0_0_44px_-4px_rgba(37,99,235,1)] disabled:opacity-60 sm:w-auto"
                    >
                      {sending ? "Sending…" : `Ask about ${courseName}`}
                      {!sending && <FiArrowRight aria-hidden className="size-4" />}
                    </motion.button>

                    <p className="mt-3 text-[12px] text-[#94A3B8]">
                      We use your number only to answer this enquiry.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------- field bits ------------------------------- */

const LABEL = "text-[12.5px] font-semibold text-[#334155]";

const INPUT =
  "w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-[14px] text-[#0F172A] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.14)]";

function Field({
  className,
  id,
  label,
  hint,
  icon,
  error,
  ...input
}: {
  className: string;
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className={LABEL}>
        {label} {hint && <span className="font-normal text-[#94A3B8]">{hint}</span>}
      </label>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT} pl-10 ${error ? "border-red-300 focus:border-red-400" : ""}`}
          {...input}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
