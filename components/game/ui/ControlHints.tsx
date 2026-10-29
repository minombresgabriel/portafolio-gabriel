type Hint = { keys: string; label: string };

/** The pixel font has no Ⓐ/Ⓑ glyphs, so those keys are drawn as round pad buttons. */
const PAD_BUTTON = /([ⒶⒷ])/;

function Keys({ keys }: { keys: string }) {
  return keys.split(PAD_BUTTON).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        className="inline-flex h-[1.7em] w-[1.7em] items-center justify-center rounded-full bg-rose pl-[0.1em] text-[0.8em] leading-none text-cream shadow-[inset_0_-2px_0_#07041a]"
      >
        {part === 'Ⓐ' ? 'A' : 'B'}
      </span>
    ) : (
      part
    ),
  );
}

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
          <span aria-hidden="true" className="inline-flex items-center gap-[0.4em] text-cream">
            <Keys keys={h.keys} />
          </span>
          <span>{h.label}</span>
        </span>
      ))}
    </p>
  );
}
