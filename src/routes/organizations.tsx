import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  BookOpen,
  FlaskConical,
  Library,
  Palette,
  Trophy,
  Monitor,
  Music,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/organizations")({
  head: () => ({
    meta: [
      {
        title: "School Organizations | Rotary H P S English, Hubballi",
      },
      {
        name: "description",
        content:
          "Explore student clubs and organizations at Rotary H P S English — Literary Squad, Science Explorers, Library Guild, Art Den, Sports Warriors, Cyber Squad and Music Club.",
      },
      {
        property: "og:title",
        content: "School Organizations - Rotary H P S English, Hubballi",
      },
      {
        property: "og:description",
        content:
          "Student-led clubs developing co-scholastic skills in literature, science, arts, sports, technology and music.",
      },
    ],
  }),
  component: Organizations,
});

const organizations = [
  {
    name: "Shakespeare Squad",
    subtitle: "Literary Club",
    icon: BookOpen,
    color: "maroon-gradient",
    description:
      "Focuses on literary activities such as drama, poetry, and literature discussions to nurture creativity and appreciation for language and storytelling.",
    activities: [
      "Drama and role-playing exercises",
      "Poetry recitation and creative writing",
      "Book discussions and literary debates",
      "Storytelling and public speaking",
    ],
  },
  {
    name: "Kalam Explorers",
    subtitle: "Science Club",
    icon: FlaskConical,
    color: "primary-gold-gradient",
    description:
      "Dedicated to scientific exploration, experiments, and learning about natural phenomena, technology, and scientific principles.",
    activities: [
      "Hands-on science experiments",
      "Nature walks and environmental studies",
      "Science fair projects and exhibitions",
      "Guest lectures from science professionals",
    ],
  },
  {
    name: "Gutenberg Guild",
    subtitle: "Library Club",
    icon: Library,
    color: "gold-gradient",
    description:
      "Centers on library-related activities, such as reading, research, book discussions, and promoting literacy among students.",
    activities: [
      "Book reading sessions and reviews",
      "Library assistance and organization",
      "Research skill workshops",
      "Book exchange programs",
    ],
  },
  {
    name: "Da Vinci Den",
    subtitle: "Art & Craft Club",
    icon: Palette,
    color: "maroon-dark-gradient",
    description:
      "Emphasizes artistic expression through painting, drawing, sculpture, and craft projects to develop creativity and fine motor skills.",
    activities: [
      "Painting and sketching workshops",
      "Craft projects using recycled materials",
      "Annual art exhibition preparation",
      "Decorations for school events",
    ],
  },
  {
    name: "Kohli Warriors",
    subtitle: "Sports Club",
    icon: Trophy,
    color: "accent-primary-gradient",
    description:
      "Focuses on sports and physical fitness, including team sports, athletics, and promoting health and teamwork.",
    activities: [
      "Team sports (kho-kho, kabaddi, cricket)",
      "Athletics and track events",
      "Inter-house sports competitions",
      "Fitness and wellness activities",
    ],
  },
  {
    name: "Gates Cyber Squad",
    subtitle: "Computer Club",
    icon: Monitor,
    color: "primary-muted-gradient",
    description:
      "Centers on technology, coding, digital literacy, and computer science skills including programming and robotics.",
    activities: [
      "Basic coding and programming lessons",
      "Digital literacy and internet safety",
      "Computer-based projects and presentations",
      "Introduction to robotics and automation",
    ],
  },
  {
    name: "Tansen Sangeet",
    subtitle: "Music Club",
    icon: Music,
    color: "gold-primary-gradient",
    description:
      "Dedicated to music education, including singing, playing instruments, and exploring musical genres to foster artistic talent.",
    activities: [
      "Vocal training and singing practice",
      "Instrument lessons (harmonium, tabla, etc.)",
      "Preparation for cultural events",
      "Music appreciation sessions",
    ],
  },
];

const heroImages = [
  { src: "/be.webp", alt: "Students engaged in co-scholastic activities" },
  { src: "/hero/orgamization 2.jpeg", alt: "Faculty and staff group photo" },
  { src: "/hero/organiazation 2.jpeg", alt: "School organization team photo" },
];

function OrganizationHeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-[var(--shadow-elegant)] border-2 border-[#D4A543] h-[280px] sm:h-[360px] md:h-[400px] w-full bg-muted">
      {heroImages.map((img, index) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Pagination Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1.5">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Organizations() {
  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />
      <PageHero
        eyebrow="Student Organizations"
        title="School Clubs & Activities"
        subtitle="Student-led clubs that develop co-scholastic skills, foster teamwork, and nurture talents beyond the classroom."
      />

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-[90vw] px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary">
                Beyond Academics
              </h2>
              <div className="gold-rule mt-4" />
              <p className="mt-5 text-muted-foreground">
                At Rotary H P S English, education extends far beyond textbooks. Our
                student organizations are designed to develop leadership, creativity,
                teamwork, and social responsibility. Each club provides a platform for
                students to explore their interests and discover hidden talents.
              </p>
              <p className="mt-4 text-muted-foreground">
                Through these co-scholastic activities, students learn to collaborate,
                communicate effectively, and think creatively — skills that serve them
                throughout their lives.
              </p>
            </div>
            <OrganizationHeroSlideshow />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90vw] px-4 py-16 md:py-20">
        <h2 className="font-display text-3xl font-bold text-primary">
          Our Student Clubs
        </h2>
        <div className="gold-rule mt-4" />
        <p className="mt-5 text-muted-foreground">
          Each organization is guided by a teacher coordinator and led by student
          representatives, ensuring that activities are both educational and enjoyable.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {organizations.map((org) => (
            <article
              key={org.name}
              className="card-elegant overflow-hidden"
            >
              <div
                className={`${org.color} p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm text-white">
                    <org.icon className="size-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-display text-xl font-bold">
                      {org.name}
                    </h3>
                    <p className="mt-1 text-sm opacity-90">{org.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground">
                  {org.description}
                </p>
                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Key Activities
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {org.activities.map((activity) => (
                      <li
                        key={activity}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="maroon-band">
        <div className="mx-auto max-w-[90vw] px-4 py-14 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">
            Join the Club That Inspires You
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/90">
            Every student is encouraged to participate in at least one club.
            Speak to your class teacher to sign up for your chosen organization.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
