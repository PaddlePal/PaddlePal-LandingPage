import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * The four impact zones the firmware reports, laid out to match the live tab
 * in the app (`src/app/(tabs)/live.tsx`): Z1 sits center, dead in the middle
 * of the face; Z2 is the center strip closer to the handle; Z3/Z4 are the
 * full-height left/right edge strips. The top band of the face is left
 * unclaimed on the live tab too — no zone owns it — so the diagram below
 * leaves it blank rather than inventing a fifth region.
 *
 * `speed`/`shot` are illustrative sample values — the readout is labelled as
 * simulated in the UI so it is never mistaken for live hardware. `shot` is
 * always one of the five buckets `lib/shotClassifier.ts` actually produces
 * (drive/drop/dink/overhead/rally) — Z1 and Z4 mirror the classifier's own
 * zone gates (zone 1 → drive, zones 3/4 → overhead).
 */
const Z1 = { id: 'z1', name: 'Sweet spot', short: 'Z1', speed: '48', shot: 'Drive' } as const;
const Z2 = { id: 'z2', name: 'Near handle', short: 'Z2', speed: '41', shot: 'Drop' } as const;
const Z3 = { id: 'z3', name: 'Left edge', short: 'Z3', speed: '33', shot: 'Dink' } as const;
const Z4 = { id: 'z4', name: 'Right edge', short: 'Z4', speed: '52', shot: 'Overhead' } as const;

const ZONES = [Z1, Z2, Z3, Z4] as const;

const CYCLE_MS = 2800;

export function PaddleDiagram() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  // Once the visitor picks a zone the carousel stops. Auto-advancing under
  // someone's cursor is the fastest way to make an interactive thing feel broken.
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (pinned || reducedMotion) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % ZONES.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(t);
  }, [pinned, reducedMotion]);

  // `?? Z1` is only here to satisfy noUncheckedIndexedAccess — `index` is
  // always kept in range by the modulo above and by the chip handlers.
  const zone = ZONES[index] ?? Z1;

  return (
    <figure className="paddle">
      <div className="paddle__stage">
        <div className="paddle__halo" aria-hidden="true" />

        <svg
          className="paddle__svg"
          viewBox="0 0 300 430"
          role="img"
          aria-label={`Paddle face with four sensor impact zones. Currently highlighted: zone ${
            index + 1
          }, ${zone.name}.`}
        >
          <defs>
            <linearGradient id="pp-face" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#252e44" />
              <stop offset="55%" stopColor="#141c30" />
              <stop offset="100%" stopColor="#080f22" />
            </linearGradient>
            <linearGradient id="pp-rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.34)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(99,247,255,0.28)" />
            </linearGradient>
            <linearGradient id="pp-hot" x1="0" y1="1" x2="0.4" y2="0">
              <stop offset="0%" stopColor="var(--cyan)" />
              <stop offset="100%" stopColor="var(--lime)" />
            </linearGradient>
            <linearGradient id="pp-grip" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0d1424" />
              <stop offset="42%" stopColor="#232c42" />
              <stop offset="100%" stopColor="#0a1020" />
            </linearGradient>

            {/* Composite-core texture, kept very low contrast so it reads as
                material rather than as a pattern. */}
            <pattern
              id="pp-honeycomb"
              width="22"
              height="38"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(0.85)"
            >
              <path
                d="M11 0 L22 6.3 L22 19 L11 25.3 L0 19 L0 6.3 Z M11 25.3 L22 31.6 M11 25.3 L0 31.6"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            </pattern>

            {/* Rounded rect, not an oval — matches the live tab's paddle head,
                which is a plain View with borderRadius = width * 0.22. */}
            <clipPath id="pp-face-clip">
              <rect x="40" y="8" width="220" height="266" rx="48" ry="48" />
            </clipPath>

            <filter id="pp-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ---- Handle ---- */}
          {/* Widened to ~24% of the head's width, same ratio as the live
              tab's handle (24% of paddleW), so it reads as the same paddle
              rather than a thinner marketing redraw. */}
          <g>
            <rect x="126" y="252" width="48" height="152" rx="17" fill="url(#pp-grip)" />
            {/* Grip wrap: overlapping diagonal bands. */}
            <g clipPath="none" opacity="0.5">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <path
                  key={i}
                  d={`M126 ${290 + i * 15} L174 ${282 + i * 15}`}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1.4"
                />
              ))}
            </g>
            <rect
              x="126"
              y="252"
              width="48"
              height="152"
              rx="17"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
            />
            {/* Charge / status LED in the butt cap. */}
            <circle cx="150" cy="392" r="3.4" fill="var(--cyan)">
              {!reducedMotion && (
                <animate
                  attributeName="opacity"
                  values="1;0.25;1"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </g>

          {/* ---- Face ---- */}
          {/*
            Zone geometry mirrors `ZONES` in `src/app/(tabs)/live.tsx`: a
            4-col × 5-row sensor grid where only rows 2–5 are claimed (row 1
            is unclaimed on real hardware, left blank here too).
              Z1 — cols 2–3, rows 2–3 (center, upper half)
              Z2 — cols 2–3, rows 4–5 (center, lower half, near the handle)
              Z3 — col 1,   rows 2–4 (left edge — one row shorter than Z1+Z2)
              Z4 — col 4,   rows 2–4 (right edge — same as Z3)
          */}
          <g clipPath="url(#pp-face-clip)">
            <rect x="40" y="8" width="220" height="266" fill="url(#pp-face)" />
            <rect x="40" y="8" width="220" height="266" fill="url(#pp-honeycomb)" />

            {/* Zone divisions — hairlines, not boxes. */}
            <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
              <line x1="46" y1="96" x2="254" y2="96" />
              <line x1="112" y1="96" x2="112" y2="268" />
              <line x1="188" y1="96" x2="188" y2="268" />
              <line x1="112" y1="182" x2="188" y2="182" />
            </g>

            {/* Active-zone wash. One element that moves, so only one thing
                repaints per tick. */}
            <g className="paddle__zone-wash" data-zone={zone.id}>
              <rect className="paddle__wash paddle__wash--z1" x="112" y="96" width="76" height="86" />
              <rect className="paddle__wash paddle__wash--z2" x="112" y="182" width="76" height="86" />
              <rect className="paddle__wash paddle__wash--z3" x="40" y="96" width="72" height="129" />
              <rect className="paddle__wash paddle__wash--z4" x="188" y="96" width="72" height="129" />
            </g>
          </g>

          {/* Rim — same rounded rect as the face clip, traced as a stroke. */}
          <rect
            x="40"
            y="8"
            width="220"
            height="266"
            rx="48"
            ry="48"
            fill="none"
            stroke="url(#pp-rim)"
            strokeWidth="2"
          />

          {/* ---- Impact ping ---- */}
          <g
            className="paddle__ping"
            data-zone={zone.id}
            filter="url(#pp-glow)"
            key={reducedMotion ? 'static' : zone.id}
          >
            <circle r="34" fill="url(#pp-hot)" opacity="0.18" />
            {!reducedMotion && (
              <circle
                className="paddle__ping-ring"
                r="20"
                fill="none"
                stroke="var(--lime)"
                strokeWidth="2.5"
              />
            )}
            <circle r="7.5" fill="var(--lime)" />
          </g>
        </svg>
      </div>

      <figcaption className="paddle__readout">
        <div className="paddle__readout-head">
          <span className="label-caps text-lime">Live readout</span>
          <span className="paddle__sim">Simulated</span>
        </div>

        <dl className="paddle__metrics">
          <div>
            <dt className="label-caps text-muted">Zone</dt>
            <dd className="data-display">
              {zone.short}
              <span className="paddle__metric-sub">{zone.name}</span>
            </dd>
          </div>
          <div>
            <dt className="label-caps text-muted">Swing</dt>
            <dd className="data-display">
              {zone.speed}
              <span className="paddle__metric-unit">mph</span>
            </dd>
          </div>
          <div>
            <dt className="label-caps text-muted">Shot</dt>
            <dd className="data-display">{zone.shot}</dd>
          </div>
        </dl>

        <div className="paddle__chips" role="group" aria-label="Preview an impact zone">
          {ZONES.map((z, i) => (
            <button
              key={z.id}
              type="button"
              className={`chip ${i === index ? 'is-active' : ''}`}
              aria-pressed={i === index}
              onClick={() => {
                setIndex(i);
                setPinned(true);
              }}
            >
              <span className="chip__code">{z.short}</span>
              <span className="chip__name">{z.name}</span>
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
