import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      {
        title: "Calendar of Events | Rotary H P S English, Hubballi",
      },
      {
        name: "description",
        content:
          "Academic calendar 2026-27 for Rotary H P S English, Hubballi — important dates, celebrations, and events throughout the year.",
      },
      {
        property: "og:title",
        content: "Calendar of Events - Rotary H P S English, Hubballi",
      },
      {
        property: "og:description",
        content:
          "Important dates and events for the academic year 2026-27.",
      },
    ],
  }),
  component: Calendar,
});

interface Event {
  date: string;
  day: string;
  event: string;
  icon: string;
  color: string;
}

const events: Event[] = [
  { date: "29 May", day: "Fri", event: "School Reopens", icon: "🎒", color: "bg-green-500" },
  { date: "06 Jun", day: "Sat", event: "Environment Day", icon: "🌱", color: "bg-emerald-500" },
  { date: "19 Jun", day: "Fri", event: "Investiture Ceremony", icon: "🎖️", color: "bg-amber-500" },
  { date: "20 Jun", day: "Sat", event: "Yoga / Music Day", icon: "🧘", color: "bg-purple-500" },
  { date: "01 Jul", day: "Wed", event: "Doctors Day / Health & Hygiene Week", icon: "🩺", color: "bg-red-500" },
  { date: "29 Jul", day: "Wed", event: "Gurupoornima", icon: "🙏", color: "bg-orange-500" },
  { date: "15 Aug", day: "Sat", event: "Independence Day", icon: "🇮🇳", color: "bg-blue-600" },
  { date: "28 Aug", day: "Fri", event: "Raksha Bandhan", icon: "🧵", color: "bg-pink-500" },
  { date: "04 Sep", day: "Fri", event: "Krishna Janmashtami", icon: "🦚", color: "bg-violet-500" },
  { date: "07 Sep", day: "Mon", event: "Teachers Day", icon: "📚", color: "bg-rose-500" },
  { date: "12 Sep", day: "Sat", event: "Hindi Divas", icon: "🗣️", color: "bg-orange-600" },
  { date: "02 Oct", day: "Fri", event: "Gandhi Jayanti", icon: "🕊️", color: "bg-stone-600" },
  { date: "01 Nov", day: "Sun", event: "Karnataka Rajyotsava", icon: "🏴", color: "bg-red-600" },
  { date: "07 Nov", day: "Sat", event: "Deepavali Celebration", icon: "🪔", color: "bg-amber-600" },
  { date: "05 Dec", day: "Sat", event: "Inter School Mega Event", icon: "🏆", color: "bg-yellow-500" },
  { date: "22 Dec", day: "Tue", event: "National Mathematics Day", icon: "📐", color: "bg-indigo-500" },
  { date: "23 Dec", day: "Wed", event: "Christmas Celebration", icon: "🎄", color: "bg-green-600" },
  { date: "26 Jan", day: "Tue", event: "Republic Day", icon: "🎖️", color: "bg-blue-700" },
  { date: "27 Feb", day: "Sat", event: "National Science Day", icon: "🔬", color: "bg-cyan-600" },
];

function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />
      <PageHero
        eyebrow="Academic Calendar"
        title="Calendar of Events 2026-27"
        subtitle="Important dates, celebrations and events throughout the academic year"
      />

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-[90vw] px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <CalendarIcon className="size-6 text-primary" />
              <div>
                <h2 className="font-display text-2xl font-bold text-primary">
                  Important Dates
                </h2>
                <p className="text-sm text-muted-foreground">
                  Click on any date block to view event details
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-primary"></span>
                <span className="text-muted-foreground">Important Event</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {events.map((event) => (
              <button
                key={event.date}
                onClick={() => setSelectedEvent(event)}
                className="card-elegant group relative overflow-hidden p-4 text-left transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <div className={`absolute top-0 right-0 size-16 ${event.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{event.icon}</span>
                    <div className={`size-2 rounded-full ${event.color}`}></div>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {event.day}
                  </p>
                  <p className="font-display text-lg font-bold text-primary">
                    {event.date}
                  </p>
                  <p className="mt-2 text-sm font-medium text-primary line-clamp-2">
                    {event.event}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90vw] px-4 py-16 md:py-20">
        <div className="card-elegant p-8">
          <h3 className="font-display text-2xl font-bold text-primary">
            About Our Calendar
          </h3>
          <div className="gold-rule mt-4" />
          <p className="mt-4 text-muted-foreground">
            The academic calendar at Rotary H P S English is thoughtfully designed to
            balance academics with co-curricular activities. Each event is an opportunity
            for students to learn beyond the classroom, develop leadership skills, and
            celebrate our culture and values.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                19
              </span>
              <div>
                <p className="font-semibold text-primary">Events</p>
                <p className="text-sm text-muted-foreground">Across the year</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                10
              </span>
              <div>
                <p className="font-semibold text-primary">Months</p>
                <p className="text-sm text-muted-foreground">May 2026 - Feb 2027</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                365
              </span>
              <div>
                <p className="font-semibold text-primary">Days</p>
                <p className="text-sm text-muted-foreground">Of learning & growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="card-elegant relative w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-secondary hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className={`p-6 ${selectedEvent.color} text-white`}>
              <div className="flex items-center gap-4">
                <span className="text-5xl">{selectedEvent.icon}</span>
                <div>
                  <p className="text-sm opacity-90">{selectedEvent.day}</p>
                  <p className="font-display text-2xl font-bold">
                    {selectedEvent.date}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-primary">
                {selectedEvent.event}
              </h3>
              <div className="gold-rule my-4" />
              <p className="text-sm text-muted-foreground">
                This is an important event in our academic calendar. Students,
                parents, and staff are encouraged to participate and make the most
                of this occasion for learning and celebration.
              </p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-6 w-full btn-primary text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
