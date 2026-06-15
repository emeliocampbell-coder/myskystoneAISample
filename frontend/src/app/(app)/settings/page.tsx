"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Toggle } from "@/components/ui/Toggle";
import { getSettings, updateSettings } from "@/lib/api/profile";
import { slideUp } from "@/lib/motion/variants";
import type { PrivacySettings } from "@/types";

type SettingsSection = "companion" | "privacy" | "data";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("companion");

  const { data: settings } = useQuery({ queryKey: ["settings"], queryFn: getSettings });

  const mutation = useMutation({
    mutationFn: updateSettings,
  });

  const handleToggle = (key: keyof PrivacySettings, value: boolean) => {
    if (!settings) return;
    mutation.mutate({ ...settings, [key]: value });
  };

  const sideNav = [
    { id: "companion" as SettingsSection, icon: "fa-solid fa-user-astronaut", label: "Companion & Voice" },
    { id: "privacy" as SettingsSection, icon: "fa-solid fa-shield-halved", label: "Privacy & Consent" },
    { id: "data" as SettingsSection, icon: "fa-solid fa-download", label: "Data Sovereignty" },
    { id: "help" as SettingsSection, icon: "fa-regular fa-circle-question", label: "Help & Support" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="w-full px-8 md:px-12 py-8 flex flex-col z-30 border-b border-white/5 bg-[#181E2E]/60 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 text-[#9BA3B2] text-sm font-sans mb-2">
          <span>Account</span>
          <i className="fa-solid fa-chevron-right text-[10px]" />
          <span className="text-[#F5F0E8]">Settings</span>
        </div>
        <h1 className="font-serif text-3xl text-[#F5F0E8] mb-1">Your Space Settings</h1>
        <p className="font-sans text-sm text-[#9BA3B2] font-light">Manage your companion, voice preferences, and privacy controls.</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-16 flex flex-col lg:flex-row gap-12">
        {/* Section nav */}
        <div className="lg:w-64 flex-shrink-0 space-y-2">
          {sideNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-sans text-sm transition-all ${
                activeSection === item.id
                  ? "bg-[#252D40]/50 border border-white/10 text-[#F5F0E8]"
                  : "bg-transparent text-[#9BA3B2] hover:bg-white/5 hover:text-[#F5F0E8]"
              }`}
            >
              <i className={`${item.icon} w-5 text-center mr-3`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings panels */}
        <div className="flex-1 max-w-3xl space-y-12 pb-20">
          {/* Companion section */}
          {activeSection === "companion" && (
            <motion.section variants={slideUp} initial="hidden" animate="visible" className="space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-serif text-2xl text-[#F5F0E8] mb-2">Companion & Voice</h2>
                <p className="font-sans text-sm text-[#9BA3B2]">Customize how ARLO sounds and interacts with you during your journey.</p>
              </div>
              <div className="reflection-card rounded-[24px] p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
                  <div className="w-24 h-24 rounded-full bg-[#252D40] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-robot text-3xl text-[rgba(232,168,85,0.8)]" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="font-sans font-medium text-[#F5F0E8] text-base mb-1">Your Companion</h3>
                      <p className="font-sans text-sm text-[#9BA3B2]">Currently set to the warm, observant guide.</p>
                    </div>
                    <button className="px-5 py-2 rounded-xl bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] text-[#E8A855] font-sans text-sm hover:bg-[rgba(232,168,85,0.2)] transition-all">
                      Change Companion
                    </button>
                  </div>
                </div>
                {settings && (
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h4 className="font-sans font-medium text-[#F5F0E8] text-base mb-1">Hear ARLO speak</h4>
                        <p className="font-sans text-sm text-[#9BA3B2] leading-relaxed">Your companion will read prompts aloud.</p>
                      </div>
                      <Toggle id="speak-toggle" checked={settings.hearArloSpeak} onChange={(v) => handleToggle("hearArloSpeak", v)} />
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <h4 className="font-sans font-medium text-[#F5F0E8] text-base mb-1">Speak your reflections</h4>
                        <p className="font-sans text-sm text-[#9BA3B2] leading-relaxed">Allow microphone access to talk to ARLO.</p>
                      </div>
                      <Toggle id="mic-settings-toggle" checked={settings.allowMicrophone} onChange={(v) => handleToggle("allowMicrophone", v)} />
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {/* Privacy section */}
          {activeSection === "privacy" && settings && (
            <motion.section variants={slideUp} initial="hidden" animate="visible" className="space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-serif text-2xl text-[#F5F0E8] mb-2">Privacy & Consent</h2>
                <p className="font-sans text-sm text-[#9BA3B2]">Control what ARLO notices and how your reflections are used.</p>
              </div>
              <div className="reflection-card rounded-[24px] p-8 space-y-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="font-sans font-medium text-[#F5F0E8] text-base mb-1">Pattern Recognition</h4>
                    <p className="font-sans text-sm text-[#9BA3B2] leading-relaxed">Allow ARLO to notice themes across your journal entries.</p>
                  </div>
                  <Toggle id="pattern-toggle" checked={settings.allowPatternRecognition} onChange={(v) => handleToggle("allowPatternRecognition", v)} />
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="font-sans font-medium text-[#F5F0E8] text-base mb-1">Educator Summaries</h4>
                    <p className="font-sans text-sm text-[#9BA3B2] leading-relaxed">Share high-level, anonymous themes with your counselor. Your specific entries are never shared.</p>
                  </div>
                  <Toggle id="educator-toggle" checked={settings.allowEducatorSummaries} onChange={(v) => handleToggle("allowEducatorSummaries", v)} />
                </div>
              </div>
            </motion.section>
          )}

          {/* Data section */}
          {activeSection === "data" && (
            <motion.section variants={slideUp} initial="hidden" animate="visible" className="space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h2 className="font-serif text-2xl text-[#F5F0E8] mb-2">Data Sovereignty</h2>
                <p className="font-sans text-sm text-[#9BA3B2]">Your reflections belong to you. Manage your history and exports here.</p>
              </div>
              <div className="reflection-card rounded-[24px] p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#252D40]/30 border border-white/5">
                  <div>
                    <h4 className="font-sans font-medium text-[#F5F0E8] text-sm mb-1">Download Lifebook</h4>
                    <p className="font-sans text-xs text-[#9BA3B2]">Export all your journal entries and Epiphany Vault moments as a PDF.</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl btn-ghost text-[#F5F0E8] font-sans text-sm whitespace-nowrap flex items-center gap-2">
                    <i className="fa-solid fa-download text-xs text-[#9BA3B2]" /> Export Data
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#252D40]/30 border border-white/5">
                  <div>
                    <h4 className="font-sans font-medium text-[#F5F0E8] text-sm mb-1">Clear Journey History</h4>
                    <p className="font-sans text-xs text-[#9BA3B2]">Remove all past reflections. This action is gentle but permanent.</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 font-sans text-sm whitespace-nowrap transition-all">
                    Clear History
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}
