# Solvimate UI redesign — implementation plan for Antigravity IDE

22 steps, same format as `Solvimate_Implementation_Plan.md`: each is a self-contained prompt to paste into Antigravity, followed by a definition of done to check before moving on. This plan implements what `Solvimate_UI_Design_Specification.md` specifies — attach that file (and the `client-logos/` folder) to the Antigravity workspace before starting, since most prompts point back at it instead of re-stating token values.

## How this fits with the existing implementation plan

The full application described in `Solvimate_Technical_Specification.md` and `Solvimate_Implementation_Plan.md` is already built end to end — every page, the Supabase-backed data, the contact flow, the whole functional surface. Nothing in this document touches any of that. This is a **visual-only re-skin pass over an already-working app**: every step below replaces styling on an existing component, never its logic, its data fetching, its validation, or its accessibility behavior. If a step here seems to ask for something to be "built," read it as "re-skinned" — the component already exists; only its tokens, colors, type, and the two new signature components (wave background, logo marquee) are new.

Because everything already exists, sequencing is simpler than a from-scratch build: land Steps 1–3 (tokens, fonts, theme) first, since every other step depends on the token system being in place — re-skinning the nav before the tokens exist just means redoing it once the tokens land. After that, order across pages doesn't matter functionally; going roughly top-to-bottom (global shell → home → remaining pages → QA) just means you see the new look accumulate page by page rather than all at once at the end.

---

## Phase A — Tokens and type

### Step 1 — Fonts

**Prompt:**

> Add Space Grotesk, Manrope, and IBM Plex Mono via `next/font/google`. Configure Space Grotesk (weights 500/600) for the display role, Manrope (weights 400/500) for body, and IBM Plex Mono (weights 400/500) for the utility/mono role, per the UI design spec's typography table. Expose them as CSS variables on the root layout so styled-components can reference them.

**Definition of done:**

- [ ] All three fonts load with no FOUT/layout shift on first paint
- [ ] Font variables are available globally, not re-declared per component

### Step 2 — Theme tokens (dark + light)

**Prompt:**

> Build the styled-components theme object with the color tokens from the UI design spec: Ink `#001E2B`, Surface `#0A2E3D`, Lime `#BEFE72`, Mint `#37FB89`, Mist `#9FB8B4`, Paper `#F5FBF2`, plus the spacing/radius/motion tokens (8px/12px radius, 64–96px section rhythm desktop / 40–56px mobile, 200–300ms interaction transitions). The design spec is dark-first and doesn't fully define a light-mode mapping — since the existing functional spec requires a working light/dark toggle, extend the token set with a light variant now: Paper as the light background, a near-white surface for cards, Ink for text, Lime/Mint accents unchanged (they hold up on a light background), and a darker muted teal (not Mist itself — it's too low-contrast on white) for light-mode secondary text. Flag this mapping for a quick look since it's an assumption filling a gap the spec left open, not a stated requirement.

**Definition of done:**

- [ ] Theme object exports both dark and light token sets from one source of truth
- [ ] Light-mode secondary text meets contrast on a white/near-white background (check with a contrast tool, not by eye)

### Step 3 — Apply tokens through the existing theme system

**Prompt:**

> Wire the new theme object into the `ThemeProvider` built in the original plan's Step 6, replacing whatever placeholder tokens exist there. Confirm the dark/light toggle still works end to end with the new values, and that the no-flash pre-hydration script from Step 5 still reads the correct default.

**Definition of done:**

- [ ] Toggling theme swaps the full new palette with no flash, no console warnings
- [ ] No component still references an old/placeholder color value directly instead of a theme token

---

## Phase B — Signature components

### Step 4 — Animated wave background

**Prompt:**

> Build an `AnimatedWaveBackground` component per the UI design spec's technical approach: two to three thin SVG wave paths in Lime and Mint at 20–35% opacity, each looping horizontally at a different speed via CSS `transform: translateX()` keyframes, positioned absolutely behind content with `pointer-events: none`. Mount it only in the hero — not globally. Under `prefers-reduced-motion`, disable the animation entirely and render a single static wave line instead of removing the element outright.

**Definition of done:**

- [ ] Renders behind hero content without blocking clicks on anything in front of it
- [ ] Simulating `prefers-reduced-motion: reduce` shows a static wave, not a frozen mid-animation frame and not a blank gap
- [ ] No measurable delay to first paint (check Lighthouse) from adding it

### Step 5 — Logo marquee

**Prompt:**

> Build a `LogoMarquee` component using the nine files in `client-logos/` (already background-stripped and height-normalized to the design spec's spec). Render the set twice in one flex track, no card/tile wrapper around any logo — each is a bare `<img>`, height-normalized, gap-spaced — animate `translateX(0)` → `translateX(-50%)` linear infinite over ~25–30s. At rest, each logo sits at reduced opacity (~55%); hovering the whole strip pauses the animation via `animation-play-state: paused`; hovering an individual logo brings that one to full opacity independent of the pause. Under `prefers-reduced-motion`, skip the animation and wrap the logos onto a static row instead, keeping the opacity treatment.

**Definition of done:**

- [ ] Loop is seamless — no visible jump or gap where the track resets
- [ ] Hovering the strip pauses it; hovering one logo brightens only that one without restarting the track
- [ ] `prefers-reduced-motion` shows a static, wrapped row with no scroll
- [ ] Kuku FM's logo is flagged as a placeholder pending an official transparent export — visible in code comments or a tracked TODO, not silently shipped as final

### Step 6 — Logo lockup

**Prompt:**

> Update the nav/header logo treatment to combine the existing mark with a typeset "SOLVIMATE" wordmark in Space Grotesk (600 weight), per the UI design spec's recommendation, rather than sourcing a separate raster wordmark asset.

**Definition of done:**

- [ ] Lockup renders correctly at both mobile (icon only, if space is tight) and desktop (icon + wordmark) sizes
- [ ] Wordmark uses the theme's font token, not a hardcoded font-family

---

## Phase C — Global shell (re-skin of the existing nav/footer from original Steps 8–9)

### Step 7 — Nav re-skin

**Prompt:**

> Style the nav against the new tokens: Ink/Surface background depending on scroll position, Lime active-link underline, Mist inactive-link color, Manrope throughout, 13px nav type (smaller than a typical nav, per the redesign's smaller-type direction).

**Definition of done:**

- [ ] Active route is visually distinct using Lime, not just a weight change
- [ ] Nav type is noticeably smaller than the original site's, not just a different color

### Step 8 — Footer re-skin

**Prompt:**

> Style the footer against the new tokens: Ink background, Mist body text, Lime hover state on links, Manrope throughout.

**Definition of done:**

- [ ] Footer is legible in both theme modes
- [ ] Hover states use Lime consistently with the rest of the interactive elements

---

## Phase D — Home page (re-skin of the existing home page from original Steps 11–17)

### Step 9 — Hero re-skin

**Prompt:**

> Style the hero per the UI design spec: `AnimatedWaveBackground` mounted behind the content, IBM Plex Mono eyebrow line, Space Grotesk headline sized 34–40px desktop / 26px mobile (deliberately smaller than the original's ~96px), Manrope subhead, single Lime CTA button with Ink text.

**Definition of done:**

- [ ] Headline is measurably smaller than the pre-redesign size, not just restyled
- [ ] Wave background doesn't interfere with CTA click target
- [ ] Text remains legible over the animated background at all three responsive breakpoints

### Step 10 — Trusted-by section

**Prompt:**

> Replace the placeholder carousel in the home page's "Trusted by" section with the `LogoMarquee` component from Step 5.

**Definition of done:**

- [ ] Real client logos scroll in the actual page, not just in isolation
- [ ] Section height doesn't jump when the marquee's images finish loading

### Step 11 — Services (3-column) re-skin

**Prompt:**

> Style the home page's 3-column services section with Surface-tone cards on the Ink background, Mint used sparingly for icon accents, flat fills only — no gradients on the cards.

**Definition of done:**

- [ ] Cards read as a consistent set, not three different treatments
- [ ] Collapses cleanly to 1-column on mobile with the new spacing tokens

### Step 12 — Banner / dubbing highlight / journey re-skin

**Prompt:**

> Re-skin the banner, dubbing highlight, and journey sections: keep the existing imagery, but add a scrim (a solid low-opacity Ink overlay, not a drop shadow) behind any Paper-colored text so it stays legible without needing a text-shadow hack.

**Definition of done:**

- [ ] Text is legible over every banner image used, including the busiest one
- [ ] No drop-shadow or blur used to force legibility — the scrim does the work

### Step 13 — Testimonials re-skin

**Prompt:**

> Replace the original solid-emerald testimonial block with Surface-tone cards, each with a full (not partial-corner) Lime left border rather than a colored card background.

**Definition of done:**

- [ ] No section on the home page still uses a full-bleed accent-color background other than the hero/CTA
- [ ] All three testimonials remain readable in both theme modes

### Step 14 — FAQ accordion re-skin

**Prompt:**

> Style the FAQ accordion with the new tokens: Ink background, Lime chevron rotation on expand, Manrope body at the smaller base size (15px). Keep the existing keyboard/aria behavior from the original build untouched.

**Definition of done:**

- [ ] Visual restyle only — keyboard operability and `aria-expanded` behavior from the original implementation still pass
- [ ] Chevron rotation is the only new motion added here (no additional animation layered on)

### Step 15 — Closing CTA re-skin

**Prompt:**

> Style the closing CTA section with the same Lime-button/Ink-text pattern as the hero, so the two bookend the page consistently.

**Definition of done:**

- [ ] Visually consistent with the hero CTA, not a separate button style

---

## Phase E — Remaining pages (re-skin of the existing pages from original Steps 18–27)

### Step 16 — About page re-skin

**Prompt:**

> Style the About page sections against the new tokens — same Surface-card pattern as the home page, Manrope body copy, Space Grotesk section headings.

**Definition of done:**

- [ ] Visually consistent with home page treatment, no one-off styles introduced

### Step 17 — Services page re-skin

**Prompt:**

> Style the Services page: the six service groups as Surface cards, the stats band in IBM Plex Mono per the type specimen, "Why Choose Solvimate" section, and the "Get a Free Quote" CTA in the Lime/Ink pattern.

**Definition of done:**

- [ ] Stats counters visually use the mono face, distinct from body copy
- [ ] All six groups read as one consistent set of cards

### Step 18 — Careers / Internships / Programs / News re-skin

**Prompt:**

> Style these four pages with the same Surface-card pattern. Status badges (Available/Open) use Mint text on a low-opacity Mint background rather than a generic green/gray pill.

**Definition of done:**

- [ ] Status badges are visually distinct from a default green "success" pill — recognizably on-brand
- [ ] Empty-state copy (no internships/news) still renders correctly with the new styling

### Step 19 — Contact / customer forms re-skin

**Prompt:**

> Style both forms: Surface-tone container, Lime submit button, Mist-bordered fields that brighten to Lime on focus. Toast styling follows the palette for success (Mint) but keeps error/danger toasts on a standard red/orange semantic color rather than forcing them into the brand palette, so errors are still immediately recognizable as errors.

**Definition of done:**

- [ ] Focus state is clearly visible (Lime border), not just a default browser outline
- [ ] Error toasts are visually distinct from success toasts at a glance — semantic color wins over brand color here

---

## Phase F — QA

### Step 20 — Cross-page token audit

**Prompt:**

> Grep the codebase for hardcoded hex values or color names outside the theme object. Every color reference should resolve through a token, not a literal value, so a future palette change doesn't require a page-by-page hunt.

**Definition of done:**

- [ ] Zero hardcoded brand colors found outside the theme file
- [ ] Responsive check redone at 375 / 768 / 1440 against the final styling, not just per-component in isolation

### Step 21 — Reduced-motion audit (redesign-specific)

**Prompt:**

> Specifically re-check the two new animated elements — `AnimatedWaveBackground` and `LogoMarquee` — under `prefers-reduced-motion`, in addition to the GSAP reveals already covered in the original plan's Step 30.

**Definition of done:**

- [ ] Both new components fall back to their static states correctly
- [ ] No console errors when the media query toggles mid-session (e.g. via OS settings change while the tab is open)

### Step 22 — Contrast audit

**Prompt:**

> Run an automated contrast check (e.g. axe or Lighthouse accessibility audit) across both light and dark themes on every page. Pay particular attention to Mist-on-Ink text and Lime-button-on-Ink/Paper combinations, since those are new pairings introduced by this redesign.

**Definition of done:**

- [ ] Lighthouse accessibility score ≥ 90 in both theme modes
- [ ] No text/background pairing introduced by the redesign fails WCAG AA
