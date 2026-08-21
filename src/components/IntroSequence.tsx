import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Asterisk } from "@/components/brand/Asterisk";
import { SunburstMark } from "@/components/brand/SunburstMark";
import { Wordmark } from "@/components/brand/Wordmark";
import { INTRO } from "@/config/site";

const MARK = 140; // base px size of the sunburst mark box

/** Ordered timeline: stage index -> ms offset from start. */
const TIMELINE: Array<[number, number]> = [
  [1, 100], // "Shaping compassionate"
  [2, 700], // wavy line draws
  [3, 1500], // "leaders of tomorrow"
  [4, 2000], // three children rise
  [5, 2750], // sunburst halo
  [6, 3400], // children exit, logo mark centers
  [7, 3900], // wordmark docks beside the mark
  [8, 4800], // logo lockup flies into the navbar
  [9, 5500], // hero resting state
];

interface Placement {
  x: number;
  y: number;
  s: number;
}

const place = (cx: number, cy: number, s: number): Placement => ({
  x: cx - (MARK * s) / 2,
  y: cy - (MARK * s) / 2,
  s,
});

export function IntroSequence({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const timers = useRef<number[]>([]);
  const [spots, setSpots] = useState<Record<"halo" | "center" | "lockup" | "nav", Placement>>({
    halo: place(0, 0, 1),
    center: place(0, 0, 1),
    lockup: place(0, 0, 1),
    nav: place(0, 0, 0.3),
  });

  const measure = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;
    const targetMark = document.querySelector<HTMLElement>("[data-nav-logo-mark]");
    const rect = targetMark?.getBoundingClientRect();
    const defaultNavScale = isMobile ? 40 / MARK : 0.4;
    const navScale = rect && rect.height > 0 ? rect.height / MARK : defaultNavScale;

    const haloScale = isMobile ? 0.95 : 1.15;
    const centerScale = isMobile ? 0.85 : 1.05;
    const lockupScale = isMobile ? 0.72 : 1.05;
    const lockupOffset = isMobile ? 112 : 200;

    setSpots({
      halo: place(vw / 2, vh * (isMobile ? 0.40 : 0.44), haloScale),
      center: place(vw / 2, vh / 2, centerScale),
      lockup: place(vw / 2 - lockupOffset, vh / 2, lockupScale),
      nav: rect && rect.height > 0
        ? { x: rect.left, y: rect.top, s: navScale }
        : place(isMobile ? 36 : 80, 12, navScale),
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const finish = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setStage(9);
    window.setTimeout(onDone, 900);
  }, [onDone]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      finish();
      return;
    }
    timers.current = TIMELINE.map(([next, at]) => window.setTimeout(() => setStage(next), at));
    timers.current.push(window.setTimeout(finish, 5700));
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Skippable: any scroll / click / key snaps straight to the resting state.
  useEffect(() => {
    if (stage >= 9) return;
    const skip = () => finish();
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [stage, finish]);

  const introActive = stage < 9;
  const showKids = stage >= 4 && stage < 6;
  const showMark = stage >= 5;
  const docked = stage >= 8;

  const target = docked
    ? spots.nav
    : stage >= 7
      ? spots.lockup
      : stage >= 6
        ? spots.center
        : spots.halo;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-background" aria-hidden="true">
      {/* ---- intro overlay ---- */}
      <AnimatePresence>
        {introActive && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* headline */}
            <div className="absolute inset-x-0 top-[16vh] text-center">
              <motion.h2
                className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
                initial={{ opacity: 0, y: 24 }}
                animate={stage >= 6 ? { opacity: 0, y: -12 } : stage >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {INTRO.line1}
              </motion.h2>
              <motion.h2
                className="mt-1 text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
                initial={{ opacity: 0, y: 24 }}
                animate={stage >= 6 ? { opacity: 0, y: -12 } : stage >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {INTRO.line2}
              </motion.h2>
            </div>

            {/* hand-drawn wavy line */}
            <svg
              className="absolute inset-x-0 top-[46vh] h-[220px] w-full"
              viewBox="0 0 1440 220"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M-20 150 C 180 150, 240 40, 430 46 C 640 52, 700 190, 900 186 C 1090 182, 1160 60, 1460 34"
                fill="none"
                stroke="var(--color-foreground)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                initial={{ strokeDashoffset: 1 }}
                animate={
                  stage >= 6
                    ? { strokeDashoffset: 0, opacity: 0 }
                    : stage >= 2
                      ? { strokeDashoffset: 0, opacity: 1 }
                      : {}
                }
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </svg>

            <motion.div
              className="absolute left-[16%] top-[40vh] h-9 w-9"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={stage >= 6 ? { opacity: 0, scale: 1 } : stage >= 2 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <Asterisk className="h-full w-full" />
            </motion.div>
            <motion.div
              className="absolute right-[22%] top-[44vh] h-7 w-7"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={stage >= 6 ? { opacity: 0, scale: 1 } : stage >= 2 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.95 }}
            >
              <Asterisk className="h-full w-full" />
            </motion.div>

            {/* student group cutout provided by user */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center">
              <AnimatePresence>
                {showKids && (
                  <motion.img
                    key="students-group"
                    src="/intro-students.webp"
                    alt="Rotary H P S English Students"
                    className="relative z-20 h-[62vh] max-h-[580px] w-auto origin-bottom object-contain object-bottom drop-shadow-[0_20px_30px_rgba(61,40,23,0.16)]"
                    initial={{ y: "120%", opacity: 1 }}
                    animate={{ y: "0%" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* fixed CTA pill */}
            <motion.div
              className="absolute bottom-6 right-6"
              initial={{ opacity: 0 }}
              animate={stage >= 1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="rounded-full bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground">
                {INTRO.ctaLabel}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- ONE shared logo lockup: halo -> centre -> navbar ---- */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0"
        style={{
          width: MARK,
          height: MARK,
          transformOrigin: "0 0",
          zIndex: stage >= 6 ? 50 : 10,
        }}
        initial={{ opacity: 0, scale: 0, x: spots.halo.x, y: spots.halo.y }}
        animate={
          showMark || stage >= 6
            ? { opacity: 1, x: target.x, y: target.y, scale: target.s }
            : { opacity: 0, scale: 0, x: spots.halo.x, y: spots.halo.y }
        }
        transition={
          stage === 5
            ? { type: "spring", stiffness: 260, damping: 14, mass: 0.8 }
            : { duration: docked ? 0.9 : 0.6, ease: [0.65, 0, 0.35, 1] }
        }
      >
        <SunburstMark className="h-full w-full object-contain" />
        <motion.div
          className="absolute left-full top-1/2 ml-4 sm:ml-5 md:ml-7 -translate-y-1/2"
          initial={{ opacity: 0, x: 60 }}
          animate={stage >= 7 ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Wordmark className="text-[36px] sm:text-[44px] md:text-[62.5px]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
