# Cloud Assist One Website — Product Requirements Document

## Overview

A marketing website for Cloud Assist One, a managed multi-cloud services company (AWS/Azure). The site is structurally inspired by missioncloud.com's homepage flow (hero → services → value props → process → CTA → footer), with 100% original copy, original visual design, and no reused assets other than the company's own logo.

**Tagline:** Build. Optimize. Secure.

## Goals

- Establish a credible, professional web presence for Cloud Assist One.
- Communicate the core service offering (managed multi-cloud services) and value proposition clearly enough to drive contact.
- Give prospects a concrete, interactive way to estimate potential savings (the ROI calculator), rather than relying on vague claims.
- Deploy cleanly to the client's existing infrastructure: a Windows IIS server, with no ongoing hosting cost beyond that.

## Non-goals (v1)

- No CMS, no database, no working form backend, no third-party form service.
- No fabricated testimonials or vendor-partner certification badges — only claims the company can actually stand behind.
- No pages beyond the homepage and the process detail page (About, Case Studies, Careers, Blog were explicitly deferred at scoping time).
- No analytics/tracking integration (not requested).

## Target audience

Decision-makers at growing businesses currently managing (or struggling to manage) cloud infrastructure on AWS and/or Azure, who are evaluating whether to bring in a managed services partner.

## Technical constraints

- **Static site only**: plain HTML/CSS/JS. No framework, no build step, no bundler, no external CDNs or web fonts. System font stack only.
- **Hosting**: Windows IIS. Must deploy by copying the site folder into an IIS site root; `web.config` handles the default document and static compression. No app pool or .NET runtime requirements.
- **Contact**: `mailto:`/`tel:` links only — no server-side form processing.
- **Dependencies**: none added without explicit sign-off from the site owner.

## Pages & features

### `index.html` (homepage)

| Section | Content |
|---|---|
| Header/nav | Logo badge, links to Services/Why Us/Process/Contact, "Get Started" CTA, sticky on scroll, mobile hamburger menu |
| Hero | Headline "Build. Optimize. Secure. Your Cloud, Simplified.", one-line positioning subheadline, two CTAs (Get Started, See Services), a process infographic image that links to `process.html` |
| Tech strip | "Deep multi-cloud expertise across AWS and Azure" |
| Services grid | Four cards: Cloud Migration, Managed Cloud Services, Cost Optimization, Security & Compliance |
| Why Cloud Assist One | Four value props: 24/7 monitoring & support, transparent/predictable pricing, senior engineers (not outsourced junior tiers), true multi-cloud flexibility |
| ROI calculator | Interactive: user enters current monthly cloud spend and adjusts a savings slider (10%–40%, default 25%); live-updates estimated monthly and annual savings. Supporting copy: "Industry experts estimate you can save 25% to 40% reduction in total cloud spend with the proper Cloud Service Partner. The overall industry benchmarks suggest that roughly 30% of unoptimized cloud investment is wasted, meaning a comprehensive audit can rapidly recover significant capital." |
| Process | Four steps tied to the tagline: Assess → Build → Optimize → Secure |
| CTA banner | "Ready to simplify your cloud?" + Get Started button |
| Footer | Logo, tagline, nav links, contact (`info@cloudassistone.com`, `407-388-4747`), copyright |

### `process.html` (process detail page)

A dedicated page holding a large, legible version of the "Our Process. Your Cloud." infographic (build/optimize/secure phases across AWS and Azure, with supporting checklists and icons). Shares the same header/nav/footer as the homepage; nav links point back to the homepage's in-page sections. Reached by clicking the (smaller, 60%-scale) version of the same image in the homepage hero.

## Design

- **Palette**: black/near-black + white, matching the company's black-and-white logo badge, with one electric-blue accent for buttons, links, and highlights.
- **Typography**: system font stack — no font downloads.
- **Responsive**: mobile-first; hamburger nav below ~768px, grids collapse to fewer columns on narrower screens.
- **Accessibility target**: WCAG AA contrast on body text, semantic landmarks, visible focus states on all interactive controls, alt text on all images.

## Status

All sections above are implemented and committed. A code review pass (via the code-reviewer agent) found and fixed two accessibility/visual bugs: a distorted footer logo (wrong aspect ratio, later found to also be stretching to the full width of its flex container — fixed with fixed pixel dimensions) and a missing focus indicator on the ROI calculator's spend input. Messaging was also made consistent to "AWS and Azure" throughout (Google Cloud references removed), and the unused `assets/cao-hero-graphic.png` asset was deleted.

No open items remain from the initial build.

## Success criteria

- Loads correctly and matches this spec when opened directly or served via IIS.
- No console errors on either page.
- All `mailto:`/`tel:` links resolve correctly.
- Responsive layout holds with no horizontal overflow across mobile/tablet/desktop widths.
- ROI calculator produces mathematically correct output (`monthly spend × percent = monthly savings`, `× 12` for annual) for any valid input.
