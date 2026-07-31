const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
});

const localParts = value => {
  const text = String(value || "");
  const match = text.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})/);
  return match ? { date: match[1], time: match[2] } : { date: "", time: "" };
};

const bestMovementTime = (movement = {}) =>
  movement.runwayTime || movement.revisedTime || movement.scheduledTime || {};

const durationMinutes = (departure = {}, arrival = {}) => {
  const departureUtc = bestMovementTime(departure).utc || departure.scheduledTime?.utc;
  const arrivalUtc = bestMovementTime(arrival).utc || arrival.scheduledTime?.utc;
  const start = Date.parse(departureUtc || "");
  const end = Date.parse(arrivalUtc || "");
  return Number.isFinite(start) && Number.isFinite(end) && end > start
    ? Math.round((end - start) / 60000)
    : 0;
};

const normalizeFlight = flight => {
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

const fetchProvider = async (path, apiKey, host) => {
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
    if (response.status === 429) message = "The free flight-search quota or rate limit has been reached. Try again later or add the flight manually.";
    throw new Error(message);
  }
  return response.json();
};

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const apiKey = Deno.env.get("AERODATABOX_API_KEY");
  const host = Deno.env.get("AERODATABOX_API_HOST") || "aerodatabox.p.rapidapi.com";
  if (!apiKey) return json({ error: "Flight lookup is not configured." }, 503);

  try {
    const body = await request.json();
    const date = String(body?.date || "").trim();
    const flightNumber = String(body?.flightNumber || "").replace(/\s+/g, "").toUpperCase();
    const from = String(body?.from || "").trim().toUpperCase();
    const to = String(body?.to || "").trim().toUpperCase();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return json({ error: "A valid flight date is required." }, 400);

    let rawFlights = [];
    if (flightNumber) {
      if (!/^[A-Z0-9]{2,10}$/.test(flightNumber)) return json({ error: "Enter a valid flight number." }, 400);
      const data = await fetchProvider(`/flights/number/${encodeURIComponent(flightNumber)}/${date}?dateLocalRole=Departure&withAircraftImage=false&withLocation=false`, apiKey, host);
      rawFlights = Array.isArray(data) ? data : [];
    } else {
      if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) return json({ error: "Both three-letter airport codes are required." }, 400);
      const base = `/flights/airports/iata/${from}`;
      const query = "direction=Departure&withLeg=true&withCancelled=false&withCodeshared=true&withCargo=false&withPrivate=false&withLocation=false";
      const first = await fetchProvider(`${base}/${date}T00:00/${date}T11:59?${query}`, apiKey, host);
      await new Promise(resolve => setTimeout(resolve, 1050));
      const second = await fetchProvider(`${base}/${date}T12:00/${date}T23:59?${query}`, apiKey, host);
      rawFlights = [...(first?.departures || []), ...(second?.departures || [])]
        .filter(flight => String(flight.arrival?.airport?.iata || "").toUpperCase() === to);
    }

    const unique = new Map();
    rawFlights.map(normalizeFlight).filter(flight => flight.flightNumber && flight.from && flight.to).forEach(flight => unique.set(flight.id, flight));
    const results = [...unique.values()]
      .sort((a, b) => `${a.date}T${a.departTime}`.localeCompare(`${b.date}T${b.departTime}`))
      .slice(0, 25);
    return json({ provider: "AeroDataBox", results });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : String(error) }, 502);
  }
});
