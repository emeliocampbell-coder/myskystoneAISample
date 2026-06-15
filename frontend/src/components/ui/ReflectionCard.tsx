"use client";

import { motion } from "framer-motion";
import { slideUp } from "@/lib/motion/variants";

interface ReflectionCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function ReflectionCard({ children, className = "", delay = 0, onClick }: ReflectionCardProps) {
  return (
    <motion.div
      variants={slideUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      onClick={onClick}
      className={`reflection-card rounded-[24px] ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
