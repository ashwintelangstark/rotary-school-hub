/**
 * Central config — copy, assets and timings.
 * Swap images / text here, never deep in JSX.
 */
import studentLeft from "@/assets/student-left.webp";
import studentCenter from "@/assets/student-center.webp";
import studentRight from "@/assets/student-right.webp";

export const BRAND = {
  society: "THE N.L.E. SOCIETY'S",
  schoolName: "Rotary H P S English",
  location: "Hubballi",
};

export const INTRO = {
  line1: "Shaping compassionate",
  line2: "leaders of tomorrow",
  ctaLabel: "Enquire now",
  students: [
    { src: studentLeft, alt: "Student holding textbooks" },
    { src: studentCenter, alt: "Student with arms crossed" },
    { src: studentRight, alt: "Smiling student" },
  ],
};

export const NAV = {
  menuLabel: "Menu",
  actions: [
    { label: "Latest", href: "#latest" },
    { label: "Admissions", href: "#admissions" },
  ],
};

export type Slide = {
  id: string;
  heading: string;
  sub: string;
  cta: string;
  image: string;
  alt: string;
};

export const SLIDES: Slide[] = [
  {
    id: "belong",
    heading: "A place to learn, grow, and belong",
    sub: "Nurturing confident, curious learners through meaningful education, strong values, and a joyful school life.",
    cta: "",
    image: "/hero/hero-belong.webp",
    alt: "Students at Rotary H P S English Hubballi",
  },
  {
    id: "curiosity",
    heading: "Where curiosity leads the way",
    sub: "Empowering young minds through hands-on discovery, creative thinking, and modern learning spaces.",
    cta: "",
    image: "/hero/hero-curiosity.webp",
    alt: "Students at Rotary H P S English",
  },
  {
    id: "futures",
    heading: "Growing bright futures together",
    sub: "Building strong character, leadership, and community spirit in every single student.",
    cta: "",
    image: "/hero/hero-futures.webp",
    alt: "Students engaged in creative activities",
  },
  {
    id: "celebration",
    heading: "Celebrating teamwork, spirit, and school pride",
    sub: "Annual sports and cultural gatherings that build camaraderie, grit, and memories for a lifetime.",
    cta: "",
    image: "/hero/annualsports.webp",
    alt: "Annual sports and cultural celebration at Rotary H P S English",
  },
  {
    id: "excursion",
    heading: "Learning beyond the classroom walls",
    sub: "Outdoor field trips, nature excursions, and hands-on journeys that ignite wonder and discovery.",
    cta: "",
    image: "/hero/agadithota.webp",
    alt: "Outdoor field trip and nature excursion at Agadi Thota",
  },
];
