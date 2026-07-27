# Specification Document: Solvimate Replica (Dubbing Solutions Website)

## 1. Overview

A marketing and lead-capture website for **Solvimate**, a company providing translation, transcription, dubbing, voice-over, localization, data annotation, content development, and IT/platform support services. The site is a multi-page application with a dark/light theme, multi-language support, animated sections, and form-based contact (no live chat widget exists on the original).

**Tech baseline observed on the original:** Next.js (App Router), styled-components, GSAP/scroll animations, toast notifications, client-side form POST to `/api/contact`, theme persisted in `localStorage`.

---

## 2. Functional Requirements

### 2.1 Global Shell & Navigation

- Fixed top navigation bar with the Solvimate logo (links home), nav links: **Home, About, Services, Careers, Contact**, a **Get Started** CTA button, a language switcher, and a dark/light theme toggle.
- Language switcher supports: **English, Deutsch, Español, Français, हिंदी (Hindi)**. Selected language is remembered across pages and reloads.
- Theme toggle switches between dark (default) and light. Choice is saved in `localStorage` under key `solvimate-theme` and applied before first paint to avoid a flash.
- Footer on every page containing: company tagline ("At Solvimate, we empower you to confidently connect with the world."), **Quick Links** (Sitemap, Privacy Policy, Terms of Service, plus main pages), and social links: **LinkedIn** (linkedin.com/company/solvimate-grow-together), **X/Twitter**, **Instagram**.
- A 404 / not-found page for unknown routes.

### 2.2 Home Page

- **Hero:** Pill badge "Building the Future of AI", headline "SOLVIMATE empowers brands with seamless translation, transcription, and dubbing solutions.", supporting line "At Solvimate, we empower you to confidently connect with the world.", and a **Get Started** button.
- **Trusted by Leading Companies:** A horizontally scrolling/parallax logo carousel of client companies.
- **Our Services (3-column):** Translation & Localization, Dubbing & Voice-over, Transcription & Recording, each with a short description.
- **Banner section:** "Confidently Share Your Story Globally" with a large banner image and descriptive paragraph.
- **Dubbing highlight:** "Your Voice, Your World." / "Transforming content with seamless, professional, and expressive dubbing services."
- **Journey section:** "Journey with SOLVIMATE" / "Learn, Grow - The Journey Never Ends" with parallax imagery.
- **Brief note (emerald background):** Large statement "SOLVIMATE empowers brands with seamless translation, transcription, and dubbing solutions."
- **Testimonials (emerald background, 3 cards):** Quotes from Cameron Williamson, Esther Howard, and Robert Fox about translation/voice-over, subtitling, e-learning localization, and data annotation.
- **FAQ accordion:** Four questions:
  1. What services does Solvimate provide? -> Lists Translation, Localization, Transcription, Dubbing, Voice-over, Subtitling.
  2. Do you offer subtitling and dubbing services for videos? -> Yes; accuracy, cultural adaptation, professional voice talent.
  3. Do you work with individuals as well as agencies? -> (Answer present in source.)
  4. Can you handle large-scale projects with tight deadlines? -> Yes; dedicated team, structured workflow, quality assurance.
- **Closing CTA:** "Join us and unlock your potential today." / "we've got you covered."
- Scroll-triggered reveal/mask animations on headings and images.

### 2.3 About Page

- Headline "Content Solutions that..." with sub-tags EdTech Expertise, AI-Ready Data.
- Company description: Solvimate operates at the crossroads of education, language, and AI; MSME registered and GST compliant (UDYAM-UP-75-0114640); team of annotators, linguists, content writers, voice artists, tech specialists.
- Sections: What We Stand For, Service Sectors, Our Services, Join Our Team, Get in Touch, Grow Together.

### 2.4 Services Page

- Title "Six Sectors. One Mission." / "Our Services".
- Six service groups, each with sub-items:
  1. **Translation & Localization** - Document Translation, Website Localization, Cultural Adaptation.
  2. **Dubbing Projects** - Film Dubbing, E-learning VO, Commercial Voice-over, Multi-speaker.
  3. **Transcription & Recording** - Audio Transcription, Video Transcription, Multi-speaker.
  4. **Data Collection & Annotation** - Text Annotation, Image Labeling, Audio Annotation.
  5. **Content Development** - K-12 Curriculum, Assessment Design, EdTech Content, Digital Learning.
  6. **IT & Platform Support** - Platform Integration, Workflow Automation, Technical Support, Digital Infrastructure.
- **Stats band:** Languages Supported, Global Clients, Transcriptions Delivered (numeric counters).
- **Why Choose Solvimate:** Native linguists / Regional Dialects, Fast Turnaround, No Hidden Costs, Long-term Partnership.
- **CTA:** "Get a Free Quote" / "Tell us about your project and our team will get back to you within 24 hours with a tailored solution." -> links to contact/customer form.

### 2.5 Careers / Jobpage

- Title "Opportunities" with two tracks: **For Candidates** (freelance & project-based roles for individuals) and **For Vendors** (agency & team-level partnerships for bulk projects).
- Project categories: Recording, Transcription, Data Annotation, Content Creation, Robotic Video Data Collection.
- Language tags including Dutch (Netherlands), Malaysian.
- Each listing shows an **Available** status and an **Apply Now** button.

### 2.6 Internships & Programs

- **Programs page:** Two paths - Job Opportunities and Internship Programs, with descriptions; a general application option ("Not sure which program fits you? Submit a general application..."); buttons: View Open Positions, Browse Internships, Apply Now, Candidate Application.
- **Internships page:** Lists internship entries; if none, shows "No open internships at the moment. Check back soon!" with a "View Details" affordance per item.

### 2.7 News Page

- Lists news articles; when empty shows "No news articles yet."

### 2.8 Contact Page

- Title "Get in touch"; intro "Reach us directly through any of the channels below or fill in the form and we'll get back to you shortly."
- Direct channels: email (operationssolvimate@gmail.com), phone (+91 6307875230), location (Varanasi, UP, India - links to Google Maps), and Business Hours block.
- **Send us a message** form with fields: Full Name (required), Phone, Email, Subject (default "Project enquiry"), Message. Submit button posts JSON to `/api/contact`.

### 2.9 Customer Form Page

- Heading "Access Global-Quality Language Experts with Solvimate" / "Customer support".
- Form fields: First Name, Last Name, Email, Subject, Message. Submit posts JSON to `/api/contact`.

---

## 3. Chat / Contact Opening Behaviour

The original Solvimate site has **no live chat widget** (no Intercom/Tawk/WhatsApp floating button). All customer interaction is form-based with toast feedback. The replica's "chat opening" behaviour is therefore defined as the contact-form interaction flow:

- **Opening the form:** The contact/customer form is always visible on its page (no popup). The **Get Started** and **Get a Free Quote** buttons across the site navigate to the contact page (or customer form) rather than opening a modal.
- **Form state on load:** All fields empty; submit button enabled; no toast visible.
- **While submitting:** Submit button shows a "Sending..." / loading state and is disabled (cursor `not-allowed`) to prevent duplicate submissions.
- **On success:** A toast notification appears (top-center, polite aria-live) with message "Message sent! We'll be in touch soon." (contact) or "Message sent successfully." (customer form). Form fields reset. Toast auto-dismisses after a few seconds and can be dismissed manually.
- **On failure:** A toast appears with "Failed to send message. Please try again." / "Unable to send message." / "Something went wrong." The form retains entered data so the user can retry without retyping.
- **Validation feedback:** Required-field errors (e.g., "Name is required.") surface inline or via toast; invalid email format is rejected before submission.
- **Accessibility:** Toast region uses `aria-live="polite"`; form inputs have associated labels; the submit button indicates its loading state.

---

## 4. Constraints

- **Framework:** Next.js (App Router) with React Server/Client Components; styled-components for styling; GSAP or equivalent for scroll/reveal animations.
- **Theme:** Dark is the default; theme must be applied pre-hydration from `localStorage` to avoid a flash of the wrong theme. Only two themes (dark/light).
- **Languages:** Exactly five (English, Deutsch, Español, Français, हिंदी). All user-facing strings must be translatable; the switcher must not require a full reload.
- **Responsive:** Must work from mobile (<=768px) to desktop (>=1440px). The original uses explicit mobile breakpoints (e.g., hero font scales from 6rem to 2.5rem; grids collapse 3-col -> 1-col).
- **Contact endpoint:** Forms POST JSON to `/api/contact` with `Content-Type: application/json`. The backend must be implemented (serverless route / edge function) to forward submissions to email or store them.
- **Data persistence:** A Supabase database is available and should be used to store contact submissions (and optionally job/internship listings) with appropriate RLS policies.
- **No external live-chat SDK** is to be added (to match the original).
- **Performance:** Images use Next.js image optimization; fonts preloaded; animations must not block first paint.
- **SEO:** Each page sets its own title and meta description; the home meta description is "Building the future of AI".
- **Legal:** Footer must link to Privacy Policy and Terms of Service pages (content to be drafted).

---

## 5. Edge Cases and Error Handling

- **Empty/missing required fields:** Block submission; show "Name is required." (and equivalent for email/message); highlight the offending field.
- **Invalid email format:** Reject with an inline error before calling the API.
- **Network failure / API unreachable:** Show "Failed to send message. Please try again." and keep form data; do not leave the button stuck in loading.
- **API returns an error status:** Show "Something went wrong." / "Unable to send message."; allow retry.
- **Double-submit prevention:** Disable the submit button and change label to "Sending..." while a request is in flight.
- **Theme flash on load:** Read `localStorage('solvimate-theme')` (default 'dark') in an inline pre-hydration script and set the class before React mounts.
- **Language switch with unsaved form data:** Switching language should not wipe in-progress form input (or should warn the user).
- **No open internships / no news:** Render the dedicated empty-state messages ("No open internships at the moment. Check back soon!" / "No news articles yet.") instead of a blank page.
- **Unknown route:** Render a styled 404 page with a link back home.
- **Slow image load / broken image:** Provide alt text and a placeholder background so layout does not jump.
- **Reduced motion preference:** Honor `prefers-reduced-motion` by disabling parallax/reveal animations.
- **Very long form input:** Cap message length (e.g., 2000 chars) and show a counter to prevent oversized payloads.
- **Bot/spam submissions:** Include a honeypot field or rate limiting on `/api/contact` to reduce spam.

---

## 6. Acceptance Criteria

**Global**

- All pages load with the correct theme applied before first paint, with no flash.
- The language switcher changes all visible copy to the selected language instantly and persists the choice on reload.
- Navigation links route to the correct pages; the active page is indicated.
- Footer appears on every page with working Quick Links and social links.

**Home**

- Hero, services, banner, testimonials, FAQ, and CTA sections all render with the exact copy above.
- The FAQ accordion expands/collapses one item at a time and is keyboard accessible.
- Scroll animations trigger reveal effects on supported devices and are skipped when reduced motion is requested.
- The client logo carousel scrolls continuously and pauses on hover.

**Services**

- All six service groups and their sub-items render; stats counters animate on view.
- "Get a Free Quote" navigates to the contact/customer form.

**Contact / Customer Form**

- Submitting a valid form POSTs JSON to `/api/contact` and shows the success toast with the correct copy; fields reset.
- Submitting with a missing required field shows the correct validation message and blocks the API call.
- A failed/failed-network submission shows the error toast and retains the entered data.
- The submit button enters a disabled "Sending..." state during the request and cannot be clicked twice.

**Careers / Internships / Programs / News**

- The careers page lists opportunity tracks and categories with Apply Now buttons.
- The internships page shows the empty-state message when no internships exist.
- The news page shows the empty-state message when no articles exist.
- The programs page links to jobs, internships, and the general application.

**Responsive & Accessibility**

- Every page is usable at 375px, 768px, and 1440px widths with no horizontal scroll.
- All interactive elements are reachable by keyboard; toast regions announce via aria-live; images have alt text.

**Data**

- Contact submissions are saved to the Supabase database with timestamp and field values, protected by RLS so only authenticated admins can read them.
