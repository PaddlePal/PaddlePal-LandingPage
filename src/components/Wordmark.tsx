/**
 * Brand lockup: paddle glyph + wordmark. The glyph is the paddle silhouette
 * reduced to its two defining marks — the face outline and the sweet-spot dot —
 * so it still reads at 24px in a browser tab or a nav bar.
 */
export function Wordmark({ size = 26 }: { size?: number }) {
  return (
    <>
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
        className="wordmark__glyph"
      >
        <ellipse
          cx="16"
          cy="12.5"
          rx="7.5"
          ry="8.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <circle cx="16" cy="12.5" r="2.6" fill="currentColor" />
        <path
          d="M16 21v6.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="wordmark__text">PaddlePal</span>
    </>
  );
}
