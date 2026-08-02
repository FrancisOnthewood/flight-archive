-- Keep legacy usernames searchable and return friend email/avatar metadata.

update public.profiles as profile
set
  username = 'FrancisOnthewood',
  display_name = coalesce(nullif(trim(profile.display_name), ''), 'FrancisOnthewood')
from auth.users as auth_user
where auth_user.id = profile.user_id
  and lower(auth_user.email) = lower('lihaozhe041128@gmail.com')
  and (profile.username is null or trim(profile.username) = '')
  and not exists (
    select 1
    from public.profiles as other
    where other.user_id <> profile.user_id
      and lower(other.username) = lower('FrancisOnthewood')
  );

drop function if exists public.search_flight_archive_users(text);
create function public.search_flight_archive_users(search_text text)
returns table (
  user_id uuid,
  username text,
  display_name text,
  avatar_path text,
  status text,
  direction text
)
language sql
security definer
stable
set search_path = ''
as $$
  with candidates as (
    select
      profile.user_id,
      coalesce(
        nullif(trim(profile.username), ''),
        nullif(trim(auth_user.raw_user_meta_data ->> 'username'), ''),
        nullif(trim(profile.display_name), '')
      ) as resolved_username,
      coalesce(
        nullif(trim(profile.display_name), ''),
        nullif(trim(profile.username), ''),
        nullif(trim(auth_user.raw_user_meta_data ->> 'username'), '')
      ) as resolved_display_name,
      profile.avatar_path
    from public.profiles as profile
    join auth.users as auth_user on auth_user.id = profile.user_id
  )
  select
    candidate.user_id,
    candidate.resolved_username,
    candidate.resolved_display_name,
    candidate.avatar_path,
    friendship.status,
    case
      when friendship.requester_id = (select auth.uid()) then 'outgoing'
      when friendship.addressee_id = (select auth.uid()) then 'incoming'
      else null
    end
  from candidates as candidate
  left join public.friendships as friendship
    on (
      friendship.requester_id = (select auth.uid()) and friendship.addressee_id = candidate.user_id
    ) or (
      friendship.addressee_id = (select auth.uid()) and friendship.requester_id = candidate.user_id
    )
  where (select auth.uid()) is not null
    and candidate.user_id <> (select auth.uid())
    and candidate.resolved_username is not null
    and length(trim(search_text)) >= 1
    and (
      strpos(lower(candidate.resolved_username), lower(trim(search_text))) > 0
      or strpos(lower(coalesce(candidate.resolved_display_name, '')), lower(trim(search_text))) > 0
      or extensions.similarity(lower(candidate.resolved_username), lower(trim(search_text))) >= .18
      or extensions.similarity(lower(coalesce(candidate.resolved_display_name, '')), lower(trim(search_text))) >= .18
    )
  order by
    case when lower(candidate.resolved_username) = lower(trim(search_text)) then 0 else 1 end,
    case when lower(candidate.resolved_username) like lower(trim(search_text)) || '%' then 0 else 1 end,
    greatest(
      extensions.similarity(lower(candidate.resolved_username), lower(trim(search_text))),
      extensions.similarity(lower(coalesce(candidate.resolved_display_name, '')), lower(trim(search_text)))
    ) desc,
    candidate.resolved_username
  limit 20;
$$;

drop function if exists public.list_flight_archive_friends();
create function public.list_flight_archive_friends()
returns table (
  friendship_id uuid,
  user_id uuid,
  username text,
  display_name text,
  email text,
  avatar_path text,
  status text,
  direction text,
  created_at timestamptz,
  accepted_at timestamptz
)
language sql
security definer
stable
set search_path = ''
as $$
  select
    friendship.id,
    profile.user_id,
    coalesce(
      nullif(trim(profile.username), ''),
      nullif(trim(friend_user.raw_user_meta_data ->> 'username'), ''),
      nullif(trim(profile.display_name), '')
    ),
    coalesce(nullif(trim(profile.display_name), ''), nullif(trim(profile.username), '')),
    friend_user.email::text,
    profile.avatar_path,
    friendship.status,
    case when friendship.requester_id = (select auth.uid()) then 'outgoing' else 'incoming' end,
    friendship.created_at,
    friendship.accepted_at
  from public.friendships as friendship
  join public.profiles as profile
    on profile.user_id = case
      when friendship.requester_id = (select auth.uid()) then friendship.addressee_id
      else friendship.requester_id
    end
  join auth.users as friend_user on friend_user.id = profile.user_id
  where (select auth.uid()) in (friendship.requester_id, friendship.addressee_id)
  order by
    case when friendship.status = 'pending' then 0 else 1 end,
    coalesce(friendship.accepted_at, friendship.created_at) desc;
$$;

revoke all on function public.search_flight_archive_users(text) from public;
revoke all on function public.list_flight_archive_friends() from public;
grant execute on function public.search_flight_archive_users(text) to authenticated;
grant execute on function public.list_flight_archive_friends() to authenticated;
