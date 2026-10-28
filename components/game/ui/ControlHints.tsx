type Hint = { keys: string; label: string };

type Props = {
  hints: Hint[];
  className?: string;
};

/** Bottom-of-screen button legend, e.g. "↑↓ SELECT  Ⓐ CONFIRM". */
export default function ControlHints({ hints, className }: Props) {
  return (
    <p className={`flex flex-wrap items-center justify-center gap-x-[2.2em] gap-y-1 font-pixel text-[length:var(--fs-small)] text-muted ${className ?? ''}`}>
      {hints.map((h) => (
        <span key={h.label} className="inline-flex items-center gap-[0.8em]">
          <span aria-hidden="true" className="text-cream">
            {h.keys}
          </span>
          <span>{h.label}</span>
        </span>
      ))}
    </p>
  );
}
