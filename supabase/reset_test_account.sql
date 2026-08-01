-- Reset only the internal test account while preserving Auth login, password,
-- email, and its registered username.
-- Target: flightarchive.test@example.com
-- Run the complete file in the Supabase SQL Editor.

begin;

delete from public.friendships
where requester_id = (
  select id from auth.users where lower(email) = lower('flightarchive.test@example.com')
)
or addressee_id = (
  select id from auth.users where lower(email) = lower('flightarchive.test@example.com')
);

delete from public.flights
where user_id = (
  select id from auth.users where lower(email) = lower('flightarchive.test@example.com')
);

delete from public.user_hubs
where user_id = (
  select id from auth.users where lower(email) = lower('flightarchive.test@example.com')
);

delete from public.user_favourites
where user_id = (
  select id from auth.users where lower(email) = lower('flightarchive.test@example.com')
);

insert into public.user_settings (user_id, language, region, currency, map_style, day_night)
select id, 'en', 'CN', 'CNY', 'orbit', true
from auth.users
where lower(email) = lower('flightarchive.test@example.com')
on conflict (user_id) do update
set language = excluded.language,
    region = excluded.region,
    currency = excluded.currency,
    map_style = excluded.map_style,
    day_night = excluded.day_night;

update public.profiles
set avatar_path = null,
    onboarding_completed = false,
    updated_at = timezone('utc', now())
where user_id = (
  select id from auth.users where lower(email) = lower('flightarchive.test@example.com')
);

-- Keep Auth metadata aligned with the username stored in public.profiles.
update auth.users as user_row
set raw_user_meta_data = coalesce(user_row.raw_user_meta_data, '{}'::jsonb)
    || jsonb_build_object(
      'username', profile.username,
      'display_name', profile.username,
      'language', 'en'
    ),
    updated_at = timezone('utc', now())
from public.profiles as profile
where profile.user_id = user_row.id
  and profile.username is not null
  and lower(user_row.email) = lower('flightarchive.test@example.com');

commit;

select
  user_row.email,
  profile.onboarding_completed,
  profile.username,
  (select count(*) from public.flights where user_id = user_row.id) as flights,
  (select count(*) from public.user_hubs where user_id = user_row.id) as hubs,
  (select count(*) from public.user_favourites where user_id = user_row.id) as favourites,
  (
    select count(*)
    from public.friendships
    where user_row.id in (requester_id, addressee_id)
  ) as friendships
from auth.users as user_row
join public.profiles as profile on profile.user_id = user_row.id
where lower(user_row.email) = lower('flightarchive.test@example.com');
