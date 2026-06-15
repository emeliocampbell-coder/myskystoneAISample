"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ArloLogo } from "@/components/ui/ArloLogo";
import { Toggle } from "@/components/ui/Toggle";
import { slideUp, fadeInSlow } from "@/lib/motion/variants";
import { savePrivacy } from "@/lib/api/onboarding";

export default function PrivacyPage() {
  const router = useRouter();
  const [patterns, setPatterns] = useState(true);
  const [vault, setVault] = useState(true);

  const mutation = useMutation({
    mutationFn: () => savePrivacy({ allowPatternRecognition: patterns, allowEpiphanyAutoSave: vault, allowEducatorSummaries: true, hearArloSpeak: true, allowMicrophone: true }),
    onSuccess: () => router.push("/journal"),
  });

  return (
    <div className="antialiased min-h-screen flex flex-col items-center relative bg-[#181E2E] overflow-x-hidden">
      <AmbientBackground />

      <header className="w-full max-w-7xl px-6 py-8 relative z-20 flex flex-col items-center">
        <ArloLogo />
        <div className="relative w-full max-w-md mt-8 mb-4">
          <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-white/10 -translate-y-1/2" />
          <div className="absolute top-1/2 left-6 h-0.5 bg-[#E8A855] -translate-y-1/2 w-full" />
          <div className="flex justify-between relative z-10">
            {["Companion", "Privacy"].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#E8A855] text-xs text-[#E8A855] shadow-[0_0_15px_rgba(232,168,85,0.3)] bg-[#252D40]">
                  {i === 0 ? <i className="fa-solid fa-check text-xs" /> : i + 1}
                </div>
                <span className={`text-xs font-sans ${i === 1 ? "text-[#F5F0E8]" : "text-[#E8A855]"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-7xl px-6 pb-24 flex flex-col items-center flex-1">
        <motion.div variants={fadeInSlow} initial="hidden" animate="visible" className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] mb-4">Your space, your rules.</h1>
          <p className="font-sans text-[#9BA3B2] text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Before we begin, let&apos;s establish some boundaries. ARLO is a safe space for reflection, and you control what happens to your thoughts.
          </p>
        </motion.div>

        <section className="w-full max-w-3xl space-y-6">
          {/* Educator transparency card */}
          <motion.div variants={slideUp} initial="hidden" animate="visible" className="bg-[#252D40]/60 backdrop-blur-md border border-white/10 rounded-[24px] p-8 hover:border-white/20 transition-all">
            <h3 className="font-serif text-xl text-[#F5F0E8] mb-2 flex items-center gap-3">
              <i className="fa-regular fa-eye text-[rgba(232,168,85,0.8)] text-lg" />
              What Educators See
            </h3>
            <p className="font-sans text-sm text-[#9BA3B2]/90 font-light leading-relaxed mb-4">
              Your exact words, voice recordings, and specific journal entries are never shared with anyone. Educators only see high-level, qualitative summaries of your growth themes.
            </p>
            <div className="bg-[#0F172A]/50 border border-white/5 rounded-xl p-4 inline-block">
              <span className="text-xs text-[#9BA3B2] uppercase tracking-wider font-semibold block mb-1">Example Summary</span>
              <span className="text-sm text-[#F5F0E8]/80 italic font-serif">&ldquo;Reflections have shown consistent engagement with topics around personal values and future direction.&rdquo;</span>
            </div>
          </motion.div>

          {/* Privacy toggles */}
          <motion.div variants={slideUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="bg-[#252D40]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 card-glow">
            <div className="mb-8">
              <h2 className="font-serif text-2xl text-[#F5F0E8] mb-2">Data & Sharing Preferences</h2>
              <p className="font-sans text-sm text-[#9BA3B2] font-light">You can always change these settings later in your profile.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="pr-6">
                  <h4 className="font-sans text-base text-[#F5F0E8] mb-1 flex items-center gap-2">
                    <i className="fa-solid fa-brain text-[#9BA3B2] text-sm" />
                    Allow ARLO to notice patterns
                  </h4>
                  <p className="font-sans text-sm text-[#9BA3B2]/70 font-light leading-relaxed">ARLO will gently point out recurring themes in your reflections over time.</p>
                </div>
                <Toggle id="patterns-toggle" checked={patterns} onChange={setPatterns} />
              </div>
              <div className="h-px w-full bg-white/5" />
              <div className="flex items-start justify-between">
                <div className="pr-6">
                  <h4 className="font-sans text-base text-[#F5F0E8] mb-1 flex items-center gap-2">
                    <i className="fa-solid fa-box-archive text-[#9BA3B2] text-sm" />
                    Auto-save significant moments
                  </h4>
                  <p className="font-sans text-sm text-[#9BA3B2]/70 font-light leading-relaxed">ARLO will automatically suggest saving profound reflections to your Epiphany Vault.</p>
                </div>
                <Toggle id="vault-toggle" checked={vault} onChange={setVault} />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full bg-[#181E2E]/90 backdrop-blur-xl border-t border-white/5 py-6 px-6 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()} className="px-6 py-3 rounded-xl font-sans text-sm font-medium text-[#9BA3B2] hover:text-white transition-colors flex items-center gap-2 group">
            <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="px-10 py-3.5 bg-[#252D40] border border-white/10 hover:border-[rgba(232,168,85,0.5)] rounded-xl font-sans text-sm font-medium text-[#F5F0E8] transition-all shadow-[0_0_20px_rgba(232,168,85,0.05)] hover:shadow-[0_0_30px_rgba(232,168,85,0.15)] flex items-center gap-2 group disabled:opacity-50"
          >
            Enter ARLO
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform text-[#E8A855]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
