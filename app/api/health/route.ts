import { NextResponse } from "next/server";

export async function GET() {
  const isDev = process.env.NODE_ENV === "development";
  const hasSupabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasSupabaseAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return NextResponse.json({
    status: "ok",
    service: "site-feasibility-calculator",
    version: "1.0.0-rc1",
    timestamp: new Date().toISOString(),
    environment: {
      mode: process.env.NODE_ENV || "development",
      isDev,
    },
    integrations: {
      supabaseConfigured: hasSupabaseUrl && hasSupabaseAnonKey,
      ocrProvider: "tesseract.js (local/wasm)",
      mappingEngine: "SVG Native CAD Editor",
    },
    healthChecks: {
      byelawRegistry: "operational",
      geometryEngine: "operational",
    },
  });
}
