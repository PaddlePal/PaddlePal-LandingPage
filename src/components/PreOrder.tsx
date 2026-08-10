import { useState, type FormEvent } from 'react';

/**
 * Must match the `name` on the hidden static form in index.html, or Netlify
 * will reject the submission with a 404.
 */
const FORM_NAME = 'preorder';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Netlify expects submissions as URL-encoded key/value pairs. */
function encode(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

export function PreOrder() {
  const [email, setEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');

    try {
      // Netlify's form handler intercepts POSTs to any path on the site; "/"
      // is the convention. The SPA redirect in netlify.toml does not apply to
      // these because the form handler runs first.
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': FORM_NAME,
          email,
          'bot-field': botField,
        }),
      });

      if (!response.ok) {
        throw new Error(`Netlify returned ${response.status}`);
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Pre-order submission failed', error);
      setStatus('error');
    }
  }

  return (
    <section className="section preorder" id="preorder">
      <div className="preorder__glow" aria-hidden="true" />
      <div className="container container--narrow">
        <div className="card preorder__card">
          <span className="label-caps text-lime">Pre-order</span>
          <h2 className="headline-lg preorder__title">
            Be first on the court with one.
          </h2>
          <p className="body-lg text-muted preorder__sub">
            Leave your email and we'll send you the ship date and price before
            anyone else, plus first claim on the opening production run. No
            payment now, no commitment, and we won't spam you.
          </p>

          {status === 'success' ? (
            <div className="preorder__success" role="status">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path
                  d="M4 12.5l5 5L20 6.5"
                  fill="none"
                  stroke="var(--lime)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <p className="headline-md">You're on the list.</p>
                <p className="body-md text-muted">
                  We'll be in touch as soon as pre-orders open.
                </p>
              </div>
            </div>
          ) : (
            <form
              className="preorder__form"
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              noValidate
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />

              {/* Honeypot: hidden from users, irresistible to bots. */}
              <p className="visually-hidden" aria-hidden="true">
                <label>
                  Don't fill this out if you're human
                  <input
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                  />
                </label>
              </p>

              <label className="visually-hidden" htmlFor="preorder-email">
                Email address
              </label>
              <div className="preorder__row">
                <input
                  id="preorder-email"
                  className="input"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'submitting'}
                />
                <button
                  className="btn btn--primary"
                  type="submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Reserve my spot'}
                </button>
              </div>

              {status === 'error' ? (
                <p className="preorder__error body-md" role="alert">
                  Something went wrong on our end. Try again in a moment, or
                  email us directly.
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
