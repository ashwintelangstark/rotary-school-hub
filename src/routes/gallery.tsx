import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { X, Plus, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { fetchGalleryImages, type GalleryImage, isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Student Activities at Rotary H P S English, Hubballi" },
      {
        name: "description",
        content:
          "Photo gallery of student activities at Rotary H P S English, Hubballi — literary and music club events, sports, art & craft, science and computer club highlights from 2025-26.",
      },
      { property: "og:title", content: "Gallery — Student Activities | Rotary H P S English" },
      {
        property: "og:description",
        content:
          "Competitions, celebrations, club activities and achievements of students at Rotary H P S English, Hubballi.",
      },
    ],
  }),
  component: Gallery,
});

type Item = { src: string; title: string; category: string; caption: string };

const items: Item[] = [
  { src: "/gallery/seach.webp", title: "First Day Vibes", category: "School Life", caption: "New uniforms, bright smiles and a year of possibilities begins." },
  { src: "/gallery/envday.webp", title: "World Environment Day", category: "Celebrations", caption: "Little hands planted hope for a greener tomorrow." },
  { src: "/gallery/essey.webp", title: "Essay Writing Competition", category: "Literary Club", caption: "Big ideas found their voice, one thoughtful page at a time." },
  { src: "/gallery/hinday.webp", title: "Hindi Day", category: "Literary Club", caption: "Language, confidence and culture took centre stage." },
  { src: "/gallery/story.webp", title: "Story Telling Competition", category: "Literary Club", caption: "Young storytellers turned imagination into unforgettable moments." },
  { src: "/gallery/justamin.webp", title: "Just A Minute", category: "Literary Club", caption: "Quick minds, brave voices and sixty seconds of brilliance." },
  { src: "/gallery/poem.webp", title: "Poem Recitation", category: "Literary Club", caption: "Every verse sparkled with rhythm, feeling and flair." },
  { src: "/gallery/mockin.webp", title: "Mock Interview", category: "Literary Club", caption: "Future-ready confidence began with a firm hello." },
  { src: "/gallery/mathtalent.webp", title: "Mathematical Talent", category: "Academics", caption: "Curious minds cracked challenges and celebrated every solution." },
  { src: "/gallery/healthaware.webp", title: "Health Awareness", category: "Academics", caption: "A meaningful session inspiring healthier choices every day." },
  { src: "/gallery/mathrelayrace.webp", title: "Math Relay Race", category: "Academics", caption: "Speed, teamwork and numbers raced towards the finish line." },
  { src: "/gallery/smrtsclor.webp", title: "Smart Scholar Test", category: "Academics", caption: "Sharp thinkers rose to every challenge beyond the textbook." },
  { src: "/gallery/libclub.webp", title: "Library Club", category: "Library Club", caption: "Where every book opens a new world of wonder." },
  { src: "/gallery/abhn.webp", title: "Abhinaya Geete Competition", category: "Music Club", caption: "Melody and expression came alive in every graceful performance." },
  { src: "/gallery/flutedeco.webp", title: "Flute Decoration", category: "Art & Craft", caption: "Young artists transformed simple flutes into vibrant masterpieces." },
  { src: "/gallery/crownmaking.webp", title: "Crown Making", category: "Art & Craft", caption: "Creativity ruled as every child crafted a crown to remember." },
  { src: "/gallery/pott.webp", title: "Pot Decoration", category: "Art & Craft", caption: "Clay became a canvas for colour, pattern and imagination." },
  { src: "/gallery/pratibhakaranji.webp", title: "Pratibha Karanji Prize Winners", category: "Achievements", caption: "Celebrating shining talents who brought home well-earned honours." },
  { src: "/gallery/INVESTITURE.webp", title: "Investiture Ceremony", category: "Celebrations", caption: "Young leaders accepted their badges with pride, ready to serve and inspire." },
  { src: "/gallery/rhyme.webp", title: "Rhyme Competition", category: "Literary Club", caption: "Tiny voices filled the air with rhythm, rhyme and pure joy." },
  { src: "/gallery/annualsports.webp", title: "Annual Sports Meet", category: "Celebrations", caption: "Spirit, teamwork and triumph — where every finish line tells a story of dedication." },
  { src: "/gallery/agadithota.webp", title: "Agadi Thotha", category: "Cultural Heritage", caption: "Where tradition comes alive through folk tales and timeless wisdom passed down generations." },
  { src: "/gallery/gujrat.webp", title: "Rainbow Art Centre Gujarat — All India Colouring & Handwriting Competition", category: "Achievements", caption: "Our young artists showcased their talent on the national stage, bringing honour and recognition to their school." },
  { src: "/gallery/phspark.webp", title: "PHS Water Park Trip", category: "School Life", caption: "Splashes of laughter, waves of joy — a day of sunshine, friendship and unforgettable memories." },
];

const sports = [
  { name: "Laasya Shetty", detail: "Represented State Level", image: "/gallery/winners/laasya.webp" },
  { name: "Akshara Shettar", detail: "1st place in Karate, District Level · State Level", image: "/gallery/winners/akshara.webp" },
  { name: "Mallikarjun Patil", detail: "2nd place in Skating, District Level", image: "/gallery/winners/MALLIKARJUN.webp" },
  { name: "Shubham Bakale", detail: "1st place in Badminton, District Level · State Level", image: "/gallery/winners/shubham.webp" },
  { name: "Kayan Habib", detail: "1st place in Badminton, District Level · State Level", image: "/gallery/winners/kayan.webp" },
  { name: "Atharva Basava", detail: "2nd place in Clay Modeling, Pratibha Karanji", image: "/gallery/winners/atharva.webp" },
];

function Gallery() {
  const [supabaseImages, setSupabaseImages] = useState<GalleryImage[]>([]);
  const [isLoadingSupabase, setIsLoadingSupabase] = useState(false);
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<Item | null>(null);

  // Fetch images from Supabase on component mount
  useEffect(() => {
    const loadSupabaseImages = async () => {
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.log("Supabase not configured, using static images only");
        return;
      }

      setIsLoadingSupabase(true);
      try {
        const { data, error } = await fetchGalleryImages();
        if (data && !error) {
          setSupabaseImages(data);
        }
      } catch (error) {
        console.error("Failed to load Supabase images:", error);
        // Silently fail - static images will still show
      } finally {
        setIsLoadingSupabase(false);
      }
    };

    loadSupabaseImages();
  }, []);

  // Show ONLY Supabase images (managed from admin panel)
  // No static items - gallery is fully managed from Supabase
  const allItems = useMemo(() => {
    const supabaseItems: Item[] = supabaseImages.map((img) => ({
      src: img.image_url,
      title: img.title,
      category: img.category || "School Life",
      caption: img.description,
    }));
    return supabaseItems;
  }, [supabaseImages]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allItems.map((i) => i.category)))],
    [allItems],
  );

  const shown = active === "All" ? allItems : allItems.filter((i) => i.category === active);

  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />
      <PageHero
        eyebrow="Zindagi 2K25 · A Journey to Celebrate"
        title="Gallery"
        subtitle="A year in pictures — competitions, celebrations, club activities and achievements of our students through the 2025-26 academic year."
      />

      <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-secondary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {isSupabaseConfigured && (
            <Link to="/login">
              <Button className="btn-outline gap-2">
                <Upload className="h-4 w-4" />
                Manage Gallery
              </Button>
            </Link>
          )}
        </div>

        {isLoadingSupabase ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : shown.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No images in gallery yet</h3>
            <p className="text-muted-foreground">
              {isSupabaseConfigured
                ? "Gallery images will appear here once uploaded from the admin panel."
                : "Gallery is not configured."}
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item) => (
            <button
              key={item.title}
              onClick={() => setLightbox(item)}
              className="card-elegant group overflow-hidden text-left"
            >
              <img
                src={item.src}
                alt={`${item.title} at Rotary H P S English, Hubballi`}
                width={1400}
                height={788}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                  {item.category}
                </p>
                <h2 className="mt-2 font-display text-lg font-bold text-primary">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.caption}</p>
              </div>
            </button>
          ))}
          </div>
        )}
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-[90vw] px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Sports Club</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">
            Champions of the year
          </h2>
          <div className="gold-rule mt-5" />
          <p className="mt-5 max-w-2xl text-muted-foreground">
            &ldquo;Sport has the power to change the world.&rdquo; Our students represented the school
            at district and state level across karate, skating, badminton and cricket.
          </p>
          <div className="mt-10 grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {sports.map((s) => (
              <article key={s.name} className="card-elegant overflow-hidden">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={s.image}
                    alt={s.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-display text-lg font-bold text-primary">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-dark/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <button
            aria-label="Close image"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 rounded-full border border-gold p-2 text-primary-foreground transition-colors hover:bg-gold hover:text-primary-dark"
          >
            <X className="size-5" />
          </button>
          <figure className="max-h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={`${lightbox.title} at Rotary H P S English, Hubballi`}
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
            <figcaption className="mt-4 text-center text-primary-foreground">
              <span className="font-display text-xl font-bold">{lightbox.title}</span>
              <span className="mt-1 block text-sm opacity-85">{lightbox.caption}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
