/**
 * Abstract paddle face with the four FSR impact zones the firmware reports.
 * Pure SVG so it stays crisp and needs no art assets. Zone 1 (the sweet spot)
 * pulses to hint at live feedback.
 */
export function PaddleDiagram() {
  return (
    <svg
      className="paddle-svg"
      viewBox="0 0 260 380"
      role="img"
      aria-label="Paddle face showing four sensor impact zones, with the centre sweet spot highlighted"
    >
      <defs>
        <linearGradient id="pp-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#222a3d" />
          <stop offset="100%" stopColor="#0b1326" />
        </linearGradient>
        <linearGradient id="pp-hot" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="100%" stopColor="#dfff00" />
        </linearGradient>
        <filter id="pp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Handle */}
      <rect x="112" y="252" width="36" height="112" rx="18" fill="#171f33" />
      <rect
        x="112"
        y="252"
        width="36"
        height="112"
        rx="18"
        fill="none"
        stroke="rgba(255,255,255,0.10)"
      />
      <rect x="122" y="286" width="16" height="4" rx="2" fill="var(--blue)" opacity="0.6" />
      <rect x="122" y="298" width="16" height="4" rx="2" fill="var(--blue)" opacity="0.4" />

      {/* Face */}
      <rect
        x="26"
        y="16"
        width="208"
        height="248"
        rx="70"
        fill="url(#pp-face)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
      />

      {/* Zone grid */}
      <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
        <line x1="26" y1="99" x2="234" y2="99" />
        <line x1="26" y1="181" x2="234" y2="181" />
        <line x1="95" y1="16" x2="95" y2="264" />
        <line x1="165" y1="16" x2="165" y2="264" />
      </g>

      {/* Outer zones */}
      <g fill="var(--cyan)" opacity="0.16">
        <circle cx="62" cy="62" r="17" />
        <circle cx="198" cy="62" r="17" />
        <circle cx="62" cy="218" r="17" />
        <circle cx="198" cy="218" r="17" />
      </g>

      {/* Sweet spot */}
      <g filter="url(#pp-glow)">
        <circle cx="130" cy="140" r="40" fill="url(#pp-hot)" opacity="0.22" />
        <circle
          className="paddle-svg__pulse"
          cx="130"
          cy="140"
          r="40"
          fill="none"
          stroke="var(--lime)"
          strokeWidth="2.5"
        />
        <circle cx="130" cy="140" r="9" fill="var(--lime)" />
      </g>

      {/* Readout */}
      <text x="130" y="330" textAnchor="middle" className="paddle-svg__label">
        ZONE 1 · SWEET SPOT
      </text>
    </svg>
  );
}
