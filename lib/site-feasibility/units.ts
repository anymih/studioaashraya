/**
 * Unit Conversion Helpers (Drawing Editor)
 *
 * Internal storage always uses meters. These helpers convert for display only.
 * No browser storage is used.
 */

export type DrawingUnit = 'm' | 'ft';

/** 1 meter = 3.28084 feet */
export const FEET_PER_METER = 3.28084;

/**
 * Converts a value in meters to the target display unit.
 */
export function metersToUnit(meters: number, unit: DrawingUnit): number {
  if (unit === 'ft') return meters * FEET_PER_METER;
  return meters;
}

/**
 * Formats a length value (stored in meters) for display.
 * Example: formatLength(12.3, 'm') → "12.3 m"
 * Example: formatLength(12.3, 'ft') → "40.4 ft"
 */
export function formatLength(meters: number, unit: DrawingUnit): string {
  const converted = metersToUnit(meters, unit);
  return `${converted.toFixed(1)} ${unit}`;
}

/**
 * Short-form label for tight SVG labels.
 * Example: formatLengthShort(12.3, 'm') → "12.3m"
 * Example: formatLengthShort(12.3, 'ft') → "40.4ft"
 */
export function formatLengthShort(meters: number, unit: DrawingUnit): string {
  const converted = metersToUnit(meters, unit);
  return `${converted.toFixed(1)}${unit}`;
}

/**
 * Applies orthogonal constraint: snaps the candidate point so that the segment
 * from `anchor` to the returned point is axis-aligned (0°, 90°, 180°, 270°).
 *
 * Tie-break rule: when |dx| === |dy|, horizontal (x-axis) wins.
 */
export function applyOrthoConstraint(
  anchor: { x: number; y: number },
  candidate: { x: number; y: number }
): { x: number; y: number } {
  const dx = Math.abs(candidate.x - anchor.x);
  const dy = Math.abs(candidate.y - anchor.y);

  if (dx >= dy) {
    // Horizontal lock — snap y to anchor
    return { x: candidate.x, y: anchor.y };
  }
  // Vertical lock — snap x to anchor
  return { x: anchor.x, y: candidate.y };
}

/**
 * Applies grid snapping (1 m grid) to a coordinate.
 */
export function applyGridSnap(coord: { x: number; y: number }): { x: number; y: number } {
  return {
    x: Math.round(coord.x),
    y: Math.round(coord.y),
  };
}
