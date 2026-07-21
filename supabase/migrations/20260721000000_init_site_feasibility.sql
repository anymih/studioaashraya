-- Create ingestion_records table for Slice 6 Ingestion & OCR
CREATE TABLE IF NOT EXISTS public.ingestion_records (
  id TEXT PRIMARY KEY,
  source_url TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  extracted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  confidence_score NUMERIC(3,2) NOT NULL,
  extraction_method TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  evidence JSONB NOT NULL,
  storage_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on ingestion_records
ALTER TABLE public.ingestion_records ENABLE ROW LEVEL SECURITY;

-- Allow public read access to ingestion_records
CREATE POLICY "Allow public read access on ingestion_records"
  ON public.ingestion_records FOR SELECT
  TO public
  USING (true);

-- Allow public insert access on ingestion_records
CREATE POLICY "Allow public insert access on ingestion_records"
  ON public.ingestion_records FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public update access on ingestion_records
CREATE POLICY "Allow public update access on ingestion_records"
  ON public.ingestion_records FOR UPDATE
  TO public
  USING (true);
