-- Create normalized_rules_drafts table
CREATE TABLE IF NOT EXISTS public.normalized_rules_drafts (
  id TEXT PRIMARY KEY,
  ingestion_record_id TEXT NOT NULL REFERENCES public.ingestion_records(id) ON DELETE CASCADE,
  jurisdiction TEXT NOT NULL,
  occupancy_type TEXT NOT NULL,
  rules JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  -- Ensure unique mapping draft per ingestion record and occupancy type
  CONSTRAINT unique_ingestion_occupancy UNIQUE (ingestion_record_id, occupancy_type)
);

-- Enable RLS
ALTER TABLE public.normalized_rules_drafts ENABLE ROW LEVEL SECURITY;

-- Setup basic public policies (matching current project configurations)
CREATE POLICY "Allow public read access on normalized_rules_drafts"
  ON public.normalized_rules_drafts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access on normalized_rules_drafts"
  ON public.normalized_rules_drafts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access on normalized_rules_drafts"
  ON public.normalized_rules_drafts FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow public delete access on normalized_rules_drafts"
  ON public.normalized_rules_drafts FOR DELETE
  TO public
  USING (true);
