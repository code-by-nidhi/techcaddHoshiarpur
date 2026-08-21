/**
 * Tiny external store so any lead-capture trigger — the navbar, the launch
 * band, the blog CTA, the footer — can open the enquiry modal without the modal
 * being re-mounted per trigger or prop-drilled through the tree. Mirrors the
 * robotBus pattern.
 *
 * This is what keeps the promise that there is exactly one enquiry form on the
 * site: the modal is mounted once in the root layout, and every button that
 * asks for a callback calls `openLeadCapture()` rather than rendering a form of
 * its own.
 */

/** Where the modal was opened from. Stored with the booking, for attribution. */
export type DemoSource = "navbar" | "hero" | "blog" | "about" | "footer";

/**
 * Values a trigger already knows and the visitor should not have to retype —
 * the blog CTA collects a phone number before opening the modal, for instance.
 */
export type LeadPrefill = { phone?: string; course?: string };

let open = false;
let source: DemoSource = "navbar";
let prefill: LeadPrefill = {};
const listeners = new Set<(v: boolean) => void>();

const emit = (next: boolean) => {
  open = next;
  listeners.forEach((l) => l(next));
};

export const demoBus = {
  get: () => open,
  /** The trigger that opened the modal, read by the form on submit. */
  getSource: () => source,
  /** Anything the trigger already knew, read by the form when it mounts. */
  getPrefill: () => prefill,
  open: (from: DemoSource = "navbar", values: LeadPrefill = {}) => {
    source = from;
    prefill = values;
    emit(true);
  },
  close: () => emit(false),
  subscribe(l: (v: boolean) => void) {
    listeners.add(l);
    return () => void listeners.delete(l);
  },
};

/**
 * Opens the shared lead-capture modal.
 *
 * The one call every CTA makes:
 *
 *     <button type="button" onClick={() => openLeadCapture("navbar")}>
 *       Book Demo
 *     </button>
 */
export function openLeadCapture(from: DemoSource = "navbar", values: LeadPrefill = {}) {
  demoBus.open(from, values);
}

/** Closes it. Paired with the above for symmetry at the call site. */
export function closeLeadCapture() {
  demoBus.close();
}
