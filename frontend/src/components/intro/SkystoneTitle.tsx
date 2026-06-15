"use client";

import { motion } from "framer-motion";
import { CrescentMark } from "@/components/ui/CrescentMark";

export function SkystoneTitle() {
  return (
    <div className="flex flex-col items-center gap-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-[#E8A855]"
      >
        <CrescentMark size={72} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="font-serif text-2xl md:text-3xl text-[#F5F0E8]/90 tracking-[0.35em] uppercase">
          Skystone Education Inc.
        </span>
      </motion.div>
    </div>
  );
}
