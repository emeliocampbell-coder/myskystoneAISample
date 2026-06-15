"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ArloLogo } from "@/components/ui/ArloLogo";
import { slideUp, fadeInSlow } from "@/lib/motion/variants";
import { savePrivacy } from "@/lib/api/onboarding";

const STEPS = ["Companion", "Support", "Privacy", "Tour"];

const FEATURES = [
  {
    icon: "fa-solid fa-pen-nib",
    name: "Student Journal",
    description: "Your private space for voice reflections, thoughts, and personal growth throughout the journey.",
    color: "rgba(232,168,85,0.1)",
    border: "rgba(232,168,85,0.2)",
  },
  {
    icon: "fa-solid fa-map",
    name: "Module Map",
    description: "Track your path through the ARLO experience — eight modules, one odyssey.",
    color: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.2)",
  },
  {
    icon: "fa-regular fa-user",
    name: "Learner Profile",
    description: "Your evolving identity — strengths, joy anchors, values, and direction signals, built over time.",
    color: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    icon: "fa-solid fa-box-archive",
    name: "Epiphany Vault",
    description: "A collection of your biggest realizations and breakthroughs, saved for whenever you need them.",
    color: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.2)",
  },
  {
    icon: "fa-solid fa-trophy",
    name: "Badges",
    description: "Milestones earned through insight, growth, and action — a record of how far you've come.",
    color: "rgba(232,168,85,0.1)",
    border: "rgba(232,168,85,0.3)",
  },
];

export default function TourPage() {
  const router = useRouter();
  const [active, setActive] = useState(0);

  const mutation = useMutation({
    mutationFn: () => savePrivacy({ allowPatternRecognition: true, allowEpiphanyAutoSave: true, allowEducatorSummaries: true, hearArloSpeak: true, allowMicrophone: true }),
    onSuccess: () => router.push("/journal"),
  });

  return (
    <div className="antialiased min-h-screen flex flex-col items-center relative bg-[#181E2E] overflow-x-hidden">
      <AmbientBackground />

      <header className="w-full max-w-7xl px-6 py-8 relative z-20 flex flex-col items-center">
        <ArloLogo />
        <div className="relative w-full max-w-md mt-8 mb-4">
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-white/10" />
          <div className="absolute top-4 left-6 h-0.5 bg-[#E8A855] w-full" />
          <div className="flex justify-between relative z-10">
            {STEPS.map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#E8A855] text-[#E8A855] bg-[#252D40] shadow-[0_0_15px_rgba(232,168,85,0.3)]">
                  {i < 3 ? <i className="fa-solid fa-check text-xs" /> : 4}
                </div>
                <span className={`text-xs font-sans ${i === 3 ? "text-[#F5F0E8]" : "text-[#E8A855]"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-7xl px-6 pb-24 flex flex-col items-center flex-1">
        <motion.div variants={fadeInSlow} initial="hidden" animate="visible" className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] mb-4">Your space, your tools.</h1>
          <p className="font-sans text-[#9BA3B2] text-base font-light max-w-2xl mx-auto leading-relaxed">
            Here&apos;s a quick look at what&apos;s waiting for you inside ARLO.
          </p>
        </motion.div>

        {/* Feature carousel */}
        <div className="w-full max-w-3xl">
          {/* Tab pills */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {FEATURES.map((f, i) => (
              <button
                key={f.name}
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full font-sans text-sm whitespace-nowrap transition-all ${
                  active === i
                    ? "bg-[rgba(232,168,85,0.15)] border border-[rgba(232,168,85,0.3)] text-[#E8A855]"
                    : "bg-[#252D40]/50 border border-white/5 text-[#9BA3B2] hover:text-[#F5F0E8]"
                }`}
              >
                <i className={`${f.icon} mr-2 text-xs`} />
                {f.name}
              </button>
            ))}
          </div>

          {/* Feature card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="bg-[#252D40]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-10 card-glow text-center"
              style={{ borderColor: FEATURES[active].border }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#E8A855]"
                style={{ backgroundColor: FEATURES[active].color, border: `1px solid ${FEATURES[active].border}` }}
              >
                <i className={`${FEATURES[active].icon} text-2xl`} />
              </div>
              <h2 className="font-serif text-3xl text-[#F5F0E8] mb-4">{FEATURES[active].name}</h2>
              <p className="font-sans text-[#9BA3B2] text-lg font-light leading-relaxed max-w-lg mx-auto">
                {FEATURES[active].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {FEATURES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  active === i ? "bg-[#E8A855] w-6" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-[#181E2E]/90 backdrop-blur-xl border-t border-white/5 py-6 px-6 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="px-6 py-3 rounded-xl font-sans text-sm font-medium text-[#9BA3B2] hover:text-white transition-colors flex items-center gap-2 group">
            <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="px-10 py-3.5 bg-[rgba(232,168,85,0.15)] border border-[rgba(232,168,85,0.4)] hover:bg-[rgba(232,168,85,0.25)] rounded-xl font-sans text-sm font-medium text-[#E8A855] transition-all flex items-center gap-2 group disabled:opacity-50 shadow-[0_0_20px_rgba(232,168,85,0.15)]"
          >
            Enter ARLO
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
}
