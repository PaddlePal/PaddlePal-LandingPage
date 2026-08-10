import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Render as something other than a div (`ol`, `section`, `figure`…). */
  as?: ElementType;
  className?: string;
  /**
   * Stagger direct children instead of the wrapper itself. Delay per child is
   * capped at 8 steps — past that the tail reads as lag, not rhythm.
   */
  stagger?: boolean;
  /** Extra delay in ms before this element starts. */
  delay?: number;
  id?: string;
  'aria-label'?: string;
}

const STAGGER_STEP_MS = 70;
const MAX_STAGGER_STEPS = 8;

/**
 * Scroll-triggered enter animation: 16px fade-up, ~520ms, power2-style easing.
 *
 * Deliberately CSS + IntersectionObserver rather than GSAP — the whole effect
 * is one transition on one property pair, and a scroll library would be the
 * heaviest thing on the page.
 *
 * Content is *not* hidden by default in the markup. `.reveal` only takes on its
 * hidden state once `.reveal--armed` is applied from JS, so with JS disabled or
 * still parsing, everything renders visible and crawlable.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  stagger = false,
  delay = 0,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour reduced motion by never arming: the element stays in its natural
    // visible state and no observer is created.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          observer.disconnect();
        }
      },
      // 12% up from the bottom edge: the element has clearly entered before it
      // starts, so the animation is never half-finished on arrival.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = [
    'reveal',
    armed && 'reveal--armed',
    shown && 'is-visible',
    stagger && 'reveal--stagger',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export { STAGGER_STEP_MS, MAX_STAGGER_STEPS };
