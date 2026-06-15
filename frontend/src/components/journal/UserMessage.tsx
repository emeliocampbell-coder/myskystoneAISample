"use client";

import { motion } from "framer-motion";

interface UserMessageProps {
  content: string;
  time?: string;
}

export function UserMessage({ content, time = "Just now" }: UserMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-2xl ml-auto flex flex-col items-end gap-2 opacity-70"
    >
      <div className="bg-[#252D40]/40 border border-white/5 rounded-[20px] rounded-tr-sm p-5 max-w-[85%]">
        <p className="font-sans text-sm text-[#F5F0E8]/90 font-light leading-relaxed">{content}</p>
      </div>
      <span className="text-[10px] text-[#9BA3B2]/50 font-sans px-2">{time}</span>
    </motion.div>
  );
}
