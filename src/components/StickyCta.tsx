import { useEffect, useState } from 'react';

/**
 * Mobile-only bottom CTA bar.
 *
 * The waitlist pattern wants the email capture reachable at all times, but the
 * desktop nav already carries a persistent Reserve button — duplicating it
 * there would just be clutter. This appears once the hero has scrolled away and
 * retires again over the pre-order section so it never covers the real form.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById('preorder');

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const formInView = target
        ? target.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(pastHero && !formInView);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={`sticky-cta ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="sticky-cta__text">
        <span className="label-caps text-lime">Launching soon</span>
        <span className="body-sm text-muted">Price &amp; ship date, first.</span>
      </div>
      <a className="btn btn--primary btn--sm" href="#preorder" tabIndex={visible ? 0 : -1}>
        Reserve
      </a>
    </div>
  );
}
