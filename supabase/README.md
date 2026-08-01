# Flight Archive backend

This directory contains the database and access-control definition for the
multi-user version of Flight Archive.

## Security model

- Supabase Auth owns user identities.
- Every private application row contains `user_id`.
- PostgreSQL Row Level Security compares `user_id` with `auth.uid()`.
- Flight photos live in the private `flight-photos` bucket under
  `<user-id>/<flight-id>/<filename>`.
- The browser may receive only the Supabase project URL and publishable key.
- Never place a `service_role` or secret key in this repository or browser code.

## Apply the schema

Create a Supabase project, then either:

1. paste `migrations/202607310001_initial_multi_user_schema.sql` into the SQL
   editor and run it once; or
2. link the Supabase CLI and run `supabase db push`.

After applying the migration, verify that RLS is enabled on every table and
that the `flight-photos` bucket is private.

## Authentication redirects

Add the production frontend URL and local development URL to the Supabase Auth
redirect allow list. The intended production frontend will be hosted on
Cloudflare Pages.

## Real-flight lookup

Flight Archive queries AeroDataBox through the `flight-search` Edge Function.
The browser never receives the provider API key.

Before deploying the function, apply
`migrations/202607310005_flight_search_quota_cache.sql`. It adds:

- a shared cache keyed by the canonical search query;
- per-user query counts for monitoring, without a daily user limit;
- a global stop at 480 AeroDataBox API Units per UTC calendar month;
- atomic quota reservations, so simultaneous requests cannot exceed either
  limit.

Flight-number searches reserve 2 Units and route searches reserve 4 Units.
Cache hits consume no API Units. Past-flight
cache entries remain valid for one year; current and future schedules are
refreshed after 12 hours. When a limit is reached, the frontend opens the
manual-entry form and keeps the user's date, flight number, and airport codes.
Empty provider results are not cached. All accounts remain subject to the
shared 480-Unit ceiling even though the per-user daily limit is disabled.

1. Subscribe to an AeroDataBox plan on RapidAPI and copy the RapidAPI key.
2. In Supabase, add the Edge Function secret `AERODATABOX_API_KEY`.
3. Optionally add `AERODATABOX_API_HOST` with the value
   `aerodatabox.p.rapidapi.com` (the function already uses this by default).
4. Deploy the function:

   ```powershell
   supabase functions deploy flight-search --project-ref syoveioaykftjukhduwx
   ```

The function requires a signed-in Supabase user. Date plus flight number uses
the single-flight endpoint. Date plus departure and arrival airport uses two
12-hour airport schedule requests and filters the results by destination. The
FIDS response may omit the requested airport from each departure record, so
the function restores that known IATA code before normalizing candidates.
Provider coverage and free-plan quota still apply, so the UI always keeps a
manual-entry path available.

### Check current usage

Run these read-only queries in the Supabase SQL Editor:

```sql
select *
from public.flight_search_monthly_usage
order by period_start desc;

select usage_date, external_request_count, user_id
from public.flight_search_daily_usage
order by usage_date desc, external_request_count desc;

select cache_key, provider, created_at, expires_at,
       jsonb_array_length(results) as result_count
from public.flight_search_cache
order by created_at desc
limit 50;
```
