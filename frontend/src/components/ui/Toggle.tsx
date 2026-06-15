"use client";

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ id, checked, onChange, label }: ToggleProps) {
  return (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer flex-shrink-0">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`w-11 h-6 rounded-full border transition-all duration-300 relative
          ${checked ? "border-[#E8A855]" : "border-white/20"}
        `}
        style={{ backgroundColor: checked ? "#E8A855" : "rgba(255,255,255,0.05)" }}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-[#252D40] border-2 transition-all duration-300 ${
            checked ? "left-[22px] border-[#E8A855]" : "left-0.5 border-white/20"
          }`}
          style={{ backgroundColor: checked ? "#F5F0E8" : "#252D40" }}
        />
      </div>
      {label && <span className="ml-3 text-sm font-sans text-[#9BA3B2]">{label}</span>}
    </label>
  );
}
