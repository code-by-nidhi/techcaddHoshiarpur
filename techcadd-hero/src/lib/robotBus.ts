/**
 * Tiny external store so the DOM course tags can talk to the WebGL scene
 * without re-rendering the Canvas. The rig reads it inside useFrame.
 */
export type RobotEffect = "holo" | "pulse" | "chart" | null;

export type RobotFocus = {
  effect: RobotEffect;
  /** accent the LEDs shift toward, as an r,g,b triple in 0..1 */
  color: [number, number, number];
} | null;

let focus: RobotFocus = null;
const listeners = new Set<(f: RobotFocus) => void>();

export const robotBus = {
  get: () => focus,
  set(next: RobotFocus) {
    focus = next;
    listeners.forEach((l) => l(next));
  },
  subscribe(l: (f: RobotFocus) => void) {
    listeners.add(l);
    return () => void listeners.delete(l);
  },
};
