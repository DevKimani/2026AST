# Payments — Phase 4 (IntaSend aggregator: M-Pesa STK Push + card)

Accepts donations without needing your own Paybill. Funds settle to your IntaSend
wallet; withdraw to bank or M-Pesa. Build one-time first; add monthly later.

> IMPORTANT: payment-gateway APIs change. Before go-live, VERIFY the request
> shapes in `supabase/functions/create-donation` and the webhook handling in
> `payment-webhook` against the current IntaSend docs (https://developers.intasend.com).
> The scaffolding, database, and frontend flow are correct; the provider-specific
> calls are the part to confirm.

## 1. Database
Run `supabase/migrations/0002_donations.sql` in the Supabase SQL editor.
(Donations are written only by the Edge Functions; staff read them in the dashboard.)

## 2. IntaSend account
Create an account at intasend.com → get your **Publishable** and **Secret** API keys
(use sandbox keys first). Set a **webhook challenge** string in their dashboard.

## 3. Function secrets
```bash
supabase secrets set \
  INTASEND_SECRET_KEY=... \
  INTASEND_PUBLISHABLE_KEY=... \
  INTASEND_WEBHOOK_CHALLENGE=your-challenge-string \
  SITE_URL=https://your-domain \
  RESEND_API_KEY=re_...            # optional, for e-mail receipts
```
(`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided to functions automatically.)

## 4. Deploy the functions
```bash
supabase functions deploy create-donation
supabase functions deploy donation-status
supabase functions deploy payment-webhook --no-verify-jwt
```
Then in IntaSend's dashboard, point the **webhook URL** at:
`https://YOUR-PROJECT.functions.supabase.co/payment-webhook`

## 5. Frontend
Already wired. The hero DonateWidget:
- M-Pesa → triggers an STK push, then polls `donation-status` until paid.
- Card → redirects to IntaSend hosted checkout, returns to `/donate?ref=…`.
No secret keys are in the frontend; it only uses the public anon key.

## Notes
- Test end-to-end in **sandbox** before switching to live keys.
- Monthly/recurring: launch one-time first. Card recurring via IntaSend subscriptions;
  M-Pesa recurring needs their subscription feature or Safaricom M-Pesa Ratiba.
- Donor name/phone/email is personal data (KDPA) — staff-only read, as configured.

## Multi-currency (auto-detected)
The donation widget detects the visitor's country (via a Vercel edge function at
`api/geo.ts`, which reads Vercel's `x-vercel-ip-country` header) and shows KES, USD,
GBP, or EUR accordingly — with a manual currency selector for card payments. It falls
back to device locale in local dev, defaulting to KES.

IMPORTANT — display vs charge:
- M-Pesa is always charged in KES (the widget locks to KES for M-Pesa).
- For CARD in USD/GBP/EUR to actually settle in that currency, confirm IntaSend
  supports charging/settling it on your account. If it only settles KES, either
  enable multi-currency with the provider or convert to KES before charging
  (add live FX in `create-donation`). The preset amounts are natural round numbers
  per currency, not live conversions.
