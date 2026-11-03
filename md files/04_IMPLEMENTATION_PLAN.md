# Studio Aashraya Website v2: Implementation Plan for Antigravity (Revision 2)

Target repository: `anymih/studioaashraya`. Working branch: `rebuild/v2`. All documents live in `docs/rebuild/`.

## 0. Package contents

| File | Purpose |
|---|---|
| `01_PRD.md` | Decisions, claim and capability ledger, requirements R1 to R26, stories, telemetry, risks, owner inputs |
| `02_PAGE_SPECS.md` | Final copy and structure for every page, CTA map, SEO map, mobile rules |
| `03_DESIGN_SYSTEM.md` | Tokens, type, components, conversion patterns, mobile rules, computed contrast, states |
| `04_IMPLEMENTATION_PLAN.md` | This file: steps, scripts, checks, prompts |
| `05_IMAGE_BRIEFS.md` | Image registry, style bible and a prompt for each of 54 images, coded graphics |
| `06_SAMPLE_PROJECTS.ts` | Six sample projects (type `Project` and data). Copy into `lib/projects-data.ts` |
| `reference/studio-aashraya.html` | The approved visual reference |

Read order: `AGENTS.md`, `01`, `03`, `02`, `05`, `06`, this file, then the reference HTML.

## 1. Before you start (owner, about 10 minutes)

1. Create `docs/rebuild/` in the repository and copy in all seven files above.
2. Add these variables to the deployment environment (names only here; values are yours):

| Variable | Value | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://studioaashraya.com` (change if the domain differs) | Canonical URLs, sitemap, schema |
| `NEXT_PUBLIC_GA_ID` | existing | GA4 |
| `ADMIN_API_KEY` | a long random string | Protects `/api/ingest` and `/api/normalize` |
| `NEXT_PUBLIC_ENABLE_ADMIN_TOOLS` | `false` | Hides bye-law admin panels |
| `NEXT_PUBLIC_SHOW_SAMPLE_BANNER` | `true` | Shows `SampleBanner` and `SampleTag` while samples exist |
| `ALLOW_SAMPLE_CONTENT` | `false` for the launch gate; `true` only if you decide to go live with samples | Controls `launch:check` |

3. Leave the booking form alone. Do not edit it before the build starts.
4. Antigravity must be allowed to run shell commands and an image generator. If there is no image generator, the build still completes (hatched placeholders) and lists the missing images.

## 2. Ground rules for the build agent

1. Read `AGENTS.md` first. Its rule stays in force: nothing is pushed to GitHub without the owner's explicit confirmation.
2. Work on branch `rebuild/v2`. Commit after every step with the message `step N: <title>`. Never push, never force-push, never touch `main`.
3. Keep `docs/rebuild/PROGRESS.md` (template in section 8). Update it after each step. A new session must be able to resume from this file alone.
4. **The booking form is frozen** (PRD R14). Do not add, remove, rename or reorder fields; do not change `name` attributes, the Formspree endpoint, validation, the success behavior, or the calls to `trackBookingFormSubmit` and `trackLead`. You may restyle it and change one label: "City/Town in Bihar" becomes "City / Town". If the current site embeds a Typeform instead, keep the embed untouched and restyle only its container. `npm run form:check` enforces this.
5. Do not change the math in `lib/site-feasibility/*`, the FAR tables or `lib/calculator-constants.ts`.
6. Claims, guarantees and capabilities come from `lib/ledger.ts` only. Contact details come from `lib/site.ts` only. Images come from `lib/images.ts` by id only. Projects come from `lib/projects-data.ts`.
7. Use only the copy in `02_PAGE_SPECS.md`. If copy is missing, leave the section out and log it. No lorem ipsum, no invented statistics, testimonials, prices or credentials.
8. No competitor name anywhere in `app/`, `components/` or `lib/`.
9. No em-dashes in site copy.
10. If a step fails verification, fix it before moving on. If two documents conflict, `01_PRD.md` wins, then `02_PAGE_SPECS.md`, then `03_DESIGN_SYSTEM.md`. Record the conflict in `PROGRESS.md`.
11. If a tool or image generator is unavailable, do not stop. Use the fallback stated in the step and continue.
12. Stop and ask the owner only for: the form file cannot be located; the form is a Typeform embed with unclear ownership; a destructive git action seems necessary; the build still fails after three fix attempts on the same error.

## 3. Prompts to paste into Antigravity

**Start (paste once):**
```
You are rebuilding the Studio Aashraya website in this repository.
Read AGENTS.md, then every file in docs/rebuild/ in the order given in 04_IMPLEMENTATION_PLAN.md section 0.
Follow 04_IMPLEMENTATION_PLAN.md exactly: branch rebuild/v2, one commit per step, never push.
Execute steps 0 to 13 without stopping. Keep docs/rebuild/PROGRESS.md current after every step.
The booking form is frozen. Claims, contact details, images and projects come only from lib/ledger.ts, lib/site.ts, lib/images.ts and lib/projects-data.ts.
If something is missing, use the defaults in 01_PRD.md section 13 and log it.
Stop only at the end, after step 13, with the verification report. Do not push.
```

**Resume (new session):**
```
Read AGENTS.md, docs/rebuild/PROGRESS.md and docs/rebuild/04_IMPLEMENTATION_PLAN.md.
Continue from the first step not marked done. Same rules. Do not push.
```

## 4. Steps

### Step 0. Baseline, safety and freeze files
- `git checkout -b rebuild/v2`; `npm ci`; `npm run build`. Record the result.
- List every route under `app/` and write `scripts/routes-baseline.json` (include the seven old project slugs).
- Run the existing geometry tests (see `package.json`; if there is no script, run the test file under `lib/site-feasibility/` with the repo's runner). Record the result.
- Locate the booking form component (`app/book-a-call/page.tsx` or a component it imports). Write `scripts/form-baseline.json` with: every `name` attribute of inputs, selects and textareas; the option lists of selects; the endpoint string; the names of the analytics functions it calls. If a Typeform embed is used instead, record the embed identifier.
- Add `scripts/form-check.mjs`: re-extract the same facts from the same file and fail if anything differs, except that the label text "City/Town in Bihar" may change to "City / Town".
- Protect the API: `app/api/ingest/route.ts` and `app/api/normalize/route.ts` return `401` with an empty body unless header `x-admin-key` equals `process.env.ADMIN_API_KEY`. `/api/health` stays public and reports only `ok` or `degraded`.
- Add `.env.example` entries from section 1.
- **Done when:** baseline build and tests pass; `form-baseline.json` exists and `npm run form:check` passes; unauthenticated call to `/api/ingest` returns 401.

### Step 1. Foundations
- Replace fonts in `app/layout.tsx` with Big Shoulders Display, IBM Plex Sans and IBM Plex Mono through `next/font/google` (Latin subset, `display: swap`, CSS variables per `03_DESIGN_SYSTEM.md` section 2). Set `<html lang="en-IN">`.
- Replace `styles/globals.css` with the tokens, the Tailwind `@theme inline` mapping and base rules (focus, reduced motion, skip link, `scroll-margin-top`). Delete the old tokens and every use of `#184A45`, `#C96A40`, `#FAF4EC` and the Cormorant, Inter and Space Mono variables.
- Add the theme script to `<head>` (design system section 8).
- Build every component in `03_DESIGN_SYSTEM.md` section 5 under `components/ui/` and `components/sheet/SectionSheet.tsx`, plus `MenuOverlay`. Delete `components/ui/BottomNav.tsx`.
- Rebuild `Header`, `Footer` and `MobileCtaBar` per `02_PAGE_SPECS.md` section 1 (labels: desktop button "Book a consultation"; bar button "Start your project").
- Add `SampleBanner` to the layout, controlled by `NEXT_PUBLIC_SHOW_SAMPLE_BANNER`.
- Create the temporary route `/_kit` that renders every component in both themes and at 375 px and 1440 px.
- **Done when:** `/_kit` and all existing pages render in both themes without console errors; `npm run build` passes; the old hex values are absent from the repo.

### Step 2. Data layer, truth system and scripts
- `lib/site.ts`: phone `+91 94730 31016`, tel `+919473031016`, WhatsApp URL, address `C93, Old DLF Colony, Sector 14, Gurugram`, maps URL, email, form route (values in `02_PAGE_SPECS.md` header).
- `lib/ledger.ts`: types and registries from `01_PRD.md` section 6.
```ts
export type ClaimState = "measured" | "owner-attested" | "contractual" | "owner-directed";
export interface Claim { id: string; text: string; state: ClaimState; source?: string; note?: string; ownerOverride?: boolean }
export const CLAIMS: Record<string, Claim> = {
  "c.market78": { id: "c.market78", text: "78%", state: "owner-directed", source: "", ownerOverride: true,
    note: "Owner directed on 2 Nov 2026, no source supplied." },
  // c.track, c.credentials, c.ontime, c.refund, c.warranty, c.thermal, c.energy, c.approval, c.seismic per the PRD
};
export const TECH = { /* ten ids: bim-clash, thermal-sim, lidar-twin, drone-audit, concrete-testing, pulse-velocity, rebar-scan, flood-test, dashboard-cpm, structural-seismic */ };
```
  Add `<Claim id>` and `<Cap id>` helpers; `<Claim>` renders `EvidenceLabel` for `measured` and `ClaimNote` for `c.market78`.
- Data files: `lib/faq-data.ts`, `lib/services-data.ts`, `lib/areas-data.ts`, `lib/method-data.ts`, `lib/tech-data.ts` (ten blocks from `02_PAGE_SPECS.md` section 4), `lib/testimonials.ts` (empty), `lib/spec-schedule.ts` (empty), `lib/measurement-note.ts` (default "Measured data is available on request.").
- `lib/projects-data.ts`: copy `06_SAMPLE_PROJECTS.ts` and keep its types. Add `validateProjects()` and call it from `generateStaticParams` and from `scripts/projects-check.mjs`.
- `lib/images.ts`: the registry from `05_IMAGE_BRIEFS.md` section 3 (all 54 ids with width, height, alt, kind, priority) and a `<Img id>` helper that renders `next/image` inside `ImageFrame` with the caption rule.
- `lib/analytics.ts`: keep `trackBookingFormSubmit` and `trackLead` unchanged; add the events in `01_PRD.md` section 10 as no-op safe functions.
- Scripts (all in `scripts/`, all wired into `package.json`):

| Script | Fails when |
|---|---|
| `ledger:check` | A banned pattern appears in `app/`, `components/` or `lib/` (except `lib/ledger.ts`). Patterns: `\b78\s?%`, `AQI under`, `50-year`, `7-layer`, `5D\b`, `zero seepage`, `zero delays?`, `never seen`, `first in india`, `only builder`, `longer than any`, `escrow`, and `\b(Prithu|Brick\s*&\s*Bolt|Tron\s+Homes|ANJ\s+Homes|ConsYard|Oberoi)\b`. Also fails on an unknown ledger id. |
| `routes:check` | A route in `routes-baseline.json` is missing in the build output, or an old project slug does not redirect to `/projects` |
| `form:check` | The form differs from `form-baseline.json` (see step 0) |
| `images:check` | A registry id has no file (it must then be flagged `missing`), an image has no alt text, or a generated image lacks its caption rule |
| `projects:check` | A project fails validation |
| `cta:check` | After build, a Playwright crawl at 375 px finds a route with fewer than three links to `/book-a-call` or `tel:` or `wa.me`, a primary link without a `src` parameter, or a missing `MobileCtaBar` (except it must show only Call and WhatsApp on `/book-a-call`) |
| `launch:check` | `NEXT_PUBLIC_SITE_URL` or a `lib/site.ts` constant is missing; any `placeholder: true` project or any `proj-*` image with `kind: "generated"` exists while `ALLOW_SAMPLE_CONTENT` is not `true` (with the flag it warns instead); warns on each `owner-directed` claim without `source` |
| `verify` | Runs `tsc --noEmit`, `lint`, `ledger:check`, `form:check`, `projects:check`, `build`, `routes:check`, `images:check`, `cta:check` in that order |

- **Done when:** `npm run verify` passes except `cta:check` (no pages yet); a planted `Prithu` string makes `ledger:check` fail (test it, then remove it); `launch:check` prints its warnings.

### Step 3. CTA system
- Build `CtaRow`, `StartBand` (variants `plot-check`, `guarantee`, `nri`, `tech`, `projects`, `old-house`, copy from `02_PAGE_SPECS.md` section 1) and `StartPaths`.
- One helper `bookHref(src)` returns `/book-a-call?src=<src>`; every primary CTA uses it. `cta_click` fires with `cta_id` equal to `src`. `phone_click` and `whatsapp_click` fire on Call and WhatsApp links.
- `MobileCtaBar`: three buttons, hides while an input has focus (listen to `focusin` and `focusout`), hides the primary button on `/book-a-call`, adds bottom padding to `body` equal to bar height plus `env(safe-area-inset-bottom)`.
- `/book-a-call` reads `src` and fires `form_page_view`. It never writes `src` into the form.
- **Done when:** each CTA variant renders in `/_kit`; analytics events appear in GA4 DebugView on a preview deploy (or in a local console log when `NEXT_PUBLIC_GA_ID` is absent).

### Step 4. Images and coded graphics
- Coded graphics first: `SectionSheet` (port from the reference HTML), `HeroOverlay`, `PromiseCard`, `GuaranteeTimeline`, `DashboardMock` (React, sample data, label "Sample data"), `OgImage` (`next/og`).
- Generate the 54 images in the order of `05_IMAGE_BRIEFS.md` section 3 using the style bible and each prompt. Export AVIF (q55), WebP (q72) and JPG (q78) at the sizes in the brief. Save to `public/images/<group>/<id>.<ext>`.
- Register each in `lib/images.ts`. Generated images show the caption `Illustration` (or `Design render`, `Sample drawing` per the brief).
- If generation is unavailable: leave the registry entry with `missing: true`, render the hatched placeholder with the alt text, and list every missing id in `PROGRESS.md`.
- **Done when:** `images:check` passes; hero image served to phones is at most 140 KB; every image has alt text.

### Step 5. Home
- Build `app/page.tsx` as server components per `02_PAGE_SPECS.md` section 2 (sections 2.1 to 2.15). FAQ from `lib/faq-data.ts` with FAQPage JSON-LD. Remove the old testimonial JSON-LD.
- Hero H1 is exactly: "Build a home that is beautiful, engineered, and built to last." with "engineered" emphasised.
- **Done when:** on a 375 px viewport the H1, three promise chips and the primary button are visible in the first screen; the 78% line renders through `<Claim id="c.market78">` with its footnote; no hard-coded figure appears in the page file.

### Step 6. Method, Technology, Guarantee, NRI
- `app/method/page.tsx` (eight stages, four gates with instruments, `GateRecord` sample, `SectionSheet`, gate images).
- `app/technology/page.tsx` (ten `TechBlock`s with anchors from the `TechId` values, measurement section, Seismic Zone IV note).
- `app/guarantee/page.tsx` (`PromiseCard`s, `GuaranteeTimeline`, how it works, `#warranty` section, FAQ with JSON-LD). Do not add conditions that are not in the spec.
- `app/nri/page.tsx` (eight items, reporting rhythm, before-you-start, FAQ).
- **Done when:** the four routes return 200; expanding a method stage fires `method_stage_open`; expanding a technology block fires `tech_block_open`.

### Step 7. Services and Areas
- `app/services/page.tsx`, `app/services/[slug]/page.tsx` (four slugs) with `generateStaticParams`, `generateMetadata` and `Service` JSON-LD.
- `app/areas/page.tsx`, `app/areas/[slug]/page.tsx` (four slugs).
- **Done when:** eight new routes return 200 and appear in the sitemap.

### Step 8. Projects and redirects
- Rebuild `app/projects/page.tsx` (City, Type and Status filters, URL hash state with letters and hyphens, empty state, swipe-row filters on phones) and `app/projects/[slug]/page.tsx` in the order in `02_PAGE_SPECS.md` section 8.2, for the six sample slugs.
- In `next.config`, add permanent redirects (308) from the seven old slugs to `/projects`:
```ts
async redirects() {
  return ["the-clay-house","the-veranda-villa","aashraya-farmstead","vidya-learning-center",
    "heritage-library-bhagalpur","zero-carbon-pavilion","codename-madhuban"]
    .map(s => ({ source: `/projects/${s}`, destination: "/projects", permanent: true }));
}
```
- **Done when:** six project pages build; each shows `SampleTag`, "Sample figure" metrics and "Illustration" captions; old slugs redirect.

### Step 9. About and Book
- `app/about/page.tsx` per section 10 of the page specs.
- `app/book-a-call/page.tsx`: wrap the frozen form with the new content (promise strip, what to send, contact card, what happens next, FAQ, desktop-only `book-plot` image). Restyle the form to the design system using classes only.
- **Done when:** `npm run form:check` passes; a test submission reaches the Formspree endpoint and shows the existing success behavior; both existing GA4 events fire.

### Step 10. Tools
- `app/calculators/page.tsx` index; restyle the three tools; coverage notices; `Delhi NCR` option in the cost estimator showing "Indicative range on request"; gate `SandboxPanel` and `RuleNormalizationEditor` behind `NEXT_PUBLIC_ENABLE_ADMIN_TOOLS`; map polygon canvas colors to tokens.
- **Done when:** geometry tests pass unchanged; a polygon can be drawn, snapped and inset with touch input at 375 px; no admin panel renders by default.

### Step 11. SEO and schema
- Metadata and canonical for every route per `02_PAGE_SPECS.md` section 13. Root-layout schema graph: `Organization` and `HomeAndConstructionBusiness` with `telephone "+91-9473031016"` and the address (postal code only after the owner confirms). `FAQPage`, `Service`, `CreativeWork`, `BreadcrumbList` on their pages. No `Review` or `AggregateRating`.
- `app/sitemap.ts` generated from the data files; `app/robots.ts` allows all and disallows `/api/`; per-group `opengraph-image.tsx` using `OgImage`; themed `not-found.tsx`; print stylesheet.
- Add `/specifications` gated on `lib/spec-schedule.ts` (404 and excluded from the sitemap while empty).
- **Done when:** the sitemap lists every public route and none of the gated or 404 routes; a local parse of the JSON-LD on each page lists the expected types.

### Step 12. Mobile pass
- Run the mobile checklist in `03_DESIGN_SYSTEM.md` section 11 and `02_PAGE_SPECS.md` section 14 on every route at 360×640, 390×844, 412×915 and 768×1024, in both themes.
- Fix horizontal scroll, clipped text, tap targets under 48 px, covered buttons (the `MobileCtaBar` must never hide a submit button or a CTA), layout shift and slow images.
- Run Lighthouse mobile (Slow 4G, 4x CPU slowdown) on `/`, `/guarantee`, `/technology`, `/method`, `/nri`, `/projects`, `/projects/jali-house`, `/book-a-call`, `/calculators/site-feasibility`.
- **Done when:** performance at least 90, accessibility at least 95, LCP at most 2.5 s, CLS at most 0.1 on every listed route.

### Step 13. Verification and hand-back
- Delete `/_kit`.
- Run `npm run verify` and `npm run launch:check`.
- Run axe on every route in both themes: zero serious or critical issues.
- Capture screenshots at 375, 768 and 1440 px in both themes for every route into `docs/rebuild/screenshots/`.
- Grep for `#184A45`, `#C96A40`, `#FAF4EC`, `Cormorant`, `BottomNav`: none may remain.
- Write the verification report in `PROGRESS.md`: command outputs, Lighthouse table, route diff, `form:check` result, list of images marked `missing`, list of every default used for an owner input (`B1` to `B14`), and open issues.
- Stop. Do not push. Wait for the owner.

## 5. Test matrix (Playwright, run on a local build)

| Story | Test |
|---|---|
| S1 | At 375 px, `/` shows the H1, three chips, the primary button and the `MobileCtaBar` in the first viewport |
| S2 | From each route except `/book-a-call`, clicking the header or bar primary lands on `/book-a-call` with `src` set, and `cta_click` fires |
| S3 | `/guarantee` contains "On time, or 10% back." and "15-year warranty" and the words "agreement"; contains no competitor name |
| S4 | The form posts to the baseline endpoint with the baseline field names (run against Formspree test mode or a mocked route) |
| S5 | `/method` stage 06 lists cube tests, rebar scan and LiDAR scan |
| S6 | `/technology` has ten blocks and no "first", "only" or "never seen" |
| S7 | `/nri` lists the eight items and a button to the form |
| S8 | A project page with `placeholder: true` shows `SampleTag`, "Sample figure" and the caption "Illustration" |
| S9 | `/projects/the-clay-house` returns 308 to `/projects` |
| S10 | `/calculators/site-feasibility` shows the coverage notice and a plot-check button |

## 6. Swapping in real content later (owner, after the build)

1. **A real project:** edit its record in `lib/projects-data.ts`: set `placeholder: false`, change `status`, fill facts, set `delivery`, replace metrics with `evidence: "measured"` and a `method`. Drop the real photos in `public/images/projects/` with the same ids, then set `kind: "photo"` and update `alt` and `caption` in `lib/images.ts`. Repeat per project.
2. **The 78% source:** set `source` in `lib/ledger.ts` for `c.market78` (or change `text`). The footnote updates everywhere.
3. **Refund and warranty wording:** change `c.refund` and `c.warranty` text once the contract wording is final.
4. **Going live with samples (your call):** set `ALLOW_SAMPLE_CONTENT=true`. The `SampleTag` and `SampleBanner` stay visible, so visitors can see the content is sample content. Set `NEXT_PUBLIC_SHOW_SAMPLE_BANNER=false` only after every sample is replaced.
5. **Push and deploy:** review `PROGRESS.md`, confirm in writing, then push `rebuild/v2` and deploy a preview before production.
6. **Rollback:** the old site remains on `main`. Revert the deploy to the previous build if anything is wrong.

## 7. Definition of done

- `npm run verify` exits 0 and `npm run launch:check` shows only the expected warnings.
- Every baseline route returns 200 or the specified 308.
- The form is unchanged (`form:check` passes).
- No banned claim or competitor name is present in the built HTML.
- Every page has a header CTA, at least two in-page CTAs and, on phones, the `MobileCtaBar`.
- Both themes are complete on every page, with no flash of the wrong theme.
- Lighthouse mobile and axe thresholds are met.
- `PROGRESS.md` lists every default used and every missing image.

## 8. `PROGRESS.md` template

```
# Build progress
Branch: rebuild/v2   Started: <date>
| Step | Status | Commit | Date | Notes |
|---|---|---|---|---|
| 0 Baseline and freeze | todo | | | |
... one row per step to 13
## Verification output (latest)
## Owner-input defaults used (B1 to B14)
## Images marked missing
## Open issues and conflicts between documents
```
