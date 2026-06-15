"use client";

import { motion } from "framer-motion";
import { slideUp } from "@/lib/motion/variants";
import type { Reflection } from "@/types";

interface ArloMessageProps {
  reflection: Reflection;
  onKeep: () => void;
  onDismiss: () => void;
}

export function ArloMessage({ reflection, onKeep, onDismiss }: ArloMessageProps) {
  return (
    <motion.div variants={slideUp} initial="hidden" animate="visible" className="w-full max-w-3xl mr-auto">
      <div className="flex items-start gap-4 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#252D40] border border-[rgba(232,168,85,0.2)] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(232,168,85,0.1)]">
          <i className="fa-solid fa-leaf text-[10px] text-[#E8A855]" />
        </div>
        <span className="font-sans text-xs text-[#9BA3B2] mt-2">ARLO noticing...</span>
      </div>

      <div className="reflection-card rounded-[24px] p-8 relative overflow-hidden group">
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[rgba(232,168,85,0.3)] to-transparent opacity-50" />
        <p className="font-serif text-xl md:text-2xl text-[#F5F0E8] leading-relaxed">{reflection.arloText}</p>
        {reflection.followUpQuestion && (
          <p className="font-serif text-lg text-[#F5F0E8]/80 mt-4 leading-relaxed italic">
            I&apos;m wondering... {reflection.followUpQuestion}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 mt-4 ml-12">
        <button onClick={onKeep} className="btn-ghost px-4 py-2 rounded-full font-sans text-xs text-[#9BA3B2] hover:text-[#F5F0E8] flex items-center gap-2">
          <i className="fa-regular fa-bookmark" />
          Keep this
        </button>
        <button className="btn-ghost px-4 py-2 rounded-full font-sans text-xs text-[#9BA3B2] hover:text-[#F5F0E8] flex items-center gap-2">
          <i className="fa-solid fa-pen-clip" />
          Edit it
        </button>
        <button onClick={onDismiss} className="btn-ghost px-4 py-2 rounded-full font-sans text-xs text-[#9BA3B2] hover:text-[#F5F0E8] flex items-center gap-2">
          <i className="fa-solid fa-xmark" />
          Not true for me
        </button>
      </div>
    </motion.div>
  );
}
