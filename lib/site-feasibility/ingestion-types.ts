/**
 * Ingestion Types (Slice 6 — Document Ingestion, OCR, and Extraction)
 *
 * Evidence-oriented types for capturing extracted clause evidence from
 * bye-law documents. These types are strictly for review and verification —
 * they do NOT feed into the live calculator.
 */

// ---------------------------------------------------------------------------
// Extraction Method
// ---------------------------------------------------------------------------

/** How text was obtained from the source document */
export type ExtractionMethod = "text_direct" | "ocr";

// ---------------------------------------------------------------------------
// Verification Status
// ---------------------------------------------------------------------------

/** Lifecycle status of an extracted document */
export type VerificationStatus =
  | "pending"        // Just ingested, not yet reviewed
  | "pending_review" // Low confidence, flagged for review
  | "reviewed"       // User has reviewed but not verified accuracy
  | "verified";      // User has confirmed accuracy of extraction

// ---------------------------------------------------------------------------
// Document Metadata
// ---------------------------------------------------------------------------

/** Metadata captured from the source document */
export interface DocumentMetadata {
  /** Title of the bye-law document */
  title: string;
  /** Year or version string (e.g. "2016", "2008 Amended 2021") */
  year: string;
  /** Jurisdiction the document covers */
  jurisdiction: string;
}

// ---------------------------------------------------------------------------
// Clause Evidence
// ---------------------------------------------------------------------------

/** A single extracted clause with its source reference */
export interface ClauseEvidence {
  /** Verbatim or near-verbatim excerpt from the document */
  excerpt: string;
  /** Section/clause reference (e.g. "Section 4.2.1", "Rule 12(b)") */
  referenceSection: string;
  /** Page number where the clause was found */
  pageNumber: number;
}

// ---------------------------------------------------------------------------
// Extracted Evidence (the JSON persisted for review)
// ---------------------------------------------------------------------------

/** The complete evidence-oriented extraction output */
export interface ExtractedEvidence {
  /** Metadata about the source document */
  documentMetadata: DocumentMetadata;
  /** Occupancy/use labels found in the document (e.g. "Residential", "Commercial") */
  occupancyLabelsFound: string[];
  /** Setback-related clauses with excerpts and references */
  setbackClauses: ClauseEvidence[];
  /** FAR/FSI-related clauses with excerpts and references */
  farClauses: ClauseEvidence[];
  /** Height-related clauses with excerpts and references */
  heightClauses: ClauseEvidence[];
  /** Human-readable summary of extraction status */
  statusSummary: string;
}

// ---------------------------------------------------------------------------
// Ingestion Record (persisted per document)
// ---------------------------------------------------------------------------

/** A complete ingestion record with provenance and evidence */
export interface IngestionRecord {
  /** Unique record ID */
  id: string;
  /** URL the document was fetched from (or "manual_upload" for user uploads) */
  sourceUrl: string;
  /** Original filename if uploaded manually */
  originalFilename: string;
  /** Timestamp of extraction */
  extractedAt: string;
  /** Overall confidence score from 0.0 to 1.0 */
  confidenceScore: number;
  /** How text was extracted from the document */
  extractionMethod: ExtractionMethod;
  /** Current verification status */
  verificationStatus: VerificationStatus;
  /** Whether a human has verified the extraction */
  isVerified: boolean;
  /** The extracted evidence payload */
  evidence: ExtractedEvidence;
  /** Supabase Storage path for the uploaded document (production only) */
  storagePath: string | null;
}
