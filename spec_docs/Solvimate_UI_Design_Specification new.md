# Solvimate — UI/UX redesign specification

**Scope:** frontend/visual layer only. Nothing here changes the data model, API routes, Supabase schema, or auth defined in `Solvimate_Technical_Specification.md` — that document stays in effect unchanged. This spec governs _how_ the pages built in `Solvimate_Implementation_Plan.md` are styled, not what they do.

**Reference:** the live site at solvimate.com (fetched directly for this spec) for current structure and copy, plus the uploaded logo file for the palette anchor.

---

## 1. Design plan

**Color.** The brand's accent color is already fixed — sampling the uploaded logo directly returns `#b8f072`, essentially identical to the `#BEFE72` supplied, confirming it's the real brand color rather than an approximation. The rest of the palette is built to sit correctly around it: a near-black ink for depth, a slightly-lifted surface tone for cards, mint as a secondary accent for hover/emphasis, and a muted mist tone for secondary text so the page doesn't rely on pure gray against a colored background.

**Type.** Three roles, none of them the default system-sans-everywhere look: a geometric display face used only for headlines (restraint matters here — a distinctive face used everywhere stops being distinctive), a clean humanist body face for readability at smaller sizes, and a monospace utility face for stats, labels, and the eyebrow line above headlines. The mono face specifically nods to the "AI/data" positioning ("Building the Future of AI") without leaning on a literal robot/circuit visual cliché.

**Layout.** Same page structure and component tree as the existing implementation plan — this is a re-skin, not a re-architecture. The one structural change worth considering: replacing generic numbered markers, if any crept into earlier build phases, with something that actually carries information for this brand — language codes or stat labels, since Solvimate's content genuinely is a language list, not an arbitrary sequence.

**Signature.** One deliberate move, everything else quiet: an ambient waveform drifting slowly behind the hero. It's built from the actual subject — Solvimate's business is voice and language — rather than a decorative gradient blob, which is the generic version of "ambient dark-mode motion" that shows up by default when nothing grounds the choice.

## 2. Why this isn't generic, despite the palette

A near-black background with one bright accent color is one of the three patterns AI design tools reach for by default when nothing constrains the choice. Here, it isn't a default — it's the literal palette specified in the brief, so the goal isn't to avoid it, it's to execute it with enough specificity that it doesn't _read_ as the default anyway. Three choices carry that weight: the type pairing (not Inter/system-sans at every size), the waveform motif being drawn from what the company actually does rather than being decorative, and a genuinely restrained type scale rather than the oversized hero text pattern the original site (and most marketing sites) use.

## 3. Design tokens

### Color

| Token   | Hex       | Role                                                                        |
| ------- | --------- | --------------------------------------------------------------------------- |
| Ink     | `#001E2B` | Primary dark background                                                     |
| Surface | `#0A2E3D` | Elevated cards, nav-on-scroll, modal backgrounds                            |
| Lime    | `#BEFE72` | Primary accent — CTAs, active states, the logo mark itself                  |
| Mint    | `#37FB89` | Secondary accent — hover states, the second waveform layer, data highlights |
| Mist    | `#9FB8B4` | Muted text on dark surfaces, secondary nav labels, borders                  |
| Paper   | `#F5FBF2` | Light-mode surface / high-contrast text on Ink                              |

Contrast pairing: text on Lime or Mint uses Ink (`#001E2B`), never black or white — same logic as the "use the darkest shade from the same family" rule any UI token system follows, just anchored to this palette instead of a generic one.

### Typography

| Role         | Face                   | Notes                                                                                                                                                                                                |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display      | Space Grotesk, 500/600 | Headlines only. Hero H1 ≈ 34–40px desktop / 26px mobile — deliberately smaller than the original's ~96px (6rem) hero, per the brief                                                                  |
| Body         | Inter Tight, 400/500   | Everything else — paragraphs, nav, buttons. Base size 15px, down from a typical 16–18px, for the smaller/tighter feel requested. Replaces the original Manrope recommendation, per explicit request. |
| Utility/mono | IBM Plex Mono, 400/500 | Eyebrow labels, stat callouts, form field hints                                                                                                                                                      |

All three are freely available via Google Fonts — no licensing step needed before implementation.

### Spacing, radius, motion

- Radius: 8px for buttons/inputs, 12px for cards — consistent with the rest of the app, not a new scale.
- Section vertical rhythm: 64–96px between major sections on desktop, collapsing to 40–56px on mobile — tighter than a typical marketing site, matching the "smaller/tighter" direction.
- Motion duration: 200–300ms for hover/interaction states; the ambient background animation runs on a much longer 14–20s loop so it reads as atmosphere, not a UI transition.

## 4. Animated background — technical approach

**What it is:** two to three thin SVG wave paths (colored Lime and Mint at low opacity, 20–35%) layered behind the hero content, each looping horizontally at a different speed for a subtle parallax drift. No canvas, no WebGL, no particle system — this is deliberately cheap.

**Where it lives:** the hero only. Repeating it on every section turns a signature into wallpaper — restraint is part of what keeps it from looking AI-generated by default.

**Implementation notes:**

- Pure CSS `transform: translateX()` keyframe loop on SVG elements positioned `absolute`, `pointer-events: none`, sitting behind a `position: relative` content layer.
- No dependency on GSAP for this specific effect — GSAP stays reserved for the scroll-triggered reveals already planned in the implementation plan; this is simpler and shouldn't compete with that budget.
- Respects `prefers-reduced-motion`: when set, the animation is disabled entirely (not slowed) and a single static wave line renders instead, so the visual identity is still present without the motion.
- Renders behind content that's already there — it shouldn't block or delay first paint, and should be inert to interaction (`pointer-events: none`) so it never intercepts clicks on the hero CTA.

## 5. Page-by-page visual deltas

Same components as the implementation plan; this section is what changes about how each one looks.

- **Nav / footer** — Ink background once scrolled (Surface tone), Lime for the active link underline, Mist for inactive links, Inter Tight throughout, smaller nav type (13px), with an animated sliding indicator tracking the active link. The language dropdown gets its own smooth open/close transition (~150–200ms) rather than an instant toggle, fully themed (Surface background, Lime for the selected language) rather than left as browser-default styling — desktop gets a small anchored popover, mobile gets a full-width panel rather than the same popover shrunk down.
- **Hero** — Ink background, waveform motif, Space Grotesk headline at the reduced size above, mono eyebrow line, single Lime CTA button.
- **Services (3-column) / Services page (six groups)** — Surface-tone cards on Ink background, Mint used sparingly for icon accents, no per-card gradient — flat fills only, consistent with the minimalist direction.
- **Banner / journey / dubbing highlight sections** — these currently rely on large photographic banners; keep the imagery but drop a subtle Ink gradient-free scrim so Paper-colored text stays legible without needing a drop shadow.
- **Testimonials** — swap the original's solid emerald block for Surface-tone cards with a thin Lime left-rule (full border, not partial, per corner-radius rules) rather than a colored background — keeps the palette from feeling like every section is a different accent color.
- **FAQ accordion** — Ink background, Lime chevron rotation on expand, Inter Tight body copy at the smaller base size.
- **Stats band (Services page)** — this is the natural home for the mono utility face — numbers in IBM Plex Mono, labels in Inter Tight, echoing the specimen shown above.
- **Careers / Internships / Programs / News** — same Surface-card treatment as Services; status badges (Available/Open) use Mint on a low-opacity Mint background rather than a generic green/gray pill.
- **Contact / customer forms** — Surface-tone form container, Lime submit button, form fields with Mist borders that brighten to Lime on focus. Toast styling follows the same palette (Mint for success, existing danger/error convention stays semantic rather than brand-colored, so errors are still recognizable as errors).

## 6. Assets and open gaps

- **Logo lockup:** only the mark itself was provided originally. Recommend the header combine the mark with a typeset "SOLVIMATE" wordmark in Space Grotesk rather than sourcing or recreating a raster wordmark — keeps the minimalist direction consistent and avoids a mismatched second logo asset.
- **"Trusted by" carousel — logos received:** Bayantech, FutureBeeAI, Kuku FM, GienTech, OpenAI, Josh Talks, Pocket FM, Uber, Story TV.
- **Flag before shipping — client verification:** three of the nine (OpenAI, Uber, and the file labeled "ted talks logo" that's actually Josh Talks) have filenames consistent with a stock-logo download rather than a client-supplied asset. Displaying a globally recognized trademark in a "Trusted by" section implies a business relationship — doing that without one is a real trademark/false-endorsement risk, not a style choice. Worth confirming which of the nine are verified Solvimate clients before this section goes live; the carousel component itself works with any set of logos, so nothing about the build is blocked on this.
- **Logo background inconsistency:** checked all nine files directly. Five (Bayantech, FutureBeeAI, GienTech, Josh Talks, Pocket FM) are transparent PNGs and sit cleanly on the Ink background. Four (Kuku FM, OpenAI, Uber, Story TV) had an opaque colored background baked into the file itself — orange, black, black, and magenta respectively. Decision: no card/tile background behind any logo — they sit directly on the section background as a single unbroken strip. For OpenAI, Uber, and Story TV, the baked-in flat color was chroma-keyed out at the asset level so the mark itself sits on transparency like the other five; Kuku FM's background is a gradient rather than a flat fill, so it still needs a real transparent export from Kuku FM's brand assets before it goes in the strip — chroma-keying a gradient reliably isn't a safe automated step. Every mark is height-normalized (consistent display height, width auto) so wordmark logos and square icon marks read as one continuous strip rather than mismatched sizes.
- **Motion behavior:** this is a continuously scrolling marquee, not a static row — matches the original spec's acceptance criteria ("scrolls continuously and pauses on hover"). Implementation: render the nine logos twice back to back in one flex track (no wrapper card — each is just an `<img>`, height-normalized, gap-spaced), animate the track with `translateX(0)` → `translateX(-50%)` on a linear infinite loop (duplicating the set is what makes the loop seamless — the second half is an exact copy of the first, so the reset is invisible) — around 25–30s for a full pass is readable without feeling static. **Logos render at full, natural opacity at all times** — the original plan called for a dimmed (~55% opacity) resting state with a hover-to-brighten transition; that read as washed-out in practice rather than intentional, so it's been dropped. Hovering anywhere over the strip sets `animation-play-state: paused`; if a hover affordance is still wanted on individual logos, a subtle scale-up reads better than an opacity change. Under `prefers-reduced-motion`, skip the animation entirely and wrap the tiles onto a static row instead of a horizontal scroll.
- **Animated background — globe, revised.** The earlier recommendation here was to skip a rotating globe as the generic "we work globally" cliché. That's been explicitly overridden — a globe is now in scope, on the About, Services, Careers, and Contact pages (not Home, which keeps the waveform as its own signature). To keep it from landing as the generic version anyway, it isn't a static decorative sphere — it's scroll-reactive: rotation speed and direction respond to scroll velocity and direction, easing back to a slow idle spin when scrolling stops. That interactivity is what keeps it from reading as stock imagery. Technical approach: `cobe` (a small canvas-based globe renderer, ~5KB) rather than a full Three.js scene — proportional to a decorative element, not a data visualization. Colors follow the theme (Ink base with Lime/Mint glow in dark mode, Paper base with Ink graticule and Lime glow in light mode), read from a ref inside the render loop so toggling theme doesn't require destroying and recreating the canvas.
- **Professional photography:** if photos of the team/working professionals are available, they land better as real content in a dedicated section — an About/team strip, or alongside testimonials — than as a moving background layer. Photography and an ambient animation both compete for attention if stacked together; one per section keeps each legible instead of fighting the other.
- **Animated background scope:** confirmed as hero-only — flag if you'd prefer it on more sections (e.g. the footer band too); that's a one-line change to where the component is mounted, not a redesign.

## 7. Constraints carried over from the technical spec

- No changes to Supabase schema, RLS, API routes, or auth.
- Framework stays Next.js App Router + styled-components + GSAP — this redesign changes token values and adds one new ambient-background component, not the stack.
- Existing acceptance criteria still apply in full: responsive at 375/768/1440, reduced-motion respected, keyboard accessibility, `aria-live` toasts. A visual redesign that breaks any of those isn't done.

## 8. Suggested build order (frontend-only)

1. Land the token system (color, type, spacing) as the styled-components theme — this alone updates every page's look with no other code touched.
2. Build the `AnimatedWaveBackground` component and mount it behind the hero.
3. Re-skin nav and footer against the new tokens.
4. Re-skin the home page sections.
5. Re-skin the remaining pages (About, Services, Careers, Contact, forms) — mechanical once the token system is in place everywhere else.
