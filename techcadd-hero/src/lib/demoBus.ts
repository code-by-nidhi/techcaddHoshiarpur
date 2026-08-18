/**
 * Tiny external store so any Book Demo trigger — hero, blog CTA, anywhere —
 * can open the enquiry modal without the modal being re-mounted per trigger or
 * prop-drilled through the tree. Mirrors the robotBus pattern.
 */

/** Where the modal was opened from. Stored with the booking, for attribution. */
export type DemoSource = "navbar" | "hero" | "blog" | "about" | "footer";

let open = false;
let source: DemoSource = "navbar";
const listeners = new Set<(v: boolean) => void>();

const emit = (next: boolean) => {
  open = next;
  listeners.forEach((l) => l(next));
};

export const demoBus = {
  get: () => open,
  /** The trigger that opened the modal, read by the form on submit. */
  getSource: () => source,
  open: (from: DemoSource = "navbar") => {
    source = from;
    emit(true);
  },
  close: () => emit(false),
  subscribe(l: (v: boolean) => void) {
    listeners.add(l);
    return () => void listeners.delete(l);
  },
};
