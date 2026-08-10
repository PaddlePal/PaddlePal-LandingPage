import { ImageSlot } from './ImageSlot';
import { Reveal } from './Reveal';

/**
 * Screenshots ship at 780px wide (2× the ~390px they ever render at) with a
 * 585px WebP for narrow viewports. The 1170px originals live in
 * `assets-src/screenshots/` and are not deployed — see README.
 *
 * Filenames are lowercase on purpose: Netlify serves from a case-sensitive
 * filesystem, so `app-home.PNG` would 404 in production while working locally.
 */
const SHOTS = [
  {
    slug: 'app-home',
    alt: 'PaddlePal Connect home screen showing paddle sensor and session status with a Connect Paddle button',
    caption: 'Pair & start',
    blurb: 'Sensor status at a glance, one tap to begin.',
  },
  {
    slug: 'app-session',
    alt: 'PaddlePal Connect session breakdown showing average power per shot, shots per zone and shots by type as bar charts',
    caption: 'Session breakdown',
    blurb: 'Power, contact zone and shot mix, charted.',
    featured: true,
  },
  {
    slug: 'app-history',
    alt: 'PaddlePal Connect session history list showing past sessions by date and duration',
    caption: 'Session history',
    blurb: 'Every session saved, ready to compare.',
  },
];

const SHOT_W = 780;
const SHOT_H = 1688;

export function AppPreview() {
  return (
    <section className="section" id="app">
      <div className="container">
        <Reveal as="header" className="section__head section__head--center" stagger>
          <span className="label-caps text-lime">The app</span>
          <h2 className="headline-lg">PaddlePal Connect.</h2>
          <p className="body-lg text-muted section__lede">
            Your paddle's companion app. Pair once, then it picks up
            automatically every time you step on court.
          </p>
        </Reveal>

        <Reveal className="screens" stagger>
          {SHOTS.map((shot) => (
            <figure
              className={`screen${shot.featured ? ' screen--featured' : ''}`}
              key={shot.slug}
            >
              <div className="phone">
                <div className="phone__notch" aria-hidden="true" />
                <ImageSlot
                  src={`/images/${shot.slug}.png`}
                  source={{
                    type: 'image/webp',
                    srcSet: `/images/${shot.slug}@585.webp 585w, /images/${shot.slug}.webp 780w`,
                  }}
                  sizes="(max-width: 700px) 70vw, 300px"
                  alt={shot.alt}
                  width={SHOT_W}
                  height={SHOT_H}
                  hint="1170 × 2532 (iPhone screenshot)"
                />
              </div>
              <figcaption className="screen__cap">
                <span className="label-caps">{shot.caption}</span>
                <span className="body-sm text-muted">{shot.blurb}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <p className="body-sm text-muted screens__note">
          iOS first. Android is planned once the first run ships.
        </p>
      </div>
    </section>
  );
}
