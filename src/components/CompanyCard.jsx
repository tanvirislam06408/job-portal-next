"use client";

import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export default function CompanyCard({ company }) {
  if (!company) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-6 rounded-2xl"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-[80px] rounded-full" />
      <div className="relative z-10">
        <p className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider mb-1">
          About The Employer
        </p>
        <h4 className="text-lg font-bold text-white flex items-center gap-2">
          {company.companyName}
          <FiCheckCircle className="text-violet-400" size={16} title="Verified Employer" />
        </h4>
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-zinc-500">
          <span>ID: {company.companyId?.slice(-6).toUpperCase()}</span>
          <span className="text-violet-400 hover:text-violet-300 hover:underline cursor-pointer font-medium transition-colors duration-200">
            View Profile →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
