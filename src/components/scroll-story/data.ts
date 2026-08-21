import gardening from "@/assets/gardening.webp";
import portrait from "@/assets/portrait.webp";
import sports from "@/assets/sports.webp";

export const introPhoto = {
  src: gardening,
  alt: "Student planting seedlings in the school garden",
};

export const achievements = {
  heading: "Foundations for a changing world",
  ctaLabel: "Discover our values",
  cards: [
    {
      src: "/critical.webp",
      alt: "Critical thinking and problem solving",
      title: "Critical Thinking",
      rotate: -4,
      badge: null as null | { type: "number" | "trophy"; value?: string },
      caption: "Learning how to think, evaluate, and solve real-world challenges.",
    },
    {
      src: portrait,
      alt: "Communication and public speech",
      title: "Communication & Confidence",
      rotate: 2,
      badge: null,
      caption: "Articulate speech, public presentation, and collaborative teamwork.",
    },
    {
      src: "/emotinal.webp",
      alt: "Emotional resilience and grit",
      title: "Emotional Resilience",
      rotate: -2,
      badge: null,
      caption: "Self-awareness, mindfulness, and strength in overcoming obstacles.",
    },
    {
      src: gardening,
      alt: "Environmental stewardship and nature",
      title: "Environmental Stewardship",
      rotate: 4,
      badge: null,
      caption: "Instilling respect for nature, sustainability, and green initiatives.",
    },
  ],
};

export const divider = {
  small1: "",
  big1: "",
  big2: "",
  small2: "",
};

export const legacy = {
  heading: "A 64-year legacy of excellence",
  stats: [
    { icon: "brain" as const, label: "Emotional well-being at the core" },
    { icon: "star" as const, label: "Holistic growth beyond academics" },
    { icon: "people" as const, label: "40:1 teacher-student ratio" },
    { icon: "award" as const, label: "Ranked No. 1 in the Times School Survey*" },
  ],
};

export const stages = {
  eyebrow: "LEARNING JOURNEY",
  heading: "Nurturing every stage of learning",
  cards: [
    {
      src: "/section 1/kg.webp",
      alt: "Young students learning together in Kindergarten",
      title: "Kindergarten",
      grades: "Nursery, LKG & UKG",
      description:
        "Learning through play, stories, exploration and friendship.",
    },
    {
      src: "/hero/primay.png",
      alt: "Primary school students in class",
      title: "Primary",
      grades: "Classes 1 to 4",
      description:
        "Building strong foundations in language, numeracy and curiosity.",
    },
    {
      src: "/section 1/higherprimary.webp",
      alt: "Students taking part in a school activity",
      title: "Higher Primary",
      grades: "Classes 5 to 7",
      description:
        "Deepening understanding through active learning and teamwork.",
    },
    {
      src: "/section 1/highsch.webp",
      alt: "High school students at Rotary H P S English",
      title: "High School",
      grades: "Classes 8 to 10",
      description:
        "Preparing confident, future-ready learners for leadership.",
    },
  ],
};

/** Scroll distance (multiple of viewport height) the master pinned section consumes. */
export const scrollLength = {
  desktop: { master: 1.8 },
  mobile: { master: 1.5 },
};