import { createFileRoute } from "@tanstack/react-router";
import { FileText, CalendarDays, Info } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions | Rotary H P S English, Hubballi" },
      {
        name: "description",
        content:
          "Admission process and required documents for Rotary H P S English, Deshpande Nagar, Hubballi — step-by-step guidance for parents.",
      },
      { property: "og:title", content: "Admissions — Rotary H P S English, Hubballi" },
      {
        property: "og:description",
        content: "Step-by-step admission process and the list of documents required for enrolment.",
      },
    ],
  }),
  component: Admissions,
});

const steps = [
  {
    title: "Enquiry at the school office",
    text: "Visit the school office at Deshpande Nagar during working hours (Mon–Sat, 9:00 AM – 4:00 PM) or call to enquire about seat availability for the class you need.",
  },
  {
    title: "Collect the application form",
    text: "The prescribed admission form is issued at the office counter along with the prospectus and the fee structure for the academic year.",
  },
  {
    title: "Submit the completed form",
    text: "Return the filled form with photocopies of all required documents and recent passport-size photographs of the child.",
  },
  {
    title: "Interaction with the child and parents",
    text: "A brief, informal interaction is held with the child and parents to understand the child's readiness for the class applied for. For entry classes this is only an acquaintance meeting.",
  },
  {
    title: "Verification of documents",
    text: "The office verifies originals against the submitted copies, including the transfer certificate for students joining from another school.",
  },
  {
    title: "Confirmation and fee payment",
    text: "On approval, parents are informed and admission is confirmed on payment of the prescribed fees at the school office. A receipt is issued immediately.",
  },
  {
    title: "Joining the school",
    text: "The child's name is entered in the school register, the uniform and book list is handed over, and the class teacher is introduced before the term begins.",
  },
];

const documents = [
  "Birth certificate issued by the municipal authority (original for verification, one photocopy)",
  "Transfer Certificate (TC) from the previous school, for classes 2 and above",
  "Previous year's progress report / marks card",
  "Aadhaar card of the student",
  "Caste and income certificate, where applicable",
  "Four recent passport-size photographs of the student",
  "One passport-size photograph each of the parents",
];

function Admissions() {
  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />
      <PageHero
        eyebrow="Admissions"
        title="Admission Process"
        subtitle="Admissions to Rotary H P S English are completed at the school office. Below is the process we follow and the documents you should carry."
      />

      <section className="mx-auto max-w-[90vw] px-4 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">Step by Step</h2>
            <div className="gold-rule mt-4" />
            <ol className="mt-8 space-y-6 border-l-2 border-border pl-6">
              {steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute -left-[2.35rem] flex size-8 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-primary">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-6">
            <div className="card-elegant p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
                <FileText className="size-5" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">
                Documents Required
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {documents.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-elegant p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
                <CalendarDays className="size-5" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-primary">Good to Know</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>&bull; Admissions usually open in March for the following academic year.</li>
                <li>&bull; Seats are limited and filled in order of completed applications.</li>
                <li>&bull; Age criteria follow Karnataka state norms for the class applied for.</li>
                <li>&bull; Please carry all originals on the day of verification.</li>
                <li>&bull; Office hours: Monday to Saturday, 9:00 AM &ndash; 4:00 PM.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
