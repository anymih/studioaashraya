# Studio Aashraya Website v2: Design System

Version 2.1 · 2 November 2026

The approved look is the mockup in `docs/rebuild/reference/studio-aashraya.html`. Port it exactly. Where this document and the mockup differ, this document is the refinement and wins.

Concept: a site drawing sheet. Hairline grid, mono annotations, square corners, stage gates marked in site-signage orange.

---

## 1. Tokens

Implement in `styles/globals.css`. Light values on bare `:root`; dark values for system dark (unless the user chose light) and for an explicit dark choice.

```css
:root{
  --bg:#E8E9E4; --surface:#F3F3EF; --wash:#DCDED7; --ink:#141A17; --muted:#59615C;
  --line:#C4C8BF; --grid:#DEE0D9;
  --accent:#C2410C; --on-accent:#FFFFFF; --accent-hi:#FF8A4C;
  --band:#16283A; --on-band:#EAEEF1; --band-muted:#9FB1C2; --band-line:#2D4258;
  color-scheme: light;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --bg:#0E1311; --surface:#151B18; --wash:#1B2420; --ink:#E6E8E2; --muted:#9AA39D;
    --line:#2B3430; --grid:#161D1A; --accent:#FF8A4C; --on-accent:#1A0F08;
    --band:#0A1721; --on-band:#E6EBEF; --band-muted:#8FA3B5; --band-line:#1F3343;
    color-scheme: dark;
  }
}
:root[data-theme="dark"]{
  --bg:#0E1311; --surface:#151B18; --wash:#1B2420; --ink:#E6E8E2; --muted:#9AA39D;
  --line:#2B3430; --grid:#161D1A; --accent:#FF8A4C; --on-accent:#1A0F08;
  --band:#0A1721; --on-band:#E6EBEF; --band-muted:#8FA3B5; --band-line:#1F3343;
  color-scheme: dark;
}
```

Tailwind v4 mapping (same file):

```css
@import "tailwindcss";
@theme inline {
  --color-bg: var(--bg);           --color-surface: var(--surface);
  --color-wash: var(--wash);       --color-ink: var(--ink);
  --color-muted: var(--muted);     --color-line: var(--line);
  --color-grid: var(--grid);       --color-accent: var(--accent);
  --color-on-accent: var(--on-accent); --color-accent-hi: var(--accent-hi);
  --color-band: var(--band);       --color-on-band: var(--on-band);
  --color-band-muted: var(--band-muted); --color-band-line: var(--band-line);
  --font-display: var(--font-display);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}
```

Remove the old tokens (forest, terracotta, linen, Cormorant). Search the codebase for the old hex values and old font variables; none may remain.

## 2. Typography

Load with `next/font/google` in `app/layout.tsx`, replacing Cormorant Garamond, Inter and Space Mono.

| Role | Font | Weights | CSS variable |
|---|---|---|---|
| Display (headings, numerals, wordmark) | Big Shoulders Display | 600, 800 | `--font-display` |
| Body | IBM Plex Sans | 400, 500, 600 | `--font-sans` |
| Labels, annotations, data | IBM Plex Mono | 400, 500 | `--font-mono` |

Provide fallbacks: display `'Arial Narrow', Impact, sans-serif`; body `system-ui, sans-serif`; mono `ui-monospace, monospace`.

| Style | Spec |
|---|---|
| H1 | display 800, uppercase, `clamp(44px,8vw,112px)`, line-height .9, balance wrap. On a 375 px screen the home H1 sets in no more than five lines. |
| H2 | display 800, uppercase, `clamp(36px,5.4vw,68px)`, line-height .95 |
| H3 | display 800, uppercase, 28px, line-height 1 |
| Body | sans 400, 16px, line-height 1.6, measure 60 to 65 characters |
| Lead | sans 400, `clamp(17px,1.5vw,19px)`, muted |
| Eyebrow | mono 12px, .14em tracking, uppercase, muted |
| Label | mono 10 to 12px, .1em tracking, uppercase |
| Numerals in tables and stat blocks | `font-variant-numeric: tabular-nums` |

## 3. Layout

- Container: max 1200 px. Side gutter written `max(clamp(16px,4vw,40px), env(safe-area-inset-left,0px))` and the same for right. Colored bands span the full width and put the container inside.
- Section spacing: `padding-block: clamp(56px,8vw,104px)`.
- Header sticky at `top: env(safe-area-inset-top,0px)`; a fixed `body::before` of that height in `--bg` covers the notch band. Anchors use `scroll-margin-top: 88px`.
- Hero background: 48 px hairline grid in `--grid`.
- Grids wrap to one column below 900 px (hero, split) and 700 px (three-up, credentials). Children that hold text get `min-width:0`.

## 4. Rules

- Corners are square. No border radius, no glassmorphism, no blur, no drop shadows.
- Borders: 1.5 px `--ink` for objects (sheet, project card, form, fact panel); 1 px `--line` for dividers.
- The accent is used for: primary button fills and the `StartBand`, gate markers and numerals, the emphasised phrase in the H1, the large figures in `PromiseCard`, the "30+" count, list bullets, the wordmark square, focus rings and link hover. Nowhere else.
- Dark band (`--band`) is used for Method, Technology and the home Method teaser. The accent-filled `StartBand` closes every page except `/book-a-call`.
- Numbered markers appear only where the order is real: stages, gates, steps.
- No emoji. No gradients. No decorative animation.

## 5. Components

| Component | Spec |
|---|---|
| `Header` | Wordmark with 12 px accent square. Desktop: nav Technology, Method, Homes, Guarantee, NRI clients, About, Tools; right side the phone link, Theme button (mono, bordered) and primary button "Book a consultation". Under 900 px: wordmark, Theme button and a 44 px Menu button that opens the full-screen overlay described in `02_PAGE_SPECS.md` section 1 (Header). |
| `Footer` | Promise strip (15-year warranty, on-time guarantee) with a book button; four columns per `02_PAGE_SPECS.md` section 1 (Footer); address, phone, WhatsApp and email as tappable links. Mono 12 px labels. |
| `MobileCtaBar` (under 900 px) | Replaces the old bottom navigation. Fixed to the bottom, 56 px plus `env(safe-area-inset-bottom)`, `--bg` background, 1.5 px ink top border. Three buttons: Call (25%), WhatsApp (25%), Start your project (50%, accent fill). Min height 48 px. Behaviour in `02_PAGE_SPECS.md` section 1 (`MobileCtaBar`). Delete `components/ui/BottomNav.tsx`. |
| `Button` | Square, 1.5 px border, 14 px 22 px padding, 15 px Plex Sans 600. Primary: accent fill with `--on-accent` text; hover turns it ink. Alt: transparent with ink border; hover fills ink. Focus: 2 px accent outline, 3 px offset. Min touch height 48 px on phones. Full width on phones when it is the only button in its block. |
| `SectionHead` | Eyebrow, H2, optional lead. |
| `CredStrip` | Four cells, display-font value at `clamp(38px,4vw,52px)`, 14 px muted label, 1 px dividers. |
| `ThreeUp` | Top rule 1.5 px ink, three columns with 1 px dividers, H3 and short paragraph. |
| `StageList` | Ordered list on the dark band; display numeral from a CSS counter; gate pill in `--accent-hi` with dark text. |
| `GateRecord` | Sheet-style panel with title-block fields: Project, Gate, Date, Checked by, Items, Result. Used on Method with values shown as "—" and the caption "Sample format". |
| `Sheet` | Figure with 1.5 px ink border, SVG body and a three-cell title block. The hero section drawing is the reference; port the SVG from the mockup into `components/sheet/SectionSheet.tsx` using token classes. |
| `ProjectCard` | Photo 4:3 with city chip (ink fill) and status badge; below it a title-block `dl`: project (display font), type, plot, built-up, handed over. Evidence-labelled metric rows appear beneath on detail pages. |
| `StatusBadge` | Mono 11 px chip: Built (ink fill), Under construction (accent outline), Design stage (line outline). |
| `EvidenceLabel` | Mono 10 px tag beside a figure: "Measured" or "Simulated at design stage", with a link to the method note. |
| `Faq` | `details` elements, display-font question, `+` and `−` in accent mono, FAQPage JSON-LD generated from the same data. |
| `FormField` | Label above (mono 11 px), 1.5 px ink border, 14 px padding, error text under the field in accent with an icon-free `Error:` prefix. |
| `Notice` | 1 px line border on `--surface`, mono label, used for tool coverage notices. |
| `Breadcrumb` | Mono 12 px, uppercase, slash separators, matches BreadcrumbList data. |
| `CtaRow` | Inline prompt in display type (24 px) and one primary button. Phones: the button spans the width. CTA map in `02_PAGE_SPECS.md` section 1. |
| `StartBand` | Full-width band filled with `--accent`, text in `--on-accent`. Headline in display type `clamp(36px,6vw,72px)`, the promise line in mono, then three buttons: book (`--on-accent` fill, `--accent` text), WhatsApp and Call (transparent, `--on-accent` border and text). Phones: buttons stack, full width. |
| `StartPaths` | Three bordered cards, each a situation (`I own a plot`, `I live abroad`, `I have an old house`), one line, one button. Phones: stacked. The whole card is the tap target. |
| `PromiseCard` | 1.5 px ink border on `--surface`. Large figure (`10%`, `15`) in display type `clamp(72px,12vw,160px)` in `--accent`, a title, one sentence, a mono conditions line. |
| `GuaranteeTimeline` | SVG hairline timeline with four marks: Agreement signed, Completion date, Handover, Year 15. Orange marker at the completion date and at year 15. Vertical under 640 px. |
| `DashboardMock` | Illustration of the client dashboard: schedule bars, four gate chips, a photo strip and a payments list, built in React from sample data, labelled `Sample data`. Square corners, token colours. |
| `HeroOverlay` | SVG over the hero image: hairline dimension line, three numbered gate markers, mono caption. `aria-hidden`. |
| `SampleTag` | Mono 11 px chip with an accent outline: `Sample project` or `Sample figure`. Shown in development, preview and whenever `NEXT_PUBLIC_SHOW_SAMPLE_BANNER` is `true`. |
| `SampleBanner` | Slim accent strip under the header: `Sample projects. Replace before launch.` Same flag as `SampleTag`. |
| `CtaBand` | Logical name used in `02_PAGE_SPECS.md` for a call-to-action block: headline, one line of body copy, one button, plus Call and WhatsApp links. Renders as `CtaRow` when placed mid-page and as `StartBand` when it closes the page. Variants and copy are in `02_PAGE_SPECS.md` section 1. |
| `ProofBar` | Ink band (`--ink` fill, `--bg` text) with five figures in display type: 30+ homes built, 50+ designed, every home on time, 15-year warranty, 10% back if late. Phones: two columns, the fifth cell spans both. Figures come from the ledger. |
| `TechTile` | 1.5 px ink border on `--surface`. Image 4:3, title in display type 24 px, one sentence, mono tag "Used at: Gate 2". The whole tile links to `/technology#<id>`. Phones: swipe row, 82% width. |
| `TechBlock` | Technology page block: image, then four label and text pairs (`What it is`, `What it catches`, `What you receive`, `Used at`). Phones: collapsed under the title, opened by a 48 px row. |
| `CompareTable` | Two columns, "What often happens" and "What we do", 1 px dividers, accent square bullet in the second column. Below 700 px each row becomes a card with the two statements stacked under mono labels. |
| `ImageFrame` | Wrapper for every image: 1.5 px ink border, no radius, reserved aspect ratio, mono caption (`Illustration`, `Design render`, `Sample drawing`, or a real location and year). |
| `ClaimNote` | Mono 11 px footnote under a ledger claim. Shows the source of `c.delay62` and the "Conditions are in your agreement" line under the guarantee and warranty. |

## 6. Imagery

- Images are generated placeholders for now. Prompts, sizes and ids are in `05_IMAGE_BRIEFS.md`. A generated image of a building or site carries the caption `Illustration`. Design renders carry `Design render`. Portfolio images must be real photographs before launch. No stock photography.
- Crops: 4:3 for cards, 16:9 for page headers, 3:2 in galleries. Use `next/image` with `sizes` and blur placeholders.
- Frame: 1.5 px `--ink` border, no radius. Caption beneath in mono: location, year, status.
- Alt text names the room or element and the material, for example "Ground floor living room with exposed brick jali screen".
- Technical drawings (plans, sections) are shown on `--surface` at their natural aspect ratio with a scale note.
- Missing image: hatched placeholder (repeating 135° line pattern in `--line` over `--wash`). Production hides the project instead.

## 7. Motion and states

- Allowed: 150 ms color and background transitions on buttons and links; `scroll-behavior:smooth` for anchors.
- Not allowed: scroll-triggered reveals, parallax, magnetic buttons, auto-playing media.
- Every interactive element has a visible `:focus-visible` outline.
- `prefers-reduced-motion: reduce` disables smooth scroll and all transitions.

## 8. Theme switching

Inline script in `<head>` runs before paint:

```html
<script>
try{var t=localStorage.getItem('sa-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}
</script>
```

The toggle sets `data-theme`, writes `sa-theme` inside `try/catch`, and fires `theme_toggle`. With no stored choice the system preference applies through the media query.

## 9. Refinements over the mockup

1. Skip link ("Skip to content") as the first focusable element.
2. `aria-current="page"` on active nav links; labelled landmarks.
3. Anchor offset for the sticky header.
4. Accordion and filter controls fully keyboard operable.
5. Form states (default, focus, error, disabled, success) designed to the same rules.
6. Open Graph images generated with `next/og` using the tokens: wordmark, page title in display type, grid background.
7. Themed 404 page with links to Home, Projects, Book.
8. Contrast (computed): see section 12. The accent on `--bg` in light mode is 4.24:1, so accent is used for large text (24 px and up), fills and non-text marks only. Small text uses `--ink`. Button text on the accent fill is 5.18:1 in light mode and 8.06:1 in dark.
9. Print stylesheet for project pages and the Method page: light palette, no header, footer or `MobileCtaBar`.

## 10. Conversion layout and the attacking tone

**10.1 Page rhythm.** Every page follows the same order: hero (H1, one promise line, one primary button) → proof (`ProofBar` or `CredStrip`) → content blocks → a `CtaRow` after every second block → a closing `StartBand`. Backgrounds alternate to set the pace: `--bg`, then an ink or band block, then `--bg`, then the accent `StartBand` last.

**10.2 Attacking tone, in layout terms.**
- One oversized element per screen: the H1, a `PromiseCard` figure or the market figure. Never two.
- Short declarative lines. Headings: 14 words at most. Body sentences: 22 words at most. Numbers over adjectives, and only numbers that come from the ledger.
- Accent fills (`StartBand`, primary buttons, `MobileCtaBar` primary) never touch each other. At most one accent-filled block in a single screen, apart from the `MobileCtaBar`.
- Comparison is stated as a table (`CompareTable`), not as insults. No competitor is named.

**10.3 CTA placement rules.**
- The first CTA is visible in the first screen on every page.
- On phones a CTA appears at least every 1.5 screens of content.
- Button labels are verbs for the client's goal: "Get my plot check", "Start my project", "Book my call", "Survey my house".
- Every primary CTA links to `/book-a-call?src=<cta_id>`. Call and WhatsApp are secondary links, shown beside it.
- `/book-a-call` itself has no CTA bands. The form is the page.

**10.4 The market figure line.** H2 in display type: "62% of under-construction housing projects in 50 Indian cities are delayed." A ClaimNote link sits below the heading block and links to c.delay62.sourceUrl.

**10.5 Guarantee and warranty.** Two `PromiseCard`s side by side on desktop (`10%`, `15`) and stacked on phones, with the `GuaranteeTimeline` beneath. The line "Conditions are in your agreement" appears as a `ClaimNote` directly under the cards.

**10.6 Technology.** On the home page the technology wall sits on the dark `--band`. `TechTile`s on the band use `--on-band` text, `--band-line` borders and an `--accent-hi` mono tag. On `/technology` the blocks sit on `--bg`.

**10.7 Hero.** Desktop: copy left, image right in a sheet frame. Phones: copy first, then the image at 4:5 below the buttons. `HeroOverlay` uses `--accent-hi` hairlines, is `aria-hidden`, must not cover the façade, and is hidden under 480 px.

## 11. Mobile-first rules

**11.1 Breakpoints.** 0 to 479 phone · 480 to 899 large phone or small tablet · 900 to 1199 laptop · 1200 and up desktop. The `MobileCtaBar` shows below 900 px. Design and review at 375 px first.

**11.2 Spacing scale.** 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Phone gutter 16 px. Phone section padding-block 56 px. Gap between stacked buttons 12 px.

**11.3 Reachability.** Primary actions sit in the thumb zone: the `MobileCtaBar` is fixed at the bottom. Page content reserves bar height (56 px) plus `env(safe-area-inset-bottom)` at the bottom of `body`. The header is 56 px. Anchor offsets on phones: `scroll-margin-top: 72px`. Total fixed chrome never exceeds 130 px including safe areas.

**11.4 Targets and type.** Tap targets 48 px high with 8 px gaps. Body 16 px. Inputs 16 px so iOS does not zoom. H1 `clamp(44px, 8vw, 112px)`, and the home H1 sets in no more than five lines at 375 px. Mono labels 11 px minimum.

**11.5 Patterns.**
- Swipe rows (CSS scroll-snap, `scroll-snap-type: x mandatory`) for `StartPaths`, `TechTile`s, project cards and filters. Card width 82% so the next card peeks. The page itself never scrolls sideways.
- Tables turn into stacked cards below 700 px (`CompareTable`, reporting rhythm, specification schedule).
- Long content collapses into accordions (Method stages, `TechBlock`s, FAQ). On `/method` the first stage starts open.
- No hover-only information. No parallax. No autoplay.

**11.6 Images and fonts.** `next/image` with `sizes` (for cards: `(max-width: 900px) 82vw, 33vw`), AVIF then WebP then JPG, lazy loading except the LCP image (`priority`), reserved aspect ratios. Hero image served to phones at most 140 KB; card and gallery images at most 70 KB. Fonts self-hosted through `next/font`, Latin subset, preload the display font and Plex Sans 400.

**11.7 JavaScript.** Server components by default. Client components only for the menu, `MobileCtaBar`, accordions, filters, theme toggle, calculators and analytics. Client JavaScript under 170 KB gzip per route, excluding the calculators.

**11.8 Forms.** One column. Labels above fields. Submit button full width. The `MobileCtaBar` hides its primary button on `/book-a-call` and hides entirely while a field has focus.

**11.9 Test devices.** 360×640, 390×844, 412×915, 768×1024. Lighthouse mobile with Slow 4G and 4x CPU slowdown.

## 12. Contrast (computed)

Ratios computed from the tokens in section 1 using the WCAG relative-luminance formula. Text needs 4.5:1 (3:1 for text of 24 px or larger, or 19 px bold). Interactive component boundaries and icons need 3:1.

| Pair | Light | Dark | Use |
|---|---|---|---|
| `--ink` on `--bg` | 14.46 | 15.18 | All body text |
| `--ink` on `--surface` | 15.87 | 14.15 | Cards, forms |
| `--muted` on `--bg` | 5.23 | 7.23 | Secondary text |
| `--muted` on `--surface` | 5.74 | 6.74 | Secondary text on cards |
| `--accent` on `--bg` | 4.24 | 8.03 | Large text, fills, marks only in light mode |
| `--accent` on `--surface` | 4.66 | 7.48 | Large text, fills, marks |
| `--on-accent` on `--accent` | 5.18 | 8.06 | Button and band text |
| `--on-band` on `--band` | 12.87 | 15.11 | Text on the dark band |
| `--band-muted` on `--band` | 6.82 | 6.98 | Secondary text on the band |
| `--accent-hi` on `--band` | 6.43 | 7.77 | Gate pills, tags and links on the band |
| `--accent` on `--band` | 2.90 | 7.77 | Do not use in light mode. Use `--accent-hi` on the band. |
| `--bg` on `--ink` (ink button text) | 14.46 | 15.18 | Alt and ink buttons |
| `--line` on `--bg` | 1.39 | 1.46 | Decorative dividers only. Interactive borders use `--ink`. |

**Rules that follow from the numbers**
1. In light mode the accent is never used for text under 24 px. Small text uses `--ink` or `--muted`.
2. On the dark band, accent-coloured text and marks use `--accent-hi` in both themes.
3. `StartBand` buttons: the primary button is filled with `--on-accent` and its text is `--accent`. An ink-filled button on the accent band fails the 3:1 boundary test in dark mode (1.89:1), so it is not used. Secondary buttons on the band are transparent with a 1.5 px `--on-accent` border and `--on-accent` text.
4. Focus ring is a 2 px outline in `--accent` with a 3 px offset on `--bg` and `--surface` (4.24:1 and 4.66:1 in light, above 3:1). On the accent band the ring uses `--on-accent`.
5. Status is never conveyed by color alone: `StatusBadge` also changes fill style and label text.

## 13. Component states and accessibility

| Component | Default | Hover | Focus | Active | Disabled or error |
|---|---|---|---|---|---|
| `Button` primary | `--accent` fill, `--on-accent` text | `--ink` fill, `--bg` text | 2 px accent outline, 3 px offset | Translate 1 px down | 50% opacity, no pointer events |
| `Button` alt | Transparent, 1.5 px ink border | Ink fill, `--bg` text | Same as above | Same | Same |
| `FormField` | 1.5 px ink border, `--surface` fill | n/a | 2 px accent outline | n/a | Error: accent border, text `Error: <message>` under the field |
| `Faq` / `TechBlock` summary | `+` in accent mono | Underline | Outline | `−` when open | n/a |
| Filters | 1 px ink border | Ink fill | Outline | `aria-pressed="true"` shows ink fill | n/a |
| `TechTile`, `StartPaths` card | 1.5 px border | Border becomes accent | Outline | n/a | n/a |
| `MobileCtaBar` | Ink top border, three buttons | n/a | Outline | Same as `Button` | Hidden while a field has focus |

**Accessibility requirements (WCAG 2.2 AA)**
- Landmarks: one `header`, `nav` (labelled), `main`, `footer`. Skip link first in the tab order.
- Headings in order, one H1 per page.
- `aria-current="page"` on the active nav link; `aria-pressed` on filter buttons; `aria-expanded` on accordion triggers; `aria-hidden` on decorative overlays (`HeroOverlay`, grid backgrounds).
- Every image has alt text from the registry, written as a description, never "image of".
- The menu overlay traps focus while open, closes on Escape and returns focus to the Menu button.
- Targets 48 px on phones, 44 px minimum on desktop.
- Respect `prefers-reduced-motion` and `forced-colors` (borders must remain visible).
- Language set to `en-IN`.

## 14. Name map

Names used in `01_PRD.md` and `02_PAGE_SPECS.md` and the component that implements them.

| Name in the specs | Component | File |
|---|---|---|
| `CtaBand` | `CtaRow` (mid-page) or `StartBand` (closing) | `components/ui/CtaRow.tsx`, `components/ui/StartBand.tsx` |
| Three doors | `StartPaths` | `components/ui/StartPaths.tsx` |
| Sticky action bar (called `MobileCtaBar` in the specs) | `MobileCtaBar` | `components/ui/MobileCtaBar.tsx` |
| Guarantee badge | `PromiseCard` | `components/ui/PromiseCard.tsx` |
| Proof bar | `ProofBar` | `components/ui/ProofBar.tsx` |
| Technology tile, block | `TechTile`, `TechBlock` | `components/ui/TechTile.tsx`, `components/ui/TechBlock.tsx` |
| Comparison table | `CompareTable` | `components/ui/CompareTable.tsx` |
| Sample chip, strip | `SampleTag`, `SampleBanner` | `components/ui/SampleTag.tsx`, `components/ui/SampleBanner.tsx` |
| Image wrapper | `ImageFrame` and `<Img id>` | `components/ui/ImageFrame.tsx`, `lib/images.ts` |
| Footnote under a claim | `ClaimNote` | `components/ui/ClaimNote.tsx` |
| Drawing graphics | `SectionSheet`, `HeroOverlay`, `GuaranteeTimeline`, `DashboardMock`, `OgImage` | `components/sheet/` and `app/**/opengraph-image.tsx` |
| Menu | `MenuOverlay` | `components/ui/MenuOverlay.tsx` |
