# Backend Setup — Phase 1: Form submissions (store + notify)

This wires the Contact and Volunteer forms to Supabase (store) and emails your
team on each new submission (notify). ~20 minutes, mostly clicking.

## 1. Create the database
1. Create a project at https://supabase.com (choose a region close to Kenya, e.g. `eu-central` or `eu-west`).
2. In the dashboard: **SQL Editor → New query**, paste the contents of
   `supabase/migrations/0001_submissions.sql`, and **Run**.
   This creates the two tables and the Row-Level Security policies
   (public can submit; only signed-in staff can read).

## 2. Connect the front end
1. In Supabase: **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
2. Locally, create `.env.local` (copy from `.env.example`):
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
   ```
3. In **Vercel → your project → Settings → Environment Variables**, add the same
   two variables (for Production and Preview), then redeploy.
   > The anon key is meant to be public — RLS is what protects your data.

At this point submissions already **save**. Test the form, then check
**Table Editor → contact_submissions** in Supabase. Notifications come next.

## 3. Email notifications (Resend + Edge Function)
1. Create a free account at https://resend.com, add an **API key**. For real
   sending, verify your domain; for testing you can send from `onboarding@resend.dev`.
2. Install the Supabase CLI and link the project:
   ```bash
   npm i -g supabase
   supabase login
   supabase link --project-ref YOUR-PROJECT-REF
   ```
3. Set the function secrets:
   ```bash
   supabase secrets set RESEND_API_KEY=re_xxx \
     NOTIFY_TO="team@yourorg.org,program@yourorg.org" \
     NOTIFY_FROM="Arise Website <noreply@yourdomain.org>" \
     WEBHOOK_SECRET="a-long-random-string"
   ```
4. Deploy the function (no JWT — it's protected by our own secret instead):
   ```bash
   supabase functions deploy notify-submission --no-verify-jwt
   ```
   Note the function URL it prints:
   `https://YOUR-PROJECT.functions.supabase.co/notify-submission`

## 4. Fire the function on new submissions (Database Webhooks)
In Supabase: **Database → Webhooks → Create a new hook**. Make **two** hooks,
one per table:
- **Table:** `contact_submissions` (then repeat for `volunteer_applications`)
- **Events:** Insert
- **Type:** HTTP Request → **POST** to the function URL above
- **HTTP Headers:** add `x-webhook-secret` = the same `WEBHOOK_SECRET` you set above

Submit a test form → you should get an email within a few seconds.

## 5. Let staff read submissions
Simplest for now (matches "staff mostly view"): in **Authentication → Users**,
add each staff member. They sign in to the Supabase dashboard and use the
**Table Editor** to read/triage submissions (`status`: new → read → archived).
When you want a branded in-site admin page instead, that's Phase 2.

## Notes
- **Privacy (KDPA):** submissions may contain sensitive personal data. Only add
  trusted staff as users, keep the `service_role` key secret (never in the front end),
  and reflect this collection in your privacy notice. The crisis path stays the
  **helpline**, not a web form.
- **Spam:** a hidden honeypot field is already in both forms. If spam appears
  later, add Cloudflare Turnstile / hCaptcha — I can wire that in.
