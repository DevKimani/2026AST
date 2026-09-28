// Edge Function: create a pending donation + initiate payment with the gateway.
// Called from the browser with the Supabase anon key. Secrets live server-side.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const INTASEND_SECRET = Deno.env.get("INTASEND_SECRET_KEY") ?? "";
const INTASEND_PUBLISHABLE = Deno.env.get("INTASEND_PUBLISHABLE_KEY") ?? "";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://your-site.example";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const { amount, currency = "KES", frequency = "once", method = "mpesa", name, email, phone } = await req.json();
    const amt = Number(String(amount).replace(/[^0-9.]/g, ""));
    if (!amt || amt <= 0) return new Response(JSON.stringify({ error: "Invalid amount" }), { status: 400, headers: cors });
    if (method === "mpesa" && !phone) return new Response(JSON.stringify({ error: "Phone required for M-Pesa" }), { status: 400, headers: cors });

    const db = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: row, error } = await db.from("donations")
      .insert({ amount: amt, currency, frequency, method, name, email, phone, provider: "intasend", status: "pending" })
      .select("id, reference").single();
    if (error) throw error;

    // ---------------------------------------------------------------------
    // PROVIDER CALL — VERIFY against current IntaSend API docs before go-live.
    // (Endpoints/field names/auth may have changed since this was written.)
    // Docs: https://developers.intasend.com
    // ---------------------------------------------------------------------
    if (method === "mpesa") {
      // M-Pesa STK Push (example shape — confirm exact endpoint & fields):
      const r = await fetch("https://payment.intasend.com/api/v1/payment/mpesa-stk-push/", {
        method: "POST",
        headers: { "Authorization": `Bearer ${INTASEND_SECRET}`, "Content-Type": "application/json" },
        body: JSON.stringify({ public_key: INTASEND_PUBLISHABLE, amount: amt, phone_number: phone, api_ref: row.reference, currency }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) return new Response(JSON.stringify({ error: "gateway", detail: j }), { status: 502, headers: cors });
      await db.from("donations").update({ provider_ref: j.invoice?.invoice_id ?? j.id ?? null, updated_at: new Date().toISOString() }).eq("id", row.id);
      return new Response(JSON.stringify({ reference: row.reference, mode: "stk" }), { headers: cors });
    } else {
      // Card / hosted checkout (example — confirm exact endpoint & fields):
      const r = await fetch("https://payment.intasend.com/api/v1/checkout/", {
        method: "POST",
        headers: { "Authorization": `Bearer ${INTASEND_SECRET}`, "Content-Type": "application/json" },
        body: JSON.stringify({ public_key: INTASEND_PUBLISHABLE, amount: amt, currency, email, first_name: name, api_ref: row.reference, redirect_url: `${SITE_URL}/donate?ref=${row.reference}` }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) return new Response(JSON.stringify({ error: "gateway", detail: j }), { status: 502, headers: cors });
      await db.from("donations").update({ provider_ref: j.id ?? null, updated_at: new Date().toISOString() }).eq("id", row.id);
      return new Response(JSON.stringify({ reference: row.reference, mode: "redirect", checkout_url: j.url }), { headers: cors });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 400, headers: cors });
  }
});
