"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { blogApiUrl } from "@/lib/blog/api";
import type { SubscribeResponse } from "@/lib/blog/types";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

/** Mirrors the API's rule, so an obvious typo never costs a round trip. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function NewsletterForm({ source = "blog" }: { source?: "blog" | "article" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = email.trim();
    if (!EMAIL.test(value)) {
      setState({ kind: "error", message: "Enter a valid email address." });
      return;
    }

    setState({ kind: "submitting" });

    try {
      const response = await fetch(blogApiUrl("/newsletter/subscribe"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: value, source }),
      });

      const payload = (await response.json()) as SubscribeResponse & { message?: string };

      if (!response.ok) {
        // 429 from the rate limiter deserves its own sentence, not "try again"
        setState({
          kind: "error",
          message:
            response.status === 429
              ? "Too many attempts. Give it a minute and try again."
              : (payload.message ?? "That didn't go through. Please try again."),
        });
        return;
      }

      setState({ kind: "success", message: payload.message });
      setEmail("");
    } catch {
      setState({ kind: "error", message: "Network error. Please check your connection." });
    }
  }

  const busy = state.kind === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto w-full max-w-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>

        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={state.kind === "error"}
          aria-describedby="newsletter-status"
          className="chip-border min-w-0 flex-1 rounded-full bg-white/10 px-6 py-3.5 text-[15px] text-ink placeholder:text-ink-dim backdrop-blur-md transition-shadow duration-300 focus:shadow-[0_0_0_3px_rgb(37_99_235/0.35)] focus:outline-none"
        />

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-royal-deep transition-all duration-300 hover:shadow-[0_18px_40px_-16px_rgb(255_255_255/0.6)] disabled:cursor-wait disabled:opacity-70"
        >
          {busy ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Subscribing…
            </>
          ) : (
            <>
              Subscribe
              <Send aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </div>

      {/* one live region for both outcomes, so a screen reader announces either */}
      <p
        id="newsletter-status"
        role="status"
        aria-live="polite"
        className="mt-4 flex items-center justify-center gap-2 text-sm"
      >
        {state.kind === "success" ? (
          <span className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 aria-hidden="true" className="size-4" />
            {state.message}
          </span>
        ) : null}

        {state.kind === "error" ? (
          <span className="flex items-center gap-2 text-rose-300">
            <AlertCircle aria-hidden="true" className="size-4" />
            {state.message}
          </span>
        ) : null}

        {state.kind === "idle" || busy ? (
          <span className="text-ink-dim">We respect your inbox. No spam.</span>
        ) : null}
      </p>
    </form>
  );
}
