-- Phase 2 donation hardening.
-- Apply after 0003_phase1_privacy_security.sql.

-- Add a finance-specific staff role so donation access does not grant access
-- to confidential survivor/contact submissions.
alter table public.staff_access
  drop constraint if exists staff_access_role_check;

alter table public.staff_access
  add constraint staff_access_role_check
  check (
    role in (
      'admin',
      'case_worker',
      'volunteer_manager',
      'finance_manager',
      'read_only'
    )
  );

-- Replace the broad authenticated-user donation policy from 0002.
drop policy if exists "auth read donations" on public.donations;
drop policy if exists "finance staff read donations" on public.donations;

create policy "finance staff read donations"
on public.donations
for select
to authenticated
using (
  public.has_ast_staff_role(
    array['admin', 'finance_manager']
  )
);

alter table public.donations
  drop constraint if exists donations_currency_check;

alter table public.donations
  add constraint donations_currency_check
  check (currency in ('KES'));

alter table public.donations
  drop constraint if exists donations_frequency_check;

alter table public.donations
  add constraint donations_frequency_check
  check (frequency in ('once', 'monthly'));

alter table public.donations
  drop constraint if exists donations_method_check;

alter table public.donations
  add constraint donations_method_check
  check (method in ('mpesa', 'card'));

alter table public.donations
  drop constraint if exists donations_status_check;

alter table public.donations
  add constraint donations_status_check
  check (
    status in (
      'pending',
      'paid',
      'failed',
      'cancelled'
    )
  );