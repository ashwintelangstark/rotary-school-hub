import { useEffect, useRef, useState } from "react";

interface AboutHeroAnimationProps {
  onAnimationComplete?: () => void;
}

export function AboutHeroAnimation({ onAnimationComplete }: AboutHeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      onAnimationComplete?.();
    }, 150);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className="about-hero-animation relative w-full h-full min-h-[260px] md:min-h-[290px] flex items-center justify-center overflow-visible"
    >
      {/* Centered Student Cutout */}
      <img
        src="/fevicon/stud.webp"
        alt="Rotary HPS Student"
        className="about-hero-student absolute left-1/2 bottom-0 z-10 h-[220px] sm:h-[250px] md:h-[280px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
        style={{
          transform: isVisible ? "translate(-50%, 0) scale(1)" : "translate(-50%, 30px) scale(0.9)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 600ms ease 100ms, transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms",
        }}
      />
    </div>
  );
}
