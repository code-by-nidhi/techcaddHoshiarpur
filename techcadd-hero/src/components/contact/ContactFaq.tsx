"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { LIGHT_GLASS, SectionTitle, Shell, fadeUp, stagger } from "./shared";
import type { CmsFaq } from "@/lib/cms/content";

/**
 * The short FAQ at the foot of the counselling page.
 *
 * Deliberately not every question the site knows — the homepage help centre is
 * where the full, searchable set lives. These are the few an editor marked for
 * this page, so somebody reading about counselling gets the answers that
 * belong to that conversation and not a wall of them.
 */
export default function ContactFaq({ faqs }: { faqs: CmsFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section className="relative bg-[#EEF4FF] py-24 lg:py-28">
      <Shell>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-90px" }}>
          <SectionTitle
            tone="light"
            eyebrow="Answers"
            title="Frequently Asked Questions"
            sub="The questions counsellors are asked most often."
          />

          <div className="row justify-content-center mt-2">
            <div className="col-12 col-lg-9">
              <ul className="space-y-3.5">
                {faqs.map((faq, i) => {
                  const isOpen = open === i;

                  return (
                    <motion.li
                      key={faq.id}
                      variants={fadeUp}
                      className={`overflow-hidden rounded-[22px] transition-colors duration-500 ${LIGHT_GLASS} ${
                        isOpen ? "border-[#2563EB]/30 shadow-[0_24px_54px_-30px_rgba(37,99,235,0.45)]" : ""
                      }`}
                    >
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${i}`}
                          className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors duration-300 hover:bg-white/60 sm:px-7"
                        >
                          <span className="font-[family-name:var(--font-sora)] text-[16px] font-semibold text-[#0F172A] sm:text-[17px]">
                            {faq.question}
                          </span>
                          <motion.span
                            aria-hidden
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                              isOpen
                                ? "bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-white"
                                : "bg-[#2563EB]/10 text-[#2563EB]"
                            }`}
                          >
                            <FiChevronDown className="size-4" />
                          </motion.span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-6 pb-6 text-[14.5px] leading-[1.85] text-[#475569] sm:px-7">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      </Shell>
    </section>
  );
}
