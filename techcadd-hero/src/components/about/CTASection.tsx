import { ArrowRight } from "lucide-react";

import MagneticButton from "@/components/about/ui/MagneticButton";
import ScrollReveal from "@/components/about/ui/ScrollReveal";
import { cta } from "@/data/about";
import { revealScale } from "@/lib/motion";

export default function CTASection() {
  return (
    <section
      id="book-demo"
      aria-labelledby="cta-heading"
      className="surface-light section-y relative isolate bg-paper"
    >
      <div className="shell">
        <ScrollReveal variants={revealScale}>
          {/* Blue card on a white section — the page's closing accent. The
              outer wrapper carries a slowly travelling gradient edge; the inner
              inset hides all but a 1px rim of it. */}
          <div className="animate-sheen relative rounded-[calc(var(--radius-hero)+1px)] bg-[linear-gradient(110deg,rgb(37_99_235/0.75),rgb(168_85_247/0.75),rgb(37_99_235/0.75))] p-px">
            <div className="surface-dark relative isolate overflow-hidden rounded-[var(--radius-hero)] bg-royal-deep px-6 py-14 text-center shadow-[0_40px_100px_-45px_rgb(8_21_64/0.85)] sm:px-12 sm:py-16 lg:py-20">
              {/* Blue/cyan glow behind the card. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(40rem 22rem at 50% 110%, rgb(124 58 237 / 30%), transparent 70%), radial-gradient(48rem 26rem at 50% -20%, rgb(37 99 235 / 30%), transparent 70%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(255 255 255 / 5%) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 5%) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                  maskImage:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)",
                }}
              />

              <p className="type-eyebrow text-eyebrow">{cta.eyebrow}</p>

              <h2 id="cta-heading" className="type-h2 mx-auto mt-5 max-w-2xl">
                {cta.heading}
              </h2>

              <p className="type-lead mx-auto mt-5 max-w-xl text-ink-muted">
                {cta.body}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <MagneticButton href={cta.primary.href} className="w-full sm:w-auto">
                  {cta.primary.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </MagneticButton>

                <MagneticButton
                  href={cta.secondary.href}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {cta.secondary.label}
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
