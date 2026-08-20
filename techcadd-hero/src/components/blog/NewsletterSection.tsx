import ScrollReveal from "@/components/about/ui/ScrollReveal";
import { revealScale } from "@/lib/motion";

import NewsletterForm from "./NewsletterForm";

/** The newsletter band: navy card on a light section, closing the archive. */
export default function NewsletterSection({ source = "blog" }: { source?: "blog" | "article" }) {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="surface-light section-y relative isolate bg-paper"
    >
      <div className="shell">
        <ScrollReveal variants={revealScale}>
          <div className="surface-dark relative isolate overflow-hidden rounded-[var(--radius-hero)] bg-royal-deep px-6 py-14 text-center shadow-[0_40px_100px_-45px_rgb(8_21_64/0.85)] sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(40rem 22rem at 50% 120%, rgb(30 48 120 / 28%), transparent 70%), radial-gradient(48rem 26rem at 50% -20%, rgb(37 99 235 / 28%), transparent 70%)",
              }}
            />

            <p className="type-eyebrow text-eyebrow">The TechCADD dispatch</p>

            <h2 id="newsletter-heading" className="type-h2 mx-auto mt-5 max-w-2xl">
              Stay ahead of the tech curve.
            </h2>

            <p className="type-lead mx-auto mt-5 max-w-xl text-ink-muted">
              Get practical career advice, coding insights, hiring trends and new TechCADD resources
              directly in your inbox.
            </p>

            <div className="mt-9">
              <NewsletterForm source={source} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
