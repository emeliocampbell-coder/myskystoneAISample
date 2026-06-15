"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { slideUp } from "@/lib/motion/variants";

type WellbeingStatus = "Green" | "Yellow" | "Red";

const WELLBEING_CONFIG: Record<WellbeingStatus, { dot: string; label: string; pulse: boolean }> = {
  Green: { dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]", label: "All is well", pulse: false },
  Yellow: { dot: "bg-[#E8A855] shadow-[0_0_8px_rgba(232,168,85,0.5)]", label: "Check-In Recommended", pulse: true },
  Red: { dot: "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.7)]", label: "Immediate Support Required", pulse: true },
};

// Static stub data
const STUDENTS = [
  { id: "1", name: "Maya Lin", grade: "11", module: "Module 4", wellbeing: "Green" as WellbeingStatus, avatarUrl: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5cebd5614d-aacc2c86c61ceac2619a.png" },
  { id: "2", name: "Elijah Thorne", grade: "10", module: "Module 2", wellbeing: "Green" as WellbeingStatus, avatarUrl: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1ba0c50fdc-f14ae49f312dd95da5ab.png" },
  { id: "3", name: "Sarah Jenkins", grade: "12", module: "Module 7", wellbeing: "Yellow" as WellbeingStatus, avatarUrl: "https://storage.googleapis.com/uxpilot-auth.appspot.com/26187deda0-d277ca6c56232a8e3ed3.png" },
  { id: "4", name: "David Chen", grade: "9", module: "Module 1", wellbeing: "Green" as WellbeingStatus, avatarUrl: "https://storage.googleapis.com/uxpilot-auth.appspot.com/62c5d97e55-70d10ea835639a4f18d7.png" },
];

const MAYA_SUMMARY = {
  name: "Maya Lin",
  grade: "11",
  currentModule: "Health, Self & Being Human",
  narrative: "Reflections have deepened across recent modules, with consistent themes around belonging and purpose emerging in Maya's journal entries.",
  detail: "Maya is actively using the Epiphany Vault to save moments related to community service and collaborative projects. Her engagement suggests a strong alignment with guiding others, though she occasionally expresses tentative feelings about taking on formal leadership roles.",
  themes: [
    { label: "Values Anchors", text: "Frequent reflection on fairness, community impact, and creative expression." },
    { label: "Growth Edges", text: "Navigating ambiguity in group settings and balancing personal time with commitments." },
  ],
  milestones: [
    { label: "Recent", text: 'Completed "Seeing Clearly in a Noisy World"' },
    { label: "Previous", text: "Saved 3 moments to Epiphany Vault" },
  ],
  wellbeing: "Green" as WellbeingStatus,
  wellbeingDescription: "All is well. Maya is engaged and progressing steadily.",
  avatarUrl: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5cebd5614d-aacc2c86c61ceac2619a.png",
};

export default function EducatorPage() {
  const [selectedId, setSelectedId] = useState("1");
  const [notes, setNotes] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="w-full px-8 md:px-12 py-8 flex flex-col z-30 border-b border-white/5 bg-[#181E2E]/60 backdrop-blur-md sticky top-0">
        <h1 className="font-serif text-3xl text-[#F5F0E8] mb-1">My Students</h1>
        <p className="font-sans text-sm text-[#9BA3B2] font-light">Qualitative engagement summaries and reflective insights.</p>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Student list */}
        <div className="lg:w-80 flex-shrink-0 border-r border-white/5 bg-[#252D40]/20 flex flex-col h-full">
          <div className="p-6 border-b border-white/5">
            <input type="text" placeholder="Search students..." className="w-full bg-[#252D40]/50 border border-white/10 rounded-xl py-3 pl-4 pr-4 text-sm font-sans text-[#F5F0E8] focus:outline-none focus:border-[rgba(232,168,85,0.3)] transition-all placeholder:text-[#9BA3B2]/50" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {STUDENTS.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedId(student.id)}
                className={`w-full text-left p-4 rounded-xl transition-all relative overflow-hidden ${
                  selectedId === student.id
                    ? "bg-[#252D40]/80 border border-[rgba(232,168,85,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                    : "bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10"
                }`}
              >
                {selectedId === student.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8A855] rounded-l-xl" />}
                {/* Well-being status dot */}
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${WELLBEING_CONFIG[student.wellbeing].dot} ${
                  WELLBEING_CONFIG[student.wellbeing].pulse ? "animate-pulse" : ""
                }`} title={WELLBEING_CONFIG[student.wellbeing].label} />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <h3 className={`font-sans font-medium text-sm truncate ${selectedId === student.id ? "text-[#F5F0E8]" : "text-[#9BA3B2]"}`}>{student.name}</h3>
                    <p className="font-sans text-xs text-[#9BA3B2]/70 truncate">Grade {student.grade} · {student.module}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Engagement panel */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16">
          <motion.div variants={slideUp} initial="hidden" animate="visible" className="max-w-4xl mx-auto space-y-12 pb-20">
            {/* Student info */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#252D40]">
                  <img src={MAYA_SUMMARY.avatarUrl} alt={MAYA_SUMMARY.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl text-[#F5F0E8] mb-1">{MAYA_SUMMARY.name}</h2>
                  <p className="font-sans text-sm text-[#9BA3B2]">Grade {MAYA_SUMMARY.grade} · Currently exploring &ldquo;{MAYA_SUMMARY.currentModule}&rdquo;</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-xl btn-ghost text-[#F5F0E8] font-sans text-sm flex items-center gap-2">
                <i className="fa-regular fa-envelope text-[#9BA3B2]" /> Message
              </button>
            </div>

            {/* Insights grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Narrative */}
              <div className="reflection-card rounded-[24px] p-8 md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <i className="fa-solid fa-leaf text-[rgba(232,168,85,0.8)] text-xl" />
                  <h3 className="font-sans font-medium text-[#F5F0E8] text-lg">Engagement Narrative</h3>
                </div>
                <p className="font-serif text-lg text-[#F5F0E8] leading-relaxed">&ldquo;{MAYA_SUMMARY.narrative}&rdquo;</p>
                <p className="font-sans text-sm text-[#9BA3B2] leading-relaxed mt-4">{MAYA_SUMMARY.detail}</p>
              </div>

              {/* Themes */}
              <div className="reflection-card rounded-[24px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <i className="fa-solid fa-compass text-[#9BA3B2] text-xl" />
                  <h3 className="font-sans font-medium text-[#F5F0E8] text-lg">Emerging Themes</h3>
                </div>
                <div className="space-y-4">
                  {MAYA_SUMMARY.themes.map((t) => (
                    <div key={t.label} className="p-4 rounded-xl bg-[#252D40]/30 border border-white/5">
                      <h4 className="font-sans font-medium text-[#F5F0E8] text-sm mb-2">{t.label}</h4>
                      <p className="font-sans text-xs text-[#9BA3B2] leading-relaxed">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="reflection-card rounded-[24px] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <i className="fa-solid fa-map-location-dot text-[#9BA3B2] text-xl" />
                  <h3 className="font-sans font-medium text-[#F5F0E8] text-lg">Journey Milestones</h3>
                </div>
                <div className="space-y-4">
                  {MAYA_SUMMARY.milestones.map((m, i) => (
                    <div key={i} className={`p-4 rounded-xl border border-white/5 ${i === 0 ? "bg-[#252D40]/30" : "bg-[#252D40]/10 opacity-70"}`}>
                      <p className="font-sans text-xs text-[#9BA3B2] mb-1">{m.label}</p>
                      <p className="font-sans font-medium text-[#F5F0E8] text-sm">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alert + notes */}
            <div className="space-y-6 pt-8 border-t border-white/5">
              <div className="p-6 rounded-2xl bg-red-900/10 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/50 rounded-l-2xl" />
                <div className="flex items-start gap-4 z-10">
                  <div className="mt-1 w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-shield-heart text-red-400 text-sm" />
                  </div>
                  <div>
                    <h4 className="font-sans font-medium text-[#F5F0E8] text-base mb-1">Support Indicator</h4>
                    <p className="font-sans text-sm text-[#9BA3B2] leading-relaxed">ARLO noticed language suggesting heightened stress regarding upcoming transitions. A gentle check-in is recommended.</p>
                  </div>
                </div>
                <button className="px-5 py-2.5 rounded-xl bg-[#252D40] border border-red-500/30 text-red-300 font-sans text-sm whitespace-nowrap hover:bg-red-500/10 transition-all z-10">
                  View Escalation Pathway
                </button>
              </div>

              <div className="reflection-card rounded-[24px] p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-pen-fancy text-[#9BA3B2] text-lg" />
                    <h3 className="font-sans font-medium text-[#F5F0E8] text-lg">Notes for my follow-up</h3>
                  </div>
                  <span className="font-sans text-xs text-[#9BA3B2] italic">Private to you</span>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full min-h-[150px] bg-[#252D40]/20 border border-white/5 rounded-xl p-5 font-serif text-[#F5F0E8] text-base leading-relaxed resize-none focus:outline-none focus:border-[rgba(232,168,85,0.3)] focus:bg-[#252D40]/40 transition-all placeholder:text-[#9BA3B2]/40 placeholder:font-sans placeholder:italic"
                  placeholder="Jot down thoughts or questions for your next one-on-one with Maya..."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
