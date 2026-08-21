import { BRAND } from "@/config/site";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`block whitespace-nowrap text-left leading-[1.1] ${className ?? ""}`}>
      <span className="block font-sans text-[0.40em] font-medium tracking-[0.16em] text-foreground/75 uppercase">
        {BRAND.society}
      </span>
      <span className="block font-sans text-[0.95em] font-extrabold tracking-tight text-[#6B1728]">
        {BRAND.schoolName}
      </span>
      <span className="block font-sans text-[0.48em] font-normal tracking-wide text-foreground/60">
        {BRAND.location}
      </span>
    </span>
  );
}
