import { z } from "zod";

/**
 * The Book Demo enquiry contract, shared by the modal and the API route.
 *
 * Defining it once is the point: the dropdown the visitor picks from and the
 * allow-list the server checks against are the same array, so a course cannot
 * be offered in the UI and then rejected by validation.
 *
 * This module is imported by a client component, so it must stay free of
 * server-only imports — no Prisma, no `node:` modules.
 */

/** The courses offered in the modal's dropdown, in display order. */
export const COURSES = [
  "MERN Stack Development",
  "Full Stack Development",
  "AI & Machine Learning",
  "Data Science",
  "Cyber Security",
  "Cloud & DevOps",
  "Digital Marketing",
  "AutoCAD / Civil CAD",
] as const;

export type Course = (typeof COURSES)[number];

/** Which trigger opened the modal. Mirrors `DemoSource` in lib/demoBus. */
export const DEMO_SOURCES = ["navbar", "hero", "blog", "about", "footer"] as const;

/** Ten digits, first one 6–9: the Indian mobile range. */
const INDIAN_MOBILE = /^[6-9]\d{9}$/;

/** At least two letters somewhere — rejects "..", "12", "!!!" and friends. */
const HAS_NAME_LETTERS = /\p{L}.*\p{L}/u;

/** Link spam is the overwhelming majority of junk that reaches a lead form. */
const LOOKS_LIKE_SPAM = /https?:\/\/|www\.|\[url|<a\s/i;

/**
 * Reduces any of "+91 98765 43210", "098765-43210" or "9876543210" to the ten
 * significant digits, so the stored value is dialable and dedupable.
 */
export function normalisePhone(raw: string): string {
  return raw.replace(/\D/g, "").slice(-10);
}

export const demoRequestSchema = z
  .object({
    name: z
      .string({ message: "Please enter your full name." })
      .transform((v) => v.trim().replace(/\s+/g, " "))
      .pipe(
        z
          .string()
          .min(2, "Please enter your full name.")
          .max(120, "That name is too long.")
          .regex(HAS_NAME_LETTERS, "Please enter your full name.")
          .refine((v) => !LOOKS_LIKE_SPAM.test(v), "Please enter your full name."),
      ),

    phone: z
      .string({ message: "Enter a 10-digit number." })
      .transform(normalisePhone)
      .pipe(z.string().regex(INDIAN_MOBILE, "Enter a valid 10-digit mobile number.")),

    course: z.enum(COURSES, { message: "Pick the course you're interested in." }),

    /**
     * Not collected by the current modal. The column exists and the Nest
     * endpoint writes it, so the API accepts and normalises it when sent.
     */
    email: z
      .union([z.string(), z.undefined(), z.null()])
      .optional()
      .transform((v) => (typeof v === "string" && v.trim() ? v.trim().toLowerCase() : undefined))
      .pipe(
        z
          .string()
          .email("Enter a valid email address.")
          .max(254, "That email address is too long.")
          .optional(),
      ),

    /** Attribution only. An unknown value is not worth failing a lead over. */
    source: z.enum(DEMO_SOURCES).catch("navbar").default("navbar"),
  })
  /**
   * Unknown keys are rejected rather than ignored, so a caller cannot append
   * `status: "closed"` or `id: 1` to the body and have it reach the database.
   */
  .strict();

/** What the browser sends. */
export type DemoRequestInput = z.input<typeof demoRequestSchema>;

/** What the server has after validation — trimmed, normalised, safe to store. */
export type DemoRequestPayload = z.output<typeof demoRequestSchema>;

/** The API's response envelope, identical in shape for success and failure. */
export type DemoRequestResponse = {
  success: boolean;
  message: string;
  /** Present on validation failures: field name -> message, for inline errors. */
  errors?: Partial<Record<"name" | "phone" | "course" | "email", string>>;
};
