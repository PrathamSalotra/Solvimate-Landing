# Solvimate replica — technical specification

**Source:** derived from the provided functional/UX specification (`case_Specification_Document_Solvimate.md`).
**Build profile:** solo developer, flexible timeline, greenfield infrastructure (no existing Vercel/Supabase project).
**Status:** draft v1 — ready for review before implementation starts.

---

## 1. Objective

Rebuild the Solvimate marketing and lead-capture website as a production-grade Next.js application that:

- Faithfully reproduces the functional behavior described in the source spec: multi-page marketing site, dark/light theming, five-language support, animated sections, and form-based lead capture (no live chat).
- Replaces the placeholder/absent backend with a real one — form submissions are validated, stored in a database, and (optionally) forwarded by email.
- Runs on infrastructure a solo developer can operate without dedicated ops — managed hosting, managed database, generous free tiers.
- Leaves clear seams for the parts of the source spec that are explicitly open-ended (careers/internships/news content, certificate verification, and the protected admin portal) with a phased implementation path.

**Scope boundaries:** Public marketing site with lead capture; Certificate verification portal; Protected Admin Portal (`/admin`) for certificate issuance, activity monitoring, and CMS management. Payments and third-party live chat widgets remain explicitly out of scope.

---

## 2. Tech stack

| Layer            | Choice                                                                    | Why                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Framework        | Next.js 14+, App Router, TypeScript                                       | Matches the observed original; App Router gives Server Components for the mostly-static marketing pages and Route Handlers for the API. |
| Styling          | styled-components + Next.js SWC plugin                                    | Matches the original's CSS-in-JS approach; the SWC plugin fixes SSR class-name mismatches.                                              |
| Animation        | GSAP + ScrollTrigger                                                      | Matches the observed scroll-reveal/parallax behavior; gated behind a `prefers-reduced-motion` check.                                    |
| i18n             | Custom React Context + JSON dictionaries (not `next-intl` locale routing) | See Core decision #1 — the spec requires no full reload on language switch, which rules out path-based locale routing.                  |
| Database         | Supabase (Postgres) & MongoDB                                             | Supabase for public site leads and content; MongoDB for admin credentials, roles, and certificate metadata.                             |
| Storage          | Cloudinary                                                                | Dedicated storage for uploaded PDF/PNG certificate documents.                                                                          |
| Auth             | NextAuth.js (`next-auth`) + OTP                                           | Dedicated two-step verification (Password + Resend OTP) for whitelisted `/admin` users; route protection via Next.js `middleware.ts`.   |
| Email            | Resend                                                                    | Lead notifications to operations team AND 6-digit OTP delivery for `/admin` logins.                                                    |
| Hosting          | Vercel                                                                    | Zero-config Next.js hosting, serverless Route Handlers, preview deployments per PR.                                                     |
| Rate limiting    | Upstash Redis (or in-memory fallback)                                     | Backs honeypot/spam protection on `/api/contact` and OTP resend cooldown (30s) / attempt limits on `/admin/verify`.                     |
| Testing          | Vitest (unit) + Playwright (e2e)                                          | Covers component logic, form flows, admin auth flows, and critical navigation paths.                                                    |
| CI/CD            | GitHub Actions → Vercel                                                   | Push to `main` deploys; PRs get preview URLs.                                                                                           |

---

## 3. High-level architecture

**Browser** — renders the site, holds theme/language preference in `localStorage`, submits forms as client components.

**Next.js app (Vercel)** — Server Components render the static marketing pages (Home, About, Services) with ISR; Client Components handle the theme toggle, language switcher, and forms. An inline, pre-hydration `<script>` in the root layout applies the saved theme before React mounts, so there's no flash.

**API routes** (`app/api/contact/route.ts`, etc.) — server-only code. Validates payloads, checks the honeypot field, applies rate limiting, and is the _only_ place holding the Supabase service-role key. Never runs in the browser.

**Supabase (Postgres + RLS)** — stores contact submissions, job/internship listings, and news articles. Row Level Security enforces that public traffic can only read published/available records and can never read contact submissions; writes to `contact_submissions` only happen via the API route's service-role key, never directly from the browser.

**Admin Portal Architecture (`/admin/*`)** — protected routes requiring NextAuth.js authentication. Next.js `middleware.ts` guards all paths under `/admin/*` (except `/admin/login` and `/admin/verify`), redirecting unauthenticated requests. Whitelisted admins complete a password verification and a 6-digit OTP sent via Resend. The portal provides a dedicated admin shell with sidebar navigation (`/admin/dashboard`, `/admin/certificates`, `/admin/cms`, `/admin/analytics`, `/admin/settings`).

**Cloudinary Storage** — stores uploaded PDF and PNG certificate files securely with permanent verification URLs.

**Resend** — fired from the API route after a successful lead insert (to notify the team) AND used to dispatch 6-digit one-time passwords (OTPs) for admin sign-in.

**Data flow for a lead:** browser → API route → validate + rate-limit → Supabase insert → best-effort email → success/error response → toast.

---

## 4. Data model

Four tables in the `public` schema, RLS enabled on every one.

### `contact_submissions`

| Column     | Type        | Notes                                            |
| ---------- | ----------- | ------------------------------------------------ |
| id         | uuid, pk    | `default gen_random_uuid()`                      |
| source     | text        | `'contact'` or `'customer_form'`                 |
| full_name  | text        | not null                                         |
| email      | text        | not null                                         |
| phone      | text        | nullable                                         |
| subject    | text        | defaults to `'Project enquiry'`                  |
| message    | text        | not null, capped at 2000 chars at the app layer  |
| status     | text        | `'new' \| 'read' \| 'archived'`, default `'new'` |
| created_at | timestamptz | `default now()`                                  |

RLS: no `insert`/`select` policy for `anon` — all access goes through the API route using the service-role key, which bypasses RLS by design. A `select` policy for `authenticated` + a `profiles.role = 'admin'` check supports a future admin view.

### `job_listings`

| Column      | Type        | Notes                                                                                      |
| ----------- | ----------- | ------------------------------------------------------------------------------------------ |
| id          | uuid, pk    |                                                                                            |
| title       | text        |                                                                                            |
| track       | text        | `'candidate' \| 'vendor'`                                                                  |
| category    | text        | Recording, Transcription, Data Annotation, Content Creation, Robotic Video Data Collection |
| languages   | text[]      | e.g. `{English, Dutch, Malaysian}`                                                         |
| status      | text        | `'available' \| 'closed'`, default `'available'`                                           |
| description | text        |                                                                                            |
| created_at  | timestamptz |                                                                                            |

RLS: public `select` where `status = 'available'`; `insert`/`update`/`delete` restricted to `admin` role.

### `internships`

`id uuid pk` · `title text` · `description text` · `status text` (`'open' | 'closed'`) · `created_at timestamptz`
RLS: public `select` where `status = 'open'`; writes restricted to `admin`.

### `news_articles`

`id uuid pk` · `title text` · `slug text unique` · `body text` · `is_published boolean default false` · `published_at timestamptz`
RLS: public `select` where `is_published = true`; writes restricted to `admin`.

### MongoDB Collections (Admin Portal & Certificates)

#### Collection: `admins`
| Column | Type | Notes |
| --- | --- | --- |
| `_id` | ObjectId | Primary key |
| `email` | String | Unique whitelisted email |
| `passwordHash` | String | Encrypted password |
| `role` | String | `'super_admin' \| 'manager'` |
| `lastLogin` | Date | Timestamp of latest login |

#### Collection: `certificates`
| Column | Type | Notes |
| --- | --- | --- |
| `_id` | ObjectId | Primary key |
| `certificateId` | String | Unique human-readable ID (e.g. `SVM26-A8X9Q2`) |
| `cloudinaryUrl` | String | Cloudinary document link (PDF/PNG) |
| `candidateName` | String | Full name of recipient |
| `email` | String | Recipient contact email |
| `phone` | String | Optional candidate phone |
| `internshipRole` | String | Role / position title |
| `department` | String | Functional unit |
| `organization` | String | Issuing organization |
| `issueDate` | Date | Issue timestamp |
| `startDate` | Date | Program start |
| `endDate` | Date | Program completion |
| `duration` | String | Program length string |
| `description` | String | Summary of performance/contributions |
| `badges` | String[] | Awarded performance chips |
| `status` | String | `'ACTIVE' \| 'REVOKED'` |
| `verificationCount` | Number | Incremented upon verification queries |

_Public leads and content remain in Supabase; Admin portal credentials and certificate verification data utilize MongoDB for flexible metadata handling._

---

## 5. Core decisions

Points where the source spec implies a choice that isn't fully settled by "match the original" — flagged so they can be revisited if requirements change.

1. **Language switching is client-side, not route-based.** The spec requires the switcher to "not require a full reload." Next.js's standard i18n pattern (`/en`, `/de`, ... subpaths) _does_ navigate. Instead: one route tree, a `LanguageProvider` (React Context) holding the active dictionary, loaded from static JSON and swapped on toggle; the choice persists in `localStorage`. **Trade-off:** this gives up per-language URLs, so there's no built-in `hreflang`/SEO benefit for the non-English content, and translated pages won't be indexed separately. If per-language SEO matters later, this is the piece to revisit.
2. **Contact form writes go through the API route with the service-role key**, not direct client-to-Supabase inserts. Keeps the honeypot check and rate limiting server-side and keeps `contact_submissions` unreadable/unwritable from the browser even if RLS is ever misconfigured.
3. **Styling stays styled-components**, matching the original, rather than migrating to Tailwind — avoids a rewrite that isn't asked for and preserves the observed DOM/class structure.
4. **Theme is applied via a blocking inline script in the root layout**, not a `useEffect` — a `useEffect` runs after first paint, which is too late to prevent the flash the spec explicitly calls out.
5. **Rendering strategy is per-page.** Home/About/Services use ISR with a long revalidate window (content rarely changes); Careers/Internships/News use a short revalidate window, or on-demand revalidation triggered from Supabase, since that content changes independently of a deploy.
6. **Spam protection starts minimal:** a honeypot field plus basic IP-based rate limiting on `/api/contact`, no CAPTCHA. Keeps friction at zero for real users; a CAPTCHA is a fallback if spam becomes a problem, not a v1 requirement.

---

## 6. Functional flows

**Theme (no-flash)**

1. Root layout renders an inline `<script>` before any content, reading `localStorage['solvimate-theme']` (default `'dark'`) and setting a class/attribute on `<html>`.
2. React hydrates; `ThemeProvider` reads the same value into context so toggle state matches the DOM.
3. Toggling writes the new value to `localStorage` and updates the DOM class + context together.

**Language switch**

1. On load, `LanguageProvider` reads the saved locale (default English) and loads the matching JSON dictionary.
2. Switching updates context + `localStorage` only — no navigation, no loss of in-progress form input.

**Contact / customer form submission**

1. Client-side validation (required fields, email format) blocks the request before any network call.
2. Submit button becomes disabled and shows "Sending…".
3. `POST /api/contact` with a JSON body.
4. Server: honeypot check → rate-limit check → validate payload → insert into `contact_submissions` → best-effort email via Resend.
5. Success: toast ("Message sent! We'll be in touch soon." / "Message sent successfully."), fields reset.
6. Failure (network or API error): toast with the corresponding message, form data retained, button re-enabled.

**Careers / internships / news listings**

1. Page fetches from Supabase (server-side, at request/revalidate time) filtered to `available` / `open` / `is_published = true`.
2. Empty result → dedicated empty-state copy, not a blank page.
3. "Apply Now" navigates to the customer form, optionally pre-filling the subject with the listing title.

---

## 7. Development plan

Solo developer, flexible timeline, starting from nothing (no existing Vercel/Supabase project). Sized relatively (S/M/L) rather than dated, so it holds up regardless of how much time is available per week.

| Phase                                       | Scope                                                                                               | Size |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---- |
| 0 — Foundations                             | Repo + TS + styled-components SSR config; Supabase project + schema + RLS; Vercel project + CI/CD   | S    |
| 1 — Global shell                            | Nav, footer, routing, 404; pre-hydration theme system; client-side i18n for 5 languages             | M    |
| 2 — Home page                               | Hero, services, banner, dubbing highlight, journey, testimonials; FAQ accordion; GSAP scroll/reveal | M    |
| 3 — About & Services                        | About page sections; six service groups; animated stats counters                                    | M    |
| 4 — Lead capture                            | Contact + customer form pages; `/api/contact` (validate, honeypot, insert, email); toast system     | M    |
| 5 — Careers / Internships / Programs / News | Supabase-backed listings; empty states; programs page linking all three                             | M    |
| 6 — Polish                                  | Responsive QA at 375/768/1440; keyboard nav + `aria-live` toasts; reduced-motion handling           | S    |
| 7 — Ship                                    | Per-page SEO metadata; image/font performance pass; legal pages; rate limiting; deploy + smoke test | S    |
| 8 — Admin Portal                            | NextAuth + OTP via Resend; MongoDB collections; Cloudinary certificate upload; `/admin` dashboard   | L    |

**Suggested order:** 0 → 1 → 4 → 2 → 3 → 5 → 6 → 7 → 8. Building the contact form early (right after the global shell) means the highest-value part of the site — an actual working lead pipeline — is de-risked before time goes into animation polish, followed by certificate issuance and the protected administrative dashboard.

---

## Open questions worth resolving before or during build

- Does per-language SEO (indexed `/de`, `/es`, ... pages) matter, or is "instant switch, one URL" the right trade-off long-term? (See Core decision #1.)
- **Admin UI & Portal (Resolved):** In scope per `spec_docs/admin.md` with NextAuth.js credentials + OTP, MongoDB database for credentials & certificate records, and Cloudinary for file hosting.
- Who owns writing the initial careers/internship/news content, and how often does it change? (Managed through the Content CMS module in the Admin portal.)
- Are brand assets (logo, exact color tokens, fonts) available, or should those be reverse-engineered from the original site?
