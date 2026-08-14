import type { Metadata, Viewport } from "next";
import { Sora, Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
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

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${poppins.variable} ${mono.variable}`}
    >
      <body className="bg-[#020617] text-white antialiased">
        <a
          href="#hero-heading"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
