import type { Variants } from "framer-motion";

export const fadeInSlow: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const slideUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } },
});

export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
  },
};

export const floatDelayed = (delay: number): Variants => ({
  animate: {
    y: [0, -10, 0],
    transition: { duration: 6, ease: "easeInOut", repeat: Infinity, delay },
  },
});

export const pulseSoft: Variants = {
  animate: {
    opacity: [1, 0.7, 1],
    transition: { duration: 4, ease: "easeInOut", repeat: Infinity },
  },
};

export const waveformBar = (delay: number): Variants => ({
  animate: {
    scaleY: [0.3, 1, 0.3],
    transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, delay },
  },
});

export const companionCardSelected: Variants = {
  unselected: { y: 0, scale: 1 },
  selected: { y: -4, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const consentOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
