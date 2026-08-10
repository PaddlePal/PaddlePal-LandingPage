import { useState } from 'react';

interface ImageSlotProps {
  /** Path under /public, e.g. "/images/paddle-hero.png". */
  src: string;
  /** Alt text used once the real image exists. */
  alt: string;
  /** Intrinsic pixel width of `src` — reserves space so nothing shifts (CLS). */
  width: number;
  /** Intrinsic pixel height of `src`. */
  height: number;
  /**
   * Optional modern-format srcset, e.g.
   * `{ type: 'image/webp', srcSet: '/x@585.webp 585w, /x.webp 780w' }`.
   * Browsers that don't support the type fall through to `src`.
   */
  source?: { type: string; srcSet: string };
  /** `sizes` hint for the responsive srcset. Ignored when `source` is absent. */
  sizes?: string;
  /** Short hint shown in the placeholder while the file is missing. */
  hint?: string;
  /** `eager` for anything above the fold. */
  loading?: 'lazy' | 'eager';
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
export function ImageSlot({
  src,
  alt,
  width,
  height,
  source,
  sizes,
  hint,
  loading = 'lazy',
  className,
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`image-slot image-slot--empty ${className ?? ''}`}
        style={{ aspectRatio: `${width} / ${height}` }}
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

  const img = (
    <img
      className={`image-slot ${className ?? ''}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={source ? sizes : undefined}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );

  if (!source) return img;

  return (
    <picture>
      <source type={source.type} srcSet={source.srcSet} sizes={sizes} />
      {img}
    </picture>
  );
}
