"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArloLogo } from "@/components/ui/ArloLogo";

const studentNav = [
  { href: "/journal", icon: "fa-solid fa-pen-nib", label: "Student Journal" },
  { href: "/map", icon: "fa-solid fa-map", label: "Module Map" },
  { href: "/profile", icon: "fa-regular fa-user", label: "Learner Profile" },
  { href: "/badges", icon: "fa-solid fa-trophy", label: "Badges" },
  { href: "/vault", icon: "fa-solid fa-box-archive", label: "Epiphany Vault" },
];

const educatorNav = [
  { href: "/educator", icon: "fa-solid fa-users", label: "Educator Dashboard" },
  { href: "/educator/alerts", icon: "fa-solid fa-bell", label: "Alerts" },
  { href: "/educator/resources", icon: "fa-solid fa-book-open", label: "Resources" },
];

export function Sidebar({ isEducator = false }: { isEducator?: boolean }) {
  const pathname = usePathname();
  const navItems = isEducator ? educatorNav : studentNav;

  return (
    <aside className="hidden md:flex flex-col w-72 h-full bg-[#0F172A]/80 backdrop-blur-xl border-r border-white/5 relative z-30 pt-8 pb-6 px-6">
      {/* Brand header */}
      <div className="flex items-center gap-4 mb-12 px-2">
        <ArloLogo size="sm" />
        <div className="flex flex-col">
          <span className="font-serif text-xl text-[#F5F0E8] tracking-wide leading-tight">ARLO</span>
          <span className="font-sans text-[9px] text-[#9BA3B2]/60 tracking-[0.2em] uppercase">by Skystone</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-sans text-sm ${
                isActive
                  ? "bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] text-[#E8A855] font-medium shadow-[0_0_15px_rgba(232,168,85,0.05)]"
                  : "text-[#9BA3B2] hover:text-[#F5F0E8] hover:bg-white/5"
              }`}
            >
              <i className={`${item.icon} w-5 text-center`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <Link
          href="/settings"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-sans text-sm ${
            pathname === "/settings"
              ? "bg-[rgba(232,168,85,0.1)] border border-[rgba(232,168,85,0.2)] text-[#E8A855]"
              : "text-[#9BA3B2] hover:text-[#F5F0E8] hover:bg-white/5"
          }`}
        >
          <i className="fa-solid fa-gear w-5 text-center" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
