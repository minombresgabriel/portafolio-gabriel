type Props = {
  className?: string;
  direction?: 'right' | 'down';
};

/** A 5×7 pixel arrow cursor. Inherits color from `currentColor`. */
export default function PixelArrow({ className, direction = 'right' }: Props) {
  return (
    <svg
      viewBox="0 0 5 7"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={direction === 'down' ? { transform: 'rotate(90deg)' } : undefined}
    >
      <path fill="currentColor" d="M0 0h1v1h1v1h1v1h1v1h-1v1h-1v1h-1v1h-1z" />
      <path fill="#7a3a00" d="M0 6h1v1h-1z" opacity="0.6" />
    </svg>
  );
}
