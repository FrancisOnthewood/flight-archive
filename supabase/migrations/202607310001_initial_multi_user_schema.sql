-- Flight Archive multi-user schema
-- Run with the Supabase CLI or paste into the Supabase SQL editor.

create schema if not exists private;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  username text unique,
  avatar_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  language text not null default 'en' check (language in ('en', 'zh')),
  region text not null default 'CN',
  currency text not null default 'CNY',
  map_style text not null default 'orbit' check (map_style in ('light', 'orbit', 'flat')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.flights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  record_status text not null default 'completed' check (record_status in ('completed', 'upcoming')),
  flight_date date not null,
  flight_number text not null,
  airline text not null,
  airline_code text,
  aircraft text,
  registration text,
  departure_airport text not null,
  arrival_airport text not null,
  departure_terminal text,
  arrival_terminal text,
  departure_time time,
  arrival_time time,
  arrival_day_offset smallint not null default 0 check (arrival_day_offset between -1 and 3),
  duration_minutes integer check (duration_minutes is null or duration_minutes >= 0),
  distance_km integer check (distance_km is null or distance_km >= 0),
  seat text,
  cabin text,
  gate text,
  fare numeric(12, 2) check (fare is null or fare >= 0),
  fare_currency text not null default 'CNY',
  fare_raw text,
  fare_group text,
  booking_channel text,
  flight_scope text check (flight_scope is null or flight_scope in ('domestic', 'international')),
  operational_status text,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (departure_airport ~ '^[A-Z]{3}$'),
  check (arrival_airport ~ '^[A-Z]{3}$')
);

create table if not exists public.user_hubs (
  user_id uuid not null references auth.users(id) on delete cascade,
  airport_code text not null check (airport_code ~ '^[A-Z]{3}$'),
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, airport_code)
);

create table if not exists public.user_favourites (
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('aircraft', 'airline', 'airport', 'country', 'city')),
  value text not null,
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, category)
);

create table if not exists public.flight_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  flight_id uuid not null references public.flights(id) on delete cascade,
  storage_path text not null unique,
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists flights_user_date_idx
  on public.flights (user_id, flight_date desc);
create index if not exists flights_user_status_idx
  on public.flights (user_id, record_status, flight_date desc);
create index if not exists flight_photos_user_flight_idx
  on public.flight_photos (user_id, flight_id);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function private.set_updated_at();

drop trigger if exists user_settings_set_updated_at on public.user_settings;
create trigger user_settings_set_updated_at
before update on public.user_settings
for each row execute function private.set_updated_at();

drop trigger if exists flights_set_updated_at on public.flights;
create trigger flights_set_updated_at
before update on public.flights
for each row execute function private.set_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (user_id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.flights enable row level security;
alter table public.user_hubs enable row level security;
alter table public.user_favourites enable row level security;
alter table public.flight_photos enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "settings_own_rows" on public.user_settings;
create policy "settings_own_rows"
on public.user_settings for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "flights_own_rows" on public.flights;
create policy "flights_own_rows"
on public.flights for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "hubs_own_rows" on public.user_hubs;
create policy "hubs_own_rows"
on public.user_hubs for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "favourites_own_rows" on public.user_favourites;
create policy "favourites_own_rows"
on public.user_favourites for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "photos_own_rows" on public.flight_photos;
create policy "photos_own_rows"
on public.flight_photos for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'flight-photos',
  'flight-photos',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "flight_photos_storage_select_own" on storage.objects;
create policy "flight_photos_storage_select_own"
on storage.objects for select
to authenticated
using (
  bucket_id = 'flight-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "flight_photos_storage_insert_own" on storage.objects;
create policy "flight_photos_storage_insert_own"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'flight-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "flight_photos_storage_update_own" on storage.objects;
create policy "flight_photos_storage_update_own"
on storage.objects for update
to authenticated
using (
  bucket_id = 'flight-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'flight-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "flight_photos_storage_delete_own" on storage.objects;
create policy "flight_photos_storage_delete_own"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'flight-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.user_settings to authenticated;
grant select, insert, update, delete on public.flights to authenticated;
grant select, insert, update, delete on public.user_hubs to authenticated;
grant select, insert, update, delete on public.user_favourites to authenticated;
grant select, insert, update, delete on public.flight_photos to authenticated;

