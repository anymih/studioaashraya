import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/site-feasibility/supabase-client";

export async function GET() {
  let status: "ok" | "degraded" = "ok";

  const hasSupabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasSupabaseAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (hasSupabaseUrl && hasSupabaseAnonKey) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { error } = await supabase.from("ingestion_records").select("id").limit(1);
        if (error) {
          status = "degraded";
        }
      }
    } catch {
      status = "degraded";
    }
  }

  return NextResponse.json({
    status,
    timestamp: new Date().toISOString(),
  });
}

