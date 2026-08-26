# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing website for Cloud Assist One, a managed multi-cloud services company. Plain static HTML/CSS/JS — no framework, no build step, no package.json, no bundler, and no external CDNs/fonts/libraries. This is a deliberate constraint, not an oversight: the site must deploy by copying the folder as-is into a Windows IIS site root, with zero runtime dependencies. Do not introduce a framework, build tool, or CDN-hosted dependency without checking with the user first.

## Structure

- `index.html` — the homepage (nav, hero, tech strip, services, why-us, ROI calculator, process steps, CTA banner, footer)
- `process.html` — a page holding a large detail infographic; reached from the (smaller) version of the same image in the homepage hero
- `clients.html` — a page for client logos/testimonials, currently placeholder content only ("coming soon" cards) pending real clients
- `contact.html` — the contact form reached from every "Get Started" CTA (see Contact mechanism below)
- `api/contact.js` — Vercel serverless function that emails the contact form; the site's only server-side file
- All four pages share the same header/nav/footer markup (hand-duplicated — there's no templating layer, so header/nav/footer edits must be applied to all four files)
- `css/styles.css` — single stylesheet for all pages
- `js/main.js` — single script for all pages: mobile nav toggle, sticky header on scroll, footer year, and the ROI calculator's live math. The ROI block is guarded with `if (roiSpend && roiPercent) { ... }` because only `index.html` has those elements — the other pages load the same script but skip that block. Keep any future page-specific JS behind a similar existence check rather than splitting into multiple script files.
- `assets/` — images (logo, hero/process infographics). `cao-logo.png` is non-square; any place it's sized via `<img width/height>` needs a matching CSS rule to preserve its aspect ratio (see `.nav__logo img` and `.footer__brand img` in `css/styles.css` for the pattern).
- `web.config` — IIS config: sets `index.html` as the default document and enables static compression. No rewrite rules, no server-side logic.
- `DEPLOY.md` — IIS deployment steps; keep in sync with `web.config` if that file changes.
- `docs/PRD.md` — product requirements doc (goals, non-goals, page/section breakdown, design constraints, status). Check here before changing scope or design direction.
- `docs/superpowers/specs/` and `docs/superpowers/plans/` — the original design spec and implementation plan for the homepage build, from a Superpowers skill-driven session.

## Contact mechanism

"Get Started" CTAs across all pages link to `contact.html`, which holds the contact form (first name, last name, company, email, phone). The form posts JSON to `/api/contact`, a Vercel serverless function that emails the enquiry through Resend.

This is the site's **only** server-side code, added deliberately in place of the previous `mailto:` CTAs. Two consequences worth knowing:

- It requires `RESEND_API_KEY` and `CONTACT_EMAIL_FROM` (a sender on a Resend-verified domain) as environment variables in the Vercel project; `CONTACT_EMAIL_TO` overrides the recipient. Without them the endpoint returns a 500 telling the visitor to email instead — the page still works, the send doesn't.
- **The form does not work under the IIS deployment path** described above, which serves static files only and has no way to run `api/contact.js`. On IIS the page renders and the fallback `mailto:`/`tel:` links at the bottom of the form still work, but submissions fail. Vercel is the deployment target for the working form.

`api/contact.js` is CommonJS (`module.exports`) on purpose: with no `package.json`, Vercel's Node runtime treats `.js` as CommonJS and ESM syntax would fail to parse.

Footer contact links remain `mailto:info@cloudassistone.com` / `tel:+14073884747`. Don't add a third-party form service or database without explicit direction.

## Verifying changes (no test suite exists)

There's no linter or test runner in this repo. To sanity-check changes before committing:
- Open `index.html` / `process.html` / `clients.html` directly in a browser, or serve locally with `python -m http.server` from the project root and browse to `http://localhost:8000/`.
- Check JS syntax: `node --check js/main.js`, `node --check js/contact.js`, `node --check api/contact.js`
- After editing HTML, confirm tags still balance (no dedicated tool is wired up for this — a quick regex-based tag-balance pass in Python or a browser console check works).
- Cross-check that any element ID/class referenced in `js/main.js` or `css/styles.css` actually exists across all three HTML pages, since the script and stylesheet are shared.

## Git repository caution

This repository's root is `C:\Users\mgoli` — the user's entire home directory, not this project folder. Do not use `git add -A`, `git add .`, or any broad-add command here. Always `git add` exact file paths inside this project folder, and run `git status` on specific paths rather than the whole tree to avoid touching unrelated personal files.
