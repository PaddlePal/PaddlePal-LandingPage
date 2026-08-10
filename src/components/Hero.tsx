import { PaddleDiagram } from './PaddleDiagram';
import { Reveal } from './Reveal';

const STATS = [
  { value: '4', unit: '', label: 'Impact zones' },
  { value: '100', unit: 'Hz', label: 'Motion sampling' },
  { value: 'BLE', unit: '', label: 'Wireless to phone' },
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="container hero__inner">
        <Reveal className="hero__copy" stagger>
          <span className="pill label-caps">
            <span className="pill__dot" aria-hidden="true" />
            Launching soon
          </span>

          <h1 className="display-xl hero__title">
            Every shot,
            <br />
            <span className="hero__title-accent">measured.</span>
          </h1>

          <p className="body-lg text-muted hero__sub">
            PaddlePal is a pickleball paddle with sensors built into the face. It
            knows where the ball hit, how hard you swung, and what shot you just
            played — and streams all of it to your phone as you play.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#preorder">
              Reserve your paddle
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className="btn btn--ghost" href="#how">
              See how it works
            </a>
          </div>

          <dl className="hero__stats">
            {STATS.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <dd className="hero__stat-value data-display">
                  {stat.value}
                  {stat.unit && <span className="hero__stat-unit">{stat.unit}</span>}
                </dd>
                <dt className="label-caps text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="hero__visual" delay={120}>
          <PaddleDiagram />
        </Reveal>
      </div>
    </section>
  );
}
