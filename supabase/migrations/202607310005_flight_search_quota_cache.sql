-- Shared flight-search cache and server-side quota enforcement.
-- Cached searches are free. Only cache misses that reach the external provider
-- count toward the per-user daily limit and the global monthly API-unit budget.

create table if not exists public.flight_search_cache (
  cache_key text primary key,
  query_kind text not null check (query_kind in ('number', 'route')),
  flight_date date not null,
  flight_number text,
  departure_iata text,
  arrival_iata text,
  provider text not null default 'AeroDataBox',
  results jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz not null,
  constraint flight_search_cache_number_or_route check (
    (query_kind = 'number' and flight_number is not null)
    or
    (query_kind = 'route' and departure_iata is not null and arrival_iata is not null)
  )
);

create index if not exists flight_search_cache_expiry_idx
  on public.flight_search_cache (expires_at);

create table if not exists public.flight_search_daily_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  usage_date date not null,
  external_request_count integer not null default 0 check (external_request_count >= 0),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, usage_date)
);

create table if not exists public.flight_search_monthly_usage (
  period_start date primary key,
  api_units integer not null default 0 check (api_units >= 0),
  external_request_count integer not null default 0 check (external_request_count >= 0),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.flight_search_cache enable row level security;
alter table public.flight_search_daily_usage enable row level security;
alter table public.flight_search_monthly_usage enable row level security;

-- These tables are deliberately server-only. The Edge Function uses the
-- service role after independently verifying the caller's access token.
revoke all on table public.flight_search_cache from anon, authenticated;
revoke all on table public.flight_search_daily_usage from anon, authenticated;
revoke all on table public.flight_search_monthly_usage from anon, authenticated;
grant all on table public.flight_search_cache to service_role;
grant all on table public.flight_search_daily_usage to service_role;
grant all on table public.flight_search_monthly_usage to service_role;

create or replace function public.reserve_flight_search_capacity(
  target_user_id uuid,
  requested_units integer,
  daily_limit integer default 20,
  monthly_limit integer default 480
)
returns table (
  allowed boolean,
  reason text,
  user_used integer,
  user_limit integer,
  units_used integer,
  units_limit integer
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_usage_date date := timezone('utc', now())::date;
  current_period date := date_trunc('month', timezone('utc', now()))::date;
  current_user_count integer;
  current_units integer;
begin
  if target_user_id is null or requested_units < 1 or daily_limit < 1 or monthly_limit < 1 then
    raise exception 'Invalid flight-search capacity arguments.';
  end if;

  -- Always acquire locks in this order so simultaneous requests cannot race
  -- past either limit and cannot deadlock one another.
  perform pg_advisory_xact_lock(
    hashtextextended('flight-search-global:' || current_period::text, 0)
  );
  perform pg_advisory_xact_lock(
    hashtextextended('flight-search-user:' || target_user_id::text || ':' || current_usage_date::text, 0)
  );

  select usage.external_request_count
    into current_user_count
    from public.flight_search_daily_usage as usage
   where usage.user_id = target_user_id
     and usage.usage_date = current_usage_date;

  select usage.api_units
    into current_units
    from public.flight_search_monthly_usage as usage
   where usage.period_start = current_period;

  current_user_count := coalesce(current_user_count, 0);
  current_units := coalesce(current_units, 0);
  if current_user_count >= daily_limit then
    return query
      select false, 'daily_limit'::text, current_user_count, daily_limit, current_units, monthly_limit;
    return;
  end if;

  if current_units + requested_units > monthly_limit then
    return query
      select false, 'monthly_limit'::text, current_user_count, daily_limit, current_units, monthly_limit;
    return;
  end if;

  insert into public.flight_search_daily_usage (
    user_id,
    usage_date,
    external_request_count,
    updated_at
  ) values (
    target_user_id,
    current_usage_date,
    current_user_count + 1,
    timezone('utc', now())
  )
  on conflict (user_id, usage_date) do update
    set external_request_count = excluded.external_request_count,
        updated_at = excluded.updated_at;

  insert into public.flight_search_monthly_usage (
    period_start,
    api_units,
    external_request_count,
    updated_at
  ) values (
    current_period,
    current_units + requested_units,
    1,
    timezone('utc', now())
  )
  on conflict (period_start) do update
    set api_units = excluded.api_units,
        external_request_count = public.flight_search_monthly_usage.external_request_count + 1,
        updated_at = excluded.updated_at;

  return query
    select true, null::text, current_user_count + 1, daily_limit,
           current_units + requested_units, monthly_limit;
end;
$$;

revoke all on function public.reserve_flight_search_capacity(uuid, integer, integer, integer) from public, anon, authenticated;
grant execute on function public.reserve_flight_search_capacity(uuid, integer, integer, integer) to service_role;
