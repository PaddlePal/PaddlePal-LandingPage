import { Reveal } from './Reveal';

/**
 * Honest progress instead of a fabricated waitlist counter.
 *
 * A pre-launch page needs credibility, and the usual lever — "join 4,000
 * others" — would be a number we'd be inventing. Showing where the build
 * actually is does the same job and survives scrutiny.
 *
 * Each state below restates something the FAQ already commits to. If the real
 * status moves, edit this list; don't let it drift ahead of the hardware.
 */
const MILESTONES = [
  {
    title: 'Sensor prototype',
    body: 'Force sensors and the 6-axis motion unit reading real impacts off a paddle face.',
    state: 'done' as const,
  },
  {
    title: 'Firmware & BLE link',
    body: 'Shots packetised on-paddle and streaming to a phone over Bluetooth Low Energy.',
    state: 'done' as const,
  },
  {
    title: 'Shelf-Ready Product',
    body: 'Hardware, electronics, and paddle build fully validated and ready for production.',
    state: 'done' as const,
  },
  {
    title: 'First production run',
    body: 'Pricing and ship date go to the pre-order list before they go public.',
    state: 'active' as const,
  },
];

const STATE_LABEL = {
  done: 'Complete',
  active: 'In progress',
  next: 'Next',
} as const;

export function BuildStatus() {
  return (
    <section className="section section--alt" id="progress">
      <div className="container">
        <Reveal as="header" className="section__head" stagger>
          <span className="label-caps text-lime">Where we are</span>
          <h2 className="headline-lg">A capstone build, in the open.</h2>
          <p className="body-lg text-muted section__lede">
            No launch-date theatre. Here's what's finished, what we're testing
            now, and what the pre-order list unlocks.
          </p>
        </Reveal>

        <Reveal as="ol" className="milestones" stagger>
          {MILESTONES.map((m) => (
            <li className={`milestone milestone--${m.state}`} key={m.title}>
              <span className="milestone__marker" aria-hidden="true">
                {m.state === 'done' ? (
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path
                      d="M4 12.5l5.2 5L20 6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              <div className="milestone__body">
                {/* Text label, not colour alone — the state has to survive
                    greyscale and colour-blind viewing. */}
                <span className="milestone__state label-caps">
                  {STATE_LABEL[m.state]}
                </span>
                <h3 className="headline-md">{m.title}</h3>
                <p className="body-md text-muted">{m.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
