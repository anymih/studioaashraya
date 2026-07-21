/**
 * Ingestion Store (Slice 6 — Persistence Layer)
 *
 * Dual-path persistence:
 *   Production  → Supabase Storage (documents) + Postgres (ingestion records)
 *   Development → In-memory Map (when Supabase env vars are absent)
 *
 * No localStorage/sessionStorage is used.
 * No blocking modals are shown when Supabase is unavailable.
 */

import { getSupabaseClient } from "./supabase-client";
import type {
  IngestionRecord,
  VerificationStatus,
} from "./ingestion-types";

// ---------------------------------------------------------------------------
// In-Memory Mock Store
// ---------------------------------------------------------------------------

const memoryStore = new Map<string, IngestionRecord>();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Persist an ingestion record.
 * Routes to Supabase Postgres in production, or in-memory Map otherwise.
 */
export async function saveIngestionRecord(
  record: IngestionRecord
): Promise<void> {
  const client = getSupabaseClient();

  if (client) {
    const { error } = await client.from("ingestion_records").upsert({
      id: record.id,
      source_url: record.sourceUrl,
      original_filename: record.originalFilename,
      extracted_at: record.extractedAt,
      confidence_score: record.confidenceScore,
      extraction_method: record.extractionMethod,
      verification_status: record.verificationStatus,
      is_verified: record.isVerified,
      evidence: record.evidence,
      storage_path: record.storagePath,
    });

    if (error) {
      console.error("[ingestion-store] Supabase upsert error:", error.message);
      throw new Error(`Failed to save ingestion record: ${error.message}`);
    }
  } else {
    // Development fallback: in-memory
    memoryStore.set(record.id, { ...record });
  }
}

/**
 * Upload a document file to Supabase Storage (production) or no-op (development).
 * Returns the storage path, or null in development fallback.
 */
export async function uploadDocumentFile(
  fileBuffer: ArrayBuffer,
  filename: string,
  contentType: string
): Promise<string | null> {
  const client = getSupabaseClient();

  if (!client) {
    // Development fallback: no storage, return null
    return null;
  }

  const storagePath = `byelaw-documents/${Date.now()}_${filename}`;

  const { error } = await client.storage
    .from("ingestion")
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    console.error("[ingestion-store] Storage upload error:", error.message);
    throw new Error(`Failed to upload document: ${error.message}`);
  }

  return storagePath;
}

/**
 * Retrieve all ingestion records.
 */
export async function listIngestionRecords(): Promise<IngestionRecord[]> {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("ingestion_records")
      .select("*")
      .order("extracted_at", { ascending: false });

    if (error) {
      console.error("[ingestion-store] Supabase select error:", error.message);
      return [];
    }

    return (data ?? []).map(mapRowToRecord);
  }

  // Development fallback
  return Array.from(memoryStore.values()).sort(
    (a, b) => new Date(b.extractedAt).getTime() - new Date(a.extractedAt).getTime()
  );
}

/**
 * Retrieve a single ingestion record by ID.
 */
export async function getIngestionRecord(
  id: string
): Promise<IngestionRecord | null> {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("ingestion_records")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return mapRowToRecord(data);
  }

  return memoryStore.get(id) ?? null;
}

/**
 * Update the verification status of an ingestion record.
 * This is a review-only action — it does NOT affect the live calculator.
 */
export async function updateVerificationStatus(
  id: string,
  status: VerificationStatus
): Promise<void> {
  const isVerified = status === "verified";

  const client = getSupabaseClient();

  if (client) {
    const { error } = await client
      .from("ingestion_records")
      .update({
        verification_status: status,
        is_verified: isVerified,
      })
      .eq("id", id);

    if (error) {
      console.error("[ingestion-store] Supabase update error:", error.message);
      throw new Error(`Failed to update verification: ${error.message}`);
    }
  } else {
    // Development fallback
    const existing = memoryStore.get(id);
    if (existing) {
      memoryStore.set(id, {
        ...existing,
        verificationStatus: status,
        isVerified,
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Row Mapping (Supabase snake_case → TypeScript camelCase)
// ---------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapRowToRecord(row: any): IngestionRecord {
  return {
    id: row.id,
    sourceUrl: row.source_url,
    originalFilename: row.original_filename,
    extractedAt: row.extracted_at,
    confidenceScore: row.confidence_score,
    extractionMethod: row.extraction_method,
    verificationStatus: row.verification_status,
    isVerified: row.is_verified,
    evidence: row.evidence,
    storagePath: row.storage_path,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
