/**
 * Ingestion API Route (Slice 6 — Document Ingestion & Extraction)
 *
 * POST /api/ingest
 *   Body: multipart/form-data with:
 *     - file: the PDF or image to ingest
 *     - sourceUrl: (optional) resolved source URL the file was fetched from
 *
 * Flow:
 *   1. Accept uploaded file
 *   2. Upload to Supabase Storage (production) or skip (development)
 *   3. Detect text PDF vs scanned → route through OCR
 *   4. Build evidence-oriented extraction result (stub LLM in Phase 1)
 *   5. Persist ingestion record with provenance
 *   6. Return the ingestion record for sandbox review
 *
 * GET /api/ingest
 *   Returns all ingestion records for sandbox display.
 *
 * PATCH /api/ingest
 *   Body: { id: string, status: VerificationStatus }
 *   Updates verification status. Review-only — does NOT affect calculator.
 */

import { NextRequest, NextResponse } from "next/server";
import { extractText } from "@/lib/site-feasibility/ocr";
import {
  saveIngestionRecord,
  uploadDocumentFile,
  listIngestionRecords,
  updateVerificationStatus,
} from "@/lib/site-feasibility/ingestion-store";
import type {
  IngestionRecord,
  ExtractedEvidence,
  VerificationStatus,
} from "@/lib/site-feasibility/ingestion-types";

// ---------------------------------------------------------------------------
// POST — Ingest a document
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const sourceUrl = (formData.get("sourceUrl") as string) || "manual_upload";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // 1. Read file buffer
    const buffer = await file.arrayBuffer();
    const filename = file.name;
    const contentType = file.type || "application/octet-stream";

    // 2. Upload to Supabase Storage (production) or null (development)
    let storagePath: string | null = null;
    try {
      storagePath = await uploadDocumentFile(buffer, filename, contentType);
    } catch (uploadErr) {
      console.warn("[ingest] Storage upload failed, continuing:", uploadErr);
    }

    // 3. Extract text (routes through text-direct or OCR path)
    const extraction = await extractText(buffer, filename);

    // 4. Build evidence-oriented extraction (Phase 1: stub LLM extraction)
    const evidence = buildEvidenceStub(extraction.rawText, filename);

    // 5. Determine confidence and verification status
    const confidenceScore = extraction.textConfidence;
    const verificationStatus: VerificationStatus =
      confidenceScore < 0.8 ? "pending_review" : "pending";

    // 6. Build and persist the ingestion record
    const record: IngestionRecord = {
      id: generateId(),
      sourceUrl,
      originalFilename: filename,
      extractedAt: new Date().toISOString(),
      confidenceScore,
      extractionMethod: extraction.method,
      verificationStatus,
      isVerified: false,
      evidence,
      storagePath,
    };

    await saveIngestionRecord(record);

    return NextResponse.json({ record }, { status: 201 });
  } catch (err) {
    console.error("[ingest] POST error:", err);
    return NextResponse.json(
      { error: "Ingestion failed" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GET — List all ingestion records
// ---------------------------------------------------------------------------

export async function GET(): Promise<NextResponse> {
  try {
    const records = await listIngestionRecords();
    return NextResponse.json({ records });
  } catch (err) {
    console.error("[ingest] GET error:", err);
    return NextResponse.json(
      { error: "Failed to list records" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PATCH — Update verification status (review-only, no calculator effect)
// ---------------------------------------------------------------------------

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { id, status } = body as { id: string; status: VerificationStatus };

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    const validStatuses: VerificationStatus[] = [
      "pending",
      "pending_review",
      "reviewed",
      "verified",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    await updateVerificationStatus(id, status);

    return NextResponse.json({ success: true, id, status });
  } catch (err) {
    console.error("[ingest] PATCH error:", err);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Generates a simple unique ID.
 * Uses crypto.randomUUID when available, falls back to timestamp-based.
 */
function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `ing_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Builds a stub evidence extraction from raw text.
 *
 * Phase 1: Uses keyword scanning to identify potential clause categories.
 * Phase 2: Will integrate LLM-based structured extraction.
 */
function buildEvidenceStub(
  rawText: string,
  filename: string
): ExtractedEvidence {
  const lines = rawText.split(/\n/).filter((l) => l.trim().length > 0);

  // Simple keyword scanning for clause categorization
  const setbackClauses = findClausesByKeywords(lines, [
    "setback",
    "set back",
    "set-back",
    "margin",
    "open space",
    "front yard",
    "rear yard",
    "side yard",
  ]);

  const farClauses = findClausesByKeywords(lines, [
    "far",
    "fsi",
    "floor area ratio",
    "floor space index",
    "built-up area",
    "built up area",
    "coverage",
  ]);

  const heightClauses = findClausesByKeywords(lines, [
    "height",
    "storey",
    "story",
    "floor",
    "maximum height",
    "building height",
  ]);

  const occupancyLabels = detectOccupancyLabels(rawText);

  return {
    documentMetadata: {
      title: filename.replace(/\.[^.]+$/, ""),
      year: detectYear(rawText) || "Unknown",
      jurisdiction: "Unknown (requires review)",
    },
    occupancyLabelsFound: occupancyLabels,
    setbackClauses,
    farClauses,
    heightClauses,
    statusSummary:
      lines.length > 0
        ? `Extracted ${lines.length} text lines. Found ${setbackClauses.length} setback, ${farClauses.length} FAR, and ${heightClauses.length} height clause(s). Manual review required.`
        : "No extractable text found. Document may be scanned — OCR processing required.",
  };
}

/**
 * Scans lines for keywords and returns matching clauses.
 */
function findClausesByKeywords(
  lines: string[],
  keywords: string[]
): { excerpt: string; referenceSection: string; pageNumber: number }[] {
  const results: { excerpt: string; referenceSection: string; pageNumber: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    const matchedKeyword = keywords.find((kw) => lower.includes(kw));

    if (matchedKeyword) {
      // Capture the matching line plus up to 2 following lines for context
      const excerpt = lines
        .slice(i, Math.min(i + 3, lines.length))
        .join(" ")
        .trim()
        .slice(0, 500); // Cap excerpt length

      results.push({
        excerpt,
        referenceSection: `Line ${i + 1} (keyword: "${matchedKeyword}")`,
        pageNumber: 1, // Phase 1: page detection deferred
      });

      // Skip the context lines to avoid duplicates
      i += 2;
    }

    // Cap at 10 clauses per category
    if (results.length >= 10) break;
  }

  return results;
}

/**
 * Detects occupancy/use type labels in the text.
 */
function detectOccupancyLabels(text: string): string[] {
  const labels: string[] = [];
  const lower = text.toLowerCase();

  const occupancyKeywords: Record<string, string> = {
    residential: "Residential",
    commercial: "Commercial",
    "mixed use": "Mixed Use",
    "mixed-use": "Mixed Use",
    industrial: "Industrial",
    institutional: "Institutional",
    "public/semi-public": "Public/Semi-Public",
    assembly: "Assembly",
    mercantile: "Mercantile",
  };

  for (const [keyword, label] of Object.entries(occupancyKeywords)) {
    if (lower.includes(keyword) && !labels.includes(label)) {
      labels.push(label);
    }
  }

  return labels;
}

/**
 * Attempts to detect a year from the text (e.g. "2016", "2021").
 */
function detectYear(text: string): string | null {
  const yearMatch = text.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? yearMatch[0] : null;
}
