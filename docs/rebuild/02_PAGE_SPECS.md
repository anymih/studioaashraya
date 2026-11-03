# Studio Aashraya Website v2: Page Specifications (Revision 2)

Every string is final copy unless marked `[DATA]`. Components come from `03_DESIGN_SYSTEM.md`. Claims, guarantees and capabilities render through `lib/ledger.ts`. Contact details come from `lib/site.ts`. Image ids are defined in `05_IMAGE_BRIEFS.md`. Sample projects are defined in `06_SAMPLE_PROJECTS.ts`.

`lib/site.ts` constants:
- phone display `+91 94730 31016`, tel `+919473031016`
- WhatsApp `https://wa.me/919473031016?text=Hi%20Studio%20Aashraya%2C%20I%20would%20like%20a%20free%20plot%20check.`
- address `C93, Old DLF Colony, Sector 14, Gurugram`
- maps `https://www.google.com/maps/search/?api=1&query=C93+Old+DLF+Colony+Sector+14+Gurugram`
- email `studioaashraya@gmail.com`
- form route `/book-a-call`

---

## 1. Global shell and CTA system

**Routes preserved (200):** `/`, `/about`, `/book-a-call`, `/projects`, `/calculators/cost-estimator`, `/calculators/far-checker`, `/calculators/site-feasibility`, `/api/health`, `/api/ingest`, `/api/normalize`, `/robots.txt`, `/sitemap.xml`.
**Redirected (308 → `/projects`):** `/projects/the-clay-house`, `/projects/the-veranda-villa`, `/projects/aashraya-farmstead`, `/projects/vidya-learning-center`, `/projects/heritage-library-bhagalpur`, `/projects/zero-carbon-pavilion`, `/projects/codename-madhuban`. Configure in `next.config`.
**New routes:** `/method`, `/technology`, `/guarantee`, `/nri`, `/services`, `/services/[slug]` (`buildability`, `design-build`, `nri-remote-build`, `redevelopment`), `/areas`, `/areas/[slug]` (`gurugram`, `delhi`, `patna`, `almora`), `/calculators`, `/projects/[slug]` (six sample slugs), `/specifications` (gated; 404 until `lib/spec-schedule.ts` has live rows).

**Header (desktop):** wordmark · Technology · Method · Homes · Guarantee · NRI clients · About · Tools · phone link `+91 94730 31016` · Theme · button `Book a consultation`.
**Header (mobile, under 900 px):** wordmark · Theme button · 44 px Menu button. The menu opens a full-screen sheet with 56 px rows and three buttons at the bottom: Call, WhatsApp, `Start your project`.

**`MobileCtaBar` (under 900 px; replaces the old bottom navigation, so delete `components/ui/BottomNav.tsx`):** three buttons, 56 px high: `Call` (25%), `WhatsApp` (25%), `Start your project` (50%, accent fill). Hides while a field has focus. On `/book-a-call` the third button is hidden.

**CtaBand variants** (shown as `CtaRow` mid-page and as `StartBand` when closing the page; all primary buttons go to `/book-a-call?src=<cta_id>`; secondary links are Call and WhatsApp):

| Variant | Headline | Body | Button |
|---|---|---|---|
| `plot-check` | Get a free plot check. | Send your plot details. We reply in writing with setbacks, coverage, FAR and the main risks, within 2 working days. | Get my plot check |
| `guarantee` | On time, or 10% back. | Your handover date goes into the agreement. Put us to it. | Start my project |
| `nri` | Building from abroad? | Book a call in your time zone. | Book my call |
| `tech` | See the instruments on your own plot. | BIM, scans, lab tests and a live dashboard, applied to your build. | Book a consultation |
| `projects` | Want a home like this on your plot? | Tell us the plot. We tell you what it can hold. | Get my plot check |
| `old-house` | Own an old house? | We survey it first, then price your options to retain, strengthen or rebuild. | Book a survey call |

**CTA map (minimum placements per page; ids become `src` values):**

| Page | Placements |
|---|---|
| Home | header, `hero-primary`, `hero-call`, `door-plot`, `door-abroad`, `door-old`, `home-after-problem`, `home-guarantee`, `home-tech`, `home-projects`, `home-nri`, `home-final`, sticky bar |
| Method | `method-top`, `method-mid`, `method-end` |
| Technology | `tech-top`, `tech-mid`, `tech-end` |
| Guarantee | `guarantee-top`, `guarantee-mid`, `guarantee-end` |
| NRI | `nri-top`, `nri-mid`, `nri-end` |
| Services (each) | `svc-<slug>-top`, `svc-<slug>-end` |
| Projects list | `projects-top`, `projects-end` |
| Project detail | `project-<slug>-mid`, `project-<slug>-end` |
| Areas (each) | `area-<slug>-top`, `area-<slug>-end` |
| About | `about-mid`, `about-end` |
| Tools (each) | `tool-<name>-top`, `tool-<name>-result` |
| Book | the form itself, plus Call and WhatsApp |

**Footer:** wordmark and line · Services · Areas · Technology and Guarantee links · contact block (phone, WhatsApp, email, address with directions link) · a `plot-check` CtaBand above the footer on every page except `/book-a-call` · bottom line: "COA-registered architect · © 2026 Studio Aashraya". Keep the Patna office line from the old footer as a secondary entry.

---

## 2. Home `/`

**Job:** get a mobile visitor to the form. Order of persuasion: promise, proof, entry doors, the problem, the guarantee, the instruments, the method, the work, the offer.

**2.1 Hero**
- Eyebrow: `Architect and builder · Gurugram, Delhi NCR`
- H1: `Build a home that is beautiful, <em>engineered</em>, and built to last.`
- Lead: `IIT-led architecture and construction in Gurugram and Delhi NCR. Every home handed over on time. A 15-year warranty. If we ever miss your handover date, we pay you back 10% of the construction amount.`
- Promise chips (3): `On time, or 10% back` · `15-year warranty` · `IIT-led · COA-registered`
- Buttons: primary `Get a free plot check` (`hero-primary`); secondary `Call +91 94730 31016` (`tel:`, `hero-call`).
- Figure: `hero-home` with the `HeroOverlay` drawing layer, in a sheet frame with title block (Studio · Aashraya / View · Illustration / Rule · Check first, then pour).
- Mobile: H1, chips, primary button and the sticky bar fit in the first screen. The image sits below the buttons.

**2.2 Proof bar** (ink band; mobile 2 by 2 plus one full-width cell)
`30+` homes built · `50+` projects designed · `Every home` handed over on time · `15 years` warranty · `10%` back if we are late.

**2.3 Start here (three doors).** Eyebrow `Start here`. H2 `Where are you starting from?`
- Door 1 `svc-buildability`: `I own a plot.` `Find out what it can hold and what it will cost to build well.` Button `Check my plot` (`door-plot`).
- Door 2 `nri-hero`: `I live abroad.` `Build in India with weekly video, scans and a live dashboard.` Button `Plan from abroad` (`door-abroad`).
- Door 3 `svc-redevelopment`: `I have an old house.` `We survey it, then price retain, strengthen and rebuild.` Button `Survey my house` (`door-old`).
- Mobile: horizontal swipe cards, 82% width, with the next card visible.

**2.4 The problem and the 78% line**
- Eyebrow `The risk`
- Image: `home-problem` (damp-stained wall below a terrace slab).
- H2: `78% of homes miss their deadline or leak. We hand over on time, or we pay you.`
- Footnote (mono, from ledger `c.market78.source`; shows "Source: to be added" until supplied).
- Body: `A home fails at the basement, the terrace, the façade, the plumbing line or the structural junction. Clients usually find out after the money is spent and the decision cannot be undone.`
- Comparison table `What often happens` / `What we do` (mobile: stacked rows):
  1. The handover date is a promise. / The handover date is in the agreement, backed by a 10% refund.
  2. Warranty terms are explained after you pay. / A 15-year warranty, with scope and exclusions written before you sign.
  3. Drawings clash on site. / BIM clash detection resolves them before any pour.
  4. Concrete quality is assumed. / Every pour is lab-tested and the certificates are filed.
  5. You get photographs in a chat group. / You get 360° scans, dated records and a live dashboard.
  6. Waterproofing is a product purchase. / Waterproofing is specified, laid and flood-tested.
- CtaBand `plot-check` (`home-after-problem`).

**2.5 The guarantee** (dark band)
- `PromiseCard`: `10%` and `15 years`.
- H2: `On time, or 10% back.`
- Body: `Before work starts, your agreement fixes a handover date. If we miss it, we refund 10% of the total construction amount. Every home we have built has been handed over on time, so this has never been needed. It is there so you do not have to take our word for it.`
- Line: `Conditions are in your agreement.`
- Buttons: primary `Start my project` (`home-guarantee`); link `Read the full guarantee` → `/guarantee`.
- Coded graphic: `GuaranteeTimeline`.

**2.6 Technology wall**
- Eyebrow `Technology`; H2 `Built with instruments, not opinions.`
- Lead: `Most of what goes wrong in a house is hidden behind plaster by the time anyone looks. We measure it before it is covered.`
- Eight `TechTile`s (title, one line, mono tag with the stage where it is used), linking to `/technology#<id>`:
  1. BIM clash detection: `Structure, ducts and pipes checked against each other before the pour.`
  2. Climate simulation: `Sun, heat gain and daylight modelled before the façade is fixed.`
  3. 360° LiDAR scans: `Each gate scanned and compared with the model.`
  4. Drone audits: `Roof, terrace and façade photographed from above, on schedule.`
  5. Lab-tested concrete: `Cube samples from every pour, tested at NABL-accredited labs.`
  6. Pulse velocity and rebar scans: `Cast elements checked without breaking them.`
  7. Flood-tested waterproofing: `Water stands on it before anything covers it.`
  8. Live dashboard: `Schedule, gates, cost, photos, scans and decisions in one place.`
- Buttons: `See all the technology` → `/technology`; CtaBand `tech` (`home-tech`).
- Mobile: tiles swipe horizontally.

**2.7 Method teaser** (`SectionSheet` drawing and eight condensed stages)
- H2: `Nothing is poured, closed or covered until the last stage is checked.` Link `Read the full method` → `/method`.

**2.8 Work**
- H2 `Homes built, not rendered.` Count: `30+ built · 50+ designed`.
- Three featured sample `ProjectCard`s (`built` first). While samples are in use, each shows the `SampleTag` (`Sample project`).
- Buttons: `See all projects` → `/projects`; CtaBand `projects` (`home-projects`).

**2.9 Warranty block**
- H2: `15 years. In writing.` Body: `Your home comes with a 15-year warranty from handover. Scope, exclusions and how to make a claim are written into your agreement before you sign.` Link `Read the warranty section` → `/guarantee#warranty`. Coded graphic: `PromiseCard` (15 years).

**2.10 NRI strip** (`nri-hero`)
- H2: `Abroad? You still see everything.` Body: `Weekly video walkthroughs, 360° scans at every gate, a live dashboard and a written decision log. Payments follow passed gates.` CtaBand `nri` (`home-nri`).

**2.11 Services** (four cards, each with a button)
1. `Free plot check` card: `A written note on your plot: setbacks, coverage, FAR and the main risks.` Button `Get my plot check`.
2. `Design and build`: `One agreement for design, structure, approvals, construction and interiors.` → `/services/design-build`.
3. `NRI remote build`: `A reporting system built so you do not need to be on site.` → `/services/nri-remote-build`.
4. `Redevelopment`: `Old houses, tight plots, basements, farmhouses.` → `/services/redevelopment`.

**2.12 Tools banner**
- H2 `Draw your plot. See the buildable area.` Body: `The feasibility tool draws setbacks and the buildable footprint from the Bihar Building Bye-laws 2014. For plots in Gurugram and Delhi, we run the check by hand and send it to you.` Buttons: `Try the tool` → `/calculators/site-feasibility`; `Get a free plot check`.

**2.13 Areas** (three columns with images `area-gurugram`, `area-patna`, `area-almora`): Delhi NCR (focus) · Bihar · Uttarakhand, each linking to its area page.

**2.14 FAQ** (data in `lib/faq-data.ts`, also FAQPage JSON-LD)
1. *What is a free plot check?* You send your plot details through the form. Within 2 working days you get a written note with setbacks, coverage, FAR and the main risks for your plot.
2. *What does it cost to build with you?* Cost depends on the plot, the floors, the structure, the basement and the finish. We quote after the consultation. Every quote comes with a bill of quantities so you can see how the figure is built up.
3. *What does on time, or 10% back mean?* Your agreement fixes a handover date. If we miss it, we refund 10% of the total construction amount. The conditions are written in the agreement.
4. *What does the 15-year warranty cover?* The scope, the exclusions and the claim process are written into your agreement before you sign. Ask about them in your consultation.
5. *Who is responsible if something goes wrong?* The studio. The architect who draws the house also builds it, so drawings, quantities and the work on site sit under one agreement.
6. *Which instruments will you use on my project?* The instruments for your project are listed in your agreement. They typically include BIM coordination, simulation, scans at each gate, lab-tested concrete and flood-tested waterproofing.
7. *Can I manage the build from abroad?* Yes. See the NRI page for the weekly video, scans, dashboard and decision log.
8. *Which areas do you build in?* New plots in Gurugram and across Delhi NCR. We have also built in Bihar and Uttarakhand.
9. *Do you handle approvals?* Yes. We prepare sanction drawings and follow them through with the authority that governs your plot.

**2.15 Final CTA** (`home-final`): H2 `Send us your plot.` Body `We reply in writing within 2 working days.` Buttons `Get my free plot check`, `Call +91 94730 31016`, `WhatsApp us`. Address with `Get directions` link.

---

## 3. Method `/method`

- Eyebrow `Method`; H1 `Eight stages. Four gates.` Lead: `A gate is a written check by the architect, with instruments. Work on the next stage does not start until the gate record is signed. Clients abroad receive each gate record with photographs, a 360° scan and a walkthrough.`
- `SectionSheet` drawing, with the gate images `gate-foundation`, `gate-structure`, `gate-waterproofing` and `gate-finishes` beside gates 1 to 4. CtaBand `method-top`.
- Stage list on the dark band. Each stage expands to **What we do / What you receive / Checks and instruments**. `method_stage_open` fires.

| # | Stage | What we do | What you receive | Checks and instruments |
|---|---|---|---|---|
| 01 | Plot review | Meet, walk the plot, record the brief, budget range, timeline and who decides. | Written plot review: dimensions, roads, setbacks, coverage, FAR, approval route. | none |
| 02 | Buildability | Test the brief against the plot: basement, soil risk, drainage, sun path, privacy, services routing. Run solar and heat-gain simulation. | Buildability summary, main risks, indicative cost and timeline range. | Climate simulation |
| 03 | Design and quantities | Concept, façade, plans, sections, structural coordination, specification. Model the building in BIM and run clash detection. | Drawing set, clash report, specification schedule, bill of quantities, agreement with handover date, scope, payment schedule. | BIM clash detection |
| 04 | Approvals | Prepare sanction drawings and follow them through with the authority. | Sanctioned plans and a query log. | none |
| 05 | Foundation (Gate 1) | Excavation, reinforcement, first pour. | Gate 1 record, photographs, 360° scan, dashboard update. | Excavation level and soil at founding level · Reinforcement against the bar schedule · Cover and spacers · Concrete mix confirmed and cube samples taken · 360° LiDAR scan compared with the model |
| 06 | Structure (Gate 2) | Columns, beams, slabs, floor by floor. | Gate 2 record for each pour. | Reinforcement before every pour · Shuttering levels · Conduit and sleeve positions against the BIM model · Cube tests at NABL-accredited labs · Ultrasonic pulse velocity testing and rebar scanning on cured elements · 360° scan · Drone audit |
| 07 | Services and waterproofing (Gate 3) | Electrical, plumbing, drainage and waterproofing before walls close. | Gate 3 record with test results. | Conduit and pipe positions against the model · Pressure and drainage checks · Waterproofing laid to specification and flood-tested · 360° scan before walls close |
| 08 | Finishes and handover (Gate 4) | Joinery, tiling, paint, fittings, interiors. | Gate 4 record, closed snag list, as-built drawings, test records, warranty terms. | Finishes checked room by room against drawings · Snag list closed · Handover file complete · Final 360° scan archived |

- **What you can verify** (list): gate records · cube test certificates per pour · scans · clash report · bill of quantities · specification schedule · as-built drawings · decision log.
- `GateRecord` sample panel, caption "Sample format".
- CtaBands `method-mid` (after stage 04) and `method-end` (`plot-check`).
- Schema: BreadcrumbList.

---

## 4. Technology `/technology`

- Eyebrow `Technology`; H1 `Built with instruments, not opinions.`
- Lead: `Every technology below has a job: catch a specific failure before it is covered. The instruments for your project are listed in your agreement.`
- CtaBand `tech-top`.
- Each block (id for anchors, expandable on mobile): title, `What it is`, `What it catches`, `What you receive`, `Used at`. Image or graphic per block. `tech_block_open` fires.

| id | Title | What it is | What it catches | What you receive | Used at | Visual |
|---|---|---|---|---|---|---|
| bim-clash | BIM clash detection | The building is modelled in 3D with structure, ducts, pipes and conduits, and the model is checked for conflicts. | Beams cutting duct routes, missing sleeves, lost ceiling height. | Clash report and coordinated drawings. | Stage 03, before Gate 2 | `tech-bim` |
| thermal-sim | Climate simulation | Sun path, heat gain through walls and glass, and daylight are modelled for your plot and orientation. | West-facing heat gain, glare, dark rooms. | A summary of the façade and shading decisions the model led to. | Stages 02 and 03 | `tech-thermal` |
| structural-seismic | Seismic structural analysis | The frame is analysed for lateral load under the seismic provisions that apply to Delhi NCR, which lies in Seismic Zone IV. | Slender or irregular frames and weak load paths. | A structural analysis summary and the design basis. | Stage 03 | `tech-structural` |
| lidar-twin | 360° LiDAR scans | The site is scanned at each gate and the scan is compared with the BIM model. | Positions off the drawing, level errors, missing elements before they are covered. | A scan walkthrough link and deviation notes for each gate. | Every gate | `tech-lidar` |
| drone-audit | Drone audits | Aerial photographs and video of the plot, roof, terrace and façade on a fixed schedule. | Progress gaps, roof and terrace defects, site-condition issues. | A dated aerial set. | During structure and finishes | `svc-buildability` |
| concrete-testing | Lab-tested concrete | Cube samples taken at every pour and tested at NABL-accredited labs. | Concrete below the specified grade. | Lab certificates filed per pour. | Gate 2 | `tech-concrete` |
| pulse-velocity | Pulse velocity testing | Non-destructive ultrasonic check of concrete quality in cured elements. | Voids and weak concrete without breaking anything. | Readings per element tested. | After curing, structure stage | `tech-concrete` |
| rebar-scan | Rebar scanning | A scanner reads reinforcement spacing and cover inside cast elements. | Bars at the wrong spacing or cover. | Scan images with measured spacing and cover. | Structure stage | `tech-rebar` |
| flood-test | Flood-tested waterproofing | Waterproofed areas are flooded and monitored before anything covers them. | Leaks, before finishes hide them. | Dated photographs and a signed result. | Gate 3 | `tech-flood` |
| dashboard-cpm | Live dashboard | One place for schedule, gate status, cost against the bill of quantities, photographs, scans and decisions. | Surprises. | A client login. | Whole build | `DashboardMock` (sample data) |

- **Scheduling:** `We plan the build on a critical path schedule. The schedule is reported against the handover date in your agreement.`
- **Measurement** (`#measurement`): `Indoor temperature and energy use are measured on our projects and compared with the design-stage simulation. ` + `lib/measurement-note.ts` text (default "Measured data is available on request."). Show `c.thermal` and `c.energy` with the EvidenceLabel.
- **Structure and soil:** `Delhi NCR lies in Seismic Zone IV. Soil and water-table conditions vary between localities, so we recommend a soil investigation before the structure is fixed.`
- CtaBands `tech-mid` (after the third block) and `tech-end` (`plot-check`).
- Schema: BreadcrumbList.

---

## 5. Guarantee and warranty `/guarantee`

- Eyebrow `Guarantee`; H1 `On time, or 10% back.` Lead: `Before work starts, your agreement fixes a handover date. If we miss it, we refund 10% of the total construction amount.`
- `PromiseCard` (10% and 15 years) and `GuaranteeTimeline`. CtaBand `guarantee-top`.
- **Track record:** `Every home we have built has been handed over on time. This refund has never been needed.`
- **How it works** (numbered, true sequence): 1. The handover date is fixed in your agreement. 2. We report progress against it every week on the dashboard. 3. If the date passes, the refund is paid as set out in the agreement.
- **What the agreement states:** the handover date; the conditions that can move it, such as changes you request or delays by the authority; and how the refund is paid. `[Owner to confirm the conditions with a lawyer before the first contract.]`
- **Warranty** (`#warranty`): H2 `15-year warranty.` Body: `Your home comes with a 15-year warranty from handover. Scope, exclusions and how to make a claim are written into your agreement before you sign. Ask us about the terms in your consultation.`
- **Why we can offer both** (list): one accountable team; gate records at four stages; instruments that measure instead of assume; a dashboard that reports against the handover date.
- FAQ: *What counts as on time?* The handover date in your agreement. *Can the date change?* Only for the conditions the agreement states. *How is the refund paid?* As set out in the agreement. *What does the warranty cover?* Scope and exclusions are in the agreement.
- CtaBands `guarantee-mid` (`guarantee`) and `guarantee-end` (`plot-check`).
- Schema: FAQPage, BreadcrumbList.

---

## 6. NRI `/nri`

- Eyebrow `For NRI families`; H1 `Build in India without flying in for every decision.` Lead: `You should be able to see your house from wherever you are. This is how.`
- Image `nri-hero`. CtaBand `nri-top` (`nri`).
- **What you receive:**
  1. A named architect as your single point of contact.
  2. A weekly video walkthrough of the site.
  3. 360° scans at every gate, compared with the model.
  4. A live dashboard: schedule, gate status, cost against the bill of quantities, photographs and scans.
  5. A dated photo and video archive, organised by stage.
  6. A written decision log. Every approval you give is recorded.
  7. Payments linked to stages that have passed their gate.
  8. Calls scheduled for your time zone.
- **Reporting rhythm** (table): Weekly: video walkthrough, archive update, open decisions. At each gate: gate record, scan, walkthrough. Monthly: cost to date against the bill of quantities and progress against the handover date. At handover: handover file.
- **Before you start:** `A power of attorney or an authorised representative, if you will not sign in person.` `Your lawyer and tax advisor, for title, transfer and remittance questions. We coordinate with them and do not give legal or tax advice.`
- **Backed by the guarantee:** `On time, or 10% back, and a 15-year warranty.` Link `/guarantee`.
- FAQ: *Can I approve designs remotely?* Yes, by video review and written approval, recorded in the decision log. *What if I want to visit?* We plan visits around gates so you see work before it is covered. *Who signs on site?* The studio's architect signs each gate record.
- CtaBands `nri-mid` and `nri-end` (`nri`).

---

## 7. Services

`/services`: H1 `One studio. Complete responsibility.` Lead `Four ways to work with Studio Aashraya. Most clients begin with a free plot check.` Four cards as in 2.11, each with a button. Data in `lib/services-data.ts`.

**Free plot check and Land and Buildability Report** (`/services/buildability`)
- Lead: `Know what your plot allows before you commit to a design.`
- Step 1, the free plot check: `Send your plot details through the form. Within 2 working days you receive a written note: setbacks, coverage, FAR and the main risks.`
- Step 2, the Buildability Consultation: `A structured call about your brief, budget range and timeline.`
- Step 3, the Land and Buildability Report (paid, fee quoted after the consultation): permissible development under the applicable code · basement and structural risk notes with a recommended soil investigation · climate simulation summary · approval route and expected queries · indicative cost and timeline range · recommended approach.
- Buttons `Get my plot check` (`svc-buildability-top`, `svc-buildability-end`).

**Design and build** (`/services/design-build`)
- Lead: `One agreement for design, structure, approvals, construction and interiors.`
- Receive: bespoke design · BIM-coordinated drawings · specification schedule and bill of quantities · sanction drawings · construction with four instrumented gates · interiors planned with the structure · handover file · 15-year warranty · on-time guarantee.
- How it runs: 1 Design and quantities. 2 Agreement with handover date. 3 Approvals. 4 Construction with gates. 5 Handover.
- Note: `Changes you ask for are priced against the bill of quantities before work begins.`

**NRI remote build** (`/services/nri-remote-build`): summary of section 6 with a link to `/nri`.

**Redevelopment and difficult sites** (`/services/redevelopment`)
- Lead: `Old houses, tight plots, basements, farmhouses and structurally complex projects.`
- `We start with a condition survey of the existing structure. Then we decide with you whether to retain, strengthen or rebuild, and we price each option.`
- Receive: condition survey note · retain, strengthen or rebuild options with cost ranges · demolition and shoring approach where relevant · the same stages, gates and guarantee as a new build. Image `svc-redevelopment`. CtaBand `old-house`.

Schema: `Service` on each page; FAQPage where FAQs exist.

---

## 8. Projects

**8.1 `/projects`**
- H1 `Homes built, not rendered.` Count block `30+ built · 50+ designed`. CtaBand `projects-top` (`projects`).
- Filters (button groups with `aria-pressed`): City, Type, Status, derived from data. They combine. State in the URL hash with letters and hyphens only. On mobile the filters are a horizontal scroll row.
- Grid of `ProjectCard`s. Empty state: `No projects match these filters.` with `Clear filters`.
- While `placeholder` is true, each card shows the `SampleTag` (`Sample project`).
- CtaBand `projects-end` (`plot-check`).

**8.2 `/projects/[slug]`** (six sample slugs from `06_SAMPLE_PROJECTS.ts`)
Order: breadcrumb · H1, `StatusBadge`, sample chip · title-block metrics (Plot, Built-up, Floors, Climate zone, Year, City) · cover image · narrative (Problem, Approach, Solution) · CtaBand `project-<slug>-mid` · strategies · **Technology used** (tags linking to `/technology#<id>`) · **Handover record** (agreed date, actual date, result) · performance metrics with EvidenceLabel (`Sample figure` for samples) · materials · gallery · plan sheet · previous and next · CtaBand `project-<slug>-end` (`projects`).
Data model: the `Project` type in `06_SAMPLE_PROJECTS.ts` (copy into `lib/projects-data.ts`). Images are referenced by id: `proj-<key>-cover`, `-g1`, `-g2`, `-g3`, `-plan`. The handover record shows `delivery.agreed` and `delivery.delivered`, with the result `On time` when delivered is not later than agreed, otherwise `Late`. For a project not yet delivered it shows the agreed date and `In progress`. Validation: `built` requires `year` and `delivery.delivered`; every metric has `evidence`; `placeholder: true` forces the `SampleTag` and `Sample figure` labels. Technology tags come from `TechId` and link to `/technology#<id>`.

---

## 9. Areas

`/areas` index (Delhi NCR first). Data in `lib/areas-data.ts`. Every area page has `area-<slug>-top` and `area-<slug>-end` CtaBands (`plot-check`) and a "Work to see" row.

**Gurugram `/areas/gurugram`** (`area-gurugram`)
- H1 `Architect and builder in Gurugram`
- Lead: `Studio Aashraya designs and builds private homes on plots in Gurugram, from our office in Old DLF Colony, Sector 14. One agreement covers plot review, design, engineering, approvals and construction.`
- `Plots we assess`: `Plots in established phases and new sectors, farmhouse land, and plots with legacy structures.`
- `What is specific here`: `Sanction routes depend on the sector and the authority that governs it. We confirm the authority and the applicable code for your plot, then check setbacks, coverage, FAR, parking and height before any design work. Summers are hot and winters carry smog, so we treat shading, the building envelope and indoor air as engineering questions. Soil and water-table conditions vary between localities, so we recommend a soil investigation before the structure is fixed.`
- Contact card: address, directions link, phone.

**Delhi `/areas/delhi`** (`area-delhi`): H1 `Architect and builder in Delhi`. Lead `Private homes, legacy houses and redevelopments in Delhi, designed and built by one team.` Sections: `Legacy houses and redevelopment` (`We start with a condition survey, then price the options to retain, strengthen or rebuild.`) · `Tight plots` (`Setbacks, light and privacy decide what a small plot can hold, so we test them before design.`). CtaBand `old-house`.

**Patna and Bihar `/areas/patna`** (`area-patna`): H1 `Architect and builder in Patna and Bihar`. Lead `The studio began here. Climate-responsive homes with courtyards, shaded verandas and brick screens, now with construction under the same roof.` Section `Tools for Bihar plots` linking to the three tools.

**Almora and Uttarakhand `/areas/almora`** (`area-almora`): H1 `Architect and builder in Almora and Uttarakhand`. Lead `Homes on hill sites, where slope, access and drainage decide the structure.` Section `Hill sites`: `We assess the slope, the retaining and foundation approach, and how materials reach the site before the design is fixed.`

Schema: `HomeAndConstructionBusiness` with `areaServed`; BreadcrumbList.

---

## 10. About `/about`

- Eyebrow `About`; H1 `The architect you deal with is the one who builds.`
- Body 1: `Anumeh Prakhar is a COA-registered architect with a B.Arch from IIT BHU Varanasi. The studio has designed more than 50 projects and built more than 30.`
- Body 2: `Earlier work includes private homes in Patna and Almora, port and harbour projects, and site-quality training for engineers across more than 30 sites. A certificate in data science for architecture, engineering and construction shapes how the studio measures, records and reports.`
- Body 3: `The studio grew out of climate-responsive homes in Bihar: courtyards, shaded verandas, brick screens and thermal mass. That thinking now informs homes in Delhi NCR, where summers are hotter and winters carry smog.`
- `How we work` (`ThreeUp`): `Performance`: `Structure, climate, waterproofing and maintenance are design inputs from the first sketch.` · `Craft`: `Materials are chosen to age well and detailed so they can be built as drawn.` · `Proof`: `Every critical stage leaves a record the client can read.`
- Promise strip: on time or 10% back · 15-year warranty.
- Fact panel: Qualification · Registration · Track record · Office (`C93, Old DLF Colony, Sector 14, Gurugram`).
- Image `about-studio`. CtaBands `about-mid`, `about-end` (`Talk to the architect`).
- Schema: `Person` inside the Organization graph.

---

## 11. Book `/book-a-call` (form intact)

**The form component, its fields, field names, endpoint, validation, success handling and analytics are not changed (PRD R14).** Fields as they exist today: Full Name, Phone Number (WhatsApp preferred), Email Address, City / Town (label fix only), Project Typology (Residential, Commercial, Interior, Masterplan), Plot Size / Budget range, Custom Notes. Endpoint `https://formspree.io/f/mpqyberw`. Events `trackBookingFormSubmit`, `trackLead`.

Allowed around the form (new content, not part of the form component):
- H1 `Send us your plot.` Lead: `We reply in writing within 2 working days with what the plot allows: setbacks, coverage, FAR and the main risks.`
- Promise strip above the form: `On time, or 10% back` · `15-year warranty` · `IIT-led · COA-registered`.
- Reading list `What to send`: plot location and size · sale deed or layout plan, if you have it · a rough budget range · when you want to move in · whether you will be in India during construction.
- Contact card: phone (tap to call), WhatsApp button, address, `Get directions`, email.
- Desktop only: image `book-plot` beside the form. It is not loaded on phones.
- `What happens next` (numbered, real sequence): 1 We read your details. 2 We call or message you. 3 You get the written plot check.
- FAQ items 1, 3, 4 from section 2.14, FAQPage JSON-LD.
- Query parameters `src` (analytics only) and optional `type` (preselects Project Typology when it matches an existing option). They never add a field.
- Event `form_page_view` with `src`.
- Mobile: the form is a single column; inputs are 16 px; the first field is reachable within one scroll; the sticky bar shows Call and WhatsApp only.

---

## 12. Tools

`/calculators` index: H1 `Tools`. Lead `Three tools we use with clients, open to everyone.` Three cards with a coverage notice each.
- Coverage notices: site feasibility and FAR checker: `Rules loaded: Bihar Building Bye-laws 2014. For plots in Gurugram and Delhi, we run the check by hand. Get a free plot check.` Cost estimator: `Rates loaded: Bihar tiers. For Delhi NCR we give an indicative range on request. A fixed figure always comes with a bill of quantities.`
- Restyle only. No change to `lib/site-feasibility/*` math, FAR tables or `lib/calculator-constants.ts`. The cost estimator gains a `Delhi NCR` option that shows `Indicative range on request` and a button to the form until rates are supplied.
- Polygon canvas colors map to tokens: buildable footprint `--accent`, setback buffers `--line` hatch, grid `--grid`, handles `--ink`.
- `SandboxPanel` and `RuleNormalizationEditor` render only when `NEXT_PUBLIC_ENABLE_ADMIN_TOOLS === "true"`.
- CtaBands `tool-<name>-top` and `tool-<name>-result` (`Get a free plot check`).

`/specifications` stays gated (404 until `lib/spec-schedule.ts` has live rows).

---

## 13. SEO map, metadata and schema

| Route | Title | Meta description | Primary keyword |
|---|---|---|---|
| `/` | Architect and Builder in Gurugram, Delhi NCR | IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. On time or 10% back, with a 15-year warranty. | architect and builder in Gurugram |
| `/guarantee` | On-Time Handover Guarantee and 15-Year Warranty | If we miss the handover date in your agreement, we refund 10% of the construction amount. 15-year warranty from handover. | home construction guarantee Gurugram |
| `/technology` | Construction Technology: BIM, 360° Scans, Lab-Tested Concrete | The instruments Studio Aashraya uses on every build, and what each one catches before it is covered. | BIM home construction Gurugram |
| `/method` | Our Method: Eight Stages, Four Gates | How a home goes from plot review to handover, with written gates and instruments at each. | home construction quality checks |
| `/nri` | NRI Home Construction in Gurugram and Delhi NCR | Build in Delhi NCR from abroad. Weekly video, 360° scans, a live dashboard and gate-linked payments. | NRI home construction Gurugram |
| `/services/buildability` | Free Plot Check and Land Buildability Report | Find out what your plot allows before you commit to a design. | plot feasibility Gurugram |
| `/services/design-build` | Turnkey Home Construction in Gurugram | One agreement for design, structure, approvals, construction and interiors. | turnkey home construction Gurugram |
| `/services/redevelopment` | House Redevelopment in Delhi | Condition survey, retain-strengthen-rebuild options and construction for old houses and tight plots. | house redevelopment Delhi |
| `/areas/gurugram` | Architect and Builder in Gurugram | Private homes on Gurugram plots, designed, engineered and built by one team. Office in Old DLF Colony. | architect in Gurugram |
| `/areas/delhi` | Architect and Builder in Delhi | Legacy houses, tight plots and new homes in Delhi. | architect in Delhi |
| `/areas/patna` | Architect and Builder in Patna and Bihar | Climate-responsive homes in Patna and across Bihar, with construction under the same roof. | architect in Patna |
| `/areas/almora` | Architect and Builder in Almora, Uttarakhand | Homes on hill sites where slope, access and drainage decide the structure. | architect in Almora |
| `/projects` | Delivered Homes | Homes designed and built by Studio Aashraya in Delhi NCR, Bihar and Uttarakhand. | architect and builder projects |
| `/about` | About the Studio | A COA-registered architect with a B.Arch from IIT BHU Varanasi, leading design and construction under one roof. | IIT architect Gurugram |
| `/book-a-call` | Get a Free Plot Check | Send your plot details and get a written note on what it allows within 2 working days. | book architect Gurugram |
| `/calculators/*` | Keep existing | | existing |

Schema graph (root layout): `Organization` and `HomeAndConstructionBusiness` (name, url, logo, telephone `+91-9473031016`, email, address, areaServed, founder `Person` with `alumniOf`). Page level: `FAQPage` (home, guarantee, NRI, book), `Service`, `CreativeWork` and `BreadcrumbList` (projects), `BreadcrumbList` (inner pages). No `Review` or `AggregateRating`. Open Graph images via `opengraph-image.tsx`, using `OgImage`. robots: allow all, disallow `/api/`.

---

## 14. Mobile specification (applies to every page)

Design at 375 px first. Check at 360×640, 390×844, 768 and 1440.

| Rule | Spec |
|---|---|
| First screen | H1, promise chips and the primary button visible without scrolling on Home; page H1 and a CTA visible on every other page |
| Primary actions | `MobileCtaBar` (Call, WhatsApp, Start your project). Menu button in the header. No page needs more than one tap to reach `/book-a-call` |
| Tap targets | 48 px minimum height; 8 px minimum gap |
| Type | Body 16 px; inputs 16 px so iOS does not zoom; H1 `clamp(40px, 11vw, 56px)` on phones |
| Layout | One column. Swipe rows (scroll-snap, card width 82%) for doors, tech tiles, projects and filters. The page never scrolls horizontally |
| Tables | Comparison and reporting tables turn into stacked label and value rows below 700 px |
| Accordions | Method stages, technology blocks and FAQ collapse by default; first item of Method open |
| Images | `next/image` with `sizes`, AVIF/WebP, lazy loading except the hero (`priority`), reserved aspect ratios. Hero image at most 120 KB on mobile |
| Fonts | Subset to Latin, `display: swap`, preload the display font and Plex Sans 400 |
| JavaScript | Server components by default. Client JavaScript under 170 KB gzip per route, excluding the calculators |
| Motion | None beyond color transitions; no autoplay |
| Safe areas | Bar and header add `env(safe-area-inset-*)` |
| Forms | Correct `inputmode`, `autocomplete`, `type="tel"` and `type="email"` where the existing form already sets them; do not change field behavior |
| Calculators | Pan and zoom by touch; controls at least 44 px; result panel scrolls into view after calculation |
| Test | Lighthouse mobile with Slow 4G and 4x CPU slowdown; fix anything below the guardrails |
