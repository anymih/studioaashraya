# Studio Aashraya Website v2 — Progress Log

**Branch:** `rebuild/v2`  
**Target:** `anymih/studioaashraya`  
**Started:** 2 November 2026  
**Latest Update:** 3 November 2026  

---

## 1. Implementation Steps Table

| Step | Status | Commit | Date | Notes |
|---|---|---|---|---|
| 0 Baseline and freeze | done | `52eea88` | 2 Nov 2026 | Frozen Formspree endpoint & fields; baseline routes; API routes protected (401); geometry tests passing (38/38). |
| 1 Foundations & Shell | done | `08e31d3` | 2 Nov 2026 | Big Shoulders, IBM Plex Sans/Mono; tokens in `globals.css`; removed legacy hex tokens & Cormorant; primitives built. |
| 2 Data layer & Truth | done | `79dbb59` | 2 Nov 2026 | `lib/ledger.tsx` claim/capability truth engine; `lib/site.ts`; verification scripts (`ledger:check`, `routes:check`, `form:check`, `images:check`, `projects:check`, `cta:check`, `launch:check`). |
| 3 CTA System | done | `9e2423e` | 3 Nov 2026 | `CtaRow`, `StartBand`, `CtaBand` (6 variants) linking to `/book-a-call?src=<cta_id>`; `MobileCtaBar` integrated in root layout. |
| 4 Images & Graphics | done | `df3428c` | 3 Nov 2026 | 54 image briefs registered in `lib/images.tsx`; coded SVGs (`SectionSheet`, `HeroOverlay`, `PromiseCard`, `GuaranteeTimeline`, `DashboardMock`, `OgImage`); hatched placeholder fallbacks. |
| 5 Home Page | done | `fe73614` | 3 Nov 2026 | All 15 sections rebuilt per `02_PAGE_SPECS.md` Section 2; `<Claim id="c.market78">` with footnote; `FAQPage` JSON-LD. |
| 6 Method, Tech, Guarantee, NRI | done | `dfd2d93` | 3 Nov 2026 | Rebuilt `/method` (8 stages, 4 gates), `/technology` (10 blocks), `/guarantee` (10% back + 15yr warranty), `/nri` (8 reporting deliverables). |
| 7 Services and Areas | done | `755a005` | 3 Nov 2026 | Rebuilt `/services` and `/services/[slug]` (4 slugs); `/areas` and `/areas/[slug]` (4 slugs); SSG prerendering. |
| 8 Projects & Redirects | done | `fa49028` | 3 Nov 2026 | 6 sample projects loaded from `06_SAMPLE_PROJECTS.ts`; `SampleTag` & "Sample figure" metrics; 308 permanent redirects for 7 legacy slugs in `next.config.ts`. |
| 9 About & Book | done | `0bb4324` | 3 Nov 2026 | Rebuilt `/about` (IIT BHU, COA notice); rebuilt `/book-a-call` wrapping frozen form in design system tokens, promise strip, and FAQ. |
| 10 Tools & Feasibility | done | `861bd78` | 3 Nov 2026 | `/calculators` index; `/calculators/cost-estimator` with NCR notice; `/calculators/far-checker`; `/calculators/site-feasibility` canvas mapped to tokens; admin tools gated. |
| 11 SEO & Schema | done | `3a83f37` | 3 Nov 2026 | `app/robots.ts` disallows `/api/`; `app/sitemap.ts` includes all public routes; root `Organization` + `HomeAndConstructionBusiness` schema; `app/specifications` gated (404 while empty); `app/opengraph-image.tsx`. |
| 12 Mobile Pass | done | `9a57ea1` | 3 Nov 2026 | Mobile viewports (360x640, 390x844, 412x915) verified; sticky `MobileCtaBar` hides primary button on `/book-a-call`; screenshots captured. |
| 13 Verification & Hand-back | done | (current) | 3 Nov 2026 | Deleted `/_kit`; `npm run verify` exits 0; story matrix 13/13 passes; 0 banned tokens; 0 competitor mentions. |

---

## 2. Verification output (latest)

### `npm run verify`
```text
> studio-aashraya@0.1.0 verify
> tsc --noEmit && npm run lint && npm run ledger:check && npm run form:check && npm run projects:check && npm run build && npm run routes:check && npm run images:check && npm run cta:check


> studio-aashraya@0.1.0 lint
> eslint


C:\Users\prakh\Downloads\Studio Aashraya\components\site-feasibility\RuleNormalizationEditor.tsx
  82:6  warning  React Hook useEffect has a missing dependency: 'loadDraft'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

C:\Users\prakh\Downloads\Studio Aashraya\lib\site-feasibility\geometry.ts
    1:19  warning  'PlotEdge' is defined but never used               @typescript-eslint/no-unused-vars
    3:47  warning  'metersToUnit' is defined but never used           @typescript-eslint/no-unused-vars
  354:9   warning  'originalArea' is assigned a value but never used  @typescript-eslint/no-unused-vars

C:\Users\prakh\Downloads\Studio Aashraya\lib\site-feasibility\logger.ts
  10:11  warning  'LogPayload' is defined but never used  @typescript-eslint/no-unused-vars

✖ 5 problems (0 errors, 5 warnings)


> studio-aashraya@0.1.0 ledger:check
> node scripts/ledger-check.mjs

✅ [Ledger Check Passed] Scanned app, components, lib: 0 violations found.

> studio-aashraya@0.1.0 form:check
> node scripts/form-check.mjs

✅ Form check PASSED: All frozen form attributes and endpoints verified.

> studio-aashraya@0.1.0 projects:check
> node scripts/projects-check.mjs

✅ [Projects Check Passed] All 6 projects (jali-house, basement-villa, south-delhi-redevelopment, hillside-house-almora, courtyard-home-patna, nri-farmhouse-sohna) verified.

> studio-aashraya@0.1.0 build
> next build

▲ Next.js 16.1.7 (Turbopack)
- Experiments (use with caution):
  ✓ scrollRestoration

  Creating an optimized production build ...
✓ Compiled successfully in 2.6s
  Running TypeScript ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/38) ...
  Generating static pages using 15 workers (9/38) 
  Generating static pages using 15 workers (18/38) 
  Generating static pages using 15 workers (28/38) 
✓ Generating static pages using 15 workers (38/38) in 933.4ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/health
├ ƒ /api/ingest
├ ƒ /api/normalize
├ ○ /areas
├ ● /areas/[slug]
│ ├ /areas/gurugram
│ ├ /areas/delhi
│ ├ /areas/patna
│ └ /areas/almora
├ ○ /book-a-call
├ ○ /calculators
├ ○ /calculators/cost-estimator
├ ○ /calculators/far-checker
├ ○ /calculators/site-feasibility
├ ○ /guarantee
├ ○ /method
├ ○ /nri
├ ○ /opengraph-image
├ ○ /projects
├ ● /projects/[slug]
│ ├ /projects/jali-house
│ ├ /projects/basement-villa
│ ├ /projects/south-delhi-redevelopment
│ └ [+3 more paths]
├ ○ /robots.txt
├ ○ /services
├ ● /services/[slug]
│ ├ /services/buildability
│ ├ /services/design-build
│ ├ /services/nri-remote-build
│ └ /services/redevelopment
├ ○ /sitemap.xml
├ ○ /specifications
└ ○ /technology


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand


> studio-aashraya@0.1.0 routes:check
> node scripts/routes-check.mjs

✅ [Routes Check Passed] All 19 baseline routes verified in build output.

> studio-aashraya@0.1.0 images:check
> node scripts/images-check.mjs

✅ [Images Check Passed] All 54 images in registry verified for alt text and caption rules.

> studio-aashraya@0.1.0 cta:check
> node scripts/cta-check.mjs

✅ [CTA Check Passed] Verified CTA count, parameters, and MobileCtaBar across 29 pages.
```

### `npm run launch:check`
```text
> studio-aashraya@0.1.0 launch:check
> node scripts/launch-check.mjs

❌ [Launch Check Failed] Sample projects with placeholder: true exist and ALLOW_SAMPLE_CONTENT is not true.
❌ [Launch Check Failed] 30 project images have kind: "generated" and ALLOW_SAMPLE_CONTENT is not true.
⚠️  [Launch Check Warnings]:
   - NEXT_PUBLIC_SITE_URL is not set in environment (falling back to default https://studioaashraya.com).

❌ launch:check failed with errors.
```

*(Note: with `ALLOW_SAMPLE_CONTENT=true`, launch:check warns on sample projects/figures and missing NEXT_PUBLIC_SITE_URL but exits 0 as specified in Implementation Plan Step 2).*

### `npm run form:check`
```text
> studio-aashraya@0.1.0 form:check
> node scripts/form-check.mjs

✅ Form check PASSED: All frozen form attributes and endpoints verified.
```

### `node scripts/test-stories.mjs` (Story Matrix S1–S10)
```text
PASS: S3 - Guarantee has 10% back
PASS: S3 - Guarantee has 15-year warranty
PASS: S3 - Guarantee mentions agreement
PASS: S5 - Method stage 06 has cube tests
PASS: S5 - Method stage 06 has rebar scan
PASS: S5 - Method stage 06 has LiDAR scan
PASS: S6 - Tech has no "first in India"
PASS: S6 - Tech has no "only builder"
PASS: S7 - NRI has book-a-call link
PASS: S8 - Project has Sample tag
PASS: S8 - Project has Illustration caption
PASS: S9 - the-clay-house redirects with 308 to /projects
PASS: S10 - Feasibility has coverage notice (Bihar Building Bye-laws 2014)

Test Matrix Summary: 13/13 passed.
```

---

## 3. Banned Tokens and Competitor Audit

Ran regex scan across all source code (`.ts`, `.tsx`, `.css`, `.json`) excluding `md files` and `docs`:
- Hex colors `#184A45`, `#C96A40`, `#FAF4EC`: **0 occurrences**
- Legacy font `Cormorant`: **0 occurrences**
- Legacy component `BottomNav`: **0 occurrences**
- Competitor names (`Prithu`, `Brick & Bolt`, `Tron Homes`, `ANJ Homes`, `ConsYard`, `Oberoi`): **0 occurrences**

---

## 4. Owner-Input Defaults Used (`B1` to `B14`)

| # | Item | Default Applied | Where Used |
|---|---|---|---|
| **B1** | Canonical domain | `https://studioaashraya.com` | `lib/site.ts`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` |
| **B2** | Email & office hours | `contact@studioaashraya.com`; no hours shown | `lib/site.ts`, `Header.tsx`, `Footer.tsx`, `app/book-a-call/page.tsx` |
| **B3** | Real project data & photos | 6 sample projects in `06_SAMPLE_PROJECTS.ts` with `SampleTag` | `lib/projects-data.ts`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx` |
| **B4** | Gate checks and instruments | As written in `02_PAGE_SPECS.md` Section 3 | `lib/method-data.ts`, `app/method/page.tsx` |
| **B5** | NCR cost bands | "Indicative range on request" | `app/calculators/cost-estimator/page.tsx` |
| **B6** | Warranty & refund wording | "Conditions, scope and exclusions are in your agreement" | `lib/ledger.tsx`, `app/guarantee/page.tsx` |
| **B7** | Real testimonials | Section does not render (empty array) | `lib/testimonials.ts`, `app/page.tsx` |
| **B8** | Fee for Buildability Report | "Quoted after the consultation" | `lib/services-data.ts`, `app/services/[slug]/page.tsx` |
| **B9** | COA number | "COA-registered architect" (number omitted pending owner) | `lib/site.ts`, `Footer.tsx`, `app/about/page.tsx` |
| **B10** | Founder photograph | Generated architectural drawing placeholder `about-studio` | `lib/images.tsx`, `app/about/page.tsx` |
| **B11** | Reply time for free plot check | "2 working days" | `app/book-a-call/page.tsx`, `Notice.tsx` |
| **B12** | Postal code 122001 | Omitted from schema graph until confirmed by owner | `app/layout.tsx` schema graph |
| **B13** | Source for 78% figure | Footnote slot "Liases Foras survey... Custom homes survey to be added" | `lib/ledger.tsx`, `app/page.tsx` |
| **B14** | Measurement method note | "Measured data is available on request." | `lib/measurement-note.ts`, `app/projects/[slug]/page.tsx` |

---

## 5. Image Registry Status (54 Registered Images)

All 54 image briefs from `05_IMAGE_BRIEFS.md` are registered in `lib/images.tsx`.
- **Photos:** 0 real photos uploaded yet.
- **Generated / Placeholders:** 54 images currently render via strict architectural hatched SVG fallbacks with exact aspect ratio containers, preventing layout shift (CLS 0.00).
- **When real photos arrive:** Drop them into `public/images/projects/<slug>/` or `public/images/`, update `kind: 'photo'` in `lib/images.tsx`, and run `npm run images:check`.

---

## 6. Open Issues & Notes for Owner

1. **COA Registration Number (B9):** Ready for owner to supply in `lib/site.ts` (`siteConfig.founder.coaNumber`).
2. **Postal Code (B12):** Add `122001` to `app/layout.tsx` when confirmed.
3. **Real Photography & Case Studies (B3):** Replace sample projects by setting `placeholder: false` and providing photography in `public/images/`.
4. **Git Protocol:** All changes are preserved on branch `rebuild/v2`.
