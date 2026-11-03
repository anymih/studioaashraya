# Studio Aashraya Website v2: Product Requirements Document

Version 2.0 · 2 November 2026 · Owner: Anumeh Prakhar, Principal Architect
Repository: `anymih/studioaashraya` (Next.js 16 App Router, React 19, TypeScript, Tailwind v4)

Read order for the build agent: `01_PRD.md`, `03_DESIGN_SYSTEM.md`, `02_PAGE_SPECS.md`, `04_IMPLEMENTATION_PLAN.md`. Reference implementation of the approved look: `docs/rebuild/reference/studio-aashraya.html`.

---

## 1. Decision record

| # | Decision | Made by |
|---|---|---|
| D1 | Site structure stays open to Delhi NCR, Bihar and Uttarakhand. Delhi NCR is the focus of copy, navigation order, and SEO. | Owner |
| D2 | Track record shown on the site: 50+ projects designed, 30+ constructed. | Owner |
| D3 | The look is the approved mockup (concrete neutrals, safety orange, Big Shoulders Display, IBM Plex, drawing-sheet components). It applies to every page. Refinements are allowed. Direction does not change. | Owner |
| D4 | The old site's visuals are discarded. Its code, routes, calculators, forms and analytics are kept. | Owner |
| D5 | Every number about performance carries an evidence label (section 6). Figures not yet measured on a finished building are labelled "simulated at design stage". Figures with no source are not published. | Editorial ruling, owner may override per claim |
| D6 | Primary positioning line is "IIT-led architecture and construction for homes that perform." The mockup hero headline is kept. | Editorial ruling |
| D7 | No competitor is named anywhere on the site. | Editorial ruling |

## 2. Problem and opportunity

**Problem.** The current site sells climate-responsive design services in Bihar. The business now sells design plus construction to HNI and NRI plot owners in Gurugram and Delhi NCR. The site's offer, keywords, calculators' coverage, form fields and contact details all point at the old business.

**Market read** (from `Market_Research.md`; the sources are competitor self-descriptions and are unverified):
- Package-led design-build firms win on price clarity, fixed scope, milestone payments and warranty language.
- Tech-led firms win NRIs with dashboards and stage-based payments.
- Design studios win on taste and hand over drawings, leaving the client to manage the contractor.
- Nobody found in the research publishes engineering proof: gate records, specifications, test results, as-built files.
- The two research documents disagree on one competitor's price band. The site never quotes competitor prices.

**Opportunity.** Own the bespoke end of the market with a proof system the client can read: stage gates, a published specification schedule, a bill of quantities with every design, and records at handover. The IIT credential is the reason to believe the system. The system is the product.

## 3. Positioning (final)

- **Line:** IIT-led architecture and construction for homes that perform.
- **Hero headline (kept from mockup):** Drawn by an IIT architect. Built by the same hands.
- **Supporting line:** Designed as architecture. Built as engineering. Delivered with proof.
- **Offer ladder:** Buildability Consultation (call) → Land and Buildability Report (paid) → Architecture, Engineering and Turnkey Build → NRI Remote Build Management (add-on or default for overseas clients).
- **Tone rules:** plain sentences, specific nouns, no superlatives, no "zero" or "100%" claims, no invented statistics, no competitor names, no em-dash asides.

## 4. Audience

| Persona | Situation | What they check before calling | Page that must convince them |
|---|---|---|---|
| P1 HNI plot owner | Owns a plot in Gurugram or a legacy house in Delhi. Referral-led. Wants distinction without chaos. | Built work, credentials, who is accountable, how problems are handled | Home, Projects, Method |
| P2 NRI owner | Abroad (UK, UAE, US, Singapore). Plot or ancestral land in NCR. Needs evidence, not reassurance. | Reporting rhythm, payment control, time-zone fit | NRI, Method, Book |
| P3 Referrer | Structural consultant, lawyer, broker, tax advisor. Sends clients if the firm looks sound. | Credentials, written process, specification | About, Method, Specifications |
| P4 Existing-market client | Bihar or Uttarakhand homeowner | Local work, tools | Areas, Projects, Tools |

## 5. Goals, non-goals, metrics

**Goals**
1. Qualified consultation requests from NCR plot owners and NRIs.
2. A visitor can verify who the studio is, what it has built, and how it controls quality, within three minutes.
3. Keep every existing technical asset working: Formspree lead flow, GA4, JSON-LD, the three calculators, the polygon editor, all routes.
4. Rank for NCR design-build and NRI-construction searches.

**Non-goals (this release)**
- A CMS or client login. The NRI system is operational (calls, photos, records), not software.
- Publishing prices or per-square-foot rates.
- Haryana bye-law rules in the feasibility engine. Gurugram plot audits are done by the studio by hand.
- Paid map APIs. Any change to the geometry math.
- A blog. A journal route is reserved for Phase 2.

**Metrics**

| Type | Metric | Target |
|---|---|---|
| North Star | Qualified consultation requests per month (NCR location, plot or project stage, budget band all filled) | Baseline for 30 days, then set |
| Primary | Form submit rate per unique visitor to /book-a-call; WhatsApp click rate; share of requests with NCR location | Baseline for 30 days |
| Guardrail | Mobile LCP p75 | ≤ 2.5 s |
| Guardrail | CLS / INP | ≤ 0.1 / ≤ 200 ms |
| Guardrail | Lighthouse mobile performance, accessibility | ≥ 90, ≥ 95 |
| Guardrail | Ledger violations in production build | 0 |
| Guardrail | Existing routes returning 200 | 100% |

## 6. Truth system: claim ledger and capability ledger

HNI and NRI buyers and their advisors check claims. One unprovable figure damages every true one. The site therefore renders performance claims and capabilities from two typed registries, `lib/ledger.ts`, never from free text in components.

**Evidence states:** `measured` (instrumented on a finished or occupied building, method stated), `simulated` (design-stage model, renders with the label "Simulated at design stage" and a method link), `owner-attested` (a track-record fact the owner confirms), `pending` (never renders), `removed` (never renders, never rewritten).

**Claim ledger (initial state)**

| Claim | Source | State | Display rule |
|---|---|---|---|
| 50+ projects designed, 30+ constructed | Owner | owner-attested | Show |
| B.Arch, IIT BHU Varanasi, 2024 · COA-registered · Data Science for AEC certificate | Owner | owner-attested | Show. Add the COA registration number in the footer when supplied. |
| Interiors 4 to 6 °C cooler (old site) | Owner, design measures | simulated | Show only on a project page that has the model, with label and method. Not in the hero. Becomes `measured` when logs exist. |
| 30% lower energy bills (old site) | Owner, design measures | pending | Hidden until a measured comparison exists |
| 100% bye-law approval rate (old site) | Owner | pending | Hidden until owner confirms the wording and the denominator |
| Indoor AQI under 25 year-round | Research 02 | removed | No evidence, no stated system |
| 78% of luxury homes miss deadlines or suffer seepage | Research 02 | removed | Invented statistic |
| 50-year dry lifecycle waterproofing | Research 02 | removed | Not supportable |
| Zero delays, zero compromise, zero seepage | Research 02 | removed | Absolute claims |
| 5D BIM | Research 02 | removed | Not offered |
| 10-year structural warranty, escrow payments | Competitor features | pending | Hidden until the owner defines the studio's own terms |

**Capability ledger (initial state).** A capability renders only when `live`.

| Capability | State |
|---|---|
| Single accountable project lead | live |
| Weekly video walkthrough and dated photo archive | live |
| Written decision and approvals log | live |
| Payments linked to passed gates, written into the agreement | live |
| Gate records (checklist, photos, sign-off) at four stages | live |
| Bill of quantities with every design | live |
| Manual FAR and setback audit for NCR plots | live |
| Independent third-party structural check | pending |
| LiDAR scans, digital twin, BIM clash detection | pending |
| NABL-lab concrete testing, pulse-velocity testing, rebar scanning | pending |
| Client dashboard or app | pending |

**Build enforcement.** `npm run ledger:check` scans `app/`, `components/` and `lib/` and fails the build if it finds banned strings (list in the implementation plan, step 2) or any competitor name.

## 7. Requirements

| ID | Requirement | Verified by | Priority |
|---|---|---|---|
| R1 | Implement the design system in `03_DESIGN_SYSTEM.md` on every page, both themes, no FOUC. | Visual check at 375, 768, 1440 px in both themes; screenshot set | Must |
| R2 | Ledger components and `ledger:check` in place; no pending or removed content renders. | Script exits 0; planted banned string makes it exit 1 | Must |
| R3 | Home page per `02_PAGE_SPECS.md` section 2. | Acceptance criteria S1 | Must |
| R4 | Method page with eight stages and four gates. | S2 | Must |
| R5 | Services index plus four detail pages, data-driven. | Routes 200; sections match spec | Must |
| R6 | NRI page. | S2 | Must |
| R7 | Projects listing with city, type and status filters; detail pages with status badge and evidence-labelled metrics. | S5, S6 | Must |
| R8 | Areas index and data-driven area pages. | Routes 200; schema valid | Must |
| R9 | About page. | Content matches spec | Must |
| R10 | Book-a-call form with new fields, validation, no-JS fallback, WhatsApp fallback. | S3, S4 | Must |
| R11 | Tools index; restyle the three calculators with no logic change; label coverage; gate admin tools. | S7; geometry tests pass | Must |
| R12 | Metadata, canonical, Open Graph images, JSON-LD (Organization, HomeAndConstructionBusiness, FAQPage, CreativeWork, BreadcrumbList), sitemap, robots. | Rich Results Test; sitemap lists every public route | Must |
| R13 | Analytics events in section 10 on top of the existing GA4 calls. | GA4 DebugView | Must |
| R14 | WCAG 2.2 AA: contrast, focus visible, skip link, labelled controls, keyboard operation of filters and accordions. | axe zero serious or critical | Must |
| R15 | Performance guardrails in section 5. | Lighthouse mobile run | Must |
| R16 | Every existing route still returns 200. | Route diff script | Must |
| R17 | `/api/ingest` and `/api/normalize` reject unauthenticated requests. | curl without key returns 401 | Must |
| R18 | Existing geometry unit tests pass untouched. | Test run | Must |
| R19 | Content lives in typed data files validated at build. | `tsc` passes; missing required field fails build | Should |
| R20 | `/specifications` ships only when `lib/spec-schedule.ts` has live rows; otherwise the route 404s and is excluded from the sitemap. | Both states tested | Should |

## 8. User stories and acceptance criteria

**S1. HNI sees proof in the first screen**
As a plot owner in Gurugram I want to see who is accountable and what has been built so that I can decide whether to call.
```gherkin
Scenario: First visit on mobile
  Given a visitor opens "/" on a 375 px screen
  When the page has loaded
  Then the headline, the primary call to action and the credential strip are visible without scrolling past the second screen
  And the strip shows "IIT BHU", "COA", "50+ designed, 30+ built"
  And no figure on the page is missing an evidence label where one is required
```

**S2. NRI evaluates the remote system**
```gherkin
Scenario: Reading the reporting commitments
  Given an NRI opens "/nri"
  When they read "What you receive"
  Then they see weekly video walkthrough, dated photo archive, decision log, gate-linked payments and a named lead
  And no pending capability (LiDAR, digital twin, dashboard) is mentioned
  And a form link pre-fills the intent as "nri-remote-build"
```

**S3. Consultation request succeeds**
```gherkin
Scenario: Valid submission
  Given a visitor completes name, one contact method, location, project stage and budget band
  When they press "Send request"
  Then the form posts to the Formspree endpoint
  And a success panel replaces the form with the next steps and a WhatsApp link
  And events form_submit_attempt, form_submit_success and the existing lead event fire once
```

**S4. Consultation request fails**
```gherkin
Scenario: Network error or Formspree 429/5xx
  Given the visitor submits a valid form
  When the request fails
  Then the entered values stay in the fields
  And an error panel explains the failure in one sentence and offers WhatsApp and phone as alternatives
  And form_submit_error fires with the failure reason
  And pressing Send again does not create a duplicate within 5 seconds
```

**S5. Portfolio is honest**
```gherkin
Scenario: Filtering by status
  Given a visitor is on "/projects"
  When they choose the status "Built"
  Then only projects with status "built" are listed
  And every card shows its status badge, city, and plot or built-up area when supplied
  And a project without a cover photo or a status is not listed
```

**S6. Pending claims never render**
```gherkin
Scenario: Ledger enforcement
  Given a claim has state "pending"
  When any page that references it is built
  Then the claim text is absent from the HTML output
  And a "simulated" claim appears only with the label "Simulated at design stage" and a method link
```

**S7. Tools state their coverage**
```gherkin
Scenario: Gurugram plot owner opens the feasibility tool
  Given a visitor opens "/calculators/site-feasibility"
  When the page loads
  Then a notice states the rules loaded are Bihar Building Bye-laws 2014
  And a call to action offers a manual Gurugram plot audit with intent "plot-audit"
  And the admin panels are not rendered
```

**S8. Theme**
```gherkin
Scenario: Dark mode and no script
  Given the visitor's system is set to dark
  When any page loads with JavaScript disabled
  Then the dark palette applies and text is readable
  And with JavaScript enabled the toggle switches the theme and remembers it on the next visit
```

**S9. Old links still work**
```gherkin
Scenario: Existing URLs
  Given an old URL such as "/calculators/far-checker" or "/projects/the-clay-house"
  When it is requested
  Then it returns 200 with the new design
```

## 9. Edge-case and failure matrix

| Area | Case | Required behavior |
|---|---|---|
| Form | Phone from outside India (+44, +971, +1) | Accept 7 to 15 digits with optional +; do not force Indian format |
| Form | Neither phone nor email supplied | Inline error: "Add a phone number or an email so we can reply" |
| Form | Bot fills the honeypot | Silent success, no network call, no GA event |
| Form | Double click on submit | Button disables for the request; second submit within 5 s ignored |
| Form | JavaScript disabled | Native POST to the Formspree endpoint with a redirect to `/book-a-call?sent=1` that shows the success panel |
| Form | Offline | Detect `navigator.onLine === false`, show error panel with WhatsApp and phone |
| Form | Budget band left on "Not sure" | Allowed; request is flagged unqualified in the email subject |
| Form | Very long notes | 2,000 character cap with counter |
| Projects | Zero projects match filters | Designed empty state with "Clear filters" |
| Projects | Missing photo | Project hidden in production; in development show the hatched placeholder |
| Projects | Metric without evidence state | Build fails validation |
| Projects | Slug not found | Themed 404 with links to Projects and Book |
| Ledger | Claim id unknown | Build fails |
| Tools | Polygon self-intersects or has fewer than 3 points | Existing validation messages, restyled; no result shown |
| Tools | Area or rate outside range | Clamp and message; never show NaN |
| Tools | Touch device | Pan and zoom by touch; snapping works; buttons at least 44 px |
| Tools | Unsupported city | Message plus plot-audit call to action |
| Theme | localStorage blocked | Fall back to system preference; no error |
| Images | Slow network | Reserved aspect ratio; no layout shift |
| Accessibility | Reduced motion | No smooth scroll, no transitions over 0.01 ms |
| API | Missing or wrong admin key | 401 with no body detail |
| API | Supabase unreachable | `/api/health` reports degraded; public pages unaffected |
| SEO | Area or service data has no `live` rows | Page excluded from sitemap and returns 404 |
| Analytics | GA ID absent (preview deploys) | Dispatchers no-op without errors |

## 10. Telemetry specification

All events go through `lib/analytics.ts`. Existing `trackBookingFormSubmit` and `trackLead` stay.

| Event | Properties | Fires when |
|---|---|---|
| `cta_click` | `cta_id`, `page`, `section`, `intent` | Any primary or secondary CTA is clicked |
| `whatsapp_click` | `page`, `section` | WhatsApp link clicked |
| `phone_click` | `page` | Phone link clicked |
| `form_start` | `intent` | First field focus on the booking form |
| `form_submit_attempt` | `intent`, `has_phone`, `has_email`, `location_region` | Submit pressed with valid fields |
| `form_submit_success` | `intent`, `location_region`, `budget_band`, `stage`, `is_nri` | Formspree returns 2xx |
| `form_submit_error` | `reason` (`network`, `rate_limit`, `server`, `validation`) | Any failure |
| `project_filter` | `city`, `type`, `status`, `results` | Filter changed |
| `project_view` | `slug`, `city`, `status` | Project detail loads |
| `method_stage_open` | `stage` | A stage is expanded |
| `calculator_start` | `tool` | First input change |
| `calculator_complete` | `tool`, `city_tier` | A result is produced |
| `theme_toggle` | `to` | Theme button used |
| `scroll_depth` | `page`, `pct` (25, 50, 75, 90) | Threshold crossed once per page view |

**Derived metrics.** Request rate = `form_submit_success` ÷ unique `/book-a-call` visitors. Qualified rate = successes with NCR `location_region`, a stage and a budget band ÷ all successes. NRI share = `is_nri` true ÷ successes.

## 11. SEO requirements

- Canonical origin from `NEXT_PUBLIC_SITE_URL` (default `https://studioaashraya.com`).
- One H1 per page; titles use the template `%s | Studio Aashraya`.
- Primary keyword map is in `02_PAGE_SPECS.md` section 12.
- Do not add Review or AggregateRating markup for testimonials on the studio's own site.
- Sitemap generated from route data; priority to `/`, `/services/*`, `/nri`, `/areas/gurugram`, `/projects`.

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Capabilities on the site exceed what the studio delivers | Loss of trust with advisers who check | Capability ledger; owner confirms the gate checklist before launch |
| Thermal figures read as measured when they are modelled | Credibility, possible advertising complaints | Evidence labels; method link |
| Public admin tools and open ingest API | Security and cost | R17 and gating of admin panels |
| Single-pass generation of a large site | Silent regressions | Staged steps, commit per step, progress log, verification script |
| Calculators mislead Gurugram owners with Bihar rules | Wrong advice under the studio's name | Coverage notice; manual audit CTA |
| Thin NCR portfolio | Weak proof | Honest status badges; lead with method and records; add NCR projects as they complete |
| Bye-law engine provenance | Legal exposure | Owner confirms the engine in this repo was built independently; commit history is the evidence |

## 13. Owner inputs and defaults

| # | Input | Default if missing |
|---|---|---|
| B1 | Canonical domain (.com or .site) | `studioaashraya.com` |
| B2 | NCR contact: office or "by appointment" line, phone, WhatsApp, email | Reuse the phone, WhatsApp and email already on the old site; show "Gurugram, by appointment" |
| B3 | For each project: status (built, under construction, design), city, plot area, built-up area, year, cover photo, gallery | Only projects with status and cover photo render |
| B4 | Confirm each gate-checklist item and each live capability | Items as listed in the ledgers |
| B5 | NCR cost bands for the estimator | Estimator shows Bihar tiers only; NCR shows "Indicative range on request" |
| B6 | Warranty terms | No warranty claim; "Terms are written into the agreement" |
| B7 | Real testimonials with permission | Section does not render |
| B8 | Fee wording for the Land and Buildability Report | "Quoted after the consultation" |
| B9 | COA registration number | Footer shows "COA-registered architect" without a number |
| B10 | Founder photograph | Section uses the typographic layout without a photo |
