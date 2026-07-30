# Global airport data

`global-airports.js` is generated from the OurAirports `airports.csv` and
`countries.csv` downloads. It contains every open airport with a three-character
IATA code, including its ICAO/local identifier, English name, municipality,
country/region, ISO country code, latitude, and longitude.

- Source: https://ourairports.com/data/
- Snapshot: 2026-07-30
- Local records: 9,055 airports
- Terms: Public Domain; no guarantee of accuracy or fitness for use

The original CSV files are not shipped with the site. The compact generated
JavaScript file is loaded before `app.js`, merged into the existing airport
records, and is available without a network request at runtime.
