// Edge Function: gateway calls this on payment completion. Deploy with --no-verify-jwt.
// VERIFY the webhook authenticity per IntaSend docs (challenge/signature) before trusting it.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const WEBHOOK_CHALLENGE = Deno.env.get("INTASEND_WEBHOOK_CHALLENGE") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFY_FROM = Deno.env.get("NOTIFY_FROM") ?? "Arise Strong Together <onboarding@resend.dev>";

serve(async (req) => {
  try {
    const body = await req.json();
    // IntaSend sends a "challenge" you set in the dashboard — reject if it doesn't match.
    if (WEBHOOK_CHALLENGE && body.challenge !== WEBHOOK_CHALLENGE) {
      return new Response("Unauthorized", { status: 401 });
    }
    const ref = body.api_ref;                     // our donations.reference
    const state = (body.state ?? body.status ?? "").toString().toUpperCase();
    const status = state === "COMPLETE" || state === "PAID" ? "paid" : state === "FAILED" ? "failed" : "pending";

    const db = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: rows } = await db.from("donations").update({ status, updated_at: new Date().toISOString() })
      .eq("reference", ref).select("email, name, amount, currency").limit(1);

    const d = rows?.[0];
    if (status === "paid" && d?.email && RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: NOTIFY_FROM, to: [d.email],
          subject: "Thank you for your donation — Arise Strong Together",
          text: `Dear ${d.name ?? "friend"},\n\nThank you for your gift of ${d.currency} ${d.amount}. Your support helps survivors of gender-based violence heal and rebuild.\n\nWith gratitude,\nArise Strong Together`,
        }),
      });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(String(e), { status: 400 });
  }
});
