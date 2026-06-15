"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialiased h-screen flex relative bg-[#181E2E] overflow-hidden">
      <AmbientBackground />
      <Sidebar />
      <main className="flex-1 flex flex-col relative z-20 h-full overflow-hidden">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
