# Studio Aashraya Site Feasibility Web App – PRD and TRD
## 1. Product Requirements Document (PRD)
### 1.1 Product Overview
The product is a web-based "site feasibility calculator" that allows a prospective client to understand the development potential of a plot before any manual drafting or detailed consultancy.
The tool will be embedded into the Studio Aashraya website as a feature, implemented initially as a standalone web app and later integrated directly into the main site.
It combines map-based plot capture, environmental context (topography, sun, wind, existing structures), and building bye-law rules to output buildable area, permissible floors, and a simplified site-analysis infographic.[^1][^2][^3][^4][^5]
### 1.2 Target Users
- Prospective clients who own or are considering a plot and want a quick, intelligible picture of what is possible.
- Studio Aashraya internal team members who want a fast pre-design study they can later refine in professional tools.
### 1.3 User Goals
- Identify the plot on a map and capture its geometry without needing CAD skills.
- Understand setbacks, buildable footprint, FAR / FSI, and approximate number of floors in terms of local bye-laws.
- Visualize site conditions (topography, access, sun, wind, existing structures) as simple diagrams.
- Arrive at a clear, non-technical summary of feasibility that can support early decisions.
### 1.4 Business Goals
- Differentiate Studio Aashraya’s website with a high-value, architect-grade interactive tool.
- Pre-qualify leads by giving them a realistic understanding of constraints before formal engagement.
- Create structured, machine-readable site data that can be reused in design workflows and proposals.
### 1.5 Core Use Cases
1. **Single residential plot feasibility**
   - User draws plot on map or traces from an uploaded plan.
   - Selects intended use (residential) and road widths.
   - System returns setbacks, buildable footprint, FAR-based floor count, and basic site analysis.

2. **Commercial plot feasibility adjacent to major road**
   - Similar steps, but intended use set to commercial.
   - Road width and category influence FAR and height rules.
   - System shows allowed built-up area and indicative number of floors.

3. **Mixed-use / flexible use testing**
   - User toggles intended use to see how bye-laws change.
   - Tool recalculates setbacks and FAR live.

4. **Internal architect workflow**
   - Architect uses the tool to quickly test different massing options based on FAR and setbacks.
   - Export buildable footprint polygon and key numbers into CAD/BIM tools.
### 1.6 Feature List
#### 1.6.1 Plot Capture and Geometry

- Map search: user can search for a location or navigate to the site.
- Plot drawing: user draws a polygon on the basemap representing the plot.
- Assisted tracing: for images/PDFs, user can trace over the visible site boundary.
- Automatic geometry: compute plot area, side lengths, and bearings from the drawn polygon.

#### 1.6.2 Road Identification and Width Bubbles

- Identify edges of the plot that abut roads using road network data (Google Roads API or OSM-based).[^4]
- Render "bubbles" on those edges showing default road width options.
- Allow user to edit road widths via sliders or direct numeric input.
- Store road width values per edge for downstream bye-law computations.

#### 1.6.3 Environmental Context

- Topography: derive elevation values for the plot and surroundings; compute slope and simple contour representation.[^5][^6][^4]
- Existing structures: show footprints of buildings in proximity to the plot, sourced from satellite footprint detection models or open building footprint datasets.[^7]
- Wind direction: fetch climate wind rose data for the site location via meteoblue’s History & Climate data package, identify dominant wind direction(s).[^1][^8]
- Sun path: compute sun azimuth and altitude throughout the day/year based on latitude/longitude, inspired by Andrew Marsh’s sun-path diagrams.[^9][^10][^11]

#### 1.6.4 Bye-Law Retrieval and Interpretation

- Bye-law catalogue: maintain a growing list of official building bye-law / DCR documents per city/state (PDFs or structured tables).[^2][^12][^13][^14]
- Fallback strategy: if city-specific bye-laws are unavailable, use state-level or national model bye-laws.
- RAG engine: use retrieval-augmented generation over bye-law text to answer questions like setbacks, FAR, height limits, and parking requirements for given plot and street conditions.
- Rule structuring: convert textual answers into structured rules stored per jurisdiction, including lookup tables for setbacks and FAR vs plot area and road width.[^3]

#### 1.6.5 Setback and Buildable Area Visualization

- Compute setback distances for each side based on bye-law rules and road data.
- Offset the plot polygon inward to obtain the buildable footprint polygon.
- Visualize original plot with a faint outline.
- Show setbacks as a red-hatched buffer zone.
- Show buildable area as a solid green region.

#### 1.6.6 FAR / Floors / Area Calculator

- Compute total permissible built-up area using FAR/FSI and plot area.
- Compute approximate maximum floor count by dividing total permissible built-up area by buildable ground footprint.
- Adjust floor count based on height limitations and occupancy rules.
- Present outputs as numeric values and simple visual bars.

#### 1.6.7 Site Analysis Infographics

- Generate a nine-panel site analysis similar to the existing conceptual diagram: topography, access points, wind direction, views, sun direction, circulation, noise distraction, existing plants/structures, etc.
- Each panel is driven by computed or fetched data but simplified visually for layperson comprehension.

#### 1.6.8 Session Storage and Export

- Save each session as a site object (plot geometry, road data, environmental context, bye-law rules applied, outputs).
- Allow export of buildable footprint polygon and numeric summary (setbacks, FAR, permissible floors) for offline use.
### 1.7 Non-Goals (Initial Version)
- No full auto-interpretation of arbitrary scanned site plans; initial focus is on guided tracing and simple PDFs.
- No structural design or detailed floor plan generation.
- No legal certification; tool provides indicative feasibility only.
### 1.8 Constraints and Risks
- External APIs (Google Maps, Elevation, Mapbox, meteoblue) require API keys, billing, and have usage limits; caching is mandatory to control cost.[^1][^4][^5][^15]
- Bye-law coverage is incomplete; there is substantial manual work in sourcing and validating documents for different cities.
- Regulatory change risk: bye-laws can change; periodic updates to the catalogue and rules are necessary.

***
## 2. Technical Requirements Document (TRD)
### 2.1 High-Level Architecture
- **Frontend**: Single-page web app (e.g., React/Next.js) embedding mapping libraries (Google Maps JS API or Mapbox GL JS) and custom UI components for plot drawing, road bubbles, and visual infographics.
- **Backend**: REST or GraphQL API layer handling geospatial calculations, external API calls, RAG over bye-law documents, and rule-based computation of setbacks and FAR.
- **Data Layer**: Database storing site sessions, structured bye-law rules, and cached responses from external APIs.
### 2.2 External Services and APIs
- **Mapping and Roads**
  - Google Maps JavaScript API for base maps and drawing controls; or Mapbox GL JS with appropriate tiles.[^4][^5]
  - Google Roads API or OpenStreetMap/Overpass to determine road adjacency and classification.

- **Elevation / Topography**
  - Google Elevation API to retrieve elevation at sampled points across the plot and its surroundings.[^16][^17][^4]
  - Optionally, Mapbox Terrain-RGB tiles for more granular elevation sampling.[^5][^6][^18]

- **Wind Rose / Climate Data**
  - meteoblue History & Climate Data API with Climate Wind Rose package for dominant wind direction, speed distributions, and frequency per direction.[^1][^19][^8]

- **Sun Position / Sun Path**
  - Implement internal sun-position calculations using standard solar algorithms, informed by open resources and the behavior of Andrew Marsh’s sun-path tools.[^9][^10][^11]

- **Building Footprint Detection / Existing Structures**
  - Use open building footprint datasets where available (e.g., OSM building polygons).
  - For more detailed footprints from imagery, integrate a segmentation model similar to SatFootprint that detects building outlines from satellite imagery.[^7]

- **Bye-Law Sources**
  - Host curated PDFs or retrieve them from official portals such as NAREDCO, state UDH sites, city planning departments, or OpenCity datasets.[^2][^12][^20][^13][^14]
  - Integrate structured datasets like Infralens DCR tables for Indian cities when available.[^3]
### 2.3 Data Model
#### 2.3.1 Site Entity

Fields:
- `id`: unique identifier.
- `owner_user_id`: optional reference to user.
- `plot_geojson`: polygon representing the plot.
- `plot_area_m2`: numeric area.
- `edges`: array of edges with properties: length, bearing, `is_road_edge`, `road_width_m`, `road_class`.
- `location_lat`, `location_lng`: geographic coordinates (centroid or reference point).
- `intended_use`: enum (e.g., `residential`, `commercial`, `mixed`, `other`).
- `environment_context`: nested object storing elevation grid, topography metrics, wind data summary, sun-path summary, existing structures around the site.
- `byelaw_context`: object indicating jurisdiction, bye-law documents used, version number.
- `feasibility_output`: object for setbacks per side, buildable footprint polygon, FAR value, permissible built-up area, estimated max floors.

#### 2.3.2 Bye-Law Rule Entity

Fields:
- `jurisdiction_id`: city or state identifier.
- `jurisdiction_name`.
- `document_source_url`: link to official bye-law PDF or webpage.[^2][^12][^14]
- `document_version`: version/year.
- `rules_fsi`: table mapping `use_type`, `road_width_range`, `plot_area_range` to FAR/FSI values.[^3]
- `rules_setbacks`: table mapping `use_type`, `road_width_range`, `plot_area_range` to front, side, rear setback distances.
- `rules_height`: height limits per use type and street condition.
- `rules_parking`: simplified parking norms if needed.

#### 2.3.3 Cached External Data Entity

Fields:
- `site_id` or (lat, lng) key.
- `source_type`: elevation, wind, sun, etc.
- `payload`: JSON from external API.
- `retrieved_at`: timestamp.
### 2.4 Functional Modules
#### 2.4.1 Plot Capture Module

Responsibilities:
- Provide map view and drawing tools to create or edit a polygon.
- Compute geodesic area and perimeter from the polygon.
- Store polygon as geoJSON in the Site entity.
Implementation:
- Use mapping library’s drawing controls and custom layers.
- Geospatial computations via turf.js or backend geospatial library.

#### 2.4.2 Road Detection and Bubbles Module

Responsibilities:
- Detect which plot edges abut roads using road network data (intersection tests between plot edges and road lines).
- For each road edge, assign default road width based on road classification or heuristic (e.g., local street vs arterial).
- Render interactive bubbles for user to adjust widths.
Implementation:
- Backend queries to roads API (Google/OSM) using bounding boxes around the plot.[^4]
- Edge-road proximity algorithm to determine adjacency.

#### 2.4.3 Topography and Existing Structures Module

Responsibilities:
- Sample elevation at regular grid points inside and around the plot using elevation API/tiles.
- Compute slope vectors and generate contour-like representation for the site analysis panel.[^5][^6][^4]
- Fetch building footprints within a defined radius via OSM or segmentation model; store as polygons.
Implementation:
- Backend jobs calling elevation APIs and reading tiles; caching per site.
- Optional ML inference pipeline for satellite segmentation based on SatFootprint-style models.[^7]

#### 2.4.4 Climate and Sun Module

Responsibilities:
- Call meteoblue API for wind rose at site coordinates; parse dominant wind directions and relative frequency.[^1][^8]
- Compute solar position arrays (azimuth, altitude vs time) for the site latitude, for key days or months; summarize into a simple directional representation.
Implementation:
- Server-side HTTP client for meteoblue with proper authentication.[^1]
- In-house solar computation functions or libraries (no external UI dependency).

#### 2.4.5 Bye-Law RAG and Rule Engine Module

Responsibilities:
- Store bye-law documents and structured rule tables per jurisdiction.
- When a site is created, determine jurisdiction based on location.
- If structured tables exist for that jurisdiction, prefer them for calculations.[^3]
- If only PDF exists, perform text extraction, chunking, embedding, and retrieval to answer specific queries; wrap results in structured rules where possible.[^2][^12][^20][^14]
- Expose an API for the calculator to get: setbacks per side, FAR/FSI value, height limits, etc.
Implementation:
- Use a vector database for RAG (e.g., embeddings of PDF text) and LLM for answer synthesis.
- Rule consolidation process that turns LLM output into explicit numeric rules stored in Bye-Law Rule entities.

#### 2.4.6 Setback and Buildable Footprint Module

Responsibilities:
- Given plot polygon and setback distances per side, compute inward offsets to create setback buffers and buildable footprint polygon.
- Handle irregular plot shapes and multiple road edges.
- Output polygons for visualization and area metrics.
Implementation:
- Use geospatial offset operations (e.g., turf.js buffer and difference, or backend GIS functions) to compute the buildable polygon.

#### 2.4.7 FAR and Floors Calculator Module

Responsibilities:
- Given FAR/FSI and plot area, compute total permissible built-up area.
- Divide by buildable footprint area to estimate maximum number of floors, capped by height rules.
- Provide summary numbers for UI.
Implementation:
- Simple arithmetic functions, integrated into backend API.

#### 2.4.8 Infographic Generation Module

Responsibilities:
- Aggregate results from all modules into a site-analysis data structure.
- Drive a presentational layer that renders panels (topography, access, wind, sun, views, circulation, noise, existing structures, etc.) based on that data.
Implementation:
- Design UI components for each panel that map quantitative data to simple lines/arrows/shapes.
### 2.5 Non-Functional Requirements
- **Performance**: Initial results for a new site should be returned within a few seconds, assuming external API responsiveness and cached data when possible.[^1][^4]
- **Scalability**: Back-end must handle concurrent users and rate-limited external APIs by queuing or caching.
- **Reliability**: Graceful degradation when an external API fails (e.g., fall back to default wind direction assumptions or generic FAR rules).
- **Security**: Secure handling of API keys and user data; no exposure of confidential bye-law interpretations.
- **Compliance**: Clear disclaimer that outputs are indicative and not legally binding.
### 2.6 Implementation Phasing
**Phase 1 – Minimal Viable Tool**
- Plot drawing and geometry.
- Manual road width input via bubbles.
- Hard-coded bye-law rules for one city (e.g., Patna or another priority city), manually curated from official documents.[^21]
- Basic setbacks and FAR calculation, green/red footprint visualization.

**Phase 2 – Environmental Context and Expansion**
- Integrate elevation and topography module.[^4][^5]
- Integrate simple sun and wind modules using meteoblue and solar algorithms.[^1][^9][^10]
- Add support for additional cities using Infralens DCR tables and curated bye-laws.[^2][^3][^12]

**Phase 3 – Advanced Automation**
- Integrate building footprint detection via segmentation models.[^7]
- Expand RAG engine and rule consolidation for a broader set of jurisdictions.
- Refine site-analysis infographics and add export formats for architects.

---

## References

1. [History & Climate Data | Technical Documentation - meteoblue](https://docs.meteoblue.com/en/weather-apis/history-api/history-and-climate-data) - The Climate Wind Rose data package contains historical data of wind speed and direction over 30 year...

2. [Building Bye-laws | NAREDCO](https://naredco.in/building-bye-laws)

3. [DCR & Building Bye-laws — Setbacks, FSI by Indian City ...](https://infralens.in/dcr) - Setbacks, FSI/FAR, building height — by city, by plot size, by road width. From official ULB sources...

4. [Get started | Elevation API](https://developers.google.com/maps/documentation/elevation/start) - The Elevation API provides elevation data for all locations on the surface of the earth, including o...

5. [Mapbox Terrain-RGB v1 | Tilesets](https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-rgb-v1/) - Reference documentation for the Mapbox Terrain-RGB v1 raster tileset containing global elevation dat...

6. [Access elevation data | Tilesets | Mapbox Docs](https://docs.mapbox.com/data/tilesets/guides/access-elevation-data/) - Learn how to access elevation data in Mapbox tilesets.

7. [GitHub - PriyanK7n/SatFootprint: Satellite Foot Print Detection Using Instance Segmentation](https://github.com/PriyanK7n/SatFootprint) - Satellite Foot Print Detection Using Instance Segmentation - GitHub - PriyanK7n/SatFootprint: Satell...

8. [History & Climate Images | Technical Documentation](https://docs.meteoblue.com/en/weather-apis/images-api/history-and-climate-images) - Wind Rose​. Displays the frequency and direction of winds at a specific location based on climate mo...

9. [PD: 3D Sun-Path](https://andrewmarsh.com/apps/staging/sunpath3d.html) - SUN-PATH SETTINGS×. Indicators. Sun Position. Sun Direction. Sun Angles. Shadows. Path Lines. Curren...

10. [AJM - Earth and Sun](https://andrewmarsh.com/software/app-earthsun/) - The app basically displays a Sun-path diagram at any location on the surface of the Earth, shown as ...

11. [How to use AndrewMarsh.com Sunpath Diagram](https://www.youtube.com/watch?v=-LBq8_gBohA) - Hello this is a little Tutorial on how to use the Sunpath Diagram "2D Sun Path" from http://andrewma...

12. [Official Website of Town And Country Planning Department , Uttar Pradesh, India. / Acts / Rules / Building Bye laws](https://uptownplanning.gov.in/page/en/model-building-bye-laws) - This is the official Website of Uttar Pradesh Town and Country Planning Department that provides onl...

13. [BBMP: Building Bye-Laws 2003 - Dataset](https://data.opencity.in/dataset/bbmp-building-bye-laws-2003)

14. [Building Bye Laws - UDH Department - Rajasthan](https://udh.rajasthan.gov.in/content/raj/udh/udh-department/en/building-bye-laws0.html) - Building Bye Laws ; 3, Mount Abu Building Bye Laws - 2019, Click to View ; 4, Jaisalmer Building Bye...

15. [Elevation API Usage and Billing](https://developers.google.com/maps/documentation/elevation/usage-and-billing) - To use the Elevation API, you must enable billing on each of your projects and include an API key or...

16. [Elevation Service | Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/elevation)

17. [Tổng quan về Elevation API - Google for Developers](https://developers.google.com/maps/documentation/elevation/overview?hl=vi) - Nhận dữ liệu độ cao cho tất cả vị trí trên bề mặt trái đất. Tìm hiểu về cách tùy chỉnh đầu ra và đọc...

18. [Create an Elevation Profile Tool Using the Mapbox Terrain-RGB Tileset](https://www.line-45.com/post/create-elevation-profile-tool-using-mapbox-terrain-rgb-tileset) - We share how we created an elevation profile tool for a Mapbox GL JS map.

19. [New meteogram and data package: Climate Wind Rose | Technical Documentation](https://docs.meteoblue.com/blog/new-meteogram-and-data-package-climate-wind-rose) - New meteogram and data package available through the meteoblue Image API (History & Climate Images) ...

20. [Unified Building Bye-laws for Delhi 2016 - CKAN - OpenCity](https://data.opencity.in/dataset/delhi-construction-bye-laws/resource/9d86bd0c-5d7c-48a1-9ca4-a97205241ee5) - Unified building bye-laws for Delhi includes amendments till 2020.

21. [Microsoft Word - bye laws 2008 english12.2.2021](https://upload.indiacode.nic.in/showfile?actid=AC_UP_88_471_00001_00001_1561527908604&type=rule&filename=building_bye_laws_2008.pdf)

