import { Point2D, PlotEdge } from "./types";
import { getPatnaResidentialFAR, estimateFloorCount, resolveJurisdictionSource } from "./byelaws";
import { applyOrthoConstraint, applyGridSnap, metersToUnit, formatLength } from "./units";

export function calculateDistance(p1: Point2D, p2: Point2D): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

/**
 * Calculates bearing from p1 to p2 in degrees (0 to 360).
 * 0 is North (Y-up), 90 is East (X-right), 180 is South (Y-down), 270 is West (X-left).
 */
export function calculateBearing(p1: Point2D, p2: Point2D): number {
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  
  // Math.atan2(dx, dy) gives angle from Y-axis clockwise.
  let bearing = Math.atan2(deltaX, deltaY) * (180 / Math.PI);
  if (bearing < 0) {
    bearing += 360;
  }
  return bearing;
}

export function calculatePolygonArea(vertices: Point2D[]): number {
  const n = vertices.length;
  if (n < 3) return 0;
  
  let area = 0;
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    area += vertices[i].x * vertices[next].y - vertices[next].x * vertices[i].y;
  }
  return Math.abs(area) / 2.0;
}

export function calculateSignedArea(vertices: Point2D[]): number {
  const n = vertices.length;
  if (n < 3) return 0;
  
  let area = 0;
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    area += vertices[i].x * vertices[next].y - vertices[next].x * vertices[i].y;
  }
  return area / 2.0;
}

export function calculatePolygonPerimeter(vertices: Point2D[], isClosed: boolean = true): number {
  const n = vertices.length;
  if (n < 2) return 0;
  
  let perimeter = 0;
  const limit = isClosed ? n : n - 1;
  for (let i = 0; i < limit; i++) {
    const next = (i + 1) % n;
    perimeter += calculateDistance(vertices[i], vertices[next]);
  }
  return perimeter;
}

/**
 * Converts local Cartesian coordinates (meters relative to a center point)
 * into a GeoJSON Polygon coordinate list.
 * 1 degree latitude ~ 111,139 meters.
 * 1 degree longitude ~ 111,139 * cos(latitude) meters.
 */
export function convertToGeoJSON(
  vertices: Point2D[],
  centerLat: number,
  centerLng: number
): { type: "Polygon"; coordinates: number[][][] } {
  if (vertices.length === 0) {
    return {
      type: "Polygon",
      coordinates: [[]]
    };
  }

  const latDegreeMeters = 111139.0;
  const cosLat = Math.cos(centerLat * Math.PI / 180.0);
  const lngDegreeMeters = latDegreeMeters * cosLat;

  const coords = vertices.map(v => {
    const deltaLat = v.y / latDegreeMeters;
    const deltaLng = v.x / lngDegreeMeters;
    return [centerLng + deltaLng, centerLat + deltaLat];
  });

  // Close the loop for GeoJSON standard
  if (coords.length > 0) {
    coords.push([...coords[0]]);
  }

  return {
    type: "Polygon",
    coordinates: [coords]
  };
}

/**
 * Standard Ray-Casting algorithm to check if a point is inside a polygon
 */
export function isPointInPolygon(point: Point2D, polygon: Point2D[]): boolean {
  const n = polygon.length;
  if (n < 3) return false;
  
  let inside = false;
  const x = point.x;
  const y = point.y;
  
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
 * Gets the unit outward normal vector for the edge p1 -> p2 of a polygon
 */
export function getEdgeOutwardNormal(
  p1: Point2D,
  p2: Point2D,
  polygon: Point2D[]
): Point2D {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return { id: "normal", x: 0, y: 0 };
  
  // Perpendicular vector pointing right
  const nx = dy / len;
  const ny = -dx / len;
  
  // Midpoint
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;
  
  // Test point
  const testPt: Point2D = {
    id: "test",
    x: midX + nx * 0.1,
    y: midY + ny * 0.1
  };
  
  const isInside = isPointInPolygon(testPt, polygon);
  const multiplier = isInside ? -1.0 : 1.0;
  
  return {
    id: "normal",
    x: nx * multiplier,
    y: ny * multiplier
  };
}

/**
 * Computes an offset point at a perpendicular distance from the midpoint of edge p1 -> p2,
 * guaranteed to point outwards from the polygon boundaries.
 */
export function calculateOutwardNormalOffset(
  p1: Point2D,
  p2: Point2D,
  polygon: Point2D[],
  distanceMeters: number
): Point2D {
  const normal = getEdgeOutwardNormal(p1, p2, polygon);
  
  // Midpoint
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;
  
  return {
    id: `offset-${p1.id}-${p2.id}`,
    x: midX + normal.x * distanceMeters,
    y: midY + normal.y * distanceMeters
  };
}

export interface SetbackClassification {
  setbacks: number[]; // Setback distance for each edge in vertices sequence
  types: ('front' | 'side' | 'rear')[]; // Classification type for each edge
  primaryRoadIndex: number;
  rearIndex: number;
}

/**
 * Classifies edges based on Patna Residential Bye-Laws:
 * 1. Road edges are Front Edges (1.5m if width < 9m, 3.0m if width >= 9m).
 * 2. Primary road is the first road edge in the vertices sequence.
 * 3. Rear edge is the non-road edge farthest from the primary road (1.5m setback).
 * 4. All other non-road edges are Side Edges (1.2m setback).
 */
export function classifyEdgeSetbacks(
  vertices: Point2D[],
  roadConfig: Record<string, { is_road_edge: boolean; road_width_m: number }>
): SetbackClassification {
  const n = vertices.length;
  const setbacks: number[] = new Array(n).fill(1.2); // Default to Side Setback
  const types: ('front' | 'side' | 'rear')[] = new Array(n).fill('side');
  
  if (n < 3) {
    return { setbacks, types, primaryRoadIndex: 0, rearIndex: -1 };
  }

  const getEdgeKey = (v1Id: string, v2Id: string): string => {
    const sorted = [v1Id, v2Id].sort();
    return `${sorted[0]}_${sorted[1]}`;
  };

  // 1. Identify all Front Edges
  let primaryRoadIndex = -1;
  for (let i = 0; i < n; i++) {
    const nextIndex = (i + 1) % n;
    const key = getEdgeKey(vertices[i].id, vertices[nextIndex].id);
    const config = roadConfig[key];
    
    if (config && config.is_road_edge) {
      types[i] = 'front';
      setbacks[i] = config.road_width_m >= 9.0 ? 3.0 : 1.5;
      if (primaryRoadIndex === -1) {
        primaryRoadIndex = i;
      }
    }
  }

  // If no road edges exist, default primary road to edge index 0
  if (primaryRoadIndex === -1) {
    primaryRoadIndex = 0;
  }

  // 2. Identify the Rear Edge
  // Calculate midpoint of the primary road edge
  const p1 = vertices[primaryRoadIndex];
  const p2 = vertices[(primaryRoadIndex + 1) % n];
  const primaryRoadMidX = (p1.x + p2.x) / 2;
  const primaryRoadMidY = (p1.y + p2.y) / 2;

  let maxDistance = -1;
  let rearIndex = -1;

  for (let i = 0; i < n; i++) {
    // Only check non-road edges for rear classification
    if (types[i] !== 'front') {
      const vCurr = vertices[i];
      const vNext = vertices[(i + 1) % n];
      const midX = (vCurr.x + vNext.x) / 2;
      const midY = (vCurr.y + vNext.y) / 2;
      
      const distance = Math.sqrt(
        Math.pow(midX - primaryRoadMidX, 2) + Math.pow(midY - primaryRoadMidY, 2)
      );
      
      if (distance > maxDistance) {
        maxDistance = distance;
        rearIndex = i;
      }
    }
  }

  // Assign Rear Setback (1.5m)
  if (rearIndex !== -1) {
    types[rearIndex] = 'rear';
    setbacks[rearIndex] = 1.5;
  }

  return {
    setbacks,
    types,
    primaryRoadIndex,
    rearIndex
  };
}

export interface BuildableFootprintResult {
  buildableVertices: Point2D[];
  setbackDistances: number[];
  setbackTypes: ('front' | 'side' | 'rear')[];
  isValid: boolean;
}

/**
 * Insets the polygon boundary inward based on the edge setback requirements.
 * Intersects inward offset lines. Fallback direct projection when D is close to 0.
 */
export function calculateBuildableFootprint(
  vertices: Point2D[],
  roadConfig: Record<string, { is_road_edge: boolean; road_width_m: number }>
): BuildableFootprintResult {
  const n = vertices.length;
  if (n < 3) {
    return { buildableVertices: [], setbackDistances: [], setbackTypes: [], isValid: false };
  }

  // 1. Get classified setback distances for each edge
  const { setbacks, types } = classifyEdgeSetbacks(vertices, roadConfig);

  const buildableVertices: Point2D[] = [];
  const normals: Point2D[] = [];

  // Calculate unit outward normal vectors for all edges
  for (let i = 0; i < n; i++) {
    const nextIndex = (i + 1) % n;
    normals.push(getEdgeOutwardNormal(vertices[i], vertices[nextIndex], vertices));
  }

  // 2. Intersect offset lines to compute inset vertex coordinates
  for (let i = 0; i < n; i++) {
    const prevIndex = (i - 1 + n) % n;
    const vCurr = vertices[i]; // Shared vertex between edge prevIndex and edge i
    
    const n1 = normals[prevIndex]; // normal for edge i-1
    const n2 = normals[i];         // normal for edge i
    
    const dPrev = setbacks[prevIndex];
    const dCurr = setbacks[i];
    
    // Equations: 
    // n1.x * x + n1.y * y = C_prev
    // n2.x * x + n2.y * y = C_curr
    const cPrev = n1.x * vCurr.x + n1.y * vCurr.y - dPrev;
    const cCurr = n2.x * vCurr.x + n2.y * vCurr.y - dCurr;
    
    const D = n1.x * n2.y - n1.y * n2.x;
    
    let xOffset = 0;
    let yOffset = 0;

    if (Math.abs(D) < 1e-6) {
      // Adjacent lines are parallel or nearly parallel, fallback direct projection
      xOffset = vCurr.x - dCurr * n2.x;
      yOffset = vCurr.y - dCurr * n2.y;
    } else {
      // Cramer's rule solver
      xOffset = (cPrev * n2.y - cCurr * n1.y) / D;
      yOffset = (n1.x * cCurr - n2.x * cPrev) / D;
    }

    buildableVertices.push({
      id: `bv_${vCurr.id}`,
      x: xOffset,
      y: yOffset
    });
  }

  // 3. Validation: check if the inset polygon is collapsed or inverted
  const originalSignedArea = calculateSignedArea(vertices);
  const buildableSignedArea = calculateSignedArea(buildableVertices);
  
  const originalArea = Math.abs(originalSignedArea);
  const buildableArea = Math.abs(buildableSignedArea);

  // Winding order check: if signs of area are different, the polygon inverted (collapsed / self-intersected)
  const orientationInverted = (originalSignedArea > 0 && buildableSignedArea < 0) || 
                              (originalSignedArea < 0 && buildableSignedArea > 0);
  
  const isValid = !orientationInverted && buildableArea >= 1.0;

  return {
    buildableVertices: isValid ? buildableVertices : [],
    setbackDistances: setbacks,
    setbackTypes: types,
    isValid
  };
}

export interface UnitTestResult {
  name: string;
  passed: boolean;
  expected: string;
  actual: string;
}

export function runGeometryUnitTests(): UnitTestResult[] {
  const results: UnitTestResult[] = [];

  // Helper to round for float comparison
  const round = (num: number, dec: number = 2) => Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);

  // 1. Square Plot
  const squareVertices: Point2D[] = [
    { id: "v1", x: 0, y: 0 },
    { id: "v2", x: 10, y: 0 },
    { id: "v3", x: 10, y: 10 },
    { id: "v4", x: 0, y: 10 }
  ];
  
  const squareArea = calculatePolygonArea(squareVertices);
  const squarePerimeter = calculatePolygonPerimeter(squareVertices);
  const sqBearings = [
    calculateBearing(squareVertices[0], squareVertices[1]),
    calculateBearing(squareVertices[1], squareVertices[2]),
    calculateBearing(squareVertices[2], squareVertices[3]),
    calculateBearing(squareVertices[3], squareVertices[0])
  ];

  results.push({
    name: "Square Area",
    passed: round(squareArea) === 100,
    expected: "100.00",
    actual: squareArea.toFixed(2)
  });
  results.push({
    name: "Square Perimeter",
    passed: round(squarePerimeter) === 40,
    expected: "40.00",
    actual: squarePerimeter.toFixed(2)
  });
  results.push({
    name: "Square Bearings",
    passed: round(sqBearings[0]) === 90 && round(sqBearings[1]) === 0 && round(sqBearings[2]) === 270 && round(sqBearings[3]) === 180,
    expected: "90, 0, 270, 180",
    actual: `${round(sqBearings[0])}, ${round(sqBearings[1])}, ${round(sqBearings[2])}, ${round(sqBearings[3])}`
  });

  // 2. Right-Angled Triangle Plot
  const triangleVertices: Point2D[] = [
    { id: "v1", x: 0, y: 0 },
    { id: "v2", x: 3, y: 0 },
    { id: "v3", x: 3, y: 4 }
  ];
  const triArea = calculatePolygonArea(triangleVertices);
  const triPerimeter = calculatePolygonPerimeter(triangleVertices);
  const triHypBearing = calculateBearing(triangleVertices[2], triangleVertices[0]);

  results.push({
    name: "Triangle Area",
    passed: round(triArea) === 6,
    expected: "6.00",
    actual: triArea.toFixed(2)
  });
  results.push({
    name: "Triangle Perimeter",
    passed: round(triPerimeter) === 12,
    expected: "12.00",
    actual: triPerimeter.toFixed(2)
  });
  results.push({
    name: "Triangle Hypotenuse Bearing (Down-Left)",
    passed: round(triHypBearing) === 216.87,
    expected: "216.87",
    actual: triHypBearing.toFixed(2)
  });

  // 3. Irregular Quadrilateral
  const quadVertices: Point2D[] = [
    { id: "v1", x: 0, y: 0 },
    { id: "v2", x: 10, y: 0 },
    { id: "v3", x: 8, y: 8 },
    { id: "v4", x: 0, y: 6 }
  ];
  const quadArea = calculatePolygonArea(quadVertices);
  const quadPerimeter = calculatePolygonPerimeter(quadVertices);
  const quadBearings = [
    calculateBearing(quadVertices[0], quadVertices[1]),
    calculateBearing(quadVertices[1], quadVertices[2]),
    calculateBearing(quadVertices[2], quadVertices[3]),
    calculateBearing(quadVertices[3], quadVertices[0])
  ];

  results.push({
    name: "Irregular Quadrilateral Area",
    passed: round(quadArea) === 64,
    expected: "64.00",
    actual: quadArea.toFixed(2)
  });
  results.push({
    name: "Irregular Quadrilateral Perimeter",
    passed: round(quadPerimeter) === 32.49,
    expected: "32.49",
    actual: quadPerimeter.toFixed(2)
  });
  results.push({
    name: "Irregular Quadrilateral Bearings",
    passed: round(quadBearings[0]) === 90 && round(quadBearings[1]) === 345.96 && round(quadBearings[2]) === 255.96 && round(quadBearings[3]) === 180,
    expected: "90.00, 345.96, 255.96, 180.00",
    actual: `${quadBearings[0].toFixed(2)}, ${quadBearings[1].toFixed(2)}, ${quadBearings[2].toFixed(2)}, ${quadBearings[3].toFixed(2)}`
  });

  // 4. Ray-Casting point-in-polygon tests
  const insidePt: Point2D = { id: "test", x: 5, y: 5 };
  const outsidePt: Point2D = { id: "test", x: 15, y: 5 };
  const isInside = isPointInPolygon(insidePt, squareVertices);
  const isOutside = !isPointInPolygon(outsidePt, squareVertices);

  results.push({
    name: "PIP Inside (5,5)",
    passed: isInside === true,
    expected: "true",
    actual: String(isInside)
  });
  results.push({
    name: "PIP Outside (15,5)",
    passed: isOutside === true,
    expected: "true",
    actual: String(!isOutside)
  });

  // 5. Outward normal tests
  const bottomNormal = calculateOutwardNormalOffset(squareVertices[0], squareVertices[1], squareVertices, 5); // (0,0) -> (10,0) offset 5m
  const topNormal = calculateOutwardNormalOffset(squareVertices[2], squareVertices[3], squareVertices, 5); // (10,10) -> (0,10) offset 5m
  
  results.push({
    name: "Outward Normal (Bottom Edge)",
    passed: round(bottomNormal.x) === 5 && round(bottomNormal.y) === -5,
    expected: "(5.00, -5.00)",
    actual: `(${bottomNormal.x.toFixed(2)}, ${bottomNormal.y.toFixed(2)})`
  });

  results.push({
    name: "Outward Normal (Top Edge)",
    passed: round(topNormal.x) === 5 && round(topNormal.y) === 15,
    expected: "(5.00, 15.00)",
    actual: `(${topNormal.x.toFixed(2)}, ${topNormal.y.toFixed(2)})`
  });

  // 6. Setback Offset Test (Patna Residential Model - All Sides Side Setbacks = 1.2m)
  const emptyRoadConfig: Record<string, { is_road_edge: boolean; road_width_m: number }> = {};
  const setbackResult = calculateBuildableFootprint(squareVertices, emptyRoadConfig);
  const buildableArea = calculatePolygonArea(setbackResult.buildableVertices);
  
  // Setbacks 1.2m off all sides -> square becomes 7.6m x 7.6m -> area = 57.76
  results.push({
    name: "Patna Setbacks Area (1.2m offset)",
    passed: setbackResult.isValid && round(buildableArea) === 57.76,
    expected: "57.76",
    actual: buildableArea.toFixed(2)
  });

  // 7. Collapse Detection Test
  // For the same 10x10 square, make setback distances extremely large (6m on all sides)
  // Let's create mock road config with 20m width which sets 3m setbacks, plus configure custom large setbacks
  // Directly calling offset solver with large setbacks by creating custom bypass or checking collapse
  const smallSquare: Point2D[] = [
    { id: "s1", x: 0, y: 0 },
    { id: "s2", x: 2, y: 0 },
    { id: "s3", x: 2, y: 2 },
    { id: "s4", x: 0, y: 2 }
  ];
  // Small 2x2 square with 1.2m setbacks on all sides will collapse.
  const collapseResult = calculateBuildableFootprint(smallSquare, emptyRoadConfig);
  
  results.push({
    name: "Collapse Detection (2m x 2m square)",
    passed: collapseResult.isValid === false,
    expected: "false",
    actual: String(collapseResult.isValid)
  });

  // -----------------------------------------------------------------------
  // 8. FAR Lookup Tests (Patna Residential)
  // -----------------------------------------------------------------------
  const far100 = getPatnaResidentialFAR(100);   // < 250 → 2.0
  const far300 = getPatnaResidentialFAR(300);   // 250-500 → 2.5
  const far600 = getPatnaResidentialFAR(600);   // ≥ 500 → 3.0

  results.push({
    name: "FAR Lookup (100 m² → 2.0)",
    passed: far100 === 2.0,
    expected: "2.0",
    actual: far100.toFixed(1)
  });
  results.push({
    name: "FAR Lookup (300 m² → 2.5)",
    passed: far300 === 2.5,
    expected: "2.5",
    actual: far300.toFixed(1)
  });
  results.push({
    name: "FAR Lookup (600 m² → 3.0)",
    passed: far600 === 3.0,
    expected: "3.0",
    actual: far600.toFixed(1)
  });

  // -----------------------------------------------------------------------
  // 9. Floor Count Estimation Tests
  // -----------------------------------------------------------------------

  // 9a. 10×10 square (100 m²), FAR 2.0, buildable 57.76 m²
  //     Permissible = 200 m²  →  raw = 200 / 57.76 = 3.462  →  round 0.5 = 3.5  →  ≤ 4 cap → 3.5
  const floors_100 = estimateFloorCount(200, 57.76);
  results.push({
    name: "Floor Count (100 m² plot → 3.5)",
    passed: floors_100 === 3.5,
    expected: "3.5",
    actual: floors_100.toFixed(1)
  });

  // 9b. Large plot: 600 m², FAR 3.0, buildable 450 m²
  //     Permissible = 1800 m²  →  raw = 1800 / 450 = 4.0  →  round 0.5 = 4.0  →  cap 4 → 4.0
  const floors_600 = estimateFloorCount(1800, 450);
  results.push({
    name: "Floor Count (600 m² plot → 4.0 capped)",
    passed: floors_600 === 4.0,
    expected: "4.0",
    actual: floors_600.toFixed(1)
  });

  // 9c. Collapsed footprint (buildable < 1.0 m²) → 0 floors
  const floors_collapsed = estimateFloorCount(200, 0.5);
  results.push({
    name: "Floor Count (collapsed → 0)",
    passed: floors_collapsed === 0,
    expected: "0",
    actual: String(floors_collapsed)
  });

  // -----------------------------------------------------------------------
  // 10. Jurisdiction Resolution Tests (Slice 5)
  // -----------------------------------------------------------------------

  // 10a. Tier 1: Direct city match
  const res_patna = resolveJurisdictionSource("Patna").source;
  results.push({
    name: "Jurisdiction: Patna → City (High)",
    passed: res_patna.sourceType === "city" && res_patna.confidence === "High",
    expected: "city / High",
    actual: `${res_patna.sourceType} / ${res_patna.confidence}`
  });

  // 10b. Tier 1 with suffix stripping
  const res_patna_city = resolveJurisdictionSource("Patna City").source;
  results.push({
    name: "Jurisdiction: 'Patna City' → City (High)",
    passed: res_patna_city.sourceType === "city" && res_patna_city.confidence === "High",
    expected: "city / High",
    actual: `${res_patna_city.sourceType} / ${res_patna_city.confidence}`
  });

  // 10c. Tier 2a: Secondary city → state
  const res_gaya = resolveJurisdictionSource("Gaya").source;
  results.push({
    name: "Jurisdiction: Gaya → State (Medium)",
    passed: res_gaya.sourceType === "state" && res_gaya.confidence === "Medium" && res_gaya.state === "Bihar",
    expected: "state / Medium / Bihar",
    actual: `${res_gaya.sourceType} / ${res_gaya.confidence} / ${res_gaya.state}`
  });

  // 10d. Tier 2b: Direct state name match
  const res_karnataka = resolveJurisdictionSource("Karnataka").source;
  results.push({
    name: "Jurisdiction: Karnataka → State (Medium)",
    passed: res_karnataka.sourceType === "state" && res_karnataka.confidence === "Medium",
    expected: "state / Medium",
    actual: `${res_karnataka.sourceType} / ${res_karnataka.confidence}`
  });

  // 10e. Tier 3: Unknown input → National Fallback
  const res_ranchi = resolveJurisdictionSource("Ranchi").source;
  results.push({
    name: "Jurisdiction: Ranchi → Fallback (Low)",
    passed: res_ranchi.sourceType === "fallback" && res_ranchi.confidence === "Low",
    expected: "fallback / Low",
    actual: `${res_ranchi.sourceType} / ${res_ranchi.confidence}`
  });

  // -----------------------------------------------------------------------
  // 11. Ortho Constraint & Snapping Tests
  // -----------------------------------------------------------------------
  const anchor = { x: 10, y: 10 };
  
  // 11a. Ortho locking horizontal (dx > dy)
  const candidate_h = { x: 15, y: 12 }; // dx = 5, dy = 2
  const ortho_h = applyOrthoConstraint(anchor, candidate_h);
  results.push({
    name: "Ortho Lock: Horizontal (Y Snapped)",
    passed: ortho_h.x === 15 && ortho_h.y === 10,
    expected: "15,10",
    actual: `${ortho_h.x},${ortho_h.y}`,
  });

  // 11b. Ortho locking vertical (dy > dx)
  const candidate_v = { x: 11, y: 20 }; // dx = 1, dy = 10
  const ortho_v = applyOrthoConstraint(anchor, candidate_v);
  results.push({
    name: "Ortho Lock: Vertical (X Snapped)",
    passed: ortho_v.x === 10 && ortho_v.y === 20,
    expected: "10,20",
    actual: `${ortho_v.x},${ortho_v.y}`,
  });

  // 11c. Ortho tie-breaker (dx == dy)
  const candidate_tie = { x: 15, y: 15 }; // dx = 5, dy = 5
  const ortho_tie = applyOrthoConstraint(anchor, candidate_tie);
  results.push({
    name: "Ortho Lock: Tie-Break (Horizontal Wins)",
    passed: ortho_tie.x === 15 && ortho_tie.y === 10,
    expected: "15,10",
    actual: `${ortho_tie.x},${ortho_tie.y}`,
  });

  // 11d. Grid snap to nearest integer (applyGridSnap)
  const snap_p = applyGridSnap({ x: 12.34, y: 45.67 });
  results.push({
    name: "Grid Snap Nearest Integer",
    passed: snap_p.x === 12 && snap_p.y === 46,
    expected: "12,46",
    actual: `${snap_p.x},${snap_p.y}`,
  });

  // -----------------------------------------------------------------------
  // 12. Unit Conversion Displays
  // -----------------------------------------------------------------------
  const display_m = formatLength(10.0, "m");
  const display_ft = formatLength(10.0, "ft");
  results.push({
    name: "Display Units: Meters",
    passed: display_m === "10.0 m",
    expected: "10.0 m",
    actual: display_m,
  });
  results.push({
    name: "Display Units: Feet",
    passed: display_ft.startsWith("32.8") && display_ft.endsWith("ft"),
    expected: "32.8 ft",
    actual: display_ft,
  });

  return results;
}
