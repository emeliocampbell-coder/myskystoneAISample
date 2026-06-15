"use client";

import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getBadges } from "@/lib/api/badges";
import { EpiphanyVaultButton } from "@/components/layout/EpiphanyVaultButton";
import { slideUp, staggerContainer } from "@/lib/motion/variants";
import type { BadgeDto } from "@/types";

const TIER_COLORS = {
  Bronze: { glow: "rgba(180,120,60,0.3)", text: "text-amber-600", bg: "bg-amber-900/20", border: "border-amber-700/30" },
  Silver: { glow: "rgba(148,163,184,0.3)", text: "text-slate-300", bg: "bg-slate-700/20", border: "border-slate-500/30" },
  Gold: { glow: "rgba(234,179,8,0.4)", text: "text-yellow-400", bg: "bg-yellow-900/20", border: "border-yellow-500/40" },
};

function BadgeCard({ badge, index }: { badge: BadgeDto; index: number }) {
  const tier = TIER_COLORS[badge.tier] ?? TIER_COLORS.Bronze;

  return (
    <motion.div
      variants={slideUp}
      transition={{ delay: index * 0.06 }}
      className={`relative rounded-[20px] p-6 flex flex-col items-center text-center transition-all duration-500 border ${
        badge.isEarned
          ? `reflection-card border-[rgba(232,168,85,0.3)] ${tier.bg}`
          : "reflection-card opacity-40 grayscale"
      }`}
      style={badge.isEarned ? { boxShadow: `0 0 30px ${tier.glow}` } : {}}
    >
      {/* Lock overlay for unearned */}
      {!badge.isEarned && (
        <div className="absolute top-4 right-4">
          <i className="fa-solid fa-lock text-[#9BA3B2]/40 text-xs" />
        </div>
      )}

      {/* Badge icon */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border ${
        badge.isEarned ? `${tier.bg} ${tier.border}` : "bg-white/5 border-white/10"
      }`}>
        <i className={`${badge.iconName} text-2xl ${badge.isEarned ? "text-[#E8A855]" : "text-[#9BA3B2]/40"}`} />
      </div>

      {/* Tier chip */}
      <span className={`font-sans text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-3 border ${tier.bg} ${tier.border} ${tier.text}`}>
        {badge.tier}
      </span>

      <h3 className="font-serif text-lg text-[#F5F0E8] mb-2">{badge.name}</h3>
      <p className="font-sans text-xs text-[#9BA3B2] font-light leading-relaxed mb-4">{badge.description}</p>

      {badge.isEarned && badge.awardedAt && (
        <span className="font-sans text-[10px] text-[#9BA3B2]/60">
          Earned {new Date(badge.awardedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      )}
    </motion.div>
  );
}

export default function BadgesPage() {
  const { data: badges = [], isLoading } = useQuery({
    queryKey: ["badges"],
    queryFn: getBadges,
  });

  const earned = badges.filter((b) => b.isEarned);
  const total = badges.length;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-30 bg-[#181E2E]/80 backdrop-blur-md border-b border-white/5">
        <div>
          <h1 className="font-serif text-2xl text-[#F5F0E8] flex items-center gap-3">
            <i className="fa-solid fa-trophy text-[#E8A855]" />
            Badges
          </h1>
          <p className="font-sans text-xs text-[#9BA3B2] mt-1 font-light">
            {earned.length} of {total} earned — milestones through insight, growth, and action.
          </p>
        </div>
        <EpiphanyVaultButton />
      </header>

      {/* Progress bar */}
      <div className="px-8 py-4 border-b border-white/5">
        <div className="max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-xs text-[#9BA3B2]">Progress</span>
            <span className="font-sans text-xs text-[#E8A855]">{earned.length}/{total}</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: total > 0 ? `${(earned.length / total) * 100}%` : "0%" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full bg-[#E8A855] rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Badge grid */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-16">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <i className="fa-solid fa-circle-notch fa-spin text-[#E8A855] text-2xl" />
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl"
          >
            {badges.map((badge, i) => (
              <BadgeCard key={badge.id} badge={badge} index={i} />
            ))}
          </motion.div>
        )}

        <div className="mt-12 mb-8 text-center border-t border-white/5 pt-8">
          <p className="font-sans text-sm text-[#9BA3B2]/60 italic font-serif">
            &ldquo;Every badge is a breadcrumb of who you are becoming.&rdquo;
          </p>
          <p className="font-sans text-xs text-[#9BA3B2]/30 mt-2 tracking-wider">© 2026 Skystone Education Inc.</p>
        </div>
      </div>
    </div>
  );
}
