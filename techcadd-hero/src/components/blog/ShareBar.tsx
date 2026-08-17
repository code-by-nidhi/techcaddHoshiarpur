"use client";

import { Check, Facebook, Link2, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { useState } from "react";

interface ShareBarProps {
  title: string;
  /** Absolute URL — share targets reject a path. */
  url: string;
}

/**
 * Share targets plus copy-link.
 *
 * Real anchors rather than buttons with click handlers, so they can be opened
 * in a new tab, copied, or reached by keyboard the way any other link can.
 */
export default function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "Share on Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Share on X",
      icon: Twitter,
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access can be refused; the share links still work
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-xs font-semibold tracking-[0.14em] text-ink-dim uppercase">Share</span>

      {targets.map((target) => (
        <a
          key={target.label}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={target.label}
          className="chip-border grid size-9 place-content-center rounded-full bg-[var(--ctx-chip-bg)] text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white motion-reduce:hover:transform-none"
        >
          <target.icon aria-hidden="true" className="size-4" />
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        className="chip-border inline-flex items-center gap-2 rounded-full bg-[var(--ctx-chip-bg)] px-4 py-2 text-xs font-semibold text-ink-muted transition-all duration-300 hover:bg-brand hover:text-white"
      >
        {copied ? (
          <>
            <Check aria-hidden="true" className="size-3.5" />
            Link copied!
          </>
        ) : (
          <>
            <Link2 aria-hidden="true" className="size-3.5" />
            Copy link
          </>
        )}
      </button>

      {/* announced separately, since the button's own label changing mid-press
          is not reliably read out */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
