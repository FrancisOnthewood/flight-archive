-- Flight Archive profile onboarding support.
-- Safe to run after 202607310001_initial_multi_user_schema.sql.

alter table public.profiles
add column if not exists onboarding_completed boolean not null default false;

-- Existing users with flight data have already completed setup implicitly.
update public.profiles as profile
set onboarding_completed = true
where exists (
  select 1
  from public.flights as flight
  where flight.user_id = profile.user_id
);
