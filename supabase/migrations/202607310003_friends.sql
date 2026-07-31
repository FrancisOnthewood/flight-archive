-- Flight Archive friends and username discovery.
-- Run after 202607310002_profile_onboarding.sql.

alter table public.profiles
drop constraint if exists profiles_username_format;

alter table public.profiles
add constraint profiles_username_format
check (username is null or username ~ '^[A-Za-z0-9_.-]{3,30}$');

create unique index if not exists profiles_username_lower_unique
on public.profiles (lower(username))
where username is not null;

create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users(id) on delete cascade,
  addressee_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  accepted_at timestamptz,
  check (requester_id <> addressee_id)
);

create unique index if not exists friendships_unordered_pair_unique
on public.friendships (
  least(requester_id::text, addressee_id::text),
  greatest(requester_id::text, addressee_id::text)
);

drop trigger if exists friendships_set_updated_at on public.friendships;
create trigger friendships_set_updated_at
before update on public.friendships
for each row execute function private.set_updated_at();

alter table public.friendships enable row level security;

drop policy if exists "friendships_select_participant" on public.friendships;
create policy "friendships_select_participant"
on public.friendships for select
to authenticated
using ((select auth.uid()) in (requester_id, addressee_id));

revoke insert, update, delete on public.friendships from authenticated;
grant select on public.friendships to authenticated;

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
    and length(trim(search_text)) >= 2
    and (
      strpos(lower(profile.username), lower(trim(search_text))) > 0
      or strpos(lower(coalesce(profile.display_name, '')), lower(trim(search_text))) > 0
    )
  order by
    case when lower(profile.username) = lower(trim(search_text)) then 0 else 1 end,
    profile.username
  limit 20;
$$;

create or replace function public.list_flight_archive_friends()
returns table (
  friendship_id uuid,
  user_id uuid,
  username text,
  display_name text,
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
    profile.username,
    profile.display_name,
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
  where (select auth.uid()) in (friendship.requester_id, friendship.addressee_id)
  order by
    case when friendship.status = 'pending' then 0 else 1 end,
    coalesce(friendship.accepted_at, friendship.created_at) desc;
$$;

create or replace function public.send_flight_archive_friend_request(target_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  new_friendship_id uuid;
begin
  if current_user_id is null then
    raise exception 'Authentication required.';
  end if;
  if target_user_id = current_user_id then
    raise exception 'You cannot add yourself.';
  end if;
  if not exists (
    select 1 from public.profiles
    where user_id = target_user_id and username is not null
  ) then
    raise exception 'User not found.';
  end if;
  if exists (
    select 1 from public.friendships
    where current_user_id in (requester_id, addressee_id)
      and target_user_id in (requester_id, addressee_id)
  ) then
    raise exception 'A friendship or request already exists.';
  end if;

  insert into public.friendships (requester_id, addressee_id)
  values (current_user_id, target_user_id)
  returning id into new_friendship_id;
  return new_friendship_id;
end;
$$;

create or replace function public.respond_flight_archive_friend_request(friendship_id uuid, accept_request boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if accept_request then
    update public.friendships
    set status = 'accepted', accepted_at = timezone('utc', now())
    where id = friendship_id
      and addressee_id = (select auth.uid())
      and status = 'pending';
    if not found then raise exception 'Pending friend request not found.'; end if;
  else
    delete from public.friendships
    where id = friendship_id
      and addressee_id = (select auth.uid())
      and status = 'pending';
    if not found then raise exception 'Pending friend request not found.'; end if;
  end if;
end;
$$;

create or replace function public.remove_flight_archive_friend(friendship_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.friendships
  where id = friendship_id
    and (select auth.uid()) in (requester_id, addressee_id);
  if not found then raise exception 'Friendship not found.'; end if;
end;
$$;

create or replace function public.get_flight_archive_friend_flights(friend_user_id uuid)
returns setof public.flights
language sql
security definer
stable
set search_path = ''
as $$
  select flight.*
  from public.flights as flight
  where flight.user_id = friend_user_id
    and flight.record_status = 'completed'
    and exists (
      select 1
      from public.friendships as friendship
      where friendship.status = 'accepted'
        and (select auth.uid()) in (friendship.requester_id, friendship.addressee_id)
        and friend_user_id in (friendship.requester_id, friendship.addressee_id)
    )
  order by flight.flight_date desc;
$$;

revoke all on function public.search_flight_archive_users(text) from public;
revoke all on function public.list_flight_archive_friends() from public;
revoke all on function public.send_flight_archive_friend_request(uuid) from public;
revoke all on function public.respond_flight_archive_friend_request(uuid, boolean) from public;
revoke all on function public.remove_flight_archive_friend(uuid) from public;
revoke all on function public.get_flight_archive_friend_flights(uuid) from public;

grant execute on function public.search_flight_archive_users(text) to authenticated;
grant execute on function public.list_flight_archive_friends() to authenticated;
grant execute on function public.send_flight_archive_friend_request(uuid) to authenticated;
grant execute on function public.respond_flight_archive_friend_request(uuid, boolean) to authenticated;
grant execute on function public.remove_flight_archive_friend(uuid) to authenticated;
grant execute on function public.get_flight_archive_friend_flights(uuid) to authenticated;
