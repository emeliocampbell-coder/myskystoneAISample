"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { EpiphanyVaultButton } from "@/components/layout/EpiphanyVaultButton";
import { ModuleCard } from "@/components/map/ModuleCard";
import { ModuleModal } from "@/components/map/ModuleModal";
import { getModules } from "@/lib/api/modules";
import type { Module } from "@/types";
import { fadeInSlow } from "@/lib/motion/variants";

// Staggered zigzag positions for the module odyssey path
const POSITIONS = [
  { top: "50px", left: "10%" },
  { top: "280px", right: "10%" },
  { top: "520px", left: "20%" },
  { top: "760px", right: "15%" },
  { top: "1000px", left: "10%" },
  { top: "1240px", right: "10%" },
  { top: "1480px", left: "20%" },
  { top: "1720px", right: "15%" },
];

export default function MapPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const { data: modules = [] } = useQuery({ queryKey: ["modules"], queryFn: getModules });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-30 bg-[#181E2E]/80 backdrop-blur-md border-b border-white/5">
        <div>
          <h1 className="font-serif text-2xl text-[#F5F0E8]">My Journey</h1>
          <p className="font-sans text-xs text-[#9BA3B2] mt-1 font-light">Your personal odyssey unfolds here.</p>
        </div>
        <EpiphanyVaultButton />
      </header>

      {/* Odyssey path */}
      <div className="flex-1 overflow-y-auto px-6 py-12 md:px-12 lg:px-24 pb-40 relative">
        {/* SVG path line */}
        <svg className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: "2100px" }} preserveAspectRatio="none">
          <path
            d="M 200,100 C 400,100 600,300 400,500 C 200,700 600,900 400,1100 C 200,1300 600,1500 400,1700 C 200,1900 600,2000 400,2100"
            stroke="rgba(232,168,85,0.15)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6,6"
            style={{ animation: "dash 30s linear infinite" }}
          />
          <style>{`@keyframes dash { to { stroke-dashoffset: -1000; } }`}</style>
        </svg>

        <div className="relative mx-auto" style={{ minHeight: "2000px", maxWidth: "900px" }}>
          {modules.map((module: Module, idx) => (
            <ModuleCard
              key={module.id}
              module={module}
              position={POSITIONS[idx] || POSITIONS[POSITIONS.length - 1]}
              delay={idx * 1}
              onClick={() => setSelectedModule(module)}
            />
          ))}
        </div>
      </div>

      <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />
    </div>
  );
}
