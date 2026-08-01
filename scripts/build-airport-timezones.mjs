import fs from "node:fs";

const [sourcePath,outputPath] = process.argv.slice(2);
if (!sourcePath || !outputPath) {
  throw new Error("Usage: node scripts/build-airport-timezones.mjs <airports.json> <output.js>");
}

const records = JSON.parse(fs.readFileSync(sourcePath,"utf8"));
const timeZones = {};
const overrides = {
  PKX:"Asia/Shanghai",
  TFU:"Asia/Shanghai"
};

for (const airport of Object.values(records)) {
  const iata = String(airport?.iata || "").trim().toUpperCase();
  const timeZone = String(airport?.tz || "").trim();
  if (!/^[A-Z]{3}$/.test(iata) || !timeZone || timeZones[iata]) continue;
  try {
    new Intl.DateTimeFormat("en",{ timeZone }).format(0);
    timeZones[iata] = timeZone;
  } catch {
    // Ignore stale or non-IANA timezone identifiers.
  }
}

Object.assign(timeZones,overrides);

const sorted = Object.fromEntries(Object.entries(timeZones).sort(([a],[b])=>a.localeCompare(b)));
const header = `// Generated from williamkapke/airports (MIT): https://github.com/williamkapke/airports\n`;
const output = `${header}window.FLIGHT_ARCHIVE_TIMEZONES=${JSON.stringify(sorted)};\n`;
fs.writeFileSync(outputPath,output,"utf8");
console.log(`Wrote ${Object.keys(sorted).length} IATA timezones to ${outputPath}`);
