"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Observation } from "@/types";
import { setObservationStatus } from "@/lib/api/profile";
import { consentOverlay, slideUp, staggerContainer } from "@/lib/motion/variants";

interface ConsentInterstitialProps {
  observations: Observation[];
  onDone: () => void;
}

export function ConsentInterstitial({ observations, onDone }: ConsentInterstitialProps) {
  const [showDrafts, setShowDrafts] = useState(false);
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "Accepted" | "Dismissed" }) =>
      setObservationStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });

  const draftObs = observations.filter((o) => o.status === "Draft");

  return (
    <AnimatePresence>
      <motion.div
        variants={consentOverlay}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6"
        style={{ backgroundColor: "rgba(24,30,46,0.95)", backdropFilter: "blur(20px)" }}
      >
        {/* Ambient orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full blur-[100px]"
            style={{ backgroundColor: "rgba(232,168,85,0.05)" }}
          />
        </div>

        {!showDrafts ? (
          /* Question state */
          <motion.div variants={slideUp} initial="hidden" animate="visible" className="max-w-2xl w-full text-center relative z-10">
            <div className="w-24 h-24 mx-auto rounded-[24px] bg-[#252D40] border border-white/10 flex items-center justify-center mb-10 relative overflow-hidden shadow-[0_0_40px_rgba(37,45,64,0.8)]">
              <div className="absolute inset-0 bg-[rgba(232,168,85,0.05)]" />
              <div className="absolute inset-0 rounded-[24px] border border-[rgba(232,168,85,0.3)] animate-ping opacity-20" />
              <i className="fa-solid fa-sparkles text-3xl text-[#E8A855] opacity-90" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-8 leading-tight tracking-wide">
              We&apos;re starting to notice some patterns in what you&apos;ve shared.
            </h2>
            <p className="font-sans text-xl text-[#9BA3B2] font-light mb-16 max-w-xl mx-auto leading-relaxed">
              Want to see what we&apos;re seeing?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => setShowDrafts(true)}
                className="w-full sm:w-auto px-10 py-4 rounded-[16px] bg-[#252D40] border border-[rgba(232,168,85,0.3)] text-[#E8A855] font-sans text-base font-medium hover:bg-[rgba(232,168,85,0.1)] transition-all shadow-[0_0_20px_rgba(232,168,85,0.15)] min-w-[200px]"
              >
                Yes
              </button>
              <button
                onClick={onDone}
                className="w-full sm:w-auto px-10 py-4 rounded-[16px] btn-ghost text-[#9BA3B2] font-sans text-base font-medium min-w-[200px]"
              >
                Not yet
              </button>
            </div>
          </motion.div>
        ) : (
          /* Draft observations */
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-5xl w-full relative z-10 h-full max-h-[85vh] flex flex-col"
          >
            <div className="text-center mb-10 flex-shrink-0">
              <h2 className="font-serif text-3xl text-[#F5F0E8] mb-3">Draft Observations</h2>
              <p className="font-sans text-base text-[#9BA3B2] font-light max-w-2xl mx-auto">
                Review these emerging patterns. Keep what feels true, or dismiss what misses the mark.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 pb-8">
              {draftObs.map((obs, i) => (
                <motion.div key={obs.id} variants={slideUp} transition={{ delay: i * 0.1 }} className="reflection-card rounded-[24px] p-8">
                  <div className="mb-6">
                    <span className="font-sans text-sm text-[#E8A855] bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] px-3 py-1 rounded-full flex items-center gap-2 w-fit">
                      <i className="fa-solid fa-compass text-xs" />
                      {obs.category}
                    </span>
                  </div>
                  <p className="font-serif text-xl text-[#F5F0E8] leading-relaxed mb-8">&ldquo;{obs.text}&rdquo;</p>
                  <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                    <button
                      onClick={() => mutation.mutate({ id: obs.id, status: "Accepted" })}
                      className="px-5 py-2.5 rounded-[12px] btn-ghost text-[#F5F0E8] font-sans text-sm hover:text-[#E8A855] hover:border-[rgba(232,168,85,0.3)] transition-all flex items-center gap-2"
                    >
                      <i className="fa-solid fa-check text-xs" /> Keep this
                    </button>
                    <button className="px-5 py-2.5 rounded-[12px] btn-ghost text-[#9BA3B2] font-sans text-sm hover:text-white transition-all flex items-center gap-2">
                      <i className="fa-solid fa-pen text-xs" /> Edit it
                    </button>
                    <button
                      onClick={() => mutation.mutate({ id: obs.id, status: "Dismissed" })}
                      className="px-5 py-2.5 rounded-[12px] btn-ghost text-[#9BA3B2] font-sans text-sm hover:text-white transition-all flex items-center gap-2 ml-auto"
                    >
                      <i className="fa-solid fa-xmark text-xs" /> Not true for me
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex-shrink-0 pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
              <p className="font-sans text-xs text-[#9BA3B2]/70 flex items-center gap-2">
                <i className="fa-solid fa-lock text-[10px]" /> Kept observations will be added to your Learner Profile.
              </p>
              <button
                onClick={onDone}
                className="px-8 py-3 rounded-[16px] bg-[#252D40] border border-[rgba(232,168,85,0.3)] text-[#E8A855] font-sans text-sm font-medium hover:bg-[rgba(232,168,85,0.1)] transition-all shadow-[0_0_15px_rgba(232,168,85,0.15)]"
              >
                Done Reviewing
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
