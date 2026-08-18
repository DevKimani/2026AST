-- Arise Strong Together — form submissions schema
-- Run in Supabase SQL editor (or via `supabase db push`).

-- ------- Contact submissions -------
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  reason      text,
  message     text not null,
  consent     boolean not null default false,
  status      text not null default 'new'   -- new | read | archived
);

-- ------- Volunteer applications -------
create table if not exists public.volunteer_applications (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  phone         text,
  interest      text,
  availability  text,
  experience    text,
  consent       boolean not null default false,
  status        text not null default 'new'
);

-- ------- Row-Level Security -------
alter table public.contact_submissions   enable row level security;
alter table public.volunteer_applications enable row level security;

-- Public (anon) may INSERT only — never read. Submissions can hold sensitive data.
create policy "anon insert contact" on public.contact_submissions
  for insert to anon with check (true);
create policy "anon insert volunteer" on public.volunteer_applications
  for insert to anon with check (true);

-- Signed-in staff may read and update (triage: new -> read -> archived).
create policy "auth read contact" on public.contact_submissions
  for select to authenticated using (true);
create policy "auth update contact" on public.contact_submissions
  for update to authenticated using (true) with check (true);
create policy "auth read volunteer" on public.volunteer_applications
  for select to authenticated using (true);
create policy "auth update volunteer" on public.volunteer_applications
  for update to authenticated using (true) with check (true);

-- Helpful indexes for the staff view
create index if not exists idx_contact_created  on public.contact_submissions (created_at desc);
create index if not exists idx_vol_created      on public.volunteer_applications (created_at desc);
