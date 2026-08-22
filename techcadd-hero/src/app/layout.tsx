import { Suspense } from "react";
/**
 * Bootstrap's grid-only build: containers, rows, columns and the flex helpers,
 * with no Reboot and no component styles. The full bootstrap.css would restyle
 * every heading, button and input on the Tailwind pages; this layer only adds
 * the grid, and the navbar's mega menu needs it on every route.
 */
import "bootstrap/dist/css/bootstrap-grid.min.css";

import LeadCaptureModal from "@/components/UI/LeadCaptureModal";
import type { Metadata, Viewport } from "next";
import { Sora, Inter, Poppins, JetBrains_Mono } from "next/font/google";
import CursorFollower from "@/components/UI/CursorFollower";
import ScrollToTop from "@/components/UI/ScrollToTop";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";
import WhatsAppButton from "@/components/UI/WhatsAppButton";
import { safely } from "@/lib/cms/client";
import { getSite, type CmsSite } from "@/lib/cms/content";
import Analytics from "@/components/UI/Analytics";
import { SiteProvider } from "@/lib/cms/site-context";
import { resolveSite } from "@/lib/cms/site-details";
import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

const SITE = "https://techcadd.com";

const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "TechCadd Hoshiarpur — AI & Software Training",
    template: "%s | TechCadd Hoshiarpur",
  },
  description:
    "Industry-focused training, real-world projects, and expert mentorship to help you launch your dream tech career in AI and software.",
  keywords: [
    "AI training Hoshiarpur",
    "software training institute Punjab",
    "Python course Hoshiarpur",
    "machine learning course",
    "web development training",
    "TechCadd",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "TechCadd Hoshiarpur",
    title: "TechCadd Hoshiarpur — AI & Software Training",
    description:
      "Build the skills that turn you into a job-ready engineer in AI and software.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "TechCadd Hoshiarpur — AI & Software Training",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechCadd Hoshiarpur — AI & Software Training",
    description:
      "Build the skills that turn you into a job-ready engineer in AI and software.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

/**
 * The static half of the page metadata, plus the CMS favicon when one is set.
 *
 * `generateMetadata` rather than a `metadata` const purely so the icon can be
 * read from Settings — everything else here is fixed. Without an uploaded
 * favicon nothing is emitted and the browser falls back to its default, which
 * is what happened before this existed.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await safely(getSite(), null as CmsSite | null);
  const favicon = site?.favicon?.url;

  if (!favicon) return BASE_METADATA;

  return {
    ...BASE_METADATA,
    icons: { icon: [{ url: favicon, type: site?.favicon?.mimeType }] },
  };
}

export const viewport: Viewport = {
  themeColor: "#101E52",
  colorScheme: "dark",
};

/**
 * Fetched once here rather than per page: the footer is on every route, and
 * the contact details it prints are the same on all of them. `safely` means a
 * CMS that is down costs the site its freshest phone number, not its layout.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await safely(getSite(), null as CmsSite | null);

  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${poppins.variable} ${mono.variable}`}
    >
      <head>
        {/*
         * Runs before paint. Setting this from a component would be too late:
         * the browser restores the previous offset during the first frame, so
         * the correction would be visible as a jump.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if("scrollRestoration" in history){history.scrollRestoration="manual";}' +
              'if(!location.hash){window.scrollTo(0,0);}',
          }}
        />
      </head>
      <body className="bg-[#101E52] text-white antialiased">
        {/* The publisher and the site, declared once. Every other page
            references these by @id rather than restating them, so search
            engines see one canonical organisation and not thirteen. */}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        {/* #main, not #hero-heading: only the home and about heroes carry that
            id, so on every other route the skip link went nowhere — which is
            the one link that has to work for a keyboard user. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>

        {/* Mounted here rather than per page, so the cursor does not blink out
            of existence on a route change. It renders nothing at all unless the
            device has a fine pointer and allows motion. */}
        <CursorFollower />
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>

        <Analytics id={resolveSite(site).analyticsId} />

        <SiteProvider site={site}>
          {/* The skip link's landing point. It lives here rather than on each
              page's <main>, because those carry route-specific ids and one of
              them has to be stable for the link to target. tabIndex -1 makes it
              focusable by script without putting it in the tab order. */}
          <div id="main" tabIndex={-1} className="outline-none">
            {children}
          </div>
          <ScrollToTopButton />
          <WhatsAppButton />
          <LeadCaptureModal />
        </SiteProvider>
      </body>
    </html>
  );
}
