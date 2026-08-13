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
