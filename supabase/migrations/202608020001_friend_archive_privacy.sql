-- Per-user friend archive privacy and a privacy-aware friend archive RPC.

alter table public.user_settings
  add column if not exists friends_can_view_records boolean not null default true,
  add column if not exists friends_can_view_incoming boolean not null default true,
  add column if not exists friends_can_view_statistics boolean not null default true;

create or replace function public.get_flight_archive_friend_archive(friend_user_id uuid)
returns jsonb
language plpgsql
security definer
stable
set search_path = ''
as $$
declare
  can_records boolean := true;
  can_incoming boolean := true;
  can_statistics boolean := true;
  completed_rows jsonb := '[]'::jsonb;
  incoming_rows jsonb := '[]'::jsonb;
  statistics_summary jsonb := '{}'::jsonb;
  statistics_airports jsonb := '[]'::jsonb;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required.';
  end if;

  if not exists (
    select 1
    from public.friendships as friendship
    where friendship.status = 'accepted'
      and (select auth.uid()) in (friendship.requester_id, friendship.addressee_id)
      and friend_user_id in (friendship.requester_id, friendship.addressee_id)
  ) then
    raise exception 'Accepted friendship required.';
  end if;

  select
    coalesce(settings.friends_can_view_records, true),
    coalesce(settings.friends_can_view_incoming, true),
    coalesce(settings.friends_can_view_statistics, true)
  into can_records, can_incoming, can_statistics
  from public.user_settings as settings
  where settings.user_id = friend_user_id;

  if not found then
    can_records := true;
    can_incoming := true;
    can_statistics := true;
  end if;

  if can_records then
    select coalesce(jsonb_agg(to_jsonb(flight) order by flight.flight_date desc), '[]'::jsonb)
    into completed_rows
    from public.flights as flight
    where flight.user_id = friend_user_id and flight.record_status = 'completed';
  end if;

  if can_incoming then
    select coalesce(jsonb_agg(to_jsonb(flight) order by flight.flight_date), '[]'::jsonb)
    into incoming_rows
    from public.flights as flight
    where flight.user_id = friend_user_id and flight.record_status = 'upcoming';
  end if;

  if can_statistics then
    select jsonb_build_object(
      'flight_count', count(*),
      'total_distance', coalesce(sum(flight.distance_km), 0),
      'total_minutes', coalesce(sum(flight.duration_minutes), 0),
      'airline_count', count(distinct coalesce(flight.airline_code, flight.airline)),
      'aircraft_count', count(distinct flight.aircraft),
      'route_count', count(distinct (flight.departure_airport || '>' || flight.arrival_airport))
    )
    into statistics_summary
    from public.flights as flight
    where flight.user_id = friend_user_id and flight.record_status = 'completed';

    select coalesce(jsonb_agg(airport.code order by airport.code), '[]'::jsonb)
    into statistics_airports
    from (
      select flight.departure_airport as code from public.flights as flight
      where flight.user_id = friend_user_id and flight.record_status = 'completed'
      union
      select flight.arrival_airport as code from public.flights as flight
      where flight.user_id = friend_user_id and flight.record_status = 'completed'
    ) as airport;

    statistics_summary := statistics_summary || jsonb_build_object('airport_codes', statistics_airports);
  end if;

  return jsonb_build_object(
    'privacy', jsonb_build_object(
      'records', can_records,
      'incoming', can_incoming,
      'statistics', can_statistics
    ),
    'completed_flights', completed_rows,
    'incoming_flights', incoming_rows,
    'statistics_summary', statistics_summary
  );
end;
$$;

revoke all on function public.get_flight_archive_friend_archive(uuid) from public;
revoke execute on function public.get_flight_archive_friend_flights(uuid) from authenticated;
grant execute on function public.get_flight_archive_friend_archive(uuid) to authenticated;
