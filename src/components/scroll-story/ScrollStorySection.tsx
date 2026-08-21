import { useEffect, useRef } from "react";
import {
  achievements,
  legacy,
  scrollLength,
  stages,
} from "./data";
import { ArrowBadge, StatIcon, TrophyBadge } from "./icons";

export default function ScrollStorySection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const len = isMobile ? scrollLength.mobile : scrollLength.desktop;

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-s='scroll-story-master']",
            start: "top top",
            end: () => "+=" + window.innerHeight * len.master,
            scrub: 0.3,
            pin: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        /* ============ Phase 1: Achievements ("Foundations for a changing world") ============ */
        master
          .fromTo(
            "[data-el='ach-heading']",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.12 },
            0,
          )
          .fromTo(
            "[data-el='ach-card']",
            { yPercent: 100, opacity: 0, rotate: 0 },
            {
              yPercent: 0,
              opacity: 1,
              rotate: (i: number) => achievements.cards[i]?.rotate ?? 0,
              ease: "power2.out",
              duration: 0.18,
              stagger: 0.04,
            },
            0.04,
          )
          .fromTo(
            "[data-el='ach-cta']",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.1 },
            0.18,
          );

        /* ============ Phase 2: Transition directly into Red Legacy Section ============ */
        master
          .to(
            "[data-el='layer-achievements']",
            { y: -50, opacity: 0, ease: "power1.in", duration: 0.14 },
            0.26,
          )
          .fromTo(
            "[data-el='layer-legacy']",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, ease: "power1.out", duration: 0.16 },
            0.30,
          )
          .fromTo(
            "[data-el='legacy-heading']",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.12 },
            0.36,
          );

        /* ============ Phase 3: Legacy Section Sequential Line Progress ============ */
        legacy.stats.forEach((_, i) => {
          const at = 0.40 + i * 0.06;
          if (i === 0) {
            master
              .fromTo(
                `[data-el='stat-dot'][data-i='0']`,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, ease: "back.out(1.8)", duration: 0.04 },
                at
              )
              .fromTo(
                `[data-el='stat-icon'][data-i='0']`,
                { y: 30, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, ease: "back.out(1.4)", duration: 0.06 },
                at + 0.01
              )
              .fromTo(
                `[data-el='stat-label'][data-i='0']`,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, ease: "power1.out", duration: 0.04 },
                at + 0.02
              );
          } else {
            master
              .fromTo(
                `[data-el='stat-line'][data-i='${i}']`,
                { scaleX: 0 },
                { scaleX: 1, ease: "power1.inOut", duration: 0.04 },
                at - 0.02
              )
              .fromTo(
                `[data-el='stat-dot'][data-i='${i}']`,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, ease: "back.out(1.8)", duration: 0.04 },
                at + 0.01
              )
              .fromTo(
                `[data-el='stat-icon'][data-i='${i}']`,
                { y: 30, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, ease: "back.out(1.4)", duration: 0.06 },
                at + 0.02
              )
              .fromTo(
                `[data-el='stat-label'][data-i='${i}']`,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, ease: "power1.out", duration: 0.04 },
                at + 0.03
              );
          }
        });

        /* ============ Phase 4: Curved Wipe into School Stages ============ */
        master
          .to("[data-el='layer-legacy']", { y: -50, opacity: 0, ease: "power1.in", duration: 0.12 }, 0.68)
          .to("[data-el='layer-stages']", { opacity: 1, duration: 0.05 }, 0.70)
          .fromTo(
            "[data-el='curve']",
            { xPercent: 0 },
            { xPercent: -50, ease: "power1.inOut", duration: 0.2 },
            0.70,
          )
          .fromTo(
            "[data-el='stages-heading']",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.12 },
            0.74,
          );

        stages.cards.forEach((_, i) => {
          const at = 0.78 + i * 0.04;
          master
            .fromTo(
              `[data-el='stage-card'][data-i='${i}']`,
              { y: 80, opacity: 0, scale: 0.9 },
              { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.12 },
              at,
            )
            .fromTo(
              `[data-el='stage-desc'][data-i='${i}']`,
              { y: 15, opacity: 0 },
              { y: 0, opacity: 1, ease: "power1.out", duration: 0.08 },
              at + 0.06,
            );
        });

        ScrollTrigger.refresh();
      }, rootRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="bg-cream font-sans text-espresso">
      <section
        data-s="scroll-story-master"
        className="relative h-screen w-full overflow-hidden bg-cream"
      >
        {/* Layer 1: Achievements ("Foundations for a changing world") */}
        <div
          data-el="layer-achievements"
          className="absolute inset-0 flex flex-col justify-center"
        >
          <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-start pt-[88px] pb-4 sm:justify-center sm:pt-24 gap-4 sm:gap-6 px-4 md:gap-8 md:px-10">
            <h2
              data-el="ach-heading"
              className="text-center text-2xl font-extrabold tracking-tight text-[#6B1728] sm:text-3xl md:text-5xl"
            >
              {achievements.heading}
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {achievements.cards.map((card, i) => (
                <div key={i} data-el="ach-card" data-i={i} className="relative">
                  <div className="relative overflow-hidden rounded-[16px] shadow-lg">
                    <img
                      src={card.src}
                      alt={card.alt}
                      loading="lazy"
                      className="h-[22vh] w-full object-cover md:h-[38vh]"
                    />
                    {card.badge?.type === "number" && (
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-badge-blue px-3 py-1 text-sm font-bold text-onmaroon">
                        {card.badge.value}
                      </span>
                    )}
                  </div>
                  {card.badge?.type === "trophy" && (
                    <span className="absolute -right-2 -top-5">
                      <TrophyBadge />
                    </span>
                  )}
                  {card.title && (
                    <h3 className="mt-3 text-sm font-extrabold text-[#3D2817] md:text-base">
                      {card.title}
                    </h3>
                  )}
                  {card.caption && (
                    <p className="mt-1 text-xs leading-relaxed text-foreground/75 md:text-sm">
                      {card.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                data-el="ach-cta"
                type="button"
                className="rounded-full bg-yellow px-7 py-3 text-sm font-semibold text-espresso shadow-md transition-transform hover:scale-105"
              >
                {achievements.ctaLabel}
              </button>
            </div>
          </div>
        </div>



        {/* Layer 3: Legacy Stats ("A 15-year legacy of excellence") */}
        <div
          data-el="layer-legacy"
          className="pointer-events-none absolute inset-0 flex flex-col justify-center bg-[#A02B2E] text-white opacity-0"
        >
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-6 py-10">
            <h2
              data-el="legacy-heading"
              className="text-center text-4xl font-extrabold tracking-tight text-white leading-[1.15] md:text-5xl lg:text-6xl"
            >
              A 64-year legacy<br />of excellence
            </h2>

            <div className="relative mt-10 md:mt-14">
              <div className="grid grid-cols-4 gap-4 md:gap-6">
                {legacy.stats.map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <p
                      data-el="stat-label"
                      data-i={i}
                      className="mb-6 flex h-12 items-center justify-center text-center text-xs font-medium leading-snug text-white sm:text-sm md:text-base"
                    >
                      {s.label}
                    </p>

                    <div
                      data-el="stat-icon"
                      data-i={i}
                      className="flex h-32 md:h-36 w-full items-center justify-center"
                    >
                      <StatIcon name={s.icon} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Horizontal Progress Timeline Axis Line + 4 Aligned Dots */}
              <div className="relative mt-8 hidden h-8 items-center md:flex">
                {/* Track line background */}
                <div className="absolute inset-x-[12.5%] top-1/2 h-[2px] -translate-y-1/2 bg-white/25" />

                {/* 3 Active Progress Line Segments */}
                <div className="absolute inset-x-[12.5%] top-1/2 h-[3px] -translate-y-1/2 flex items-center">
                  <div className="h-full w-1/3 overflow-hidden">
                    <div
                      data-el="stat-line"
                      data-i={1}
                      className="h-full w-full origin-left bg-[#ED6E20] shadow-[0_0_10px_#ED6E20]"
                    />
                  </div>
                  <div className="h-full w-1/3 overflow-hidden">
                    <div
                      data-el="stat-line"
                      data-i={2}
                      className="h-full w-full origin-left bg-[#ED6E20] shadow-[0_0_10px_#ED6E20]"
                    />
                  </div>
                  <div className="h-full w-1/3 overflow-hidden">
                    <div
                      data-el="stat-line"
                      data-i={3}
                      className="h-full w-full origin-left bg-[#ED6E20] shadow-[0_0_10px_#ED6E20]"
                    />
                  </div>
                </div>

                {/* 4 Aligned Dots */}
                <div className="relative z-10 grid w-full grid-cols-4">
                  {legacy.stats.map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <span
                        data-el="stat-dot"
                        data-i={i}
                        className="block h-5 w-5 rounded-full bg-[#ED6E20] ring-4 ring-[#ED6E20]/40 shadow-[0_0_14px_rgba(237,110,32,0.8)]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 4: School Stages ("Nurturing every stage of learning") */}
        <div
          data-el="layer-stages"
          className="pointer-events-none absolute inset-0 flex flex-col justify-center opacity-0"
        >
          <div
            data-el="curve"
            className="absolute left-full top-1/2 h-[300vh] w-[300vw] -translate-y-1/2 rounded-[50%] bg-background"
          />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1800px] flex-col justify-between pt-[84px] pb-6 sm:pt-20 px-4 md:px-10 lg:px-14">
            <div data-el="stages-heading" className="text-center opacity-0">
              <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-[#9A644E] uppercase md:text-sm">
                {stages.eyebrow}
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#6B1728] sm:text-4xl md:text-5xl lg:text-[54px]">
                {stages.heading}
              </h2>
            </div>

            <div className="mt-4 grid flex-1 grid-cols-2 gap-5 sm:mt-6 sm:gap-6 md:mt-8 md:grid-cols-4 md:gap-7 lg:gap-8">
              {stages.cards.map((card, i) => (
                <div key={i} className="group flex flex-col justify-between">
                  <div>
                    <div data-el="stage-card" data-i={i} className="opacity-0">
                      {/* Card Image Container with Amber Border & Soft Shadow */}
                      <div className="relative overflow-hidden rounded-[20px] border border-[#E5B580]/40 bg-card p-1 shadow-[0_12px_28px_rgba(61,40,23,0.08)] transition-all duration-300 group-hover:shadow-2xl sm:p-1.5">
                        <img
                          src={card.src}
                          alt={card.alt}
                          loading="lazy"
                          className="aspect-[4/3] h-40 w-full rounded-[16px] object-cover sm:aspect-[3/4] sm:h-72 md:h-[340px] lg:h-[400px]"
                        />
                      </div>

                      {/* Title, Subtitle, and Orange Circular Arrow */}
                      <div className="mt-2.5 flex items-start justify-between gap-1 sm:mt-3.5 sm:gap-2">
                        <div>
                          <h3 className="text-sm font-extrabold text-[#3D2817] sm:text-base md:text-xl lg:text-2xl">
                            {card.title}
                          </h3>
                          <p className="mt-0.5 text-[10px] font-medium tracking-wide text-foreground/60 sm:text-xs md:text-sm">
                            {card.grades}
                          </p>
                        </div>
                        <ArrowBadge className="mt-0.5 shrink-0 bg-[#D47043] scale-90 sm:scale-100" />
                      </div>
                    </div>
                    <p
                      data-el="stage-desc"
                      data-i={i}
                      className="mt-1.5 text-xs leading-snug text-foreground/75 opacity-0 sm:mt-2 sm:text-xs md:text-sm lg:text-[15px]"
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}