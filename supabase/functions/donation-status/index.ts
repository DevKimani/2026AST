// Edge Function: return only the status of one donation by its unguessable reference.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = (Deno.env.get("SITE_URL") ?? "").replace(/\/$/, "");

const configuredOrigins = (
  Deno.env.get("ALLOWED_ORIGINS") ?? ""
)
  .split(",")
  .map((value) => value.trim().replace(/\/$/, ""))
  .filter(Boolean);

const allowedOrigins = new Set([
  SITE_URL,
  "http://localhost:5173",
  ...configuredOrigins,
].filter(Boolean));

function headersFor(req: Request) {
  const origin = req.headers.get("origin") ?? "";

  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin)
      ? origin
      : SITE_URL,
    "Access-Control-Allow-Headers":
      "authorization, apikey, content-type",
    "Vary": "Origin",
    "Content-Type": "application/json",
  };
}

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

serve(async (req) => {
  const headers = headersFor(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  const origin = req.headers.get("origin") ?? "";

  if (origin && !allowedOrigins.has(origin)) {
    return new Response(
      JSON.stringify({ error: "Origin not allowed" }),
      { status: 403, headers }
    );
  }

  const ref = new URL(req.url).searchParams.get("ref") ?? "";

  if (!uuidPattern.test(ref)) {
    return new Response(
      JSON.stringify({ error: "Invalid reference" }),
      { status: 400, headers }
    );
  }

  const db = createClient(
    SUPABASE_URL,
    SERVICE_ROLE
  );

  const { data, error } = await db
    .from("donations")
    .select("status")
    .eq("reference", ref)
    .maybeSingle();

  if (error) {
    return new Response(
      JSON.stringify({ status: "unknown" }),
      { status: 500, headers }
    );
  }

  return new Response(
    JSON.stringify({
      status: data?.status ?? "unknown",
    }),
    { headers }
  );
});
