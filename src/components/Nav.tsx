import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#app', label: 'The app' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top">
          <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
            <ellipse
              cx="16"
              cy="13"
              rx="7.5"
              ry="8.5"
              fill="none"
              stroke="var(--lime)"
              strokeWidth="2.2"
            />
            <circle cx="16" cy="13" r="2.6" fill="var(--lime)" />
            <path
              d="M16 21.5v6"
              stroke="var(--lime)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
          <span>PaddlePal</span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--primary btn--sm" href="#preorder">
          Pre-order
        </a>
      </div>
    </header>
  );
}
