"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { EpiphanyVaultButton } from "@/components/layout/EpiphanyVaultButton";
import { ArloMessage } from "@/components/journal/ArloMessage";
import { UserMessage } from "@/components/journal/UserMessage";
import { Waveform } from "@/components/journal/Waveform";
import { getJournalEntries, createJournalEntry, setReflectionStatus } from "@/lib/api/journal";
import { saveVaultItem } from "@/lib/api/vault";
import type { JournalEntry, Reflection } from "@/types";

export default function JournalPage() {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const qc = useQueryClient();

  const { data: entries = [] } = useQuery({
    queryKey: ["journal"],
    queryFn: () => getJournalEntries(),
  });

  const createMutation = useMutation({
    mutationFn: (content: string) => createJournalEntry(content),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journal"] }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "Kept" | "Dismissed" }) =>
      setReflectionStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journal"] }),
  });

  const vaultMutation = useMutation({
    mutationFn: (reflection: Reflection) =>
      saveVaultItem({
        title: "Reflection from Journal",
        arloQuote: reflection.arloText,
        tag: "Deep Echoes",
      }),
  });

  const handleSend = () => {
    if (!input.trim()) return;
    createMutation.mutate(input.trim());
    setInput("");
  };

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-30 bg-[#181E2E]/80 backdrop-blur-md border-b border-white/5">
        <div>
          <h1 className="font-serif text-2xl text-[#F5F0E8]">Morning Reflection</h1>
          <p className="font-sans text-xs text-[#9BA3B2] mt-1 font-light">Module 1: Seeing Clearly in a Noisy World</p>
        </div>
        <EpiphanyVaultButton />
      </header>

      {/* Feed */}
      <div ref={feedRef} className="flex-1 overflow-y-auto px-6 py-8 md:px-12 lg:px-24 flex flex-col gap-12 pb-40">
        <AnimatePresence>
          {entries.map((entry: JournalEntry) => (
            <div key={entry.id} className="flex flex-col gap-12">
              <UserMessage content={entry.content} time={new Date(entry.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} />
              {entry.reflections.map((r) => (
                <ArloMessage
                  key={r.id}
                  reflection={r}
                  onKeep={() => {
                    statusMutation.mutate({ id: r.id, status: "Kept" });
                    vaultMutation.mutate(r);
                  }}
                  onDismiss={() => statusMutation.mutate({ id: r.id, status: "Dismissed" })}
                />
              ))}
            </div>
          ))}
        </AnimatePresence>

        {entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mr-auto"
          >
            <div className="flex items-start gap-4 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#252D40] border border-[rgba(232,168,85,0.2)] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-leaf text-[10px] text-[#E8A855]" />
              </div>
              <span className="font-sans text-xs text-[#9BA3B2] mt-2">ARLO is here...</span>
            </div>
            <div className="reflection-card rounded-[24px] p-8">
              <p className="font-serif text-xl text-[#F5F0E8] leading-relaxed">
                Welcome. This is your space — no right answers, no wrong feelings. Whenever you&apos;re ready, share something on your mind. I&apos;m here to listen.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#181E2E] via-[#181E2E]/90 to-transparent z-40 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full pointer-events-auto">
          <div className="bg-[#252D40]/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors relative ${
                isRecording
                  ? "bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.3)] text-[#E8A855] shadow-[0_0_15px_rgba(232,168,85,0.2)]"
                  : "bg-white/5 border border-white/10 text-[#9BA3B2] hover:text-[#F5F0E8]"
              }`}
            >
              <i className="fa-solid fa-microphone" />
              {isRecording && <div className="absolute inset-0 rounded-full border border-[rgba(232,168,85,0.5)] animate-ping opacity-20" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Speak or type your thoughts..."
              className="flex-1 bg-transparent border-none text-[#F5F0E8] font-sans text-sm focus:outline-none px-4 placeholder:text-[#9BA3B2]/50 font-light"
            />

            {isRecording && <Waveform />}

            <button
              onClick={handleSend}
              disabled={createMutation.isPending || !input.trim()}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#9BA3B2] hover:text-[#F5F0E8] hover:bg-white/10 transition-colors disabled:opacity-40"
            >
              <i className="fa-solid fa-paper-plane text-sm" />
            </button>
          </div>
          <p className="text-center font-sans text-[10px] text-[#9BA3B2]/40 mt-3 font-light">
            Your reflections belong to you. ARLO is here to listen, not to judge.
          </p>
        </div>
      </div>
    </div>
  );
}
