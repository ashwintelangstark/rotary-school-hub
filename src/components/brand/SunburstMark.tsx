interface SunburstMarkProps {
  className?: string;
}

export function SunburstMark({ className }: SunburstMarkProps) {
  return (
    <img
      src="/school-logo-mark.webp"
      alt="The Nitish Lahary Education Society Logo"
      className={`object-contain ${className ?? ""}`}
    />
  );
}
