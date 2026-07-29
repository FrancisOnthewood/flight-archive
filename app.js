const airports = {
  PVG: { code: "PVG", city: "上海", name: "上海浦东", lat: 31.1443, lon: 121.8083 },
  SHA: { code: "SHA", city: "上海", name: "上海虹桥", lat: 31.1979, lon: 121.3363 },
  HKG: { code: "HKG", city: "香港", name: "香港国际", lat: 22.308, lon: 113.9185 },
  PEK: { code: "PEK", city: "北京", name: "北京首都", lat: 40.0799, lon: 116.6031 },
  PKX: { code: "PKX", city: "北京", name: "北京大兴", lat: 39.5098, lon: 116.4105 },
  NRT: { code: "NRT", city: "东京", name: "东京成田", lat: 35.772, lon: 140.3929 },
  SIN: { code: "SIN", city: "新加坡", name: "樟宜机场", lat: 1.3644, lon: 103.9915 },
  SFO: { code: "SFO", city: "旧金山", name: "旧金山国际", lat: 37.6213, lon: -122.379 },
  CAN: { code: "CAN", city: "广州", name: "广州白云", lat: 23.3924, lon: 113.2988 },
  CTU: { code: "CTU", city: "成都", name: "成都双流", lat: 30.5785, lon: 103.9471 },
  KIX: { code: "KIX", city: "大阪", name: "关西国际", lat: 34.4347, lon: 135.244 },
  TPE: { code: "TPE", city: "台北", name: "桃园国际", lat: 25.0797, lon: 121.2342 }
};

const flights = [
  { id: 1, routeId: "sha-hkg", from: "PVG", to: "HKG", date: "2026-06-18", airline: "中国东方航空", airlineShort: "MU", flightNo: "MU721", aircraft: "Airbus A320neo", depart: "08:20", arrive: "10:55", duration: "2h 35m", distance: 1256, terminalFrom: "T1", terminalTo: "T1", seat: "34A", cabin: "经济舱", fare: 1680, booking: "航司官网", gate: "H12", status: "准点", note: "天气很好，起飞后很快看见了整片云海。靠窗座位的视野很棒。", scope: "international" },
  { id: 2, routeId: "sha-hkg", from: "HKG", to: "PVG", date: "2026-03-09", airline: "国泰航空", airlineShort: "CX", flightNo: "CX368", aircraft: "Airbus A330-300", depart: "09:15", arrive: "11:45", duration: "2h 30m", distance: 1256, terminalFrom: "T1", terminalTo: "T2", seat: "42K", cabin: "经济舱", fare: 1840, booking: "携程", gate: "28", status: "准点", note: "清晨从香港出发，落地上海时正好是很舒服的午后。", scope: "international" },
  { id: 3, routeId: "sha-hkg", from: "PVG", to: "HKG", date: "2025-11-14", airline: "香港航空", airlineShort: "HX", flightNo: "HX237", aircraft: "Airbus A320", depart: "11:55", arrive: "14:40", duration: "2h 45m", distance: 1256, terminalFrom: "T2", terminalTo: "T1", seat: "21F", cabin: "经济舱", fare: 1320, booking: "飞猪", gate: "D75", status: "延误 15m", note: "第一次搭乘香港航空，红色涂装很好认。", scope: "international" },
  { id: 4, routeId: "sha-hkg", from: "HKG", to: "PVG", date: "2025-09-21", airline: "中国东方航空", airlineShort: "MU", flightNo: "MU506", aircraft: "Airbus A321", depart: "20:20", arrive: "22:50", duration: "2h 30m", distance: 1256, terminalFrom: "T1", terminalTo: "T1", seat: "16A", cabin: "超级经济舱", fare: 2180, booking: "航司官网", gate: "6", status: "准点", note: "夜航回上海，进近时城市灯光很漂亮。", scope: "international" },
  { id: 5, routeId: "sha-sfo", from: "PVG", to: "SFO", date: "2026-01-12", airline: "美国联合航空", airlineShort: "UA", flightNo: "UA858", aircraft: "Boeing 787-9", depart: "13:10", arrive: "08:42", duration: "11h 32m", distance: 9880, terminalFrom: "T2", terminalTo: "I", seat: "47A", cabin: "经济舱", fare: 5280, booking: "航司官网", gate: "D69", status: "准点", note: "跨越日期变更线的一程。787 的舷窗和客舱湿度体验很好。", scope: "international" },
  { id: 6, routeId: "sha-sin", from: "PVG", to: "SIN", date: "2025-12-24", airline: "新加坡航空", airlineShort: "SQ", flightNo: "SQ827", aircraft: "Airbus A350-900", depart: "08:05", arrive: "13:40", duration: "5h 35m", distance: 3807, terminalFrom: "T2", terminalTo: "T3", seat: "38K", cabin: "经济舱", fare: 2880, booking: "航司官网", gate: "D81", status: "准点", note: "圣诞前夜飞向热带，服务和餐食都令人印象深刻。", scope: "international" },
  { id: 7, routeId: "sha-pek", from: "SHA", to: "PEK", date: "2026-05-03", airline: "中国国际航空", airlineShort: "CA", flightNo: "CA1518", aircraft: "Airbus A330-300", depart: "16:25", arrive: "18:45", duration: "2h 20m", distance: 1075, terminalFrom: "T2", terminalTo: "T3", seat: "31L", cabin: "经济舱", fare: 1240, booking: "国航 App", gate: "M6", status: "准点", note: "五一假期的北京行，航路上天气平稳。", scope: "domestic" },
  { id: 8, routeId: "sha-pek", from: "PKX", to: "SHA", date: "2026-05-06", airline: "中国东方航空", airlineShort: "MU", flightNo: "MU5122", aircraft: "Boeing 787-9", depart: "19:05", arrive: "21:20", duration: "2h 15m", distance: 1066, terminalFrom: "主楼", terminalTo: "T2", seat: "29A", cabin: "经济舱", fare: 1160, booking: "东航 App", gate: "B25", status: "准点", note: "第一次从大兴机场出发，建筑空间感很震撼。", scope: "domestic" },
  { id: 9, routeId: "sha-nrt", from: "PVG", to: "NRT", date: "2025-07-17", airline: "全日空", airlineShort: "NH", flightNo: "NH920", aircraft: "Boeing 787-9", depart: "13:05", arrive: "17:10", duration: "3h 05m", distance: 1802, terminalFrom: "T2", terminalTo: "T1", seat: "26A", cabin: "经济舱", fare: 2420, booking: "ANA 官网", gate: "D73", status: "准点", note: "落地前看到了富士山的一角。", scope: "international" },
  { id: 10, routeId: "sha-can", from: "SHA", to: "CAN", date: "2025-05-29", airline: "中国南方航空", airlineShort: "CZ", flightNo: "CZ3526", aircraft: "Airbus A320neo", depart: "14:20", arrive: "16:45", duration: "2h 25m", distance: 1175, terminalFrom: "T2", terminalTo: "T2", seat: "18F", cabin: "经济舱", fare: 930, booking: "南航 App", gate: "51", status: "准点", note: "短暂的广州周末。", scope: "domestic" },
  { id: 11, routeId: "sha-ctu", from: "PVG", to: "CTU", date: "2025-03-11", airline: "四川航空", airlineShort: "3U", flightNo: "3U8962", aircraft: "Airbus A350-900", depart: "17:10", arrive: "20:25", duration: "3h 15m", distance: 1702, terminalFrom: "T2", terminalTo: "T2", seat: "45A", cabin: "经济舱", fare: 1060, booking: "携程", gate: "C69", status: "准点", note: "为了一顿火锅飞去成都。", scope: "domestic" },
  { id: 12, routeId: "sha-kix", from: "PVG", to: "KIX", date: "2024-10-03", airline: "吉祥航空", airlineShort: "HO", flightNo: "HO1337", aircraft: "Boeing 787-9", depart: "16:40", arrive: "20:05", duration: "2h 25m", distance: 1307, terminalFrom: "T2", terminalTo: "T1", seat: "32L", cabin: "经济舱", fare: 2350, booking: "航司官网", gate: "D80", status: "准点", note: "关西之旅的开始。", scope: "international" }
];

const routes = [
  { id: "sha-hkg", from: "PVG", to: "HKG", count: 6, distance: 1256, color: "#ff735c" },
  { id: "sha-pek", from: "SHA", to: "PEK", count: 4, distance: 1075, color: "#ff9b75" },
  { id: "sha-sin", from: "PVG", to: "SIN", count: 2, distance: 3807, color: "#5ed6ba" },
  { id: "sha-nrt", from: "PVG", to: "NRT", count: 2, distance: 1802, color: "#67a6ff" },
  { id: "sha-sfo", from: "PVG", to: "SFO", count: 1, distance: 9880, color: "#9aa6ff" },
  { id: "sha-can", from: "SHA", to: "CAN", count: 1, distance: 1175, color: "#f6bd63" },
  { id: "sha-ctu", from: "PVG", to: "CTU", count: 1, distance: 1702, color: "#dc78dd" },
  { id: "sha-kix", from: "PVG", to: "KIX", count: 1, distance: 1307, color: "#53bfe1" }
];

const continents = [
  [[-168,71],[-140,70],[-125,58],[-110,53],[-98,50],[-82,52],[-62,47],[-55,37],[-75,24],[-92,18],[-105,22],[-118,32],[-132,50],[-160,58]],
  [[-81,12],[-70,8],[-60,3],[-51,-5],[-45,-20],[-53,-33],[-67,-55],[-75,-40],[-79,-20]],
  [[-11,36],[0,43],[16,46],[29,42],[42,47],[59,55],[90,72],[124,60],[145,53],[160,60],[179,51],[156,39],[135,34],[122,22],[105,5],[93,11],[78,7],[64,23],[45,30],[31,35],[17,31]],
  [[-17,35],[4,37],[19,32],[31,21],[42,12],[50,-14],[37,-30],[20,-35],[8,-27],[-2,-5],[-10,8]],
  [[112,-11],[135,-12],[153,-27],[146,-40],[121,-36]],
  [[-52,82],[-20,80],[-26,66],[-45,60],[-62,69]],
  [[130,33],[141,34],[146,43],[140,46],[134,38]]
];

const ui = {
  activeView: "atlas",
  selectedRoute: routes[0],
  selectedFlight: flights[0],
  filter: "all",
  globeMode: "route"
};

function formatDate(date) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(`${date}T12:00:00`));
}

function flightCardMarkup(f) {
  const from = airports[f.from], to = airports[f.to];
  const brandColors = { MU: "#c8484b", CX: "#176d72", HX: "#9b3d43", UA: "#2456a6", SQ: "#ad812c", CA: "#b03737", NH: "#255da6", CZ: "#287ca8", "3U": "#b3483d", HO: "#8e2f45" };
  return `
    <article class="flight-card" data-flight-id="${f.id}" style="--airline:${brandColors[f.airlineShort] || "#4b6886"};--glow:${brandColors[f.airlineShort] || "#ff735c"}24">
      <div class="flight-card-head">
        <div class="airline-lockup"><span class="airline-logo">${f.airlineShort}</span><div><strong>${f.airline}</strong><small>${f.aircraft}</small></div></div>
        <div class="flight-date"><b>${f.flightNo}</b>${formatDate(f.date)}</div>
      </div>
      <div class="flight-card-route">
        <div><strong>${f.from}</strong><span>${from.city} · ${f.terminalFrom}</span></div>
        <div class="flight-path"><span>${f.duration}</span><i></i><b>✦</b></div>
        <div class="right"><strong>${f.to}</strong><span>${to.city} · ${f.terminalTo}</span></div>
      </div>
      <div class="flight-card-footer">
        <span>座位 <b>${f.seat}</b></span><span>${f.cabin}</span><span>${f.distance.toLocaleString()} km</span><span>¥ ${f.fare.toLocaleString()}</span>
      </div>
    </article>`;
}

function renderFlights() {
  const search = (document.getElementById("recordSearch")?.value || "").toLowerCase();
  const list = flights.filter(f => {
    const filterOk = ui.filter === "all" || (ui.filter === "2026" ? f.date.startsWith("2026") : f.scope === ui.filter);
    const haystack = `${f.flightNo} ${f.airline} ${f.from} ${f.to} ${airports[f.from].city} ${airports[f.to].city}`.toLowerCase();
    return filterOk && haystack.includes(search);
  });
  document.getElementById("flightGrid").innerHTML = list.length ? list.map(flightCardMarkup).join("") : `<div class="empty-state">没有找到符合条件的飞行记录</div>`;
  document.querySelectorAll("[data-flight-id]").forEach(card => card.addEventListener("click", () => openFlight(Number(card.dataset.flightId))));
}

function miniRecordMarkup(f, color) {
  return `
    <article class="record-card" data-flight-id="${f.id}" style="--card-color:${color}">
      <div class="record-top"><strong>${f.flightNo}</strong><span>${formatDate(f.date)}</span></div>
      <div class="record-times">
        <div><b>${f.depart}</b><small>${f.from} · ${f.terminalFrom}</small></div>
        <div class="mini-route"></div>
        <div><b>${f.arrive}</b><small>${f.to} · ${f.terminalTo}</small></div>
      </div>
      <div class="record-bottom"><span>${f.aircraft}</span><span>${f.duration}</span></div>
    </article>`;
}

function selectRoute(routeId) {
  const route = routes.find(r => r.id === routeId);
  if (!route) return;
  ui.selectedRoute = route;
  const from = airports[route.from], to = airports[route.to];
  document.getElementById("selectedRouteTitle").innerHTML = `${from.city} <span>⇄</span> ${to.city}`;
  document.getElementById("selectedRouteCount").textContent = route.count;
  document.getElementById("selectedRouteDistance").textContent = route.distance.toLocaleString();
  let routeFlights = flights.filter(f => f.routeId === route.id);
  if (!routeFlights.length) routeFlights = flights.filter(f => [f.from, f.to].includes(route.from) || [f.from, f.to].includes(route.to)).slice(0, 3);
  document.getElementById("routeRecordList").innerHTML = routeFlights.slice(0, 4).map(f => miniRecordMarkup(f, route.color)).join("");
  document.querySelectorAll("#routeRecordList [data-flight-id]").forEach(card => card.addEventListener("click", () => openFlight(Number(card.dataset.flightId))));
  drawGlobe();
}

function openFlight(id) {
  const f = flights.find(item => item.id === id);
  if (!f) return;
  ui.selectedFlight = f;
  const from = airports[f.from], to = airports[f.to];
  const set = (id, val) => document.getElementById(id).textContent = val;
  set("detailAirline", f.airline);
  set("detailFlightNo", f.flightNo.replace(/([A-Z0-9]{2})(\d+)/, "$1 $2"));
  set("detailDate", `${formatDate(f.date)} · ${f.status}`);
  set("detailFromCode", f.from); set("detailFromCity", from.city); set("detailDeparture", `${f.depart} · ${f.terminalFrom}`);
  set("detailToCode", f.to); set("detailToCity", to.city); set("detailArrival", `${f.arrive} · ${f.terminalTo}`);
  set("detailDuration", f.duration); set("detailDistance", `${f.distance.toLocaleString()} km`); set("detailNote", f.note);
  document.getElementById("detailInfoGrid").innerHTML = [
    ["机型", f.aircraft], ["座位", f.seat], ["舱位", f.cabin], ["票价", `¥ ${f.fare.toLocaleString()}`], ["登机口", f.gate], ["预订渠道", f.booking]
  ].map(([k,v]) => `<div><span>${k}</span><strong>${v}</strong></div>`).join("");
  openModal("detailModal");
}

function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModals() {
  document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("open"));
  document.body.style.overflow = "";
}
function showToast(title = "记录已保存", subtitle = "新的航迹已经点亮") {
  const toast = document.getElementById("toast");
  toast.querySelector("strong").textContent = title;
  toast.querySelector("small").textContent = subtitle;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

function setView(view) {
  ui.activeView = view;
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === view));
  const target = document.getElementById(`${view}View`);
  if (target) target.classList.add("active");
  if (view === "atlas") setTimeout(resizeGlobe, 20);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderStats() {
  document.getElementById("routeRanking").innerHTML = routes.slice(0, 5).map((r, i) => `
    <div class="ranking-row"><span>0${i+1}</span><strong>${airports[r.from].city} ⇄ ${airports[r.to].city}</strong><div class="rank-track"><i style="width:${r.count / 6 * 100}%;--bar:${r.color}"></i></div><b>${r.count} 次</b></div>
  `).join("");
  const airportStats = [["PVG 上海浦东",12],["HKG 香港国际",6],["SHA 上海虹桥",4],["PEK 北京首都",3],["SIN 新加坡樟宜",2]];
  document.getElementById("airportBars").innerHTML = airportStats.map(([name, n]) => `<div class="airport-row"><span>${name}</span><i style="--w:${n/12*100}%"></i><b>${n}</b></div>`).join("");
}

// Interactive orthographic globe
const canvas = document.getElementById("globeCanvas");
const ctx = canvas.getContext("2d");
let cw = 0, ch = 0, globeR = 180, centerX = 0, centerY = 0;
let rotation = { lon: -112, lat: -18 };
let dragging = false, moved = false, lastPointer = null, routeHitAreas = [];
let autoSpin = true, frame;

function rad(v) { return v * Math.PI / 180; }
function project(lat, lon, altitude = 0) {
  const phi = rad(lat), lambda = rad(lon + rotation.lon), tilt = rad(rotation.lat);
  const x0 = Math.cos(phi) * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const z0 = Math.cos(phi) * Math.cos(lambda);
  const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
  const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
  return { x: centerX + x0 * globeR * (1 + altitude), y: centerY - y * globeR * (1 + altitude), z };
}
function geoVec(lat, lon) {
  const p = rad(lat), l = rad(lon);
  return [Math.cos(p)*Math.cos(l), Math.cos(p)*Math.sin(l), Math.sin(p)];
}
function vecGeo(v) {
  return { lat: Math.atan2(v[2], Math.hypot(v[0],v[1]))*180/Math.PI, lon: Math.atan2(v[1],v[0])*180/Math.PI };
}
function greatCircle(a, b, steps = 52) {
  const va = geoVec(a.lat,a.lon), vb = geoVec(b.lat,b.lon);
  const dot = Math.min(1, Math.max(-1, va[0]*vb[0]+va[1]*vb[1]+va[2]*vb[2]));
  const omega = Math.acos(dot), sinOmega = Math.sin(omega);
  return Array.from({length:steps+1}, (_,i) => {
    const t=i/steps, s1=sinOmega ? Math.sin((1-t)*omega)/sinOmega : 1-t, s2=sinOmega ? Math.sin(t*omega)/sinOmega : t;
    return vecGeo([s1*va[0]+s2*vb[0], s1*va[1]+s2*vb[1], s1*va[2]+s2*vb[2]]);
  });
}
function visibleSegment(points) {
  const segments = []; let current = [];
  points.forEach(p => {
    if (p.z > -0.015) current.push(p);
    else if (current.length) { segments.push(current); current = []; }
  });
  if (current.length) segments.push(current);
  return segments;
}
function drawGlobe() {
  if (!cw || !ch) return;
  ctx.clearRect(0,0,cw,ch);
  const glow = ctx.createRadialGradient(centerX-globeR*.28,centerY-globeR*.28,globeR*.12,centerX,centerY,globeR*1.06);
  glow.addColorStop(0,"#123653"); glow.addColorStop(.68,"#092137"); glow.addColorStop(1,"rgba(2,11,20,.25)");
  ctx.beginPath(); ctx.arc(centerX,centerY,globeR,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(centerX,centerY,globeR,0,Math.PI*2); ctx.clip();
  ctx.strokeStyle="rgba(116,170,207,.09)"; ctx.lineWidth=.7;
  for (let lat=-60;lat<=60;lat+=20) {
    const pts=[]; for(let lon=-180;lon<=180;lon+=4) pts.push(project(lat,lon));
    visibleSegment(pts).forEach(seg => { ctx.beginPath(); seg.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)); ctx.stroke(); });
  }
  for (let lon=-180;lon<180;lon+=20) {
    const pts=[]; for(let lat=-89;lat<=89;lat+=3) pts.push(project(lat,lon));
    visibleSegment(pts).forEach(seg => { ctx.beginPath(); seg.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)); ctx.stroke(); });
  }
  continents.forEach(poly => {
    const pts=poly.map(([lon,lat])=>project(lat,lon));
    const visible=pts.filter(p=>p.z>0);
    if(visible.length < 3) return;
    ctx.beginPath();
    pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
    ctx.closePath();
    ctx.fillStyle="rgba(38,83,108,.5)"; ctx.strokeStyle="rgba(97,154,183,.25)"; ctx.lineWidth=.7; ctx.fill(); ctx.stroke();
  });

  routeHitAreas = [];
  if (ui.globeMode === "route") {
    routes.forEach(route => {
      const points=greatCircle(airports[route.from],airports[route.to]).map((p,i,arr)=>project(p.lat,p.lon, Math.sin(Math.PI*i/(arr.length-1))*.07));
      const segs=visibleSegment(points);
      segs.forEach(seg => {
        if(seg.length<2)return;
        const selected=route.id===ui.selectedRoute.id;
        ctx.beginPath(); seg.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
        ctx.strokeStyle=route.color; ctx.lineWidth=(selected?1.8:0.8)+route.count*.2; ctx.globalAlpha=selected?1:.32+route.count*.08;
        ctx.shadowColor=route.color; ctx.shadowBlur=selected?15:route.count*2; ctx.stroke();
        routeHitAreas.push({route,points:seg});
      });
    });
  }
  ctx.globalAlpha=1; ctx.shadowBlur=0;
  const shownAirports = new Set(routes.flatMap(r=>[r.from,r.to]));
  shownAirports.forEach(code => {
    const p=project(airports[code].lat,airports[code].lon);
    if(p.z<0)return;
    const selected=[ui.selectedRoute.from,ui.selectedRoute.to].includes(code);
    ctx.beginPath(); ctx.arc(p.x,p.y,selected?3.2:2,0,Math.PI*2); ctx.fillStyle=selected?"#fff":"#8eb3ca"; ctx.fill();
    if(selected || ui.globeMode==="airport") {
      ctx.font=`${selected?"600 ":""}9px DM Sans`; ctx.fillStyle=selected?"rgba(255,255,255,.9)":"rgba(166,193,211,.65)";
      ctx.fillText(code,p.x+7,p.y-5);
    }
  });
  ctx.restore();
  ctx.beginPath(); ctx.arc(centerX,centerY,globeR,0,Math.PI*2); ctx.strokeStyle="rgba(103,167,205,.28)"; ctx.lineWidth=1; ctx.stroke();
}
function resizeGlobe() {
  const rect=canvas.getBoundingClientRect(), dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.round(rect.width*dpr); canvas.height=Math.round(rect.height*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
  cw=rect.width; ch=rect.height; globeR=Math.min(cw,ch)*.40; centerX=cw*.48; centerY=ch*.51; drawGlobe();
}
function pointerPos(e) { const r=canvas.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; }
function distancePointToSegment(p,a,b) {
  const l2=(b.x-a.x)**2+(b.y-a.y)**2; if(!l2)return Math.hypot(p.x-a.x,p.y-a.y);
  const t=Math.max(0,Math.min(1,((p.x-a.x)*(b.x-a.x)+(p.y-a.y)*(b.y-a.y))/l2));
  return Math.hypot(p.x-(a.x+t*(b.x-a.x)),p.y-(a.y+t*(b.y-a.y)));
}
function hitRoute(pos) {
  let hit=null,min=12;
  routeHitAreas.forEach(area=>{for(let i=1;i<area.points.length;i++){const d=distancePointToSegment(pos,area.points[i-1],area.points[i]);if(d<min){min=d;hit=area.route;}}});
  return hit;
}
canvas.addEventListener("pointerdown",e=>{dragging=true;moved=false;autoSpin=false;lastPointer=pointerPos(e);canvas.setPointerCapture(e.pointerId);canvas.classList.add("dragging");});
canvas.addEventListener("pointermove",e=>{
  const p=pointerPos(e);
  if(dragging){const dx=p.x-lastPointer.x,dy=p.y-lastPointer.y;if(Math.abs(dx)+Math.abs(dy)>2)moved=true;rotation.lon+=dx*.32;rotation.lat=Math.max(-70,Math.min(70,rotation.lat-dy*.25));lastPointer=p;drawGlobe();return;}
  const hit=hitRoute(p), tip=document.getElementById("routeTooltip");
  canvas.style.cursor=hit?"pointer":"grab";
  if(hit){tip.style.display="block";tip.style.left=`${p.x+12}px`;tip.style.top=`${p.y+10}px`;tip.innerHTML=`${airports[hit.from].city} ⇄ ${airports[hit.to].city} · <b>${hit.count} 次</b>`;} else tip.style.display="none";
});
canvas.addEventListener("pointerup",e=>{if(!moved){const hit=hitRoute(pointerPos(e));if(hit)selectRoute(hit.id);}dragging=false;lastPointer=null;canvas.classList.remove("dragging");});
canvas.addEventListener("pointerleave",()=>document.getElementById("routeTooltip").style.display="none");
canvas.addEventListener("wheel",e=>{e.preventDefault();globeR=Math.max(Math.min(cw,ch)*.30,Math.min(Math.min(cw,ch)*.48,globeR-e.deltaY*.08));drawGlobe();},{passive:false});
function animate(){if(autoSpin&&ui.activeView==="atlas"){rotation.lon+=.018;drawGlobe();}frame=requestAnimationFrame(animate);}

document.querySelectorAll(".nav-item").forEach(n=>n.addEventListener("click",()=>setView(n.dataset.view)));
document.querySelectorAll("[data-view-link]").forEach(n=>n.addEventListener("click",()=>setView(n.dataset.viewLink)));
document.querySelectorAll("[data-route-id]").forEach(n=>n.addEventListener("click",()=>{selectRoute(n.dataset.routeId);setView("atlas");}));
document.getElementById("allRouteRecords").addEventListener("click",()=>{setView("records");document.getElementById("recordSearch").value=airports[ui.selectedRoute.to].city;renderFlights();});
document.getElementById("addButton").addEventListener("click",()=>openModal("addModal"));
document.getElementById("importButton").addEventListener("click",()=>openModal("importModal"));
document.getElementById("editFlightButton").addEventListener("click",()=>{closeModals();openModal("addModal");document.getElementById("addTitle").textContent="编辑飞行记录";});
document.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",closeModals));
document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModals();}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModals();});
document.getElementById("flightForm").addEventListener("submit",e=>{e.preventDefault();closeModals();showToast();});
document.querySelector(".drop-zone input").addEventListener("change",e=>{if(e.target.files[0]){closeModals();showToast("文件已读取","正在校验表格中的航班记录");}});
document.getElementById("recordSearch").addEventListener("input",renderFlights);
document.querySelectorAll(".filter-chip").forEach(chip=>chip.addEventListener("click",()=>{document.querySelectorAll(".filter-chip").forEach(c=>c.classList.remove("active"));chip.classList.add("active");ui.filter=chip.dataset.filter;renderFlights();}));
document.getElementById("routeMode").addEventListener("click",()=>{ui.globeMode="route";document.getElementById("routeMode").classList.add("active");document.getElementById("airportMode").classList.remove("active");drawGlobe();});
document.getElementById("airportMode").addEventListener("click",()=>{ui.globeMode="airport";document.getElementById("airportMode").classList.add("active");document.getElementById("routeMode").classList.remove("active");drawGlobe();});
window.addEventListener("resize",resizeGlobe);

selectRoute("sha-hkg");
renderFlights();
renderStats();
resizeGlobe();
animate();
