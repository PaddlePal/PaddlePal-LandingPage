import { Reveal } from './Reveal';

const FAQS = [
  {
    q: 'When does it ship?',
    a: 'The paddle is a shelf-ready product and we expect to open the first production run soon. Everyone on the pre-order list gets the ship date and pricing before it goes public — and first claim on that run.',
  },
  {
    q: 'What does it cost?',
    a: "Pricing isn't locked yet. Joining the pre-order list costs nothing and commits you to nothing; we'll email the price the moment it's set, and you can walk away then.",
  },
  {
    q: 'Which phones does it work with?',
    a: 'PaddlePal Connect launches on iOS and needs a device with Bluetooth Low Energy — iPhone 8 or newer. An Android build is planned after launch.',
  },
  {
    q: 'How long does the battery last?',
    a: 'The paddle battery is rechargeable and targets multiple sessions per charge, with sensors sleeping between rallies. Final numbers will come from validation testing, and we would rather publish a measured figure than a marketing one.',
  },
  {
    q: 'Does the electronics change how it plays?',
    a: 'That was the hard constraint from day one. Components sit inside the paddle core and are laid out to keep balance and swing weight in the normal range for a mid-weight composite paddle.',
  },
  {
    q: 'Do I need my phone out while I play?',
    a: 'No. The paddle buffers shots and syncs when your phone is in range, so you can leave it in your bag and review the session afterwards. Keep it courtside if you want the live view.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Sessions sync to your own account in the cloud so history follows you across devices. We only collect what the app needs to show your stats, and we do not sell it.',
  },
];

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <Reveal as="header" className="section__head" stagger>
          <span className="label-caps text-lime">FAQ</span>
          <h2 className="headline-lg">Questions, answered straight.</h2>
        </Reveal>

        <Reveal className="faq" stagger>
          {FAQS.map((item) => (
            <details className="faq__item" key={item.q}>
              <summary className="faq__q">
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M12 5v14M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              {/* Wrapper exists so the answer can animate its height via
                  grid-template-rows without fighting <details>' own layout. */}
              <div className="faq__panel">
                <p className="body-md text-muted faq__a">{item.a}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
