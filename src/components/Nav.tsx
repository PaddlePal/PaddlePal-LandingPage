import { useEffect, useId, useRef, useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Wordmark } from './Wordmark';

const LINKS = [
  { id: 'features', label: 'Features' },
  { id: 'how', label: 'How it works' },
  { id: 'app', label: 'The app' },
  { id: 'faq', label: 'FAQ' },
];

const SECTION_IDS = LINKS.map((l) => l.id);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the sheet and returns focus to the control that opened it,
  // so keyboard users don't get dropped at the top of the document.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" aria-label="PaddlePal, back to top">
          <Wordmark />
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : undefined}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="btn btn--primary btn--sm nav__cta" href="#preorder">
            Reserve
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`nav__burger-box ${open ? 'is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* Rendered always (not conditionally) so the collapse animates out and
          `aria-controls` always points at a real element. */}
      <div
        id={panelId}
        className={`nav__sheet ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <nav className="nav__sheet-links" aria-label="Sections">
          {LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            className="btn btn--primary nav__sheet-cta"
            href="#preorder"
            onClick={() => setOpen(false)}
          >
            Reserve your paddle
          </a>
        </nav>
      </div>
    </header>
  );
}
