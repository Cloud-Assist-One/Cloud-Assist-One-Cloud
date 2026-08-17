# Cloud Assist One Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single, polished static homepage for Cloud Assist One (managed multi-cloud services) that deploys directly to a Windows IIS site with no server-side code.

**Architecture:** One `index.html` with semantic sections, one `css/styles.css`, one `js/main.js` for the three small interactive behaviors (mobile nav toggle, sticky header, footer year), the provided logo in `assets/`, an IIS `web.config`, and a `DEPLOY.md` walkthrough. No frameworks, no build step, no external CDNs/fonts.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, Grid/Flexbox), vanilla JS (ES6). System font stack only.

## Global Constraints

- No external dependencies of any kind (no CDN fonts, no JS libraries, no build tooling) — per user's "don't add dependencies without asking" rule.
- No fabricated testimonials or vendor-partner certification badges.
- Contact is `mailto:info@cloudassistone.com` / `tel:+14073884747` only — no form backend.
- Original copy and original visual assets only — the provided logo (`cao_logo_clean.png`) is the only reused asset; nothing copied from missioncloud.com beyond the general section-ordering idea.
- Site must work by opening `index.html` directly in a browser AND when served by IIS from a folder containing `web.config`.

---

### Task 1: Project scaffold, logo asset, and IIS config

**Files:**
- Create: `assets/cao-logo.png` (copy of the provided logo)
- Create: `web.config`
- Create: `DEPLOY.md`

**Interfaces:**
- Produces: `assets/cao-logo.png` referenced by `index.html` (Task 2) for the nav logo, footer logo, and favicon link.

- [ ] **Step 1: Create the project folder structure and copy the logo**

```bash
mkdir -p "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One/assets"
mkdir -p "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One/css"
mkdir -p "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One/js"
cp "C:/Users/mgoli/OneDrive/Cloud Assist One/cao_logo_clean.png" "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One/assets/cao-logo.png"
```

- [ ] **Step 2: Verify the logo copied correctly**

Run: `ls -la "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One/assets/"`
Expected: `cao-logo.png` present with a non-zero file size matching the source file's size.

- [ ] **Step 3: Write `web.config`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <defaultDocument>
      <files>
        <clear />
        <add value="index.html" />
      </files>
    </defaultDocument>
    <urlCompression doStaticCompression="true" doDynamicCompression="false" />
  </system.webServer>
</configuration>
```

- [ ] **Step 4: Verify `web.config` is well-formed XML**

Run (PowerShell): `[xml](Get-Content "C:\Users\mgoli\OneDrive\Claude Code Development\Cloud Assist One\web.config")`
Expected: no parse errors; command prints the parsed XML structure.

- [ ] **Step 5: Write `DEPLOY.md`**

```markdown
# Deploying Cloud Assist One to IIS

## 1. Enable IIS (if not already installed)
- Windows Server: Server Manager → Add Roles and Features → Web Server (IIS)
- Windows 10/11: Control Panel → Programs → Turn Windows features on or off → check "Internet Information Services"

## 2. Copy site files
Copy the entire project folder contents (`index.html`, `css/`, `js/`, `assets/`, `web.config`) into your IIS site folder, e.g.:

```
C:\inetpub\wwwroot\cloudassistone\
```

## 3. Create the site in IIS Manager
1. Open **IIS Manager** (`inetmgr`)
2. Right-click **Sites** → **Add Website**
3. Site name: `Cloud Assist One`
4. Physical path: `C:\inetpub\wwwroot\cloudassistone`
5. Binding: choose port 80 (or 443 with a certificate) and your hostname
6. Click **OK**

## 4. Verify
- Browse to `http://localhost` (or your bound hostname) and confirm the homepage loads
- Confirm the mobile menu, smooth scrolling, and the "Get Started" / footer email & phone links work

## 5. (Optional) HTTPS
Bind a TLS certificate under **Bindings → Add → https** once you have a certificate for your domain.

No app pool changes and no .NET runtime are required — this is a static HTML/CSS/JS site.
```

- [ ] **Step 6: Commit**

```bash
cd "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One"
git add assets/cao-logo.png web.config DEPLOY.md
git commit -m "Add project scaffold, logo asset, and IIS deployment config"
```

---

### Task 2: Build the full HTML structure (`index.html`)

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: `assets/cao-logo.png` (Task 1)
- Produces: all section IDs and class names that Tasks 3–5 style/script against: `#siteHeader`, `#navToggle`, `#navLinks`, `.nav__link`, `.btn`, `.btn--primary`, `.btn--secondary`, `#services`, `#why-us`, `#process`, `#contact`, `.service-card`, `.why-us__item`, `.process__step`, `.cta-banner`, `.site-footer`, `#year`.

- [ ] **Step 1: Write `index.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cloud Assist One — Build. Optimize. Secure.</title>
<meta name="description" content="Cloud Assist One is a managed multi-cloud services partner helping growing businesses build, optimize, and secure their AWS, Azure, and Google Cloud infrastructure.">
<link rel="icon" type="image/png" href="assets/cao-logo.png">
<link rel="stylesheet" href="css/styles.css">
</head>
<body>
<header class="site-header" id="siteHeader">
  <div class="nav">
    <a href="#top" class="nav__logo">
      <img src="assets/cao-logo.png" alt="Cloud Assist One" width="44" height="44">
      <span class="nav__logo-text">Cloud Assist One</span>
    </a>
    <button class="nav__toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="Toggle navigation menu">
      <span></span><span></span><span></span>
    </button>
    <nav class="nav__links" id="navLinks">
      <a href="#services" class="nav__link">Services</a>
      <a href="#why-us" class="nav__link">Why Us</a>
      <a href="#process" class="nav__link">Process</a>
      <a href="#contact" class="nav__link">Contact</a>
      <a href="mailto:info@cloudassistone.com?subject=Getting%20Started%20with%20Cloud%20Assist%20One" class="btn btn--primary nav__cta">Get Started</a>
    </nav>
  </div>
</header>

<main id="top">
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">Build. Optimize. Secure.<br>Your Cloud, Simplified.</h1>
      <p class="hero__subtitle">Cloud Assist One is a managed multi-cloud services partner helping growing businesses migrate, run, and secure their infrastructure across AWS, Azure, and Google Cloud — without the overhead of an in-house team.</p>
      <div class="hero__actions">
        <a href="mailto:info@cloudassistone.com?subject=Getting%20Started%20with%20Cloud%20Assist%20One" class="btn btn--primary">Get Started</a>
        <a href="#services" class="btn btn--secondary">See Services</a>
      </div>
    </div>
    <div class="hero__visual" aria-hidden="true">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="160" class="hero__ring hero__ring--1"/>
        <circle cx="200" cy="200" r="120" class="hero__ring hero__ring--2"/>
        <circle cx="200" cy="200" r="80" class="hero__ring hero__ring--3"/>
      </svg>
    </div>
  </section>

  <section class="tech-strip">
    <p>Multi-cloud expertise: <strong>AWS</strong> · <strong>Azure</strong> · <strong>Google Cloud</strong> · <strong>Kubernetes</strong></p>
  </section>

  <section class="services" id="services">
    <h2 class="section-title">What We Do</h2>
    <p class="section-subtitle">Four ways we keep your cloud running the way it should.</p>
    <div class="services__grid">
      <article class="service-card">
        <div class="service-card__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 32a8 8 0 0 1 1-16 10 10 0 0 1 19-3 7 7 0 0 1 2 13.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24 20v14M18 28l6-6 6 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="service-card__title">Cloud Migration</h3>
        <p class="service-card__desc">Move critical workloads to the cloud with a plan built around your business, not just your infrastructure. We handle the heavy lifting from assessment to cutover.</p>
      </article>
      <article class="service-card">
        <div class="service-card__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="24" cy="24" r="7"/>
            <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4.2 4.2M32.8 32.8 37 37M37 11l-4.2 4.2M15.2 32.8 11 37" stroke-linecap="round"/>
          </svg>
        </div>
        <h3 class="service-card__title">Managed Cloud Services</h3>
        <p class="service-card__desc">Ongoing monitoring, patching, and support so your environment stays healthy around the clock — with a team that actually answers the phone.</p>
      </article>
      <article class="service-card">
        <div class="service-card__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="24" cy="24" r="18"/>
            <path d="M24 14v20M28 18h-6a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="service-card__title">Cost Optimization</h3>
        <p class="service-card__desc">Stop overpaying for cloud you don't use. We right-size resources, eliminate waste, and build cost visibility into how you operate.</p>
      </article>
      <article class="service-card">
        <div class="service-card__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M24 5 8 11v11c0 11 7 17 16 21 9-4 16-10 16-21V11L24 5Z" stroke-linejoin="round"/>
            <path d="M17 24l5 5 10-11" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="service-card__title">Security &amp; Compliance</h3>
        <p class="service-card__desc">Harden your environment against real threats and keep pace with the compliance frameworks your business depends on.</p>
      </article>
    </div>
  </section>

  <section class="why-us" id="why-us">
    <h2 class="section-title">Why Cloud Assist One</h2>
    <div class="why-us__grid">
      <div class="why-us__item">
        <h3>24/7 Monitoring &amp; Support</h3>
        <p>Your systems don't keep business hours, and neither do we. Real engineers are on call around the clock.</p>
      </div>
      <div class="why-us__item">
        <h3>Transparent, Predictable Pricing</h3>
        <p>No surprise invoices. You'll always know what you're paying for and why.</p>
      </div>
      <div class="why-us__item">
        <h3>Senior Engineers, Not Ticket Queues</h3>
        <p>Every engagement is staffed by experienced cloud engineers — never outsourced to a junior support tier.</p>
      </div>
      <div class="why-us__item">
        <h3>True Multi-Cloud Flexibility</h3>
        <p>We're not tied to a single vendor, so our recommendations are built around what's right for you.</p>
      </div>
    </div>
  </section>

  <section class="process" id="process">
    <h2 class="section-title">How We Work</h2>
    <div class="process__grid">
      <div class="process__step">
        <span class="process__number">01</span>
        <h3>Assess</h3>
        <p>We start with a clear-eyed audit of your current environment: what's working, what's costing you, and what's putting you at risk.</p>
      </div>
      <div class="process__step">
        <span class="process__number">02</span>
        <h3>Build</h3>
        <p>We design and implement the infrastructure your business actually needs — scalable, documented, and built to last.</p>
      </div>
      <div class="process__step">
        <span class="process__number">03</span>
        <h3>Optimize</h3>
        <p>We continuously tune performance and cost, so your cloud spend tracks your business, not the other way around.</p>
      </div>
      <div class="process__step">
        <span class="process__number">04</span>
        <h3>Secure</h3>
        <p>We lock down your environment with layered security and keep it aligned with the compliance standards that matter to you.</p>
      </div>
    </div>
  </section>

  <section class="cta-banner" id="contact">
    <h2 class="cta-banner__title">Ready to simplify your cloud?</h2>
    <p class="cta-banner__subtitle">Talk to an engineer, not a sales script.</p>
    <a href="mailto:info@cloudassistone.com?subject=Getting%20Started%20with%20Cloud%20Assist%20One" class="btn btn--primary">Get Started</a>
  </section>
</main>

<footer class="site-footer">
  <div class="footer__grid">
    <div class="footer__brand">
      <img src="assets/cao-logo.png" alt="Cloud Assist One" width="56" height="56">
      <p>Build. Optimize. Secure.</p>
    </div>
    <nav class="footer__nav">
      <a href="#services">Services</a>
      <a href="#why-us">Why Us</a>
      <a href="#process">Process</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="footer__contact">
      <a href="mailto:info@cloudassistone.com">info@cloudassistone.com</a>
      <a href="tel:+14073884747">407-388-4747</a>
    </div>
  </div>
  <div class="footer__bottom">
    <p>&copy; <span id="year"></span> Cloud Assist One. All rights reserved.</p>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify the HTML structure loads without errors**

Use `mcp__chrome-devtools__navigate_page` to open the file directly (`file:///C:/Users/mgoli/OneDrive/Claude%20Code%20Development/Cloud%20Assist%20One/index.html`), then `mcp__chrome-devtools__list_console_messages`.
Expected: page loads, title reads "Cloud Assist One — Build. Optimize. Secure.", no console errors (a 404 for `css/styles.css`/`js/main.js` is expected and fine at this point since Tasks 3–5 haven't created them yet).

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One"
git add index.html
git commit -m "Add homepage HTML structure and copy"
```

---

### Task 3: CSS foundation, header/nav, and hero

**Files:**
- Create: `css/styles.css`

**Interfaces:**
- Consumes: class/ID names produced by Task 2 (`.site-header`, `.nav`, `.nav__toggle`, `.nav__links`, `.hero`, etc.)
- Produces: CSS custom properties (`--color-bg`, `--color-ink`, `--color-accent`, `--radius`, `--shadow`, `--max-width`, `--font-base`) that Task 4 reuses for the remaining sections. Also produces the `.nav__links.is-open` and `.site-header.is-scrolled` state classes that Task 5's JS toggles.

- [ ] **Step 1: Write the base, variables, buttons, header/nav, and hero styles**

```css
:root {
  --color-bg: #ffffff;
  --color-ink: #0a0a0a;
  --color-ink-soft: #4a4a4a;
  --color-accent: #2f6fed;
  --color-accent-dark: #1f4fc4;
  --color-surface: #f5f6f8;
  --color-border: #e2e4e9;
  --radius: 12px;
  --shadow: 0 10px 30px rgba(10, 10, 10, 0.08);
  --max-width: 1140px;
  --font-base: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-base);
  color: var(--color-ink);
  background: var(--color-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }

a { color: var(--color-accent); text-decoration: none; }
a:hover { color: var(--color-accent-dark); }

h1, h2, h3 { line-height: 1.2; font-weight: 700; }

.btn {
  display: inline-block;
  padding: 0.85rem 1.75rem;
  border-radius: var(--radius);
  font-weight: 600;
  text-align: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn--primary {
  background: var(--color-accent);
  color: #fff;
  box-shadow: 0 8px 20px rgba(47, 111, 237, 0.35);
}
.btn--primary:hover { background: var(--color-accent-dark); color: #fff; }
.btn--secondary {
  background: transparent;
  color: var(--color-ink);
  border: 2px solid var(--color-ink);
}
.btn--secondary:hover { background: var(--color-ink); color: #fff; }

/* Header / Nav */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.site-header.is-scrolled {
  box-shadow: 0 2px 20px rgba(10, 10, 10, 0.08);
  border-color: var(--color-border);
}
.nav {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.nav__logo { display: flex; align-items: center; gap: 0.6rem; color: var(--color-ink); }
.nav__logo-text { font-weight: 700; font-size: 1.05rem; }
.nav__links { display: flex; align-items: center; gap: 1.75rem; }
.nav__link { color: var(--color-ink); font-weight: 500; }
.nav__link:hover { color: var(--color-accent); }
.nav__cta { padding: 0.6rem 1.25rem; }

.nav__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
}
.nav__toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-ink);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/* Hero */
.hero {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 4rem 1.5rem 5rem;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  align-items: center;
}
.hero__title { font-size: clamp(2.1rem, 4vw, 3.25rem); margin-bottom: 1.25rem; }
.hero__subtitle { font-size: 1.1rem; color: var(--color-ink-soft); margin-bottom: 2rem; max-width: 42ch; }
.hero__actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero__visual svg { width: 100%; height: auto; }
.hero__ring { fill: none; stroke: var(--color-accent); stroke-opacity: 0.18; stroke-width: 2; }
.hero__ring--2 { stroke-opacity: 0.32; }
.hero__ring--3 { stroke-opacity: 0.55; fill: rgba(47, 111, 237, 0.06); }

/* Tech strip */
.tech-strip {
  text-align: center;
  padding: 1rem 1.5rem;
  background: var(--color-surface);
  color: var(--color-ink-soft);
  font-size: 0.95rem;
}

/* Shared section headings */
.section-title {
  text-align: center;
  font-size: clamp(1.7rem, 3vw, 2.25rem);
  margin-bottom: 0.5rem;
}
.section-subtitle {
  text-align: center;
  color: var(--color-ink-soft);
  max-width: 50ch;
  margin: 0 auto 2.5rem;
}

@media (max-width: 768px) {
  .nav__toggle { display: flex; }
  .nav__links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
  .nav__links.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .hero { grid-template-columns: 1fr; text-align: center; }
  .hero__actions { justify-content: center; }
  .hero__subtitle { margin-left: auto; margin-right: auto; }
}
```

- [ ] **Step 2: Verify header/nav and hero render correctly at desktop and mobile widths**

Use `mcp__chrome-devtools__resize_page` to 1280×800, then `mcp__chrome-devtools__take_screenshot` — expect nav links visible inline, no hamburger.
Use `mcp__chrome-devtools__resize_page` to 375×800, then `mcp__chrome-devtools__take_screenshot` — expect the hamburger button visible and nav links hidden.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One"
git add css/styles.css
git commit -m "Add base styles, header/nav, and hero section CSS"
```

---

### Task 4: CSS for services, why-us, process, CTA banner, and footer

**Files:**
- Modify: `css/styles.css` (append)

**Interfaces:**
- Consumes: custom properties and shared classes from Task 3 (`--color-*`, `--radius`, `--shadow`, `--max-width`, `.section-title`, `.section-subtitle`, `.btn`)

- [ ] **Step 1: Append styles for the remaining sections**

```css
/* Services */
.services { max-width: var(--max-width); margin: 0 auto; padding: 5rem 1.5rem; }
.services__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.service-card {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: 2rem 1.5rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.service-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.service-card__icon { color: var(--color-accent); margin-bottom: 1rem; }
.service-card__title { font-size: 1.1rem; margin-bottom: 0.5rem; }
.service-card__desc { color: var(--color-ink-soft); font-size: 0.95rem; }

/* Why Us */
.why-us { background: var(--color-ink); color: #fff; padding: 5rem 1.5rem; }
.why-us .section-title { color: #fff; }
.why-us__grid {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.why-us__item h3 { font-size: 1.05rem; margin-bottom: 0.6rem; color: var(--color-accent); }
.why-us__item p { color: #d8d8d8; font-size: 0.95rem; }

/* Process */
.process { max-width: var(--max-width); margin: 0 auto; padding: 5rem 1.5rem; }
.process__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.process__step { text-align: center; padding: 0 0.5rem; }
.process__number {
  display: inline-block;
  font-weight: 700;
  color: var(--color-accent);
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}
.process__step h3 { margin-bottom: 0.6rem; }
.process__step p { color: var(--color-ink-soft); font-size: 0.95rem; }

/* CTA Banner */
.cta-banner {
  text-align: center;
  padding: 5rem 1.5rem;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  color: #fff;
}
.cta-banner__title { font-size: clamp(1.8rem, 3vw, 2.5rem); margin-bottom: 0.5rem; }
.cta-banner__subtitle { margin-bottom: 2rem; opacity: 0.9; }
.cta-banner .btn--primary { background: #fff; color: var(--color-accent-dark); box-shadow: none; }
.cta-banner .btn--primary:hover { background: #f0f0f0; }

/* Footer */
.site-footer { background: var(--color-surface); padding: 3.5rem 1.5rem 1.5rem; }
.footer__grid {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 2rem;
  padding-bottom: 2rem;
}
.footer__brand { display: flex; flex-direction: column; gap: 0.75rem; }
.footer__brand p { color: var(--color-ink-soft); font-size: 0.9rem; }
.footer__nav, .footer__contact { display: flex; flex-direction: column; gap: 0.6rem; }
.footer__nav a, .footer__contact a { color: var(--color-ink); }
.footer__nav a:hover, .footer__contact a:hover { color: var(--color-accent); }
.footer__bottom {
  max-width: var(--max-width);
  margin: 0 auto;
  border-top: 1px solid var(--color-border);
  padding-top: 1.25rem;
  color: var(--color-ink-soft);
  font-size: 0.85rem;
}

@media (max-width: 900px) {
  .services__grid, .why-us__grid, .process__grid { grid-template-columns: repeat(2, 1fr); }
  .footer__grid { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .services__grid, .why-us__grid, .process__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Verify responsive grid collapse**

Use `mcp__chrome-devtools__resize_page` to 1280×900 and `mcp__chrome-devtools__evaluate_script` running `getComputedStyle(document.querySelector('.services__grid')).gridTemplateColumns` — expect 4 column values.
Resize to 500×900 and re-run the same script — expect a single column value.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One"
git add css/styles.css
git commit -m "Add services, why-us, process, CTA banner, and footer styles"
```

---

### Task 5: JS interactivity — mobile nav toggle, sticky header, footer year

**Files:**
- Create: `js/main.js`

**Interfaces:**
- Consumes: `#navToggle`, `#navLinks`, `#siteHeader`, `#year` (Task 2), `.nav__links.is-open` and `.site-header.is-scrolled` classes (Task 3 CSS).

- [ ] **Step 1: Write `js/main.js`**

```javascript
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const siteHeader = document.getElementById('siteHeader');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
}, { passive: true });

document.getElementById('year').textContent = new Date().getFullYear();
```

- [ ] **Step 2: Verify the mobile nav toggle works**

Use `mcp__chrome-devtools__resize_page` to 375×800, `mcp__chrome-devtools__navigate_page` (reload), then `mcp__chrome-devtools__click` on `#navToggle`, then `mcp__chrome-devtools__evaluate_script` running `document.getElementById('navLinks').classList.contains('is-open')`.
Expected: returns `true` after the click.

- [ ] **Step 3: Verify the footer year and sticky header class**

Use `mcp__chrome-devtools__evaluate_script` running `document.getElementById('year').textContent` — expected: the current year as a string (e.g. `"2026"`).
Use `mcp__chrome-devtools__evaluate_script` running `window.scrollTo(0, 100)` then check `document.getElementById('siteHeader').classList.contains('is-scrolled')` — expected: `true`.

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One"
git add js/main.js
git commit -m "Add mobile nav toggle, sticky header, and footer year JS"
```

---

### Task 6: Full-page verification pass

**Files:** none created/modified — verification only, using the a11y-debugging and chrome-devtools skills.

**Interfaces:**
- Consumes: the finished site from Tasks 1–5.

- [ ] **Step 1: Full console/error check**

Use `mcp__chrome-devtools__navigate_page` to reload `index.html`, then `mcp__chrome-devtools__list_console_messages`.
Expected: zero errors, zero 404s (logo, CSS, and JS all resolve now that Tasks 1, 3–5 are complete).

- [ ] **Step 2: Verify all in-page anchor links scroll to the right section**

For each of `#services`, `#why-us`, `#process`, `#contact`, use `mcp__chrome-devtools__click` on the matching nav link, then `mcp__chrome-devtools__evaluate_script` running `document.querySelector('<id>').getBoundingClientRect().top` — expected: a value near 0 (within header height) after the smooth scroll settles.

- [ ] **Step 3: Verify contact links**

Use `mcp__chrome-devtools__take_snapshot` and confirm the "Get Started" buttons and footer contact links have `href="mailto:info@cloudassistone.com?subject=..."` and `href="tel:+14073884747"` respectively.

- [ ] **Step 4: Accessibility spot-check**

Use the a11y-debugging skill against the loaded page: confirm heading order (one `<h1>`, then `<h2>`s, then `<h3>`s with no skipped levels), confirm the logo `<img>` alt text is present, confirm visible focus outlines when tabbing through nav links and buttons, and confirm text/background contrast for `.hero__subtitle`, `.service-card__desc`, and `.why-us__item p` meets at least WCAG AA (4.5:1 for body text).
Expected: no critical violations. Fix any that appear (e.g., adjust `--color-ink-soft` if contrast falls short) and re-run this step.

- [ ] **Step 5: Responsive screenshot sweep**

Use `mcp__chrome-devtools__resize_page` at 375×800, 768×1024, and 1440×900, taking a `mcp__chrome-devtools__take_screenshot` at each, confirming no horizontal overflow and no overlapping text/elements at any width.

- [ ] **Step 6: Local static-server smoke test (stand-in for IIS)**

Run: `cd "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One" && python -m http.server 8080`
Navigate to `http://localhost:8080/` with `mcp__chrome-devtools__navigate_page` and repeat Step 1 (console check).
Expected: identical clean result to opening the file directly — confirms the site works when served over HTTP, not just from `file://`, which is the closest local approximation to IIS without a live IIS install.
Stop the server afterward.

- [ ] **Step 7: Final commit (only if Step 4 required fixes)**

```bash
cd "C:/Users/mgoli/OneDrive/Claude Code Development/Cloud Assist One"
git add css/styles.css
git commit -m "Fix contrast/accessibility issues found in verification pass"
```

If no fixes were needed, skip this step — nothing to commit.
