"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiDollarSign, FiCalendar } from "react-icons/fi";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function JobOverviewSidebar({ jobInfo }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-5"
    >
      <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
        Job Overview
      </h3>

      <motion.div variants={item} className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
          <FiBriefcase className="text-violet-400" size={18} />
        </div>
        <div>
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Job Type</p>
          <p className="text-sm font-semibold text-zinc-200">{jobInfo?.type}</p>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <FiDollarSign className="text-emerald-400" size={18} />
        </div>
        <div>
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Salary Range</p>
          <p className="text-sm font-semibold text-zinc-200">
            {jobInfo?.salary?.min} - {jobInfo?.salary?.max} {jobInfo?.salary?.currency}
          </p>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <FiMapPin className="text-rose-400" size={18} />
        </div>
        <div>
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Location</p>
          <p className="text-sm font-semibold text-zinc-200">
            {jobInfo?.location?.isRemote ? "Remote" : `${jobInfo?.location?.city}, ${jobInfo?.location?.country}`}
          </p>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <FiCalendar className="text-amber-400" size={18} />
        </div>
        <div>
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Application Deadline</p>
          <p className="text-sm font-semibold text-red-400">{jobInfo?.deadline}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
