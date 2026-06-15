"use client";

interface FilterPillProps {
  label: string;
  icon?: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterPill({ label, icon, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm transition-all ${
        active
          ? "bg-[rgba(232,168,85,0.15)] border border-[rgba(232,168,85,0.3)] text-[#E8A855]"
          : "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#9BA3B2] hover:text-[#F5F0E8] hover:bg-[rgba(255,255,255,0.1)]"
      }`}
    >
      {icon && <i className={`${icon} text-xs opacity-70`} />}
      {label}
    </button>
  );
}
