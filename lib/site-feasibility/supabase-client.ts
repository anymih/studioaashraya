/**
 * Supabase Client (Slice 6 — Dual-Path Storage)
 *
 * Production: creates a real Supabase client from environment variables.
 * Development: when env vars are absent, returns null — callers must
 * fall back to the in-memory mock store.
 *
 * No localStorage/sessionStorage is used anywhere.
 * No blocking modals are shown when Supabase is absent.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Singleton client (lazy-init)
// ---------------------------------------------------------------------------

let _client: SupabaseClient | null | undefined;

/**
 * Returns the Supabase client if configured, or null if env vars are missing.
 *
 * Callers must check for null and route to the in-memory mock service.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (_client !== undefined) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    _client = null;
    return null;
  }

  _client = createClient(url, anonKey, {
    auth: {
      // Disable localStorage/sessionStorage persistence entirely
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return _client;
}

/**
 * Returns true when Supabase is configured and available.
 * UI components use this to decide which code path to take.
 */
export function isSupabaseConfigured(): boolean {
  return getSupabaseClient() !== null;
}
