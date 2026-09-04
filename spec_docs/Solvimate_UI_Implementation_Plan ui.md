# Solvimate UI redesign — implementation plan for Antigravity IDE

27 steps, same format as `Solvimate_Implementation_Plan.md`: each is a self-contained prompt to paste into Antigravity, followed by a definition of done to check before moving on. This plan implements what `Solvimate_UI_Design_Specification.md` specifies — attach that file (and the `clientlogo/` folder) to the Antigravity workspace before starting, since most prompts point back at it instead of re-stating token values.

## Prerequisites (do once, before Step 1)

- [ ] `Solvimate_UI_Design_Specification.md` and this plan copied into the repo (e.g. `/docs/`) — not left outside the project, so `@`-mentions resolve reliably
- [ ] Solvimate mark confirmed in the `our-site-logo/` folder
- [ ] All nine client logos confirmed in the `clientlogo/` folder (`bayantech.png`, `futurebeeai.png`, `gientech.png`, `joshtalks.png`, `pocketfm.png`, `openai.png`, `uber.png`, `kukufm.png`, `storytv.png`)
- [ ] A dedicated branch created for this pass (e.g. `ui-redesign`) — this touches most of the codebase visually, so keep it isolated and easy to diff against the working app
- [ ] Before-screenshots taken of Home, Services, and Contact at 375 / 768 / 1440 — needed to actually compare against in Steps 20–22, not just eyeball it
- [ ] **Commit after every step, not every phase.** Each step here edits an existing, working component — a git commit right after each one (before starting the next) means a bad step is a one-command revert, not a multi-step untangle. Skipping this and committing per-phase is the single easiest way to turn a clean re-skin into a messy one.
- [ ] No env vars, Supabase, or Vercel changes needed — this pass is frontend-only, existing infra is untouched

## How this fits with the existing implementation plan

The full application described in `Solvimate_Technical_Specification.md` and `Solvimate_Implementation_Plan.md` is already built end to end — every page, the Supabase-backed data, the contact flow, the whole functional surface. Nothing in this document touches any of that. This is a **visual-only re-skin pass over an already-working app**: every step below replaces styling on an existing component, never its logic, its data fetching, its validation, or its accessibility behavior. If a step here seems to ask for something to be "built," read it as "re-skinned" — the component already exists; only its tokens, colors, type, and the two new signature components (wave background, logo marquee) are new.

Because everything already exists, sequencing is simpler than a from-scratch build: land Steps 1–3 (tokens, fonts, theme) first, since every other step depends on the token system being in place — re-skinning the nav before the tokens exist just means redoing it once the tokens land. After that, order across pages doesn't matter functionally; going roughly top-to-bottom (global shell → home → remaining pages → QA) just means you see the new look accumulate page by page rather than all at once at the end.

---

## Phase A — Tokens and type

### Step 1 — Fonts

**Prompt:**

> Add Space Grotesk, Inter Tight, and IBM Plex Mono via `next/font/google`. Configure Space Grotesk (weights 500/600) for the display role, **Inter Tight** (weights 400/500) for body — this replaces the Manrope recommendation from the original UI design spec, per explicit request — and IBM Plex Mono (weights 400/500) for the utility/mono role. Expose them as CSS variables on the root layout so styled-components can reference them.

**Definition of done:**

- [ ] All three fonts load with no FOUT/layout shift on first paint
- [ ] Font variables are available globally, not re-declared per component
- [ ] Every component previously styled with Manrope (nav, footer, body copy, forms) now resolves to Inter Tight through the same token — no component left hardcoded to the old font

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

> Build a `LogoMarquee` component using the nine files in `clientlogo/` (already background-stripped and height-normalized to the design spec's spec). Render the set twice in one flex track, no card/tile wrapper around any logo — each is a bare `<img>`, height-normalized, gap-spaced — animate `translateX(0)` → `translateX(-50%)` linear infinite over ~25–30s. **Logos render at full, natural opacity at all times — no dimmed/faded resting state.** (The original spec called for ~55% opacity at rest with a hover-to-brighten effect; drop that — it read as washed-out rather than intentional. If a hover affordance is still wanted, use a subtle scale-up, e.g. 1.03–1.05x, not an opacity change.) Hovering the whole strip still pauses the animation via `animation-play-state: paused`. Under `prefers-reduced-motion`, skip the animation and wrap the logos onto a static row instead.

**Definition of done:**

- [ ] Every logo is at full visibility by default — nothing requires a hover to look "correct"
- [ ] Loop is seamless — no visible jump or gap where the track resets
- [ ] Hovering the strip pauses it
- [ ] `prefers-reduced-motion` shows a static, wrapped row with no scroll
- [ ] Kuku FM's logo is flagged as a placeholder pending an official transparent export — removing the dim makes its rougher auto-cutout edges more visible, so this is worth double-checking now, not just noting for later

### Step 6 — Logo lockup

**Prompt:**

> Update the nav/header logo treatment to combine the existing mark (in `our-site-logo/`) with a typeset "SOLVIMATE" wordmark in Space Grotesk (600 weight), per the UI design spec's recommendation, rather than sourcing a separate raster wordmark asset.

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

## Phase F — Scroll-reactive globe & navigation motion

New interactive elements, added on top of the already-re-skinned pages from Phases C–E. These introduce one new dependency (`cobe`, a ~5KB canvas-based globe renderer) — everything else in this plan deliberately avoided new dependencies, but a real rotating globe isn't achievable with hand-rolled CSS/SVG the way the wave background was, so this is the one exception.

### Step 20 — Rotating globe component

**Prompt:**

> Install `cobe` and build a `ScrollReactiveGlobe` component. Base behavior: a continuous slow idle rotation when the page isn't being scrolled. Scroll behavior: track scroll velocity via a `requestAnimationFrame` loop diffing `window.scrollY` between frames (don't recompute on every scroll event — that fires too often and won't feel smooth); map the frame-to-frame delta to an angular velocity added to the globe's rotation, clamped to a sane maximum so a fast fling-scroll doesn't spin it into a blur. Scroll direction sets rotation direction (down = one way, up = reverse). Between scroll deltas, decay the velocity back toward the idle rotation speed each frame (e.g. `velocity = velocity * 0.94 + idleVelocity * 0.06`) rather than snapping to a stop, so the motion reads as physical rather than mechanical. Pause rendering entirely (cancel the animation frame) when the globe scrolls out of the viewport, using an `IntersectionObserver` — no point spending GPU cycles on an invisible canvas. Under `prefers-reduced-motion`, hold the globe at a fixed slow idle rotation and ignore scroll input entirely — don't remove it, since it's decorative, not essential, but scroll-linked acceleration is exactly the kind of motion that preference exists to suppress.

**Definition of done:**

- [ ] Scrolling down speeds the globe up in one direction; scrolling up reverses it; releasing the scroll lets it settle back to idle speed rather than stopping abruptly
- [ ] A fast fling-scroll doesn't spin the globe fast enough to be disorienting — velocity is clamped
- [ ] Confirmed paused (check via performance profiler, not just visually) when scrolled out of view
- [ ] `prefers-reduced-motion` shows a fixed slow rotation, unaffected by scroll

### Step 21 — Theme-adaptive globe colors

**Prompt:**

> Make the globe's colors respond to the dark/light toggle without destroying and recreating the canvas on every switch. `cobe` reads its color config (base, marker, and glow colors as normalized RGB, plus a dark flag) inside its per-frame `onRender` callback — store the current theme's color values in a ref that the theme context updates, and read from that ref inside `onRender` each frame. Dark theme: Ink-toned base with Lime/Mint glow. Light theme: a near-white/Paper base with Ink-toned graticule lines and a Lime glow, checked for contrast rather than assumed.

**Definition of done:**

- [ ] Toggling theme mid-scroll updates the globe's colors with no flash, no canvas re-init, no dropped frames
- [ ] Light-mode globe doesn't wash out against the light-mode page background — there's still visible definition

### Step 22 — Mount the globe on inner pages

**Prompt:**

> Mount `ScrollReactiveGlobe` on the About, Services, Careers, and Contact pages — not Home, which keeps the wave background as its own signature. Position it behind or beside the page content (not the hero-style full-bleed treatment) with `pointer-events: none` and a z-index that keeps it strictly behind text and interactive elements. Where content overlaps the globe's bounding area, confirm text contrast holds without needing a heavy scrim — the globe is more subdued than the wave background by design, so it shouldn't need the same legibility treatment the banner images did.

**Definition of done:**

- [ ] Globe is visible and animating on all four pages, never on Home
- [ ] No content is ever obscured or made hard to read by the globe, at any scroll position, in either theme
- [ ] Nothing behind the globe is clickable through it, and nothing in front of it loses click targets to it

### Step 23 — Nav active-link indicator

**Prompt:**

> Add an animated indicator to the nav that slides between links as the active route changes, rather than the active state just snapping to a new link. Implementation: an absolutely positioned element (an underline or pill, matching the existing Lime active-state treatment) whose `transform: translateX()` and `width` are calculated from the active link's `getBoundingClientRect()` and animated via CSS transition using the existing 200–300ms motion token — no new animation library needed for this.

**Definition of done:**

- [ ] Indicator smoothly slides to the new position on route change, not an instant jump
- [ ] Correct position on initial page load (no visible jump-into-place after mount)
- [ ] Still correct after a window resize or a mobile/desktop breakpoint change

### Step 24 — Language dropdown animation

**Prompt:**

> Animate the language switcher's dropdown open/close with a smooth transition (opacity + a small scale or slide, ~150–200ms, using the existing motion tokens) instead of an instant show/hide. Style it fully against the current theme (Surface background, Mist/Ink text depending on theme, Lime for the selected language) so it doesn't look like an unstyled browser default in either mode. Build distinct layouts for the two breakpoints: a compact anchored popover under the switcher button on desktop, and a full-width or bottom-anchored panel on mobile rather than a cramped small popover. Preserve the existing keyboard and `aria-expanded` behavior from the original build — this is a visual/motion change, not a rebuild of the dropdown's interaction logic.

**Definition of done:**

- [ ] Open/close is smoothly animated on both breakpoints, not just faded in from nothing
- [ ] Fully theme-matched in both dark and light mode — no default browser select styling leaking through
- [ ] Mobile layout is genuinely different from desktop, not the same small popover squeezed onto a phone screen
- [ ] Keyboard navigation and `aria-expanded` still work exactly as before — confirm against the original implementation's behavior, don't just eyeball it

---

## Phase G — QA

### Step 25 — Cross-page token audit

**Prompt:**

> Grep the codebase for hardcoded hex values or color names outside the theme object. Every color reference should resolve through a token, not a literal value, so a future palette change doesn't require a page-by-page hunt.

**Definition of done:**

- [ ] Zero hardcoded brand colors found outside the theme file
- [ ] Responsive check redone at 375 / 768 / 1440 against the final styling, not just per-component in isolation

### Step 26 — Reduced-motion audit (redesign-specific)

**Prompt:**

> Re-check every animated element introduced by this redesign under `prefers-reduced-motion`: `AnimatedWaveBackground`, `LogoMarquee`, `ScrollReactiveGlobe`, the nav indicator, and the language dropdown — in addition to the GSAP reveals already covered in the original plan's Step 30.

**Definition of done:**

- [ ] All five new/changed animated elements fall back to their static or reduced states correctly
- [ ] No console errors when the media query toggles mid-session (e.g. via OS settings change while the tab is open)

### Step 27 — Contrast audit

**Prompt:**

> Run an automated contrast check (e.g. axe or Lighthouse accessibility audit) across both light and dark themes on every page, including the four pages that now carry the globe. Pay particular attention to Mist-on-Ink text, Lime-button-on-Ink/Paper combinations, and any text overlapping the globe's bounding area, since those are the new pairings introduced by this redesign.

**Definition of done:**

- [ ] Lighthouse accessibility score ≥ 90 in both theme modes, on all four globe-bearing pages plus Home
- [ ] No text/background pairing introduced by the redesign fails WCAG AA
