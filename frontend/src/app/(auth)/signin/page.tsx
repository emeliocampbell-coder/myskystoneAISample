"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { ArloLogo } from "@/components/ui/ArloLogo";
import { Toggle } from "@/components/ui/Toggle";
import { MoodCheckInModal } from "@/components/mood/MoodCheckInModal";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import * as authApi from "@/lib/api/auth";
import { fadeInSlow, slideUp } from "@/lib/motion/variants";

export default function SignInPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { isEducator, setIsEducator } = useUiStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [showMoodModal, setShowMoodModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;
      if (isRegister) {
        result = await authApi.register(email, name, password, isEducator ? "Educator" : "Student");
      } else {
        result = await authApi.login(email, password);
      }
      setAuth(result.user, result.token);

      // Determine destination
      let dest = "/journal";
      if (!result.user.onboardingComplete && !isEducator) {
        dest = "/onboarding/companion";
      } else if (isEducator || result.user.role === "Educator") {
        dest = "/educator";
      }

      // Show mood modal once per calendar day (students only, post-onboarding)
      const today = new Date().toDateString();
      const lastMoodDate = localStorage.getItem("arlo_mood_date");
      const isStudent = !isEducator && result.user.role !== "Educator";
      if (isStudent && result.user.onboardingComplete && lastMoodDate !== today) {
        setPendingRoute(dest);
        setShowMoodModal(true);
      } else {
        router.push(dest);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {showMoodModal && (
      <MoodCheckInModal
        onDone={() => {
          localStorage.setItem("arlo_mood_date", new Date().toDateString());
          setShowMoodModal(false);
          router.push(pendingRoute ?? "/journal");
        }}
      />
    )}
    <div className="antialiased min-h-screen flex flex-col items-center justify-center relative bg-[#181E2E] overflow-x-hidden">
      <AmbientBackground />

      <main className="relative z-10 w-full max-w-7xl px-6 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <motion.header variants={fadeInSlow} initial="hidden" animate="visible" className="text-center mb-10 flex flex-col items-center">
          <ArloLogo />
          <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mt-6 text-[#F5F0E8]">ARLO</h1>
        </motion.header>

        {/* Card */}
        <motion.section variants={slideUp} initial="hidden" animate="visible" className="w-full max-w-[480px]">
          <div className="bg-[#252D40]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-12 card-glow relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(232,168,85,0.3)] to-transparent" />

            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl text-[#F5F0E8] mb-3">Welcome back.</h2>
              <p className="font-sans text-[#9BA3B2] text-sm font-light leading-relaxed">
                Let&apos;s continue your reflection. Choose how you&apos;d like to enter your space today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isRegister && (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-4 rounded-xl font-sans text-sm text-[#F5F0E8] input-ghost placeholder:text-[#9BA3B2]/50"
                />
              )}

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-regular fa-envelope text-[#9BA3B2]/70 text-sm" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="School email address"
                  required
                  className="w-full pl-11 pr-4 py-4 rounded-xl font-sans text-sm text-[#F5F0E8] input-ghost placeholder:text-[#9BA3B2]/50"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-[#9BA3B2]/70 text-sm" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-11 pr-4 py-4 rounded-xl font-sans text-sm text-[#F5F0E8] input-ghost placeholder:text-[#9BA3B2]/50"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm font-sans text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[rgba(232,168,85,0.15)] border border-[rgba(232,168,85,0.3)] rounded-xl text-[#E8A855] font-sans text-sm font-medium hover:bg-[rgba(232,168,85,0.25)] transition-all disabled:opacity-50"
              >
                {loading ? "Signing in..." : isRegister ? "Create Account" : "Sign In"}
              </button>
            </form>

            <div className="flex items-center gap-4 my-6 opacity-50">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs font-sans text-[#9BA3B2] uppercase tracking-widest">or</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full py-4 rounded-xl flex items-center justify-center gap-3 btn-ghost group">
                <i className="fa-brands fa-google text-[#9BA3B2] group-hover:text-white transition-colors" />
                <span className="font-sans text-sm font-medium text-[#F5F0E8]/90 group-hover:text-white transition-colors">Continue with Google</span>
              </button>
              <button className="w-full py-4 rounded-xl flex items-center justify-center gap-3 btn-ghost group">
                <i className="fa-brands fa-microsoft text-[#9BA3B2] group-hover:text-white transition-colors" />
                <span className="font-sans text-sm font-medium text-[#F5F0E8]/90 group-hover:text-white transition-colors">Continue with Microsoft</span>
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 text-center">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs font-sans text-[#9BA3B2]/70 hover:text-[#E8A855] transition-colors"
              >
                {isRegister ? "Already have an account? Sign in" : "New here? Create an account"}
              </button>
              <button
                onClick={() => setShowAccessCode(!showAccessCode)}
                className="text-xs font-sans text-[#9BA3B2]/70 hover:text-[#E8A855] transition-colors underline decoration-transparent hover:decoration-[rgba(232,168,85,0.5)] underline-offset-4"
              >
                Have a class access code?
              </button>
            </div>
          </div>
        </motion.section>

        {/* Privacy footer */}
        <motion.section variants={fadeInSlow} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="mt-12 text-center max-w-md">
          <div className="flex items-center justify-center gap-2 mb-3 opacity-60">
            <i className="fa-solid fa-lock text-[10px] text-[#9BA3B2]" />
            <span className="text-xs font-sans text-[#9BA3B2] tracking-wide uppercase">Your Space, Your Words</span>
          </div>
          <p className="font-serif text-sm text-[#9BA3B2]/80 italic leading-relaxed">
            Your reflections belong entirely to you. ARLO is designed to listen and guide, never to evaluate or score.
          </p>
        </motion.section>
      </main>

      {/* Role toggle */}
      <motion.footer initial={{ opacity: 0.6 }} whileHover={{ opacity: 1 }} className="absolute bottom-8 w-full flex justify-center items-center gap-3">
        <span className={`text-sm font-sans ${!isEducator ? "text-[#F5F0E8]" : "text-[#9BA3B2]"}`}>Student</span>
        <Toggle id="signin-role-toggle" checked={isEducator} onChange={setIsEducator} />
        <span className={`text-sm font-sans ${isEducator ? "text-[#E8A855]" : "text-[#9BA3B2]"}`}>Educator</span>
      </motion.footer>
    </div>
    </>
  );
}
