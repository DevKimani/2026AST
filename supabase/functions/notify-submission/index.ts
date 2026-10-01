// Supabase Edge Function (Deno).
// Triggered by a Database Webhook on INSERT.
//
// Sends a metadata-only email via Resend.
// Sensitive form contents are never copied into notification emails.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY =
  Deno.env.get("RESEND_API_KEY") ?? "";

const NOTIFY_TO =
  Deno.env.get("NOTIFY_TO") ?? "";

const NOTIFY_FROM =
  Deno.env.get("NOTIFY_FROM") ??
  "Arise Website <onboarding@resend.dev>";

const WEBHOOK_SECRET =
  Deno.env.get("WEBHOOK_SECRET") ?? "";

serve(async (req) => {
  if (
    !WEBHOOK_SECRET ||
    req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET
  ) {
    return new Response(
      "Unauthorized",
      { status: 401 }
    );
  }

  if (!RESEND_API_KEY || !NOTIFY_TO) {
    return new Response(
      "Notification service not configured",
      { status: 500 }
    );
  }

  try {
    const payload = await req.json();

    const table =
      payload.table ?? "submission";

    const rec =
      payload.record ?? payload;

    const isVolunteer =
      table === "volunteer_applications";

    const label = isVolunteer
      ? "volunteer application"
      : "confidential contact submission";

    const id =
      typeof rec.id === "string"
        ? rec.id
        : "not provided";

    const createdAt =
      typeof rec.created_at === "string"
        ? rec.created_at
        : "not provided";

    const text = [
      `A new ${label} was received through the Arise Strong Together website.`,
      "",
      "For privacy, this email intentionally does not contain the submitter's name, contact details, message, or other form contents.",
      "",
      `Submission ID: ${id}`,
      `Received: ${createdAt}`,
      "",
      "Open the authorised Supabase project or staff interface to review the record.",
    ].join("\n");

    const res = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          from: NOTIFY_FROM,

          to: NOTIFY_TO
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),

          subject:
            `New ${label} - Arise Strong Together`,

          text,
        }),
      }
    );

    if (!res.ok) {
      return new Response(
        await res.text(),
        { status: 502 }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    return new Response(
      String(e),
      { status: 400 }
    );
  }
});