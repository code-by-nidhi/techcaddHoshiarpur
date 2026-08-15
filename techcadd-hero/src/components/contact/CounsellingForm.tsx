"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { GLASS, SectionTitle, Shell, fadeUp, stagger } from "./shared";

const STATUSES = ["12th Pass", "Student", "Graduate", "Working Professional", "Business Owner"];

const COURSE_OPTIONS = [
  "Full Stack Development",
  "AI & Machine Learning",
  "Data Science",
  "Cyber Security",
  "Cloud & DevOps",
  "Digital Marketing",
];

type Fields = {
  name: string;
  mobile: string;
  email: string;
  status: string;
  course: string;
  message: string;
};

const EMPTY: Fields = { name: "", mobile: "", email: "", status: "", course: "", message: "" };

/** Returns a message per invalid field; an empty object means the form is good. */
function validate(v: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};

  if (v.name.trim().length < 2) errors.name = "Please enter your full name.";
  // Indian mobile numbers: 10 digits, and the leading digit is never below 6
  if (!/^[6-9]\d{9}$/.test(v.mobile.replace(/\D/g, "")))
    errors.mobile = "Enter a 10-digit mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!v.status) errors.status = "Tell us where you are right now.";
  if (!v.course) errors.course = "Pick the course you're curious about.";

  return errors;
}

export default function CounsellingForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    // clear the error as soon as the field is touched again
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    // wire this to your CRM or mail handler
    setSent(true);
    setValues(EMPTY);
  };

  return (
    <section id="book" className="relative scroll-mt-28 py-20 lg:py-28">
      <Shell>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-90px" }}>
          <SectionTitle
            eyebrow="Free session"
            title="Book Your Free Counselling Session"
            sub="Tell us where you are and what you want next. A counsellor calls you back the same day."
          />

          <motion.div variants={fadeUp} className={`mt-12 rounded-[30px] p-7 sm:p-10 lg:p-12 ${GLASS}`}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-10 text-center"
                >
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] shadow-[0_16px_40px_-16px_rgba(34,197,94,0.9)]">
                    <FiCheckCircle aria-hidden className="size-8 text-white" />
                  </span>
                  <h3 className="mt-6 font-[family-name:var(--font-sora)] text-[22px] font-bold text-white">
                    Request received
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-white/60">
                    A counsellor will call you shortly. If it&apos;s urgent, ring us directly and
                    mention that you booked online.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-7 text-[14px] font-semibold text-[#93C5FD] underline-offset-4 hover:underline"
                  >
                    Book another session
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
                  className="row g-4"
                >
                  <div className="col-12 col-md-6">
                    <Field
                      id="name"
                      label="Full Name"
                      value={values.name}
                      onChange={set("name")}
                      error={errors.name}
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <Field
                      id="mobile"
                      label="Mobile Number"
                      type="tel"
                      inputMode="numeric"
                      value={values.mobile}
                      onChange={set("mobile")}
                      error={errors.mobile}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="col-12">
                    <Field
                      id="email"
                      label="Email Address"
                      type="email"
                      value={values.email}
                      onChange={set("email")}
                      error={errors.email}
                      autoComplete="email"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <Select
                      id="status"
                      label="Current Status"
                      options={STATUSES}
                      value={values.status}
                      onChange={set("status")}
                      error={errors.status}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <Select
                      id="course"
                      label="Interested Course"
                      options={COURSE_OPTIONS}
                      value={values.course}
                      onChange={set("course")}
                      error={errors.course}
                    />
                  </div>

                  <div className="col-12">
                    <Field
                      id="message"
                      label="Message (optional)"
                      value={values.message}
                      onChange={set("message")}
                      textarea
                    />
                  </div>

                  <div className="col-12">
                    <motion.button
                      type="submit"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 340, damping: 22 }}
                      className="group mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-9 py-4 text-[15px] font-semibold text-white shadow-[0_0_36px_-8px_rgba(37,99,235,0.95)] transition-shadow duration-300 hover:shadow-[0_0_54px_-6px_rgba(59,130,246,1)] sm:w-auto"
                    >
                      Book Free Session
                      <FiArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Shell>
    </section>
  );
}

/* --------------------------------- inputs --------------------------------- */

const FIELD_BASE =
  "peer w-full rounded-2xl border bg-white/[0.05] px-4 pb-2.5 pt-6 text-[15px] text-white outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-transparent backdrop-blur-md";

/**
 * Floating label: the label rides up unless the control is both empty and
 * unfocused, which `placeholder-shown` detects without tracking focus in state.
 */
const LABEL_BASE =
  "pointer-events-none absolute left-4 top-2 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/45 transition-all duration-300 peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-[14.5px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-[11.5px] peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:text-[#93C5FD]";

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  inputMode?: "numeric" | "text";
  autoComplete?: string;
}) {
  const ring = error
    ? "border-[#F87171]/70 focus:border-[#F87171] focus:shadow-[0_0_0_4px_rgba(248,113,113,0.14)]"
    : "border-white/[0.15] focus:border-[#3B82F6] focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.16)]";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          rows={4}
          aria-invalid={!!error}
          className={`${FIELD_BASE} ${ring} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${FIELD_BASE} ${ring}`}
          {...rest}
        />
      )}

      <label htmlFor={id} className={LABEL_BASE}>
        {label}
      </label>

      <FieldError id={id} message={error} />
    </div>
  );
}

function Select({
  id,
  label,
  options,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const ring = error
    ? "border-[#F87171]/70 focus:border-[#F87171] focus:shadow-[0_0_0_4px_rgba(248,113,113,0.14)]"
    : "border-white/[0.15] focus:border-[#3B82F6] focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(59,130,246,0.16)]";

  return (
    <div className="relative">
      {/* a select always has a value, so its label stays parked at the top */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 z-10 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white/45"
      >
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full appearance-none rounded-2xl border bg-white/[0.05] bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="%2393C5FD" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>')] bg-[length:16px_16px] bg-[right_1rem_center] bg-no-repeat px-4 pb-2.5 pt-6 pr-10 text-[15px] text-white outline-none backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 ${ring}`}
      >
        <option value="" disabled className="bg-[#0B1220]">
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0B1220]">
            {o}
          </option>
        ))}
      </select>

      <FieldError id={id} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={`${id}-error`}
          role="alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-2 flex items-center gap-1.5 text-[12.5px] text-[#FCA5A5]"
        >
          <FiAlertCircle aria-hidden className="size-3.5 shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
