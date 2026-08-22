import { NextResponse } from "next/server";

import { CMS_API_URL } from "@/lib/cms/client";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  demoRequestSchema,
  type DemoRequestPayload,
  type DemoRequestResponse,
} from "@/lib/validations/demo-request";

/**
 * POST /api/demo-request — the Book Demo enquiry endpoint.
 *
 * Same-origin by design, and a relay rather than a store: the lead is recorded
 * by the CMS, which is where the counselling team works. Keeping the route in
 * front of it is what earns its keep — the browser never learns the CMS
 * address, there is no CORS surface, and the visitor's real IP reaches the
 * CMS's duplicate guard, which a browser request could not supply honestly.
 *
 * Nothing here trusts the browser. The modal validates so the visitor gets
 * fast feedback; this route validates again because the modal is not the only
 * thing that can post to it.
 */

// Prisma needs the Node runtime, and a write endpoint must never be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Five submissions a minute per address — matches the Nest throttler. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

/** A valid enquiry is a few hundred bytes. Anything past this is not one. */
const MAX_BODY_BYTES = 4_096;

const SUCCESS_MESSAGE = "Demo request submitted successfully.";
const GENERIC_ERROR = "Something went wrong. Please try again.";

function json(body: DemoRequestResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request): Promise<NextResponse> {
  // 1. Rate limit before any parsing, so a flood costs as little as possible.
  const limit = rateLimit(`demo-request:${clientIp(request.headers)}`, RATE_LIMIT, RATE_WINDOW_MS);

  if (!limit.ok) {
    return json(
      { success: false, message: "Too many attempts. Please wait a minute and try again." },
      429,
      { "retry-after": String(limit.retryAfter) },
    );
  }

  // 2. Only JSON. A form post from another origin would arrive as
  //    urlencoded or multipart, and is refused here.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ success: false, message: GENERIC_ERROR }, 415);
  }

  // 3. Size cap. The declared length is checked first because it is free, and
  //    the decoded body second because the header can lie or be absent.
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ success: false, message: GENERIC_ERROR }, 413);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ success: false, message: GENERIC_ERROR }, 400);
  }

  if (raw.length > MAX_BODY_BYTES) {
    return json({ success: false, message: GENERIC_ERROR }, 413);
  }

  // 4. Malformed JSON is a client error, not a crash.
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ success: false, message: "Please provide valid information." }, 400);
  }

  // 5. Validate and normalise. Unknown keys are rejected by the schema, so
  //    `status` and `id` cannot be smuggled in.
  const parsed = demoRequestSchema.safeParse(body);

  if (!parsed.success) {
    const errors: DemoRequestResponse["errors"] = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        (field === "name" || field === "phone" || field === "course" || field === "email") &&
        !errors[field]
      ) {
        errors[field] = issue.message;
      }
    }

    // The first field message is more useful at the top of the form than a
    // generic one; the per-field map drives the inline errors.
    const [firstMessage] = Object.values(errors);

    return json(
      {
        success: false,
        message: firstMessage ?? "Please provide valid information.",
        ...(Object.keys(errors).length ? { errors } : {}),
      },
      400,
    );
  }

  const data: DemoRequestPayload = parsed.data;

  try {
    /*
     * The CMS field names, not this form's. Its schema refuses anything it
     * does not recognise, which is what stops a public submission from
     * arriving already assigned or marked converted.
     */
    const response = await fetch(`${CMS_API_URL}/enquiries`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        studentName: data.name,
        phone: data.phone,
        email: data.email,
        courseName: data.course,
        source: "website",
        // Which trigger opened the modal — navbar, hero, blog CTA.
        formType: `Book Demo (${data.source})`,
        ip: clientIp(request.headers),
        userAgent: request.headers.get("user-agent") ?? undefined,
        // Passed straight through: this route relays, and the CMS is the side
        // that holds the secret and decides whether a token is required.
        captchaToken: data.captchaToken,
      }),
      // A lead is never worth serving from a cache.
      cache: "no-store",
    });

    /*
     * A double-click, a retried request or an impatient second submit should
     * produce one lead, not three. The CMS answers a repeat with 429 and a
     * message saying it already has the enquiry — which is true, so the
     * visitor is told it worked rather than being scolded for submitting.
     */
    if (response.status === 429) {
      return json({ success: true, message: SUCCESS_MESSAGE }, 201);
    }

    if (!response.ok) {
      console.error(`[demo-request] CMS responded ${response.status}`);

      return json(
        {
          success: false,
          message: "We couldn't submit that right now. Please try again in a moment, or call us.",
        },
        503,
      );
    }

    // The number is personal data and is deliberately not logged; the trigger
    // is enough to see where leads are coming from.
    console.info(`[demo-request] received from ${data.source}`);

    return json({ success: true, message: SUCCESS_MESSAGE }, 201);
  } catch (error) {
    /*
     * `fetch` only rejects when the request never completed — the CMS is down,
     * or DNS failed. Reported to the visitor as one generic sentence either
     * way: the address and the failure mode of an internal service do not
     * belong in a browser.
     */
    console.error("[demo-request] could not reach the CMS:", error);

    return json(
      {
        success: false,
        message: "We couldn't submit that right now. Please try again in a moment, or call us.",
      },
      503,
    );
  }
}

/**
 * Stored enquiries are personal data and are never served from a public route.
 * A future admin panel gets its own authenticated endpoint; until then every
 * other method is refused.
 */
function methodNotAllowed(): NextResponse {
  return json({ success: false, message: "Method not allowed." }, 405, { allow: "POST" });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
