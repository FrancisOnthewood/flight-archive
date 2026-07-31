-- Reset only the internal test account while preserving its Auth login/password.
-- Target: flightarchive.test@example.com
-- Run manually in the Supabase SQL Editor when you want to repeat onboarding.

do $$
declare
  test_user_id uuid;
begin
  select id into test_user_id
  from auth.users
  where lower(email) = lower('flightarchive.test@example.com');

  if test_user_id is null then
    raise exception 'Test account not found; no data was changed.';
  end if;

  delete from public.friendships
  where test_user_id in (requester_id, addressee_id);

  delete from public.flights where user_id = test_user_id;
  delete from public.user_hubs where user_id = test_user_id;
  delete from public.user_favourites where user_id = test_user_id;
  -- Supabase protects storage.objects from direct SQL deletion.
  -- Clearing profiles.avatar_path below detaches the previous avatar. If the
  -- physical object ever needs removal, delete it through the Storage UI/API.

  insert into public.user_settings (user_id, language, region, currency, map_style)
  values (test_user_id, 'en', 'CN', 'CNY', 'orbit')
  on conflict (user_id) do update
  set language = excluded.language,
      region = excluded.region,
      currency = excluded.currency,
      map_style = excluded.map_style;

  insert into public.profiles (user_id, display_name, username, avatar_path, onboarding_completed)
  values (test_user_id, 'Flight Archive Test', null, null, false)
  on conflict (user_id) do update
  set display_name = excluded.display_name,
      username = null,
      avatar_path = null,
      onboarding_completed = false;
end;
$$;

select
  user_row.email,
  profile.onboarding_completed,
  profile.username,
  count(flight.id) as flights
from auth.users as user_row
join public.profiles as profile on profile.user_id = user_row.id
left join public.flights as flight on flight.user_id = user_row.id
where lower(user_row.email) = lower('flightarchive.test@example.com')
group by user_row.email, profile.onboarding_completed, profile.username;
