# Solvimate - Developer Handoff

> **Current implementation:** Next.js 16.2.12, React 19, TypeScript, App Router, styled-components, MongoDB/Mongoose, NextAuth v4, Resend, and Cloudinary.
>
> **Purpose:** This document describes the repository as it exists today. It is a runtime handoff, not a copy of the older product specification. Features that are planned but not implemented are called out explicitly.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Actual Technology Stack](#2-actual-technology-stack)
3. [Getting Started](#3-getting-started)
4. [Environment Variables](#4-environment-variables)
5. [Repository Structure](#5-repository-structure)
6. [Application Shell](#6-application-shell)
7. [Public Routes](#7-public-routes)
8. [API Routes](#8-api-routes)
9. [MongoDB Models](#9-mongodb-models)
10. [Services And Data Access](#10-services-and-data-access)
11. [Authentication Flow](#11-authentication-flow)
12. [Admin Portal](#12-admin-portal)
13. [Certificate Flow](#13-certificate-flow)
14. [Contact And Support Flow](#14-contact-and-support-flow)
15. [Careers, Internships, And News](#15-careers-internships-and-news)
16. [Theme, Styling, Animation, And Localization](#16-theme-styling-animation-and-localization)
17. [Cloudinary And Email Integrations](#17-cloudinary-and-email-integrations)
18. [Supabase Status](#18-supabase-status)
19. [Known Gaps And Risks](#19-known-gaps-and-risks)
20. [Development Workflow](#20-development-workflow)
21. [Deployment Checklist](#21-deployment-checklist)
22. [Difference From The Legacy Sample](#22-difference-from-the-legacy-sample)

---

## 1. Project Overview

Solvimate is a multilingual marketing and operations platform for translation, transcription, dubbing, AI data services, internships, careers, news, certificate verification, and administrative certificate/content management.

The application currently has two main surfaces:

- **Public website:** marketing pages, public content, contact/support forms, careers, internships, news, and certificate verification.
- **Admin control plane:** credential-plus-OTP authentication, certificate management, CMS management for jobs/internships/news, analytics, and settings.

The runtime data source for current application functionality is MongoDB through Mongoose. Supabase migration files and client helpers remain in the repository as legacy material, but current public content and contact writes use MongoDB services.

The project is TypeScript-based. Do not follow older documentation that describes a JavaScript, Tailwind, Nodemailer, or Next.js 15 implementation unless you are intentionally migrating the architecture.

---

## 2. Actual Technology Stack

### Runtime

| Technology        | Version or role                      |
| ----------------- | ------------------------------------ |
| Next.js           | `16.2.12`, App Router                |
| React             | `19.2.4`                             |
| TypeScript        | `^5`                                 |
| Node.js           | Use Node 20.9 or newer               |
| Mongoose          | `9.9.5`, MongoDB ODM                 |
| NextAuth          | `4.24.15`, JWT session strategy      |
| styled-components | `6.4.4`, SSR registry enabled        |
| Resend            | Contact and admin OTP email delivery |
| Cloudinary        | Certificate PDF/PNG storage          |
| Zod               | API validation where currently used  |

### Visual and interaction libraries

- `gsap` and `@gsap/react` for scroll reveal behavior.
- `framer-motion` in selected feature components, especially earlier certificate UI surfaces.
- `cobe` for the scroll-reactive globe.
- `next/font/google` for Inter Tight, Space Grotesk, and IBM Plex Mono.
- `react-hot-toast` for admin and form feedback.

### Explicitly not part of the current runtime

The current package does not include Tailwind CSS, Nodemailer, NextAuth v5 beta, `@next-cloudinary`, `sharp`, `lucide-react`, `clsx`, or `tailwind-merge`.

---

## 3. Getting Started

### Requirements

- Node.js 20.9 or newer.
- npm 10 or newer.
- A MongoDB database.
- A Resend account and verified sender for email functionality.
- A Cloudinary account for certificate uploads.

Supabase variables may still exist in older local environments, but they are not required by the current MongoDB-backed public pages and contact route.

### Clone and install

```bash
git clone https://github.com/PrathamSalotra/Solvimate-Landing.git
cd Solvimate-Landing
npm install
```

### Create local environment configuration

Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

macOS/Linux:

```bash
cp .env.local.example .env.local
```

Fill in the required values described in [Environment Variables](#4-environment-variables). Never commit `.env.local`.

### Development server

```bash
npm run dev
```

Open `http://localhost:3000`.

If port 3000 is unavailable:

```bash
npm run dev -- -p 3001
```

### Available scripts

```bash
npm run dev           # Start Next.js development server
npm run build         # Create a production build
npm run start         # Start the production server
npm run lint          # Run ESLint
npm run format        # Format files with Prettier
npm run format:check  # Check formatting with Prettier
```

Additional manually run scripts exist in `scripts/` for database probing and dashboard/edge-case checks. They are not registered as npm scripts.

---

## 4. Environment Variables

The complete secret-free template is [.env.local.example](.env.local.example). The real `.env.local` file is local-only and must not be committed.

### Required for MongoDB and authentication

```env
MONGODB_URI=
NEXTAUTH_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

`MONGODB_URI` is the MongoDB connection string. `NEXTAUTH_SECRET` signs/encrypts NextAuth JWT sessions. `RESEND_FROM_EMAIL` must be a sender accepted by Resend.

### Contact email routing

```env
RESEND_CONTACT_EMAIL=
```

`RESEND_CONTACT_EMAIL` receives contact form messages. If it is omitted, the contact route falls back to `RESEND_FROM_EMAIL`.

### Admin configuration

```env
ADMIN_AUTH_MODE=
NEXT_PUBLIC_ADMIN_AUTH_PROVIDER=
ADMIN_PASSWORD_MIN_LENGTH=
ADMIN_OTP_LENGTH=
ADMIN_OTP_EXPIRY_MINUTES=
ADMIN_OTP_MAX_ATTEMPTS=
ADMIN_OTP_RESEND_COOLDOWN_SECONDS=
ADMIN_WHITELISTED_EMAILS=
```

`ADMIN_WHITELISTED_EMAILS` is a comma-separated list. The code also supports the legacy alias `ADMIN_WHITELIST`.

Defaults in `src/services/auth.service.ts` are:

- Minimum password length: 8.
- OTP length: 6 digits.
- OTP expiry: 10 minutes.
- Maximum OTP attempts: 5.
- OTP resend cooldown: 30 seconds.
- Bcrypt salt rounds: 10.

### Cloudinary

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=
CLOUDINARY_URL=
```

Only the cloud name, API key, and API secret are required by the server upload integration. The upload preset and complete URL are retained for compatibility with local/deployment configurations.

### Legacy Supabase variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

These are retained only for legacy helpers and migration history. Current runtime page/API imports do not use them.

### Legacy email aliases

```env
CONTACT_TO_EMAIL=
HR_TO_EMAIL=
VENDOR_TO_EMAIL=
```

These aliases are documented for existing deployment configurations but are not the primary variables used by the current contact route.

Never expose MongoDB credentials, `NEXTAUTH_SECRET`, `RESEND_API_KEY`, Cloudinary secrets, or Supabase service-role credentials to client code.

---

## 5. Repository Structure

```text
solvimate/
├── src/
│   ├── app/                 App Router pages and API route handlers
│   ├── components/         Public website components
│   ├── context/            Theme, language, and toast providers
│   ├── features/           Admin and feature-specific components
│   ├── hooks/              Shared React hooks
│   ├── lib/                Database, auth, email, storage, theme helpers
│   ├── locales/            English, German, Spanish, French, Hindi JSON
│   ├── models/             Mongoose schemas
│   ├── services/           Database and business logic services
│   ├── types/              Shared TypeScript types
│   └── middleware.ts       NextAuth middleware for protected admin routes
├── public/                 Static assets and images
├── supabase/               Legacy SQL migrations
├── scripts/                Manual probes and edge-case checks
├── spec_docs/              Product and implementation specifications
├── .env.local.example      Secret-free environment template
├── next.config.ts          Next.js compiler configuration
├── package.json            Dependencies and scripts
├── tsconfig.json           TypeScript configuration
└── solvimate.md            This handoff document
```

The repository previously contained an `admin template/` folder and a nested `reference/` repository. Those obsolete assets have been removed from the GitHub `main` branch.

---

## 6. Application Shell

The root shell is implemented in `src/app/layout.tsx`.

It provides:

1. `next/font/google` font variables.
2. A pre-hydration theme initialization script.
3. `StyledComponentsRegistry` for server-rendered styled-components.
4. `ThemeProvider`.
5. `LanguageProvider`.
6. `ToastProvider`.
7. A skip-to-content accessibility link.
8. The public `Navbar`.
9. The public `Footer`.
10. The main content wrapper.

The root layout currently renders the public Navbar and Footer globally, including on public verification pages. Admin pages use their own `AdminLayout` inside that root shell.

### Theme initialization

The theme is read from `localStorage` key `solvimate-theme`, defaulting to `dark`. The root `html` element receives `data-theme="dark"` or `data-theme="light"`.

### Admin shell

`src/features/dashboard/layouts/AdminLayout.tsx` renders:

- `DashboardSidebar`.
- Main page content.

The shared sidebar contains links to Dashboard, Certificates, Content CMS, Analytics, and Settings. The cluster/system status block has been removed.

---

## 7. Public Routes

| Route                              | Current behavior                                                           |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `/`                                | Landing page; displays an active MongoDB job count in the status area.     |
| `/about`                           | About page with company and service content.                               |
| `/services`                        | Services overview page.                                                    |
| `/programs`                        | Programs and pathways page.                                                |
| `/careers`                         | Active MongoDB jobs and internships in responsive cards.                   |
| `/internships`                     | Active MongoDB internships.                                                |
| `/news`                            | Published MongoDB news records.                                            |
| `/contact`                         | Public contact form.                                                       |
| `/customer-support`                | Customer support form.                                                     |
| `/verify-certificate`              | Certificate ID input form.                                                 |
| `/verify-certificate/[id]`         | Database verification and redirect decision route.                         |
| `/verify-certificate/[id]/valid`   | Data-backed valid certificate page.                                        |
| `/verify-certificate/[id]/invalid` | Invalid/revoked certificate page. Active IDs are redirected back to valid. |
| `/privacy`                         | Privacy page.                                                              |
| `/terms`                           | Terms page.                                                                |
| `/sitemap`                         | Manually maintained sitemap-style page.                                    |
| `/admin`                           | Redirects to `/admin/login`.                                               |

The following routes are not currently implemented even though older specifications describe them:

- `/services/[slug]`
- `/internships/[id]`
- `/internships/apply`
- `/news/[slug]`
- Dedicated applications pages
- Vendor application pages

### Revalidation

- Homepage: 24 hours.
- About and services: approximately 24 hours where configured.
- Programs: approximately 1 hour where configured.
- Careers, internships, and news: 60 seconds.
- Certificate verification result routes: dynamic rendering.

Public page loaders catch database errors and return empty states rather than failing the entire page.

---

## 8. API Routes

### Authentication

| Endpoint                           | Method   | Auth                    | Purpose                                                                             |
| ---------------------------------- | -------- | ----------------------- | ----------------------------------------------------------------------------------- |
| `/api/auth/[...nextauth]`          | GET/POST | Public handler          | NextAuth credentials flow.                                                          |
| `/api/admin/auth/request-otp`      | POST     | Public login step       | Validates credentials, provisions whitelisted admins, creates challenge, sends OTP. |
| `/api/admin/auth/resend-reset-otp` | POST     | Public login/reset step | Checks admin and cooldown; currently has mocked/incomplete reset behavior.          |

### Certificates

| Endpoint                    | Method | Auth             | Purpose                                                               |
| --------------------------- | ------ | ---------------- | --------------------------------------------------------------------- |
| `/api/certificates`         | GET    | Currently public | Paginated certificate list with status/search filters.                |
| `/api/certificates`         | POST   | Admin role       | Creates a certificate.                                                |
| `/api/certificates/[id]`    | PATCH  | Admin role       | Updates certificate fields/status according to route implementation.  |
| `/api/uploads/certificates` | POST   | Admin role       | Uploads PDF/PNG certificate assets to Cloudinary.                     |
| `/api/verify/[id]`          | GET    | Public           | Returns safe public certificate data and records active verification. |

### CMS

The following resources have public GET handlers and authenticated write handlers:

- `/api/cms/jobs`
- `/api/cms/jobs/[id]`
- `/api/cms/internships`
- `/api/cms/internships/[id]`
- `/api/cms/news`
- `/api/cms/news/[id]`

Methods:

- `GET`: list resource records.
- `POST`: create records.
- `PATCH`: update records by ID.
- `DELETE`: delete records by ID.

The public GET handlers currently return all records, so inactive/unpublished filtering is performed by public page loaders rather than guaranteed by the API.

### Admin management

| Endpoint                 | Method | Auth        | Purpose                         |
| ------------------------ | ------ | ----------- | ------------------------------- |
| `/api/admin/admins`      | GET    | Super admin | List administrators.            |
| `/api/admin/admins`      | POST   | Super admin | Invite/create an administrator. |
| `/api/admin/admins/[id]` | PATCH  | Super admin | Change role or active status.   |

### Contact

`POST /api/contact`:

1. Rejects honeypot-filled submissions with a silent success response.
2. Validates name, email, message, and maximum message length.
3. Creates a `ContactSubmission` document in MongoDB.
4. Sends the submission through Resend.
5. Marks the document `emailed` or `email_failed`.
6. Returns success or a delivery failure response.

`FAIL_TEST` and `fail@test.com` remain deliberate test failure triggers.

---

## 9. MongoDB Models

All models use Mongoose and are located in `src/models/`.

### Admin

`src/models/Admin.ts`

- `email`: required, unique, lowercase.
- `name`: optional.
- `passwordHash`: optional and excluded from normal queries.
- `role`: `super_admin`, `admin`, or `manager`.
- `isActive`: indexed boolean.
- `lastOtpSentAt`, `lastLoginAt`, `passwordUpdatedAt`.
- Automatic `createdAt` and `updatedAt`.

### AdminLoginChallenge

Stores hashed OTP challenges.

- Admin reference and normalized email.
- `otpHash`.
- `expiresAt`.
- Attempt count.
- Optional `consumedAt`.
- Purpose: `login` or `password_reset`.
- Reset-token fields for planned reset support.
- TTL behavior removes old challenges after the configured lifecycle.

### Certificate

`src/models/Certificate.ts`

- Unique uppercase `verificationId`.
- Candidate name, email, optional phone/photo.
- Internship role, department, organization.
- Issue/start/end dates and optional duration.
- Optional description and achievement badges.
- Status: `active` or `revoked`.
- Optional certificate PDF/image URLs and Cloudinary public ID.
- `verificationCount` and `lastVerifiedAt`.
- Automatic timestamps.

### JobListing

`src/models/JobListing.ts`

- `title`: required.
- Optional `department` and `location`.
- `mode`: `remote`, `onsite`, or `hybrid`.
- `description`: required.
- `requirements`: string array.
- `isActive`: indexed boolean.
- Optional deadline.
- Automatic timestamps.

### Internship

`src/models/Internship.ts`

Same core fields as `JobListing`, plus:

- Optional `duration`.
- Optional `stipend`.

### NewsUpdate

`src/models/NewsUpdate.ts`

- Required title, unique slug, and content.
- Optional excerpt, cover image, author.
- Tags array.
- `isPublished` and optional `publishedAt`.
- Automatic timestamps.

### ContactSubmission

`src/models/ContactSubmission.ts`

- Required name, email, subject, and message.
- Optional phone.
- Delivery status: `new`, `emailed`, or `email_failed`.
- Optional `emailSentAt` and `emailError`.
- Automatic timestamps.

This model replaced the previous Supabase `contact_submissions` write path.

---

## 10. Services And Data Access

### MongoDB connection

`src/lib/mongodb.ts` caches the Mongoose connection on the global object. This prevents repeated connections during Next.js development hot reloads and supports serverless reuse.

Every MongoDB service calls `dbConnect()` before querying.

### CMS service

`src/services/cms.service.ts` handles:

- `listJobs`, `createJob`, `updateJob`, `deleteJob`.
- `listInternships`, `createInternship`, `updateInternship`, `deleteInternship`.
- `listNews`, `createNews`, `updateNews`, `deleteNews`.

The public pages map these service results into their existing client props:

- Careers filters active jobs and internships.
- Internships filters active internships.
- News filters published news.
- Homepage counts active jobs.

### Certificate service

`src/services/certificate.service.ts` handles:

- Verification ID normalization.
- Certificate lookup.
- Pagination and search.
- Certificate creation and duplicate checks.
- Certificate updates.
- Verification count and timestamp updates.

### Dashboard service

`src/services/dashboard.service.ts` calculates:

- Total certificates.
- Active certificates.
- Revoked certificates.
- Total verification count.
- Recent certificates.
- Recent verifications.
- Most verified certificates.

The analytics page includes an approximation for some verification distribution metrics; it is not a complete per-certificate aggregation.

### Upload service

`src/services/upload.service.ts` validates and uploads certificate assets.

- Accepted types: PDF and PNG.
- Maximum size: 15 MB.
- Certificate folder: `solvimate/certificates`.
- Uses uppercase verification ID as Cloudinary public ID.
- PDFs are uploaded as `raw`; PNGs as `image`.
- Existing assets can be overwritten for the same verification ID.

### Admin service

`src/services/admin.service.ts` supports listing and creating admin records and converting database documents into safe payloads for the settings UI.

---

## 11. Authentication Flow

The admin login is a two-step email/password plus OTP flow.

### Request OTP

1. The login form submits email and password to `/api/admin/auth/request-otp`.
2. Whitelisted emails are synchronized into MongoDB.
3. The active admin is located.
4. If a password hash exists, the password is checked with bcrypt.
5. A cooldown is applied using `lastOtpSentAt`.
6. Existing pending login challenges are consumed.
7. A numeric OTP is generated and bcrypt-hashed.
8. A challenge document is stored.
9. The OTP is sent through Resend using `RESEND_FROM_EMAIL`.
10. The admin receives a challenge ID and expiry.

### Verify OTP

1. The login form submits email, password, OTP, and challenge ID through NextAuth credentials sign-in.
2. The challenge is checked for ownership, purpose, expiry, consumed state, and attempt count.
3. The OTP is compared with bcrypt.
4. The challenge is consumed.
5. First-login password provisioning stores a hash if the admin had no password hash.
6. NextAuth creates a JWT session.
7. The JWT stores admin ID and role.
8. The session callback exposes those values on `session.user`.

### Session

- Strategy: JWT.
- Maximum age: 30 days.
- Sign-in page: `/admin/login`.

### Important authentication gaps

- `lastLoginAt` exists and is shown in Settings, but successful login does not currently update it.
- Password-reset resend is not a complete email reset flow.
- The admin update API does not fully prevent self-demotion or self-deactivation server-side.

---

## 12. Admin Portal

### Protected routes

`src/middleware.ts` protects:

- `/admin/dashboard`
- `/admin/certificates`
- `/admin/analytics`
- `/admin/settings`
- `/admin/cms`

Middleware checks for a NextAuth token. Individual pages and API handlers also check roles.

### Roles

- `super_admin`: all normal admin features plus admin management.
- `admin`: admin operations, but not administrator management.
- `manager`: admin operations, but not administrator management.

### Dashboard

`/admin/dashboard` loads the overview from `getDashboardOverview()` and displays certificate health, verification activity, and recent records.

### Certificates

`/admin/certificates` supports certificate asset upload and certificate metadata creation. Recent certificates are shown in the admin panel.

### CMS

`/admin/cms` provides tabs/components for jobs, internships, and news. These interact with the CMS API routes and MongoDB models.

### Analytics

`/admin/analytics` displays certificate-related analytics and management tables. Some high-level values are approximations based on aggregate counters.

### Settings

`/admin/settings` displays:

- Current email.
- Role/access level.
- Last login value from the Admin record.
- Authentication method indicator.
- Multi-factor authentication status.
- Sign out and end session action.
- Super-admin admin-management table when applicable.

### Unused simulated portal

`src/app/admin/AdminPortalClient.tsx` contains a separate simulated login/portal experience. `/admin` does not use it; the route redirects to the real NextAuth login at `/admin/login`.

---

## 13. Certificate Flow

### Public lookup

1. User opens `/verify-certificate`.
2. User enters an ID.
3. The form navigates to `/verify-certificate/[id]`.
4. The dynamic server route normalizes the ID to uppercase.
5. MongoDB is queried by `verificationId`.
6. Missing or revoked records redirect to `/verify-certificate/[id]/invalid`.
7. Active records increment `verificationCount` and update `lastVerifiedAt`.
8. Active records redirect to `/verify-certificate/[id]/valid`.

### Valid page

The valid page performs a second server-side active check before rendering. It displays:

- Verification status.
- Certificate ID.
- Candidate name and optional photo.
- Internship role, department, and organization.
- Description.
- Issue/start/end dates.
- Duration.
- Active status.
- Verification timestamp and count.
- Achievement badges.
- View/download certificate asset actions.
- Copy certificate ID action.

If a valid certificate ID is manually opened under the invalid route, the invalid route rechecks MongoDB and redirects back to the valid route.

### Invalid page

The invalid page displays a verification-failed state for missing or revoked IDs, with:

- Certificate ID.
- Invalid/revoked/not-found explanation.
- Support link.
- Error code.
- Home and verify-another-ID actions.

### Public verification API

`GET /api/verify/[id]` returns safe public certificate fields. It does not expose private email, phone, or internal Cloudinary data beyond public media URLs defined by the route.

---

## 14. Contact And Support Flow

Both the public contact form and customer-support form submit to `/api/contact`.

### Request handling

1. JSON body is parsed.
2. Honeypot submissions return a silent success response.
3. Name, email, message, and message length are validated.
4. A `ContactSubmission` document is created in MongoDB.
5. The message is emailed through Resend.
6. User-provided HTML is escaped before email rendering.
7. MongoDB status is updated to `emailed` or `email_failed`.
8. The API returns success or a delivery error.

### Resend addresses

- Sender: `RESEND_FROM_EMAIL`.
- Contact recipient: `RESEND_CONTACT_EMAIL`.
- If `RESEND_CONTACT_EMAIL` is empty, the recipient falls back to the sender value.

The route intentionally does not write to Supabase anymore.

---

## 15. Careers, Internships, And News

### Careers

`src/app/careers/page.tsx` calls `listJobs()` and `listInternships()` in parallel. It filters to `isActive` records and normalizes them into a shared opening type.

`CareersSection` displays responsive cards with:

- Opening type.
- Open status.
- Title.
- Description.
- Department.
- Mode.
- Apply link to customer support with the title prefilled as the subject.

The page uses a Jobs/Internships filter. The card grid supports a maximum of four cards per row on wide screens, then responds down to three, two, and one column.

Location and duration are currently not displayed inside the careers cards, although the data model still supports them.

### Internships

The page calls `listInternships()`, filters active records, and maps them to the existing `InternshipListing` client shape. The UI supports expandable details and an apply link to customer support.

There is no dedicated internship application model or resume upload flow in the current runtime.

### News

The page calls `listNews()`, filters `isPublished`, and maps an excerpt/content value into the existing news card shape. News records have slugs, but a public `/news/[slug]` detail route is not currently implemented.

---

## 16. Theme, Styling, Animation, And Localization

### Color tokens

Defined in `src/lib/theme/tokens.ts` and reflected in global CSS:

| Token   | Value     | Role                                 |
| ------- | --------- | ------------------------------------ |
| Ink     | `#001E2B` | Main dark background                 |
| Surface | `#0A2E3D` | Cards and elevated surfaces          |
| Lime    | `#BEFE72` | Primary accent and CTA               |
| Mint    | `#37FB89` | Secondary accent and active states   |
| Mist    | `#9FB8B4` | Secondary text and borders           |
| Paper   | `#F5FBF2` | High-contrast text and light surface |
| Error   | `#EF4444` | Semantic errors                      |

### Fonts

Loaded in `src/app/layout.tsx`:

- Inter Tight.
- Space Grotesk.
- IBM Plex Mono.

The current theme token mapping intentionally uses the Inter Tight stack for display, body, and mono groups so the public and admin interfaces remain consistent.

### Design rules

- styled-components is the primary styling system.
- Public and admin surfaces use shared CSS variables and theme tokens.
- Cards generally use 8-12px geometry in the newer UI surfaces.
- Buttons and inputs use accessible focus/hover states.
- Admin settings, certificate result pages, and the careers page follow the Ink/Surface/Lime/Mint palette.

### Motion

- GSAP scroll reveal hook is used by several public client shells.
- The home page includes an animated waveform background.
- The About, Services, Careers, and Contact areas use the scroll-reactive globe where mounted.
- Reduced-motion behavior is implemented by relevant animation components.

### Localization

Supported locale files:

- `src/locales/en.json`
- `src/locales/de.json`
- `src/locales/es.json`
- `src/locales/fr.json`
- `src/locales/hi.json`

`LanguageContext` stores the selected locale under `solvimate-locale`. Translation calls fall back to English when a key is unavailable.

---

## 17. Cloudinary And Email Integrations

### Cloudinary

`src/lib/cloudinary.ts` configures Cloudinary using environment variables. Certificate uploads are handled through `src/services/upload.service.ts` and the authenticated upload API route.

### Resend

`src/lib/resend.ts` exports:

- `resend`: configured Resend client.
- `FROM`: `RESEND_FROM_EMAIL` or the fallback `Solvimate <operations@solvimate.com>`.

Resend is used for:

- Admin OTP delivery.
- Contact form notifications.

Admin OTP email markup is in `src/lib/emails/admin-otp.ts`.

There is no Nodemailer transporter in the current dependency set or runtime.

---

## 18. Supabase Status

Supabase is no longer an active data source for the current public pages or contact form.

Remaining Supabase files:

- `src/lib/supabase/client.ts`.
- `src/lib/supabase/server.ts`.
- `supabase/migrations/` legacy SQL files.

The legacy migrations describe tables such as:

- `profiles`.
- `contact_submissions`.
- `job_listings`.
- `internships`.
- `news_articles`.

Those schemas differ from the Mongoose models. The runtime now uses MongoDB for:

- Jobs.
- Internships.
- News.
- Certificates.
- Admins and OTP challenges.
- Contact submissions.

The Supabase dependency and helper files can be removed in a separate cleanup after confirming no deployment or migration tooling still relies on them.

---

## 19. Known Gaps And Risks

These are current implementation facts, not completed features:

- CMS GET endpoints expose all records publicly, including inactive or unpublished records.
- Certificate list GET is currently publicly readable.
- Some write routes accept request bodies without complete route-level Zod validation.
- Password-reset OTP resend behavior is incomplete or mocked.
- `lastLoginAt` is not updated by successful login.
- Admin self-demotion/self-deactivation protection is incomplete server-side.
- Analytics includes approximation logic rather than a full per-certificate aggregation.
- Contact forms have honeypot protection but no persistent rate limiter.
- Careers and internships do not persist applications in an Application model.
- News has no public slug detail route.
- Privacy, terms, and sitemap content are minimal or manually maintained.
- The current environment template contains legacy variables that are not required by the runtime.
- Some installed dependencies and older spec documents may no longer reflect actual usage.
- Secret values must be rotated if they are exposed outside secure local configuration.

Before production deployment, review authorization on all GET endpoints, add rate limiting, complete application persistence, and remove or isolate legacy integrations.

---

## 20. Development Workflow

### Before editing

1. Read the relevant route, feature, model, and service files.
2. Follow the existing TypeScript and styled-components patterns.
3. Avoid changing Supabase schemas, MongoDB models, auth contracts, or public APIs unless the task requires it.
4. Preserve user changes in a dirty worktree.

### During editing

- Use `apply_patch` for focused edits.
- Keep public props and server/client boundaries explicit.
- Keep secret values out of source, logs, and documentation.
- Prefer existing services over direct model queries in UI routes.
- Add validation for user-facing route/API changes.

### After editing

Run the smallest relevant checks first:

```bash
npx eslint path/to/changed-file.tsx
npx tsc --noEmit
```

Then use broader checks when the change crosses shared infrastructure:

```bash
npm run lint
npm run build
```

### Data changes

For MongoDB changes:

1. Update the model interface and schema.
2. Update the owning service.
3. Update API handlers.
4. Update server page mappings.
5. Update client prop types and UI.
6. Test empty, active, inactive, invalid, and failure states.

---

## 21. Deployment Checklist

- [ ] Set `MONGODB_URI` in the deployment environment.
- [ ] Set a strong `NEXTAUTH_SECRET`.
- [ ] Set `NEXTAUTH_URL` if required by the deployment configuration.
- [ ] Set `RESEND_API_KEY`.
- [ ] Set a verified `RESEND_FROM_EMAIL`.
- [ ] Set `RESEND_CONTACT_EMAIL` to the intended operations inbox.
- [ ] Set Cloudinary credentials for certificate uploads.
- [ ] Allow the deployment environment to connect to MongoDB Atlas.
- [ ] Confirm admin whitelist emails are configured.
- [ ] Test admin login, OTP expiry, and OTP rate limits.
- [ ] Test certificate upload and public verification.
- [ ] Test active, revoked, and missing certificate IDs.
- [ ] Test careers, internships, and published news from MongoDB.
- [ ] Test contact form persistence and Resend delivery.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Verify mobile layouts at 375px, 768px, and 1440px widths.
- [ ] Review public API authorization before production launch.
- [ ] Rotate any credentials that may have been exposed during development.

### Production commands

```bash
npm run build
npm run start
```

For Vercel or another managed host, configure environment variables in the hosting provider rather than committing `.env.local`.

---

## 22. Difference From The Legacy Sample

`sampleslovimate.md` is a useful product handoff reference, but it describes an earlier intended architecture. The current repository differs in important ways:

| Legacy sample                 | Current repository                                               |
| ----------------------------- | ---------------------------------------------------------------- |
| Next.js 15                    | Next.js 16.2.12                                                  |
| JavaScript/JSX                | TypeScript/TSX                                                   |
| Tailwind CSS                  | styled-components and CSS variables                              |
| Nodemailer                    | Resend                                                           |
| NextAuth v5 beta              | NextAuth v4                                                      |
| Supabase public content       | MongoDB services                                                 |
| Supabase contact storage      | MongoDB `ContactSubmission`                                      |
| `Contact` model               | `ContactSubmission` model                                        |
| Full application/resume flow  | Not implemented; links go to support                             |
| `/dashboard` route family     | `/admin` route family                                            |
| Google OAuth                  | Credentials plus OTP                                             |
| Services detail routes        | Not implemented                                                  |
| Internship/news detail routes | Not implemented                                                  |
| Full application dashboard    | Certificate/CMS/analytics/settings admin panel                   |
| Legacy brand colors           | Ink `#001E2B`, Surface `#0A2E3D`, Lime `#BEFE72`, Mint `#37FB89` |

When the sample and runtime disagree, use the runtime code and this document as the current source of truth. Update this document when a feature or architecture changes.

---

> **Solvimate - Grow Together**
>
> This handoff describes the implementation inspected on 2026-09-10.
