export function StatIcon({ name }: { name: "brain" | "star" | "people" | "award" }) {
  const orange = "#ED6E20";
  const white = "#FFFFFF";

  if (name === "brain")
    return (
      <svg viewBox="0 0 100 110" className="h-32 w-32 md:h-36 md:w-36" fill="none">
        {/* Head profile facing right */}
        <path
          d="M 38 100 L 38 86 C 24 82 16 70 16 54 C 16 32 30 18 50 18 C 66 18 78 30 78 48 C 78 54 82 58 78 63 C 74 68 70 72 64 76 C 60 80 60 90 60 100"
          stroke={white}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Solid orange cloud inside brain */}
        <path
          d="M 34 50 C 31 50 28 47 28 43 C 28 39 31 37 35 37 C 37 32 42 30 48 30 C 55 30 59 34 60 38 C 64 38 67 41 67 46 C 67 51 63 53 58 53 H 34 Z"
          fill={orange}
        />
      </svg>
    );

  if (name === "star")
    return (
      <svg viewBox="0 0 100 110" className="h-32 w-32 md:h-36 md:w-36" fill="none">
        {/* Open book outline */}
        <path
          d="M 50 48 V 88 M 50 88 C 42 83 28 81 18 81 V 48 C 28 48 42 50 50 55 C 58 50 72 48 82 48 V 81 C 72 81 58 83 50 88 Z"
          stroke={white}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left page text lines */}
        <line x1="26" y1="59" x2="40" y2="59" stroke={white} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="26" y1="66" x2="40" y2="66" stroke={white} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="26" y1="73" x2="40" y2="73" stroke={white} strokeWidth="1.6" strokeLinecap="round" />

        {/* Right page text lines */}
        <line x1="60" y1="59" x2="74" y2="59" stroke={white} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="60" y1="66" x2="74" y2="66" stroke={white} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="60" y1="73" x2="74" y2="73" stroke={white} strokeWidth="1.6" strokeLinecap="round" />

        {/* Solid orange star */}
        <polygon
          points="50,20 53.5,29 63,30 56,37 58,46 50,41.5 42,46 44,37 37,30 46.5,29"
          fill={orange}
        />

        {/* Radiating sunburst rays */}
        <line x1="50" y1="10" x2="50" y2="16" stroke={orange} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="61" y1="14" x2="57" y2="18" stroke={orange} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="39" y1="14" x2="43" y2="18" stroke={orange} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="67" y1="23" x2="62" y2="25" stroke={orange} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="33" y1="23" x2="38" y2="25" stroke={orange} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );

  if (name === "people")
    return (
      <svg viewBox="0 0 100 110" className="h-32 w-32 md:h-36 md:w-36" fill="none">
        {/* Teacher solid orange */}
        <circle cx="50" cy="18" r="8" fill={orange} />
        <path d="M 33 37 C 33 28 40 26 50 26 C 60 26 67 28 67 37 V 39 H 33 V 37 Z" fill={orange} />

        {/* Branching tree lines */}
        <path d="M 50 39 V 48 M 26 48 H 74 M 26 48 V 53 M 50 48 V 53 M 74 48 V 53" stroke={white} strokeWidth="1.8" strokeLinecap="round" />

        {/* Row 1 students */}
        <circle cx="26" cy="58" r="4.5" stroke={white} strokeWidth="1.6" />
        <path d="M 18 70 C 18 64 21 63 26 63 C 31 63 34 64 34 70" stroke={white} strokeWidth="1.6" strokeLinecap="round" />

        <circle cx="50" cy="58" r="4.5" stroke={white} strokeWidth="1.6" />
        <path d="M 42 70 C 42 64 45 63 50 63 C 55 63 58 64 58 70" stroke={white} strokeWidth="1.6" strokeLinecap="round" />

        <circle cx="74" cy="58" r="4.5" stroke={white} strokeWidth="1.6" />
        <path d="M 66 70 C 66 64 69 63 74 63 C 79 63 82 64 82 70" stroke={white} strokeWidth="1.6" strokeLinecap="round" />

        {/* Row 2 students */}
        <circle cx="26" cy="80" r="4.5" stroke={white} strokeWidth="1.6" />
        <path d="M 18 92 C 18 86 21 85 26 85 C 31 85 34 86 34 92" stroke={white} strokeWidth="1.6" strokeLinecap="round" />

        <circle cx="50" cy="80" r="4.5" stroke={white} strokeWidth="1.6" />
        <path d="M 42 92 C 42 86 45 85 50 85 C 55 85 58 86 58 92" stroke={white} strokeWidth="1.6" strokeLinecap="round" />

        <circle cx="74" cy="80" r="4.5" stroke={white} strokeWidth="1.6" />
        <path d="M 66 92 C 66 86 69 85 74 85 C 79 85 82 86 82 92" stroke={white} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );

  return (
    <svg viewBox="0 0 100 110" className="h-32 w-32 md:h-36 md:w-36" fill="none">
      {/* Solid orange globe sphere */}
      <circle cx="50" cy="30" r="16" fill={orange} />

      {/* White latitude & longitude grids */}
      <path d="M 50 14 C 43 18 43 42 50 46 C 57 42 57 18 50 14 Z" stroke={white} strokeWidth="1.6" />
      <line x1="34" y1="30" x2="66" y2="30" stroke={white} strokeWidth="1.6" />

      {/* Axis & Stand Arm */}
      <path d="M 50 46 V 56 M 42 56 H 58" stroke={white} strokeWidth="2.2" strokeLinecap="round" />

      {/* Stack of 3 books below */}
      <rect x="24" y="56" width="52" height="9" rx="1.5" stroke={white} strokeWidth="1.8" fill="none" />
      <line x1="30" y1="56" x2="30" y2="65" stroke={white} strokeWidth="1.5" />

      <rect x="20" y="67" width="60" height="9" rx="1.5" stroke={white} strokeWidth="1.8" fill="none" />
      <line x1="26" y1="67" x2="26" y2="76" stroke={white} strokeWidth="1.5" />

      <rect x="16" y="78" width="68" height="10" rx="2" stroke={white} strokeWidth="1.8" fill="none" />
      <line x1="22" y1="78" x2="22" y2="88" stroke={white} strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-orange shadow-md ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-onmaroon" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h13M12 5l7 7-7 7" />
      </svg>
    </span>
  );
}

export function TrophyBadge() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 drop-shadow" fill="var(--gold)">
      <path d="M14 8h20v10a10 10 0 0 1-20 0V8z" />
      <path d="M10 10H6v4a8 8 0 0 0 8 8v-4a4 4 0 0 1-4-4v-4zM38 10h4v4a8 8 0 0 1-8 8v-4a4 4 0 0 0 4-4v-4z" />
      <rect x="20" y="28" width="8" height="7" rx="1" />
      <rect x="14" y="35" width="20" height="5" rx="2" />
    </svg>
  );
}