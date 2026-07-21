-- Create active_jurisdiction_profiles table to store promoted active rulesets
CREATE TABLE IF NOT EXISTS public.active_jurisdiction_profiles (
  id TEXT PRIMARY KEY,
  jurisdiction TEXT NOT NULL,
  occupancy_type TEXT NOT NULL,
  normalized_rule_draft_id TEXT NOT NULL REFERENCES public.normalized_rules_drafts(id) ON DELETE RESTRICT,
  profile_version INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, superseded, rolled_back, inactive
  notes TEXT,
  activated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  activated_by TEXT NOT NULL DEFAULT 'system',
  previous_profile_id TEXT REFERENCES public.active_jurisdiction_profiles(id) ON DELETE SET NULL,
  rules JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for resolving active profiles quickly
CREATE INDEX IF NOT EXISTS idx_active_profiles_resolver 
  ON public.active_jurisdiction_profiles(jurisdiction, occupancy_type, status);

-- Enforce uniqueness: only one active profile per jurisdiction and occupancy type at a time
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_active_profile 
  ON public.active_jurisdiction_profiles(jurisdiction, occupancy_type) 
  WHERE (status = 'active');

-- Create jurisdiction_activation_audit_log table to store historical activation records
CREATE TABLE IF NOT EXISTS public.jurisdiction_activation_audit_log (
  id TEXT PRIMARY KEY,
  profile_id TEXT REFERENCES public.active_jurisdiction_profiles(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL, -- promote, rollback, deactivate, activate, validation_blocked
  jurisdiction TEXT NOT NULL,
  occupancy_type TEXT NOT NULL,
  actor TEXT NOT NULL,
  previous_profile_id TEXT,
  target_normalized_rule_draft_id TEXT,
  details JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for fast retrieval of audit trail for specific jurisdiction + occupancy type
CREATE INDEX IF NOT EXISTS idx_activation_audit_log 
  ON public.jurisdiction_activation_audit_log(jurisdiction, occupancy_type, created_at DESC);

-- Enable RLS for both tables
ALTER TABLE public.active_jurisdiction_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jurisdiction_activation_audit_log ENABLE ROW LEVEL SECURITY;

-- Allow public reads, inserts, and updates to support the sandbox client architecture
CREATE POLICY "Allow public read access on active_jurisdiction_profiles"
  ON public.active_jurisdiction_profiles FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert access on active_jurisdiction_profiles"
  ON public.active_jurisdiction_profiles FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update access on active_jurisdiction_profiles"
  ON public.active_jurisdiction_profiles FOR UPDATE TO public USING (true);

CREATE POLICY "Allow public read access on jurisdiction_activation_audit_log"
  ON public.jurisdiction_activation_audit_log FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert access on jurisdiction_activation_audit_log"
  ON public.jurisdiction_activation_audit_log FOR INSERT TO public WITH CHECK (true);
