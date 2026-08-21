import { motion } from "framer-motion";

export function KeyInfoBar() {
  const items = [
    {
      value: "LKG – 10th",
      label: "CLASSES OFFERED",
    },
    {
      value: "English",
      label: "MEDIUM OF INSTRUCTION",
    },
    {
      value: "Hubballi",
      label: "DESHPANDE NAGAR",
    },
    {
      value: "State",
      label: "BOARD",
    },
  ];

  return (
    <section className="relative z-10 border-y border-foreground/10 bg-background/80 py-6 md:py-8 shadow-[0_4px_24px_rgba(61,40,23,0.04)] backdrop-blur-md">
      {/* Warm ambient depth glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-24 bg-gradient-to-b from-amber-400/15 to-transparent blur-2xl" />

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-around gap-y-6 px-6 text-center">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-w-[140px] flex-col items-center px-4"
          >
            <span className="font-sans text-xl font-extrabold tracking-tight text-[#6B1728] md:text-2xl lg:text-[26px]">
              {item.value}
            </span>
            <span className="mt-1 font-sans text-[10px] font-medium tracking-[0.18em] text-foreground/60 uppercase md:text-[11px]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
