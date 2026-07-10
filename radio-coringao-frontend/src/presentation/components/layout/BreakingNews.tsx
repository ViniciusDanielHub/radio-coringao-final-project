"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface BreakingNewsProps {
  text?: string;
}

export function BreakingNews({
  text = "URGENTE: Corinthians define escalação para o clássico de domingo. Técnico confirma mudanças no meio-campo.",
}: BreakingNewsProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="w-full overflow-hidden bg-secondary"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-margin-mobile py-2.5 md:px-margin-desktop">
        <div className="flex shrink-0 items-center gap-2">
          <AlertTriangle size={16} className="text-on-secondary" />
          <span className="font-label-sm text-label-sm text-on-secondary">
            PLANTÃO
          </span>
        </div>
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              x: { repeat: Infinity, duration: 20, ease: "linear" },
            }}
            className="whitespace-nowrap"
          >
            <span className="font-body-md text-body-md text-on-secondary">
              {text}
            </span>
            <span className="mx-8 text-on-secondary opacity-50">|</span>
            <span className="font-body-md text-body-md text-on-secondary">
              {text}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}