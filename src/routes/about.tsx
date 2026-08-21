import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Target, Eye, HeartHandshake, GraduationCap, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AboutHeroAnimation } from "@/components/AboutHeroAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Rotary H P S English, Hubballi" },
      {
        name: "description",
        content:
          "Learn about Rotary H P S English, Hubballi — the school's history under The N.L.E. Society, its aims, vision, mission and core values.",
      },
      { property: "og:title", content: "About Rotary H P S English, Hubballi" },
      {
        property: "og:description",
        content: "Our history, aims, vision, mission and values as an English medium school in Hubballi.",
      },
    ],
  }),
  component: About,
});

const aims = [
  "To provide quality English medium education that is affordable and accessible to every family in Hubballi.",
  "To build strong foundations in language, mathematics, science and social studies through activity-based teaching.",
  "To develop discipline, punctuality and respect for elders, teachers and fellow students.",
  "To encourage sports, art and cultural participation so that talent outside the textbook is recognised.",
  "To nurture social responsibility, cleanliness and care for the environment.",
  "To work in close partnership with parents in every stage of a child's growth.",
];

const values = [
  { icon: GraduationCap, title: "Knowledge", text: "Learning with understanding, never by rote alone." },
  { icon: HeartHandshake, title: "Compassion", text: "Kindness towards classmates, family and community." },
  { icon: Target, title: "Discipline", text: "Consistency, punctuality and honest effort every day." },
  { icon: Eye, title: "Curiosity", text: "The freedom to ask questions and explore answers." },
];

const trustees = [
  { name: "Padmashri Dr M. M. Joshi", role: "President", badge: "Padmashri Awardee", image: "/Trusties/Datti.webp" },
  { name: "Shri. Basavaraj Bommai", role: "Vice President", image: "/Trusties/Bommai.webp" },
  { name: "Shri. Suhas Javali", role: "Vice President", image: "/Trusties/Suhas.webp" },
  { name: "Dr. P. V Datti", role: "Chairman", image: "/Trusties/Joshi.webp" },
  { name: "Shri. R N Desai", role: "Hon Secretary", image: "/Trusties/Raja.webp" },
  { name: "Smt. Vaishali Gore", role: "Treasurer", image: "/Trusties/Vaishali.webp" },
  { name: "Shri. Basavaraj M Mudkavi", role: "Member", image: "/Trusties/bassuu.webp" },
  { name: "Dr. B R Patil", role: "Member", image: "/Trusties/brp.webp" },
  { name: "Shri. Sadanand S Kamat", role: "Member", image: "/Trusties/kamat.webp" },
  { name: "Dr. Ajit Joshi", role: "Member", image: "/Trusties/ajjuu.webp" },
  { name: "Shri. Shivram V Hegde", role: "Member", image: "/Trusties/hegde.webp" },
  { name: "Shri. Dhruva Desai", role: "Member", image: "/Trusties/dhruva.webp" },
];

const principalMessages = [
  {
    name: "Vishal Binnal",
    role: "Principal, High School Section",
    image: "/principals/binnal.webp",
    message: "Our high school years give students the knowledge, values and self-belief to take their next steps with purpose. We support every student in becoming a responsible, resilient and confident young citizen.",
  },
  {
    name: "Sandra Fonseca",
    role: "Principal, Higher Primary Section",
    image: "/principals/fonseca.webp",
    message: "Education is most meaningful when it prepares children not only for examinations, but for life. Together with our families and teachers, we help students build discipline, empathy and the courage to pursue their aspirations.",
  },
  {
    name: "Naina Kulkarni",
    role: "Principal, Primary Section",
    image: "/principals/kulkarni.webp",
    message: "At Rotary H P S English, every day is an opportunity for children to discover their strengths. We create a caring space where curiosity is celebrated, character is nurtured and each child is encouraged to grow with confidence.",
  },
];

function About() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
    const handleSelect = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap());
    };
    carouselApi.on('select', handleSelect as any);
    return () => {
      carouselApi.off('select', handleSelect as any);
    };
  }, [carouselApi]);

  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />

       <section className="maroon-band relative overflow-hidden">
        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 py-8 md:py-12 px-6 md:px-12">
          {/* Text - Left Side */}
          <div className="w-full md:w-[50%] text-center md:text-left relative z-10">
            <h1 className="font-display text-xl font-bold text-primary-foreground md:text-2xl lg:text-3xl">
              Empowering Minds,<br />
              <span className="text-primary-foreground/90">Transforming Lives</span>
            </h1>
            <div className="gold-rule mt-3 md:mt-4" />
            <p className="mt-3 md:mt-4 text-xs opacity-90 md:text-sm max-w-xl">
              At Rotary H P S English, Hubballi, we believe every child deserves quality education that builds character, confidence, and a bright future. Join us in shaping tomorrow's leaders today.
            </p>
          </div>

          {/* Animated Learning Ecosystem - Right Corner */}
          <div className="w-full md:w-[48%] h-[270px] md:h-[290px] relative z-10 flex items-center justify-center">
            <AboutHeroAnimation />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[85vw] px-4 py-16 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Our Story</h2>
            <p className="mt-5 text-muted-foreground">
              Rotary H P S English is run by The Nitish Lahary Education Society (N.C.M., Hubli), an
              institution founded on the belief that good education should reach every home,
              regardless of means. What began as a modest effort to bring English medium schooling
              to Deshpande Nagar has grown into a school families across Hubballi trust.
            </p>
            <p className="mt-4 text-muted-foreground">
              The school follows the state syllabus in English medium for all classes,
              supported by dedicated teachers, structured assessments and a calendar rich with
              sport, culture and community activity.
            </p>
            <p className="mt-4 text-muted-foreground">
              Under the guidance of Chairman Dr. P. V. Datti, the Society continues to invest in
              classrooms, teaching resources and teacher training so that each new batch learns in
              better conditions than the last.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-[var(--shadow-elegant)] border-2 border-[#D4A543]">
            <img
              src="/s5.webp"
              alt="Our Story at Rotary H P S English, Hubballi"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* MESSAGE FROM PRINCIPALS SECTION */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto w-[90%] px-4 text-center">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">
              Leadership voices
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary">
              Message from Principals
            </h2>
            <div className="gold-rule mx-auto mt-4" />
          </div>

          <Carousel opts={{ loop: true }} setApi={setCarouselApi} className="mx-auto mt-10 w-full px-12 relative">
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 border-2 border-primary/20 hover:bg-primary/10 bg-background z-20" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 border-2 border-primary/20 hover:bg-primary/10 bg-background z-20" />
            <CarouselContent>
              {principalMessages.map((principal) => (
                <CarouselItem key={principal.name}>
                  <article className="grid items-center gap-8 rounded-xl border border-primary/15 bg-background p-6 shadow-[var(--shadow-elegant)] md:grid-cols-[230px_1fr] md:p-10">
                    <img
                      src={principal.image}
                      alt={`${principal.name}, ${principal.role}`}
                      width={460}
                      height={520}
                      loading="lazy"
                      className="mx-auto aspect-[4/5] w-full max-w-[230px] rounded-lg object-cover"
                    />
                    <div className="text-center md:text-left">
                      <Quote className="mx-auto size-9 text-primary md:mx-0" aria-hidden="true" />
                      <blockquote className="mt-4 font-display text-lg leading-relaxed text-foreground md:text-xl">
                        "{principal.message}"
                      </blockquote>
                      <div className="mt-6">
                        <p className="font-display text-xl font-bold text-primary">{principal.name}</p>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {principal.role}
                        </p>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {principalMessages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => carouselApi?.scrollTo(i)}
                  className={"h-2 w-8 rounded-full transition-all " + (selectedIndex === i ? "bg-primary" : "bg-primary/30")}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto grid max-w-[80vw] gap-6 px-4 md:grid-cols-2">
          <article className="card-elegant p-8">
            <span className="inline-flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
              <Eye className="size-5" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-primary">Our Vision</h2>
            <p className="mt-3 text-muted-foreground">
              To be a school where every child of Hubballi — whatever their background — leaves with
              the language, the confidence and the character to shape their own future.
            </p>
          </article>
          <article className="card-elegant p-8">
            <span className="inline-flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
              <Target className="size-5" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-primary">Our Mission</h2>
            <p className="mt-3 text-muted-foreground">
              To deliver disciplined, affordable, English medium primary education through committed
              teachers, individual attention, and a balanced calendar of academics, sport and
              cultural life.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[80vw] px-4 py-16 md:py-20">
        <h2 className="font-display text-3xl font-bold text-primary text-center">Our Aims</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-2">
          {aims.map((aim, i) => (
            <li key={aim} className="card-elegant flex gap-4 p-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <p className="text-sm text-muted-foreground">{aim}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-[80vw] px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary text-center">Core Values</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <article key={v.title} className="card-elegant p-6 text-center">
                <span className="mx-auto inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-[80vw] px-4 text-center">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-primary">
              Meet Our{" "}
              <span className="text-primary">Management Members</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The visionaries guiding Nitish Lahary Education Society with wisdom, dedication, and a deep commitment to shaping young minds.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {trustees.map((trustee) => (
              <article
                key={trustee.name}
                className="card-elegant flex flex-col overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={trustee.image}
                    alt={trustee.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 bg-primary p-4 text-center">
                  <h3 className="font-display text-base font-bold text-primary-foreground">
                    {trustee.name.startsWith('Padmashri') ? (
                      <>
                        <span className="block text-xs">Padmashri</span>
                        {trustee.name.replace('Padmashri ', '')}
                      </>
                    ) : (
                      trustee.name
                    )}
                  </h3>
                  {trustee.badge && (
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-primary-foreground/60">
                      {trustee.badge}
                    </p>
                  )}
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-primary-foreground/80">
                    {trustee.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
