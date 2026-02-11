import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Home", href: "#home" },
  { title: "Mission Logs", href: "#mission-logs" },
  { title: "Rewards", href: "#rewards" },
  { title: "Timeline", href: "#timeline" },
  { title: "Guidelines", href: "#guidelines" },
  { title: "Sponsors", href: "#sponsors" },
  { title: "FAQs", href: "#faqs" },
  { title: "About", href: "#about" },
];

const footerLinks = [
  { title: "Twitter", href: "#" },
  { title: "LinkedIn", href: "#" },
  { title: "Instagram", href: "#" },
  { title: "Website", href: "#" },
];

const menuVariants = {
  open: {
    width: "min(480px, 90vw)",
    height: "min(650px, 85vh)",
    top: "-12px",
    right: "-12px",
    borderRadius: "24px",
    transition: {
      duration: 0.75,
      type: "tween" as const,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  closed: {
    width: "40px",
    height: "40px",
    top: "0px",
    right: "0px",
    borderRadius: "9999px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween" as const,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

const perspectiveVariant = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      type: "tween" as const,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

const slideInVariant = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      type: "tween" as const,
      ease: "easeInOut" as const,
    },
  },
};

// smooth scroll to section
function scrollToSection(href: string) {
  if (href === "#home" || href === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const [isActive, setIsActive] = useState(false);

  const handleLinkClick = (href: string) => {
    setIsActive(false);
    setTimeout(() => scrollToSection(href), 400);
  };

  return (
    <div className={`absolute top-5 right-6 z-60 ${className}`}>
      {/* hamburger toggle button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md"
        style={{
          backgroundColor: isActive ? "transparent" : "rgba(255,255,255,0.9)",
        }}
        aria-label={isActive ? "Close menu" : "Open menu"}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{ rotate: isActive ? 90 : 0 }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
          }}
        >
          {isActive ? (
            <X className="w-5 h-5 text-neutral-800" />
          ) : (
            <Menu className="w-5 h-5 text-neutral-800" />
          )}
        </motion.div>
      </button>
    </div>
  );
}
