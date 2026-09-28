// Edge Function: return ONLY the status of one donation, by its unguessable reference.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type", "Content-Type": "application/json" };

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const ref = new URL(req.url).searchParams.get("ref");
  if (!ref) return new Response(JSON.stringify({ error: "ref required" }), { status: 400, headers: cors });
  const db = createClient(SUPABASE_URL, SERVICE_ROLE);
  const { data } = await db.from("donations").select("status, amount, currency").eq("reference", ref).single();
  return new Response(JSON.stringify(data ?? { status: "unknown" }), { headers: cors });
});
