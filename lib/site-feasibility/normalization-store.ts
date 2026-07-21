/**
 * Normalization Store (Slice 7 — Persistence Layer)
 *
 * Dual-path persistence for normalized rules drafts:
 *   Production  → Supabase Postgres (normalized_rules_drafts)
 *   Development → In-memory Map (when Supabase env vars are absent)
 */

import { getSupabaseClient } from "./supabase-client";
import type {
  NormalizedRuleDraft,
  MappingApprovalStatus,
} from "./normalization-types";

// ---------------------------------------------------------------------------
// In-Memory Mock Store
// ---------------------------------------------------------------------------

const draftMemoryStore = new Map<string, NormalizedRuleDraft>();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Persist a normalized rule draft.
 * Handles the state transitions, specifically setting previously approved rules
 * to "superseded" when a new rule is approved.
 */
export async function saveNormalizedRuleDraft(
  draft: NormalizedRuleDraft
): Promise<void> {
  const client = getSupabaseClient();
  const now = new Date().toISOString();
  const updatedDraft = { ...draft, updatedAt: now };

  if (client) {
    // If the new status is "approved", supersede previous approved rules
    // for this jurisdiction and occupancy type.
    if (updatedDraft.status === "approved") {
      const { error: supersedeError } = await client
        .from("normalized_rules_drafts")
        .update({ status: "superseded", updated_at: now })
        .eq("jurisdiction", updatedDraft.jurisdiction)
        .eq("occupancy_type", updatedDraft.occupancyType)
        .eq("status", "approved")
        .neq("id", updatedDraft.id);

      if (supersedeError) {
        console.error("[normalization-store] Supabase supersede error:", supersedeError.message);
      }
    }

    const { error } = await client.from("normalized_rules_drafts").upsert({
      id: updatedDraft.id,
      ingestion_record_id: updatedDraft.ingestionRecordId,
      jurisdiction: updatedDraft.jurisdiction,
      occupancy_type: updatedDraft.occupancyType,
      rules: updatedDraft.rules,
      status: updatedDraft.status,
      updated_at: now,
    });

    if (error) {
      console.error("[normalization-store] Supabase upsert error:", error.message);
      throw new Error(`Failed to save normalized rule draft: ${error.message}`);
    }
  } else {
    // Development fallback: in-memory
    if (updatedDraft.status === "approved") {
      for (const [id, item] of draftMemoryStore.entries()) {
        if (
          item.jurisdiction === updatedDraft.jurisdiction &&
          item.occupancyType === updatedDraft.occupancyType &&
          item.status === "approved" &&
          id !== updatedDraft.id
        ) {
          draftMemoryStore.set(id, {
            ...item,
            status: "superseded",
            updatedAt: now,
          });
        }
      }
    }
    draftMemoryStore.set(updatedDraft.id, updatedDraft);
  }
}

/**
 * Retrieve a single normalized rule draft by ID.
 */
export async function getNormalizedRuleDraft(
  id: string
): Promise<NormalizedRuleDraft | null> {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("normalized_rules_drafts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return mapRowToDraft(data);
  }

  return draftMemoryStore.get(id) ?? null;
}

/**
 * Retrieve all drafts for a specific ingestion record.
 */
export async function listNormalizedRuleDraftsByRecord(
  ingestionRecordId: string
): Promise<NormalizedRuleDraft[]> {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("normalized_rules_drafts")
      .select("*")
      .eq("ingestion_record_id", ingestionRecordId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("[normalization-store] Supabase select error:", error.message);
      return [];
    }

    return (data ?? []).map(mapRowToDraft);
  }

  // Development fallback
  return Array.from(draftMemoryStore.values())
    .filter((d) => d.ingestionRecordId === ingestionRecordId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

/**
 * Retrieve a specific draft by Ingestion Record ID and Occupancy Type.
 */
export async function getNormalizedRuleDraftByRecordAndOccupancy(
  ingestionRecordId: string,
  occupancyType: string
): Promise<NormalizedRuleDraft | null> {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("normalized_rules_drafts")
      .select("*")
      .eq("ingestion_record_id", ingestionRecordId)
      .eq("occupancy_type", occupancyType)
      .maybeSingle();

    if (error || !data) return null;
    return mapRowToDraft(data);
  }

  // Development fallback
  return (
    Array.from(draftMemoryStore.values()).find(
      (d) => d.ingestionRecordId === ingestionRecordId && d.occupancyType === occupancyType
    ) ?? null
  );
}

/**
 * Retrieve all normalized rules drafts.
 */
export async function listAllNormalizedRuleDrafts(): Promise<NormalizedRuleDraft[]> {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("normalized_rules_drafts")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("[normalization-store] Supabase select error:", error.message);
      return [];
    }

    return (data ?? []).map(mapRowToDraft);
  }

  // Development fallback
  return Array.from(draftMemoryStore.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

// ---------------------------------------------------------------------------
// Row Mapping (Supabase snake_case → TypeScript camelCase)
// ---------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapRowToDraft(row: any): NormalizedRuleDraft {
  return {
    id: row.id,
    ingestionRecordId: row.ingestion_record_id,
    jurisdiction: row.jurisdiction,
    occupancyType: row.occupancy_type,
    rules: row.rules,
    status: row.status as MappingApprovalStatus,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
