"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/*
 * First-load overlay.
 *
 * It sits above the page rather than replacing it: the markup underneath is
 * already server-rendered, so crawlers and the LCP element are unaffected and
 * removing the overlay causes no layout shift.
 *
 * `sessionStorage` gates it to the first load of a session — mounting in the
 * root layout means client-side navigations never remount it either.
 */

const KEY = "techcadd:seen-preloader";

/** Hard ceiling: the overlay must never outlive a slow asset. */
const MAX_MS = 2600;

/** Deterministic motes — index arithmetic, so SSR and client agree. */
const MOTES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 88 + 6}%`,
  top: `${(i * 53) % 76 + 12}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 3.5 + (i % 4) * 0.6,
  delay: (i % 6) * 0.35,
}));

export default function Preloader() {
  const reduce = useReducedMotion();
  // starts false so the server and the first client paint agree
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;

    sessionStorage.setItem(KEY, "1");
    setShow(true);
    document.body.style.overflow = "hidden";

    const started = performance.now();
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - started;
      // ease toward 100 so the bar never stalls at a round number
      setProgress(Math.min(100, Math.round((elapsed / MAX_MS) * 100)));
      if (elapsed < MAX_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setProgress(100);
      setShow(false);
      document.body.style.overflow = "";
    };

    const timer = window.setTimeout(finish, MAX_MS);
    // whichever comes first: the window load event or the ceiling
    const onLoad = () => window.setTimeout(finish, 320);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100000] grid place-items-center overflow-hidden bg-[linear-gradient(160deg,#050B1F_0%,#0B1642_45%,#101C4D_100%)]"
          role="status"
          aria-live="polite"
          aria-label="Loading TechCadd"
        >
          {/* radial glows */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[12%] top-[8%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.30),transparent_68%)] blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-[10%] bottom-[6%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.22),transparent_70%)] blur-3xl"
          />

          {/* drifting particles */}
          {!reduce &&
            MOTES.map((m, i) => (
              <motion.span
                key={i}
                aria-hidden
                style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
                animate={{ y: [0, -18, 0], opacity: [0.15, 0.7, 0.15] }}
                transition={{
                  duration: m.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: m.delay,
                }}
                className="absolute rounded-full bg-[#93c5fd] shadow-[0_0_8px_2px_rgba(147,197,253,0.6)]"
              />
            ))}

          <motion.div
            exit={{ scale: 0.94 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center px-6"
          >
            {/* ---------------------- robot + energy ring ---------------------- */}
            <div className="relative grid size-[190px] place-items-center sm:size-[240px] lg:size-[280px]">
              {/* rotating ring */}
              <motion.span
                aria-hidden
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-[#60a5fa]/25 [mask-image:conic-gradient(from_0deg,transparent_0deg,black_90deg,transparent_200deg)]"
                style={{ boxShadow: "0 0 34px -6px rgba(96,165,250,0.85) inset" }}
              />
              {/* counter-rotating inner ring */}
              <motion.span
                aria-hidden
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[12%] rounded-full border border-dashed border-[#3b82f6]/30"
              />
              {/* pulsing halo */}
              <motion.span
                aria-hidden
                animate={reduce ? undefined : { opacity: [0.25, 0.6, 0.25], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.45),transparent_68%)] blur-xl"
              />

              {/*
               * Silhouette, not the photo: brightness(0) crushes every pixel to
               * black and invert(1) lifts it to white, so only the cutout's
               * alpha shape survives. The drop-shadows supply the blue glow.
               */}
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="relative size-[72%]"
              >
                <Image
                  src="/images/robot-cutout.webp"
                  alt=""
                  aria-hidden
                  fill
                  priority
                  sizes="280px"
                  className="object-contain [filter:brightness(0)_invert(1)_drop-shadow(0_0_10px_rgba(96,165,250,0.95))_drop-shadow(0_0_28px_rgba(37,99,235,0.75))]"
                />
              </motion.div>
            </div>

            {/* ----------------------------- wordmark -------------------------- */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-7 font-[family-name:var(--font-sora)] text-[26px] font-extrabold tracking-[0.16em] text-white [text-shadow:0_0_18px_rgba(96,165,250,0.75)] sm:text-[32px]"
            >
              TECHCADD
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.45, 0.85, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="mt-2 text-center text-[12.5px] tracking-[0.02em] text-white/70 sm:text-[13.5px]"
            >
              Preparing Your Learning Experience…
            </motion.p>

            {/* ---------------------------- progress --------------------------- */}
            <div className="mt-7 h-[3px] w-[190px] overflow-hidden rounded-full bg-white/10 sm:w-[240px]">
              <motion.span
                className="block h-full rounded-full bg-gradient-to-r from-[#142C8E] via-[#2563EB] to-[#60A5FA] shadow-[0_0_14px_rgba(96,165,250,0.9)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
