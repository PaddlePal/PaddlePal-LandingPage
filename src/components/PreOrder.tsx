import { useId, useRef, useState, type FormEvent } from 'react';

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

/**
 * Deliberately permissive: something@something.tld. Anything stricter starts
 * rejecting addresses that are perfectly valid, and the real check is the
 * confirmation email.
 */
function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Enter your email so we know where to send the details.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return "That doesn't look like a complete email address.";
  }
  return null;
}

const TRUST = [
  'No payment now',
  'No commitment',
  'One email when it matters',
];

export function PreOrder() {
  const [email, setEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [fieldError, setFieldError] = useState<string | null>(null);
  /** Only start validating as they type once they've tried to submit once. */
  const [attempted, setAttempted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const emailId = useId();
  const errorId = `${emailId}-error`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    setAttempted(true);
    const problem = validateEmail(email);
    if (problem) {
      setFieldError(problem);
      inputRef.current?.focus();
      return;
    }

    setFieldError(null);
    setStatus('submitting');

    try {
      // Netlify forms are handled by Netlify edge servers when deployed live.
      // On localhost, simulate a successful submission so local testing works.
      if (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      ) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus('success');
        setEmail('');
        return;
      }

      // Netlify's form handler intercepts POSTs to any path on the site; "/"
      // is the convention. The SPA redirect in netlify.toml does not apply to
      // these because the form handler runs first.
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': FORM_NAME,
          email: email.trim(),
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
        <div className="preorder__card">
          <span className="label-caps text-lime">Pre-order</span>
          <h2 className="headline-lg preorder__title">
            Be first on the court with one.
          </h2>
          <p className="body-lg text-muted preorder__sub">
            Leave your email and we'll send you the ship date and price before
            anyone else, plus first claim on the opening production run.
          </p>

          {status === 'success' ? (
            <div className="preorder__success" role="status">
              <span className="preorder__success-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M4 12.5l5 5L20 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
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

              <div className="preorder__field">
                <label className="preorder__label label-caps" htmlFor={emailId}>
                  Email address
                </label>
                <div className="preorder__row">
                  <input
                    ref={inputRef}
                    id={emailId}
                    className={`input ${fieldError ? 'input--invalid' : ''}`}
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    aria-invalid={fieldError ? true : undefined}
                    aria-describedby={fieldError ? errorId : undefined}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                      if (attempted) setFieldError(validateEmail(e.target.value));
                    }}
                    onBlur={() => {
                      if (attempted || email) setFieldError(validateEmail(email));
                    }}
                    disabled={status === 'submitting'}
                  />
                  <button
                    className="btn btn--primary"
                    type="submit"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="spinner" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      'Reserve my spot'
                    )}
                  </button>
                </div>

                {fieldError ? (
                  <p className="preorder__error body-sm" id={errorId} role="alert">
                    {fieldError}
                  </p>
                ) : null}
              </div>

              {status === 'error' ? (
                <p className="preorder__error body-sm" role="alert">
                  Something went wrong on our end. Try again in a moment, or
                  email us directly.
                </p>
              ) : null}

              <ul className="preorder__trust">
                {TRUST.map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path
                        d="M4 12.5l5 5L20 6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
