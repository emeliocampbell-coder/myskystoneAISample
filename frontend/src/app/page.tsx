"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { IntroSlide } from "@/components/intro/IntroSlide";
import { SkystoneTitle } from "@/components/intro/SkystoneTitle";
import { ArloTitle } from "@/components/intro/ArloTitle";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { Toggle } from "@/components/ui/Toggle";
import { useUiStore } from "@/store/uiStore";
import { float, fadeInSlow } from "@/lib/motion/variants";

type Slide = "skystone" | "arlo" | "welcome";

const SLIDE_DURATIONS: Record<Slide, number> = {
  skystone: 4000,
  arlo: 3500,
  welcome: Infinity,
};

const SLIDE_ORDER: Slide[] = ["skystone", "arlo", "welcome"];

export default function WelcomePage() {
  const [slide, setSlide] = useState<Slide>("skystone");
  const [skipVisible, setSkipVisible] = useState(false);
  const { isEducator, setIsEducator } = useUiStore();

  // TODO: Enable audio once "Above and Beyond – Flow State" rights are acquired
  // const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const skipTimer = setTimeout(() => setSkipVisible(true), 1500);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (slide === "welcome") return;
    const timer = setTimeout(() => {
      const next = SLIDE_ORDER[SLIDE_ORDER.indexOf(slide) + 1] as Slide;
      setSlide(next);
    }, SLIDE_DURATIONS[slide]);
    return () => clearTimeout(timer);
  }, [slide]);

  const skipToWelcome = () => setSlide("welcome");

  return (
    <>
      {/* TODO: <audio ref={audioRef} src="/audio/flow-state.mp3" /> */}

      <AnimatePresence mode="wait">
        {slide === "skystone" && (
          <IntroSlide key="skystone">
            <SkystoneTitle />
          </IntroSlide>
        )}

        {slide === "arlo" && (
          <IntroSlide key="arlo">
            <ArloTitle />
          </IntroSlide>
        )}

        {slide === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="antialiased min-h-screen flex flex-col items-center justify-center relative bg-[#181E2E] overflow-x-hidden"
          >
            <AmbientBackground />

            <main className="relative z-10 w-full max-w-4xl px-6 py-12 flex flex-col items-center justify-center min-h-screen">
              {/* Tagline */}
              <motion.section
                variants={fadeInSlow}
                initial="hidden"
                animate="visible"
                className="text-center mb-16 max-w-2xl mx-auto"
              >
                <p className="font-serif text-3xl md:text-4xl text-[#F5F0E8] leading-relaxed opacity-90 mb-3">
                  &ldquo;No tests. No scores.<br />
                  <span className="text-[#E8A855] italic">Just you.</span>&rdquo;
                </p>
                <p className="font-sans text-xs text-[#9BA3B2]/40 tracking-[0.25em] uppercase mt-6">
                  A Skystone Platform
                </p>
              </motion.section>

              {/* CTA */}
              <motion.section
                variants={fadeInSlow}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center w-full max-w-md gap-6 mb-16"
              >
                <Link
                  href={isEducator ? "/educator" : "/signin"}
                  className="w-full sm:w-auto px-10 py-4 bg-[#252D40] border border-white/10 rounded-full text-[#F5F0E8] font-sans text-lg font-medium transition-all duration-300 hover:bg-white/5 hover:border-[rgba(232,168,85,0.5)] shadow-[0_0_20px_rgba(232,168,85,0.3)] hover:shadow-[0_0_30px_rgba(232,168,85,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  Begin my journey
                  <i className="fa-solid fa-arrow-right text-[#E8A855] group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="text-[#9BA3B2] text-sm font-sans hover:text-[#F5F0E8] transition-colors underline decoration-white/20 underline-offset-4 hover:decoration-[#F5F0E8]/50">
                  How ARLO uses your words
                </button>
              </motion.section>
            </main>

            {/* Role toggle */}
            <motion.footer
              initial={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              className="absolute bottom-8 w-full flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-sans ${!isEducator ? "text-[#F5F0E8]" : "text-[#9BA3B2]"}`}>Student</span>
                <Toggle id="role-toggle" checked={isEducator} onChange={setIsEducator} />
                <span className={`text-sm font-sans ${isEducator ? "text-[#E8A855]" : "text-[#9BA3B2]"}`}>Educator</span>
              </div>
              <p className="font-sans text-[10px] text-[#9BA3B2]/30 tracking-wider">
                © 2026 Skystone Education Inc.
              </p>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button — appears 1.5s in, hides on welcome slide */}
      {slide !== "welcome" && (
        <AnimatePresence>
          {skipVisible && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={skipToWelcome}
              className="fixed top-6 right-6 z-[60] font-sans text-xs text-[#9BA3B2]/60 hover:text-[#F5F0E8] transition-colors tracking-wider uppercase px-4 py-2 rounded-full border border-white/10 hover:border-white/20 bg-[#0F172A]/60 backdrop-blur-sm"
            >
              Skip
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
