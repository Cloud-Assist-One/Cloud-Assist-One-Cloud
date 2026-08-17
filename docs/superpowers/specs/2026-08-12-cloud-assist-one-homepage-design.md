# Cloud Assist One Homepage — Design

## Purpose

A single, polished marketing homepage for Cloud Assist One, a managed multi-cloud
services provider (AWS/Azure/GCP). Structurally inspired by missioncloud.com's
homepage flow (hero → services → value props → process → CTA → footer), but with
100% original copy, original visual design, and no reused assets — only the
company's own logo.

Hosting target: Windows IIS, as a static site with no server-side logic.

## Non-goals

- No additional pages (Services/About/Case Studies/Careers) — homepage only.
- No CMS, no database, no build tooling.
- No fabricated testimonials or partner-certification badges.
- No working form backend — contact is a `mailto:` link/button only.

## Tech approach

Plain static HTML/CSS/JS:
- `index.html` — single page, semantic HTML5, all sections as `<section>` landmarks
- `css/styles.css` — CSS custom properties for palette/spacing, mobile-first responsive rules
- `js/main.js` — vanilla JS for: mobile nav toggle, sticky header on scroll, smooth-scroll to in-page anchors
- `assets/` — logo PNG (provided by user) + a favicon derived from it
- `web.config` — IIS config: default document (`index.html`), static content compression
- `DEPLOY.md` — step-by-step IIS deployment instructions for a beginner

No external CDNs, fonts, or JS libraries — system font stack only, per the user's
"don't add dependencies without asking" rule. Everything needed to render the page
ships in the folder.

## Visual style

- **Palette**: black/near-black (`#0a0a0a`) + white base, matching the existing
  black-and-white logo badge; one accent — electric blue (`#2f6fed` range, exact
  shade to be tuned during build) for buttons, links, icon highlights, and focus states.
- **Typography**: system font stack (`-apple-system, "Segoe UI", Roboto, Helvetica,
  Arial, sans-serif`) — no font downloads.
- **Look**: generous whitespace, soft rounded corners, subtle shadows, modern SaaS
  feel. Abstract CSS/SVG shapes for hero visual interest — no stock photography.
- **Responsive**: mobile-first; hamburger nav below ~768px, grids collapse to a
  single column below ~640px.
- **Accessibility**: semantic landmarks, visible focus states, sufficient contrast
  on the accent blue against both black and white backgrounds, alt text on the logo.

## Page sections (in order)

1. **Header / nav** — logo badge (left), nav links (Services, Why Us, Process,
   Contact), "Get Started" button (right), becomes sticky on scroll, collapses to
   a hamburger menu on mobile.
2. **Hero** — headline built around "Build. Optimize. Secure." + one-sentence
   subheadline positioning Cloud Assist One as a managed multi-cloud partner.
   Two CTAs: "Get Started" (scrolls to Contact) and "See Services" (scrolls to
   Services). Abstract geometric graphic (CSS/SVG) on the side, no photos.
3. **Tech strip** — one line of text: "Multi-cloud expertise: AWS · Azure ·
   Google Cloud · Kubernetes" — plain text, not vendor logos/badges (avoids
   implying certifications not held).
4. **Services grid** — 4 cards, each with a simple SVG/line icon, title, and
   1–2 sentence description:
   - Cloud Migration
   - Managed Cloud Services
   - Cost Optimization
   - Security & Compliance
5. **Why Cloud Assist One** — 4 value props with short supporting copy:
   - 24/7 monitoring & support
   - Transparent, predictable pricing
   - Senior cloud engineers (no outsourced junior tiers)
   - True multi-cloud flexibility (not locked to one vendor)
6. **Process** — 4 numbered steps tied to the tagline: Assess → Build →
   Optimize → Secure, each with one sentence of description.
7. **CTA banner** — full-width band: "Ready to simplify your cloud?" + a single
   prominent button linking to the Contact section / mailto.
8. **Footer** — logo + tagline, nav link list, contact block (email:
   `info@cloudassistone.com`, phone: `407-388-4747`), copyright line with
   current year.

## Contact mechanism

The "Get Started" / "Contact" CTA is a `mailto:info@cloudassistone.com` link
(optionally pre-filled subject line, e.g. "Cloud Assist One — Getting Started").
Phone number is also displayed as a `tel:` link in the footer. No form, no
server-side processing, no third-party form service.

## IIS deployment

- `web.config` sets `index.html` as the default document and enables static
  compression; no rewrite rules or app pool changes needed since there's no
  server-side code.
- `DEPLOY.md` documents: copying the site folder to `C:\inetpub\wwwroot\<sitename>`
  (or wherever IIS is configured to serve from), creating/binding a site in IIS
  Manager, and confirming static content MIME types are enabled (they are, by
  IIS default, for html/css/js/png).

## Testing / verification

- Load `index.html` directly in a browser and via a local IIS binding to confirm
  it renders correctly and matches the design.
- Use Chrome DevTools to check responsive breakpoints (mobile/tablet/desktop),
  console errors, and basic accessibility (contrast, landmarks, focus order).
- Confirm `mailto:`/`tel:` links fire correctly.
