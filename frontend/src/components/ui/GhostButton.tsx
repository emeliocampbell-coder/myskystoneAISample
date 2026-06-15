"use client";

import { motion } from "framer-motion";
import { type ButtonHTMLAttributes } from "react";

interface GhostButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function GhostButton({ children, className = "", onClick, disabled, type = "button" }: GhostButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`btn-ghost rounded-xl px-4 py-2 text-sm font-sans text-[#F5F0E8]/90 hover:text-white transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}
