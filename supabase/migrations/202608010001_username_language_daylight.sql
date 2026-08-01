-- Unrestricted Unicode usernames, sign-up language, friend avatars, and daylight preference.

alter table public.profiles
drop constraint if exists profiles_username_format;

create unique index if not exists profiles_username_lower_unique
on public.profiles (lower(username))
where username is not null;

create or replace function public.is_flight_archive_username_available(candidate text)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select
    length(trim(coalesce(candidate, ''))) > 0
    and not exists (
      select 1
      from public.profiles as profile
      where lower(profile.username) = lower(trim(candidate))
        and ((select auth.uid()) is null or profile.user_id <> (select auth.uid()))
    );
$$;

alter table public.user_settings
add column if not exists day_night boolean not null default true;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_username text := nullif(trim(new.raw_user_meta_data ->> 'username'), '');
  requested_language text := case when new.raw_user_meta_data ->> 'language' = 'zh' then 'zh' else 'en' end;
begin
  insert into public.profiles (user_id, display_name, username)
  values (
    new.id,
    coalesce(requested_username, split_part(new.email, '@', 1)),
    requested_username
  )
  on conflict (user_id) do nothing;

  insert into public.user_settings (user_id, language)
  values (new.id, requested_language)
  on conflict (user_id) do update set language = excluded.language;

  return new;
end;
$$;

create or replace function public.get_flight_archive_profile_avatars(profile_user_ids uuid[])
returns table (user_id uuid, avatar_path text)
language sql
security definer
stable
set search_path = ''
as $$
  select profile.user_id, profile.avatar_path
  from public.profiles as profile
  where (select auth.uid()) is not null
    and profile.user_id = any(profile_user_ids)
    and profile.avatar_path is not null;
$$;

drop policy if exists "flight_profile_avatars_authenticated" on storage.objects;
create policy "flight_profile_avatars_authenticated"
on storage.objects for select
to authenticated
using (
  bucket_id = 'flight-photos'
  and (storage.foldername(name))[2] = 'profile'
);

revoke all on function public.is_flight_archive_username_available(text) from public;
grant execute on function public.is_flight_archive_username_available(text) to anon, authenticated;
revoke all on function public.get_flight_archive_profile_avatars(uuid[]) from public;
grant execute on function public.get_flight_archive_profile_avatars(uuid[]) to authenticated;
