# PaddlePal — Landing Page

Marketing + pre-order landing page for the PaddlePal smart pickleball paddle.
Companion to the [PaddlePal Connect](../PaddlePal-App) mobile app.

**Stack:** React 18 · TypeScript (strict) · Vite 5 · Netlify (hosting + Forms)

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
```

---

## Deploying

### 1. Create the GitHub repo and push

From this directory:

```bash
git init
git add -A
git commit -m "Initial commit: PaddlePal landing page"
git branch -M main
gh repo create PaddlePal-LandingPage --public --source=. --remote=origin --push
```

No `gh` CLI? Create an **empty** repo named `PaddlePal-LandingPage` on
github.com (no README, no .gitignore — this repo already has both), then:

```bash
git remote add origin https://github.com/<your-username>/PaddlePal-LandingPage.git
git push -u origin main
```

### 2. Connect Netlify

1. Netlify → **Add new site** → **Import an existing project** → GitHub →
   pick `PaddlePal-LandingPage`.
2. Build settings are read from `netlify.toml`, so leave them alone:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy. Every push to `main` redeploys automatically.

### 3. Turn on form notifications

Pre-order emails land in **Netlify → your site → Forms → `preorder`**.

To get notified instead of having to check:
**Forms → Form notifications → Add notification → Email notification**, and
point it at your address.

Free tier allows **100 form submissions per month**. Beyond that, submissions
are blocked until the next cycle or you upgrade — worth watching if the page
gets traction.

---

## How the pre-order form works

Netlify's build bot only detects forms present in the **deployed static HTML**.
A React-rendered form is invisible to it, so there are two pieces that must
stay in sync:

| Piece | File | Role |
| --- | --- | --- |
| Hidden static form | `index.html` | Registers the form + its fields with Netlify at build time |
| Real UI | `src/components/PreOrder.tsx` | What users see; `fetch` POSTs URL-encoded data to `/` |

**If you add or rename a field, change it in both places.** A field that exists
only in the React component is silently dropped from submissions.

Spam protection is a `bot-field` honeypot (declared via `netlify-honeypot` in
`index.html`). Add reCAPTCHA from the Netlify UI if the honeypot stops holding.

> The form only works on a deployed Netlify site (or `netlify dev`). On
> `npm run dev` the POST to `/` will fail and you'll see the error state — that
> is expected, not a bug.

---

## Adding images

`ImageSlot` renders a labelled dashed placeholder when a file is missing and
swaps in the real image automatically once it exists. **No code change needed —
just drop files in `public/images/` with these exact names:**

| File | Dimensions | Used for |
| --- | --- | --- |
| `app-live.png` | 1170 × 2532 | App preview — live session screen |
| `app-stats.png` | 1170 × 2532 | App preview — shot analytics screen |
| `app-history.png` | 1170 × 2532 | App preview — session history screen |
| `og-image.png` | 1200 × 630 | Social share card (link previews) |

iPhone screenshots are already 1170 × 2532. Compress before committing
(TinyPNG or `pngquant`) — these are the heaviest thing on the page.

**Want a real paddle photo in the hero?** Replace `<PaddleDiagram />` in
`src/components/Hero.tsx` with:

```tsx
<ImageSlot
  src="/images/paddle-hero.png"
  alt="The PaddlePal smart pickleball paddle"
  aspect="3 / 4"
/>
```

A transparent-background PNG at roughly 900 × 1200 works best against the dark
canvas.

---

## Structure

```
index.html                  Meta tags, fonts, hidden Netlify form
netlify.toml                Build config, SPA redirect, asset caching
public/
  favicon.svg
  images/                   Drop real assets here (see table above)
src/
  main.tsx                  Entry point
  App.tsx                   Section composition
  components/
    Nav.tsx                 Sticky header
    Hero.tsx                Headline, CTA, stat row
    PaddleDiagram.tsx       SVG paddle with 4 impact zones
    Features.tsx            6 feature cards
    HowItWorks.tsx          3-step sensor → BLE → app explainer
    AppPreview.tsx          Phone-framed screenshots
    Faq.tsx                 Accordion (native <details>)
    PreOrder.tsx            Email capture + Netlify submission
    Footer.tsx
    ImageSlot.tsx           Image with placeholder fallback
  styles/
    tokens.css              Design tokens from PaddlePal-App/DESIGN.md
    app.css                 Component styles
```

## Design system

Colors, type scale, radii and spacing are ported from
`PaddlePal-App/DESIGN.md` ("Kinetic Precision") into CSS variables in
`src/styles/tokens.css`. **If the app's tokens change, update that file too** —
it's a manual copy, not a shared package.

## Copy conventions

Positioning is "launching soon" without committing to a price or a ship date.
The FAQ says pricing and battery life aren't finalised, and the footer notes
this is a capstone project with specs subject to change. Keep it that way until
those numbers are real — it's easier to defend and easier to update.
