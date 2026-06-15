"use client";

import { motion } from "framer-motion";
import { CrescentMark } from "@/components/ui/CrescentMark";

export function ArloTitle() {
  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-[#F5F0E8]/60"
      >
        <CrescentMark size={48} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        className="text-center"
      >
        <h1 className="font-serif text-6xl md:text-8xl text-[#F5F0E8] tracking-tight mb-4">
          ARLO
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-sans text-base md:text-lg text-[#9BA3B2] tracking-[0.2em] uppercase font-light"
        >
          A Reflective Learning Odyssey
        </motion.p>
      </motion.div>
    </div>
  );
}
