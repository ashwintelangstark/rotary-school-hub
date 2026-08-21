import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SLIDES } from "@/config/site";

/** Wheel geometry — tweak freely. */
const WHEEL = {
  minScale: 0.62,
  dim: 0.55,
  liftPx: 20, // neighbours sit slightly lower, like points on a wheel
  visibleRange: 2.1,
};

function transformFor(d: number, isMobile: boolean) {
  const spacing = isMobile ? 74 : 46;
  const a = Math.min(Math.abs(d), WHEEL.visibleRange);
  return {
    xVw: d * spacing,
    y: a * WHEEL.liftPx,
    scale: 1 - Math.min(a, 1) * (1 - WHEEL.minScale),
    opacity: a > WHEEL.visibleRange - 0.35 ? 0 : 1 - Math.min(a, 1) * WHEEL.dim,
    rotate: d * 3,
    zIndex: 100 - Math.round(a * 10),
  };
}

export function HeroWheel({ onProgress }: { onProgress?: (p: number) => void }) {
  const section = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!section.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".wheel-card");

      const render = (p: number) => {
        const pos = p * (SLIDES.length - 1);
        const vw = window.innerWidth / 100;
        const isMob = window.innerWidth < 768;
        cards.forEach((el, i) => {
          const d = i - pos;
          const tf = transformFor(d, isMob);
          gsap.set(el, {
            x: tf.xVw * vw,
            y: tf.y,
            scale: tf.scale,
            opacity: tf.opacity,
            rotate: tf.rotate,
            zIndex: tf.zIndex,
          });
        });

        const activeIndex = Math.min(
          SLIDES.length - 1,
          Math.max(0, Math.round(pos))
        );
        setActive(activeIndex);
      };

      render(0);

      const isMobileDevice = window.innerWidth < 768;
      const totalScrollHeight = isMobileDevice ? window.innerHeight * 3.6 : window.innerHeight * 2.2;

      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: `+=${totalScrollHeight}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.05,
        onUpdate: (self) => {
          render(self.progress);
          onProgress?.(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [onProgress]);

  return (
    <section ref={section} className="relative h-screen overflow-hidden">
      <div className="flex h-full flex-col items-center justify-start pt-[110px] md:pt-[118px]">
        <div className="relative h-36 sm:h-40 md:h-44 w-full max-w-3xl text-center px-6">
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-x-0 top-0 px-6 transition-all duration-500 ease-out"
              style={{
                opacity: i === active ? 1 : 0,
                transform: `translateY(${i === active ? 0 : 14}px)`,
              }}
            >
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.12]">
                {s.heading}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm font-normal text-foreground/80 sm:text-base md:text-lg">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-10 sm:mt-16 md:mt-24 flex h-[40vh] sm:h-[44vh] w-full items-center justify-center">
          {SLIDES.map((s) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.alt}
              className="wheel-card absolute h-full w-[72vw] sm:w-[55vw] md:w-[45vw] rounded-3xl object-cover shadow-2xl will-change-transform"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
