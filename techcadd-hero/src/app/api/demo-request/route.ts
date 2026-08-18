import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  demoRequestSchema,
  type DemoRequestPayload,
  type DemoRequestResponse,
} from "@/lib/validations/demo-request";

/**
 * POST /api/demo-request — the Book Demo enquiry endpoint.
 *
 * Same-origin by design. The modal used to call the standalone Nest API across
 * origins; talking to a route in this app instead means no CORS surface and no
 * public API host to protect, and the MySQL credentials stay in this process.
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

/** How long an identical number is treated as a repeat rather than a new lead. */
const DUPLICATE_WINDOW_MS = 60_000;

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
     * A double-click, a retried request or an impatient second submit should
     * produce one lead, not three. The client disables the button, but that is
     * a courtesy the server cannot rely on, so an identical number inside the
     * window is answered as though it had just been stored — which, a moment
     * ago, it was. Uses the `phone` index.
     */
    const recent = await prisma.demoRequest.findFirst({
      where: {
        phone: data.phone,
        createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
      },
      select: { id: true },
    });

    if (recent) {
      return json({ success: true, message: SUCCESS_MESSAGE }, 201);
    }

    const created = await prisma.demoRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        course: data.course,
        source: data.source,
      },
      select: { id: true, source: true },
    });

    // The number is personal data and is deliberately not logged; the id is
    // enough to find the row.
    console.info(`[demo-request] #${created.id} received from ${created.source}`);

    return json({ success: true, message: SUCCESS_MESSAGE }, 201);
  } catch (error) {
    /*
     * Everything below this line is reported to the visitor as one generic
     * sentence. Prisma error text can name the table, the column and the host,
     * and none of that belongs in a browser.
     */
    const unreachable =
      error instanceof Prisma.PrismaClientInitializationError ||
      (error instanceof Prisma.PrismaClientKnownRequestError &&
        ["P1000", "P1001", "P1002", "P1003", "P1017"].includes(error.code));

    if (unreachable) {
      console.error("[demo-request] MySQL unreachable — check DATABASE_URL and that the server is running.");

      return json(
        {
          success: false,
          message: "We couldn't submit that right now. Please try again in a moment, or call us.",
        },
        503,
      );
    }

    console.error("[demo-request] failed to store enquiry:", error);
    return json({ success: false, message: GENERIC_ERROR }, 500);
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
