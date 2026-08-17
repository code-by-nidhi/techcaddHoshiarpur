"use client";

/**
 * Brand marks drawn inline so the cards stay crisp at any size and need no
 * extra network requests. Swap in the official SVGs from python.org /
 * react.dev if you want the exact licensed artwork.
 */

export function PythonMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden role="img">
      <path
        fill="#3776AB"
        d="M31.6 4c-4.3 0-8 .4-10.9 1.2-3.4 1-4.4 3-4.4 6.7v5.4h15.6v2H12.9c-4.3 0-8 2.6-9.2 7.5-1.3 5.6-1.4 9.1 0 15 1 4.4 3.5 7.5 7.8 7.5h4.7v-6.9c0-4.9 4.2-9.2 9.2-9.2h12.2c4 0 7.3-3.3 7.3-7.4V11.9c0-3.9-3.3-6.9-7.3-7.5-2.5-.3-3.9-.4-6-.4Zm-8.4 4.8a2.9 2.9 0 1 1 0 5.9 2.9 2.9 0 0 1 0-5.9Z"
      />
      <path
        fill="#FFD43B"
        d="M47.6 19.3v6.7c0 5.1-4.3 9.4-9.2 9.4H26.2c-4 0-7.3 3.4-7.3 7.4v13.9c0 3.9 3.4 6.2 7.3 7.4 4.6 1.3 9.1 1.6 14.6 0 3.6-1 7.3-3.1 7.3-7.4v-5.6H32.5v-2h21.9c4.3 0 5.9-3 7.3-7.5 1.5-4.6 1.5-9 0-15-1.1-4.3-3-7.5-7.3-7.5h-6.8Zm-8.8 34.9a2.9 2.9 0 1 1 0 5.9 2.9 2.9 0 0 1 0-5.9Z"
      />
    </svg>
  );
}

export function ReactMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden role="img">
      <circle cx="32" cy="32" r="5.4" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="2.4">
        <ellipse cx="32" cy="32" rx="24" ry="9.2" />
        <ellipse cx="32" cy="32" rx="24" ry="9.2" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="24" ry="9.2" transform="rotate(120 32 32)" />
      </g>
    </svg>
  );
}

/** Google's four-colour G, for the verified-reviews badge. */
export function GoogleMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.1z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.5C3 17.1 2.2 20.4 2.2 24s.8 6.9 2.3 9.9l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}
