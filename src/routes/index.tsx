import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  BookOpen,
  Users,
  Trophy,
  FlaskConical,
  Palette,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { IntroSequence } from "@/components/IntroSequence";
import { Navbar } from "@/components/Navbar";
import { HeroWheel } from "@/components/HeroWheel";
import { KeyInfoBar } from "@/components/KeyInfoBar";
import ScrollStorySection from "@/components/scroll-story/ScrollStorySection";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rotary H P S English, Hubballi | English Medium School" },
      {
        name: "description",
        content:
          "Rotary H P S English, Deshpande Nagar, Hubballi — an HPS English school of The N.L.E. Society offering strong academics, sports and values-based education.",
      },
      { property: "og:title", content: "Rotary H P S English, Hubballi" },
      {
        property: "og:description",
        content:
          "English medium higher primary school in Deshpande Nagar, Hubballi, run by The Nitish Lahary Education Society.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const highlights = [
  { icon: BookOpen, title: "Academics", text: "Building strong foundations through purposeful learning, curiosity, and a culture of academic excellence." },
  { icon: FlaskConical, title: "Science & Computers", text: "Turning curiosity into discovery with hands-on science and future-ready digital learning." },
  { icon: Trophy, title: "Sports", text: "Inspiring teamwork, discipline, and confidence through spirited play and healthy competition" },
  { icon: Palette, title: "Art & Culture", text: "Nurturing creativity and expression through music, dance, art, and vibrant cultural experiences." },
  { icon: Users, title: "Focused Learning", text: "Personalised attention where every learner is seen, supported, and empowered to thrive." },
  { icon: ShieldCheck, title: "Safe Campus", text: "A secure, caring environment where every child can learn, explore, and grow with confidence." },
];

const riseValues = [
  { letter: "R", word: "Responsibility" },
  { letter: "I", word: "Innovation" },
  { letter: "S", word: "Self-confidence" },
  { letter: "E", word: "Empathy" },
];

let hasPlayedIntroInSession = false;

// Custom Intersection Observer Hook for Pop Up Animation from Bottom
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function Home() {
  const [introDone, setIntroDone] = useState(hasPlayedIntroInSession);
  const [progress, setProgress] = useState(0);

  const riseScrollRef = useRef<HTMLElement>(null);
  const [riseProgress, setRiseProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Pop up scroll reveals for remaining sections
  const welcomeSection = useScrollReveal(0.15);
  const offerSection = useScrollReveal(0.12);
  const beyondSection = useScrollReveal(0.15);
  const gallerySection = useScrollReveal(0.15);
  const ctaSection = useScrollReveal(0.15);

  useEffect(() => {
    if (!hasPlayedIntroInSession) {
      setIntroDone(false);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const finishIntro = useCallback(() => {
    hasPlayedIntroInSession = true;
    document.body.style.overflow = "";
    setIntroDone(true);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId: number | null = null;

    const updateProgress = () => {
      frameId = null;
      if (motionQuery.matches) {
        setRiseProgress(1);
        return;
      }
      const section = riseScrollRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollProgress = (window.scrollY + windowHeight * 0.5 - sectionTop) / (windowHeight * 0.8);
      setRiseProgress(Math.max(0, Math.min(1, scrollProgress)));
    };

    const requestProgressUpdate = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateProgress);
    };

    const handleMotionChange = () => {
      setReducedMotion(motionQuery.matches);
      requestProgressUpdate();
    };

    handleMotionChange();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);
    motionQuery.addEventListener("change", handleMotionChange);
    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      motionQuery.removeEventListener("change", handleMotionChange);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {!introDone && <IntroSequence onDone={finishIntro} />}

      <div
        className="transition-opacity duration-500"
        style={{ opacity: introDone ? 1 : 0 }}
      >
        {/* Top Scroll Sections */}
        <Navbar progress={progress} />
        <HeroWheel onProgress={setProgress} />
        <KeyInfoBar />
        <ScrollStorySection />

        {/* RISE Framework */}
        <section ref={riseScrollRef} className="rise-framework relative" aria-labelledby="rise-heading">
          <div className="rise-framework__sticky">
            <div className="mx-auto flex h-full max-w-[90vw] flex-col justify-center px-4 py-12 text-center md:py-16">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our educational framework</p>

              <div className="rise-framework__letters" aria-hidden="true">
                {riseValues.map((value, index) => {
                  const activation = reducedMotion ? 1 : Math.max(0, Math.min(1, (riseProgress - index * 0.19) / 0.23));
                  const isActive = reducedMotion || activation > 0.3;
                  const letterColor = isActive ? '#4D0015' : 'var(--muted-foreground)';
                  return <span key={value.letter} className="rise-framework__letter" style={{ "--rise-activation": activation, color: letterColor } as CSSProperties}>{value.letter}</span>;
                })}
              </div>
              <div className="rise-framework__concepts" aria-label="RISE values">
                {riseValues.map((value, index) => {
                  const activation = reducedMotion ? 1 : Math.max(0, Math.min(1, (riseProgress - index * 0.19) / 0.23));
                  return <p key={value.word} className="rise-framework__concept" style={{ "--rise-activation": activation } as CSSProperties}><span>{value.letter}</span> {value.word}</p>;
                })}
              </div>
              <p className="rise-framework__message mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mt-10 md:text-base">
                We nurture confident, compassionate and capable learners through our RISE framework — encouraging responsibility, curiosity, self-belief and empathy as they grow into thoughtful individuals ready for tomorrow.
              </p>
            </div>
          </div>
        </section>

        {/* 1. WELCOME SECTION (Pop Up from Bottom on Scroll) */}
        <section className="mx-auto max-w-[90vw] px-2 sm:px-4 py-10 md:py-16">
          <div
            ref={welcomeSection.ref}
            style={{
              transform: welcomeSection.isVisible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.96)",
              opacity: welcomeSection.isVisible ? 1 : 0,
              transition: "transform 650ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease",
            }}
            className="rounded-2xl border-2 border-[#D4A543]/40 bg-card/60 backdrop-blur-md p-5 sm:p-8 md:p-12 shadow-[var(--shadow-elegant)]"
          >
            {/* Mobile Header Layout (< md): Avatar photo beside Title & Chairman Badge */}
            <div className="flex items-center gap-4 md:hidden pb-4 border-b border-border/60">
              <div className="h-24 w-24 shrink-0 rounded-xl overflow-hidden border-2 border-[#D4A543] shadow-md">
                <img
                  src="/dattils.webp"
                  alt="Dr. P. V. Datti"
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="font-display text-base font-extrabold text-primary">Dr. P. V. Datti</h3>
                <p className="text-xs font-bold text-muted-foreground">Chairman, The N.L.E. Society</p>
              </div>
            </div>

            {/* Main Grid Content (Desktop & Mobile Body) */}
            <div className="grid items-center gap-6 md:grid-cols-12 md:gap-8 lg:gap-10 mt-4 md:mt-0">
              {/* Desktop Photo (md:block) */}
              <div className="hidden md:block md:col-span-5 lg:col-span-4 rounded-xl overflow-hidden shadow-[var(--shadow-elegant)] border-2 border-[#D4A543]">
                <img
                  src="/dattils.webp"
                  alt="Dr. P. V. Datti - Chairman"
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[280px] md:h-[300px] lg:h-[320px] object-cover object-top"
                />
              </div>

              {/* Main Text Content */}
              <div className="md:col-span-7 lg:col-span-8">
                <p className="hidden md:block text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-accent">Welcome</p>
                <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
                  A school where every child is known by name
                </h2>
                <div className="gold-rule mt-3 sm:mt-4" />
                <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-foreground font-medium leading-relaxed">
                  Established under The Nitish Lahary Education Society, Rotary H P S English serves
                  families across Deshpande Nagar and greater Hubballi. Our teachers inspire young minds through strong academics, thoughtful guidance and a nurturing approach to learning.
                </p>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-foreground/90 font-medium leading-relaxed">
                  From the first alphabet to the final year of high school, we prepare students not
                  just for examinations, but for a lifetime of thinking clearly and living kindly.
                </p>

                {/* Desktop Signature Footer */}
                <div className="hidden md:block mt-6 pt-4 border-t border-border">
                  <p className="font-display text-lg sm:text-xl font-extrabold text-primary">Dr. P. V. Datti</p>
                  <p className="text-xs sm:text-sm font-bold text-muted-foreground">Chairman, The N.L.E. Society</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT WE OFFER SECTION (Cards Pop Up from Bottom in Staggered Cascade) */}
        <section className="bg-background py-12 text-[#4b0d22] md:py-16">
          <div ref={offerSection.ref} className="mx-auto max-w-[90vw] px-4">
            <div
              style={{
                transform: offerSection.isVisible ? "translateY(0)" : "translateY(32px)",
                opacity: offerSection.isVisible ? 1 : 0,
                transition: "transform 500ms ease, opacity 400ms ease",
              }}
              className="max-w-2xl"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7a2a3a]">What we offer</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-[#4b0d22] sm:text-3xl md:text-4xl">
                A complete school experience
              </h2>
              <div className="gold-rule mt-4" />
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, idx) => {
                const delayMs = idx * 90;
                return (
                  <article
                    key={h.title}
                    style={{
                      transform: offerSection.isVisible ? "translateY(0) scale(1)" : "translateY(52px) scale(0.94)",
                      opacity: offerSection.isVisible ? 1 : 0,
                      transition: `transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delayMs}ms, opacity 400ms ease ${delayMs}ms`,
                    }}
                    className="rounded-lg border border-[#4b0d22]/20 bg-card p-5 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-[#c58f4c]">
                      <h.icon className="size-5" />
                    </span>
                    <h3 className="mt-3 text-base font-extrabold text-[#4b0d22]">{h.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#4b0d22] font-medium sm:text-sm">{h.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. BEYOND THE CLASSROOM SECTION (Pop Up from Bottom on Scroll) */}
        <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16">
          <div
            ref={beyondSection.ref}
            style={{
              transform: beyondSection.isVisible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.96)",
              opacity: beyondSection.isVisible ? 1 : 0,
              transition: "transform 650ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease",
            }}
            className="grid items-center gap-8 md:grid-cols-2 lg:gap-12"
          >
            <div className="order-2 md:order-1">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Beyond the classroom</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-primary sm:text-3xl md:text-4xl">
                Play, perform, participate
              </h2>
              <div className="gold-rule mt-4" />
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-foreground font-semibold">
                {[
                  "Annual sports meet and inter-house competitions",
                  "National and Religious celebrations",
                  "Elocution, quiz, drawing and handwriting contests",
                  "Educational excursions and field visits around Dharwad district",
                  "Yoga, moral science and cleanliness drives",
                ].map((item, idx) => (
                  <li
                    key={item}
                    style={{
                      transform: beyondSection.isVisible ? "translateY(0)" : "translateY(20px)",
                      opacity: beyondSection.isVisible ? 1 : 0,
                      transition: `transform 500ms ease ${100 + idx * 70}ms, opacity 400ms ease ${100 + idx * 70}ms`,
                    }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-accent font-extrabold">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-[var(--shadow-elegant)] border-2 border-[#D4A543]">
              <img
                src="/p3.webp"
                alt="Students engaged in activities"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* 4. GALLERY PREVIEW SECTION (Cards Pop Up from Bottom in Staggered Cascade) */}
        <section className="bg-muted py-12 md:py-16">
          <div ref={gallerySection.ref} className="mx-auto max-w-[90vw] px-4">
            <div
              style={{
                transform: gallerySection.isVisible ? "translateY(0)" : "translateY(32px)",
                opacity: gallerySection.isVisible ? 1 : 0,
                transition: "transform 500ms ease, opacity 400ms ease",
              }}
              className="flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Gallery</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold text-primary sm:text-3xl md:text-4xl">
                  Moments from the year
                </h2>
                <div className="gold-rule mt-4" />
              </div>
              <Link to="/gallery" className="btn-primary text-xs sm:text-sm">
                View full gallery <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["/gallery/seach.webp", "First Day Vibes"],
                ["/gallery/crownmaking.webp", "Crown Making"],
                ["/gallery/envday.webp", "Environment Day"],
              ].map(([src, title], idx) => {
                const delayMs = idx * 110;
                return (
                  <Link
                    key={title}
                    to="/gallery"
                    style={{
                      transform: gallerySection.isVisible ? "translateY(0) scale(1)" : "translateY(56px) scale(0.94)",
                      opacity: gallerySection.isVisible ? 1 : 0,
                      transition: `transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delayMs}ms, opacity 400ms ease ${delayMs}ms`,
                    }}
                    className="card-elegant group overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`${title} at Rotary H P S English, Hubballi`}
                      width={1400}
                      height={788}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <p className="p-3.5 font-display text-sm sm:text-base font-extrabold text-primary">{title}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. MAROON BAND ADMISSIONS CTA (Pops Up from Bottom) */}
        <section className="maroon-band">
          <div
            ref={ctaSection.ref}
            style={{
              transform: ctaSection.isVisible ? "translateY(0)" : "translateY(40px)",
              opacity: ctaSection.isVisible ? 1 : 0,
              transition: "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease",
            }}
            className="mx-auto flex max-w-[90vw] flex-col items-start justify-between gap-5 px-4 py-10 md:flex-row md:items-center md:py-14"
          >
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl text-white">Admissions are closed for 2026-27</h2>
              <p className="mt-2 max-w-xl text-xs sm:text-sm text-white font-medium leading-relaxed">
                See the step-by-step admission process and the documents required to enrol your child.
              </p>
            </div>
            <Link to="/admissions" className="btn-outline text-xs sm:text-sm">
              View Admission Process <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
