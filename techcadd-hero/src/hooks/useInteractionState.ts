"use client";

import { useRef } from "react";

export type InteractionState = {
  /** True while the user is dragging the OrbitControls. */
  active: boolean;
  /** performance.now() of the last interaction end. */
  lastAt: number;
};

/**
 * A single mutable ref shared between OrbitControls and the model so idle
 * auto-rotation can pause on interaction and resume after inactivity —
 * without triggering React re-renders on every frame.
 */
export function useInteractionState() {
  return useRef<InteractionState>({ active: false, lastAt: 0 });
}
