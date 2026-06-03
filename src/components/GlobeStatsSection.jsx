"use client";

import { Card } from "@heroui/react";
import React from "react";

const stats = [
  { value: "50K", label: "Active Jobs" },
  { value: "12K", label: "Companies" },
  { value: "2M", label: "Job Seekers" },
  { value: "97%", label: "Satisfaction Rate" },
];

import { motion } from "framer-motion";

const text = "find their dream positions.";

const GlobeStatsSection = () => {
  return (
    <section className="relative isolate w-full py-24 flex flex-col items-center justify-center text-center text-white overflow-hidden">

      {/* Background Globe Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-90"
        style={{ backgroundImage: "url('/images/globe.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-4 w-full">

        <h2 className="text-2xl md:text-4xl font-medium leading-snug">
          Assisting over{" "}
          <span className="font-bold text-white">15,000</span> job seekers{" "}
          <br />
          
        </h2>


        <div className="flex mt-3 text-center justify-center items-center text-2xl md:text-4xl font-bold">
          <div className="">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.01,
                  repeat:Infinity
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="ml-1"
          >
            |
          </motion.span>
        </div>

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