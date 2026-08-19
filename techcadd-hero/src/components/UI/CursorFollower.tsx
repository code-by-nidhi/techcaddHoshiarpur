"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a drawn arrow under the pointer with a ring chasing it.
 *
 * The ring lags on a spring while the arrow stays tight to the pointer — the
 * gap between the two is the whole effect. The ring opens up over anything
 * clickable, so the cursor also does the job the pointer hand used to.
 *
 * The ring takes its colour from the surface underneath: white over the navy
 * sections, blue over the light ones. The site runs navy → white → navy the
 * whole way down, and a single ring colour goes invisible over half of it.
 *
 * Only ever active on a fine pointer with motion allowed. On touch, on a
 * coarse pointer, with `prefers-reduced-motion`, or before hydration, the
 * component renders nothing and the native cursor is left exactly as it was.
 */

/** The arrow itself. Drawn three times — see the SVG below. */
const ARROW = "M1 1L1 19.2L5.9 14.5L8.9 20.9L12.1 19.4L9.1 13.2L15.4 13.2Z";

/** Everything that should widen the ring. */
const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor="hover"]';

type Tone = "dark" | "light";

/**
 * The ring's palette, one per surface. `dark` means a dark surface, not a dark
 * ring — over navy it draws white, over white it draws blue.
 *
 * Only the ring flips. The arrow keeps its own fixed colours below, which
 * already carry a navy-and-white double edge and read on either surface.
 */
const RING = {
  dark: {
    /* The second shadow is a dark hairline sitting just outside the ring —
       an edge of its own, so the circle stays defined where its colour and the
       surface behind it are close in value. */
    idle: "border-white shadow-[0_0_0_1.5px_rgba(5, 11, 31,0.5)]",
    hover:
      "border-white bg-white/15 shadow-[0_0_0_1.5px_rgba(5, 11, 31,0.5),0_0_28px_-4px_rgba(255,255,255,0.6)]",
    dot: "bg-[#050B1F] shadow-[0_0_0_1px_rgba(5, 11, 31,0.45)]",
  },
  light: {
    idle: "border-[#2563eb] shadow-[0_0_0_1.5px_rgba(8,21,64,0.3)]",
    hover:
      "border-[#2563eb] bg-[#2563eb]/12 shadow-[0_0_0_1.5px_rgba(8,21,64,0.3),0_0_26px_-4px_rgba(37,99,235,0.55)]",
    dot: "bg-[#2563eb] shadow-[0_0_0_1px_rgba(8,21,64,0.3)]",
  },
} satisfies Record<Tone, { idle: string; hover: string; dot: string }>;

/** Perceived brightness of a computed `background-color`, or null if see-through. */
function brightnessOf(color: string): number | null {
  const parts = color.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return null;

  const [r, g, b] = parts.map(Number);
  const alpha = parts.length > 3 ? Number(parts[3]) : 1;
  // anything mostly transparent tells us nothing — keep walking up
  if (alpha < 0.5) return null;

  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/**
 * Which palette belongs under this element.
 *
 * The about page labels its own sections, so that is read first and costs one
 * `closest` call. Everywhere else falls back to walking up for the first
 * element that actually paints a background and judging its brightness.
 */
function toneUnder(target: Element | null): Tone {
  const surface = target?.closest?.(".surface-light, .surface-dark");
  if (surface) return surface.classList.contains("surface-light") ? "light" : "dark";

  let node: Element | null = target;
  while (node && node !== document.documentElement) {
    const brightness = brightnessOf(getComputedStyle(node).backgroundColor);
    if (brightness !== null) return brightness > 0.55 ? "light" : "dark";
    node = node.parentElement;
  }

  // the body is #050B1F
  return "dark";
}

export default function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [tone, setTone] = useState<Tone>("dark");

  /** Last element the pointer was over, so the surface is only re-read on a change. */
  const lastTarget = useRef<Element | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  /* Two different springs off one source: the ring trails, the arrow barely
     does. Reading both from the same motion value keeps them on one timeline,
     so the ring always settles onto the arrow rather than beside it. */
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
  const nodeX = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.2 });
  const nodeY = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.2 });

  /* Decide once whether this device gets the effect at all. */
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(fine.matches && !still.matches);
    sync();

    fine.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  /* The native cursor is hidden from the document element rather than from
     this component's own markup, so it comes straight back if the effect is
     ever switched off — including when JavaScript never runs. */
  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");
    return () => document.documentElement.classList.remove("custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      // a pointer move fires dozens of times a second; the surface underneath
      // can only have changed if the element underneath did
      if (target === lastTarget.current) return;
      lastTarget.current = target;

      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
      setTone(toneUnder(target));
    };

    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    // the pointer leaving the window, and the window losing focus entirely
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = RING[tone];
  const ringScale = pressed ? 0.78 : hovering ? 1.75 : 1;

  return (
    <div
      aria-hidden="true"
      /* Above every overlay, the demo modal included. The native cursor is
         hidden document-wide, so if anything ever paints over this layer the
         pointer vanishes entirely. */
      className="pointer-events-none fixed inset-0 z-[10050] overflow-hidden"
    >
      {/* Ring, with its own node at the centre */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-0"
      >
        <motion.span
          animate={{ scale: ringScale }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`block size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] transition-colors duration-300 ${
            hovering ? ring.hover : ring.idle
          }`}
        />

        {/*
         * A sibling of the ring rather than a child: both centre on the same
         * point, but this way the dot keeps its size when the ring swells to
         * 1.75× over a link instead of ballooning with it.
         */}
        <motion.span
          animate={{ scale: pressed ? 0.7 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className={`absolute top-0 left-0 block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${ring.dot}`}
        />
      </motion.div>

      {/* Arrow */}
      <motion.div
        style={{ x: nodeX, y: nodeY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-0"
      >
        {/*
         * Not centred, unlike the ring: the arrow is drawn with its tip on the
         * path's origin, so the point sits exactly where the pointer is and the
         * body trails down-right the way a cursor is expected to.
         */}
        <motion.span
          animate={{ scale: pressed ? 0.86 : hovering ? 1.12 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          className="block origin-top-left"
        >
          <svg
            width="25"
            height="29"
            /* The box is inset past the origin so the border has room to draw;
               without it a 3px stroke on a path starting at 1,1 would be
               clipped along the top and left edges. */
            viewBox="-2 -2 25 29"
            fill="none"
            /* the tip sits 3 units inside the box after that inset, so the
               glyph shifts back by the same amount to put the point on the
               pointer rather than below and right of it */
            className="-translate-x-[3px] -translate-y-[3px] drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]"
          >
            {/*
              Three passes over one shape, outermost first: a navy border, a
              white rim, then the blue body. Two contrasting edges rather than
              one is what keeps the arrow readable over anything — the navy
              holds it against the light sections and the pale photographs, the
              white holds it against the royal-blue panels.
            */}
            <path
              d={ARROW}
              fill="#081540"
              stroke="#081540"
              strokeWidth="4.6"
              strokeLinejoin="round"
              opacity="0.55"
            />
            <path
              d={ARROW}
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <path d={ARROW} fill="#60a5fa" />
          </svg>
        </motion.span>
      </motion.div>
    </div>
  );
}
