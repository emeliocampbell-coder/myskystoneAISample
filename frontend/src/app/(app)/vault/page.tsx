"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getVaultItems, deleteVaultItem } from "@/lib/api/vault";
import { ReflectionCard } from "@/components/ui/ReflectionCard";
import { slideUp } from "@/lib/motion/variants";
import type { VaultItem } from "@/types";

const TAGS = ["All Moments", "Deep Echoes", "Future Self", "Quiet Truths", "Sparks"];

export default function VaultPage() {
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");
  const qc = useQueryClient();

  const { data: items = [] } = useQuery({
    queryKey: ["vault", activeTag],
    queryFn: () => getVaultItems(activeTag),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVaultItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vault"] }),
  });

  const filtered = items.filter((item: VaultItem) =>
    search ? item.title.toLowerCase().includes(search.toLowerCase()) || item.arloQuote.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="w-full px-8 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between z-30 border-b border-white/5 bg-[#181E2E]/60 backdrop-blur-md sticky top-0 gap-6">
        <div>
          <h1 className="font-serif text-3xl text-[#F5F0E8] mb-1 flex items-center gap-3">
            <i className="fa-solid fa-box-archive text-xl text-[rgba(232,168,85,0.8)]" /> Epiphany Vault
          </h1>
          <p className="font-sans text-sm text-[#9BA3B2] font-light">Your saved moments, reflections, and insights.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#9BA3B2]/50 text-sm" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your vault..."
              className="w-full bg-[#252D40]/50 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm font-sans text-[#F5F0E8] focus:outline-none focus:border-[rgba(232,168,85,0.3)] focus:bg-[#252D40] transition-all placeholder:text-[#9BA3B2]/50"
            />
          </div>
        </div>
      </header>

      {/* Filter strip */}
      <div className="px-8 md:px-12 py-4 border-b border-white/5 flex gap-3 overflow-x-auto z-20">
        {TAGS.map((tag) => {
          const isActive = tag === "All Moments" ? !activeTag : activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === "All Moments" ? undefined : tag)}
              className={`px-4 py-1.5 rounded-full font-sans text-xs whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] text-[#E8A855]"
                  : "bg-[#252D40]/50 border border-white/5 text-[#9BA3B2] hover:text-[#F5F0E8] hover:bg-[#252D40]"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-16">
        <div style={{ columnCount: 3, columnGap: "1.5rem" }} className="max-w-6xl">
          {filtered.map((item: VaultItem, i) => (
            <motion.div key={item.id} variants={slideUp} initial="hidden" animate="visible" transition={{ delay: i * 0.05 }} className="break-inside-avoid mb-6">
              <ReflectionCard className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] text-[#9BA3B2] uppercase tracking-wider">
                      {item.moduleId ? `Module` : "Journal"}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="font-sans text-[10px] text-[#9BA3B2]">
                      {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(item.id)}
                    className="text-[#9BA3B2]/50 hover:text-red-400 transition-colors"
                  >
                    <i className="fa-solid fa-ellipsis-vertical" />
                  </button>
                </div>

                <h3 className="font-sans font-medium text-[#F5F0E8] text-lg mb-3 cursor-pointer">{item.title}</h3>

                <div className="bg-[#0F172A]/40 rounded-xl p-4 mb-4 border border-white/5">
                  <p className="font-serif text-[#F5F0E8]/90 text-base leading-relaxed italic">&ldquo;{item.arloQuote}&rdquo;</p>
                </div>

                {item.userNote && (
                  <div className="mb-5">
                    <label className="font-sans text-[10px] text-[#9BA3B2] uppercase tracking-wider mb-2 block">Your Note</label>
                    <p className="font-sans text-[#F5F0E8]/80 text-sm">{item.userNote}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="px-3 py-1 rounded-full bg-[#252D40] border border-white/5 text-[#9BA3B2] font-sans text-[10px]">{item.tag}</span>
                  <button className="w-8 h-8 rounded-full btn-ghost flex items-center justify-center text-[#9BA3B2] hover:text-[#E8A855] transition-colors">
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                  </button>
                </div>
              </ReflectionCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 mb-8 text-center border-t border-white/5 pt-8">
          <p className="font-sans text-sm text-[#9BA3B2]/70 flex items-center justify-center gap-2">
            <i className="fa-solid fa-shield-halved" /> Only you can decide what to share. Your vault is private.
          </p>
        </div>
      </div>
    </div>
  );
}
