/**
 * Bye-Law Source Registry (Slice 5 — Jurisdiction Input & Source Resolution)
 *
 * Static, in-memory lookup structures for resolving a user's city/state input
 * to the applicable official bye-law source.
 *
 * Resolution tiers:
 *   Tier 1 (City):    Direct match in CITY_REGISTRY → Official City Source
 *   Tier 2 (State):   Secondary city → state via SECONDARY_CITY_TO_STATE,
 *                     or direct state name match in STATE_REGISTRY
 *                     → Official State Source
 *   Tier 3 (Fallback): No match → Curated National Fallback Reference (TCPO)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SourceType = 'city' | 'state' | 'fallback';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface ByeLawSource {
  /** Display-friendly jurisdiction name (e.g., "Patna" or "Bihar State") */
  jurisdictionName: string;
  /** Indian state name */
  state: string;
  /** Country (always "India" for this slice) */
  country: string;
  /** Name of the issuing authority / document owner */
  authority: string;
  /** Resolution tier that produced this result */
  sourceType: SourceType;
  /** Link to the official document / authority site */
  sourceUrl: string;
  /** Resolution confidence based on tier */
  confidence: ConfidenceLevel;
  /** Human-readable provenance label for the UI */
  provenanceLabel: string;
  /** Whether a verified document source is catalogued and reachable */
  hasVerifiedDocument: boolean;
  /** Title of the official document */
  documentTitle?: string;
  /** Year of publication/version */
  documentYear?: string;
}

// ---------------------------------------------------------------------------
// Ambiguity Handling Types & Registry
// ---------------------------------------------------------------------------

export type AuthorityAmbiguityReason =
  | 'multiple_local_authorities'  // MCG / HSVP / DTCP all apply in different zones
  | 'zone_dependent'              // applicable authority varies by plot location / sector
  | 'licensed_colony'             // some areas governed by private developer / DLC
  | 'unverified_document';        // authority known but official document not catalogued

export interface AmbiguousJurisdictionEntry {
  normalizedKey: string;
  aliases: string[];
  state: string;
  ambiguityReason: AuthorityAmbiguityReason;
  knownAuthorities: string[];
  disambiguationNote: string;
  stateSourceKey: string;
}

export const AMBIGUOUS_CITY_REGISTRY: Record<string, AmbiguousJurisdictionEntry> = {
  gurugram: {
    normalizedKey: 'gurugram',
    aliases: ['gurgaon'],
    state: 'Haryana',
    ambiguityReason: 'multiple_local_authorities',
    knownAuthorities: [
      'MCG (Municipal Corporation of Gurugram)',
      'HSVP (Haryana Shehri Vikas Pradhikaran)',
      'DTCP Haryana',
      'Licensed Colony Developer / DLC',
    ],
    disambiguationNote:
      "Gurugram's applicable planning authority depends on the zone and sector of the plot. MCG governs older municipal areas, HSVP governs HUDA sectors, DTCP Haryana covers plotted colonies and licensed developments, and some areas fall under private developer DCPs. A plot-level authority determination is required before city-specific bye-laws can be applied. Haryana State Building Code used as interim reference.",
    stateSourceKey: 'haryana',
  },
};

// ---------------------------------------------------------------------------
// Tier 1: City-level official sources
// ---------------------------------------------------------------------------

export const CITY_REGISTRY: Record<string, ByeLawSource> = {
  patna: {
    jurisdictionName: "Patna",
    state: "Bihar",
    country: "India",
    authority: "Patna Metropolitan Region Development Authority (PMRDA)",
    sourceType: "city",
    sourceUrl: "https://udhd.bihar.gov.in/",
    confidence: "High",
    provenanceLabel: "Official City Source",
    hasVerifiedDocument: true,
    documentTitle: "Patna Planning Area Building Bye-laws 2014",
    documentYear: "2014",
  },
  bengaluru: {
    jurisdictionName: "Bengaluru",
    state: "Karnataka",
    country: "India",
    authority: "Bangalore Development Authority (BDA)",
    sourceType: "city",
    sourceUrl: "https://bdabangalore.org/",
    confidence: "High",
    provenanceLabel: "Official City Source",
    hasVerifiedDocument: false,
  },
  bangalore: {
    jurisdictionName: "Bengaluru",
    state: "Karnataka",
    country: "India",
    authority: "Bangalore Development Authority (BDA)",
    sourceType: "city",
    sourceUrl: "https://bdabangalore.org/",
    confidence: "High",
    provenanceLabel: "Official City Source",
    hasVerifiedDocument: false,
  },
  mumbai: {
    jurisdictionName: "Mumbai",
    state: "Maharashtra",
    country: "India",
    authority: "Municipal Corporation of Greater Mumbai (MCGM)",
    sourceType: "city",
    sourceUrl: "https://portal.mcgm.gov.in/",
    confidence: "High",
    provenanceLabel: "Official City Source",
    hasVerifiedDocument: false,
  },
  delhi: {
    jurisdictionName: "Delhi",
    state: "Delhi",
    country: "India",
    authority: "Delhi Development Authority (DDA)",
    sourceType: "city",
    sourceUrl: "https://dda.gov.in/",
    confidence: "High",
    provenanceLabel: "Official City Source",
    hasVerifiedDocument: false,
  },
  lucknow: {
    jurisdictionName: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    authority: "Lucknow Development Authority (LDA)",
    sourceType: "city",
    sourceUrl: "https://lda.up.gov.in/",
    confidence: "High",
    provenanceLabel: "Official City Source",
    hasVerifiedDocument: false,
  },
};

// ---------------------------------------------------------------------------
// Tier 2a: Explicit secondary-city-to-state map
// ---------------------------------------------------------------------------

/**
 * Maps known secondary cities (not in CITY_REGISTRY) to their parent state.
 * This enables deterministic Tier 2 resolution without guessing.
 */
export const SECONDARY_CITY_TO_STATE: Record<string, string> = {
  // Bihar
  gaya: "Bihar",
  muzaffarpur: "Bihar",
  bhagalpur: "Bihar",
  darbhanga: "Bihar",
  // Karnataka
  mysuru: "Karnataka",
  mysore: "Karnataka",
  hubli: "Karnataka",
  mangalore: "Karnataka",
  mangaluru: "Karnataka",
  // Maharashtra
  pune: "Maharashtra",
  nagpur: "Maharashtra",
  nashik: "Maharashtra",
  thane: "Maharashtra",
  // Uttar Pradesh
  noida: "Uttar Pradesh",
  kanpur: "Uttar Pradesh",
  agra: "Uttar Pradesh",
  varanasi: "Uttar Pradesh",
  // Delhi
  "new delhi": "Delhi",
  // Haryana
  karnal: "Haryana",
  faridabad: "Haryana",
  ambala: "Haryana",
  rohtak: "Haryana",
  panipat: "Haryana",
  hisar: "Haryana",
  sonipat: "Haryana",
};

// ---------------------------------------------------------------------------
// Tier 2b: State-level official sources
// ---------------------------------------------------------------------------

export const STATE_REGISTRY: Record<string, ByeLawSource> = {
  bihar: {
    jurisdictionName: "Bihar State",
    state: "Bihar",
    country: "India",
    authority: "Urban Development & Housing Department (UDHD), Bihar",
    sourceType: "state",
    sourceUrl: "https://udhd.bihar.gov.in/",
    confidence: "Medium",
    provenanceLabel: "Official State Source",
    hasVerifiedDocument: false,
  },
  karnataka: {
    jurisdictionName: "Karnataka State",
    state: "Karnataka",
    country: "India",
    authority: "Karnataka Town & Country Planning Department",
    sourceType: "state",
    sourceUrl: "https://dtcp.karnataka.gov.in/",
    confidence: "Medium",
    provenanceLabel: "Official State Source",
    hasVerifiedDocument: false,
  },
  maharashtra: {
    jurisdictionName: "Maharashtra State",
    state: "Maharashtra",
    country: "India",
    authority: "Maharashtra State Government — UDCPR",
    sourceType: "state",
    sourceUrl: "https://mohua.gov.in/",
    confidence: "Medium",
    provenanceLabel: "Official State Source",
    hasVerifiedDocument: false,
  },
  "uttar pradesh": {
    jurisdictionName: "Uttar Pradesh State",
    state: "Uttar Pradesh",
    country: "India",
    authority: "Town & Country Planning Dept, Uttar Pradesh",
    sourceType: "state",
    sourceUrl: "https://uptownplanning.gov.in/page/en/model-building-bye-laws",
    confidence: "Medium",
    provenanceLabel: "Official State Source",
    hasVerifiedDocument: false,
  },
  delhi: {
    jurisdictionName: "Delhi",
    state: "Delhi",
    country: "India",
    authority: "Delhi Development Authority (DDA)",
    sourceType: "state",
    sourceUrl: "https://dda.gov.in/",
    confidence: "Medium",
    provenanceLabel: "Official State Source",
    hasVerifiedDocument: false,
  },
  haryana: {
    jurisdictionName: "Haryana State",
    state: "Haryana",
    country: "India",
    authority: "Department of Town & Country Planning (DTCP), Haryana",
    sourceType: "state",
    sourceUrl: "https://tcpharyana.gov.in/",
    confidence: "Medium",
    provenanceLabel: "Official State Source",
    hasVerifiedDocument: true,
    documentTitle: "Haryana Building Code 2017",
    documentYear: "2017",
  },
};

// ---------------------------------------------------------------------------
// Tier 3: Curated National Fallback Reference
// ---------------------------------------------------------------------------

export const NATIONAL_FALLBACK: ByeLawSource = {
  jurisdictionName: "India (National Reference)",
  state: "—",
  country: "India",
  authority: "Town & Country Planning Organisation (TCPO), Ministry of Housing & Urban Affairs",
  sourceType: "fallback",
  sourceUrl: "https://mohua.gov.in/upload/uploadfiles/files/Model_Building_Byelaws-2016.pdf",
  confidence: "Low",
  provenanceLabel: "Curated National Fallback Reference",
  hasVerifiedDocument: true,
  documentTitle: "Model Building Bye-Laws 2016",
  documentYear: "2016",
};

// ---------------------------------------------------------------------------
// Lookup Trace Type
// ---------------------------------------------------------------------------

export interface LookupTrace {
  cityQueried: string;           // original user input
  cityNormalized: string;        // after normalization (lowercase, suffix-stripped)
  aliasResolved?: string;        // if an alias was matched, e.g. "gurgaon" → "gurugram"
  cityFound: boolean;            // true only if CITY_REGISTRY returned a verified entry
  authorityAmbiguous?: boolean;  // true if AMBIGUOUS_CITY_REGISTRY matched
  knownAuthorities?: string[];   // list of potential authorities (for ambiguous cities)
  disambiguationNote?: string;   // governance complexity explanation
  stateAttempted?: string;       // state key tried after city lookup failed/ambiguous
  stateFound: boolean;
  fallbackUsed: boolean;
  tier: 1 | 2 | 3;
  message: string;               // single human-readable sentence for the UI
}

// ---------------------------------------------------------------------------
// Autocomplete suggestions (for UI quick-select buttons)
// ---------------------------------------------------------------------------

export const SUGGESTED_CITIES: string[] = [
  "Patna",
  "Gurugram",
  "Karnal",
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Lucknow",
];

