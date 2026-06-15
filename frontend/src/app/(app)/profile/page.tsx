"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { EpiphanyVaultButton } from "@/components/layout/EpiphanyVaultButton";
import { FilterPill } from "@/components/ui/FilterPill";
import { ConsentInterstitial } from "@/components/profile/ConsentInterstitial";
import { ReflectionCard } from "@/components/ui/ReflectionCard";
import { getLearnerProfile } from "@/lib/api/profile";
import { fadeInSlow } from "@/lib/motion/variants";
import type { Observation } from "@/types";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const CATEGORIES = ["All Insights", "Strengths", "Values", "JoyAnchors", "Direction", "Wellness"];
const CATEGORY_ICONS: Record<string, string> = {
  "All Insights": "fa-solid fa-layer-group",
  Strengths: "fa-solid fa-seedling",
  Values: "fa-solid fa-compass",
  JoyAnchors: "fa-solid fa-sun",
  Direction: "fa-solid fa-arrow-trend-up",
  Wellness: "fa-solid fa-leaf",
};

export default function ProfilePage() {
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [showConsent, setShowConsent] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getLearnerProfile,
  });

  useEffect(() => {
    if (profile && !consentChecked) {
      const hasDraft = profile.observations.some((o: Observation) => o.status === "Draft");
      if (hasDraft) setShowConsent(true);
      setConsentChecked(true);
    }
  }, [profile, consentChecked]);

  const filteredObs = profile?.observations.filter((o: Observation) =>
    activeCategory === "All Insights" ? true : o.category === activeCategory
  ) ?? [];

  const chartData = [{
    type: "scatterpolar" as const,
    r: [
      profile?.patternScores.values ?? 0,
      profile?.patternScores.strengths ?? 0,
      profile?.patternScores.joyAnchors ?? 0,
      profile?.patternScores.wellness ?? 0,
      profile?.patternScores.direction ?? 0,
    ],
    theta: ["Values", "Strengths", "Joy Anchors", "Wellness", "Direction"],
    fill: "toself" as const,
    fillcolor: "rgba(232,168,85,0.15)",
    line: { color: "rgba(232,168,85,0.6)", width: 2 },
    marker: { color: "#E8A855", size: 6 },
  }];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {showConsent && profile && (
        <ConsentInterstitial
          observations={profile.observations}
          onDone={() => setShowConsent(false)}
        />
      )}

      {/* Header */}
      <header className="w-full px-8 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between z-30 border-b border-white/5 bg-[#181E2E]/60 backdrop-blur-md sticky top-0 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[#252D40] border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(37,45,64,0.5)]">
            <i className="fa-regular fa-user text-2xl text-[#9BA3B2]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl text-[#F5F0E8] mb-1">Your Identity Portrait</h1>
            <p className="font-sans text-sm text-[#9BA3B2] font-light">A living reflection of who you are becoming.</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#252D40] border border-[rgba(232,168,85,0.3)] text-[#E8A855] shadow-[0_0_15px_rgba(232,168,85,0.15)] hover:bg-[rgba(232,168,85,0.1)] transition-all group">
          <i className="fa-solid fa-download text-sm group-hover:-translate-y-0.5 transition-transform" />
          <span className="font-sans text-sm font-medium">Download my Lifebook</span>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-16 flex flex-col gap-10">
        {/* Filters */}
        <motion.div variants={fadeInSlow} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-3">
          {CATEGORIES.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              icon={CATEGORY_ICONS[cat]}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Observation cards */}
          <div className="lg:col-span-8">
            <div style={{ columnCount: 2, columnGap: "1.5rem" }}>
              {filteredObs.map((obs: Observation, i) => (
                <ReflectionCard key={obs.id} delay={i * 0.1} className="p-6 mb-6 break-inside-avoid">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-xs text-[#9BA3B2] uppercase tracking-wider flex items-center gap-2">
                      <i className={`${CATEGORY_ICONS[obs.category] ?? "fa-solid fa-circle"} text-[rgba(232,168,85,0.7)]`} />
                      {obs.category}
                    </span>
                    <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9BA3B2] hover:text-[#F5F0E8] hover:bg-white/10 transition-colors">
                      <i className="fa-solid fa-pen text-[10px]" />
                    </button>
                  </div>
                  <p className="font-serif text-lg text-[#F5F0E8] leading-relaxed">&ldquo;{obs.text}&rdquo;</p>
                </ReflectionCard>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ReflectionCard className="p-6">
              <h3 className="font-serif text-xl text-[#F5F0E8] mb-2">Pattern Landscape</h3>
              <p className="font-sans text-xs text-[#9BA3B2] mb-6">A soft map of themes you&apos;ve explored most deeply.</p>
              {profile && (
                <Plot
                  data={chartData}
                  layout={{
                    polar: {
                      radialaxis: { visible: false, range: [0, 5] },
                      angularaxis: { tickfont: { color: "#9BA3B2", family: '"DM Sans", sans-serif', size: 10 }, linecolor: "rgba(255,255,255,0.05)", gridcolor: "rgba(255,255,255,0.05)" },
                      bgcolor: "transparent",
                    },
                    showlegend: false,
                    paper_bgcolor: "transparent",
                    plot_bgcolor: "transparent",
                    margin: { t: 30, r: 30, b: 30, l: 30 },
                  }}
                  config={{ responsive: true, displayModeBar: false }}
                  style={{ width: "100%", height: "256px" }}
                />
              )}
            </ReflectionCard>

            <ReflectionCard
              className="p-6 border-[rgba(232,168,85,0.2)] cursor-pointer hover:bg-[rgba(232,168,85,0.1)] transition-colors"
              onClick={() => setShowConsent(true)}
            >
              <div className="w-10 h-10 rounded-full bg-[rgba(232,168,85,0.2)] flex items-center justify-center text-[#E8A855] mb-4">
                <i className="fa-solid fa-eye text-sm" />
              </div>
              <h3 className="font-serif text-lg text-[#F5F0E8] mb-2">New Patterns Emerging</h3>
              <p className="font-sans text-sm text-[#9BA3B2] leading-relaxed mb-4">We&apos;re starting to notice some recurring themes in what you&apos;ve shared recently.</p>
              <span className="font-sans text-xs text-[#E8A855] font-medium flex items-center gap-2">
                Review new observations <i className="fa-solid fa-arrow-right" />
              </span>
            </ReflectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
