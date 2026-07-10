"use client";

import { motion } from "framer-motion";

export function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-sm border border-secondary px-2 py-0.5">
      <motion.span
        className="block h-2 w-2 rounded-full bg-secondary"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="font-label-sm text-label-sm text-secondary">AO VIVO</span>
    </div>
  );
}