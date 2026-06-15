"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ArloLogo } from "@/components/ui/ArloLogo";
import { Toggle } from "@/components/ui/Toggle";
import { slideUp, fadeInSlow } from "@/lib/motion/variants";
import { getCompanions, selectCompanion } from "@/lib/api/onboarding";
import { useUiStore } from "@/store/uiStore";
import type { Companion } from "@/types";

export default function CompanionPage() {
  const router = useRouter();
  const { selectedCompanionId, setSelectedCompanionId } = useUiStore();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  const { data: companions = [] } = useQuery({ queryKey: ["companions"], queryFn: getCompanions });

  const mutation = useMutation({
    mutationFn: selectCompanion,
    onSuccess: () => router.push("/onboarding/support"),
  });

  const handleContinue = () => {
    if (selectedCompanionId) {
      mutation.mutate(selectedCompanionId);
    } else {
      router.push("/onboarding/privacy");
    }
  };

  return (
    <div className="antialiased min-h-screen flex flex-col items-center relative bg-[#181E2E] overflow-x-hidden">
      <AmbientBackground />

      {/* Progress header */}
      <header className="w-full max-w-7xl px-6 py-8 relative z-20 flex flex-col items-center">
        <ArloLogo />
        <div className="relative w-full max-w-md mt-8 mb-4">
          <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-white/10 -translate-y-1/2" />
          <div className="absolute top-1/2 left-6 h-0.5 bg-[#E8A855] -translate-y-1/2" style={{ width: "50%" }} />
          <div className="flex justify-between relative z-10">
            {["Companion", "Support", "Privacy", "Tour"].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-sans ${
                  i === 0 ? "border-[#E8A855] text-[#E8A855] shadow-[0_0_15px_rgba(232,168,85,0.3)]" : "border-white/10 text-[#9BA3B2]"
                } bg-[#252D40]`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-sans ${i === 0 ? "text-[#F5F0E8]" : "text-[#9BA3B2]"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-7xl px-6 pb-24 flex flex-col items-center flex-1">
        <motion.div variants={fadeInSlow} initial="hidden" animate="visible" className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F0E8] mb-4">Choose your companion.</h1>
          <p className="font-sans text-[#9BA3B2] text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Your companion will guide your journey, ask questions, and help you reflect. You can change this later.
          </p>
        </motion.div>

        {/* Companion grid */}
        <section className="w-full max-w-5xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companions.map((companion: Companion, idx) => {
              const isSelected = selectedCompanionId === companion.id;
              return (
                <motion.div
                  key={companion.id}
                  variants={slideUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedCompanionId(isSelected ? null : companion.id)}
                  className={`relative cursor-pointer rounded-[24px] p-6 flex flex-col items-center text-center overflow-hidden transition-all duration-500 border-2 ${
                    isSelected
                      ? "border-[#E8A855] bg-[rgba(232,168,85,0.05)] -translate-y-1 shadow-[0_12px_40px_rgba(232,168,85,0.15)]"
                      : "border-transparent bg-[#252D40]/60 hover:-translate-y-0.5 hover:bg-white/5 hover:border-white/10"
                  } backdrop-blur-md`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-[#E8A855] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#E8A855]" />
                    </div>
                  )}
                  <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-2 border-white/5 shadow-lg bg-[#0F172A] flex items-center justify-center">
                    {companion.imageUrl ? (
                      <img src={companion.imageUrl} alt={companion.name} className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <i className={`${companion.iconName} text-3xl text-[#9BA3B2]/50`} />
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-[#F5F0E8] mb-2">{companion.name}</h3>
                  <p className="font-sans text-sm text-[#9BA3B2] font-light leading-relaxed">{companion.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Voice preferences */}
        <motion.section variants={slideUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="w-full max-w-2xl">
          <div className="bg-[#252D40]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 card-glow">
            <div className="mb-8">
              <h2 className="font-serif text-2xl text-[#F5F0E8] mb-2">Voice & Input Preferences</h2>
              <p className="font-sans text-sm text-[#9BA3B2] font-light">ARLO is designed to be a conversation. Choose how you want to interact.</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="pr-6">
                  <h4 className="font-sans text-base text-[#F5F0E8] mb-1 flex items-center gap-2">
                    <i className="fa-solid fa-volume-high text-[#9BA3B2] text-sm" />
                    Hear ARLO speak
                  </h4>
                  <p className="font-sans text-sm text-[#9BA3B2]/70 font-light leading-relaxed">Your companion will read prompts aloud in a calm, natural voice.</p>
                </div>
                <Toggle id="voice-toggle" checked={voiceEnabled} onChange={setVoiceEnabled} />
              </div>
              <div className="h-px w-full bg-white/5" />
              <div className="flex items-start justify-between">
                <div className="pr-6">
                  <h4 className="font-sans text-base text-[#F5F0E8] mb-1 flex items-center gap-2">
                    <i className="fa-solid fa-microphone text-[#9BA3B2] text-sm" />
                    Speak your reflections
                  </h4>
                  <p className="font-sans text-sm text-[#9BA3B2]/70 font-light leading-relaxed">Allow microphone access to talk to ARLO instead of typing.</p>
                </div>
                <Toggle id="mic-toggle" checked={micEnabled} onChange={setMicEnabled} />
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer actions */}
      <footer className="fixed bottom-0 w-full bg-[#181E2E]/90 backdrop-blur-xl border-t border-white/5 py-6 px-6 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button className="px-6 py-3 rounded-xl font-sans text-sm font-medium text-[#9BA3B2] hover:text-white transition-colors flex items-center gap-2 group">
            <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={mutation.isPending}
            className="px-10 py-3.5 bg-[#252D40] border border-white/10 hover:border-[rgba(232,168,85,0.5)] hover:bg-[#252D40]/80 rounded-xl font-sans text-sm font-medium text-[#F5F0E8] transition-all shadow-[0_0_20px_rgba(232,168,85,0.05)] hover:shadow-[0_0_30px_rgba(232,168,85,0.15)] flex items-center gap-2 group disabled:opacity-50"
          >
            Continue
            <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform text-[#E8A855]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
