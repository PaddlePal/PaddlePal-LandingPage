import { Wordmark } from './Wordmark';

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#app', label: 'The app' },
  { href: '#progress', label: 'Progress' },
  { href: '#faq', label: 'FAQ' },
  { href: '#preorder', label: 'Pre-order' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand-block">
          <p className="footer__brand">
            <Wordmark size={24} />
          </p>
          <p className="body-md text-muted footer__tagline">
            The smart pickleball paddle.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="container footer__legal">
        <p className="body-sm text-muted">
          © {new Date().getFullYear()} PaddlePal. A capstone engineering project.
          Specifications are subject to change before release.
        </p>
        <a className="footer__top body-sm" href="#top">
          Back to top
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
              d="M12 19V5M6 11l6-6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
