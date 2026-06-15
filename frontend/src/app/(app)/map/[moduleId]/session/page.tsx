"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getModule } from "@/lib/api/modules";
import { createJournalEntry } from "@/lib/api/journal";
import { Waveform } from "@/components/journal/Waveform";
import { slideUp, waveformBar } from "@/lib/motion/variants";

export default function ModuleSessionPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const router = useRouter();
  const qc = useQueryClient();
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { data: module } = useQuery({
    queryKey: ["module", moduleId],
    queryFn: () => getModule(moduleId),
    enabled: !!moduleId,
  });

  const mutation = useMutation({
    mutationFn: (content: string) => createJournalEntry(content, moduleId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["journal"] });
      router.push("/journal");
    },
  });

  const AUDIO_BARS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#181E2E]/90">
      {/* Session header */}
      <header className="w-full px-8 py-8 flex flex-col items-center z-30 border-b border-white/5 bg-[#181E2E]/60 backdrop-blur-md sticky top-0">
        <div className="w-12 h-12 rounded-full bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] flex items-center justify-center text-[#E8A855] mb-4 shadow-[0_0_20px_rgba(232,168,85,0.15)]">
          <i className={`${module?.iconName || "fa-solid fa-eye"} text-lg`} />
        </div>
        <h1 className="font-serif text-3xl text-[#F5F0E8] mb-2">{module?.title ?? "Loading..."}</h1>
        <p className="font-sans text-sm text-[#9BA3B2] font-light flex items-center gap-2">
          <i className="fa-solid fa-volume-high text-xs opacity-70" />
          Audio Prompt Available
        </p>

        {/* Audio player UI */}
        <div className="mt-6 flex items-center gap-4 bg-[#252D40]/50 border border-white/5 rounded-full px-4 py-2">
          <button className="w-8 h-8 rounded-full bg-[rgba(232,168,85,0.2)] flex items-center justify-center text-[#E8A855] hover:bg-[rgba(232,168,85,0.3)] transition-colors">
            <i className="fa-solid fa-play text-xs ml-0.5" />
          </button>
          <div className="flex items-center gap-1 h-4 w-32">
            {AUDIO_BARS.map((delay, i) => (
              <motion.div
                key={i}
                variants={waveformBar(delay)}
                animate="animate"
                className={`w-1 rounded-full ${
                  i < 4 ? "bg-[#E8A855]" : "bg-[rgba(232,168,85,0.4)]"
                } ${i % 3 === 0 ? "h-full" : i % 3 === 1 ? "h-3/4" : "h-1/2"}`}
              />
            ))}
          </div>
          <span className="text-xs text-[#9BA3B2] font-sans ml-2">2:14</span>
        </div>
      </header>

      {/* Reflection sequence */}
      <div className="flex-1 overflow-y-auto px-6 py-12 md:px-12 lg:px-32 flex flex-col gap-12">
        {/* ARLO prompt card */}
        {module && (
          <motion.div variants={slideUp} initial="hidden" animate="visible" className="reflection-card rounded-[24px] p-8 md:p-10 max-w-3xl mx-auto w-full">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#252D40] border border-white/10 flex items-center justify-center text-[#9BA3B2] shrink-0">
                <i className="fa-solid fa-sparkles text-xs" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-xl md:text-2xl text-[#F5F0E8] leading-relaxed">
                  &ldquo;{module.longDescription} When was the last time you felt truly heard, even if it was just by yourself?&rdquo;
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-8 ml-12">
              <button className="btn-ghost px-4 py-2 rounded-full font-sans text-sm text-[#F5F0E8]/90 flex items-center gap-2">
                <i className="fa-solid fa-check text-xs text-[rgba(232,168,85,0.8)]" />
                Keep this
              </button>
              <button className="btn-ghost px-4 py-2 rounded-full font-sans text-sm text-[#9BA3B2] flex items-center gap-2">
                <i className="fa-solid fa-xmark text-xs opacity-70" />
                Not true for me
              </button>
            </div>
          </motion.div>
        )}

        {/* Text input */}
        <motion.div variants={slideUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }} className="max-w-3xl mx-auto w-full">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-[#252D40]/40 border border-white/10 rounded-[24px] p-6 text-[#F5F0E8] font-sans text-base leading-relaxed focus:outline-none focus:border-[rgba(232,168,85,0.5)] focus:bg-[#252D40]/60 transition-all resize-none min-h-[160px] placeholder-[#9BA3B2]/50"
              placeholder="Take a moment. What comes to mind? You can type here, or use the microphone..."
            />
            <div className="absolute bottom-6 right-6 flex items-center gap-3">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isRecording
                    ? "bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] text-[#E8A855]"
                    : "bg-white/5 border border-white/10 text-[#9BA3B2] hover:text-[#F5F0E8]"
                }`}
              >
                <i className="fa-solid fa-microphone" />
              </button>
              <button
                onClick={() => mutation.mutate(text)}
                disabled={!text.trim() || mutation.isPending}
                className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[#F5F0E8] font-sans text-sm hover:bg-white/10 transition-colors disabled:opacity-40"
              >
                Reflect
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Session footer */}
      <footer className="w-full px-8 py-6 border-t border-white/5 bg-[#181E2E]/80 backdrop-blur-md z-30 flex flex-col md:flex-row items-center justify-between gap-4 sticky bottom-0">
        <div className="flex items-center gap-2 text-[#9BA3B2] font-sans text-xs">
          <i className="fa-solid fa-arrow-turn-up rotate-90 opacity-50" />
          <span>Picking up where you left off</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="px-4 py-2 rounded-full bg-transparent text-[#9BA3B2] font-sans text-sm hover:text-[#F5F0E8] hover:bg-white/5 transition-all">
            Pause & return later
          </button>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#252D40] border border-[rgba(232,168,85,0.3)] text-[#E8A855] shadow-[0_0_15px_rgba(232,168,85,0.15)] hover:bg-[rgba(232,168,85,0.1)] transition-all">
            <i className="fa-solid fa-bookmark text-xs" />
            <span className="font-sans text-sm">Save moment</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
