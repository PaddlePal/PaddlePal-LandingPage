export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">PaddlePal</p>
          <p className="body-md text-muted footer__tagline">
            The smart pickleball paddle.
          </p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#app">The app</a>
          <a href="#faq">FAQ</a>
          <a href="#preorder">Pre-order</a>
        </nav>
      </div>

      <div className="container footer__legal">
        <p className="body-md text-muted">
          © {new Date().getFullYear()} PaddlePal. A capstone engineering project.
          Specifications are subject to change before release.
        </p>
      </div>
    </footer>
  );
}
