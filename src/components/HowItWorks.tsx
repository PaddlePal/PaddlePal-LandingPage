import { Reveal } from './Reveal';

const STEPS = [
  {
    n: '01',
    kicker: 'Paddle',
    title: 'Sensors read the hit',
    body: 'Force sensors bonded to the paddle face and a 6-axis motion sensor in the handle sample the moment of impact — contact zone, force, and the swing that got you there.',
    icon: (
      <>
        <ellipse cx="12" cy="9.5" rx="6" ry="7" />
        <circle cx="12" cy="9.5" r="2" fill="currentColor" stroke="none" />
        <path d="M12 16.5V21" />
      </>
    ),
  },
  {
    n: '02',
    kicker: 'Radio',
    title: 'Bluetooth sends it over',
    body: 'The onboard microcontroller packs each shot into a compact packet and streams it to your phone over Bluetooth Low Energy, shot by shot, with no lag you can feel.',
    icon: (
      <>
        <path d="M8.5 8L15.5 15.5L12 19V5l3.5 3.5L8.5 16" />
      </>
    ),
  },
  {
    n: '03',
    kicker: 'Phone',
    title: 'The app makes it useful',
    body: 'PaddlePal Connect turns the stream into a live impact map, swing metrics and shot breakdown — then saves the session so you can compare it to every one before it.',
    icon: (
      <>
        <rect x="6" y="2.5" width="12" height="19" rx="3" />
        <path d="M9.5 18.5h5" />
      </>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="section section--alt" id="how">
      <div className="container">
        <Reveal as="header" className="section__head" stagger>
          <span className="label-caps text-lime">How it works</span>
          <h2 className="headline-lg">Paddle to phone in three steps.</h2>
          <p className="body-lg text-muted section__lede">
            One signal path, start to finish. No dongles in the middle, nothing
            to press mid-rally.
          </p>
        </Reveal>

        <Reveal as="ol" className="steps" stagger>
          {STEPS.map((step) => (
            <li className="step" key={step.n}>
              <div className="step__node" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {step.icon}
                </svg>
              </div>

              <div className="step__body">
                <p className="step__meta">
                  <span className="step__n data-display">{step.n}</span>
                  <span className="label-caps text-cyan">{step.kicker}</span>
                </p>
                <h3 className="headline-md">{step.title}</h3>
                <p className="body-md text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
