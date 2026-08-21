export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="maroon-band">
      <div className="mx-auto max-w-[90vw] px-4 py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{title}</h1>
        <div className="gold-rule mt-5" />
        <p className="mt-5 max-w-2xl text-base opacity-90">{subtitle}</p>
      </div>
    </section>
  );
}
