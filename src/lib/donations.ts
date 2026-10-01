import { supabaseConfigured } from "./supabase";

const BASE = import.meta.env.VITE_SUPABASE_URL;
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;
const FN = `${BASE}/functions/v1`;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${ANON}`,
  apikey: ANON,
};

export interface DonationInput {
  amount: string;
  currency: "KES";
  method: "mpesa" | "card";
  name?: string;
  email?: string;
  phone?: string;
}

export interface StartResult {
  reference: string;
  checkout_url: string;
}

export const paymentsEnabled = () =>
  supabaseConfigured;

export async function startDonation(
  input: DonationInput
): Promise<StartResult> {
  const res = await fetch(
    `${FN}/create-donation`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(input),
    }
  );

  const body = await res
    .json()
    .catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      typeof body.error === "string"
        ? body.error
        : "Payment could not be started"
    );
  }

  return body as StartResult;
}

export async function getDonationStatus(
  ref: string
): Promise<{ status: string }> {
  const res = await fetch(
    `${FN}/donation-status?ref=${encodeURIComponent(ref)}`,
    { headers }
  );

  if (!res.ok) {
    return { status: "unknown" };
  }

  return res.json();
}