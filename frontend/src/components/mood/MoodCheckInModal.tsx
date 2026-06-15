"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { logMood } from "@/lib/api/mood";
import { consentOverlay, slideUp } from "@/lib/motion/variants";

interface MoodCheckInModalProps {
  onDone: () => void;
}

const MOOD_EMOJIS = ["😔", "😕", "😐", "🙂", "😊"];
const SLEEP_LABELS = ["Poor", "Fair", "Okay", "Good", "Great"];
const ENERGY_LABELS = ["Drained", "Low", "Moderate", "Good", "High"];

function ScaleRow({
  label,
  icon,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: string;
  value: number;
  onChange: (v: number) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <i className={`${icon} text-[#9BA3B2] text-sm`} />
        <span className="font-sans text-sm text-[#F5F0E8]">{label}</span>
        {value > 0 && (
          <span className="font-sans text-xs text-[#9BA3B2] ml-auto">{options[value - 1]}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={`flex-1 h-10 rounded-xl border transition-all font-sans text-sm ${
              value === i + 1
                ? "bg-[rgba(232,168,85,0.15)] border-[rgba(232,168,85,0.5)] text-[#E8A855]"
                : "bg-white/5 border-white/10 text-[#9BA3B2] hover:border-white/20 hover:text-[#F5F0E8]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MoodCheckInModal({ onDone }: MoodCheckInModalProps) {
  const [mood, setMood] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [energy, setEnergy] = useState(0);

  const mutation = useMutation({
    mutationFn: () => logMood({ moodScore: mood || undefined, sleepScore: sleep || undefined, energyScore: energy || undefined }),
    onSuccess: onDone,
  });

  const handleSkip = () => {
    logMood({ skipped: true }).catch(() => {});
    onDone();
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={consentOverlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[200] flex items-center justify-center p-6"
        style={{ backgroundColor: "rgba(15,23,42,0.97)", backdropFilter: "blur(20px)" }}
      >
        <motion.div variants={slideUp} initial="hidden" animate="visible" className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-full bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] flex items-center justify-center mx-auto mb-6 text-[#E8A855]">
              <i className="fa-solid fa-heart-pulse text-xl" />
            </div>
            <h2 className="font-serif text-3xl text-[#F5F0E8] mb-2">How are you today?</h2>
            <p className="font-sans text-sm text-[#9BA3B2] font-light">
              A quick check-in. Takes 10 seconds.
            </p>
          </div>

          {/* Mood emoji row */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <i className="fa-regular fa-face-smile text-[#9BA3B2] text-sm" />
              <span className="font-sans text-sm text-[#F5F0E8]">Overall mood</span>
            </div>
            <div className="flex items-center gap-3">
              {MOOD_EMOJIS.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => setMood(i + 1)}
                  className={`flex-1 h-12 rounded-xl border text-xl transition-all ${
                    mood === i + 1
                      ? "bg-[rgba(232,168,85,0.15)] border-[rgba(232,168,85,0.5)] scale-110"
                      : "bg-white/5 border-white/10 hover:border-white/20 hover:scale-105"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <ScaleRow label="Sleep quality" icon="fa-solid fa-moon" value={sleep} onChange={setSleep} options={SLEEP_LABELS} />
            <ScaleRow label="Energy level" icon="fa-solid fa-bolt" value={energy} onChange={setEnergy} options={ENERGY_LABELS} />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending || (!mood && !sleep && !energy)}
              className="w-full py-4 rounded-xl bg-[rgba(232,168,85,0.15)] border border-[rgba(232,168,85,0.4)] text-[#E8A855] font-sans font-medium hover:bg-[rgba(232,168,85,0.25)] transition-all disabled:opacity-40"
            >
              {mutation.isPending ? "Saving..." : "Save & Continue"}
            </button>
            <button
              onClick={handleSkip}
              className="w-full py-3 rounded-xl bg-transparent border border-white/10 text-[#9BA3B2] font-sans text-sm hover:text-[#F5F0E8] hover:bg-white/5 transition-all"
            >
              Skip today
            </button>
          </div>

          <p className="text-center font-sans text-[10px] text-[#9BA3B2]/30 mt-6 tracking-wider">
            © 2026 Skystone Education Inc.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
