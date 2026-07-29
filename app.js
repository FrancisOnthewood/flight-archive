const airports = {
  PVG: { code: "PVG", city: "上海", name: "上海浦东国际机场", country: "中国", lat: 31.1443, lon: 121.8083 },
  SHA: { code: "SHA", city: "上海", name: "上海虹桥国际机场", country: "中国", lat: 31.1979, lon: 121.3363 },
  HKG: { code: "HKG", city: "香港", name: "香港国际机场", country: "中国香港", lat: 22.308, lon: 113.9185 },
  PEK: { code: "PEK", city: "北京", name: "北京首都国际机场", country: "中国", lat: 40.0799, lon: 116.6031 },
  PKX: { code: "PKX", city: "北京", name: "北京大兴国际机场", country: "中国", lat: 39.5098, lon: 116.4105 },
  NRT: { code: "NRT", city: "东京", name: "成田国际机场", country: "日本", lat: 35.772, lon: 140.3929 },
  SIN: { code: "SIN", city: "新加坡", name: "新加坡樟宜机场", country: "新加坡", lat: 1.3644, lon: 103.9915 },
  SFO: { code: "SFO", city: "旧金山", name: "旧金山国际机场", country: "美国", lat: 37.6213, lon: -122.379 },
  CAN: { code: "CAN", city: "广州", name: "广州白云国际机场", country: "中国", lat: 23.3924, lon: 113.2988 },
  CTU: { code: "CTU", city: "成都", name: "成都双流国际机场", country: "中国", lat: 30.5785, lon: 103.9471 },
  KIX: { code: "KIX", city: "大阪", name: "关西国际机场", country: "日本", lat: 34.4347, lon: 135.244 },
  TPE: { code: "TPE", city: "台北", name: "台湾桃园国际机场", country: "中国台湾", lat: 25.0797, lon: 121.2342 }
};

const airlineIcons = {
  MU: "icons/China_Eastern_Airlines.png",
  CX: "icons/Cathay_Pacific.png",
  HX: "icons/Hong_Kong_Airlines.png",
  SQ: "icons/singapore airlines.png",
  CA: "icons/Air_China.png",
  CZ: "icons/china southern airlines.png",
  HO: "icons/juneyao-airlines.png"
};

const flights = [
  { id: 1, routeId: "sha-hkg", from: "PVG", to: "HKG", date: "2026-06-18", airline: "中国东方航空", airlineShort: "MU", flightNo: "MU721", aircraft: "Airbus A320neo", depart: "08:20", arrive: "10:55", duration: "2h 35m", distance: 1256, terminalFrom: "T1", terminalTo: "T1", seat: "34A", cabin: "经济舱", fare: 1680, booking: "航司官网", gate: "H12", status: "准点", note: "天气良好，巡航阶段平稳。", scope: "international" },
  { id: 2, routeId: "sha-hkg", from: "HKG", to: "PVG", date: "2026-03-09", airline: "国泰航空", airlineShort: "CX", flightNo: "CX368", aircraft: "Airbus A330-300", depart: "09:15", arrive: "11:45", duration: "2h 30m", distance: 1256, terminalFrom: "T1", terminalTo: "T2", seat: "42K", cabin: "经济舱", fare: 1840, booking: "携程", gate: "28", status: "准点", note: "上午航班，实际到达时间与计划一致。", scope: "international" },
  { id: 3, routeId: "sha-hkg", from: "PVG", to: "HKG", date: "2025-11-14", airline: "香港航空", airlineShort: "HX", flightNo: "HX237", aircraft: "Airbus A320", depart: "11:55", arrive: "14:40", duration: "2h 45m", distance: 1256, terminalFrom: "T2", terminalTo: "T1", seat: "21F", cabin: "经济舱", fare: 1320, booking: "飞猪", gate: "D75", status: "延误 15m", note: "实际起飞时间较计划晚 15 分钟。", scope: "international" },
  { id: 4, routeId: "sha-hkg", from: "HKG", to: "PVG", date: "2025-09-21", airline: "中国东方航空", airlineShort: "MU", flightNo: "MU506", aircraft: "Airbus A321", depart: "20:20", arrive: "22:50", duration: "2h 30m", distance: 1256, terminalFrom: "T1", terminalTo: "T1", seat: "16A", cabin: "超级经济舱", fare: 2180, booking: "航司官网", gate: "6", status: "准点", note: "夜间航班。", scope: "international" },
  { id: 5, routeId: "sha-sfo", from: "PVG", to: "SFO", date: "2026-01-12", airline: "美国联合航空", airlineShort: "UA", flightNo: "UA858", aircraft: "Boeing 787-9", depart: "13:10", arrive: "08:42", duration: "11h 32m", distance: 9880, terminalFrom: "T2", terminalTo: "I", seat: "47A", cabin: "经济舱", fare: 5280, booking: "航司官网", gate: "D69", status: "准点", note: "跨越日期变更线。", scope: "international" },
  { id: 6, routeId: "sha-sin", from: "PVG", to: "SIN", date: "2025-12-24", airline: "新加坡航空", airlineShort: "SQ", flightNo: "SQ827", aircraft: "Airbus A350-900", depart: "08:05", arrive: "13:40", duration: "5h 35m", distance: 3807, terminalFrom: "T2", terminalTo: "T3", seat: "38K", cabin: "经济舱", fare: 2880, booking: "航司官网", gate: "D81", status: "准点", note: "日间航班。", scope: "international" },
  { id: 7, routeId: "sha-pek", from: "SHA", to: "PEK", date: "2026-05-03", airline: "中国国际航空", airlineShort: "CA", flightNo: "CA1518", aircraft: "Airbus A330-300", depart: "16:25", arrive: "18:45", duration: "2h 20m", distance: 1075, terminalFrom: "T2", terminalTo: "T3", seat: "31L", cabin: "经济舱", fare: 1240, booking: "国航 App", gate: "M6", status: "准点", note: "国内航段。", scope: "domestic" },
  { id: 8, routeId: "sha-pek", from: "PKX", to: "SHA", date: "2026-05-06", airline: "中国东方航空", airlineShort: "MU", flightNo: "MU5122", aircraft: "Boeing 787-9", depart: "19:05", arrive: "21:20", duration: "2h 15m", distance: 1066, terminalFrom: "主楼", terminalTo: "T2", seat: "29A", cabin: "经济舱", fare: 1160, booking: "东航 App", gate: "B25", status: "准点", note: "由北京大兴机场出发。", scope: "domestic" },
  { id: 9, routeId: "sha-nrt", from: "PVG", to: "NRT", date: "2025-07-17", airline: "全日空", airlineShort: "NH", flightNo: "NH920", aircraft: "Boeing 787-9", depart: "13:05", arrive: "17:10", duration: "3h 05m", distance: 1802, terminalFrom: "T2", terminalTo: "T1", seat: "26A", cabin: "经济舱", fare: 2420, booking: "ANA 官网", gate: "D73", status: "准点", note: "下午抵达成田机场。", scope: "international" },
  { id: 10, routeId: "sha-can", from: "SHA", to: "CAN", date: "2025-05-29", airline: "中国南方航空", airlineShort: "CZ", flightNo: "CZ3526", aircraft: "Airbus A320neo", depart: "14:20", arrive: "16:45", duration: "2h 25m", distance: 1175, terminalFrom: "T2", terminalTo: "T2", seat: "18F", cabin: "经济舱", fare: 930, booking: "南航 App", gate: "51", status: "准点", note: "国内航段。", scope: "domestic" },
  { id: 11, routeId: "sha-ctu", from: "PVG", to: "CTU", date: "2025-03-11", airline: "四川航空", airlineShort: "3U", flightNo: "3U8962", aircraft: "Airbus A350-900", depart: "17:10", arrive: "20:25", duration: "3h 15m", distance: 1702, terminalFrom: "T2", terminalTo: "T2", seat: "45A", cabin: "经济舱", fare: 1060, booking: "携程", gate: "C69", status: "准点", note: "傍晚出发。", scope: "domestic" },
  { id: 12, routeId: "sha-kix", from: "PVG", to: "KIX", date: "2024-10-03", airline: "吉祥航空", airlineShort: "HO", flightNo: "HO1337", aircraft: "Boeing 787-9", depart: "16:40", arrive: "20:05", duration: "2h 25m", distance: 1307, terminalFrom: "T2", terminalTo: "T1", seat: "32L", cabin: "经济舱", fare: 2350, booking: "航司官网", gate: "D80", status: "准点", note: "晚间抵达关西机场。", scope: "international" }
];

const routes = [
  { id: "sha-hkg", from: "PVG", to: "HKG", count: 6, distance: 1256 },
  { id: "sha-pek", from: "SHA", to: "PEK", count: 4, distance: 1075 },
  { id: "sha-sin", from: "PVG", to: "SIN", count: 2, distance: 3807 },
  { id: "sha-nrt", from: "PVG", to: "NRT", count: 2, distance: 1802 },
  { id: "sha-sfo", from: "PVG", to: "SFO", count: 1, distance: 9880 },
  { id: "sha-can", from: "SHA", to: "CAN", count: 1, distance: 1175 },
  { id: "sha-ctu", from: "PVG", to: "CTU", count: 1, distance: 1702 },
  { id: "sha-kix", from: "PVG", to: "KIX", count: 1, distance: 1307 }
];

const fallbackLand = [
  [[-168,71],[-140,70],[-125,58],[-110,53],[-98,50],[-82,52],[-62,47],[-55,37],[-75,24],[-92,18],[-105,22],[-118,32],[-132,50],[-160,58]],
  [[-81,12],[-70,8],[-60,3],[-51,-5],[-45,-20],[-53,-33],[-67,-55],[-75,-40],[-79,-20]],
  [[-11,36],[0,43],[16,46],[29,42],[42,47],[59,55],[90,72],[124,60],[145,53],[160,60],[179,51],[156,39],[135,34],[122,22],[105,5],[93,11],[78,7],[64,23],[45,30],[31,35],[17,31]],
  [[-17,35],[4,37],[19,32],[31,21],[42,12],[50,-14],[37,-30],[20,-35],[8,-27],[-2,-5],[-10,8]],
  [[112,-11],[135,-12],[153,-27],[146,-40],[121,-36]],
  [[-52,82],[-20,80],[-26,66],[-45,60],[-62,69]]
];

const translations = {
  zh: {
    navMap: "航迹地图", navRecords: "飞行记录", navStats: "数据统计", navMedia: "旅途相册",
    mapSelection: "地图选择", routes: "航线", airports: "机场", mapStyle: "地球风格",
    styleLight: "浅色", styleOrbit: "星空", mapHelp: "拖拽旋转，滚轮缩放；点击航线或机场查看详情。",
    language: "语言", import: "批量导入", addFlight: "添加飞行", recordsTitle: "飞行记录",
    recordsDesc: "按日期倒序展示已保存的航段。", searchPlaceholder: "搜索航班号、航司、城市或机场",
    all: "全部", international: "国际 / 地区", domestic: "国内", flight: "航班", date: "日期",
    routeTime: "航线与时间", flightInfo: "飞行信息", fare: "票价", statsTitle: "飞行数据统计",
    statsDesc: "根据当前记录汇总里程、时间、支出、航线、机场与机型。",
    mediaTitle: "旅途相册", mediaDesc: "与飞行记录关联的照片和登机资料。",
    route: "航线", airport: "机场", flightsRecorded: "累计航段", oneWayDistance: "单程距离",
    relatedFlights: "相关飞行记录", recordedSegments: "已记录航段", coordinates: "地理坐标",
    connections: "连接航线", recentRecords: "最近记录", times: "次", noRecords: "没有符合当前条件的飞行记录。",
    segments: "航段", kilometers: "公里", aircraft: "机型", cabin: "舱位", seat: "座位", terminals: "航站楼",
    totalDistance: "累计里程", totalTime: "累计飞行时间", totalFare: "累计票价", totalSegments: "记录航段",
    routeFrequency: "航线次数", aircraftDistribution: "机型分布", airportVisits: "机场访问次数", countriesRegions: "国家与地区"
  },
  en: {
    navMap: "Flight Map", navRecords: "Flight Records", navStats: "Statistics", navMedia: "Media",
    mapSelection: "Map Content", routes: "Routes", airports: "Airports", mapStyle: "Globe Style",
    styleLight: "Light", styleOrbit: "Orbit", mapHelp: "Drag to rotate, scroll to zoom, and select a route or airport for details.",
    language: "Language", import: "Import", addFlight: "Add Flight", recordsTitle: "Flight Records",
    recordsDesc: "Saved flight segments in reverse chronological order.", searchPlaceholder: "Search flight, airline, city, or airport",
    all: "All", international: "International", domestic: "Domestic", flight: "Flight", date: "Date",
    routeTime: "Route & Time", flightInfo: "Flight Information", fare: "Fare", statsTitle: "Flight Statistics",
    statsDesc: "Distance, time, spending, routes, airports, and aircraft summarized from current records.",
    mediaTitle: "Travel Media", mediaDesc: "Photos and boarding materials linked to flight records.",
    route: "Route", airport: "Airport", flightsRecorded: "Recorded segments", oneWayDistance: "One-way distance",
    relatedFlights: "Related records", recordedSegments: "Recorded segments", coordinates: "Coordinates",
    connections: "Connected routes", recentRecords: "Recent records", times: "flights", noRecords: "No flight records match the current filters.",
    segments: "Segments", kilometers: "Kilometers", aircraft: "Aircraft", cabin: "Cabin", seat: "Seat", terminals: "Terminals",
    totalDistance: "Total distance", totalTime: "Flight time", totalFare: "Total fare", totalSegments: "Recorded segments",
    routeFrequency: "Route frequency", aircraftDistribution: "Aircraft distribution", airportVisits: "Airport visits", countriesRegions: "Countries & regions"
  }
};

const state = {
  activeView: "atlas",
  filter: "all",
  mapMode: "route",
  globeStyle: "light",
  lang: "zh",
  selectedRoute: null,
  selectedAirport: null
};
const visitedCountries = new Set(["China", "Japan", "USA"]);
let landFeatures = fallbackLand.map((ring, index) => ({ name: `fallback-${index}`, rings: [ring] }));
const t = key => translations[state.lang][key] || key;

function applyLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const value = translations[lang][el.dataset.i18n];
    if (value) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const value = translations[lang][el.dataset.i18nPlaceholder];
    if (value) el.placeholder = value;
  });
  document.getElementById("langZh").classList.toggle("active", lang === "zh");
  document.getElementById("langEn").classList.toggle("active", lang === "en");
  renderFlights();
  if (state.selectedRoute) openRouteDrawer(state.selectedRoute);
  if (state.selectedAirport) openAirportDrawer(state.selectedAirport);
}

function formatDate(date) {
  const locale=state.lang==="zh"?"zh-CN":"en-CA";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(`${date}T12:00:00`));
}
function iconMarkup(f, className = "airline-icon") {
  const icon = airlineIcons[f.airlineShort];
  return icon
    ? `<span class="${className}"><img src="${icon}" alt="${f.airline}标志" loading="lazy" /></span>`
    : `<span class="${className} airline-fallback">${f.airlineShort}</span>`;
}

function flightRowMarkup(f) {
  const from = airports[f.from], to = airports[f.to];
  return `
    <article class="flight-row" data-flight-id="${f.id}">
      <div class="airline-cell">
        ${iconMarkup(f)}
        <div><strong>${f.airline}</strong><small>${f.flightNo}</small></div>
      </div>
      <div class="date-cell"><strong>${formatDate(f.date)}</strong><small>${f.status}</small></div>
      <div class="route-cell">
        <div class="route-point"><strong>${f.from}</strong><span>${from.city} · ${f.depart}</span></div>
        <div class="route-line"><span>${f.duration}</span><i></i><small>${f.distance.toLocaleString()} km</small></div>
        <div class="route-point"><strong>${f.to}</strong><span>${to.city} · ${f.arrive}</span></div>
      </div>
      <div class="flight-meta">
        <span>${t("aircraft")}<b>${f.aircraft}</b></span><span>${t("cabin")}<b>${f.cabin}</b></span>
        <span>${t("seat")}<b>${f.seat}</b></span><span>${t("terminals")}<b>${f.terminalFrom} → ${f.terminalTo}</b></span>
      </div>
      <div class="fare-cell"><strong>¥${f.fare.toLocaleString()}</strong><small>${f.booking}</small></div>
      <span class="row-arrow"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></span>
    </article>`;
}

function renderFlights() {
  const query = (document.getElementById("recordSearch")?.value || "").trim().toLowerCase();
  const list = flights.filter(f => {
    const filterOk = state.filter === "all" || (state.filter === "2026" ? f.date.startsWith("2026") : f.scope === state.filter);
    const text = `${f.flightNo} ${f.airline} ${f.from} ${f.to} ${airports[f.from].city} ${airports[f.to].city}`.toLowerCase();
    return filterOk && text.includes(query);
  });
  document.getElementById("flightList").innerHTML = list.length ? list.map(flightRowMarkup).join("") : `<div class="empty-state">${t("noRecords")}</div>`;
  document.querySelectorAll("[data-flight-id]").forEach(el => el.addEventListener("click", () => openFlight(Number(el.dataset.flightId))));
}

function openFlight(id) {
  const f = flights.find(item => item.id === id);
  if (!f) return;
  const from = airports[f.from], to = airports[f.to];
  const set = (id, value) => document.getElementById(id).textContent = value;
  document.getElementById("detailLogo").innerHTML = airlineIcons[f.airlineShort] ? `<img src="${airlineIcons[f.airlineShort]}" alt="${f.airline}标志" />` : f.airlineShort;
  set("detailAirline", f.airline); set("detailTitle", f.flightNo); set("detailDate", `${formatDate(f.date)} · ${f.status}`);
  set("detailFromCode", f.from); set("detailFromCity", from.city); set("detailDeparture", `${f.depart} · ${f.terminalFrom}`);
  set("detailToCode", f.to); set("detailToCity", to.city); set("detailArrival", `${f.arrive} · ${f.terminalTo}`);
  set("detailDuration", f.duration); set("detailDistance", `${f.distance.toLocaleString()} km`); set("detailNote", f.note);
  document.getElementById("detailInfoGrid").innerHTML = [
    ["机型", f.aircraft], ["座位", f.seat], ["舱位", f.cabin],
    ["票价", `¥${f.fare.toLocaleString()}`], ["登机口", f.gate], ["预订渠道", f.booking]
  ].map(([key,value]) => `<div><span>${key}</span><strong>${value}</strong></div>`).join("");
  openModal("detailModal");
}

function drawerFlightMarkup(f) {
  return `<article class="drawer-flight" data-drawer-flight="${f.id}">
    <div class="drawer-flight-top"><strong>${f.flightNo} · ${f.airline}</strong><span>${formatDate(f.date)}</span></div>
    <div class="drawer-flight-route">
      <div><b>${f.from}</b><small>${f.depart}</small></div><i></i><div><b>${f.to}</b><small>${f.arrive}</small></div>
    </div>
  </article>`;
}

function openRouteDrawer(route) {
  state.selectedRoute = route; state.selectedAirport = null;
  const from = airports[route.from], to = airports[route.to];
  let related = flights.filter(f => f.routeId === route.id);
  if (!related.length) related = flights.filter(f => [f.from,f.to].includes(route.from) || [f.from,f.to].includes(route.to)).slice(0,3);
  document.getElementById("drawerContent").innerHTML = `
    <span class="drawer-kicker">${t("route")}</span>
    <h2 class="drawer-title">${from.city} — ${to.city}</h2>
    <p class="drawer-subtitle">${route.from} / ${from.name}<br>${route.to} / ${to.name}</p>
    <div class="drawer-metrics">
      <div><strong>${route.count}</strong><span>${t("flightsRecorded")}</span></div>
      <div><strong>${route.distance.toLocaleString()} km</strong><span>${t("oneWayDistance")}</span></div>
    </div>
    <h3 class="drawer-section-title">${t("relatedFlights")}</h3>
    ${related.map(drawerFlightMarkup).join("")}
  `;
  document.querySelectorAll("[data-drawer-flight]").forEach(el => el.addEventListener("click", () => openFlight(Number(el.dataset.drawerFlight))));
  document.getElementById("infoDrawer").classList.add("open");
  drawGlobe();
}

function openAirportDrawer(code) {
  const airport = airports[code];
  if (!airport) return;
  state.selectedAirport = code; state.selectedRoute = null;
  const relatedFlights = flights.filter(f => f.from === code || f.to === code);
  const connections = routes.filter(r => r.from === code || r.to === code);
  document.getElementById("drawerContent").innerHTML = `
    <span class="drawer-kicker">${t("airport")}</span>
    <h2 class="drawer-title">${airport.code}</h2>
    <p class="drawer-subtitle">${airport.name}<br>${airport.city}，${airport.country}</p>
    <div class="drawer-metrics">
      <div><strong>${relatedFlights.length}</strong><span>${t("recordedSegments")}</span></div>
      <div><strong>${airport.lat.toFixed(2)}°, ${airport.lon.toFixed(2)}°</strong><span>${t("coordinates")}</span></div>
    </div>
    <h3 class="drawer-section-title">${t("connections")}</h3>
    <div class="connection-list">
      ${connections.length ? connections.map(r => {
        const other = r.from === code ? airports[r.to] : airports[r.from];
        return `<button data-connection="${r.id}"><span>${airport.city} — ${other.city}</span><b>${r.count} ${t("times")}</b></button>`;
      }).join("") : `<p class="drawer-subtitle">当前样本中没有独立航线统计。</p>`}
    </div>
    <h3 class="drawer-section-title">${t("recentRecords")}</h3>
    ${relatedFlights.slice(0,4).map(drawerFlightMarkup).join("")}
  `;
  document.querySelectorAll("[data-connection]").forEach(el => el.addEventListener("click", () => {
    const route = routes.find(r => r.id === el.dataset.connection);
    if (route) openRouteDrawer(route);
  }));
  document.querySelectorAll("[data-drawer-flight]").forEach(el => el.addEventListener("click", () => openFlight(Number(el.dataset.drawerFlight))));
  document.getElementById("infoDrawer").classList.add("open");
  drawGlobe();
}

function closeDrawer() {
  document.getElementById("infoDrawer").classList.remove("open");
  state.selectedAirport = null; state.selectedRoute = null;
  drawGlobe();
}

function setView(view) {
  state.activeView = view;
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === view));
  document.getElementById(`${view}View`)?.classList.add("active");
  document.getElementById("mapControl").style.visibility = view === "atlas" ? "visible" : "hidden";
  closeDrawer();
  if (view === "atlas") setTimeout(resizeGlobe, 30);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModals() {
  document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("open"));
  document.body.style.overflow = "";
}
function showToast(title, subtitle) {
  const toast = document.getElementById("toast");
  toast.querySelector("strong").textContent = title;
  toast.querySelector("small").textContent = subtitle;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function renderStats() {
  document.getElementById("routeRanking").innerHTML = routes.slice(0,5).map((r,i) => `
    <div class="ranking-row"><span>0${i+1}</span><strong>${airports[r.from].city} — ${airports[r.to].city}</strong><div class="rank-track"><i style="width:${r.count/6*100}%"></i></div><b>${r.count} 次</b></div>
  `).join("");
  const list = [["PVG 上海浦东",12],["HKG 香港国际",6],["SHA 上海虹桥",4],["PEK 北京首都",3],["SIN 新加坡樟宜",2]];
  document.getElementById("airportBars").innerHTML = list.map(([name,count]) => `<div class="airport-row"><span>${name}</span><i style="--w:${count/12*100}%"></i><b>${count}</b></div>`).join("");
}

// Globe rendering
const canvas = document.getElementById("globeCanvas");
const ctx = canvas.getContext("2d");
let cw = 0, ch = 0, globeR = 200, centerX = 0, centerY = 0;
let rotation = { lon: -112, lat: -18 };
let dragging = false, moved = false, lastPointer = null, autoSpin = true;
let routeHitAreas = [], airportHitAreas = [];

const rad = value => value * Math.PI / 180;
function project(lat, lon, altitude = 0) {
  const phi = rad(lat), lambda = rad(lon + rotation.lon), tilt = rad(rotation.lat);
  const x0 = Math.cos(phi) * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const z0 = Math.cos(phi) * Math.cos(lambda);
  const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
  const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
  const scale = globeR * (1 + altitude);
  return { x: centerX + x0 * scale, y: centerY - y * scale, z };
}
function geoVec(lat, lon) {
  const p = rad(lat), l = rad(lon);
  return [Math.cos(p)*Math.cos(l), Math.cos(p)*Math.sin(l), Math.sin(p)];
}
function vecGeo(v) {
  return { lat: Math.atan2(v[2],Math.hypot(v[0],v[1]))*180/Math.PI, lon: Math.atan2(v[1],v[0])*180/Math.PI };
}
function greatCircle(a,b,steps=64) {
  const va=geoVec(a.lat,a.lon), vb=geoVec(b.lat,b.lon);
  const dot=Math.max(-1,Math.min(1,va[0]*vb[0]+va[1]*vb[1]+va[2]*vb[2]));
  const omega=Math.acos(dot), sinOmega=Math.sin(omega);
  return Array.from({length:steps+1},(_,i)=>{
    const t=i/steps, s1=sinOmega?Math.sin((1-t)*omega)/sinOmega:1-t, s2=sinOmega?Math.sin(t*omega)/sinOmega:t;
    return vecGeo([s1*va[0]+s2*vb[0],s1*va[1]+s2*vb[1],s1*va[2]+s2*vb[2]]);
  });
}
function visibleSegments(points, threshold = 0) {
  const segments=[]; let segment=[];
  points.forEach(p=>{
    if(p.z>threshold) segment.push(p);
    else if(segment.length){ if(segment.length>1)segments.push(segment); segment=[]; }
  });
  if(segment.length>1)segments.push(segment);
  return segments;
}
function extractLandFeatures(geojson) {
  const features=[];
  (geojson.features || []).forEach(feature=>{
    const geometry=feature.geometry;
    if(!geometry)return;
    const name=feature.properties?.name || "";
    if(geometry.type==="Polygon" && geometry.coordinates[0]) {
      features.push({name,rings:[geometry.coordinates[0]]});
    }
    if(geometry.type==="MultiPolygon") {
      features.push({name,rings:geometry.coordinates.map(p=>p[0]).filter(Boolean)});
    }
  });
  return features.length?features:fallbackLand.map((ring,index)=>({name:`fallback-${index}`,rings:[ring]}));
}
async function loadGeography() {
  try {
    const response=await fetch("./data/world.geojson");
    if(!response.ok)throw new Error(`GeoJSON ${response.status}`);
    landFeatures=extractLandFeatures(await response.json());
  } catch(error) {
    console.warn("Using fallback land geometry:",error);
  } finally {
    document.getElementById("globeLoading").classList.add("hidden");
    drawGlobe();
  }
}
function drawLand() {
  const orbit=state.globeStyle==="orbit";
  landFeatures.forEach(feature=>{
    const visited=visitedCountries.has(feature.name);
    ctx.fillStyle=orbit?(visited?"#30a879":"#102923"):(visited?"#82b6f4":"#dce3e9");
    ctx.strokeStyle=orbit?(visited?"rgba(89,237,184,.72)":"rgba(88,148,133,.42)"):(visited?"rgba(24,119,242,.72)":"#abb7c4");
    ctx.lineWidth=visited?1:.55;
    feature.rings.forEach(ring=>{
      const points=ring.map(([lon,lat])=>project(lat,lon));
      visibleSegments(points,.005).forEach(segment=>{
        if(segment.length<3)return;
        ctx.beginPath();
        segment.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
        ctx.closePath();ctx.fill();ctx.stroke();
      });
    });
  });
}
let stars=[];
const cityLights=[
  {lat:31.23,lon:121.47,size:1.8},{lat:39.90,lon:116.40,size:1.7},{lat:22.32,lon:114.17,size:1.6},
  {lat:35.68,lon:139.69,size:1.8},{lat:1.35,lon:103.82,size:1.5},{lat:37.77,lon:-122.42,size:1.5},
  {lat:23.13,lon:113.26,size:1.4},{lat:30.57,lon:104.07,size:1.4},{lat:51.51,lon:-.13,size:1.5},
  {lat:40.71,lon:-74.01,size:1.7},{lat:48.86,lon:2.35,size:1.4},{lat:25.20,lon:55.27,size:1.4}
];
function drawBackground(time) {
  const orbit=state.globeStyle==="orbit";
  const gradient=ctx.createLinearGradient(0,0,cw,ch);
  if(orbit){
    gradient.addColorStop(0,"#020710");gradient.addColorStop(.55,"#071528");gradient.addColorStop(1,"#020913");
  }else{
    gradient.addColorStop(0,"#f7f9fc");gradient.addColorStop(.52,"#eef4fb");gradient.addColorStop(1,"#e7eff9");
  }
  ctx.fillStyle=gradient;ctx.fillRect(0,0,cw,ch);
  if(orbit){
    stars.forEach((star,index)=>{
      const twinkle=.35+.55*(.5+.5*Math.sin(time*.0015+index*.73));
      ctx.globalAlpha=twinkle;ctx.fillStyle=index%9===0?"#9fd8ff":"#ffffff";
      ctx.beginPath();ctx.arc(star.x,star.y,star.r,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
  }else{
    const shift=(time*.018)%160;
    ctx.strokeStyle="rgba(24,119,242,.075)";ctx.lineWidth=1;
    for(let i=-2;i<7;i++){
      ctx.beginPath();
      ctx.moveTo(-120,i*145+shift);
      ctx.bezierCurveTo(cw*.28,i*145-75+shift,cw*.72,i*145+110+shift,cw+120,i*145+10+shift);
      ctx.stroke();
    }
    ctx.fillStyle="rgba(24,119,242,.12)";
    for(let i=0;i<16;i++){
      const x=(i*173+time*.012)%(cw+80)-40;
      const y=(i*97+36)%Math.max(ch,1);
      ctx.beginPath();ctx.arc(x,y,1.4+(i%3)*.45,0,Math.PI*2);ctx.fill();
    }
  }
}
function drawNightLayer(time) {
  if(state.globeStyle!=="orbit")return;
  const boundary=centerX+Math.sin(time*.000045)*globeR*.17;
  const shade=ctx.createLinearGradient(boundary-globeR*.32,0,boundary+globeR*.28,0);
  shade.addColorStop(0,"rgba(2,8,18,0)");
  shade.addColorStop(.48,"rgba(2,8,18,.18)");
  shade.addColorStop(1,"rgba(1,5,13,.76)");
  ctx.fillStyle=shade;ctx.fillRect(centerX-globeR,centerY-globeR,globeR*2,globeR*2);
  cityLights.forEach((city,index)=>{
    const p=project(city.lat,city.lon);
    if(p.z<=.02||p.x<boundary-globeR*.05)return;
    const pulse=.72+.28*Math.sin(time*.002+index);
    ctx.globalAlpha=pulse;ctx.shadowColor="#ffd36a";ctx.shadowBlur=8;
    ctx.fillStyle="#ffe4a0";ctx.beginPath();ctx.arc(p.x,p.y,city.size,0,Math.PI*2);ctx.fill();
  });
  ctx.globalAlpha=1;ctx.shadowBlur=0;
}
function drawRoutes(time) {
  routeHitAreas=[];
  routes.forEach((route,routeIndex)=>{
    const points=greatCircle(airports[route.from],airports[route.to]).map((p,i,array)=>project(p.lat,p.lon,Math.sin(Math.PI*i/(array.length-1))*.055));
    visibleSegments(points,-.01).forEach(segment=>{
      const selected=state.selectedRoute?.id===route.id;
      ctx.beginPath(); segment.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      ctx.strokeStyle=state.globeStyle==="orbit"?"#49d7ff":"#1877f2";
      ctx.lineWidth=(selected?2.5:1)+route.count*.2;
      ctx.globalAlpha=selected?1:.3+route.count*.08;
      ctx.shadowColor=state.globeStyle==="orbit"?"#1fc8ff":"#1877f2";
      ctx.shadowBlur=selected?14:route.count*1.4;ctx.setLineDash([]);ctx.stroke();
      ctx.globalAlpha=selected?1:.75;ctx.lineWidth=selected?1.8:1.1;
      ctx.setLineDash([3,10]);ctx.lineDashOffset=-(time*.025+routeIndex*13);ctx.stroke();
      routeHitAreas.push({route,points:segment});
    });
    const phase=((time*.000075)+(routeIndex/routes.length))%1;
    const moving=points[Math.min(points.length-1,Math.floor(phase*(points.length-1)))];
    if(moving?.z>0){
      ctx.setLineDash([]);ctx.globalAlpha=1;ctx.shadowBlur=12;
      ctx.fillStyle=state.globeStyle==="orbit"?"#d8f8ff":"#ffffff";
      ctx.beginPath();ctx.arc(moving.x,moving.y,state.selectedRoute?.id===route.id?3.2:2.2,0,Math.PI*2);ctx.fill();
    }
  });
  ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.setLineDash([]);ctx.lineDashOffset=0;
}
function drawAirports() {
  airportHitAreas=[];
  const codes=new Set(routes.flatMap(r=>[r.from,r.to]));
  codes.add("PKX");
  codes.forEach(code=>{
    const airport=airports[code], p=project(airport.lat,airport.lon);
    if(p.z<=0)return;
    const selected=state.selectedAirport===code;
    const radius=selected?5:state.mapMode==="airport"?3.8:2.7;
    ctx.beginPath();ctx.arc(p.x,p.y,radius+3,0,Math.PI*2);ctx.fillStyle=selected?"rgba(24,119,242,.16)":"rgba(24,119,242,.08)";ctx.fill();
    ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fillStyle=selected?"#0b5fc9":"#1877f2";ctx.fill();
    if(selected||state.mapMode==="airport"){
      ctx.font="600 9px DM Sans";ctx.fillStyle="#3e4b5f";ctx.fillText(code,p.x+8,p.y-6);
    }
    airportHitAreas.push({code,x:p.x,y:p.y});
  });
}
function drawGlobe(time=performance.now()) {
  if(!cw||!ch)return;
  ctx.clearRect(0,0,cw,ch);
  drawBackground(time);
  const orbit=state.globeStyle==="orbit";
  ctx.save();
  ctx.shadowColor=orbit?"rgba(35,185,255,.38)":"rgba(52,72,98,.15)";ctx.shadowBlur=orbit?45:35;ctx.shadowOffsetY=orbit?0:14;
  ctx.beginPath();ctx.arc(centerX,centerY,globeR,0,Math.PI*2);ctx.fillStyle=orbit?"#06345d":"#fbfcfd";ctx.fill();
  ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(centerX,centerY,globeR,0,Math.PI*2);ctx.clip();
  const ocean=ctx.createRadialGradient(centerX-globeR*.3,centerY-globeR*.35,globeR*.08,centerX,centerY,globeR);
  if(orbit){
    ocean.addColorStop(0,"#1877a8");ocean.addColorStop(.55,"#07558b");ocean.addColorStop(1,"#03233f");
  }else{
    ocean.addColorStop(0,"#ffffff");ocean.addColorStop(1,"#edf2f6");
  }
  ctx.fillStyle=ocean;ctx.fillRect(centerX-globeR,centerY-globeR,globeR*2,globeR*2);
  drawLand();drawNightLayer(time);
  if(state.mapMode==="route")drawRoutes(time);else routeHitAreas=[];
  drawAirports();
  ctx.restore();
  ctx.beginPath();ctx.arc(centerX,centerY,globeR,0,Math.PI*2);
  ctx.strokeStyle=orbit?"rgba(102,222,255,.8)":"#b9c3cf";ctx.lineWidth=orbit?1.5:1;ctx.shadowColor=orbit?"#3ed6ff":"transparent";ctx.shadowBlur=orbit?18:0;ctx.stroke();ctx.shadowBlur=0;
}
function resizeGlobe() {
  const rect=canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  cw=rect.width;ch=rect.height;globeR=Math.min(cw,ch)*.43;centerX=cw*.5;centerY=ch*.5;
  stars=Array.from({length:Math.max(90,Math.floor(cw*ch/8500))},()=>({x:Math.random()*cw,y:Math.random()*ch,r:.35+Math.random()*1.15}));
  drawGlobe();
}
function pointerPos(e){const rect=canvas.getBoundingClientRect();return{x:e.clientX-rect.left,y:e.clientY-rect.top};}
function distancePointToSegment(p,a,b){
  const length=(b.x-a.x)**2+(b.y-a.y)**2;if(!length)return Math.hypot(p.x-a.x,p.y-a.y);
  const t=Math.max(0,Math.min(1,((p.x-a.x)*(b.x-a.x)+(p.y-a.y)*(b.y-a.y))/length));
  return Math.hypot(p.x-(a.x+t*(b.x-a.x)),p.y-(a.y+t*(b.y-a.y)));
}
function hitAirport(pos){return airportHitAreas.find(a=>Math.hypot(pos.x-a.x,pos.y-a.y)<10);}
function hitRoute(pos){
  let hit=null,min=11;
  routeHitAreas.forEach(area=>{for(let i=1;i<area.points.length;i++){const distance=distancePointToSegment(pos,area.points[i-1],area.points[i]);if(distance<min){min=distance;hit=area.route;}}});
  return hit;
}
canvas.addEventListener("pointerdown",e=>{dragging=true;moved=false;autoSpin=false;lastPointer=pointerPos(e);canvas.setPointerCapture(e.pointerId);canvas.classList.add("dragging");});
canvas.addEventListener("pointermove",e=>{
  const pos=pointerPos(e);
  if(dragging){
    const dx=pos.x-lastPointer.x,dy=pos.y-lastPointer.y;
    if(Math.abs(dx)+Math.abs(dy)>2)moved=true;
    rotation.lon+=dx*.3;
    rotation.lat=Math.max(-72,Math.min(72,rotation.lat+dy*.25));
    lastPointer=pos;drawGlobe();return;
  }
  const airportHit=hitAirport(pos),routeHit=state.mapMode==="route"?hitRoute(pos):null,tooltip=document.getElementById("hoverTooltip");
  canvas.style.cursor=airportHit||routeHit?"pointer":"grab";
  if(airportHit){
    const airport=airports[airportHit.code];tooltip.style.display="block";tooltip.style.left=`${pos.x+12}px`;tooltip.style.top=`${pos.y+10}px`;tooltip.innerHTML=`<b>${airport.code}</b> · ${airport.city}`;
  }else if(routeHit){
    tooltip.style.display="block";tooltip.style.left=`${pos.x+12}px`;tooltip.style.top=`${pos.y+10}px`;tooltip.innerHTML=`${airports[routeHit.from].city} — ${airports[routeHit.to].city} · <b>${routeHit.count} 次</b>`;
  }else tooltip.style.display="none";
});
canvas.addEventListener("pointerup",e=>{
  if(!moved){
    const pos=pointerPos(e),airportHit=hitAirport(pos),routeHit=state.mapMode==="route"?hitRoute(pos):null;
    if(airportHit)openAirportDrawer(airportHit.code);else if(routeHit)openRouteDrawer(routeHit);
  }
  dragging=false;lastPointer=null;canvas.classList.remove("dragging");
});
canvas.addEventListener("pointerleave",()=>document.getElementById("hoverTooltip").style.display="none");
canvas.addEventListener("wheel",e=>{e.preventDefault();globeR=Math.max(Math.min(cw,ch)*.31,Math.min(Math.min(cw,ch)*.49,globeR-e.deltaY*.08));drawGlobe();},{passive:false});
let lastFrame=0;
function animate(time){
  if(state.activeView==="atlas"&&time-lastFrame>40){
    if(autoSpin)rotation.lon+=.016;
    drawGlobe(time);lastFrame=time;
  }
  requestAnimationFrame(animate);
}

document.querySelectorAll(".nav-item").forEach(el=>el.addEventListener("click",()=>setView(el.dataset.view)));
document.querySelectorAll("[data-view-link]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();setView(el.dataset.viewLink);}));
document.getElementById("collapseButton").addEventListener("click",()=>{document.getElementById("appShell").classList.toggle("sidebar-collapsed");setTimeout(resizeGlobe,260);});
document.getElementById("routeMode").addEventListener("click",()=>{
  state.mapMode="route";document.getElementById("routeMode").classList.add("active");document.getElementById("airportMode").classList.remove("active");closeDrawer();drawGlobe();
});
document.getElementById("airportMode").addEventListener("click",()=>{
  state.mapMode="airport";document.getElementById("airportMode").classList.add("active");document.getElementById("routeMode").classList.remove("active");closeDrawer();drawGlobe();
});
document.getElementById("styleLight").addEventListener("click",()=>{
  state.globeStyle="light";document.getElementById("styleLight").classList.add("active");document.getElementById("styleOrbit").classList.remove("active");drawGlobe();
});
document.getElementById("styleOrbit").addEventListener("click",()=>{
  state.globeStyle="orbit";document.getElementById("styleOrbit").classList.add("active");document.getElementById("styleLight").classList.remove("active");drawGlobe();
});
document.getElementById("langZh").addEventListener("click",()=>applyLanguage("zh"));
document.getElementById("langEn").addEventListener("click",()=>applyLanguage("en"));
document.getElementById("drawerClose").addEventListener("click",closeDrawer);
document.getElementById("recordSearch").addEventListener("input",renderFlights);
document.querySelectorAll(".filter-chip").forEach(el=>el.addEventListener("click",()=>{document.querySelectorAll(".filter-chip").forEach(c=>c.classList.remove("active"));el.classList.add("active");state.filter=el.dataset.filter;renderFlights();}));
document.getElementById("addButton").addEventListener("click",()=>openModal("addModal"));
document.querySelectorAll("[data-open-add]").forEach(el=>el.addEventListener("click",()=>openModal("addModal")));
document.getElementById("importButton").addEventListener("click",()=>openModal("importModal"));
document.getElementById("editFlightButton").addEventListener("click",()=>{closeModals();document.getElementById("addTitle").textContent="编辑飞行记录";openModal("addModal");});
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModals));
document.querySelectorAll(".modal-backdrop").forEach(el=>el.addEventListener("click",e=>{if(e.target===el)closeModals();}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModals();closeDrawer();}});
document.getElementById("flightForm").addEventListener("submit",e=>{e.preventDefault();closeModals();showToast("记录已保存","飞行记录已更新");});
document.querySelector(".drop-zone input").addEventListener("change",e=>{if(e.target.files[0]){closeModals();showToast("文件已读取","正在校验导入字段");}});
window.addEventListener("resize",resizeGlobe);

applyLanguage("zh");renderStats();resizeGlobe();loadGeography();requestAnimationFrame(animate);
