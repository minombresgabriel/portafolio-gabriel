type Props = {
  src: string;
  className?: string;
};

/** A single-frame pixel sprite (e.g. a 16×16 icon) scaled without smoothing. Decorative. */
export default function PixelIcon({ src, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny pixel sprite, must not be resampled
    <img src={src} alt="" aria-hidden="true" draggable={false} loading="lazy" className={`pixelated ${className ?? ''}`} />
  );
}
