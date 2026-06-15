"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Module } from "@/types";

interface ModuleModalProps {
  module: Module | null;
  onClose: () => void;
}

export function ModuleModal({ module, onClose }: ModuleModalProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {module && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#181E2E]/90 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg reflection-card rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-[#9BA3B2] hover:text-[#F5F0E8] hover:bg-white/10 transition-colors"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] flex items-center justify-center text-[#E8A855] mb-6 shadow-[0_0_20px_rgba(232,168,85,0.15)] mx-auto">
              <i className={`${module.iconName} text-xl`} />
            </div>

            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-3">{module.title}</h2>
              <p className="font-sans text-sm text-[#9BA3B2] font-light leading-relaxed">{module.longDescription}</p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => router.push(`/map/${module.id}/session`)}
                className="w-full py-4 rounded-full bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.3)] text-[#E8A855] font-sans text-sm hover:bg-[rgba(232,168,85,0.2)] transition-all shadow-[0_0_15px_rgba(232,168,85,0.1)] flex items-center justify-center gap-2"
              >
                <span>Continue your reflection</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-transparent border border-white/10 text-[#9BA3B2] font-sans text-xs hover:text-[#F5F0E8] hover:bg-white/5 transition-all"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
