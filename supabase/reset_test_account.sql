-- Reset only the internal test account while preserving its Auth login/password.
-- Target: flightarchive.test@example.com
-- Run manually in the Supabase SQL Editor when you want to repeat onboarding.

do $$
declare
  test_user_id uuid;
  preserved_username text;
begin
  select user_row.id, nullif(trim(profile.username), '')
  into test_user_id, preserved_username
  from auth.users as user_row
  left join public.profiles as profile on profile.user_id = user_row.id
  where lower(user_row.email) = lower('flightarchive.test@example.com');

  if test_user_id is null then
    raise exception 'Test account not found; no data was changed.';
  end if;

  preserved_username := coalesce(
    preserved_username,
    nullif(trim((select raw_user_meta_data ->> 'username' from auth.users where id = test_user_id)), ''),
    'flightarchive.test'
  );

  if exists (
    select 1 from public.profiles
    where user_id <> test_user_id
      and lower(username) = lower(preserved_username)
  ) then
    preserved_username := 'flightarchive.test-' || left(test_user_id::text, 6);
  end if;

  delete from public.friendships
  where test_user_id in (requester_id, addressee_id);

  delete from public.flights where user_id = test_user_id;
  delete from public.user_hubs where user_id = test_user_id;
  delete from public.user_favourites where user_id = test_user_id;
  -- Supabase protects storage.objects from direct SQL deletion.
  -- Clearing profiles.avatar_path below detaches the previous avatar. If the
  -- physical object ever needs removal, delete it through the Storage UI/API.

  -- Keep the registered username because username is no longer part of the
  -- onboarding form. Login, password, and email also remain unchanged.
  update auth.users
  set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
      || jsonb_build_object(
        'username', preserved_username,
        'display_name', preserved_username,
        'language', 'en'
      ),
      updated_at = timezone('utc', now())
  where id = test_user_id;

  insert into public.user_settings (user_id, language, region, currency, map_style, day_night)
  values (test_user_id, 'en', 'CN', 'CNY', 'orbit', true)
  on conflict (user_id) do update
  set language = excluded.language,
      region = excluded.region,
      currency = excluded.currency,
      map_style = excluded.map_style,
      day_night = excluded.day_night;

  insert into public.profiles (user_id, display_name, username, avatar_path, onboarding_completed)
  values (test_user_id, preserved_username, preserved_username, null, false)
  on conflict (user_id) do update
  set display_name = excluded.display_name,
      username = excluded.username,
      avatar_path = null,
      onboarding_completed = false;
end;
$$;

select
  user_row.email,
  profile.onboarding_completed,
  profile.username,
  count(distinct flight.id) as flights,
  count(distinct hub.airport_code) as hubs,
  count(distinct favourite.category) as favourites,
  count(distinct friendship.id) as friendships
from auth.users as user_row
join public.profiles as profile on profile.user_id = user_row.id
left join public.flights as flight on flight.user_id = user_row.id
left join public.user_hubs as hub on hub.user_id = user_row.id
left join public.user_favourites as favourite on favourite.user_id = user_row.id
left join public.friendships as friendship
  on user_row.id in (friendship.requester_id, friendship.addressee_id)
where lower(user_row.email) = lower('flightarchive.test@example.com')
group by user_row.email, profile.onboarding_completed, profile.username;
