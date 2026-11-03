# Studio Aashraya Website v2: Image Briefs

Purpose: every image on the site is generated now so the site works end to end, then replaced with real photography over time. This file tells the build agent exactly what to generate, how to name and register it, and how it will be swapped.

---

## 1. Pipeline rules

1. **Generate** each image below with the image-generation tool available in the IDE, one at a time, using the **Style bible** (section 2) plus the image's own prompt. If no generator is available, do not stop: use the hatched placeholder from the design system, log the missing ids in `PROGRESS.md`, and continue.
2. **Output:** generate at 2× the pixel size in the registry, then export `AVIF` (quality 55), `WebP` (quality 72) and one `JPG` fallback (quality 78). Save as `public/images/<group>/<id>.<ext>`. Size caps: hero 140 KB, cards and galleries 70 KB, mobile-served variants smaller by the `sizes` attribute.
3. **Register** every image in `lib/images.ts`: `{ id, src, width, height, alt, caption?, kind: "generated" | "coded" | "photo", priority? }`. Pages reference images by id only, never by path.
4. **Captions:** an image with `kind: "generated"` that depicts a building, a site or a person's work renders the caption `Illustration` (mono, 11 px) under or over it. Technology visuals are captioned `Illustration`. Replace with `kind: "photo"` and the caption "Location, year" when real photography arrives.
5. **No faces, no readable text, no logos, no watermarks, no brand marks** in any generated image. Hands in gloves are allowed where stated.
6. **Replacement protocol (for later):** drop the real photo in with the same id and aspect ratio, set `kind: "photo"`, update `alt` and `caption`. Nothing else changes.
7. **Launch rule:** `npm run launch:check` fails while any project image (`proj-*`) still has `kind: "generated"`. Portfolio images must be real photographs of real work before launch. Non-portfolio imagery (hero, technology, services, gates, areas) may stay illustrative if captioned.
8. **Alt text** is written as a plain description of what is in the frame, never "image of".

## 2. Style bible (prepend to every prompt)

> Architectural photography of real, built Indian homes. Natural light only. Shot on a full-frame camera with a 24 mm tilt-shift lens, verticals corrected, f/8, slight film-like grain. Palette: ash and concrete greys, handmade brick red, warm Dholpur sandstone beige, aged teak, lime-wash off-white, deep green foliage. Colour grade: slightly desaturated, high micro-contrast, neutral-cool shadows, warm highlights, no teal-orange cast. Surfaces show honest wear: mortar lines, shuttering marks, weathered edges. Composition: calm, structural, symmetrical or strongly diagonal, generous negative space. Looks documentary and believable, never glossy, never a game render.

**Negative prompt (append to every prompt):** `text, letters, numbers, signage, logos, watermark, people, faces, hands (unless stated), cars, fantasy architecture, impossible geometry, melted details, oversaturated colours, HDR halos, lens flare, neon, plastic-looking surfaces, stock photo staging, swimming pool (unless stated)`

**For technology visuals (section 4),** replace the style bible with: `Clean technical visualisation, flat studio lighting, no UI chrome, no text. Dark slate background (#0E1311) or pale concrete background (#E8E9E4). Accent colour for markers only: safety orange (#FF8A4C). Thin hairline strokes, precise geometry.`

## 3. Registry summary

| id | Group | Ratio | Size (px) | Kind | Used on |
|---|---|---|---|---|---|
| `hero-home` | home | 4:5 | 1600×2000 | generated | Home hero |
| `home-problem` | home | 4:3 | 1600×1200 | generated | Home problem section |
| `tech-bim` | tech | 4:3 | 1600×1200 | generated | Home, Technology |
| `tech-lidar` | tech | 4:3 | 1600×1200 | generated | Home, Technology, NRI |
| `tech-thermal` | tech | 4:3 | 1600×1200 | generated | Home, Technology |
| `tech-structural` | tech | 4:3 | 1600×1200 | generated | Technology |
| `tech-concrete` | tech | 4:3 | 1600×1200 | generated | Home, Technology |
| `tech-rebar` | tech | 4:3 | 1600×1200 | generated | Technology |
| `tech-flood` | tech | 4:3 | 1600×1200 | generated | Technology, Method |
| `svc-buildability` | services | 3:2 | 1800×1200 | generated | Services, Home |
| `svc-design-build` | services | 3:2 | 1800×1200 | generated | Services, Home |
| `svc-redevelopment` | services | 3:2 | 1800×1200 | generated | Services, Home |
| `nri-hero` | nri | 3:2 | 1800×1200 | generated | NRI, Services, Home |
| `gate-foundation` | method | 3:2 | 1800×1200 | generated | Method |
| `gate-structure` | method | 3:2 | 1800×1200 | generated | Method |
| `gate-waterproofing` | method | 3:2 | 1800×1200 | generated | Method |
| `gate-finishes` | method | 3:2 | 1800×1200 | generated | Method |
| `area-gurugram` | areas | 16:9 | 2000×1125 | generated | Areas |
| `area-delhi` | areas | 16:9 | 2000×1125 | generated | Areas |
| `area-patna` | areas | 16:9 | 2000×1125 | generated | Areas |
| `area-almora` | areas | 16:9 | 2000×1125 | generated | Areas |
| `about-studio` | about | 3:2 | 1800×1200 | generated | About |
| `book-plot` | book | 4:3 | 1600×1200 | generated | Book page side image (desktop only) |
| `proj-<key>-cover` ×6 | projects | 4:3 | 1600×1200 | generated | Cards, project headers |
| `proj-<key>-g1`, `g2`, `g3` ×6 | projects | 3:2 | 1800×1200 | generated | Project galleries |
| `proj-<key>-plan` ×6 | projects | 4:3 | 1600×1200 | generated | Project plans |

Total generated: 24 general + 30 project images = 54.

## 4. General image briefs

### `hero-home`
- **Prompt:** A newly completed three-storey private home in Gurugram at golden hour, three-quarter view from the street. Façade of warm beige Dholpur sandstone cladding, deep horizontal cantilevered concrete fins at first floor, a large west-facing handmade-brick jali screen on the upper floor casting dappled light, a timber-slatted gate, a mature neem tree in the foreground, clear sky going from pale blue to amber. Clean concrete paving. The house looks lived-in-ready, precise, expensive and calm. Reads as built architecture, not a render.
- **Composition:** house fills the lower two-thirds, sky in the upper third, left edge kept calm so a coded drawing overlay can sit on it.
- **Alt:** Three-storey sandstone and brick-jali home in Gurugram at sunset.
- **Coded overlay (not part of the image):** `HeroOverlay` SVG in `--accent-hi` hairlines: a vertical dimension line on the right edge, three small numbered gate markers (1, 2, 3) on the façade, and a mono caption "Gate-checked at every stage".

### `home-problem`
- **Prompt:** Close documentary photograph of a damp-stained plaster wall directly under a terrace slab edge in an Indian home: brown tide-mark stains, blistered and peeling paint, white salt lines of efflorescence, a hairline crack running along the beam-to-wall junction. Soft diffuse window light from the left, shallow depth of field, muted palette.
- **Alt:** Damp stains and peeling paint on a wall below a terrace slab.

### `tech-bim`
- **Prompt:** Isometric cutaway of a building-information model of a three-storey house on a pale concrete background with a faint grid. Structure in warm grey, air-conditioning ducts in blue-grey, electrical trays and plumbing risers in muted green and tan. Small safety-orange spheres mark clash points where a duct meets a beam. No interface elements, no text.
- **Alt:** Cutaway 3D model of a house showing structure, ducts and services with clash points marked.

### `tech-lidar`
- **Prompt:** Dense colour point-cloud scan of the interior of a half-built concrete house: grey slabs and columns, rust-red reinforcement bars visible at a slab edge. One bay carries a thin safety-orange wireframe of the design model, offset a few centimetres from the scanned surface. Dark slate background, no text.
- **Alt:** Point-cloud scan of a half-built concrete house with the design model overlaid.

### `tech-thermal`
- **Prompt:** Thermal simulation of a house's west façade as a smooth heat map from deep indigo through teal to amber, the brick-jali screen area clearly cooler than the plain wall beside it. The house is a simple pale grey volume. A thin white sun-path arc crosses above it. Dark slate background, colour scale bar with no numbers.
- **Alt:** Heat map of a west-facing façade showing the jali screen running cooler than the plain wall.

### `tech-structural`
- **Prompt:** Wireframe structural-analysis model of a three-storey RCC frame: columns, beams and slabs in thin light-grey lines, exaggerated deflection shading from blue to red across one slab span, orange arrows showing lateral seismic load at each floor. Dark slate background, no text.
- **Alt:** Structural analysis model of a concrete frame under seismic load.

### `tech-concrete`
- **Prompt:** Photograph in a materials-testing laboratory: rows of 150 mm concrete cube specimens on a steel bench with illegible chalk marks, one cube in the platen of a compression testing machine. Cool neutral light, shallow depth of field, no people.
- **Alt:** Concrete test cubes in a laboratory beside a compression testing machine.

### `tech-rebar`
- **Prompt:** Site photograph: a pair of gloved hands holds a handheld reinforcement scanner against a cured concrete wall, a grid of chalk lines and marked bar positions around it. Overcast daylight, shallow depth of field, no faces. Gloved hands only.
- **Alt:** Scanner being moved across a concrete wall to locate reinforcement bars.

### `tech-flood`
- **Prompt:** A terrace slab held under a shallow water test: cement-mortar bunds around the perimeter, 50 mm of still water reflecting the sky, a marked measuring stick standing in it. Early morning light, clean lines.
- **Alt:** Terrace slab filled with water for a leak test.

### `svc-buildability`
- **Prompt:** Low aerial view from about 15 m over an empty rectangular residential plot in an established Gurugram neighbourhood. Wooden survey pegs and orange string lines mark the setback lines, houses on both sides, mature trees, late-morning light, long soft shadows.
- **Alt:** Empty residential plot marked with survey pegs and setback lines.

### `svc-design-build`
- **Prompt:** A private home under construction at first-floor slab stage: steel props and shuttering, a reinforcement mat laid, finished brick walls at ground floor, a tidy organised site, a completed neighbouring house behind. Golden light, no people.
- **Alt:** House at first-floor slab stage with shuttering and reinforcement in place.

### `svc-redevelopment`
- **Prompt:** A 1970s two-storey Delhi house in the middle of redevelopment: weathered plastered brick exterior, steel props and temporary shoring supporting the first floor, scaffolding on one side, a neem tree beside it. Overcast soft light.
- **Alt:** Old two-storey house propped and scaffolded for redevelopment.

### `nri-hero`
- **Prompt:** A laptop on a wooden desk in an apartment at dusk, rain-dappled window with blurred city lights behind it. The screen shows a video walkthrough of a building site (content blurred, non-legible). A notebook and a cup beside it. No people, no faces.
- **Alt:** Laptop showing a live site walkthrough on a desk at dusk.

### `gate-foundation`
- **Prompt:** Oblique view of a pile-cap reinforcement cage before the pour: dense rebar with concrete cover blocks, tie wire, a clean PCC base, excavation walls on three sides, chalk marks on the steel. Overcast light.
- **Alt:** Foundation reinforcement cage with cover blocks before concrete is poured.

### `gate-structure`
- **Prompt:** Slab shuttering with a top and bottom reinforcement mat, electrical conduits and plumbing sleeves laid in position, levelling pegs standing at intervals. Low raking evening light through the column grid.
- **Alt:** Slab reinforcement with conduits and sleeves in place before pouring.

### `gate-waterproofing`
- **Prompt:** Close photograph of a bathroom floor slab with a grey cementitious waterproofing coat turned up the wall edges, a shallow pool of test water held to a marked level. Even soft light.
- **Alt:** Bathroom slab with waterproofing coat and test water held to a marked level.

### `gate-finishes`
- **Prompt:** A finished interior room in the snagging stage: oiled timber floor, freshly painted lime-white walls, large window, small orange tape flags stuck at skirting height marking minor defects. Daylight from the left, calm and empty.
- **Alt:** Finished room with small tape flags marking items to correct.

### `area-gurugram`
- **Prompt:** Street-level view of a leafy residential avenue in old Gurugram: two and three-storey homes behind gates, mature neem and gulmohar trees, afternoon haze, faint glass towers on the far skyline.
- **Alt:** Tree-lined residential street in Gurugram.

### `area-delhi`
- **Prompt:** South Delhi tree-lined residential lane at dusk: older bungalows, a jacaranda canopy, one newly built stone-clad home among them, warm window light.
- **Alt:** Residential lane in Delhi with old bungalows and one new stone-clad home.

### `area-patna`
- **Prompt:** Patna residential street in early morning: brick and plaster houses with verandas, a banyan tree, monsoon clouds building, wet road reflecting the sky.
- **Alt:** Residential street in Patna under monsoon clouds.

### `area-almora`
- **Prompt:** Terraced hillside in Almora: a stone-clad house set into the slope, deodar and pine around it, Himalayan haze behind, soft morning light.
- **Alt:** Stone house on a terraced hillside in Almora.

### `about-studio`
- **Prompt:** An architect's working desk: unrolled plans held down by a scale rule, mechanical pencils, a basswood study model of a courtyard house, a laptop showing an out-of-focus 3D model. Window light from the left, a bare concrete wall behind. No people.
- **Alt:** Architect's desk with plans, a study model and a laptop.
- **Note:** replace with a real photograph of the Sector 14 studio when available.

### `book-plot`
- **Prompt:** A plot owner's view of an empty plot at golden hour: a folded plan resting on a stone parapet in the foreground, a phone beside it, houses and trees beyond. No people.
- **Alt:** Folded plan on a parapet overlooking an empty plot at sunset.
- **Use:** desktop only, beside the form. Not loaded on mobile.

## 5. Project image kits

Each project has five images: `cover` (4:3), `g1`, `g2`, `g3` (3:2) and `plan` (4:3). Every prompt is: Style bible + the project's **scene bible** + the shot line.

**Shot lines (same pattern for every project)**
- `cover`: Exterior hero view from the best angle, the way a magazine would open the story.
- `g1`: Key interior space, wide, natural light.
- `g2`: Material detail close-up, the most characteristic junction or surface.
- `g3`: Defined per project below (process, second exterior or site view).
- `plan`: Architectural floor plan as a clean line drawing in dark ink on off-white (#F3F3EF), double-line walls, door swings, minimal furniture symbols, north arrow, scale bar without numbers, no room names, no text. Caption on site: "Sample drawing".

### Key `jali` (Jali House, Gurugram, built)
- **Scene bible:** 500 sq yd corner plot in old Gurugram. Three storeys. West façade carries a handmade-brick jali screen with a 150 mm air gap; north and south faces in Dholpur sandstone. A double-height courtyard with a single neem tree and a skylight slot. Kota stone floors, teak joinery, lime-washed walls. Golden-hour light.
- `g3`: Courtyard looking up through the neem to the sky slot, dappled light on stone.

### Key `basement` (Basement Villa, Gurugram, under construction)
- **Scene bible:** 600 sq yd plot, basement plus ground and two floors. Shown at the stage of the second-floor slab: bare concrete frame, steel scaffolding, basement retaining wall with a grey waterproofing membrane and protection board at the base. Tidy, organised site. Overcast to golden light.
- `cover`: Concrete frame at second-slab stage from the street, clean site, neighbouring finished homes behind.
- `g1`: Basement retaining wall with membrane and drainage board, looking down a ramp.
- `g2`: Slab pour in progress from above, a concrete pump boom, vibrator pokers, finishers' tools (no people visible).
- `g3`: Neatly stacked, labelled reinforcement bars by diameter on timber bearers.

### Key `delhi` (South Delhi Redevelopment, Delhi, built)
- **Scene bible:** 300 sq yd plot. A 1970s house whose frame was strengthened with jacketed columns and a new top floor. Lime-plaster off-white façade, brass door handles, a Kota stone threshold, restored oxide floors inside, original arched openings kept. Soft overcast light.
- `g3`: Before-and-after split of the same staircase: left half old peeling plaster, right half restored with lime plaster and a new timber handrail.

### Key `almora` (Hillside House, Almora, built)
- **Scene bible:** 250 sq m sloping site. Local stone masonry walls, a slate roof, aged deodar timber, dry-stone retaining walls stepping with the slope, a rainwater tank at the lowest terrace. Morning mist, Himalayan haze.
- `g3`: A stepped dry-stone retaining wall with a drainage channel and a path, moss on stone.

### Key `patna` (Courtyard Home, Patna, built)
- **Scene bible:** 3,200 sq ft home on a 2,400 sq ft plot in Patna. Central courtyard, deep shaded veranda, exposed brick, lime plaster, jali openings for cross-ventilation. Monsoon light, wet ground, green courtyard planting.
- `g3`: The veranda in monsoon light with rain falling off the eave onto a stone drain.

### Key `farm` (NRI Farmhouse, Sohna belt, Gurugram, design stage)
- **Scene bible:** One-acre farmhouse designed for a family living abroad. Low-slung plan with deep verandas, battered stone plinth, rammed-earth walls, a long water channel and an orchard. These are design renders, not photographs: soft, clear, true-to-material renders with a visible "design render" quality. Caption on site: "Design render".
- `g3`: Aerial view of the whole plan: the house, water channel and orchard grid.

## 6. Coded graphics (build in code, do not generate)

| Name | What it is | Spec |
|---|---|---|
| `SectionSheet` | Section drawing of a two-storey house with four numbered gates | Port from `studio-aashraya.html`. Reused on Method and on project pages (parameterised floor count). |
| `HeroOverlay` | Drawing layer on `hero-home` | See `hero-home` above. |
| `PromiseCard` | Large-number panel: `10%` and `15` years | Display type, `clamp(72px,12vw,160px)`, accent colour, 1.5 px ink border, mono caption. |
| `GuaranteeTimeline` | Horizontal timeline: Agreement signed, Completion date, Handover, Year 15 | SVG, hairlines, orange marker at the completion date and at year 15. |
| `DashboardMock` | The client dashboard: schedule bars, four gate chips, a photo strip, a payments list | React component with sample data and the label "Sample data". No screenshots. |
| `GateRecord` | Sample gate-record sheet | As in the design system. |
| `OgImage` | Open Graph cards | `next/og`, tokens, grid background. |
