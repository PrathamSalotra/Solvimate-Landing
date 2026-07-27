# Solvimate replica — implementation plan for Antigravity IDE

34 steps, grouped into the same 8 phases as the technical spec. Each step is a self-contained prompt — copy the block under **Prompt** into Antigravity, let it run, check it against **Definition of done**, then move to the next step. Don't skip ahead if a DoD box isn't checked; each step assumes the previous ones are in place.

## How to use this

1. Attach both `Solvimate_Technical_Specification.md` and the original functional spec to your Antigravity workspace as reference context before starting — most prompts below say "per the technical spec" instead of repeating decisions that are already written down there.
2. Run steps in order, one at a time. Steps are deliberately small (usually one file or one feature) — that's what makes an agentic coding tool reliable; a step that fails is easy to isolate and re-run.
3. After each step, work through its Definition of done before starting the next one. If something's off, fix it in the same step rather than carrying the problem forward.
4. Steps 1–4 (Phase 0) are infrastructure and only need to be done once.

## Prerequisites (do once, outside Antigravity)

- [ ] Empty GitHub repo created
- [ ] Supabase project created — note the project URL, anon key, and service role key
- [ ] Vercel account created and linked to the GitHub repo
- [ ] (Optional) Resend account + API key, if you want email notifications on new leads

---

## Phase 0 — Foundations

### Step 1 — Project scaffold

**Prompt:**

> Initialize a Next.js 14+ App Router project with TypeScript. Add styled-components and configure the `styled-components: true` compiler option in `next.config.js` so class names are stable under SSR. Set up ESLint + Prettier. Create a `.env.local.example` with placeholders for `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `RESEND_API_KEY`. Commit and push to the GitHub repo.

**Definition of done:**

- [ ] `npm run dev` renders the default Next.js page with no console errors
- [ ] Styled-components SSR class names match between server and client (no hydration warning)
- [ ] `.env.local.example` exists and `.env.local` is gitignored

### Step 2 — Supabase schema + RLS

**Prompt:**

> Write a SQL migration file (`supabase/migrations/0001_init.sql`) creating four tables per the technical spec's data model section: `contact_submissions`, `job_listings`, `internships`, `news_articles`, with the exact columns, types, and defaults listed there. Enable RLS on all four tables and write the policies described in the spec: no anon insert/select on `contact_submissions`; public select on the others filtered to their respective published/available/open status; writes restricted to an `admin` role via a `profiles` table with a `role` column. Include the `profiles` table and its own RLS.

**Definition of done:**

- [ ] Migration runs cleanly against the Supabase project
- [ ] RLS is enabled on all five tables (four content tables + `profiles`)
- [ ] Anon key cannot insert or select `contact_submissions` (test in the Supabase SQL editor with `set role anon`)

### Step 3 — Supabase client setup

**Prompt:**

> Add `@supabase/supabase-js`. Create `lib/supabase/server.ts` exporting a server-only client built from `SUPABASE_SERVICE_ROLE_KEY` (never imported into client components), and `lib/supabase/client.ts` exporting a browser client built from the public anon key, for any read-only public queries (listings, news). Add a runtime check that throws a clear error if the service-role client is ever imported from a file marked `"use client"`.

**Definition of done:**

- [ ] Two separate client files exist, neither key is exposed to the browser bundle (check the built output)
- [ ] A test query against `job_listings` succeeds from a server component

### Step 4 — Deployment + CI

**Prompt:**

> Connect the repo to Vercel. Add the four environment variables from step 1 to the Vercel project settings (production + preview). Add a GitHub Actions workflow that runs lint and a build check on every PR. Confirm a push to `main` triggers a Vercel deploy and PRs get preview URLs.

**Definition of done:**

- [ ] A test PR gets a working preview deployment
- [ ] `main` auto-deploys to production
- [ ] CI fails a PR that has a lint or build error

---

## Phase 1 — Global shell

### Step 5 — No-flash theme script

**Prompt:**

> In the root layout, add an inline, blocking `<script>` (not a `useEffect`) that runs before hydration: read `localStorage.getItem('solvimate-theme')`, default to `'dark'` if unset, and set a `data-theme` attribute on `<html>` accordingly. Confirm there's no flash of the wrong theme on a hard refresh in both light and dark.

**Definition of done:**

- [ ] Hard-refreshing in dark mode shows no light-mode flash, and vice versa
- [ ] Disabling JavaScript still renders the default (dark) theme correctly

### Step 6 — ThemeProvider + toggle

**Prompt:**

> Build a `ThemeProvider` React context that reads the same `localStorage` key the inline script uses, exposes `theme` and `toggleTheme()`, and keeps `data-theme` on `<html>` in sync when toggled. Build a `ThemeToggle` client component (icon button) and style both dark and light theme tokens with styled-components' `ThemeProvider` (styled-components' own, wrapping your app-level provider).

**Definition of done:**

- [ ] Toggling switches theme instantly with no reload
- [ ] Choice persists across a refresh and across a full navigation

### Step 7 — Language provider + switcher

**Prompt:**

> Create JSON dictionaries for English, Deutsch, Español, Français, and Hindi under `locales/{code}.json` (start with placeholder keys for now — content gets filled in as each page is built). Build a `LanguageProvider` React context that loads the saved locale from `localStorage` (default English), exposes a `t(key)` translation function and a `setLocale()` function. Build a `LanguageSwitcher` client component. Per the technical spec's Core decision #1, this must not trigger a Next.js navigation — it's a pure context/state swap.

**Definition of done:**

- [ ] Switching language updates visible copy instantly with no page reload (confirm in the Network tab — no document request)
- [ ] Choice persists on refresh
- [ ] In-progress text in an input isn't cleared by a language switch

### Step 8 — Navigation bar

**Prompt:**

> Build the fixed top nav: Solvimate logo linking home, nav links (Home, About, Services, Careers, Contact), a "Get Started" CTA button linking to the contact page, the `LanguageSwitcher`, and the `ThemeToggle`. Highlight the active route. Make it responsive — collapse to a mobile menu below 768px.

**Definition of done:**

- [ ] Active page is visually indicated
- [ ] Mobile menu works via keyboard and touch
- [ ] No horizontal scroll at 375px

### Step 9 — Footer

**Prompt:**

> Build the footer for every page: the tagline, a "Quick Links" column (Sitemap, Privacy Policy, Terms of Service, plus main pages), and social links (LinkedIn, X/Twitter, Instagram) with correct `target="_blank" rel="noopener"`.

**Definition of done:**

- [ ] Footer renders on every route via the root layout
- [ ] All links resolve (internal routes exist even if pages are placeholders at this point)

### Step 10 — 404 page

**Prompt:**

> Add a styled `not-found.tsx` at the app root with a link back home, matching the nav/footer shell and current theme.

**Definition of done:**

- [ ] Visiting an unknown route renders the styled 404, not the default Next.js one
- [ ] Theme and language still apply on the 404 page

---

## Phase 2 — Home page

### Step 11 — Hero section

**Prompt:**

> Build the home page hero: pill badge, headline, supporting line, and "Get Started" button, using the exact copy from the functional spec §2.2. Make the hero font scale from the desktop size down to mobile per the spec's responsive constraint (roughly 6rem → 2.5rem).

**Definition of done:**

- [ ] Copy matches the spec exactly
- [ ] Font scales smoothly across 375 / 768 / 1440

### Step 12 — Trusted-by logo carousel

**Prompt:**

> Build a horizontally scrolling client-logo carousel that scrolls continuously and pauses on hover, using placeholder logo images for now.

**Definition of done:**

- [ ] Scrolls continuously without stutter
- [ ] Pauses on hover/focus

### Step 13 — Services 3-column section

**Prompt:**

> Build the "Our Services" 3-column section (Translation & Localization, Dubbing & Voice-over, Transcription & Recording) with the short descriptions from the functional spec. Collapse to a single column below 768px.

**Definition of done:**

- [ ] 3-col desktop → 1-col mobile, no overlap
- [ ] Copy matches spec

### Step 14 — Banner, dubbing highlight, journey sections

**Prompt:**

> Build the "Confidently Share Your Story Globally" banner section, the "Your Voice, Your World." dubbing highlight, and the "Journey with SOLVIMATE" section with parallax imagery, per the functional spec §2.2. Use `next/image` for all images with alt text and a placeholder background so layout doesn't jump while loading.

**Definition of done:**

- [ ] Images use `next/image`, no layout shift on load
- [ ] Broken/slow image still shows alt text + placeholder, not a blank gap

### Step 15 — Testimonials + brief note

**Prompt:**

> Build the emerald-background "brief note" statement section and the testimonials section (3 cards: Cameron Williamson, Esther Howard, Robert Fox) with the quotes from the functional spec.

**Definition of done:**

- [ ] All three testimonials render with correct attribution
- [ ] Section is readable in both themes (emerald background works in light and dark)

### Step 16 — FAQ accordion

**Prompt:**

> Build the FAQ accordion with the four questions from the functional spec §2.2. Only one item expands at a time. It must be fully keyboard accessible — arrow keys or tab between headers, Enter/Space to toggle, and correct `aria-expanded` state.

**Definition of done:**

- [ ] Expanding one item collapses any other open item
- [ ] Full keyboard operability confirmed by tabbing through with a mouse unplugged
- [ ] Screen reader announces expand/collapse state

### Step 17 — Closing CTA + scroll animations

**Prompt:**

> Add the closing CTA section. Then wire GSAP + ScrollTrigger reveal/mask animations across the home page's headings and images per the functional spec. Gate all of it behind a `prefers-reduced-motion` check — animations must be fully disabled (not just shortened) when that's set.

**Definition of done:**

- [ ] Animations trigger on scroll on a standard browser
- [ ] With `prefers-reduced-motion: reduce` simulated in devtools, no animation runs and content is still fully visible
- [ ] No animation blocks first paint (check Lighthouse)

---

## Phase 3 — About & Services

### Step 18 — About page

**Prompt:**

> Build the About page per functional spec §2.3: headline with EdTech Expertise / AI-Ready Data sub-tags, company description, and the sections (What We Stand For, Service Sectors, Our Services, Join Our Team, Get in Touch, Grow Together).

**Definition of done:**

- [ ] All sections present and responsive
- [ ] Page has correct `<title>` and meta description (placeholder is fine for now — finalized in Phase 7)

### Step 19 — Services page

**Prompt:**

> Build the Services page per functional spec §2.4: the six service groups with their sub-items, an animated stats band (Languages Supported, Global Clients, Transcriptions Delivered) that counts up when scrolled into view, the "Why Choose Solvimate" section, and the "Get a Free Quote" CTA linking to the contact/customer form.

**Definition of done:**

- [ ] All six groups and sub-items render
- [ ] Stat counters animate once on first view into viewport, not on every scroll
- [ ] "Get a Free Quote" navigates correctly

---

## Phase 4 — Lead capture

### Step 20 — Toast system

**Prompt:**

> Build a toast notification component: top-center, `aria-live="polite"`, auto-dismisses after a few seconds, and can be dismissed manually. Expose a simple `useToast()` hook with `success()` and `error()` methods so form components can trigger it.

**Definition of done:**

- [ ] Toast is announced by a screen reader without requiring focus
- [ ] Auto-dismiss and manual dismiss both work
- [ ] Multiple toasts don't overlap illegibly

### Step 21 — Contact page + form

**Prompt:**

> Build the Contact page per functional spec §2.8: direct channels (email, phone, address linking to Google Maps, business hours), and the "Send us a message" form (Full Name required, Phone, Email, Subject defaulting to "Project enquiry", Message capped at 2000 characters with a counter). Include a hidden honeypot field. Client-side validation blocks submission on a missing required field or invalid email before any network call. On submit, show the "Sending…" disabled state, POST JSON to `/api/contact`, and use the toast system for success/failure per the functional flows in the technical spec. On failure, retain the entered data.

**Definition of done:**

- [ ] Missing required field blocks submission with an inline message, no network call fires
- [ ] Invalid email is rejected before submission
- [ ] Submit button can't be double-clicked into two requests
- [ ] Failed submission keeps the entered data

### Step 22 — Customer form page

**Prompt:**

> Build the Customer support form page per functional spec §2.9 (First Name, Last Name, Email, Subject, Message), reusing the toast system and the same validation/loading/error behavior as the contact form.

**Definition of done:**

- [ ] Same validation and submission behavior as step 21, verified independently
- [ ] Success toast copy matches "Message sent successfully." per the spec

### Step 23 — /api/contact route

**Prompt:**

> Build the `/api/contact` route handler. Order of operations: reject if the honeypot field is filled; apply basic IP-based rate limiting; validate the payload server-side (required fields, email format, message length); insert a row into `contact_submissions` using the service-role Supabase client from step 3, tagging `source` as `'contact'` or `'customer_form'`; on success, attempt a best-effort Resend email to the team — a failed email must not fail the response, since the database write is the source of truth. Return the appropriate status codes for validation failure, rate-limit rejection, and success.

**Definition of done:**

- [ ] A valid submission lands in `contact_submissions` with the right `source` value
- [ ] A honeypot-filled submission is silently rejected (200 response, no DB row) so bots don't learn it was caught
- [ ] Rapid repeated submissions from the same IP get rate-limited
- [ ] Simulating a Resend failure still returns success to the client

---

## Phase 5 — Careers, internships, programs, news

### Step 24 — Careers page

**Prompt:**

> Build the Careers page per functional spec §2.5: For Candidates and For Vendors tracks, project categories (Recording, Transcription, Data Annotation, Content Creation, Robotic Video Data Collection), language tags, each listing showing Available status and an Apply Now button. Fetch listings server-side from `job_listings` filtered to `status = 'available'`.

**Definition of done:**

- [ ] Listings come from Supabase, not hardcoded data
- [ ] Apply Now navigates to the customer form, pre-filling the subject with the listing title

### Step 25 — Internships + Programs pages

**Prompt:**

> Build the Internships page per functional spec §2.6, fetching from the `internships` table and showing "No open internships at the moment. Check back soon!" when the result is empty. Build the Programs page with the two paths (Job Opportunities, Internship Programs), the general-application option, and the buttons described in the spec.

**Definition of done:**

- [ ] Empty-state copy matches the spec exactly when there are zero rows
- [ ] Programs page links correctly to jobs, internships, and the general application

### Step 26 — News page

**Prompt:**

> Build the News page, fetching from `news_articles` where `is_published = true`, showing "No news articles yet." when empty.

**Definition of done:**

- [ ] Empty-state copy matches the spec exactly
- [ ] A published test article renders correctly

### Step 27 — Content revalidation

**Prompt:**

> Set the revalidate window for Careers/Internships/News per the technical spec's rendering-strategy decision (short revalidate, since this content comes from the database rather than a deploy). Home/About/Services should use a longer revalidate window.

**Definition of done:**

- [ ] Editing a row in Supabase shows up on the live site within the configured window without a redeploy

---

## Phase 6 — Polish

### Step 28 — Responsive QA

**Prompt:**

> Audit every page at 375px, 768px, and 1440px. Fix any horizontal scroll, overlapping elements, or broken grids. Confirm the 3-col → 1-col collapses called out in the functional spec behave correctly at the breakpoint.

**Definition of done:**

- [ ] No horizontal scroll on any page at any of the three widths
- [ ] All grids collapse as specified

### Step 29 — Accessibility pass

**Prompt:**

> Audit the full site for keyboard reachability of every interactive element, correct `aria-live` behavior on toasts, and alt text on every image. Fix anything that fails.

**Definition of done:**

- [ ] Full site navigable by keyboard alone, in a logical tab order
- [ ] Every image has meaningful alt text (or `alt=""` if purely decorative)

### Step 30 — Reduced-motion audit

**Prompt:**

> Confirm every animation on the site (not just the home page) is gated behind `prefers-reduced-motion`, including any added during Phases 3–5.

**Definition of done:**

- [ ] Full site checked with reduced motion simulated — no parallax, reveal, or counter animation plays

---

## Phase 7 — Ship

### Step 31 — SEO metadata

**Prompt:**

> Add per-page `title` and meta description using Next.js's metadata API for every route. Home page meta description is "Building the future of AI" per the functional spec.

**Definition of done:**

- [ ] Every page has a distinct, accurate title and description (view page source to confirm, not just devtools)

### Step 32 — Performance pass

**Prompt:**

> Confirm all images go through `next/image`, fonts are preloaded via `next/font`, and run a Lighthouse audit. Fix anything scoring below 90 on performance or accessibility.

**Definition of done:**

- [ ] Lighthouse performance and accessibility both ≥ 90 on the home page
- [ ] No render-blocking font or animation library

### Step 33 — Legal pages + spam hardening

**Prompt:**

> Add placeholder Privacy Policy and Terms of Service pages, linked from the footer. Review the rate limiting on `/api/contact` from step 23 and tighten if needed based on any test spam traffic seen during development.

**Definition of done:**

- [ ] Both legal pages exist and are linked from the footer
- [ ] Rate limit confirmed working under a simple repeated-request test

### Step 34 — Deploy + smoke test

**Prompt:**

> Do a full production deploy. Manually walk every acceptance criterion in the technical spec's global, home, services, contact, careers, and responsive/accessibility sections against the live URL.

**Definition of done:**

- [ ] Every acceptance criterion in the technical spec passes on production, not just locally
- [ ] A real test submission through the live contact form lands in Supabase and (if configured) triggers an email
