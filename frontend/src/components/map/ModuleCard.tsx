"use client";

import { motion } from "framer-motion";
import { floatDelayed } from "@/lib/motion/variants";
import type { Module } from "@/types";

interface ModuleCardProps {
  module: Module;
  position: { top: string; left?: string; right?: string };
  delay?: number;
  onClick: () => void;
}

export function ModuleCard({ module, position, delay = 0, onClick }: ModuleCardProps) {
  const isActive = module.orderIndex <= 2;

  return (
    <motion.div
      variants={floatDelayed(delay)}
      animate="animate"
      className="absolute w-72 group cursor-pointer"
      style={position}
      onClick={onClick}
    >
      <div
        className={`reflection-card rounded-[24px] p-6 relative overflow-hidden transition-transform duration-500 hover:scale-[1.02] ${
          isActive ? "border-[rgba(232,168,85,0.3)] shadow-[0_0_30px_rgba(232,168,85,0.1)]" : "opacity-70"
        }`}
      >
        {isActive && <div className="absolute inset-0 bg-[rgba(232,168,85,0.05)] opacity-50" />}
        {isActive && (
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[rgba(232,168,85,0.5)] to-transparent opacity-80" />
        )}

        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
            isActive
              ? "bg-[rgba(232,168,85,0.2)] border border-[rgba(232,168,85,0.3)] text-[#E8A855] shadow-[0_0_15px_rgba(232,168,85,0.2)]"
              : "bg-[#252D40] border border-white/10 text-[#9BA3B2]"
          }`}>
            <i className={`${module.iconName}`} />
          </div>
          <span className={`text-[10px] font-sans px-2 py-1 rounded-full border ${
            isActive
              ? "text-[rgba(232,168,85,0.8)] border-[rgba(232,168,85,0.2)] bg-[rgba(232,168,85,0.1)]"
              : "text-[#9BA3B2] border-white/10 bg-white/5"
          }`}>
            ~{module.estimatedHours} hrs
          </span>
        </div>
        <h3 className={`font-serif text-lg leading-tight mb-2 relative z-10 ${isActive ? "text-[#F5F0E8]" : "text-[#F5F0E8]/70"}`}>
          {module.title}
        </h3>
        <p className={`font-sans text-xs font-light line-clamp-2 relative z-10 ${isActive ? "text-[#9BA3B2]" : "text-[#9BA3B2]/70"}`}>
          {module.description}
        </p>
        {module.isLocked && (
          <div className="absolute top-4 left-4 z-10">
            <i className="fa-solid fa-lock text-[#9BA3B2]/40 text-xs" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
