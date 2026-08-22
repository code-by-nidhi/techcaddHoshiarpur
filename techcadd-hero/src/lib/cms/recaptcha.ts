"use client";

/**
 * reCAPTCHA v3, loaded on demand.
 *
 * v3 has no widget and no challenge: the script scores the visitor in the
 * background and hands back a token on request. That is what lets spam
 * protection be added to three existing forms without changing how any of them
 * looks or behaves.
 *
 * The script is fetched the first time a token is asked for rather than on
 * every page load, so a visitor who never touches a form never pays for it —
 * and a site with no key pair configured never loads it at all.
 */

const SCRIPT_ID = "recaptcha-v3";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let loading: Promise<void> | null = null;

function loadScript(siteKey: string): Promise<void> {
  if (window.grecaptcha) return Promise.resolve();
  // One load per page, however many forms ask for a token.
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("recaptcha failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("recaptcha failed to load"));
    document.head.appendChild(script);
  });

  return loading;
}

/**
 * A token for one submission, or undefined.
 *
 * Undefined covers both "no key configured" and "Google could not be reached",
 * and the caller submits regardless in either case. The decision about whether
 * a missing token is acceptable belongs on the server, which is the only side
 * that knows whether a secret is configured — and the only side an attacker
 * cannot simply skip.
 */
export async function getCaptchaToken(
  siteKey: string | undefined,
  action: string,
): Promise<string | undefined> {
  if (!siteKey || typeof window === "undefined") return undefined;

  try {
    await loadScript(siteKey);
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return undefined;

    await new Promise<void>((resolve) => grecaptcha.ready(resolve));
    return await grecaptcha.execute(siteKey, { action });
  } catch {
    // Never block a submission on the captcha script. A visitor behind a
    // network that blocks Google still has an enquiry to send.
    return undefined;
  }
}
