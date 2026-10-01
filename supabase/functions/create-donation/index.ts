// Edge Function: create a pending donation and open IntaSend hosted checkout.
// The browser uses the Supabase anon key. Payment credentials remain server-side.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const INTASEND_PUBLISHABLE = Deno.env.get("INTASEND_PUBLISHABLE_KEY") ?? "";
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

const allowedCurrencies = new Set(["KES"]);

const allowedMethods = new Set([
  "mpesa",
  "card",
]);

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowOrigin = allowedOrigins.has(origin)
    ? origin
    : SITE_URL;

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
    "Content-Type": "application/json",
  };
}

function json(
  req: Request,
  body: unknown,
  status = 200
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(req),
  });
}

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function normaliseKenyanPhone(value: unknown) {
  if (typeof value !== "string") return "";

  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("254") && digits.length === 12) {
    return digits;
  }

  if (digits.startsWith("0") && digits.length === 10) {
    return `254${digits.slice(1)}`;
  }

  if (digits.length === 9 && digits.startsWith("7")) {
    return `254${digits}`;
  }

  return "";
}

serve(async (req) => {
  const headers = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  if (req.method !== "POST") {
    return json(req, { error: "Method not allowed" }, 405);
  }

  const origin = req.headers.get("origin") ?? "";

  if (origin && !allowedOrigins.has(origin)) {
    return json(req, { error: "Origin not allowed" }, 403);
  }

  if (!INTASEND_PUBLISHABLE || !SITE_URL) {
    return json(
      req,
      { error: "Payment service is not configured" },
      500
    );
  }

  try {
    const body = await req.json();

    const amount = Number(
      String(body.amount ?? "").replace(/[^0-9.]/g, "")
    );

    const currency = String(
      body.currency ?? "KES"
    ).toUpperCase();

    const method = String(
      body.method ?? ""
    ).toLowerCase();

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 320);
    const phone =
      method === "mpesa"
        ? normaliseKenyanPhone(body.phone)
        : undefined;

    if (
      !Number.isFinite(amount) ||
      amount < 50 ||
      amount > 1_000_000
    ) {
      return json(
        req,
        { error: "Enter a donation amount between 50 and 1,000,000." },
        400
      );
    }

    if (!allowedCurrencies.has(currency)) {
      return json(
        req,
        { error: "Unsupported currency" },
        400
      );
    }

    if (!allowedMethods.has(method)) {
      return json(
        req,
        { error: "Unsupported payment method" },
        400
      );
    }

    if (method === "mpesa" && currency !== "KES") {
      return json(
        req,
        { error: "M-Pesa donations must be in KES" },
        400
      );
    }

    if (method === "mpesa" && !phone) {
      return json(
        req,
        { error: "Enter a valid Kenyan M-Pesa phone number" },
        400
      );
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return json(
        req,
        { error: "Enter a valid email address" },
        400
      );
    }

    const db = createClient(
      SUPABASE_URL,
      SERVICE_ROLE
    );

    const { data: donation, error: insertError } =
      await db
        .from("donations")
        .insert({
          amount,
          currency,
          frequency: "once",
          method,
          name,
          email,
          phone,
          provider: "intasend",
          status: "pending",
        })
        .select("id, reference")
        .single();

    if (insertError) throw insertError;

    const reference = String(donation.reference);

    const checkoutBody = {
      amount: amount.toFixed(2),
      currency,
      api_ref: reference,
      method:
        method === "mpesa"
          ? "M-PESA"
          : "CARD-PAYMENT",
      channel: "WEBSITE",
      host: SITE_URL,
      redirect_url: `${SITE_URL}/donate?ref=${encodeURIComponent(reference)}`,
      phone_number: phone,
      email,
      first_name: name,
      mobile_tarrif: "BUSINESS-PAYS",
      card_tarrif: "BUSINESS-PAYS",
    };

    const gatewayResponse = await fetch(
      "https://api.intasend.com/api/v1/checkout/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-IntaSend-Public-API-Key": INTASEND_PUBLISHABLE,
        },
        body: JSON.stringify(checkoutBody),
      }
    );

    const gateway = await gatewayResponse
      .json()
      .catch(() => ({}));

    if (!gatewayResponse.ok) {
      await db
        .from("donations")
        .update({
          status: "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", donation.id);

      console.error(
        "IntaSend checkout error",
        gatewayResponse.status,
        gateway
      );

      return json(
        req,
        { error: "The secure payment page could not be opened. Please try again." },
        502
      );
    }

    const checkoutUrl =
      gateway.url ??
      gateway.checkout_url ??
      gateway.link ??
      null;

    const providerRef =
      gateway.invoice?.invoice_id ??
      gateway.invoice_id ??
      gateway.id ??
      null;

    if (!checkoutUrl || typeof checkoutUrl !== "string") {
      console.error(
        "IntaSend response did not include a checkout URL",
        gateway
      );

      await db
        .from("donations")
        .update({
          status: "failed",
          provider_ref: providerRef,
          updated_at: new Date().toISOString(),
        })
        .eq("id", donation.id);

      return json(
        req,
        { error: "The payment provider returned an unexpected response." },
        502
      );
    }

    await db
      .from("donations")
      .update({
        provider_ref: providerRef,
        updated_at: new Date().toISOString(),
      })
      .eq("id", donation.id);

    return json(req, {
      reference,
      checkout_url: checkoutUrl,
    });
  } catch (error) {
    console.error("create-donation error", error);

    return json(
      req,
      { error: "Unable to start the payment" },
      400
    );
  }
});
