"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const studentItems = [
  { href: "/journal", icon: "fa-solid fa-pen-nib", label: "Journal" },
  { href: "/map", icon: "fa-solid fa-map", label: "Map" },
  { href: "/profile", icon: "fa-regular fa-user", label: "Profile" },
  { href: "/vault", icon: "fa-solid fa-box-archive", label: "Vault" },
];

const educatorItems = [
  { href: "/educator", icon: "fa-solid fa-users", label: "Students" },
  { href: "/educator/alerts", icon: "fa-solid fa-bell", label: "Alerts" },
  { href: "/educator/resources", icon: "fa-solid fa-book-open", label: "Resources" },
  { href: "/settings", icon: "fa-solid fa-gear", label: "Settings" },
];

export function MobileNav({ isEducator = false }: { isEducator?: boolean }) {
  const pathname = usePathname();
  const items = isEducator ? educatorItems : studentItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A]/90 backdrop-blur-xl border-t border-white/5 z-50 px-6 py-4 flex justify-between items-center">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-[#E8A855]" : "text-[#9BA3B2] hover:text-[#F5F0E8]"
            }`}
          >
            <i className={`${item.icon} text-lg`} />
            <span className="text-[10px] font-sans">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
