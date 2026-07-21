/**
 * OCR Utilities (Slice 6 — Document Text Detection & Extraction)
 *
 * Provides functions to:
 *   1. Detect whether a PDF contains selectable text (text PDF) or is
 *      a scanned image (requires OCR).
 *   2. Extract raw text from text PDFs using lightweight heuristics.
 *   3. Route scanned PDFs/images through an OCR pipeline stub.
 *
 * Phase 1 implementation:
 *   - Text detection uses a byte-signature heuristic (checks for /Type /Page
 *     streams with text operators like Tj, TJ, Tf).
 *   - OCR is a placeholder that returns a structured stub; full Tesseract.js
 *     integration is deferred to Phase 2.
 *   - The extraction pipeline returns raw text that downstream LLM processing
 *     can parse into the evidence-oriented JSON schema.
 */

import type { ExtractionMethod } from "./ingestion-types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TextExtractionResult {
  /** The extracted raw text content */
  rawText: string;
  /** How the text was obtained */
  method: ExtractionMethod;
  /** Estimated page count (best-effort) */
  pageCount: number;
  /** Confidence in the text quality (0.0 to 1.0) */
  textConfidence: number;
}

// ---------------------------------------------------------------------------
// Text Detection Heuristic
// ---------------------------------------------------------------------------

/**
 * Checks whether a PDF buffer likely contains selectable text
 * by scanning for common PDF text-rendering operators.
 *
 * This is a lightweight heuristic — not a full PDF parser.
 * False negatives are possible for unusual PDF encodings.
 */
export function isPdfWithSelectableText(buffer: ArrayBuffer): boolean {
  const bytes = new Uint8Array(buffer);
  const sample = new TextDecoder("latin1").decode(bytes.slice(0, Math.min(bytes.length, 50000)));

  // Check for PDF header
  if (!sample.startsWith("%PDF")) return false;

  // Look for text-rendering operators commonly found in text PDFs
  const textOperators = [" Tj", " TJ", " Tf", "BT\n", "BT\r"];
  return textOperators.some((op) => sample.includes(op));
}

/**
 * Counts approximate pages in a PDF by counting /Type /Page occurrences.
 */
export function estimatePdfPageCount(buffer: ArrayBuffer): number {
  const bytes = new Uint8Array(buffer);
  const content = new TextDecoder("latin1").decode(bytes);
  const matches = content.match(/\/Type\s*\/Page[^s]/g);
  return matches ? matches.length : 1;
}

// ---------------------------------------------------------------------------
// Text Extraction (Direct Path)
// ---------------------------------------------------------------------------

/**
 * Extracts text directly from a text-based PDF buffer.
 *
 * Phase 1 implementation: extracts text between BT/ET blocks using
 * simple regex heuristics. This captures most plaintext content but
 * will miss complex encoded streams.
 *
 * A full pdf-parse library integration is recommended for Phase 2.
 */
export function extractTextFromPdf(buffer: ArrayBuffer): TextExtractionResult {
  const bytes = new Uint8Array(buffer);
  const content = new TextDecoder("latin1").decode(bytes);

  // Extract text between parentheses in Tj/TJ operators
  const textFragments: string[] = [];
  const tjPattern = /\(([^)]*)\)\s*Tj/g;
  let match: RegExpExecArray | null;

  while ((match = tjPattern.exec(content)) !== null) {
    const decoded = match[1]
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\\\/g, "\\")
      .replace(/\\([()])/g, "$1");
    textFragments.push(decoded);
  }

  const rawText = textFragments.join(" ").trim();
  const pageCount = estimatePdfPageCount(buffer);

  return {
    rawText: rawText || "[No extractable text found via direct parsing]",
    method: "text_direct",
    pageCount,
    textConfidence: rawText.length > 50 ? 0.85 : 0.4,
  };
}

// ---------------------------------------------------------------------------
// OCR Stub (Scanned PDF / Image Path)
// ---------------------------------------------------------------------------

/**
 * OCR extraction stub for scanned PDFs and images.
 *
 * Phase 1: Returns a placeholder result indicating OCR is required.
 * Phase 2: Will integrate Tesseract.js for actual character recognition.
 */
export async function extractTextViaOcr(
  buffer: ArrayBuffer,
  filename: string
): Promise<TextExtractionResult> {
  const pageCount = filename.toLowerCase().endsWith(".pdf")
    ? estimatePdfPageCount(buffer)
    : 1;

  // Phase 1 stub — no actual OCR processing
  return {
    rawText: `[OCR required for "${filename}". Tesseract.js integration deferred to Phase 2. ` +
      `Estimated ${pageCount} page(s). Manual review recommended.]`,
    method: "ocr",
    pageCount,
    textConfidence: 0.1, // Low confidence since OCR is stubbed
  };
}

// ---------------------------------------------------------------------------
// Unified Extraction Router
// ---------------------------------------------------------------------------

/**
 * Routes a document buffer through the appropriate extraction path:
 *   - Text PDFs → direct text extraction
 *   - Scanned PDFs / images → OCR pipeline (stubbed in Phase 1)
 */
export async function extractText(
  buffer: ArrayBuffer,
  filename: string
): Promise<TextExtractionResult> {
  const lowerName = filename.toLowerCase();
  const isPdf = lowerName.endsWith(".pdf");

  if (isPdf && isPdfWithSelectableText(buffer)) {
    return extractTextFromPdf(buffer);
  }

  // Scanned PDF or image → OCR path
  return extractTextViaOcr(buffer, filename);
}
