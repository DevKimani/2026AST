// Edge Function: IntaSend payment collection webhook.
// Deploy with --no-verify-jwt because the request comes from IntaSend.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const WEBHOOK_CHALLENGE =
  Deno.env.get("INTASEND_WEBHOOK_CHALLENGE") ?? "";
const RESEND_API_KEY =
  Deno.env.get("RESEND_API_KEY") ?? "";
const NOTIFY_FROM =
  Deno.env.get("NOTIFY_FROM") ??
  "Arise Strong Together <onboarding@resend.dev>";

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
    });
  }

  if (!WEBHOOK_CHALLENGE) {
    console.error(
      "INTASEND_WEBHOOK_CHALLENGE is not configured"
    );

    return new Response(
      "Webhook not configured",
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    if (body.challenge !== WEBHOOK_CHALLENGE) {
      return new Response(
        "Unauthorized",
        { status: 401 }
      );
    }

    const reference = text(body.api_ref);

    if (!reference) {
      return new Response(
        "Missing reference",
        { status: 400 }
      );
    }

    const state = text(
      body.state ?? body.status
    ).toUpperCase();

    const nextStatus =
      state === "COMPLETE" || state === "PAID"
        ? "paid"
        : state === "FAILED"
          ? "failed"
          : "pending";

    const db = createClient(
      SUPABASE_URL,
      SERVICE_ROLE
    );

    const { data: donation, error: readError } =
      await db
        .from("donations")
        .select(
          "id, status, email, name, amount, currency"
        )
        .eq("reference", reference)
        .maybeSingle();

    if (readError) throw readError;

    if (!donation) {
      return new Response(
        "Unknown reference",
        { status: 404 }
      );
    }

    if (nextStatus === "paid") {
      const eventCurrency = text(
        body.currency
      ).toUpperCase();

      const eventAmount = Number(
        body.value ?? body.amount
      );

      const storedAmount = Number(
        donation.amount
      );

      if (
        !eventCurrency ||
        eventCurrency !== donation.currency ||
        !Number.isFinite(eventAmount) ||
        Math.abs(eventAmount - storedAmount) > 0.01
      ) {
        console.error(
          "Webhook reconciliation failed",
          {
            reference,
            eventCurrency,
            storedCurrency: donation.currency,
            eventAmount,
            storedAmount,
          }
        );

        return new Response(
          "Payment details do not match",
          { status: 409 }
        );
      }
    }

    const providerRef =
      text(body.invoice_id) ||
      text(body.invoice?.invoice_id) ||
      null;

    const previousStatus = donation.status;

    const { error: updateError } = await db
      .from("donations")
      .update({
        status: nextStatus,
        provider_ref:
          providerRef ?? undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", donation.id);

    if (updateError) throw updateError;

    if (
      nextStatus === "paid" &&
      previousStatus !== "paid" &&
      donation.email &&
      RESEND_API_KEY
    ) {
      await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${RESEND_API_KEY}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            from: NOTIFY_FROM,
            to: [donation.email],
            subject:
              "Thank you for your donation - Arise Strong Together",
            text: [
              `Dear ${donation.name ?? "friend"},`,
              "",
              `Thank you for your gift of ${donation.currency} ${donation.amount}.`,
              "",
              "Your support helps Arise Strong Together sustain survivor-centred support, prevention, and community programmes.",
              "",
              "With gratitude,",
              "Arise Strong Together",
            ].join("\n"),
          }),
        }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      {
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "payment-webhook error",
      error
    );

    return new Response(
      "Invalid webhook",
      { status: 400 }
    );
  }
});
