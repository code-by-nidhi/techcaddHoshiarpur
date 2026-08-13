"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  Mail, MapPin, Phone, MessageCircle, Linkedin, Instagram, Youtube, Facebook, ArrowRight, Check,
} from "lucide-react";
import { MEGA_FOOTER } from "@/lib/site";

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export default function MegaFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const subscribe = () => {
    if (!email.trim()) return;
    // wire this to your newsletter provider
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-[#F8FAFC] pt-20">
      {/* watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-2.5rem] select-none text-center font-[family-name:var(--font-poppins)] text-[clamp(5rem,19vw,17rem)] font-extrabold leading-none tracking-[-0.04em] text-slate-900/[0.045]"
      >
        TECHCADD
      </span>

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        {/* newsletter + whatsapp */}
        <div className="grid gap-6 rounded-[30px] border border-slate-200/80 bg-white p-8 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.9)] lg:grid-cols-[1.3fr_1fr] lg:p-10">
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] text-[22px] font-extrabold tracking-tight text-[#0F172A]">
              Get the batch calendar and career notes
            </h3>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#475569]">
              One email a month: new batch dates, mentor articles, and openings from our network.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSent(false);
                }}
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full rounded-full border border-slate-200 bg-[#F8FAFC] px-5 py-3.5 text-[14.5px] text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:bg-white sm:max-w-sm"
              />
              <button
                type="button"
                onClick={subscribe}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0F172A] px-7 py-3.5 text-[14.5px] font-semibold text-white transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_16px_36px_-18px_rgba(37,99,235,0.9)]"
              >
                {sent ? "Subscribed" : "Subscribe"}
                {sent ? (
                  <Check aria-hidden className="size-4" />
                ) : (
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>
            </div>
          </div>

          <a
            href={`https://wa.me/${MEGA_FOOTER.contact.whatsapp.replace(/\D/g, "")}`}
            className="group flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] p-6 text-white transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-inset ring-white/30">
              <MessageCircle aria-hidden className="size-6" />
            </span>
            <span>
              <span className="block font-[family-name:var(--font-poppins)] text-[16px] font-bold">
                Chat on WhatsApp
              </span>
              <span className="mt-0.5 block text-[13px] text-white/85">
                Counsellors reply within the hour
              </span>
            </span>
            <ArrowRight
              aria-hidden
              className="ml-auto size-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* sitemap */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
          <div>
            <Image
              src="/images/tece_new_logo.png"
              alt="Techcadd — Your Skill & Technology Partner"
              width={899}
              height={242}
              className="h-[46px] w-auto"
            />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-[#475569]">
              Two decades of turning students into working engineers — through live projects,
              industry mentors and career support that doesn&apos;t stop at the certificate.
            </p>

            <ul className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-[#475569] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-[0_12px_26px_-18px_rgba(37,99,235,0.9)]"
                  >
                    <Icon aria-hidden className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {MEGA_FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-[family-name:var(--font-poppins)] text-[14px] font-bold text-[#0F172A]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-[13.5px] text-[#475569] transition-colors hover:text-[#2563EB]"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* contact */}
        <ul className="mt-14 grid gap-5 border-t border-slate-200 pt-8 text-[13.5px] text-[#475569] sm:grid-cols-3">
          <li className="flex gap-2.5">
            <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
            {MEGA_FOOTER.contact.address}
          </li>
          <li className="flex gap-2.5">
            <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
            <a href={`tel:${MEGA_FOOTER.contact.phone.replace(/\s/g, "")}`} className="hover:text-[#2563EB]">
              {MEGA_FOOTER.contact.phone}
            </a>
          </li>
          <li className="flex gap-2.5">
            <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
            <a href={`mailto:${MEGA_FOOTER.contact.email}`} className="hover:text-[#2563EB]">
              {MEGA_FOOTER.contact.email}
            </a>
          </li>
        </ul>

        <div className="relative mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 py-7 text-[12.5px] text-[#64748B] sm:flex-row">
          <p>© {new Date().getFullYear()} Techcadd. All rights reserved.</p>
          <p className="flex gap-5">
            <a href="#" className="hover:text-[#2563EB]">Privacy Policy</a>
            <a href="#" className="hover:text-[#2563EB]">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
