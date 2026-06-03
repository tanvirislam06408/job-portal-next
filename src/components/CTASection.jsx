"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover scale-105"
        style={{
          backgroundImage: "url('/images/cta-bg.png')",
        }}
      />

      {/* Blue Gradient Overlay (MAIN FIX) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/90 via-[#0b1b3a]/80 to-[#050816]/95" />

      {/* Soft Blue Glow Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        
        <h2 className="text-white text-3xl md:text-5xl font-semibold leading-tight">
          Your next role is <br />
          already looking for you
        </h2>

        <p className="text-blue-100/80 mt-4 text-sm md:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Link
            href="/signup"
            className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition shadow-lg"
          >
            Create a free account
          </Link>

          <Link
            href="/pricing"
            className="px-6 py-3 rounded-full border border-blue-400/30 text-white hover:bg-blue-500/10 transition"
          >
            View pricing
          </Link>

        </div>
      </div>
    </section>
  );
}