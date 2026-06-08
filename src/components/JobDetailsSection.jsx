"use client";

import { motion } from "framer-motion";

export default function JobDetailsSection({ title, content }) {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl hover:border-violet-500/30 transition-all duration-500"
    >
      <h2 className="text-lg font-bold text-white mb-4 tracking-tight border-b border-white/10 pb-3">
        {title}
      </h2>
      <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">
        {content}
      </p>
    </motion.div>
  );
}
