/** Pixel Venezuela flag (yellow, blue with an arc of 8 white stars, red). 18×12 grid. */
const STARS: [number, number][] = [
  [4, 6],
  [5, 5],
  [7, 4],
  [8, 4],
  [10, 4],
  [11, 4],
  [13, 5],
  [14, 6],
];

export default function VenezuelaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" shapeRendering="crispEdges" className={className} aria-hidden="true" focusable="false">
      <rect width="18" height="4" fill="#ffcc00" />
      <rect y="4" width="18" height="4" fill="#00247d" />
      <rect y="8" width="18" height="4" fill="#cf142b" />
      {STARS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#ffffff" />
      ))}
    </svg>
  );
}
