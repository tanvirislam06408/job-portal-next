"use client";

import { Card, Button } from "@heroui/react";
import {
  FaCrown,
  FaChartLine,
  FaBolt,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa6";

const plans = [
  {
    name: "Starter",
    price: "$0",
    icon: FaCrown,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    price: "$17",
    featured: true,
    icon: FaChartLine,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    price: "$99",
    icon: FaBolt,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="bg-black py-24 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
            <span className="uppercase tracking-[0.3em] text-xs text-zinc-400">
              Pricing
            </span>
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
            Pay for the leverage,
            <br />
            not the listings
          </h2>

          {/* Toggle */}
          <div className="flex justify-center mt-10">
            <div className="bg-zinc-900 border border-zinc-700 rounded-full p-1 flex items-center">
              <button className="bg-white text-black rounded-full px-5 py-2 text-sm font-medium">
                Monthly
              </button>

              <button className="px-5 py-2 text-sm text-zinc-400">
                Yearly
              </button>

              <span className="bg-fuchsia-600 text-white text-xs px-2 py-1 rounded-full">
                25%
              </span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mt-16">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <Card
                key={plan.name}
                className={`
                  border border-zinc-800
                  bg-black
                  p-6
                  ${
                    plan.featured
                      ? "bg-zinc-900 border-zinc-600 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
                      : ""
                  }
                `}
              >
                {/* Top */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border border-zinc-700 bg-zinc-900 flex items-center justify-center text-violet-400">
                      <Icon size={16} />
                    </div>

                    <h3 className="text-2xl font-medium text-white">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-zinc-500 text-sm ml-1">
                      /month
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-10">
                  <p className="font-medium text-white mb-5">
                    Start building your insights hub:
                  </p>

                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-zinc-400"
                      >
                        <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center">
                          <FaPlus size={10} />
                        </div>

                        <span className="text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <Button
                  className={`
                    mt-12 w-full h-12
                    ${
                      plan.featured
                        ? "bg-white text-black"
                        : "bg-zinc-800 text-white"
                    }
                  `}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Choose This Plan</span>
                    <FaArrowRight />
                  </div>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}