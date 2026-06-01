"use client";

import { Card } from "@heroui/react";
import React from "react";

const stats = [
  { value: "50K", label: "Active Jobs" },
  { value: "12K", label: "Companies" },
  { value: "2M", label: "Job Seekers" },
  { value: "97%", label: "Satisfaction Rate" },
];

const GlobeStatsSection = () => {
  return (
    <section className="relative w-full py-30 flex flex-col items-center justify-center text-center text-white overflow-hidden mt-30">

      {/* Background Globe Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-90"
        style={{ backgroundImage: "url('/images/globe.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-4">

        <h2 className="text-2xl md:text-4xl font-medium leading-snug">
          Assisting over{" "}
          <span className="font-bold text-white">15,000</span> job seekers{" "}
          <br />
          find their dream positions.
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">

          {stats.map((item, index) => (
            <Card
              key={index}
              className="bg-white/5 border border-white/10 backdrop-blur-md text-left"
            >
              {/* Direct content (NO CardBody in HeroUI) */}
              <div className="p-6">
                <h3 className="text-3xl font-bold text-white">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {item.label}
                </p>
              </div>
            </Card>
          ))}

        </div>
      </div>
    </section>
  );
};

export default GlobeStatsSection;