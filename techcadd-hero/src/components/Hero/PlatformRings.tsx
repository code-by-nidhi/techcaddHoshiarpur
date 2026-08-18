"use client";

/**
 * The glowing platform, in CSS. Ellipses (wide + short + border-radius 50%)
 * read as rings seen in perspective, so no 3D transforms are needed.
 */
export default function PlatformRings() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-[4%] z-0 flex h-[42%] items-end justify-center"
    >
      <div className="relative h-full w-full">
        {/* glass floor disc */}
        <div className="absolute left-1/2 top-[46%] h-[38%] w-[56%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_50%_40%,rgba(30,64,175,0.55)_0%,rgba(9,14,38,0.9)_60%,rgba(6,9,26,0.95)_100%)] shadow-[0_0_80px_-10px_rgba(37,99,235,0.75),inset_0_2px_18px_rgba(96,165,250,0.35)]" />

        {/* rim of the disc */}
        <div className="absolute left-1/2 top-[46%] h-[38%] w-[56%] -translate-x-1/2 rounded-[50%] border border-[#60a5fa]/70 shadow-[0_0_36px_-4px_rgba(96,165,250,0.9)]" />

        {/* concentric neon rings */}
        <div className="ring-a absolute left-1/2 top-[40%] h-[46%] w-[68%] -translate-x-1/2 rounded-[50%] border-2 border-[#3b82f6]/80 shadow-[0_0_40px_-6px_rgba(59,130,246,0.95),inset_0_0_24px_-6px_rgba(59,130,246,0.8)]" />
        <div className="ring-b absolute left-1/2 top-[33%] h-[56%] w-[80%] -translate-x-1/2 rounded-[50%] border border-[#22d3ee]/55 shadow-[0_0_34px_-8px_rgba(34,211,238,0.75)]" />
        <div className="ring-c absolute left-1/2 top-[26%] h-[66%] w-[94%] -translate-x-1/2 rounded-[50%] border border-[#60a5fa]/50 shadow-[0_0_44px_-10px_rgba(96,165,250,0.75)]" />

        {/* bright sweep along the front edge */}
        <div className="absolute left-1/2 top-[63%] h-[3%] w-[40%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(147,197,253,0.95)_0%,transparent_70%)] blur-[2px]" />

        {/* light pooling under the platform */}
        <div className="absolute left-1/2 top-[44%] h-[58%] w-[104%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(37,99,235,0.34)_0%,transparent_68%)] blur-2xl" />
      </div>
    </div>
  );
}
