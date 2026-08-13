"use client";

/**
 * Blue/violet light streaks orbiting the robot. Dashed SVG ellipses with a
 * gradient stroke and a glow filter; the dash offset animates so the light
 * travels along the path instead of the shape rotating.
 */
export default function OrbitArcs() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 800"
      className="pointer-events-none absolute inset-0 z-0 size-full"
      fill="none"
    >
      <defs>
        <linearGradient id="arcBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="arcViolet" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
          <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <filter id="arcGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#arcGlow)">
        <ellipse
          className="arc-a"
          cx="450"
          cy="470"
          rx="330"
          ry="120"
          stroke="url(#arcBlue)"
          strokeWidth="3"
          strokeDasharray="620 900"
          transform="rotate(-16 450 470)"
        />
        <ellipse
          className="arc-b"
          cx="450"
          cy="430"
          rx="290"
          ry="86"
          stroke="url(#arcViolet)"
          strokeWidth="2.5"
          strokeDasharray="520 800"
          transform="rotate(12 450 430)"
        />
        <ellipse
          className="arc-c"
          cx="450"
          cy="510"
          rx="380"
          ry="140"
          stroke="url(#arcBlue)"
          strokeWidth="2"
          strokeDasharray="380 1200"
          opacity="0.75"
          transform="rotate(-8 450 510)"
        />
      </g>
    </svg>
  );
}
