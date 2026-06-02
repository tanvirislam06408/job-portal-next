"use client";

import { FaBullseye, FaChartBar, FaCheckCircle, FaFileAlt, FaLightbulb, FaSearch, FaStar } from "react-icons/fa";
import { LuTrendingUp } from "react-icons/lu";


const features = [
  {
    icon: FaSearch,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: FaChartBar,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: FaLightbulb,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: FaStar,
    title: "Saved Jobs",
    description: "Manage saved & favorites on your dashboard.",
  },
  {
    icon: FaCheckCircle,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FaFileAlt,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: FaBullseye,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: LuTrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function FeaturedJob() {
  return (
    <section className="relative py-24 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold tracking-widest text-gray-300">
              FEATURES JOB
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          Everything you need <br /> to succeed
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col gap-4 p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
