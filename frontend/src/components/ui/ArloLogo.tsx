"use client";

import { CrescentMark } from "./CrescentMark";

const sizeMap = {
  sm: { container: "w-10 h-10", markSize: 18 },
  md: { container: "w-12 h-12", markSize: 22 },
  lg: { container: "w-20 h-20", markSize: 36 },
};

export function ArloLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { container, markSize } = sizeMap[size];

  return (
    <div
      className={`${container} rounded-full bg-[#252D40] border border-white/5 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-[#E8A855]`}
    >
      <CrescentMark size={markSize} />
    </div>
  );
}
