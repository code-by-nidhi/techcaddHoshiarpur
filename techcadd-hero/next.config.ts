import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /*
   * No `optimizePackageImports` here on purpose: Next 15 already applies it to
   * react-icons and lucide-react by default, and adding framer-motion/swiper
   * to the list measured 2 kB WORSE on the homepage.
   */
};

export default nextConfig;
