"use client";

import { motion } from "framer-motion";

interface IntroSlideProps {
  children: React.ReactNode;
}

export function IntroSlide({ children }: IntroSlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A]"
    >
      {/* Subtle ambient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
           style={{ backgroundColor: "rgba(232,168,85,0.04)" }} />
      <div className="relative z-10 flex flex-col items-center">{children}</div>
    </motion.div>
  );
}
