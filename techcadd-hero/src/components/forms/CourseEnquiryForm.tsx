"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiMail,
  FiMessageSquare,
  FiMonitor,
  FiPhone,
  FiShield,
  FiUser,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import { PUBLIC_CMS_API_URL } from "@/lib/cms/client";
import { DARK } from "@/components/courses/shared";
import type { Course } from "@/lib/courses/types";

/*
 * One enquiry form for every course page.
 *
 * Everything that varies — the heading, the read-only course field, the hidden
 * metadata — is derived from the `course` object the page already has. Adding a
 * course to the catalogue gives it a working, correctly-labelled form with no
 * change here.
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

/** What every track includes, regardless of subject. */
const BENEFITS = [
  { icon: FiLayers, label: "Live Project Training" },
  { icon: FiAward, label: "Internship Certificate" },
  { icon: FiBriefcase, label: "Placement Assistance" },
  { icon: FiUsers, label: "Industry Mentors" },
  { icon: FiUserCheck, label: "Interview Preparation" },
  { icon: FiMonitor, label: "Online + Offline Mode" },
];

const TRUST = ["100% Free Counselling", "No Spam Calls", "Career Guidance Included"];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function CourseEnquiryForm({
  course,
  tone = "dark",
}: {
  course: Course;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const courseName = course.shortTitle ?? course.title;

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
      /*
       * Straight to the CMS, which is where the counselling team reads its
       * enquiries. The field names are the CMS contract, not this form's: it
       * refuses anything it does not recognise, which is what stops a public
       * form from setting a status or assigning itself to a colleague.
       */
      const response = await fetch(`${PUBLIC_CMS_API_URL}/enquiries`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          studentName: values.name.trim(),
          phone: values.phone.replace(/\D/g, "").slice(-10),
          email: values.email.trim() || undefined,
          message: values.message.trim() || undefined,
          courseName,
          source: "website",
          // Which form and which page — so an enquiry is traceable without the
          // visitor having typed anything.
          formType: "Course Enquiry",
          sourceUrl: typeof window === "undefined" ? undefined : window.location.href,
          userAgent: typeof navigator === "undefined" ? undefined : navigator.userAgent,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { message?: string | string[] };
        const message = Array.isArray(payload.message) ? payload.message[0] : payload.message;

        /*
         * A 429 here is usually the duplicate guard rather than a flood — the
         * enquiry did reach us, we are simply not recording it twice. The
         * server says so in words a visitor can act on, so they are used as
         * they are rather than overwritten with a scolding about attempts.
         */
        setServerError(
          message ??
            (response.status === 429
              ? "We already have your enquiry. A counsellor will call you shortly."
              : "We couldn't submit that. Please call us instead."),
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
    <section
      id="enquiry"
      /*
       * Background set here rather than as a `bg-[...]` utility. The previous
       * class ended the gradient list with a bare hex colour, which Tailwind
       * compiles into `background-image` — and a colour is not a valid image
       * layer, so the whole declaration was dropped and the section rendered
       * with no background at all. It only ever looked right because the page
       * behind it was white.
       */
      style={{
        backgroundColor: dark ? DARK : "#FFFFFF",
        backgroundImage: dark
          ? "radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(96,165,250,0.14), transparent 35%)"
          : "radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 35%), radial-gradient(circle at bottom right, rgba(96,165,250,0.12), transparent 35%)",
      }}
      className={`relative overflow-x-clip py-16 sm:py-20 lg:py-[80px] ${dark ? "course-dark" : ""}`}
    >
      {/* floating blur shapes */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-[12%] size-[26rem] rounded-full bg-[#2563EB]/[0.09] blur-[110px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[6%] bottom-[8%] size-[30rem] rounded-full bg-[#60A5FA]/[0.09] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* ------------------------------ left ------------------------------ */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-[#2563EB]">
              Course enquiry
            </span>

            <h2 className="mt-3 font-[family-name:var(--font-sora)] text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-tight tracking-[-0.03em] text-[#0F172A]">
              Ask About {courseName}
            </h2>

            <p className="mt-3 max-w-md text-[14.5px] leading-[1.8] text-[#475569]">
              Send your question and a counsellor will call you back. No obligation to enrol.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {BENEFITS.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <div className="flex h-full items-center gap-3 rounded-[18px] border border-white/60 bg-white/60 p-3.5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] backdrop-blur-[14px] transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
                    <span className="grid size-9 shrink-0 place-content-center rounded-xl bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-white shadow-[0_8px_18px_-10px_rgba(37,99,235,0.9)]">
                      <Icon aria-hidden className="size-[15px]" />
                    </span>
                    <span className="text-[13.5px] font-medium leading-snug text-[#334155]">
                      {label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-[#64748B]">
              <FiClock aria-hidden className="size-3.5 text-[#2563EB]" />
              {course.duration} · {course.mode}
            </p>
          </motion.div>

          {/* ------------------------------ form ------------------------------ */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-[20px] sm:p-7 lg:p-9">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-[#2563EB]/10 blur-3xl"
              />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative py-12 text-center"
                >
                  <span className="mx-auto grid size-14 place-content-center rounded-full bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-white">
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
                <form onSubmit={submit} noValidate className="relative grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      id="enq-name"
                      label="Full name"
                      icon={<FiUser aria-hidden size={18} />}
                      value={values.name}
                      onChange={set("name")}
                      error={errors.name}
                      autoComplete="name"
                      placeholder="Your name"
                      required
                    />

                    <Field
                      id="enq-phone"
                      label="Phone number"
                      icon={<FiPhone aria-hidden size={18} />}
                      value={values.phone}
                      onChange={set("phone")}
                      error={errors.phone}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="10-digit mobile"
                      required
                    />
                  </div>

                  <Field
                    id="enq-email"
                    label="Email"
                    hint="optional"
                    icon={<FiMail aria-hidden size={18} />}
                    value={values.email}
                    onChange={set("email")}
                    error={errors.email}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                  />

                  {/* auto-filled from the page's course — never typed or chosen.
                      The gradient sits on a 1px wrapper so the pill keeps a
                      gradient border without a second background layer. */}
                  <div>
                    <label htmlFor="enq-course" className={LABEL}>
                      Course or service
                    </label>
                    <div className="group/course rounded-[18px] border border-[#2563EB]/20 bg-[linear-gradient(90deg,rgba(37,99,235,0.12),rgba(59,130,246,0.08))] transition-shadow duration-300 hover:shadow-[0_0_0_4px_rgba(37,99,235,0.10)]">
                      <div className="flex h-[60px] items-center gap-3 px-[18px]">
                        <span aria-hidden className="text-[18px] leading-none">
                          📘
                        </span>
                        <input
                          id="enq-course"
                          name="course"
                          value={courseName}
                          readOnly
                          aria-readonly="true"
                          className="w-full cursor-default border-0 bg-transparent p-0 text-[15px] font-semibold text-[#1D4ED8] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enq-message" className={LABEL}>
                      Message <span className="font-normal text-[#94A3B8]">optional</span>
                    </label>
                    <div className="relative mt-2">
                      <span className="pointer-events-none absolute left-[18px] top-[19px] text-[#2563EB]">
                        <FiMessageSquare aria-hidden size={18} />
                      </span>
                      <textarea
                        id="enq-message"
                        name="message"
                        rows={4}
                        value={values.message}
                        onChange={set("message")}
                        placeholder={MESSAGE_PLACEHOLDER}
                        className={`${INPUT} min-h-[140px] resize-y py-4 pl-[48px]`}
                      />
                    </div>
                  </div>

                  {serverError && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-[14px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700"
                    >
                      <FiAlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
                      {serverError}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={sending ? undefined : { y: -3 }}
                    whileTap={sending ? undefined : { scale: 0.98 }}
                    className="inline-flex h-[58px] w-full items-center justify-center gap-2 rounded-[16px] bg-[linear-gradient(135deg,#0F3CC9,#2563EB,#3B82F6)] px-8 text-[15px] font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(37,99,235,0.5)] disabled:opacity-60"
                  >
                    {sending ? "Sending…" : `Ask about ${courseName}`}
                    {!sending && <FiArrowRight aria-hidden className="size-4" />}
                  </motion.button>

                  <ul className="flex flex-wrap justify-center gap-2">
                    {TRUST.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/15 bg-white/70 px-3 py-1.5 text-[11.5px] font-medium text-[#475569] backdrop-blur-md"
                      >
                        <FiShield aria-hidden className="size-3 text-[#2563EB]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-center text-[12px] text-[#94A3B8]">
                    We use your number only to answer this enquiry.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- field bits ------------------------------- */

const LABEL = "mb-2 block text-[14px] font-semibold text-[#0F172A]";

/*
 * Glass field. `transform` is in the transition list because focus lifts the
 * field 2px — without it the lift would snap rather than ease.
 */
const INPUT =
  "w-full rounded-[18px] border border-[#2563EB]/15 bg-white/75 px-[18px] text-[15px] font-medium text-[#0F172A] outline-none backdrop-blur-[12px] transition-[border-color,box-shadow,background-color,transform] duration-300 ease-out placeholder:font-medium placeholder:text-[#64748B] focus:-translate-y-[2px] focus:border-[#2563EB] focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]";

function Field({
  id,
  label,
  hint,
  icon,
  error,
  ...input
}: {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label} {hint && <span className="font-normal text-[#94A3B8]">{hint}</span>}
      </label>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute left-[18px] top-1/2 flex -translate-y-1/2 items-center text-[#2563EB]">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT} h-[60px] pl-[48px] ${error ? "border-red-300 focus:border-red-400" : ""}`}
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
