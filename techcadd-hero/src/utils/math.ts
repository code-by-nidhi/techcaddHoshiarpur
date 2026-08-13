/** Linear interpolation. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp a value between min and max. */
export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Frame-rate independent lerp. Use inside useFrame so the easing feels the
 * same at 60fps and 144fps: damp(current, target, 6, delta).
 */
export const damp = (
  current: number,
  target: number,
  smoothing: number,
  delta: number
) => lerp(current, target, 1 - Math.exp(-smoothing * delta));
