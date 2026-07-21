import {
  ByeLawSource,
  CITY_REGISTRY,
  SECONDARY_CITY_TO_STATE,
  STATE_REGISTRY,
  NATIONAL_FALLBACK,
  AMBIGUOUS_CITY_REGISTRY,
  LookupTrace,
} from "./registry";

/**
 * Patna Residential Bye-Law Rules (Hard-Coded for Phase 1)
 *
 * This module is intentionally decoupled from geometry.ts so that
 * future slices can swap in city-specific or RAG-retrieved rules
 * without touching the geometry solver.
 *
 * Current assumptions (Slice 4):
 *   - Use type: Residential
 *   - City: Patna, Bihar
 *   - FAR lookup by plot area bracket
 *   - Max building height: 15 m
 *   - Floor-to-floor height: 3.2 m  →  max 4 floors (G + 3)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FARResult {
  /** The applicable Floor Area Ratio value */
  far: number;
  /** Human-readable label for the FAR source */
  label: string;
  /** Permissible total built-up area in m² */
  permissibleAreaM2: number;
  /** Approximate maximum number of floors (rounded to nearest 0.5, capped at 4) */
  approxFloors: number;
  /** Whether the height cap was applied */
  isHeightCapped: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Standard residential floor-to-floor height in meters */
const FLOOR_HEIGHT_M = 3.2;

/** Maximum building height allowed under Patna residential rules */
const MAX_HEIGHT_M = 15.0;

/** Maximum floors derived from height cap: floor(15 / 3.2) = 4 */
const MAX_FLOORS = Math.floor(MAX_HEIGHT_M / FLOOR_HEIGHT_M);

// ---------------------------------------------------------------------------
// FAR Lookup
// ---------------------------------------------------------------------------

/**
 * Returns the applicable FAR for a Patna residential plot based on plot area.
 *
 * Rule table:
 *   Plot Area < 250 m²  →  FAR = 2.0
 *   250 m² ≤ Plot Area < 500 m²  →  FAR = 2.5
 *   Plot Area ≥ 500 m²  →  FAR = 3.0
 */
export function getPatnaResidentialFAR(plotAreaM2: number): number {
  if (plotAreaM2 < 250) return 2.0;
  if (plotAreaM2 < 500) return 2.5;
  return 3.0;
}

// ---------------------------------------------------------------------------
// Floor Count Estimation
// ---------------------------------------------------------------------------

/**
 * Estimates the approximate maximum number of floors.
 *
 * Formula:
 *   raw = permissibleAreaM2 / buildableAreaM2
 *
 * Rounding:
 *   Rounded to the nearest 0.5 increment.
 *   e.g. 2.3 → 2.5,  3.1 → 3.0,  3.75 → 4.0
 *
 * Cap:
 *   Maximum of 4.0 floors (15 m height / 3.2 m floor-to-floor).
 *
 * Guards:
 *   Returns 0 if buildableAreaM2 < 1.0 m² (collapsed or invalid footprint).
 */
export function estimateFloorCount(
  permissibleAreaM2: number,
  buildableAreaM2: number
): number {
  if (buildableAreaM2 < 1.0) return 0;

  const raw = permissibleAreaM2 / buildableAreaM2;

  // Round to nearest 0.5
  const rounded = Math.round(raw * 2) / 2;

  // Cap at maximum floors
  return Math.min(rounded, MAX_FLOORS);
}

// ---------------------------------------------------------------------------
// Composite Helper
// ---------------------------------------------------------------------------

/**
 * Computes the full FAR result for a Patna residential plot.
 * This is the single entry point that page.tsx should call.
 */
export function calculateFARResult(
  plotAreaM2: number,
  buildableAreaM2: number,
  isBuildableValid: boolean
): FARResult {
  const far = getPatnaResidentialFAR(plotAreaM2);
  const permissibleAreaM2 = plotAreaM2 * far;

  if (!isBuildableValid || buildableAreaM2 < 1.0) {
    return {
      far,
      label: `${far.toFixed(1)} (Patna Residential)`,
      permissibleAreaM2,
      approxFloors: 0,
      isHeightCapped: false,
    };
  }

  const rawFloors = permissibleAreaM2 / buildableAreaM2;
  const roundedFloors = Math.round(rawFloors * 2) / 2;
  const cappedFloors = Math.min(roundedFloors, MAX_FLOORS);
  const isHeightCapped = roundedFloors > MAX_FLOORS;

  return {
    far,
    label: `${far.toFixed(1)} (Patna Residential)`,
    permissibleAreaM2,
    approxFloors: cappedFloors,
    isHeightCapped,
  };
}

// ---------------------------------------------------------------------------
// Jurisdiction Resolution (Slice 5)
// ---------------------------------------------------------------------------

/** Suffixes to strip from user input during normalization */
const STRIP_SUFFIXES = [
  "city",
  "town",
  "nagar",
  "authority",
  "corporation",
  "municipal",
  "development",
  "district",
];

/**
 * Normalizes a raw user query into a trimmed, lowercase, suffix-stripped key.
 *
 * Examples:
 *   "Patna City"  →  "patna"
 *   "  BENGALURU " →  "bengaluru"
 *   "Lucknow Development Authority" → "lucknow"
 */
export function normalizeJurisdictionQuery(raw: string): string {
  let normalized = raw.trim().toLowerCase();

  // Strip known suffixes iteratively (handles multi-word like "development authority")
  let changed = true;
  while (changed) {
    changed = false;
    for (const suffix of STRIP_SUFFIXES) {
      if (normalized.endsWith(` ${suffix}`)) {
        normalized = normalized.slice(0, -(suffix.length + 1)).trim();
        changed = true;
      }
    }
  }

  return normalized;
}

/**
 * Resolves a user-supplied city/state query into a ByeLawSource and a LookupTrace.
 *
 * Resolution tiers (strict priority):
 *   1. Normalization & Alias resolution
 *   2. City Registry exact match → Official City Source (High)
 *   3. Ambiguous City Registry match → Ambiguity flag & State Fallback (Medium)
 *   4. Secondary-City-to-State map → Official State Source (Medium)
 *   5. Direct state name match → Official State Source (Medium)
 *   6. National Fallback → Curated National Fallback Reference (Low)
 */
export function resolveJurisdictionSource(rawQuery: string): { source: ByeLawSource; trace: LookupTrace } {
  const defaultTrace = (msg: string): LookupTrace => ({
    cityQueried: rawQuery,
    cityNormalized: "",
    cityFound: false,
    stateFound: false,
    fallbackUsed: true,
    tier: 3,
    message: msg,
  });

  if (!rawQuery || rawQuery.trim().length === 0) {
    return {
      source: { ...NATIONAL_FALLBACK },
      trace: defaultTrace("Empty query entered — using national reference fallback"),
    };
  }

  const normalized = normalizeJurisdictionQuery(rawQuery);
  let resolvedKey = normalized;
  let aliasResolved: string | undefined = undefined;

  // 1. Alias Resolution
  // Scan ambiguous registry first for aliases
  for (const entry of Object.values(AMBIGUOUS_CITY_REGISTRY)) {
    if (entry.aliases.includes(normalized)) {
      resolvedKey = entry.normalizedKey;
      aliasResolved = normalized;
      break;
    }
  }

  // Set up base trace
  const trace: LookupTrace = {
    cityQueried: rawQuery,
    cityNormalized: normalized,
    aliasResolved,
    cityFound: false,
    stateFound: false,
    fallbackUsed: false,
    tier: 1,
    message: "",
  };

  // 2. Tier 1: City-level official source
  if (CITY_REGISTRY[resolvedKey]) {
    const source = { ...CITY_REGISTRY[resolvedKey] };
    trace.cityFound = true;
    trace.tier = 1;
    trace.message = `City source found: ${source.jurisdictionName} → ${source.authority} (Official City Source)`;
    return { source, trace };
  }

  // 3. Tier 2a (Special): Ambiguous City Registry match
  if (AMBIGUOUS_CITY_REGISTRY[resolvedKey]) {
    const entry = AMBIGUOUS_CITY_REGISTRY[resolvedKey];
    trace.authorityAmbiguous = true;
    trace.knownAuthorities = entry.knownAuthorities;
    trace.disambiguationNote = entry.disambiguationNote;

    const stateKey = entry.stateSourceKey;
    if (STATE_REGISTRY[stateKey]) {
      const source = {
        ...STATE_REGISTRY[stateKey],
        jurisdictionName: `${entry.state} State (${entry.normalizedKey.toUpperCase()} Interim)`,
      };
      trace.stateFound = true;
      trace.tier = 2;
      trace.message = `${entry.normalizedKey.toUpperCase()} local authority unresolved — fell back to ${entry.state} State (DTCP)`;
      return { source, trace };
    }
  }

  // 4. Tier 2b: Secondary city → parent state → state source
  const parentState = SECONDARY_CITY_TO_STATE[resolvedKey];
  if (parentState) {
    const stateKey = parentState.toLowerCase();
    if (STATE_REGISTRY[stateKey]) {
      const source = {
        ...STATE_REGISTRY[stateKey],
        // Override jurisdictionName to show the queried city context
        jurisdictionName: `${rawQuery.trim()} (${parentState} State)`,
      };
      trace.stateFound = true;
      trace.tier = 2;
      trace.message = `City source not found for ${rawQuery.trim()} — fell back to ${parentState} State (DTCP)`;
      return { source, trace };
    }
  }

  // 5. Tier 2c: Direct state name match
  if (STATE_REGISTRY[resolvedKey]) {
    const source = { ...STATE_REGISTRY[resolvedKey] };
    trace.stateFound = true;
    trace.tier = 2;
    trace.message = `State source matched directly: ${source.jurisdictionName} (${source.authority})`;
    return { source, trace };
  }

  // 6. Tier 3: Curated National Fallback Reference
  const fallbackSource = {
    ...NATIONAL_FALLBACK,
    jurisdictionName: `${rawQuery.trim()} (National Reference)`,
  };
  trace.fallbackUsed = true;
  trace.tier = 3;
  trace.message = `No city or state source found for '${rawQuery.trim()}' — using TCPO Model Building Bye-Laws 2016 as national reference`;
  return {
    source: fallbackSource,
    trace,
  };
}

// ---------------------------------------------------------------------------
// Unit Tests (Scope C)
// ---------------------------------------------------------------------------

export interface ByeLawTestResult {
  name: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export function runByeLawUnitTests(): ByeLawTestResult[] {
  const results: ByeLawTestResult[] = [];

  const runTest = (name: string, query: string, evalFn: (res: { source: ByeLawSource; trace: LookupTrace }) => { expected: string; actual: string; passed: boolean }) => {
    const out = resolveJurisdictionSource(query);
    const evalRes = evalFn(out);
    results.push({
      name,
      expected: evalRes.expected,
      actual: evalRes.actual,
      passed: evalRes.passed,
    });
  };

  // 1. Patna - Tier 1
  runTest("Patna Source Resolution", "Patna", (res) => ({
    expected: "city / Patna / High / true",
    actual: `${res.source.sourceType} / ${res.source.jurisdictionName} / ${res.source.confidence} / ${res.trace.cityFound}`,
    passed: res.source.sourceType === "city" && res.source.jurisdictionName === "Patna" && res.trace.cityFound === true,
  }));

  // 2. Gurugram - Ambiguity detection + state fallback
  runTest("Gurugram Ambiguity Resolution", "Gurugram", (res) => ({
    expected: "state / Haryana State (GURUGRAM Interim) / Medium / true / true",
    actual: `${res.source.sourceType} / ${res.source.jurisdictionName} / ${res.source.confidence} / ${res.trace.authorityAmbiguous} / ${res.trace.stateFound}`,
    passed:
      res.source.sourceType === "state" &&
      res.source.confidence === "Medium" &&
      res.trace.authorityAmbiguous === true &&
      res.trace.stateFound === true,
  }));

  // 3. Gurgaon - Alias resolution
  runTest("Gurgaon Alias Resolution", "Gurgaon", (res) => ({
    expected: "gurugram / true",
    actual: `${res.trace.aliasResolved} / ${res.trace.authorityAmbiguous}`,
    passed: res.trace.aliasResolved === "gurgaon" && res.trace.authorityAmbiguous === true,
  }));

  // 4. Karnal - Secondary city fallback to State
  runTest("Karnal Secondary City State Fallback", "Karnal", (res) => ({
    expected: "state / Karnal (Haryana State) / Medium",
    actual: `${res.source.sourceType} / ${res.source.jurisdictionName} / ${res.source.confidence}`,
    passed:
      res.source.sourceType === "state" &&
      res.source.jurisdictionName.includes("Haryana State") &&
      res.source.confidence === "Medium" &&
      res.trace.cityFound === false,
  }));

  // 5. Unknown location - National Fallback
  runTest("Unknown Location Fallback", "UnknownVillageXYZ", (res) => ({
    expected: "fallback / Low / true",
    actual: `${res.source.sourceType} / ${res.source.confidence} / ${res.trace.fallbackUsed}`,
    passed: res.source.sourceType === "fallback" && res.source.confidence === "Low" && res.trace.fallbackUsed === true,
  }));

  // 6. Direct state match
  runTest("Direct State Name Match", "haryana", (res) => ({
    expected: "state / Haryana State / Medium",
    actual: `${res.source.sourceType} / ${res.source.jurisdictionName} / ${res.source.confidence}`,
    passed: res.source.sourceType === "state" && res.source.jurisdictionName === "Haryana State" && res.trace.stateFound === true,
  }));

  return results;
}

