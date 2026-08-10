import { useState } from 'react';

interface ImageSlotProps {
  /** Path under /public, e.g. "/images/paddle-hero.png". */
  src: string;
  /** Alt text used once the real image exists. */
  alt: string;
  /** CSS aspect-ratio, e.g. "4 / 3" or "9 / 19.5". */
  aspect: string;
  /** Short hint shown in the placeholder while the file is missing. */
  hint?: string;
  className?: string;
}

/**
 * Renders `src` if the file exists, otherwise a styled placeholder naming the
 * file the deploy is waiting on. Lets the page ship before art is ready —
 * drop the file into /public/images and it swaps in with no code change.
 *
 * Placeholders are visible in production by design: a silently-broken image is
 * worse than an obvious "asset pending" box.
 */
export function ImageSlot({ src, alt, aspect, hint, className }: ImageSlotProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`image-slot image-slot--empty ${className ?? ''}`}
        style={{ aspectRatio: aspect }}
        role="img"
        aria-label={alt}
      >
        <div className="image-slot__inner">
          <span className="label-caps text-lime">Asset pending</span>
          <code className="image-slot__path">{src}</code>
          {hint ? <span className="image-slot__hint">{hint}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <img
      className={`image-slot ${className ?? ''}`}
      style={{ aspectRatio: aspect }}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
