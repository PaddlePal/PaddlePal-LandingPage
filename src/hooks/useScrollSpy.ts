import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently occupying the reading position.
 *
 * Uses a band just under the sticky nav rather than "whatever is intersecting":
 * with sections taller than the viewport, several are intersecting at once and
 * a naive observer flickers between them.
 */
export function useScrollSpy(ids: string[], offset = 96): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        // The last section whose top has passed the reading line wins.
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }

      // At the very bottom the final section may never reach the line; claim it
      // so the nav doesn't get stuck one item short.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return active;
}
