"use client";

interface CrescentMarkProps {
  className?: string;
  size?: number;
}

/**
 * The Skystone crescent arc — calligraphic partial circle,
 * thick at top tapering to a fine point at bottom-right.
 * Renders in currentColor so parent controls the tint.
 */
export function CrescentMark({ className = "", size = 32 }: CrescentMarkProps) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 72 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 60 4
           C 52 1, 40 1, 30 6
           C 10 16, 2 35, 2 51
           C 2 67, 10 85, 30 95
           C 40 100, 52 101, 60 98
           L 57 92
           C 44 97, 26 92, 16 78
           C 8 67, 8 55, 10 43
           C 14 24, 30 12, 52 12
           L 57 12
           Z"
        fill="currentColor"
      />
    </svg>
  );
}
