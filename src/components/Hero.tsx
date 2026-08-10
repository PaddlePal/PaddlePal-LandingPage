import { PaddleDiagram } from './PaddleDiagram';

const STATS = [
  { value: '5', label: 'Impact zones' },
  { value: '100Hz', label: 'Motion sampling' },
  { value: 'BLE', label: 'Wireless to phone' },
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="pill label-caps">
            <span className="pill__dot" aria-hidden="true" />
            Launching soon
          </span>

          <h1 className="display-lg hero__title">
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
            </a>
            <a className="btn btn--ghost" href="#how">
              See how it works
            </a>
          </div>

          <dl className="hero__stats">
            {STATS.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <dt className="label-caps text-muted">{stat.label}</dt>
                <dd className="hero__stat-value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual">
          <PaddleDiagram />
        </div>
      </div>
    </section>
  );
}
