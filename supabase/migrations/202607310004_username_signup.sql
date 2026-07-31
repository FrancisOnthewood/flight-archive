-- Use the unique username as the account's public identity during sign-up.
-- Run after 202607310003_friends.sql.

create or replace function public.is_flight_archive_username_available(candidate text)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select
    coalesce(trim(candidate), '') ~ '^[A-Za-z0-9_.-]{3,30}$'
    and not exists (
      select 1
      from public.profiles as profile
      where lower(profile.username) = lower(trim(candidate))
        and ((select auth.uid()) is null or profile.user_id <> (select auth.uid()))
    );
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_username text := nullif(trim(new.raw_user_meta_data ->> 'username'), '');
begin
  if requested_username is not null
     and requested_username !~ '^[A-Za-z0-9_.-]{3,30}$' then
    requested_username := null;
  end if;

  insert into public.profiles (user_id, display_name, username)
  values (
    new.id,
    coalesce(requested_username, split_part(new.email, '@', 1)),
    requested_username
  )
  on conflict (user_id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

revoke all on function public.is_flight_archive_username_available(text) from public;
grant execute on function public.is_flight_archive_username_available(text) to anon, authenticated;
