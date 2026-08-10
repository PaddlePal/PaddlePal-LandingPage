import { ImageSlot } from './ImageSlot';

const SCREENS = [
  {
    src: '/images/app-live.png',
    alt: 'PaddlePal Connect live session screen showing the impact heatmap',
    caption: 'Live session',
    hint: '1170 × 2532 (iPhone screenshot)',
  },
  {
    src: '/images/app-stats.png',
    alt: 'PaddlePal Connect analytics screen showing swing speed over time',
    caption: 'Shot analytics',
    hint: '1170 × 2532 (iPhone screenshot)',
  },
  {
    src: '/images/app-history.png',
    alt: 'PaddlePal Connect session history list',
    caption: 'Session history',
    hint: '1170 × 2532 (iPhone screenshot)',
  },
];

export function AppPreview() {
  return (
    <section className="section" id="app">
      <div className="container">
        <header className="section__head">
          <span className="label-caps text-lime">The app</span>
          <h2 className="headline-lg">PaddlePal Connect.</h2>
          <p className="body-lg text-muted section__lede">
            Your paddle's companion app. Pair once, then it picks up
            automatically every time you step on court.
          </p>
        </header>

        <div className="screens">
          {SCREENS.map((screen) => (
            <figure className="screen" key={screen.src}>
              <div className="screen__frame">
                <ImageSlot
                  src={screen.src}
                  alt={screen.alt}
                  aspect="9 / 19.5"
                  hint={screen.hint}
                />
              </div>
              <figcaption className="label-caps text-muted">
                {screen.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="body-md text-muted screens__note">
          iOS first. Android is planned once the first run ships.
        </p>
      </div>
    </section>
  );
}
