/**
 * Tiny external store so any Book Demo trigger — hero, blog CTA, anywhere —
 * can open the enquiry modal without the modal being re-mounted per trigger or
 * prop-drilled through the tree. Mirrors the robotBus pattern.
 */
let open = false;
const listeners = new Set<(v: boolean) => void>();

const emit = (next: boolean) => {
  open = next;
  listeners.forEach((l) => l(next));
};

export const demoBus = {
  get: () => open,
  open: () => emit(true),
  close: () => emit(false),
  subscribe(l: (v: boolean) => void) {
    listeners.add(l);
    return () => void listeners.delete(l);
  },
};
