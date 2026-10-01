-- Phase 1 privacy and access hardening
-- Apply after 0001_submissions.sql.

-- Support enquiries may use either email or phone as the safe contact method.
alter table public.contact_submissions
  alter column email drop not null;

-- Restrict application-level staff access by role instead of allowing every
-- authenticated user to read sensitive submissions.
create table if not exists public.staff_access (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  role        text not null check (
    role in (
      'admin',
      'case_worker',
      'volunteer_manager',
      'read_only'
    )
  ),
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.staff_access enable row level security;

-- A signed-in staff user may see only their own membership record.
drop policy if exists "staff read own membership"
on public.staff_access;

create policy "staff read own membership"
on public.staff_access
for select
to authenticated
using (user_id = auth.uid());

-- SECURITY DEFINER keeps policy checks independent of staff_access RLS while
-- still requiring an authenticated user ID and an active,
-- explicitly assigned role.
create or replace function public.has_ast_staff_role(
  allowed_roles text[]
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.staff_access sa
    where sa.user_id = auth.uid()
      and sa.active = true
      and sa.role = any(allowed_roles)
  );
$$;

revoke all
on function public.has_ast_staff_role(text[])
from public;

grant execute
on function public.has_ast_staff_role(text[])
to authenticated;

-- Replace the broad "all authenticated users" policies
-- from migration 0001.
drop policy if exists "auth read contact"
on public.contact_submissions;

drop policy if exists "auth update contact"
on public.contact_submissions;

drop policy if exists "auth read volunteer"
on public.volunteer_applications;

drop policy if exists "auth update volunteer"
on public.volunteer_applications;

create policy "case staff read contact"
on public.contact_submissions
for select
to authenticated
using (
  public.has_ast_staff_role(
    array['admin', 'case_worker', 'read_only']
  )
);

create policy "case staff update contact"
on public.contact_submissions
for update
to authenticated
using (
  public.has_ast_staff_role(
    array['admin', 'case_worker']
  )
)
with check (
  public.has_ast_staff_role(
    array['admin', 'case_worker']
  )
);

create policy "volunteer staff read applications"
on public.volunteer_applications
for select
to authenticated
using (
  public.has_ast_staff_role(
    array['admin', 'volunteer_manager', 'read_only']
  )
);

create policy "volunteer staff update applications"
on public.volunteer_applications
for update
to authenticated
using (
  public.has_ast_staff_role(
    array['admin', 'volunteer_manager']
  )
)
with check (
  public.has_ast_staff_role(
    array['admin', 'volunteer_manager']
  )
);

-- Tighten public insert policies.
-- These checks do not replace rate limiting, but they prevent
-- anonymous callers from setting arbitrary workflow states or
-- inserting unlimited-length values through the anon role.

drop policy if exists "anon insert contact"
on public.contact_submissions;

create policy "anon insert contact"
on public.contact_submissions
for insert
to anon
with check (
  status = 'new'
  and consent = true
  and char_length(name) between 1 and 120
  and char_length(message) between 1 and 5000
  and (email is not null or phone is not null)
  and (
    email is null
    or char_length(email) <= 320
  )
  and (
    phone is null
    or char_length(phone) <= 60
  )
  and (
    reason is null
    or char_length(reason) <= 120
  )
);

drop policy if exists "anon insert volunteer"
on public.volunteer_applications;

create policy "anon insert volunteer"
on public.volunteer_applications
for insert
to anon
with check (
  status = 'new'
  and consent = true
  and char_length(name) between 1 and 160
  and char_length(email) between 3 and 320
  and (
    phone is null
    or char_length(phone) <= 60
  )
  and (
    interest is null
    or char_length(interest) <= 160
  )
  and (
    availability is null
    or char_length(availability) <= 500
  )
  and (
    experience is null
    or char_length(experience) <= 5000
  )
);