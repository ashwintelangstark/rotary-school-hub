export function Asterisk({ className }: { className?: string }) {
  const strokes = Array.from({ length: 6 }, (_, i) => i);
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g stroke="var(--color-accent)" strokeWidth="2.4" strokeLinecap="round">
        {strokes.map((i) => {
          const a = ((2 * Math.PI) / strokes.length) * i;
          return (
            <line
              key={i}
              x1={20 - Math.cos(a) * 15}
              y1={20 - Math.sin(a) * 15}
              x2={20 + Math.cos(a) * 15}
              y2={20 + Math.sin(a) * 15}
            />
          );
        })}
      </g>
    </svg>
  );
}
