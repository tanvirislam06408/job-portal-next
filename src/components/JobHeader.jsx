"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiMapPin, FiClock } from "react-icons/fi";

export default function JobHeader({ jobInfo, companyName,_id }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div className="relative z-10 space-y-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-wider">
          {jobInfo?.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          {jobInfo?.title}
        </h1>
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-zinc-400">
          <span className="font-semibold text-zinc-200">{companyName}</span>
          <span className="text-zinc-600">|</span>
          <span className="flex items-center gap-1.5">
            <FiMapPin className="text-zinc-500" size={14} />
            {jobInfo?.location?.isRemote ? "Remote" : jobInfo?.location?.city}
          </span>
          <span className="text-zinc-600">|</span>
          <span className="flex items-center gap-1.5">
            <FiClock className="text-zinc-500" size={14} />
            {jobInfo?.type}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative z-10 flex items-center md:self-center"
      >
        <Link href={`/jobs/${_id}/apply`} className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.45)] active:scale-[0.98]">
          Apply For Job
        </Link>
      </motion.div>
    </motion.div>
  );
}
