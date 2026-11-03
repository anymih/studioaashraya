# Studio Aashraya Website v2: Page Specifications

Every string below is final copy unless marked `[DATA]`. Components come from `03_DESIGN_SYSTEM.md`. Claims and capabilities render through `lib/ledger.ts` (PRD section 6). Contact details come from `lib/site.ts` and reuse the phone, WhatsApp and email already on the old site until the owner changes them.

---

## 1. Routes and global shell

**Preserved routes (must return 200):** `/`, `/about`, `/book-a-call`, `/projects`, `/projects/[slug]` (all 7 existing slugs), `/calculators/cost-estimator`, `/calculators/far-checker`, `/calculators/site-feasibility`, `/api/health`, `/api/ingest`, `/api/normalize`, `/robots.txt`, `/sitemap.xml`.

**New routes:** `/method`, `/nri`, `/services`, `/services/[slug]` (`buildability`, `design-build`, `nri-remote-build`, `redevelopment`), `/areas`, `/areas/[slug]` (`gurugram`, `delhi`, `patna`, `almora`), `/calculators` (index), `/specifications` (gated, PRD R20).

**Header navigation (order):** Method · Homes (`/projects`) · Services · NRI clients · About · Tools (`/calculators`). Button: "Book a consultation" → `/book-a-call`.

**Footer columns**
1. Studio Aashraya. "Architect and builder. IIT-led architecture and construction for homes that perform."
2. Services: Buildability · Design and build · NRI remote build · Redevelopment.
3. Areas: Gurugram · Delhi · Patna · Almora. Tools.
4. Contact: phone, email, WhatsApp, "Gurugram, by appointment" (B2), Patna office and Muzaffarpur office as on the old footer.
Bottom line: "COA-registered architect" (+ number when supplied) · © 2026 Studio Aashraya.

**Mobile bottom navigation:** Home · Homes · Tools · Book.

---

## 2. Home `/`

**Purpose:** convince a P1 or P2 visitor to book a Buildability Consultation. **Single job of the first screen:** who is accountable, and what has been built.

### Sections and copy

**2.1 Hero**
- Eyebrow: `Architect and builder · Gurugram, Delhi NCR`
- H1: `Drawn by an <em>IIT architect.</em> Built by the same hands.`
- Lead: `Studio Aashraya is an IIT-led architecture and construction studio. We design, engineer and build private homes, villas, farmhouses and redevelopments, with one accountable team from land assessment to handover.`
- Primary button: `Book a Buildability Consultation` → `/book-a-call?intent=buildability`
- Secondary button: `See delivered homes` → `/projects`
- Note (mono): `Homes delivered in Delhi, Patna and Almora. Now taking new plots in Gurugram and Delhi NCR.`
- Figure: `SectionSheet` (SVG port from mockup) with title block: Studio · Aashraya / Drawing · Typical section, not to scale / Rule · Check first, then pour.

**2.2 Credentials strip**
`IIT BHU` B.Arch, Varanasi, 2024 · `COA` Registered architect, Council of Architecture · `50+` projects designed, 30+ built · `AEC data` Certified in data science for architecture, engineering and construction.

**2.3 The problem**
- Eyebrow: `The risk`
- H2: `Most premium homes are designed well and built blindly.`
- Body: `A home fails at the basement, the terrace, the façade, the plumbing line or the structural junction. Clients usually find out after the money is spent and the decision cannot be undone.`
- List (7): Weak soil and foundation assumptions · Basement leakage · Heat in summer and high energy use · Leaking terraces and façades · Electrical and plumbing loads nobody planned · Contractor-driven compromises during construction · No record of what was actually built
- Close: `Studio Aashraya exists to find these risks before they cost money.`

**2.4 What the training changes** (`ThreeUp`)
- Eyebrow: `What the training changes`
- H2: `An IIT architect on your site means numbers get checked.`
- Lead: `The degree is where the habit starts. The habit is to check a number before trusting it. We apply it to the three things clients usually have to take on faith.`
- Structure: `The architect reads the structural drawings and does not leave them to a bystander. Column sizes, bar spacing and concrete grade are checked against the drawing before every pour.`
- Quantities: `Every design becomes a bill of quantities before construction begins. You see where the money goes, item by item and rate by rate, before the first brick.`
- Records: `Each stage closes with a written checklist and dated photographs. You can read the history of your house at any point in the build.`
- Then the comparison table (`Conventional approach` / `Studio Aashraya`):
  1. Design first, solve construction later / Buildability checked before the design is fixed
  2. The contractor interprets drawings / The architect-builder leads technical coordination
  3. Quality is asserted verbally / Quality is recorded at written gates
  4. Waterproofing is a product purchase / Waterproofing is specified and tested as a system
  5. The client receives photographs / The client receives dated records and test results
  6. Handover ends the relationship / Handover includes as-built drawings, records and terms

**2.5 Method teaser** (dark band, `StageList` condensed to eight lines)
- H2: `Nothing is poured, closed or covered until the last stage is checked.`
- Link: `Read the full method` → `/method`

**2.6 Delivered homes**
- Eyebrow: `Delivered homes`; H2: `Homes built, not rendered.`
- Count block: `30+` "homes constructed" and `50+` "projects designed".
- Three featured `ProjectCard`s `[DATA]`: projects with status `built` and a cover photo, newest first, Delhi NCR first. If fewer than three qualify, show those that do. If none qualify, hide the grid and show only the count block.
- Link: `See all projects` → `/projects`.

**2.7 Services** (four cards, links to `/services/[slug]`)
1. `Buildability Consultation and Report`: `Know what your plot allows, and what it will cost to build well, before you commit to a design.`
2. `Architecture, Engineering and Turnkey Build`: `One agreement for design, structure, approvals, construction and interiors.`
3. `NRI Remote Build Management`: `A reporting system built so you do not need to be on site.`
4. `Redevelopment and Difficult Sites`: `Old houses, tight plots, basements, farmhouses and structurally complex projects.`

**2.8 Tools banner**
- H2: `Draw your plot. See the buildable area.`
- Body: `The site feasibility tool draws setbacks and the buildable footprint from the Bihar Building Bye-laws 2014. For plots in Gurugram and Delhi, we run the FAR and setback check by hand and send you the result.`
- Buttons: `Try the tool` → `/calculators/site-feasibility`; `Request a plot audit` → `/book-a-call?intent=plot-audit`

**2.9 Areas**
- H2: `Where we build.`
- Three columns: `Delhi NCR` "Our focus. New plots in Gurugram and Delhi." → `/areas/gurugram`; `Bihar` "Where the studio began. Patna and across the state." → `/areas/patna`; `Uttarakhand` "Hill sites, starting with Almora." → `/areas/almora`.

**2.10 FAQ** (data in `lib/faq-data.ts`, also emitted as FAQPage JSON-LD)
1. *What is a Buildability Consultation?* A structured call about your plot, brief, budget range and timeline. You leave with the main technical risks, an indicative cost and timeline range, and a recommended next step.
2. *What does it cost to build with you?* Cost depends on the plot, the number of floors, the structure, the basement and the level of finish. We quote after the consultation, and every quote comes with a bill of quantities so you can see how the figure is built up.
3. *Who is responsible if something goes wrong on site?* The studio. The architect who draws the house also builds it, so the drawings, the quantities and the work on site sit under one agreement.
4. *Which areas do you build in?* New plots in Gurugram and the rest of Delhi NCR. We have also built in Bihar and Uttarakhand. Completed homes so far are in Delhi, Patna and Almora.
5. *Can I manage the build from abroad?* Yes. Weekly video walkthroughs, dated photographs, a written decision log and payments linked to passed gates are part of the work for every client abroad.
6. *Do you handle approvals?* Yes. We prepare sanction drawings and follow them through with the authority that governs your plot. The timeline depends on the authority and the plot, and we give a range during the consultation.
7. *Do you do interiors?* Yes, as part of the build. Interior architecture, joinery and lighting are planned with the structure and services, so they are not added later.
8. *Do you take on old houses and difficult plots?* Yes. Redevelopment, tight plots, basements and farmhouses are part of our work. We start with a condition survey of the existing structure.

**2.11 Testimonials** `[DATA]`: renders only when `lib/testimonials.ts` has entries with name, relationship, city, quote and written permission flag. No JSON-LD for them.

**2.12 Final CTA** (dark band)
- H2: `Begin with clarity, not a quotation.`
- Body: `Before we design or build, we help you understand what your land, brief and budget can realistically achieve.`
- Button: `Book a Buildability Consultation`; second line with WhatsApp link.

**Acceptance:** PRD S1. **Events:** `cta_click` on every button with `section` set to the section id; `scroll_depth`; `project_view` not fired here.

---

## 3. Method `/method`

**Purpose:** make the proof system concrete for P1, P2 and P3.

- Eyebrow `Method`; H1 `Eight stages. Four gates.`
- Lead: `A gate is a written check by the architect. Work on the next stage does not start until the gate record is signed. Clients abroad receive each gate record with photographs and a video walkthrough.`
- Stage list (dark band). Each stage expands to **What we do / What you receive / Checks** (gates only). `method_stage_open` fires on expand.

| # | Stage | What we do | What you receive | Gate checks |
|---|---|---|---|---|
| 01 | Discovery and plot review | We meet, walk the plot if you can, and record the brief, budget range, timeline and who decides. | A written brief and a plot review note: dimensions, abutting roads, setbacks, coverage, FAR and the approval route for your plot. | none |
| 02 | Buildability and feasibility | We test whether the brief fits the plot: basement feasibility, soil risk screening, drainage, sun path, privacy, services routing and approval risk. | A buildability summary with the main technical risks and an indicative cost and timeline range. | none |
| 03 | Design and quantities | Concept, façade, plans and sections, structural coordination, material specification, and a bill of quantities that prices the design item by item. | Drawing set, specification schedule, bill of quantities, and a fixed-scope agreement listing scope, exclusions, timeline and payment schedule. | none |
| 04 | Approvals | We prepare sanction drawings and follow them through with the authority that governs your plot. | Sanctioned plans and a log of queries and responses. | none |
| 05 | Foundation | Excavation, reinforcement and the first pour. | Gate 1 record: dated photographs and a signed checklist. | Excavation level and soil at founding level · Reinforcement against the bar schedule · Cover and spacers · Concrete mix confirmed and cube samples taken |
| 06 | Structure | Columns, beams and slabs, floor by floor. | Gate 2 record for each pour. | Column and slab reinforcement · Shuttering levels · Conduit and sleeve positions · Pour sequence and curing plan · Cube test results filed per pour |
| 07 | Services and waterproofing | Electrical, plumbing, drainage and waterproofing before walls close. | Gate 3 record with test results. | Conduits and plumbing lines tested before walls close · Waterproofing laid to specification and flood-tested before screed · Drainage slopes checked |
| 08 | Finishes and handover | Joinery, tiling, paint, fittings and interiors. | Gate 4 record, snag list closed, as-built drawings, test records and the terms of the agreement. | Finishes checked room by room against the drawings · Snag list closed · Handover file complete |

*Owner confirms every gate check before launch (PRD B4). Remove any item the studio does not perform.*

- **What you can verify** (list): gate records · concrete cube test results per pour · bill of quantities · specification schedule · as-built drawings · decision log.
- **Sample gate record:** `GateRecord` component, values "—", caption "Sample format".
- CTA band: `See how this applies to your plot` → `/book-a-call?intent=buildability`.

**Acceptance:** all eight stages render in order; four gate pills; expand and collapse work by keyboard. **Schema:** BreadcrumbList.

---

## 4. NRI clients `/nri`

- Eyebrow `For NRI families`; H1 `Build in India without flying in for every decision.`
- Lead: `You should be able to see your house from wherever you are. The reporting below is part of the work for every client abroad.`
- **What you receive** (list, from the capability ledger, `live` only):
  1. `One named architect as your single point of contact.`
  2. `A weekly video walkthrough of the site.`
  3. `A dated photo and video archive, organised by stage.`
  4. `A written decision log. Every approval you give is recorded.`
  5. `Payments linked to stages that have passed their gate.`
  6. `Gate records with photographs and test results at each of the four gates.`
  7. `Calls scheduled for your time zone.`
- **Reporting rhythm** (table): Weekly: video walkthrough, photo archive update, open decisions. At each gate: gate record and walkthrough. Monthly: cost to date against the bill of quantities and schedule. At handover: handover file.
- **Before you start** (list): `A power of attorney or an authorised representative, if you will not sign in person.` `Your lawyer and tax advisor, for title, transfer and remittance questions. We coordinate with them and do not give legal or tax advice.`
- CTA: `Plan your build from abroad` → `/book-a-call?intent=nri-remote-build`.
- FAQ (page-level, FAQPage): *Can I approve designs remotely?* Yes, by video review and written approval, recorded in the decision log. *What if I want to visit?* We plan site visits around gates so you can see work before it is covered. *Who signs on site?* The studio's architect signs the gate records.

**Acceptance:** PRD S2. Never mention LiDAR, digital twin, dashboard, app or third-party audit while those are `pending`.

---

## 5. Services

### 5.1 `/services`
- H1 `One studio. Complete responsibility.` Lead: `Four ways to work with Studio Aashraya. Most clients begin with the first.` Four cards as in 2.7, each with a "What you receive" teaser.

### 5.2 Detail pages (data in `lib/services-data.ts`: slug, title, lead, audience[], receive[], steps[], notIncluded[], faq[])

**Buildability Consultation and Report** (`/services/buildability`)
- Lead: `Know what your plot allows, and what it will cost to build well, before you commit to a design.`
- Who it is for: plot owners, people about to buy a plot, families deciding between building and buying.
- Step 1, the consultation: `A structured call about your plot, brief, budget range and timeline. You leave with the main risks and a recommended next step.`
- Step 2, the report (paid, fee quoted after the consultation) delivers: permissible development for your plot (setbacks, coverage, FAR, height, parking under the applicable code) · basement and structural risk notes with a recommended soil investigation · sun path, privacy, drainage and services notes · the approval route and the queries to expect · an indicative cost and timeline range · a recommended approach and next steps.
- CTA: `Book a Buildability Consultation`.

**Architecture, Engineering and Turnkey Build** (`/services/design-build`)
- Lead: `One agreement for design, structure, approvals, construction and interiors.`
- Receive: bespoke architectural design · structural coordination · specification schedule and bill of quantities · sanction drawings · construction with four written gates · interiors planned with the structure · handover file.
- How it runs: 1 Design and quantities. 2 Fixed-scope agreement. 3 Approvals. 4 Construction with gates. 5 Handover.
- Scope note: `The agreement lists scope, exclusions, timeline and payment schedule. Changes you ask for are priced against the bill of quantities before work begins.`

**NRI Remote Build Management** (`/services/nri-remote-build`): summary of section 4 with a link to `/nri`.

**Redevelopment and Difficult Sites** (`/services/redevelopment`)
- Lead: `Old houses, tight plots, basements, farmhouses and structurally complex projects.`
- `We start with a condition survey of the existing structure. Then we decide with you whether to retain, strengthen or rebuild, and we price each option.`
- Receive: condition survey note · retain, strengthen or rebuild options with cost ranges · demolition and shoring approach where relevant · then the same stages and gates as a new build.

**Schema:** `Service` per page; FAQPage where FAQs exist.

---

## 6. Projects

### 6.1 `/projects`
- H1 `Homes built, not rendered.` Count block `30+ constructed · 50+ designed`.
- Filters (all `button` groups with `aria-pressed`): City (All, Delhi NCR, Bihar, Uttarakhand, derived from data), Type (All, Residential, Institutional, Concept), Status (All, Built, Under construction, Design stage). Filters combine. State is reflected in the URL hash only as letters and hyphens, for example `#built-delhi`.
- Grid of `ProjectCard`. Empty result: `No projects match these filters.` with a `Clear filters` button.
- `project_filter` fires on change.

### 6.2 `/projects/[slug]`
Order: breadcrumb · H1 and `StatusBadge` · title-block metrics (Site area, Built-up area, Climate zone, Year, City) · cover photo · narrative (Problem, Approach, Solution) · passive and technical strategies list · performance block · material palette · gallery · plans with scale notes · next and previous project · CTA `Planning something similar? Book a consultation`.

**Performance block rules.** Every metric has `evidence`. `measured` shows "Measured" with the method. `simulated` shows "Simulated at design stage" with the model and the software named in a method note. A metric with no evidence fails the build. Concept projects show only simulated metrics and the badge "Design stage".

**Data model (`lib/projects-data.ts`):** `slug, name, city, region, type, status, year?, plotArea?, builtUp?, climateZone?, cover{src,alt}, gallery[], plans[], narrative{problem,approach,solution}, strategies[{name,description}], materials[], metrics[{label,value,evidence,method?}]`. Validation: status `built` requires `year` and `cover`; type `concept` cannot have status `built`.

**Existing seven projects:** keep all slugs. The owner supplies status per project (PRD B3). `codename-madhuban` and `zero-carbon-pavilion` default to `design` unless told otherwise.

**Schema:** `CreativeWork` and `BreadcrumbList`. **Events:** `project_view`.

---

## 7. Areas

`/areas` index lists four areas, Delhi NCR first. Data in `lib/areas-data.ts`: `slug, name, region, tier ("primary"|"secondary"), h1, lead, sections[], faq[], projectSlugs[], live`.

**Gurugram `/areas/gurugram` (primary)**
- H1 `Architect and builder in Gurugram`
- Lead: `Studio Aashraya designs and builds private homes on plots in Gurugram. We handle the plot review, design, engineering, approvals and construction under one agreement.`
- Section "Plots we assess": `Plots in established phases and new sectors, farmhouse land, and plots with legacy structures.`
- Section "What is specific here": `Sanction routes depend on the sector and the authority that governs it. We confirm the authority and the applicable code for your plot at the start, then check setbacks, coverage, FAR, parking and height before any design work. Summers are hot and winters carry smog, so the brief treats shading, the building envelope and indoor air as engineering questions. Soil and water-table conditions vary between localities, so we recommend a soil investigation before the structure is fixed.`
- Section "Work to see": cards from `projectSlugs` (Delhi built projects first).
- CTAs: `Book a Buildability Consultation` · `Request a plot audit`.

**Delhi `/areas/delhi` (primary)**
- H1 `Architect and builder in Delhi`
- Lead: `Private homes, legacy houses and redevelopments in Delhi, designed and built by one team.`
- Sections: `Legacy houses and redevelopment` (`We start with a condition survey, then price the options to retain, strengthen or rebuild.`) · `Tight plots` (`Setbacks, light and privacy decide what a small plot can hold, so we test them before design.`) · `Work to see`.

**Patna and Bihar `/areas/patna` (secondary)**
- H1 `Architect and builder in Patna and Bihar`
- Lead: `The studio began here. Climate-responsive homes with courtyards, shaded verandas and brick screens, now with construction under the same roof.`
- Section: `Tools for Bihar plots`: links to the three tools. Section: `Work to see`.

**Almora and Uttarakhand `/areas/almora` (secondary)**
- H1 `Architect and builder in Almora and Uttarakhand`
- Lead: `Homes on hill sites, where slope, access and drainage decide the structure.`
- Section: `Hill sites`: `We assess the slope, the retaining and foundation approach, and how materials reach the site before the design is fixed.`

Area pages go live only when `live: true`. **Schema:** `HomeAndConstructionBusiness` with `areaServed`; BreadcrumbList.

---

## 8. About `/about`

- Eyebrow `About`; H1 `The architect you deal with is the one who builds.`
- Body 1: `Anumeh Prakhar is a COA-registered architect with a B.Arch from IIT BHU Varanasi. The studio has designed more than 50 projects and built more than 30.`
- Body 2: `Earlier work includes private homes in Patna and Almora, port and harbour projects, and site-quality training for engineers across more than 30 sites. A certificate in data science for architecture, engineering and construction shapes how the studio measures, records and reports.`
- Body 3: `The studio grew out of climate-responsive homes in Bihar: courtyards, shaded verandas, brick screens and thermal mass. That thinking now informs homes in Delhi NCR, where summers are hotter and winters carry smog.`
- **How we work** (`ThreeUp`): `Performance`: `Structure, climate, waterproofing and maintenance are design inputs from the first sketch.` · `Craft`: `Materials are chosen to age well and detailed so they can be built as drawn.` · `Proof`: `Every critical stage leaves a record the client can read.`
- Fact panel: Qualification B.Arch, IIT BHU Varanasi, 2024 · Registration Council of Architecture · Track record 50+ designed, 30+ constructed · Building in Delhi NCR, Bihar and Uttarakhand.
- Founder photograph `[DATA]` (B10). Without it, use the typographic layout.
- CTA: `Talk to the architect` → `/book-a-call`.
- **Schema:** `Person` (name, jobTitle, alumniOf) inside the Organization graph.

---

## 9. Book a consultation `/book-a-call`

- H1 `Send us your plot.` Lead: `We reply with a buildability note covering what the plot allows, its setbacks and its FAR. Send what you have.`
- **What to send** (list): plot location and size · sale deed or layout plan, if you have it · a rough budget range · when you want to move in · whether you will be in India during construction.
- **Form** (endpoint `https://formspree.io/f/mpqyberw`; options in `lib/form-options.ts`)

| Field | Type | Rules |
|---|---|---|
| Intent | select: Buildability consultation (default), Plot audit, NRI remote build, Redevelopment, Something else | Prefilled from `?intent=` |
| Full name | text | Required |
| Phone or WhatsApp | tel | Optional if email given; 7 to 15 digits with optional + |
| Email | email | Optional if phone given |
| Where do you live? | radio: In India / Outside India | Required. Outside India shows "Preferred call time and time zone" |
| Plot or project location | text | Required |
| Region | select: Delhi NCR, Bihar, Uttarakhand, Other | Required |
| Stage | select: I own a plot, I am buying a plot, I have an old house to redevelop, I am still deciding | Required |
| Plot size, with unit | text | Optional |
| Budget band | select: Under ₹3 Cr, ₹3 to 6 Cr, ₹6 to 10 Cr, ₹10 Cr and above, Not sure | Required. Bands are placeholders, owner adjusts in config |
| Timeline | select: Within 3 months, 3 to 6 months, 6 to 12 months, Just exploring | Optional |
| Notes | textarea | 2,000 character limit |
| Honeypot `_gotcha` | hidden | Must stay empty |

Hidden `_subject`: `[Region][Stage][Budget band] Full name`. Mark requests with "Not sure" budget as `[Unqualified]`.

- **Success panel:** `Request received. We read every request ourselves. We will contact you on the number or email you gave, at a time that suits your time zone. You will get a written next step: a feasibility note, or a proposal for a Land and Buildability Report.` Plus a WhatsApp button.
- **Error panel:** `We could not send your request. Your details are still in the form. Please try again, or message us on WhatsApp or call.`
- **What happens next** (numbered, real sequence): 1 We read your details. 2 We call or message you. 3 You get a written next step.
- **FAQ:** items 1, 2, 6 from 2.10, FAQPage JSON-LD.
- **Acceptance:** PRD S3 and S4. **Events:** `form_start`, `form_submit_attempt`, `form_submit_success`, `form_submit_error`, `whatsapp_click`, `phone_click`, plus existing `trackBookingFormSubmit` and `trackLead`.

---

## 10. Tools

### 10.1 `/calculators`
- H1 `Tools`. Lead: `Three tools we use with clients, open to everyone.` Three cards with a coverage `Notice` each.

### 10.2 Coverage notices (render at top of each tool)
- Site feasibility and FAR checker: `Rules loaded: Bihar Building Bye-laws 2014. For plots in Gurugram and Delhi, we run the check by hand. Request a plot audit.`
- Cost estimator: `Rates loaded: Bihar tiers. For Delhi NCR we give an indicative range on request. A fixed figure always comes with a bill of quantities.`

### 10.3 Changes allowed
Restyle only. No change to `lib/site-feasibility/*` math, FAR tables or rate constants. The Cost Estimator gains a city selector with `Delhi NCR` as an option that shows `Indicative range on request` and a button to `/book-a-call?intent=buildability` until rates are supplied (B5).
`PolygonEditor` canvas colors map to tokens: buildable footprint in `--accent`, setback buffers in `--line` hatch, grid in `--grid`, handles in `--ink`.
`SandboxPanel` and `RuleNormalizationEditor` render only when `NEXT_PUBLIC_ENABLE_ADMIN_TOOLS === "true"`. Default is off.

**Acceptance:** PRD S7. **Events:** `calculator_start`, `calculator_complete`.

---

## 11. Specifications `/specifications` (gated)

Ships only when `lib/spec-schedule.ts` has rows with `live: true`. Otherwise the route returns 404 and is excluded from the sitemap.
- H1 `Specification schedule.` Lead: `What goes into the structure, the envelope and the services, written down before you sign.`
- Table columns: Element · Specification · Inspection gate. Rows `[DATA]` supplied by the owner (concrete grades, reinforcement grade, waterproofing system, glazing, electrical and plumbing standards).
- Note: `Specifications are fixed in the agreement. Substitutions are priced against the bill of quantities and approved in writing.`

---

## 12. SEO map, metadata and schema

| Route | Title (before template) | Meta description | Primary keyword |
|---|---|---|---|
| `/` | Architect and Builder in Gurugram, Delhi NCR | IIT-led architecture and construction for private homes in Gurugram and Delhi NCR. Design, engineering, approvals and build under one accountable team. | architect and builder in Gurugram |
| `/method` | Our Method: Eight Stages, Four Gates | How Studio Aashraya takes a home from plot review to handover, with written quality gates before each pour and before walls close. | home construction quality checks |
| `/nri` | NRI Home Construction in Gurugram and Delhi NCR | Build a home in Delhi NCR from abroad. Weekly video walkthroughs, dated site records, gate-linked payments and one accountable architect. | NRI home construction Gurugram |
| `/services/buildability` | Land Buildability Report for Plots in Gurugram | Find out what your plot allows and what it will cost to build well before you commit to a design. | plot feasibility report Gurugram |
| `/services/design-build` | Turnkey Home Construction in Gurugram | One agreement for design, structure, approvals, construction and interiors, with written quality gates. | turnkey home construction Gurugram |
| `/services/redevelopment` | House Redevelopment in Delhi | Condition survey, retain-strengthen-rebuild options and construction for old houses, tight plots and basements. | house redevelopment Delhi |
| `/areas/gurugram` | Architect and Builder in Gurugram | Private homes on Gurugram plots, designed, engineered and built by one team. | architect in Gurugram |
| `/areas/delhi` | Architect and Builder in Delhi | Legacy houses, tight plots and new homes in Delhi, designed and built by one team. | architect in Delhi |
| `/areas/patna` | Architect and Builder in Patna and Bihar | Climate-responsive homes in Patna and across Bihar, with construction under the same roof. | architect in Patna |
| `/areas/almora` | Architect and Builder in Almora, Uttarakhand | Homes on hill sites where slope, access and drainage decide the structure. | architect in Almora |
| `/projects` | Delivered Homes | Homes designed and built by Studio Aashraya in Delhi, Bihar and Uttarakhand. | architect and builder projects |
| `/about` | About the Studio | A COA-registered architect with a B.Arch from IIT BHU Varanasi, leading design and construction under one roof. | IIT architect Gurugram |
| `/book-a-call` | Book a Buildability Consultation | Send your plot details and get a written next step: a feasibility note or a proposal for a Land and Buildability Report. | book architect consultation Gurugram |
| `/calculators/*` | Keep existing titles and descriptions | | existing keywords |

**Schema graph (site-wide, in root layout):** `Organization` and `HomeAndConstructionBusiness` (name, url, logo, telephone, email, areaServed [Gurugram, Delhi, Patna, Almora], founder `Person` with `alumniOf` Indian Institute of Technology (BHU) Varanasi). Page-level: `FAQPage` (home, book, NRI), `Service` (services), `CreativeWork` and `BreadcrumbList` (projects), `BreadcrumbList` (all inner pages). No `Review`, `AggregateRating` or `Product` markup.

**Open Graph:** `opengraph-image.tsx` per route group using tokens: grid background, wordmark, page title in display type.

**robots:** allow all; disallow `/api/`. **sitemap:** all public routes from data files, `lastModified` from build time.
