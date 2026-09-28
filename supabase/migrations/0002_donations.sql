-- Donations: written only by Edge Functions (service role); read by staff.
create table if not exists public.donations (
  id           uuid primary key default gen_random_uuid(),
  reference    uuid not null default gen_random_uuid() unique,  -- public, unguessable status token
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  amount       numeric not null check (amount > 0),
  currency     text not null default 'KES',
  frequency    text not null default 'once',   -- once | monthly
  method       text not null default 'mpesa',  -- mpesa | card
  name         text,
  email        text,
  phone        text,
  status       text not null default 'pending', -- pending | paid | failed | cancelled
  provider     text,
  provider_ref text
);
alter table public.donations enable row level security;
-- No anon/auth INSERT or UPDATE: only the service role (Edge Functions) writes.
create policy "auth read donations" on public.donations for select to authenticated using (true);
create index if not exists idx_donations_created on public.donations (created_at desc);
create index if not exists idx_donations_ref on public.donations (reference);
