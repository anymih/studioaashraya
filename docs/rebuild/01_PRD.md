# Studio Aashraya Website v2: Product Requirements Document (Revision 2)

Version 2.1 · 2 November 2026 · Owner: Anumeh Prakhar, Principal Architect
Repository: `anymih/studioaashraya` (Next.js 16 App Router, React 19, TypeScript, Tailwind v4)

Read order for the build agent: `01_PRD.md`, `03_DESIGN_SYSTEM.md`, `02_PAGE_SPECS.md`, `05_IMAGE_BRIEFS.md`, `06_SAMPLE_PROJECTS.ts`, `04_IMPLEMENTATION_PLAN.md`. Reference implementation of the approved look: `docs/rebuild/reference/studio-aashraya.html`.

Revision 2 applies the owner's instructions of 2 November 2026. Where this revision and an earlier note disagree, this revision wins.

---

## 1. Decision record

| # | Decision | Made by |
|---|---|---|
| D1 | Site is open to Delhi NCR, Bihar and Uttarakhand. Delhi NCR leads copy, navigation, SEO and imagery. | Owner |
| D2 | Track record: 50+ projects designed, 30+ constructed. | Owner |
| D3 | The look is the approved mockup, on every page. Tokens do not change. The tone is attacking: larger type, a proof bar, a guarantee strip, direct comparisons, short declarative copy. | Owner |
| D4 | Old visuals are discarded. Code, routes, calculators, the booking form and analytics are kept. | Owner |
| D5 | The owner states that measured data exists for thermal and energy results. They render as "Measured" claims. | Owner |
| D6 | Hero headline is exactly: **Build a home that is beautiful, engineered, and built to last.** | Owner |
| D7 | Every home has been handed over on time (owner-attested). On-time guarantee: if the handover date written in the agreement is missed, the studio refunds 10% of the total construction amount. Conditions are in the agreement. | Owner |
| D8 | Warranty is 15 years from handover. Scope, exclusions and claim process are in the contract. The site does not compare the warranty to any named or unnamed competitor. | Owner, with editorial wording |
| D9 | The studio's technologies are declared live by the owner and are shown explicitly: BIM clash detection, simulation, 360° LiDAR scans, drone audits, lab-tested concrete, pulse-velocity testing, rebar scanning, flood-tested waterproofing, live dashboard. The site never says "first", "only" or "never seen before". | Owner, with editorial wording |
| D10 | The line "78% of homes miss their deadline or leak" is the point of difference on the home page. It renders only through ledger claim `c.market78` with a source footnote slot. | Owner |
| D11 | Contact: **+91 94730 31016** · **C93, Old DLF Colony, Sector 14, Gurugram**. | Owner |
| D12 | The booking form is intact. Same endpoint, fields, field names, validation, success behavior and analytics events. Restyle only, plus one label fix (section 7, R14). | Owner |
| D13 | Calls to action appear on every page and all lead to the booking form on `/book-a-call`. | Owner |
| D14 | Mobile first. Most visitors arrive on phones. Every page is designed at 375 px first. | Owner |
| D15 | Six sample projects with generated placeholder images ship now. They are flagged as samples and replaced later. | Owner |
| D16 | No competitor is named anywhere on the site. | Editorial |

## 2. Problem and opportunity

The old site sells climate-responsive design in Bihar. The business now sells design plus construction to HNI and NRI plot owners in Gurugram and Delhi NCR, with a guarantee, a warranty and a technology stack that most private-home builders do not publish. The site must make three things obvious within one mobile screen: who is accountable, what is promised if the studio fails, and how to start.

Market read from `Market_Research.md` (competitor self-descriptions, unverified): package-led firms win on price clarity and warranty language, tech-led firms win NRIs with dashboards, design studios win on taste and hand over drawings. The studio's wedge is the combination: architect-builder, written guarantee, instruments on site and a records trail the client can read.

## 3. Positioning

- **Line:** IIT-led architecture and construction for homes that perform.
- **Hero H1:** Build a home that is beautiful, engineered, and built to last.
- **Promise strip:** On time, or 10% back. 15-year warranty. IIT-led and COA-registered.
- **Supporting line:** Designed as architecture. Built as engineering. Delivered with proof.
- **Offer ladder:** Free plot check (written note) → Buildability Consultation (call) → Land and Buildability Report (paid, detailed) → Design and Build → NRI Remote Build Management.
- **Tone:** attacking and plain. Short sentences, specific nouns, numbers the ledger allows. No unsourced superlatives, no named competitors, no em-dash asides.

## 4. Audience

| Persona | Situation | Device | What they check | Pages that must convince |
|---|---|---|---|---|
| P1 HNI plot owner | Plot in Gurugram or legacy house in Delhi, referral-led | Phone first, then desktop | Who is accountable, what happens if late, proof of built work | Home, Guarantee, Projects |
| P2 NRI owner | Abroad, plot or ancestral land in NCR | Phone and laptop | Reporting, payment control, technology, time zone | NRI, Technology, Guarantee |
| P3 Referrer | Structural consultant, lawyer, broker | Desktop | Credentials, written process, instruments | About, Method, Technology |
| P4 Bihar or Uttarakhand client | Local homeowner | Phone | Local work, tools | Areas, Projects, Tools |

## 5. Goals, non-goals, metrics

**Goals**
1. Qualified submissions of the existing booking form from NCR plot owners and NRIs.
2. A mobile visitor reaches the form in one tap from any screen.
3. Keep every technical asset working: form, GA4, JSON-LD, calculators, polygon editor, routes.
4. Rank for NCR design-build and NRI-construction searches.

**Non-goals (this release)**
- Changing the booking form fields or logic.
- A CMS, client login or a built dashboard product. The `/technology` page shows the dashboard as a coded sample panel labelled "Sample data".
- Publishing prices or per-square-foot rates.
- Haryana bye-law rules in the feasibility engine. Gurugram plot checks are done by the studio by hand.
- Paid map APIs or changes to the geometry math.
- A blog.

**Metrics**

| Type | Metric | Target |
|---|---|---|
| North Star | Booking-form submissions per month with an NCR city or town | Baseline for 30 days, then set |
| Primary | Submit rate per unique visitor; CTA click-through rate per placement; call and WhatsApp taps | Baseline for 30 days |
| Primary | Share of submissions whose first touch was a CTA (`src` param) | Track |
| Guardrail | Mobile LCP p75 / CLS / INP | ≤ 2.5 s / ≤ 0.1 / ≤ 200 ms |
| Guardrail | Lighthouse mobile performance / accessibility | ≥ 90 / ≥ 95 |
| Guardrail | Banned strings in production build | 0 |
| Guardrail | Preserved routes returning 200 or 308 to a live page | 100% |

## 6. Truth system: ledger of claims and capabilities

All performance claims, guarantees and capabilities render from `lib/ledger.ts`. Components never hard-code them. This keeps one source of truth for every number and lets the owner change a figure in one place.

**Claim states:** `measured`, `owner-attested`, `contractual`, `owner-directed` (rendered at the owner's instruction, with a required source slot), `removed` (never renders).

| ID | Claim text (value editable) | State | Display rule |
|---|---|---|---|
| c.track | 50+ projects designed, 30+ constructed | owner-attested | Show everywhere |
| c.credentials | B.Arch IIT BHU Varanasi (2024), COA-registered, Data Science for AEC certificate | owner-attested | Show |
| c.ontime | Every home handed over on time | owner-attested | Show |
| c.refund | If we miss the handover date in your agreement, we refund 10% of the total construction amount | contractual | Show with "Conditions are in your agreement" |
| c.warranty | 15-year warranty from handover | contractual | Show with "Scope and exclusions are in your agreement" |
| c.thermal | 4 to 6 °C cooler indoors than a conventional envelope | measured | Show with EvidenceLabel "Measured". Owner confirms the range per project on project pages. |
| c.energy | 30% lower energy bills | measured | Show with EvidenceLabel "Measured" |
| c.approval | 100% of sanction submissions approved | owner-attested | Show. Owner defines the denominator in `lib/ledger.ts` note. |
| c.market78 | 78% of homes miss their deadline or leak | owner-directed | Show on home only, in the problem section, with a footnote slot. `source` is empty at handover. `ownerOverride: true` is set with the note "Owner directed on 2 Nov 2026, no source supplied". `launch:check` prints a warning while `source` is empty. |
| c.seismic | Delhi NCR lies in Seismic Zone IV | owner-attested fact | Show in technology and structure copy |

**Removed claims (never render):** indoor AQI under 25; 50-year dry lifecycle; 7-layer waterproofing; 5D BIM; "zero seepage" and "zero delays" as absolutes; "never seen before", "first in India", "only builder"; any comparison of the warranty or guarantee to competitors; escrow payments; any competitor name or price.

**Capability ledger.** All `live` by owner declaration on 2 Nov 2026. Each renders on `/technology` and where referenced.

| ID | Capability |
|---|---|
| bim-clash | BIM clash detection before pours |
| thermal-sim | Solar-path, heat-gain and daylight simulation |
| lidar-twin | 360° LiDAR scans at each gate, compared with the model |
| drone-audit | Drone progress audits |
| concrete-testing | Concrete cube testing at NABL-accredited labs |
| pulse-velocity | Ultrasonic pulse velocity testing |
| rebar-scan | Rebar scanning of cast elements |
| flood-test | Flood tests on waterproofing |
| dashboard-cpm | Live client dashboard and critical path scheduling (schedule, gates, cost, photos, scans, decisions) |
| structural-seismic | Seismic structural analysis |
| o.video | Weekly video walkthrough |
| o.photos | Dated photo and video archive |
| o.log | Written decision log |
| o.gatepay | Payments linked to passed gates |
| o.gates | Four written gates |
| o.boq | Bill of quantities with every design |
| o.lead | Named single point of contact |
| o.thirdparty | Independent third-party structural check (state `pending`, never renders) |

**Build enforcement.** `npm run ledger:check` scans `app/`, `components/`, `lib/` (except `lib/ledger.ts`) and fails on: `\d+\s?%` strings that duplicate a ledger claim, `AQI under`, `50-year`, `7-layer`, `5D`, `zero seepage`, `zero delays`, `never seen`, `first in india`, `only builder`, `longer than any`, `escrow`, and any competitor name (Prithu, Brick & Bolt, Tron, ANJ, ConsYard, Oberoi). `npm run launch:check` fails on a missing site URL or contact constant, on any `placeholder: true` project and on any `proj-*` image with `kind: "generated"`, unless the owner sets `ALLOW_SAMPLE_CONTENT=true`. With that flag it prints a warning and the `SampleTag` and `SampleBanner` stay visible. It also warns on every `owner-directed` claim without a source.

## 7. Requirements

| ID | Requirement | Verified by | Priority |
|---|---|---|---|
| R1 | Implement `03_DESIGN_SYSTEM.md` (including section 10 amendments) on every page, both themes, no FOUC. | Screenshots at 375, 768, 1440 px in both themes | Must |
| R2 | Ledger, ledger:check and launch:check in place. | Planted banned string fails; warnings print | Must |
| R3 | **CTA system.** Every page has: header CTA; at least two in-page `CtaBand` placements (mid and end) or equivalent; on screens under 900 px the `MobileCtaBar` (Call, WhatsApp, Start your project). Every primary CTA links to `/book-a-call` with a `src` parameter. | CTA audit script lists each page's CTAs; every route has ≥ 3 | Must |
| R4 | **Mobile first.** All pages meet the mobile rules in `03_DESIGN_SYSTEM.md` section 10.5 and `02_PAGE_SPECS.md` section 14. | Mobile QA checklist, Lighthouse mobile, 360×640 and 390×844 screenshots | Must |
| R5 | Home per `02_PAGE_SPECS.md` section 2. | S1, S2 | Must |
| R6 | Method with eight stages, four gates and the instruments used at each. | S5 | Must |
| R7 | Technology page with ten technology blocks and the measurement note. | S6 | Must |
| R8 | Guarantee and warranty page. | S3 | Must |
| R9 | NRI page. | S7 | Must |
| R10 | Services index and four detail pages. | Routes 200 | Must |
| R11 | Projects listing and detail pages for six sample projects from `06_SAMPLE_PROJECTS.ts`. Sample chip visible. Old project slugs redirect with HTTP 308 to `/projects`. | S8, S9 | Must |
| R12 | Areas index and four area pages. | Routes 200 | Must |
| R13 | About page. | Content matches spec | Must |
| R14 | **Booking form intact.** Do not add, remove, rename or reorder fields. Do not change `name` attributes, endpoint (`https://formspree.io/f/mpqyberw`), validation, success handling, or the GA4 calls `trackBookingFormSubmit` and `trackLead`. Allowed: visual restyle to the design system, and changing the city field label from "City/Town in Bihar" to "City / Town". If the current site embeds a Typeform instead of the native form, keep that embed and only restyle its container. | Diff of the form component shows no change in fields, names, endpoint or handlers | Must |
| R15 | Three calculators restyled with no logic change; coverage notices; admin panels gated. | S10; geometry tests pass | Must |
| R16 | Image system: manifest, generated images per `05_IMAGE_BRIEFS.md`, captions, alt text, "Illustrative image" chip while `placeholder: true`. | Manifest check script; every `next/image` has alt | Must |
| R17 | Metadata, canonical, Open Graph images, JSON-LD (Organization and HomeAndConstructionBusiness with address and telephone, FAQPage, Service, CreativeWork, BreadcrumbList), sitemap, robots. | Rich Results Test | Must |
| R18 | Analytics events in section 10. | GA4 DebugView | Must |
| R19 | WCAG 2.2 AA. | axe zero serious or critical | Must |
| R20 | Performance guardrails in section 5. | Lighthouse mobile | Must |
| R21 | Every existing non-project route returns 200. | Route diff script | Must |
| R22 | `/api/ingest` and `/api/normalize` reject requests without the admin key. | curl returns 401 | Must |
| R23 | Existing geometry tests pass untouched. | Test run | Must |
| R24 | Content lives in typed data files validated at build. | `tsc` passes | Should |
| R25 | Contact details come from one file, `lib/site.ts`. | Grep finds the phone number only there | Must |
| R26 | Sample content is flagged and reported. | `launch:check` output | Must |

## 8. User stories and acceptance criteria

**S1. The first mobile screen**
```gherkin
Scenario: First visit on a phone
  Given a visitor opens "/" on a 375 px screen
  When the page loads
  Then the headline "Build a home that is beautiful, engineered, and built to last." is visible
  And the three promise chips and a primary button "Get a free plot check" are visible without scrolling
  And the `MobileCtaBar` shows Call, WhatsApp and Start your project
```

**S2. One tap to the form**
```gherkin
Scenario: Reaching the form from anywhere
  Given a visitor is on any page except "/book-a-call"
  When they tap the primary button in the header, the sticky bar or any CtaBand
  Then they land on "/book-a-call" with a "src" parameter naming the placement
  And a cta_click event fires with that cta_id
```

**S3. Guarantee and warranty**
```gherkin
Scenario: Reading the guarantee
  Given a visitor opens "/guarantee"
  Then they see "On time, or 10% back." and the 15-year warranty
  And both statements say that conditions, scope and exclusions are in the agreement
  And no comparison with any competitor appears
```

**S4. Form submission (unchanged behavior)**
```gherkin
Scenario: Valid submission
  Given a visitor completes the existing form fields
  When they submit
  Then the form posts to the existing Formspree endpoint
  And the existing success behavior runs
  And trackBookingFormSubmit and trackLead fire as before
```

**S5. Method**
```gherkin
Scenario: Gate with instruments
  Given a visitor opens "/method" and expands stage 06
  Then they see the gate checks and the instruments used (cube tests, rebar scan, LiDAR scan)
```

**S6. Technology**
```gherkin
Scenario: Technology page
  Given a visitor opens "/technology"
  Then ten technology blocks render, each with what it catches, what the client receives and the stage where it is used
  And no block uses the words "first", "only" or "never seen"
```

**S7. NRI**
```gherkin
Scenario: NRI reads the reporting
  Given an NRI opens "/nri"
  Then they see weekly video, dated archive, 360° scans at gates, the live dashboard, the decision log and gate-linked payments
  And a "Book a call in your time zone" button leads to the form
```

**S8. Sample projects are labelled**
```gherkin
Scenario: Sample project
  Given a project has placeholder content
  When its card or page renders
  Then a "Sample project" chip is visible
  And its images carry "Illustrative image"
  And its metrics are labelled "Sample figure"
```

**S9. Old URLs**
```gherkin
Scenario: Old project slug
  Given a visitor opens "/projects/the-clay-house"
  Then the response is a 308 redirect to "/projects"
```

**S10. Tools state their coverage**
```gherkin
Scenario: Gurugram owner opens the feasibility tool
  Given a visitor opens "/calculators/site-feasibility"
  Then a notice says the rules loaded are Bihar Building Bye-laws 2014
  And a button "Get a free plot check" leads to the form
```

## 9. Edge-case matrix

| Area | Case | Required behavior |
|---|---|---|
| Form | Any behavior | Unchanged from the current site. Do not add guards or fields. |
| CTA | `src` missing on arrival at `/book-a-call` | Form works normally; `src` recorded as `direct` in analytics only |
| CTA | WhatsApp unavailable on device | Link opens the wa.me page; phone link remains next to it |
| Sticky bar | Software keyboard open | Bar hides while any input is focused |
| Sticky bar | `/book-a-call` | Primary button hidden; Call and WhatsApp stay |
| Ledger | Unknown claim id | Build fails |
| Ledger | `owner-directed` claim without source | Renders with footnote slot text "Source: to be added"; `launch:check` warns |
| Projects | Filter returns nothing | Empty state with "Clear filters" |
| Projects | Slug not found | Themed 404 with Projects and Book links |
| Images | Generation unavailable | Hatched placeholder with the image's alt text; id listed in `PROGRESS.md` |
| Images | Slow network | Reserved aspect ratio; no layout shift |
| Tools | Polygon invalid | Existing validation messages, restyled |
| Tools | Unsupported city | Notice plus plot-check button |
| Theme | localStorage blocked | Fall back to system preference |
| Accessibility | Reduced motion | No smooth scroll, no transitions |
| API | Missing admin key | 401 with no detail |
| Analytics | GA ID absent | Dispatchers no-op |

## 10. Telemetry specification

Existing `trackBookingFormSubmit` and `trackLead` stay unchanged. Add through `lib/analytics.ts`:

| Event | Properties | Fires when |
|---|---|---|
| `cta_click` | `cta_id`, `page`, `section`, `variant` | Any CTA is clicked. `cta_id` is the same string as the `src` parameter. |
| `whatsapp_click` | `page`, `section` | WhatsApp link clicked |
| `phone_click` | `page`, `section` | Call link clicked |
| `maps_click` | `page` | Directions link clicked |
| `project_filter` | `city`, `type`, `status`, `results` | Filter changed |
| `project_view` | `slug`, `city`, `status` | Project page loads |
| `method_stage_open` | `stage` | Stage expanded |
| `tech_block_open` | `id` | Technology block expanded |
| `calculator_start` / `calculator_complete` | `tool` | First input / result |
| `theme_toggle` | `to` | Theme button used |
| `scroll_depth` | `page`, `pct` | 25, 50, 75, 90 crossed once |
| `form_page_view` | `src` | `/book-a-call` loads |

Derived: CTA click-through = `cta_click` ÷ page views per placement. Form conversion = existing lead event ÷ `form_page_view`. Best placement = lead events grouped by `src`.

## 11. SEO requirements

- Canonical origin from `NEXT_PUBLIC_SITE_URL` (default `https://studioaashraya.site`).
- One H1 per page; title template `%s | Studio Aashraya`. Keyword map in `02_PAGE_SPECS.md` section 13.
- Organization graph includes `telephone: "+91-9473031016"` and `address` with streetAddress "C93, Old DLF Colony, Sector 14", addressLocality "Gurugram", addressRegion "Haryana", addressCountry "IN". Add postalCode 122001 only after the owner confirms it.
- No Review or AggregateRating markup.
- Sitemap generated from route data; priority to `/`, `/guarantee`, `/technology`, `/services/*`, `/nri`, `/areas/gurugram`, `/projects`.

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| 78% figure has no source. The only adjacent figure found is 62% of housing projects delayed across 50 cities (a Liases Foras survey of developer projects, not custom homes). | Advertising and credibility risk | Footnote slot, owner override recorded, launch warning. One-line swap in the ledger when a source exists. |
| 10% refund has no stated cap | Large liability on a high-value build, relevant when starting with little capital | The agreement defines the handover date and what can move it (client changes, authority delays, force majeure, late payments). The site says "Conditions are in your agreement". Owner and a lawyer finalize the clause before the first contract. |
| Technology declared live but unproven to a visitor who asks for a demo | Loss of trust | Owner prepares one sample deliverable per technology. Remove any technology the studio cannot show. |
| 15-year warranty terms are open | Disputes | Terms only in the contract; the site makes no scope promise beyond "scope and exclusions are in your agreement" |
| Sample projects read as real work | Misleading if left unlabelled | Chip on every sample card and page, "Illustrative image" captions, "Sample figure" metrics, `launch:check` reports each one |
| Public admin tools and open ingest API | Security and cost | R22 and gated admin panels |
| Bye-law engine provenance | Legal exposure | Owner confirms the engine in this repo was built independently; commit history is the evidence |
| Large single-pass generation | Silent regressions | Staged steps, commit per step, progress file, verification script |

## 13. Owner inputs and defaults

| # | Input | Default if missing |
|---|---|---|
| B1 | Canonical domain | `studioaashraya.site` |
| B2 | Email and office hours | Email `studioaashraya@gmail.com` (from the old site); no hours shown |
| B3 | Real project data and photos | Six sample projects in `06_SAMPLE_PROJECTS.ts` |
| B4 | Gate checks and instruments per gate | As written in `02_PAGE_SPECS.md` section 3 |
| B5 | NCR cost bands for the estimator | "Indicative range on request" |
| B6 | Warranty and refund wording from the contract | "Conditions, scope and exclusions are in your agreement" |
| B7 | Real testimonials | Section does not render |
| B8 | Fee for the Land and Buildability Report | "Quoted after the consultation" |
| B9 | COA number | Footer shows "COA-registered architect" without a number |
| B10 | Founder photograph | Generated placeholder `about-studio` |
| B11 | Reply time for the free plot check | "2 working days" |
| B12 | Postal code 122001 | Omitted from schema until confirmed |
| B13 | Source for the 78% figure | Footnote slot and launch warning |
| B14 | Measurement method note for thermal and energy figures | `lib/measurement-note.ts` default: "Measured data is available on request." |
