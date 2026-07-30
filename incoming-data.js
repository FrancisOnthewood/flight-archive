(() => {
  const archive = window.FLIGHT_ARCHIVE_DATA;
  if (!archive) return;

  archive.airports.JFK = {
    code: "JFK",
    city: "纽约",
    cityZh: "纽约",
    cityEn: "New York",
    name: "约翰·F·肯尼迪国际机场",
    nameZh: "约翰·F·肯尼迪国际机场",
    nameEn: "John F. Kennedy International Airport",
    country: "美国",
    countryZh: "美国",
    countryEn: "United States",
    countryCode: "US",
    lat: 40.6413,
    lon: -73.7781
  };

  archive.incomingFlights = [
    {
      id: "planned-cx830-20260815",
      from: "HKG",
      to: "JFK",
      date: "2026-08-15",
      airline: "Cathay Pacific",
      airlineShort: "CX",
      flightNo: "CX830",
      aircraft: "Airbus A350-1000",
      registration: "B-LXA",
      depart: "09:05",
      arrive: "13:25",
      duration: "16h 20m",
      durationMinutes: 980,
      distance: 12972,
      terminalFrom: "T1",
      terminalTo: "T8",
      seat: "59A",
      cabin: "Economy",
      fare: null,
      fareGroup: "CX-HKG-JFK-202608",
      gate: "—",
      note: "Fictional planned itinerary",
      scope: "international",
      fictional: true
    },
    {
      id: "planned-cx831-20260823",
      from: "JFK",
      to: "HKG",
      date: "2026-08-23",
      airline: "Cathay Pacific",
      airlineShort: "CX",
      flightNo: "CX831",
      aircraft: "Airbus A350-1000",
      registration: "B-LXA",
      depart: "14:55",
      arrive: "19:00 (+1)",
      duration: "16h 05m",
      durationMinutes: 965,
      distance: 12972,
      terminalFrom: "T8",
      terminalTo: "T1",
      seat: "59K",
      cabin: "Economy",
      fare: null,
      fareGroup: "CX-HKG-JFK-202608",
      gate: "—",
      note: "Fictional planned itinerary",
      scope: "international",
      fictional: true
    }
  ];
})();
