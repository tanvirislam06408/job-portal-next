"use client";

import { FaUserPen, FaMagnifyingGlass, FaPaperPlane, FaBriefcase } from "react-icons/fa6";

const steps = [
  {
    step: "01",
    icon: FaUserPen,
    title: "Create Your Profile",
    description:
      "Sign up in minutes and build a standout profile. Showcase your skills, experience, and career goals to attract the right employers.",
  },
  {
    step: "02",
    icon: FaMagnifyingGlass,
    title: "Discover Opportunities",
    description:
      "Browse thousands of curated job listings. Use smart filters by role, location, salary, and industry to find your perfect match.",
  },
  {
    step: "03",
    icon: FaPaperPlane,
    title: "Apply Instantly",
    description:
      "Hit apply with a single click. Your profile does the talking — no repetitive forms, no friction, just speed.",
  },
  {
    step: "04",
    icon: FaBriefcase,
    title: "Land Your Dream Job",
    description:
      "Get notified when employers view your profile or respond. Track your applications and take the next step in your career.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative bg-black py-28 px-4 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#1e1b4b_0%,transparent_60%)] opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-700/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center items-center gap-2 mb-5">
          <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
          <span className="uppercase tracking-[0.3em] text-xs text-zinc-400">
            How It Works
          </span>
          <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-semibold text-center leading-tight">
          Your career journey,
          <br />
          <span className="text-violet-400">simplified</span>
        </h2>

        <p className="text-center text-zinc-400 mt-5 max-w-xl mx-auto text-sm md:text-base">
          From signup to offer letter — HireLoop makes every step fast, smart,
          and stress-free.
        </p>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={item.step} className="relative flex flex-col group">
                {/* Connector line (hidden on last) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%_-_12px)] w-full h-px bg-gradient-to-r from-zinc-700 to-transparent z-10" />
                )}

                <div className="flex flex-col gap-5 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.08)] transition-all duration-300">
                  {/* Step number + icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-bold text-zinc-800 group-hover:text-violet-900 transition-colors duration-300 select-none">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl border border-zinc-700 bg-zinc-900 group-hover:border-violet-500/50 group-hover:bg-violet-900/20 flex items-center justify-center text-violet-400 transition-all duration-300">
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/sign-up"
            className="px-7 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          >
            Get Started Free
          </a>
          <a
            href="/login"
            className="px-7 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
          >
            Already have an account?
          </a>
        </div>
      </div>
    </section>
  );
}
