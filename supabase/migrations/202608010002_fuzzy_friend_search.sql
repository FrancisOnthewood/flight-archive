-- Live, case-insensitive and typo-tolerant username search.
create extension if not exists pg_trgm with schema extensions;

create or replace function public.search_flight_archive_users(search_text text)
returns table (
  user_id uuid,
  username text,
  display_name text,
  status text,
  direction text
)
language sql
security definer
stable
set search_path = ''
as $$
  select
    profile.user_id,
    profile.username,
    profile.display_name,
    friendship.status,
    case
      when friendship.requester_id = (select auth.uid()) then 'outgoing'
      when friendship.addressee_id = (select auth.uid()) then 'incoming'
      else null
    end
  from public.profiles as profile
  left join public.friendships as friendship
    on (
      friendship.requester_id = (select auth.uid()) and friendship.addressee_id = profile.user_id
    ) or (
      friendship.addressee_id = (select auth.uid()) and friendship.requester_id = profile.user_id
    )
  where (select auth.uid()) is not null
    and profile.user_id <> (select auth.uid())
    and profile.username is not null
    and length(trim(search_text)) >= 1
    and (
      strpos(lower(profile.username), lower(trim(search_text))) > 0
      or strpos(lower(coalesce(profile.display_name, '')), lower(trim(search_text))) > 0
      or extensions.similarity(lower(profile.username), lower(trim(search_text))) >= .18
      or extensions.similarity(lower(coalesce(profile.display_name, '')), lower(trim(search_text))) >= .18
    )
  order by
    case when lower(profile.username) = lower(trim(search_text)) then 0 else 1 end,
    case when lower(profile.username) like lower(trim(search_text)) || '%' then 0 else 1 end,
    greatest(
      extensions.similarity(lower(profile.username), lower(trim(search_text))),
      extensions.similarity(lower(coalesce(profile.display_name, '')), lower(trim(search_text)))
    ) desc,
    profile.username
  limit 20;
$$;

revoke all on function public.search_flight_archive_users(text) from public;
grant execute on function public.search_flight_archive_users(text) to authenticated;
