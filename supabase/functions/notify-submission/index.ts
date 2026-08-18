// Supabase Edge Function (Deno). Triggered by a Database Webhook on INSERT.
// Sends an email via Resend. Secrets are set with `supabase secrets set`.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFY_TO   = Deno.env.get("NOTIFY_TO") ?? "";        // comma-separated recipients
const NOTIFY_FROM = Deno.env.get("NOTIFY_FROM") ?? "Arise Website <onboarding@resend.dev>";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") ?? ""; // shared secret with the webhook

serve(async (req) => {
  // Reject anything that doesn't carry our shared secret (stops public abuse).
  if (!WEBHOOK_SECRET || req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const payload = await req.json();
    const table = payload.table ?? "submission";
    const rec = payload.record ?? payload;
    const label = table === "volunteer_applications" ? "volunteer application" : "contact message";
    const body = Object.entries(rec)
      .filter(([k]) => !["id", "status"].includes(k))
      .map(([k, v]) => `${k}: ${v ?? ""}`)
      .join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: NOTIFY_TO.split(",").map((s) => s.trim()).filter(Boolean),
        subject: `New ${label} — Arise Strong Together`,
        text: `A new ${label} was submitted:\n\n${body}\n\nView all submissions in your Supabase dashboard.`,
      }),
    });
    if (!res.ok) return new Response(await res.text(), { status: 502 });
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(String(e), { status: 400 });
  }
});
