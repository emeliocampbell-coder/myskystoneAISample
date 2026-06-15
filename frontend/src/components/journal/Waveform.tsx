"use client";

import { motion } from "framer-motion";
import { waveformBar } from "@/lib/motion/variants";

const BAR_DELAYS = [0.1, 0.3, 0.5, 0.2, 0.4, 0.6];
const BAR_HEIGHTS = ["h-2", "h-4", "h-6", "h-3", "h-5", "h-2"];

export function Waveform({ active = true }: { active?: boolean }) {
  if (!active) return null;
  return (
    <div className="flex items-center h-8 px-4 border-l border-white/10 gap-[2px]">
      {BAR_DELAYS.map((delay, i) => (
        <motion.div
          key={i}
          variants={waveformBar(delay)}
          animate="animate"
          className={`w-[3px] ${BAR_HEIGHTS[i]} bg-[#E8A855] rounded-sm`}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}
