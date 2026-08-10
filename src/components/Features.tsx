import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Feature {
  title: string;
  body: string;
  /** Bento column span at desktop, out of 12. */
  span: 5 | 6 | 7;
  icon: ReactNode;
  /** Optional inline visual — only the lead card carries one. */
  visual?: ReactNode;
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Miniature of the four-zone heatmap, for the lead card. */
function ZoneMini() {
  return (
    <div className="zone-mini" aria-hidden="true">
      {[
        { cls: 'zone-mini__cell zone-mini__cell--tip', v: 12 },
        { cls: 'zone-mini__cell zone-mini__cell--left', v: 23 },
        { cls: 'zone-mini__cell zone-mini__cell--core', v: 58 },
        { cls: 'zone-mini__cell zone-mini__cell--right', v: 7 },
      ].map((cell) => (
        <div className={cell.cls} key={cell.cls} style={{ '--v': cell.v } as React.CSSProperties}>
          <span className="zone-mini__pct data-display">{cell.v}%</span>
        </div>
      ))}
    </div>
  );
}

const FEATURES: Feature[] = [
  {
    title: 'Find your sweet spot',
    body: 'Pressure sensors across the paddle face map every contact to one of four zones. See a heatmap of where you actually make contact — not where you think you do.',
    span: 7,
    visual: <ZoneMini />,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Real swing metrics',
    body: 'An onboard motion sensor captures swing speed, acceleration and paddle angle through the whole stroke — so power and consistency become numbers, not feelings.',
    span: 5,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 17c3.5 0 4.5-10 8-10s4.5 6 7 6" />
        <path d="M17 13h4v4" />
      </svg>
    ),
  },
  {
    title: 'Shot recognition',
    body: 'Dinks, drives, drops and overheads are classified automatically from the sensor signature. No tagging, no video review — just play.',
    span: 5,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 12l4 4 12-12" />
        <path d="M4 19h9" />
      </svg>
    ),
  },
  {
    title: 'Session history',
    body: 'Every session is saved and charted. Watch your accuracy, power and shot mix trend over weeks instead of guessing whether you improved.',
    span: 7,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
    ),
  },
  {
    title: 'Instant haptic feedback',
    body: 'A vibration motor in the handle confirms clean sweet-spot contact the moment it happens — feedback while the shot is still in your hands.',
    span: 6,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="9" y="3" width="6" height="18" rx="3" />
        <path d="M4.5 9v6M19.5 9v6" />
      </svg>
    ),
  },
  {
    title: 'Plays like a normal paddle',
    body: 'The electronics sit inside the core. No dongles, no clip-ons, no weight where it changes your swing. Charge it, pair it, forget it.',
    span: 6,
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="2" y="8" width="16" height="9" rx="3" />
        <path d="M21 11.5v2" />
        <path d="M6 12.5h5" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <Reveal as="header" className="section__head" stagger>
          <span className="label-caps text-lime">Features</span>
          <h2 className="headline-lg">
            The feedback a coach gives you — on every single shot.
          </h2>
          <p className="body-lg text-muted section__lede">
            Most players practise for years without objective data on their
            contact point. PaddlePal puts it on your phone in real time.
          </p>
        </Reveal>

        <Reveal className="bento" stagger>
          {FEATURES.map((feature) => (
            <article
              className={`card feature feature--${feature.span}${
                feature.visual ? ' feature--lead' : ''
              }`}
              key={feature.title}
            >
              <div className="feature__icon" aria-hidden="true">
                {feature.icon}
              </div>
              <div className="feature__text">
                <h3 className="headline-md">{feature.title}</h3>
                <p className="body-md text-muted">{feature.body}</p>
              </div>
              {feature.visual}
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
