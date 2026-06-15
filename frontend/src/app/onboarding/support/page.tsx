"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ArloLogo } from "@/components/ui/ArloLogo";
import { slideUp, fadeInSlow } from "@/lib/motion/variants";

const STEPS = ["Companion", "Support", "Privacy", "Tour"];

export default function SupportPage() {
  const router = useRouter();

  return (
    <div className="antialiased min-h-screen flex flex-col items-center relative bg-[#181E2E] overflow-x-hidden">
      <AmbientBackground />

      {/* Progress header */}
      <header className="w-full max-w-7xl px-6 py-8 relative z-20 flex flex-col items-center">
        <ArloLogo />
        <div className="relative w-full max-w-md mt-8 mb-4">
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-white/10" />
          <div className="absolute top-4 left-6 h-0.5 bg-[#E8A855] transition-all duration-500" style={{ width: "33%" }} />
          <div className="flex justify-between relative z-10">
            {STEPS.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-sans bg-[#252D40] ${
                  i === 0 ? "border-[#E8A855] text-[#E8A855]" :
                  i === 1 ? "border-[#E8A855] text-[#E8A855] shadow-[0_0_15px_rgba(232,168,85,0.3)]" :
                  "border-white/10 text-[#9BA3B2]"
                }`}>
                  {i === 0 ? <i className="fa-solid fa-check text-xs" /> : i + 1}
                </div>
                <span className={`text-xs font-sans ${i <= 1 ? "text-[#E8A855]" : "text-[#9BA3B2]"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-7xl px-6 pb-24 flex flex-col items-center flex-1">
        <motion.div variants={fadeInSlow} initial="hidden" animate="visible" className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] mb-4">A Note on Extra Support</h1>
          <p className="font-sans text-[#9BA3B2] text-base font-light max-w-2xl mx-auto leading-relaxed">
            Understanding how ARLO keeps you safe.
          </p>
        </motion.div>

        <motion.section variants={slideUp} initial="hidden" animate="visible" className="w-full max-w-2xl space-y-6">
          {/* Main explanation card */}
          <div className="bg-[#252D40]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-10 card-glow space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] flex items-center justify-center text-[#E8A855] shrink-0 mt-1">
                <i className="fa-solid fa-shield-heart text-sm" />
              </div>
              <p className="font-sans text-[#F5F0E8]/90 leading-relaxed">
                ARLO is designed to support reflection and personal growth — not to judge or diagnose you.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] flex items-center justify-center text-[#E8A855] shrink-0 mt-1">
                <i className="fa-solid fa-bell text-sm" />
              </div>
              <p className="font-sans text-[#F5F0E8]/90 leading-relaxed">
                In rare situations, if patterns suggest a student may be struggling emotionally, highly disengaged, or asking for help indirectly, educators may receive a gentle well-being notification encouraging a supportive check-in conversation.
              </p>
            </div>

            <div className="h-px bg-white/5" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] flex items-center justify-center text-[#E8A855] shrink-0 mt-1">
                <i className="fa-solid fa-lock text-sm" />
              </div>
              <p className="font-sans text-[#F5F0E8]/90 leading-relaxed">
                These notifications are based on broad patterns, not single responses, and do not include your exact words, recordings, or private journal entries — unless your words explicitly present as a threat to yourself or others.
              </p>
            </div>
          </div>

          {/* This is a safe space */}
          <motion.div variants={slideUp} initial="hidden" animate="visible" transition={{ delay: 0.15 }} className="bg-[rgba(232,168,85,0.05)] border border-[rgba(232,168,85,0.2)] rounded-[24px] p-8 text-center">
            <i className="fa-solid fa-leaf text-[#E8A855] text-2xl mb-4 block" />
            <p className="font-serif text-2xl text-[#F5F0E8] mb-2">This is a safe space.</p>
            <p className="font-sans text-sm text-[#9BA3B2] font-light">
              ARLO is here to listen, reflect, and guide — never to surveil or judge.
            </p>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-[#181E2E]/90 backdrop-blur-xl border-t border-white/5 py-6 px-6 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="px-6 py-3 rounded-xl font-sans text-sm font-medium text-[#9BA3B2] hover:text-white transition-colors flex items-center gap-2 group">
            <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <button
            onClick={() => router.push("/onboarding/privacy")}
            className="px-10 py-3.5 bg-[#252D40] border border-white/10 hover:border-[rgba(232,168,85,0.5)] rounded-xl font-sans text-sm font-medium text-[#F5F0E8] transition-all flex items-center gap-2 group"
          >
            I understand, continue
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform text-[#E8A855]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
