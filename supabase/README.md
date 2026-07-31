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
12-hour airport schedule requests and filters the results by destination.
Provider coverage and free-plan quota still apply, so the UI always keeps a
manual-entry path available.
