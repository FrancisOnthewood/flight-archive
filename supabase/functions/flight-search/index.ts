import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const DAILY_EXTERNAL_REQUEST_LIMIT = 20;
const MONTHLY_API_UNIT_LIMIT = 480;
const FLIGHT_NUMBER_API_UNITS = 2;
const ROUTE_API_UNITS = 4;
const TEST_ACCOUNT_EMAIL = "flightarchive.test@example.com";
const EFFECTIVELY_UNLIMITED_DAILY_REQUESTS = 2147483647;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
});

const failure = (code: string, message: string, status: number, manualFallback = true, detail = {}) =>
  json({ error: message, code, manualFallback, ...detail }, status);

const localParts = (value: unknown) => {
  const text = String(value || "");
  const match = text.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})/);
  return match ? { date: match[1], time: match[2] } : { date: "", time: "" };
};

const bestMovementTime = (movement: Record<string, any> = {}) =>
  movement.runwayTime || movement.revisedTime || movement.scheduledTime || {};

const durationMinutes = (departure: Record<string, any> = {}, arrival: Record<string, any> = {}) => {
  const departureUtc = bestMovementTime(departure).utc || departure.scheduledTime?.utc;
  const arrivalUtc = bestMovementTime(arrival).utc || arrival.scheduledTime?.utc;
  const start = Date.parse(departureUtc || "");
  const end = Date.parse(arrivalUtc || "");
  return Number.isFinite(start) && Number.isFinite(end) && end > start
    ? Math.round((end - start) / 60000)
    : 0;
};

const normalizeFlight = (flight: Record<string, any>) => {
  const departure = flight.departure || {};
  const arrival = flight.arrival || {};
  const scheduledDeparture = localParts(departure.scheduledTime?.local);
  const effectiveDeparture = localParts(bestMovementTime(departure).local || departure.scheduledTime?.local);
  const effectiveArrival = localParts(bestMovementTime(arrival).local || arrival.scheduledTime?.local);
  const from = String(departure.airport?.iata || "").toUpperCase();
  const to = String(arrival.airport?.iata || "").toUpperCase();
  const flightNumber = String(flight.number || "").replace(/\s+/g, "").toUpperCase();
  return {
    id: `${flightNumber}|${scheduledDeparture.date}|${from}|${to}|${scheduledDeparture.time}`,
    date: scheduledDeparture.date || effectiveDeparture.date,
    flightNumber,
    from,
    to,
    departTime: effectiveDeparture.time || scheduledDeparture.time,
    arriveTime: effectiveArrival.time,
    scheduledDepartTime: scheduledDeparture.time,
    airline: flight.airline?.name || "",
    airlineCode: String(flight.airline?.iata || "").toUpperCase(),
    aircraft: flight.aircraft?.model || "",
    registration: flight.aircraft?.reg || "",
    departureTerminal: departure.terminal || "",
    arrivalTerminal: arrival.terminal || "",
    departureGate: departure.gate || "",
    arrivalGate: arrival.gate || "",
    durationMinutes: durationMinutes(departure, arrival),
    distanceKm: Math.round(Number(flight.greatCircleDistance?.km) || 0),
    status: flight.status || ""
  };
};

class ProviderError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const fetchProvider = async (path: string, apiKey: string, host: string) => {
  const response = await fetch(`https://${host}${path}`, {
    headers: {
      "Accept": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": host
    }
  });
  if (response.status === 204) return null;
  if (!response.ok) {
    let message = `Flight data provider returned ${response.status}.`;
    try {
      const detail = await response.json();
      message = detail?.message || detail?.error || message;
    } catch {}
    throw new ProviderError(message, response.status);
  }
  return response.json();
};

const bearerToken = (request: Request) => {
  const authorization = request.headers.get("Authorization") || "";
  return authorization.match(/^Bearer\s+(.+)$/i)?.[1] || "";
};

const utcDate = () => new Date().toISOString().slice(0, 10);

const cacheExpiry = (flightDate: string) => {
  const hours = flightDate < utcDate() ? 24 * 365 : 12;
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
};

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return failure("METHOD_NOT_ALLOWED", "Method not allowed.", 405, false);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return failure("SERVER_CONFIGURATION", "Flight lookup server configuration is incomplete.", 503);
  }

  const token = bearerToken(request);
  if (!token) return failure("AUTH_REQUIRED", "Sign in to search for flights.", 401, false);

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const { data: authData, error: authError } = await admin.auth.getUser(token);
  if (authError || !authData.user) return failure("AUTH_REQUIRED", "Your session has expired. Sign in again.", 401, false);

  try {
    const body = await request.json();
    const date = String(body?.date || "").trim();
    const flightNumber = String(body?.flightNumber || "").replace(/\s+/g, "").toUpperCase();
    const from = String(body?.from || "").trim().toUpperCase();
    const to = String(body?.to || "").trim().toUpperCase();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return failure("INVALID_QUERY", "A valid flight date is required.", 400, false);
    }

    const queryKind = flightNumber ? "number" : "route";
    if (flightNumber && !/^[A-Z0-9]{2,10}$/.test(flightNumber)) {
      return failure("INVALID_QUERY", "Enter a valid flight number.", 400, false);
    }
    if (!flightNumber && (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to))) {
      return failure("INVALID_QUERY", "Both three-letter airport codes are required.", 400, false);
    }

    const cacheKey = flightNumber
      ? `number|${date}|${flightNumber}`
      : `route|${date}|${from}|${to}`;

    // Shared cache is checked before any quota is consumed. A repeated search
    // for the same date and flight number is therefore free for every user.
    const { data: cached, error: cacheReadError } = await admin
      .from("flight_search_cache")
      .select("provider,results,expires_at")
      .eq("cache_key", cacheKey)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();
    if (cacheReadError) throw cacheReadError;
    const cachedResults = Array.isArray(cached?.results) ? cached.results : [];
    if (cached && cachedResults.length) {
      return json({ provider: cached.provider, results: cachedResults, cached: true });
    }

    const apiKey = Deno.env.get("AERODATABOX_API_KEY");
    const host = Deno.env.get("AERODATABOX_API_HOST") || "aerodatabox.p.rapidapi.com";
    if (!apiKey) {
      return failure("LOOKUP_NOT_CONFIGURED", "Flight lookup is not configured. Continue with manual entry.", 503);
    }

    const requestedUnits = queryKind === "number" ? FLIGHT_NUMBER_API_UNITS : ROUTE_API_UNITS;
    const isTestAccount = String(authData.user.email || "").toLowerCase() === TEST_ACCOUNT_EMAIL;
    const { data: capacityRows, error: capacityError } = await admin.rpc("reserve_flight_search_capacity", {
      target_user_id: authData.user.id,
      requested_units: requestedUnits,
      daily_limit: isTestAccount ? EFFECTIVELY_UNLIMITED_DAILY_REQUESTS : DAILY_EXTERNAL_REQUEST_LIMIT,
      monthly_limit: MONTHLY_API_UNIT_LIMIT
    });
    if (capacityError) throw capacityError;

    const capacity = capacityRows?.[0];
    if (!capacity?.allowed) {
      if (capacity?.reason === "daily_limit") {
        return failure(
          "DAILY_SEARCH_LIMIT",
          "You have reached today's limit of 20 external flight searches. Continue with manual entry.",
          429,
          true,
          { usage: capacity }
        );
      }
      return failure(
        "MONTHLY_UNIT_LIMIT",
        "The shared monthly flight-search allowance is paused at 480 API Units. Continue with manual entry.",
        429,
        true,
        { usage: capacity }
      );
    }

    let rawFlights: Record<string, any>[] = [];
    if (flightNumber) {
      const data = await fetchProvider(
        `/flights/number/${encodeURIComponent(flightNumber)}/${date}?dateLocalRole=Departure&withAircraftImage=false&withLocation=false`,
        apiKey,
        host
      );
      rawFlights = Array.isArray(data) ? data : [];
    } else {
      const base = `/flights/airports/iata/${from}`;
      const query = "direction=Departure&withLeg=true&withCancelled=false&withCodeshared=true&withCargo=false&withPrivate=false&withLocation=false";
      const first = await fetchProvider(`${base}/${date}T00:00/${date}T11:59?${query}`, apiKey, host);
      await new Promise(resolve => setTimeout(resolve, 1050));
      const second = await fetchProvider(`${base}/${date}T12:00/${date}T23:59?${query}`, apiKey, host);
      rawFlights = [...(first?.departures || []), ...(second?.departures || [])]
        .filter(flight => String(flight.arrival?.airport?.iata || "").toUpperCase() === to);
    }

    const unique = new Map<string, ReturnType<typeof normalizeFlight>>();
    rawFlights
      .map(normalizeFlight)
      .filter(flight => flight.flightNumber && flight.from && flight.to)
      .forEach(flight => unique.set(flight.id, flight));
    const results = [...unique.values()]
      .sort((a, b) => `${a.date}T${a.departTime}`.localeCompare(`${b.date}T${b.departTime}`))
      .slice(0, 25);

    // Empty provider responses are deliberately not cached. Schedules can be
    // published or corrected later, and a temporary empty response should not
    // prevent a subsequent real lookup.
    if (results.length) {
      const { error: cacheWriteError } = await admin.from("flight_search_cache").upsert({
        cache_key: cacheKey,
        query_kind: queryKind,
        flight_date: date,
        flight_number: flightNumber || null,
        departure_iata: flightNumber ? null : from,
        arrival_iata: flightNumber ? null : to,
        provider: "AeroDataBox",
        results,
        created_at: new Date().toISOString(),
        expires_at: cacheExpiry(date)
      });
      if (cacheWriteError) console.error("Unable to write flight-search cache", cacheWriteError);
    }

    return json({ provider: "AeroDataBox", results, cached: false, usage: capacity });
  } catch (error) {
    if (error instanceof ProviderError) {
      if (error.status === 429) {
        return failure(
          "PROVIDER_LIMIT",
          "The external flight-data provider has reached its limit. Continue with manual entry.",
          429
        );
      }
      return failure("PROVIDER_UNAVAILABLE", error.message, 502);
    }
    console.error("Flight search failed", error);
    return failure("LOOKUP_FAILED", error instanceof Error ? error.message : String(error), 502);
  }
});
