import type { CSSProperties } from 'react';

type Props = {
  /** Path to a horizontal sprite sheet, e.g. `/sprites/player-idle.svg`. */
  src: string;
  frameWidth: number;
  frameHeight: number;
  frames: number;
  fps?: number;
  className?: string;
  label?: string;
};

/**
 * Plays a horizontal sprite sheet with a steps() animation.
 * Size the sprite with `className` (width); height follows the frame aspect ratio.
 */
export default function Sprite({ src, frameWidth, frameHeight, frames, fps = 4, className, label }: Props) {
  const style: CSSProperties = {
    aspectRatio: `${frameWidth} / ${frameHeight}`,
  };
  const sheetStyle: CSSProperties = {
    width: `${frames * 100}%`,
    animation: frames > 1 ? `sprite-play ${frames / fps}s steps(${frames}) infinite` : undefined,
  };

  return (
    <div
      className={`relative overflow-hidden ${className ?? ''}`}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- pixel sprite sheet, must not be resampled */}
      <img src={src} alt="" draggable={false} className="sprite-sheet pixelated block h-full max-w-none" style={sheetStyle} />
    </div>
  );
}
