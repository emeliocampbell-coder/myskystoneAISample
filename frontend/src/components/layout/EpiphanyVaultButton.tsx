"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { pulseSoft } from "@/lib/motion/variants";

export function EpiphanyVaultButton() {
  return (
    <motion.div variants={pulseSoft} animate="animate">
      <Link
        href="/vault"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#252D40] border border-[rgba(232,168,85,0.3)] text-[#E8A855] shadow-[0_0_15px_rgba(232,168,85,0.15)] hover:bg-[rgba(232,168,85,0.1)] transition-all"
      >
        <i className="fa-solid fa-star text-xs" />
        <span className="font-sans text-xs font-medium">Epiphany Vault</span>
      </Link>
    </motion.div>
  );
}
