const fallbackAirports = {
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
  HO: "icons/juneyao-airlines.png",
  MF: "icons/Xiamen airlines.png",
  JQ: "icons/Jetstar.png",
  OD: "icons/batik air.png",
  AK: "icons/AirAsia.png",
  BI: "icons/royal brunei.png",
  NS: "icons/hebei airlines.png",
  EK: "icons/Emirates.png",
  VY: "icons/Vueling.webp",
  ZH: "icons/Shenzhen airlines.png",
  HU: "icons/Hainan-Airlines.png"
};

const aircraftVisuals = {
  "9VSHM": { src: "./airplanes/singapore%20359.png", altKey: "aircraftIllustrationSingapore" },
  "9VSKV": { src: "./airplanes/singapore%20388%209vskv.png", altKey: "aircraftIllustrationSingaporeA380" },
  "B309W": { src: "./airplanes/china%20southern%20359%20b309w.png", altKey: "aircraftIllustrationChinaSouthern" },
  "B20DM": { src: "./airplanes/china%20southern%2077w%20b20dm.png", altKey: "aircraftIllustrationChinaSouthern777" },
  "B32CE": { src: "./airplanes/air%20china%20359%20b32ce.png", altKey: "aircraftIllustrationAirChina" },
  "A6EDV": { src: "./airplanes/emirates%20388%20a6edv.png", altKey: "aircraftIllustrationEmiratesA380" },
  "A6EGR": { src: "./airplanes/emirates%2077w%20a6egr.png", altKey: "aircraftIllustrationEmirates777" }
};

const fallbackFlights = [
  { id: 1, routeId: "sha-hkg", from: "PVG", to: "HKG", date: "2026-06-18", airline: "China Eastern Airlines", airlineShort: "MU", flightNo: "MU721", aircraft: "Airbus A320neo", depart: "08:20", arrive: "10:55", duration: "2h 35m", distance: 1256, terminalFrom: "T1", terminalTo: "T1", seat: "34A", cabin: "经济舱", fare: 1680, booking: "航司官网", gate: "H12", status: "准点", note: "天气良好，巡航阶段平稳。", scope: "international" },
  { id: 2, routeId: "sha-hkg", from: "HKG", to: "PVG", date: "2026-03-09", airline: "Cathay Pacific", airlineShort: "CX", flightNo: "CX368", aircraft: "Airbus A330-300", depart: "09:15", arrive: "11:45", duration: "2h 30m", distance: 1256, terminalFrom: "T1", terminalTo: "T2", seat: "42K", cabin: "经济舱", fare: 1840, booking: "携程", gate: "28", status: "准点", note: "上午航班，实际到达时间与计划一致。", scope: "international" },
  { id: 3, routeId: "sha-hkg", from: "PVG", to: "HKG", date: "2025-11-14", airline: "Hong Kong Airlines", airlineShort: "HX", flightNo: "HX237", aircraft: "Airbus A320", depart: "11:55", arrive: "14:40", duration: "2h 45m", distance: 1256, terminalFrom: "T2", terminalTo: "T1", seat: "21F", cabin: "经济舱", fare: 1320, booking: "飞猪", gate: "D75", status: "延误 15m", note: "实际起飞时间较计划晚 15 分钟。", scope: "international" },
  { id: 4, routeId: "sha-hkg", from: "HKG", to: "PVG", date: "2025-09-21", airline: "China Eastern Airlines", airlineShort: "MU", flightNo: "MU506", aircraft: "Airbus A321", depart: "20:20", arrive: "22:50", duration: "2h 30m", distance: 1256, terminalFrom: "T1", terminalTo: "T1", seat: "16A", cabin: "超级经济舱", fare: 2180, booking: "航司官网", gate: "6", status: "准点", note: "夜间航班。", scope: "international" },
  { id: 5, routeId: "sha-sfo", from: "PVG", to: "SFO", date: "2026-01-12", airline: "United Airlines", airlineShort: "UA", flightNo: "UA858", aircraft: "Boeing 787-9", depart: "13:10", arrive: "08:42", duration: "11h 32m", distance: 9880, terminalFrom: "T2", terminalTo: "I", seat: "47A", cabin: "经济舱", fare: 5280, booking: "航司官网", gate: "D69", status: "准点", note: "跨越日期变更线。", scope: "international" },
  { id: 6, routeId: "sha-sin", from: "PVG", to: "SIN", date: "2025-12-24", airline: "Singapore Airlines", airlineShort: "SQ", flightNo: "SQ827", aircraft: "Airbus A350-900", depart: "08:05", arrive: "13:40", duration: "5h 35m", distance: 3807, terminalFrom: "T2", terminalTo: "T3", seat: "38K", cabin: "经济舱", fare: 2880, booking: "航司官网", gate: "D81", status: "准点", note: "日间航班。", scope: "international" },
  { id: 7, routeId: "sha-pek", from: "SHA", to: "PEK", date: "2026-05-03", airline: "Air China", airlineShort: "CA", flightNo: "CA1518", aircraft: "Airbus A330-300", depart: "16:25", arrive: "18:45", duration: "2h 20m", distance: 1075, terminalFrom: "T2", terminalTo: "T3", seat: "31L", cabin: "经济舱", fare: 1240, booking: "国航 App", gate: "M6", status: "准点", note: "国内航段。", scope: "domestic" },
  { id: 8, routeId: "sha-pek", from: "PKX", to: "SHA", date: "2026-05-06", airline: "China Eastern Airlines", airlineShort: "MU", flightNo: "MU5122", aircraft: "Boeing 787-9", depart: "19:05", arrive: "21:20", duration: "2h 15m", distance: 1066, terminalFrom: "主楼", terminalTo: "T2", seat: "29A", cabin: "经济舱", fare: 1160, booking: "东航 App", gate: "B25", status: "准点", note: "由北京大兴机场出发。", scope: "domestic" },
  { id: 9, routeId: "sha-nrt", from: "PVG", to: "NRT", date: "2025-07-17", airline: "All Nippon Airways", airlineShort: "NH", flightNo: "NH920", aircraft: "Boeing 787-9", depart: "13:05", arrive: "17:10", duration: "3h 05m", distance: 1802, terminalFrom: "T2", terminalTo: "T1", seat: "26A", cabin: "经济舱", fare: 2420, booking: "ANA 官网", gate: "D73", status: "准点", note: "下午抵达成田机场。", scope: "international" },
  { id: 10, routeId: "sha-can", from: "SHA", to: "CAN", date: "2025-05-29", airline: "China Southern Airlines", airlineShort: "CZ", flightNo: "CZ3526", aircraft: "Airbus A320neo", depart: "14:20", arrive: "16:45", duration: "2h 25m", distance: 1175, terminalFrom: "T2", terminalTo: "T2", seat: "18F", cabin: "经济舱", fare: 930, booking: "南航 App", gate: "51", status: "准点", note: "国内航段。", scope: "domestic" },
  { id: 11, routeId: "sha-ctu", from: "PVG", to: "CTU", date: "2025-03-11", airline: "Sichuan Airlines", airlineShort: "3U", flightNo: "3U8962", aircraft: "Airbus A350-900", depart: "17:10", arrive: "20:25", duration: "3h 15m", distance: 1702, terminalFrom: "T2", terminalTo: "T2", seat: "45A", cabin: "经济舱", fare: 1060, booking: "携程", gate: "C69", status: "准点", note: "傍晚出发。", scope: "domestic" },
  { id: 12, routeId: "sha-kix", from: "PVG", to: "KIX", date: "2024-10-03", airline: "Juneyao Air", airlineShort: "HO", flightNo: "HO1337", aircraft: "Boeing 787-9", depart: "16:40", arrive: "20:05", duration: "2h 25m", distance: 1307, terminalFrom: "T2", terminalTo: "T1", seat: "32L", cabin: "经济舱", fare: 2350, booking: "航司官网", gate: "D80", status: "准点", note: "晚间抵达关西机场。", scope: "international" }
];

const fallbackRoutes = [
  { id: "sha-hkg", from: "PVG", to: "HKG", count: 6, distance: 1256 },
  { id: "sha-pek", from: "SHA", to: "PEK", count: 4, distance: 1075 },
  { id: "sha-sin", from: "PVG", to: "SIN", count: 2, distance: 3807 },
  { id: "sha-nrt", from: "PVG", to: "NRT", count: 2, distance: 1802 },
  { id: "sha-sfo", from: "PVG", to: "SFO", count: 1, distance: 9880 },
  { id: "sha-can", from: "SHA", to: "CAN", count: 1, distance: 1175 },
  { id: "sha-ctu", from: "PVG", to: "CTU", count: 1, distance: 1702 },
  { id: "sha-kix", from: "PVG", to: "KIX", count: 1, distance: 1307 }
];

const archiveData = window.FLIGHT_ARCHIVE_DATA || {};
const airports = archiveData.airports || fallbackAirports;
const flights = archiveData.flights || fallbackFlights;
const routes = archiveData.routes || fallbackRoutes;
const savedFlightEdits = (() => {
  try { return JSON.parse(localStorage.getItem("flightArchiveEdits") || "{}"); }
  catch { return {}; }
})();
flights.forEach(flight => {
  if(savedFlightEdits[flight.id])Object.assign(flight,savedFlightEdits[flight.id]);
});

const fallbackLand = [
  [[-168,71],[-140,70],[-125,58],[-110,53],[-98,50],[-82,52],[-62,47],[-55,37],[-75,24],[-92,18],[-105,22],[-118,32],[-132,50],[-160,58]],
  [[-81,12],[-70,8],[-60,3],[-51,-5],[-45,-20],[-53,-33],[-67,-55],[-75,-40],[-79,-20]],
  [[-11,36],[0,43],[16,46],[29,42],[42,47],[59,55],[90,72],[124,60],[145,53],[160,60],[179,51],[156,39],[135,34],[122,22],[105,5],[93,11],[78,7],[64,23],[45,30],[31,35],[17,31]],
  [[-17,35],[4,37],[19,32],[31,21],[42,12],[50,-14],[37,-30],[20,-35],[8,-27],[-2,-5],[-10,8]],
  [[112,-11],[135,-12],[153,-27],[146,-40],[121,-36]],
  [[-52,82],[-20,80],[-26,66],[-45,60],[-62,69]]
];

const translations = {
  en: {
    navMap:"Flight Map", navRecords:"Flight Records", navStats:"Statistics", navMedia:"Media",
    mapSelection:"Map content", routes:"Routes", airports:"Airports", mapHelp:"Drag to rotate, scroll to zoom, and select a route or airport for details.",
    language:"Language", settings:"Settings", authorGithub:"Author GitHub",
    hubs:"Hub airports", add:"Add", removeHub:"Remove hub", loadingGeography:"Loading geographic data",
    import:"Import", addFlight:"Add flight", recordsTitle:"Flight Records", totalFlights:"total flights",
    searchPlaceholder:"Search flight, airline, or airport", all:"All", year:"Year", allYears:"All years",
    international:"International / HK, MO & TW", domestic:"Domestic",
    flight:"Flight", date:"Date", airportTime:"Airports & time", flightInfo:"Flight information", fare:"Fare",
    statsTitle:"Flight Statistics", mediaTitle:"Travel Media", mediaDesc:"Photos and boarding materials linked to flight records.",
    memorySunset:"Window sunset", memoryCruise:"Cruise", memoryNightApproach:"Night approach",
    memoryShanghaiHongKong:"Shanghai → Hong Kong", memoryHongKongShanghai:"Hong Kong → Shanghai", memoryShanghaiSingapore:"Shanghai → Singapore",
    route:"Route", airport:"Airport", flightsRecorded:"Flights", oneWayDistance:"One-way distance",
    relatedFlights:"Related flights", recordedSegments:"Flights", coordinates:"Coordinates", connections:"Connected routes",
    recentRecords:"Recent flights", times:"flights", noConnections:"No connected route in the current records.",
    noRecords:"No flight records match the current filters.", aircraft:"Aircraft",
    aircraftIllustrationSingapore:"Singapore Airlines Airbus A350-900 side illustration",
    aircraftIllustrationSingaporeA380:"Singapore Airlines Airbus A380-800 side illustration",
    aircraftIllustrationChinaSouthern:"China Southern Airlines Airbus A350-900 side illustration",
    aircraftIllustrationChinaSouthern777:"China Southern Airlines Boeing 777-300ER side illustration",
    aircraftIllustrationAirChina:"Air China Airbus A350-900 side illustration",
    aircraftIllustrationEmiratesA380:"Emirates Airbus A380-800 side illustration",
    aircraftIllustrationEmirates777:"Emirates Boeing 777-300ER side illustration", registration:"Registration",
    cabin:"Cabin", seat:"Seat", gate:"Gate", notes:"Notes", noNotes:"No notes", close:"Close", editRecord:"Edit record",
    totalTime:"Total flight time", totalDistance:"Total distance", aircraftTypes:"Aircraft types",
    countriesRegions:"Countries / regions", directedRoutes:"Routes flown", citiesVisited:"Cities visited", totalFare:"Total fare",
    flightTimeDetail:"Flights sorted from longest to shortest.", distanceDetail:"Distance comparisons and flights sorted from longest to shortest.",
    aircraftDetail:"Aircraft are grouped by family; exact variants remain in each flight record.",
    countriesDetail:"Endpoint visits grouped by country or region.", routesDetail:"Outbound and return directions are counted separately.",
    citiesDetail:"Endpoint visits grouped by city.", fareDetail:"Known fares sorted from highest to lowest; bundled tickets are grouped.",
    hours:"h", minutes:"min", flightUnit:"flights", typeUnit:"types", countryUnit:"countries / regions",
    routeUnit:"directed routes", cityUnit:"cities", knownFares:"known fares", longestFirst:"Longest first", highestFirst:"Highest first",
    earthCircumference:"Earth circumferences", moonDistance:"Earth–Moon distances", sunDistance:"Earth–Sun distances",
    exactVariants:"Exact variants", visits:"visits", bundle:"Ticket bundle", perFlight:"per flight",
    flightEntry:"FLIGHT ENTRY", addFlightRecord:"Add flight record", editFlightRecord:"Edit flight record",
    entryHelp:"Enter the core fields first; other details can be added later.", autoLookup:"Automatic flight lookup",
    autoLookupHelp:"Use the date and flight number to complete times, terminals, and aircraft.", flightDate:"Flight date",
    flightNumber:"Flight number", flightNumberPlaceholder:"e.g. MU721", departureAirport:"Departure airport",
    departurePlaceholder:"PVG / Shanghai Pudong", arrivalAirport:"Arrival airport", arrivalPlaceholder:"HKG / Hong Kong International",
    departureTerminal:"Departure terminal", arrivalTerminal:"Arrival terminal", terminalPlaceholder:"e.g. T3",
    airline:"Airline", aircraftPlaceholder:"e.g. Airbus A320neo", registrationPlaceholder:"e.g. 9V-SHM",
    duration:"Duration", durationPlaceholder:"e.g. 3h 17m", distance:"Distance", departureTime:"Departure time", arrivalTime:"Arrival time",
    gatePlaceholder:"e.g. A12", seatPlaceholder:"e.g. 34A", farePlaceholder:"CNY", notesPlaceholder:"Add notes about this flight",
    uploadPhotos:"Upload photos or boarding passes", photoLimit:"JPG / PNG, up to 10 MB each", cancel:"Cancel", saveRecord:"Save record",
    economy:"Economy", premiumEconomy:"Premium Economy", business:"Business", first:"First",
    bulkImport:"BULK IMPORT", excelImport:"Excel bulk import", importHelp:"Import existing records with the standard fields.",
    downloadTemplate:"Download template", fillRecords:"Fill records", uploadValidate:"Upload and validate",
    selectExcel:"Select or drop an Excel file", excelLimit:".xlsx / .xls / .csv, up to 20 MB",
    actionComplete:"Completed", recordUpdated:"Record updated", recordSaved:"Record saved", fileRead:"File read",
    validatingFields:"Validating import fields", detail:"View details", hub:"Hub"
  },
  zh: {
    navMap:"航迹地图", navRecords:"飞行记录", navStats:"数据统计", navMedia:"旅途相册",
    mapSelection:"地图内容", routes:"航线", airports:"机场", mapHelp:"拖拽旋转，滚轮缩放；点击航线或机场查看详情。",
    language:"语言", settings:"设置", authorGithub:"作者 GitHub",
    hubs:"枢纽机场", add:"添加", removeHub:"移除枢纽", loadingGeography:"正在载入地理数据",
    import:"批量导入", addFlight:"添加飞行", recordsTitle:"飞行记录", totalFlights:"次飞行",
    searchPlaceholder:"搜索航班号、航司或机场", all:"全部", year:"年份", allYears:"全部年份",
    international:"国际 / 港澳台", domestic:"国内",
    flight:"航班", date:"日期", airportTime:"机场与时间", flightInfo:"飞行信息", fare:"票价",
    statsTitle:"飞行数据统计", mediaTitle:"旅途相册", mediaDesc:"与飞行记录关联的照片和登机资料。",
    memorySunset:"舷窗日落", memoryCruise:"巡航阶段", memoryNightApproach:"夜间进近",
    memoryShanghaiHongKong:"上海 → 香港", memoryHongKongShanghai:"香港 → 上海", memoryShanghaiSingapore:"上海 → 新加坡",
    route:"航线", airport:"机场", flightsRecorded:"飞行次数", oneWayDistance:"单程距离",
    relatedFlights:"相关飞行", recordedSegments:"飞行次数", coordinates:"地理坐标", connections:"连接航线",
    recentRecords:"最近飞行", times:"次", noConnections:"当前记录中没有连接航线。",
    noRecords:"没有符合当前条件的飞行记录。", aircraft:"机型",
    aircraftIllustrationSingapore:"新加坡航空 Airbus A350-900 侧面示意图",
    aircraftIllustrationSingaporeA380:"新加坡航空 Airbus A380-800 侧面示意图",
    aircraftIllustrationChinaSouthern:"中国南方航空 Airbus A350-900 侧面示意图",
    aircraftIllustrationChinaSouthern777:"中国南方航空 Boeing 777-300ER 侧面示意图",
    aircraftIllustrationAirChina:"中国国际航空 Airbus A350-900 侧面示意图",
    aircraftIllustrationEmiratesA380:"阿联酋航空 Airbus A380-800 侧面示意图",
    aircraftIllustrationEmirates777:"阿联酋航空 Boeing 777-300ER 侧面示意图", registration:"注册号",
    cabin:"舱位", seat:"座位", gate:"登机口", notes:"备注", noNotes:"无备注", close:"关闭", editRecord:"编辑记录",
    totalTime:"总飞行时间", totalDistance:"总飞行里程", aircraftTypes:"坐过的机型",
    countriesRegions:"去过的国家 / 地区", directedRoutes:"飞过的航线", citiesVisited:"去过的城市", totalFare:"总票价",
    flightTimeDetail:"航班按飞行时长由长到短排列。", distanceDetail:"显示距离换算，航班按里程由长到短排列。",
    aircraftDetail:"按机型大类归并；每次飞行仍保留具体子型号。",
    countriesDetail:"按航段端点统计国家或地区访问次数。", routesDetail:"去程与回程分别统计。",
    citiesDetail:"按航段端点统计城市访问次数。", fareDetail:"已知票价由高到低排列；联票成组显示。",
    hours:"小时", minutes:"分", flightUnit:"次飞行", typeUnit:"种机型", countryUnit:"个国家 / 地区",
    routeUnit:"条有向航线", cityUnit:"座城市", knownFares:"条已知票价", longestFirst:"由长到短", highestFirst:"由高到低",
    earthCircumference:"圈地球周长", moonDistance:"倍地月距离", sunDistance:"倍地日距离",
    exactVariants:"具体子型号", visits:"次", bundle:"联票", perFlight:"每航段",
    flightEntry:"飞行记录", addFlightRecord:"添加飞行记录", editFlightRecord:"编辑飞行记录",
    entryHelp:"先填写核心字段，其他资料可以稍后补充。", autoLookup:"自动查询航班资料",
    autoLookupHelp:"根据日期和航班号补全计划时间、航站楼和机型。", flightDate:"航班日期",
    flightNumber:"航班号", flightNumberPlaceholder:"例如 MU721", departureAirport:"出发机场",
    departurePlaceholder:"PVG / 上海浦东", arrivalAirport:"到达机场", arrivalPlaceholder:"HKG / 香港国际",
    departureTerminal:"出发航站楼", arrivalTerminal:"到达航站楼", terminalPlaceholder:"例如 T3",
    airline:"航空公司", aircraftPlaceholder:"例如 Airbus A320neo", registrationPlaceholder:"例如 9V-SHM",
    duration:"飞行时长", durationPlaceholder:"例如 3h 17m", distance:"里程", departureTime:"起飞时间", arrivalTime:"到达时间",
    gatePlaceholder:"例如 A12", seatPlaceholder:"例如 34A", farePlaceholder:"人民币", notesPlaceholder:"填写与本次飞行相关的信息",
    uploadPhotos:"上传照片或登机牌", photoLimit:"JPG / PNG，单张不超过 10 MB", cancel:"取消", saveRecord:"保存记录",
    economy:"经济舱", premiumEconomy:"超级经济舱", business:"商务舱", first:"头等舱",
    bulkImport:"批量导入", excelImport:"Excel 批量导入", importHelp:"使用标准字段导入既有飞行记录。",
    downloadTemplate:"下载模板", fillRecords:"填写记录", uploadValidate:"上传校验",
    selectExcel:"点击选择或拖入 Excel 文件", excelLimit:".xlsx / .xls / .csv，最大 20 MB",
    actionComplete:"操作已完成", recordUpdated:"记录已更新", recordSaved:"记录已保存", fileRead:"文件已读取",
    validatingFields:"正在校验导入字段", detail:"查看详情", hub:"枢纽"
  }
};

const savedHubs = (() => {
  try { return JSON.parse(localStorage.getItem("flightArchiveHubs") || '["CAN","HKG"]'); }
  catch { return ["CAN", "HKG"]; }
})();
const state = {
  activeView:"atlas", yearFilter:"all", scopeFilter:"all", mapMode:"route", globeStyle:"light", lang:"en",
  selectedRoute:null, selectedAirport:null, activeFlightId:null, editingFlightId:null,
  hubs:new Set(savedHubs.filter(code => airports[code]))
};
const visitedCountries = new Set([
  "China", "Japan", "Cambodia", "Singapore", "Australia", "Indonesia", "Malaysia",
  "Vietnam", "Brunei", "United Arab Emirates", "Spain", "Germany"
]);
let landFeatures = fallbackLand.map((ring, index) => ({ name: `fallback-${index}`, rings: [ring] }));
const t = key => translations[state.lang][key] || key;
const airportName = airport => state.lang === "zh" ? (airport.nameZh || airport.name) : (airport.nameEn || airport.name);
const airportCity = airport => state.lang === "zh" ? (airport.cityZh || airport.city) : (airport.cityEn || airport.city);
const airportCountry = airport => state.lang === "zh" ? (airport.countryZh || airport.country) : (airport.countryEn || airport.country);
const compactAirportName = airport => {
  const name=airportName(airport);
  if(state.lang==="zh")return name;
  return name.replace(/\bInternational\b/gi,"Intl").replace(/\bAirport\b/gi,"").replace(/\s+/g," ").trim();
};
const displayCabin = value => {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("first") || normalized.includes("头等")) return t("first");
  if (normalized.includes("business") || normalized.includes("商务")) return t("business");
  if (normalized.includes("premium") || normalized.includes("超级")) return t("premiumEconomy");
  return t("economy");
};

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
  document.getElementById("cabinSelect").innerHTML = ["economy","premiumEconomy","business","first"].map(key => `<option>${t(key)}</option>`).join("");
  const years=[...new Set(flights.map(f=>f.date.slice(0,4)))].sort((a,b)=>b.localeCompare(a));
  const yearFilter=document.getElementById("yearFilter");
  yearFilter.innerHTML=`<option value="all">${t("allYears")}</option>${years.map(year=>`<option value="${year}">${year}</option>`).join("")}`;
  yearFilter.value=state.yearFilter;
  document.getElementById("recordTotal").textContent = flights.length;
  renderFlights();
  renderStats();
  renderHubSettings();
  if (state.selectedRoute) openRouteDrawer(state.selectedRoute);
  if (state.selectedAirport) openAirportDrawer(state.selectedAirport);
}

function formatDate(date) {
  const locale=state.lang==="zh"?"zh-CN":"en-CA";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(`${date}T12:00:00`));
}
function formatFare(value) {
  return Number.isFinite(value) ? `¥${value.toLocaleString()}` : "—";
}
function parseDurationMinutes(value) {
  const text=String(value||"").trim();
  const hours=text.match(/(\d+)\s*h/i),minutes=text.match(/(\d+)\s*m(?:in)?/i);
  if(hours)return Number(hours[1])*60+(minutes?Number(minutes[1]):0);
  if(minutes)return Number(minutes[1]);
  return 0;
}
function airportCodeFromInput(value,currentCode) {
  const match=String(value||"").toUpperCase().match(/\b[A-Z]{3}\b/);
  return match&&airports[match[0]]?match[0]:currentCode;
}
function timeInputValue(value) {
  const match=String(value||"").match(/^(\d{1,2}):(\d{2})$/);
  return match?`${match[1].padStart(2,"0")}:${match[2]}`:"";
}
function rebuildRoutes() {
  const routeMap=new Map();
  flights.forEach(f=>{
    const codes=[f.from,f.to].sort(),id=codes.join("-").toLowerCase();
    f.routeId=id;
    if(!routeMap.has(id))routeMap.set(id,{id,from:f.from,to:f.to,count:0,distanceTotal:0});
    const route=routeMap.get(id);
    route.count+=1;route.distanceTotal+=Number(f.distance)||0;
  });
  const rebuilt=[...routeMap.values()].map(route=>({
    id:route.id,from:route.from,to:route.to,count:route.count,
    distance:Math.round(route.distanceTotal/route.count)
  })).sort((a,b)=>b.count-a.count||a.id.localeCompare(b.id));
  routes.splice(0,routes.length,...rebuilt);
}
function setFormValue(id,value) {
  document.getElementById(id).value=value??"";
}
function prepareAddForm() {
  state.editingFlightId=null;
  const form=document.getElementById("flightForm");
  form.reset();
  document.getElementById("addTitle").dataset.i18n="addFlightRecord";
  document.getElementById("addTitle").textContent=t("addFlightRecord");
  setFormValue("formDate",new Date().toISOString().slice(0,10));
  document.getElementById("cabinSelect").value=t("economy");
  openModal("addModal");
}
function prepareEditForm(id) {
  const f=flights.find(item=>item.id===id);
  if(!f)return;
  state.editingFlightId=id;
  document.getElementById("addTitle").dataset.i18n="editFlightRecord";
  document.getElementById("addTitle").textContent=t("editFlightRecord");
  setFormValue("formDate",f.date);
  setFormValue("formFlightNo",f.flightNo);
  setFormValue("formFrom",`${f.from} / ${airportName(airports[f.from])}`);
  setFormValue("formTo",`${f.to} / ${airportName(airports[f.to])}`);
  setFormValue("formTerminalFrom",f.terminalFrom==="—"?"":f.terminalFrom);
  setFormValue("formTerminalTo",f.terminalTo==="—"?"":f.terminalTo);
  setFormValue("formAirline",f.airline);
  setFormValue("formAircraft",f.aircraft);
  setFormValue("formRegistration",f.registration==="—"?"":f.registration);
  setFormValue("formDuration",f.duration);
  setFormValue("formDepart",timeInputValue(f.depart));
  setFormValue("formArrive",timeInputValue(f.arrive));
  setFormValue("formDistance",f.distance);
  setFormValue("formGate",f.gate==="—"?"":f.gate);
  setFormValue("formSeat",f.seat==="—"||f.seat==="——"?"":f.seat);
  setFormValue("formFare",Number.isFinite(f.fare)?f.fare:"");
  setFormValue("formNote",f.note);
  document.getElementById("cabinSelect").value=displayCabin(f.cabin);
  openModal("addModal");
}
function saveEditedFlight() {
  const f=flights.find(item=>item.id===state.editingFlightId);
  if(!f)return false;
  const previousFare=f.fare;
  f.date=document.getElementById("formDate").value||f.date;
  f.flightNo=document.getElementById("formFlightNo").value.trim().toUpperCase()||f.flightNo;
  f.from=airportCodeFromInput(document.getElementById("formFrom").value,f.from);
  f.to=airportCodeFromInput(document.getElementById("formTo").value,f.to);
  f.terminalFrom=document.getElementById("formTerminalFrom").value.trim()||"—";
  f.terminalTo=document.getElementById("formTerminalTo").value.trim()||"—";
  f.airline=document.getElementById("formAirline").value.trim()||f.airline;
  f.airlineShort=(f.flightNo.match(/^([A-Z0-9]{2})/)||[])[1]||f.airlineShort;
  f.aircraft=document.getElementById("formAircraft").value.trim()||f.aircraft;
  f.registration=document.getElementById("formRegistration").value.trim()||"—";
  f.duration=document.getElementById("formDuration").value.trim()||f.duration;
  f.durationMinutes=parseDurationMinutes(f.duration);
  f.depart=document.getElementById("formDepart").value||f.depart;
  f.arrive=document.getElementById("formArrive").value||f.arrive;
  f.distance=Math.max(0,Number(document.getElementById("formDistance").value)||0);
  f.gate=document.getElementById("formGate").value.trim()||"—";
  f.seat=document.getElementById("formSeat").value.trim()||"—";
  f.cabin=document.getElementById("cabinSelect").value||f.cabin;
  const fareValue=document.getElementById("formFare").value;
  f.fare=fareValue===""?null:Math.max(0,Number(fareValue));
  if(f.fare!==previousFare){f.fareRaw=fareValue||null;f.fareGroup=null;}
  f.note=document.getElementById("formNote").value.trim();
  f.scope=airports[f.from].countryCode===airports[f.to].countryCode?"domestic":"international";
  rebuildRoutes();
  const editableKeys=["date","flightNo","from","to","terminalFrom","terminalTo","airline","airlineShort","aircraft","registration","duration","durationMinutes","depart","arrive","distance","gate","seat","cabin","fare","fareRaw","fareGroup","note","scope","routeId"];
  const edit=Object.fromEntries(editableKeys.map(key=>[key,f[key]]));
  savedFlightEdits[f.id]=edit;
  try{localStorage.setItem("flightArchiveEdits",JSON.stringify(savedFlightEdits));}catch{}
  state.editingFlightId=null;
  return true;
}
function iconMarkup(f, className = "airline-icon") {
  const icon = airlineIcons[f.airlineShort];
  return icon
    ? `<span class="${className}"><img src="${icon}" alt="${f.airline} logo" loading="lazy" /></span>`
    : `<span class="${className} airline-fallback">${f.airlineShort}</span>`;
}

function normalizeRegistration(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function flightRowMarkup(f) {
  const from = airports[f.from], to = airports[f.to];
  return `
    <article class="flight-row" data-flight-id="${f.id}">
      <div class="airline-cell">
        ${iconMarkup(f)}
        <div><strong class="flight-number">${f.flightNo}</strong><small>${f.airline}</small></div>
      </div>
      <div class="date-cell"><strong>${formatDate(f.date)}</strong></div>
      <div class="route-cell">
        <div class="route-point"><strong>${f.from}</strong><span>${airportCity(from)}</span><small>${f.depart}</small></div>
        <div class="route-line"><span>${f.duration}</span><i></i><small>${f.distance.toLocaleString()} km</small></div>
        <div class="route-point"><strong>${f.to}</strong><span>${airportCity(to)}</span><small>${f.arrive}</small></div>
      </div>
      <div class="flight-meta">
        <span>${t("aircraft")}<b>${f.aircraft}</b></span><span>${t("cabin")}<b>${displayCabin(f.cabin)}</b></span>
        <span>${t("registration")}<b>${f.registration || "—"}</b></span><span>${t("seat")}<b>${f.seat}</b></span>
      </div>
      <div class="fare-cell"><strong>${formatFare(f.fare)}</strong></div>
      <span class="row-arrow"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></span>
    </article>`;
}

function renderFlights() {
  const query = (document.getElementById("recordSearch")?.value || "").trim().toLowerCase();
  const list = flights.filter(f => {
    const yearOk=state.yearFilter==="all"||f.date.startsWith(state.yearFilter);
    const scopeOk=state.scopeFilter==="all"||f.scope===state.scopeFilter;
    const text = `${f.flightNo} ${f.airline} ${f.from} ${f.to} ${airportName(airports[f.from])} ${airportName(airports[f.to])}`.toLowerCase();
    return yearOk&&scopeOk&&text.includes(query);
  });
  document.getElementById("flightList").innerHTML = list.length ? list.map(flightRowMarkup).join("") : `<div class="empty-state">${t("noRecords")}</div>`;
  document.querySelectorAll("[data-flight-id]").forEach(el => el.addEventListener("click", () => openFlight(Number(el.dataset.flightId))));
}

function openFlight(id) {
  const f = flights.find(item => item.id === id);
  if (!f) return;
  state.activeFlightId=id;
  const from = airports[f.from], to = airports[f.to];
  const set = (id, value) => document.getElementById(id).textContent = value;
  document.getElementById("detailLogo").innerHTML = airlineIcons[f.airlineShort] ? `<img src="${airlineIcons[f.airlineShort]}" alt="${f.airline} logo" />` : f.airlineShort;
  set("detailAirline", f.airline); set("detailTitle", f.flightNo); set("detailDate", formatDate(f.date));
  set("detailFromCode", f.from); set("detailFromCity", `${compactAirportName(from)} · ${f.terminalFrom}`); set("detailDeparture", f.depart);
  set("detailToCode", f.to); set("detailToCity", `${compactAirportName(to)} · ${f.terminalTo}`); set("detailArrival", f.arrive);
  set("detailDuration", f.duration); set("detailDistance", `${f.distance.toLocaleString()} km`); set("detailNote", f.note || t("noNotes"));
  const aircraftVisualData=aircraftVisuals[normalizeRegistration(f.registration)];
  const aircraftVisual=document.getElementById("detailAircraftVisual");
  aircraftVisual.hidden=!aircraftVisualData;
  if(aircraftVisualData){
    const aircraftImage=document.getElementById("detailAircraftImage");
    aircraftImage.src=aircraftVisualData.src;
    aircraftImage.alt=t(aircraftVisualData.altKey);
  }
  document.getElementById("detailInfoGrid").innerHTML = [
    [t("aircraft"), f.aircraft], [t("registration"), f.registration || "—"], [t("seat"), f.seat],
    [t("cabin"), displayCabin(f.cabin)], [t("fare"), formatFare(f.fare)], [t("gate"), f.gate || "—"]
  ].map(([key,value]) => `<div><span>${key}</span><strong>${value}</strong></div>`).join("");
  openModal("detailModal");
}

function drawerFlightMarkup(f,highlighted=false) {
  return `<article class="drawer-flight${highlighted?" highlighted":""}" data-drawer-flight="${f.id}">
    <div class="drawer-flight-top">
      <div class="drawer-flight-identity">${iconMarkup(f,"drawer-airline-icon")}<strong>${f.flightNo} · ${f.airline}</strong></div>
      <span>${formatDate(f.date)}</span>
    </div>
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
    <h2 class="drawer-title">${airportCity(from)} — ${airportCity(to)}</h2>
    <p class="drawer-subtitle">${route.from} / ${airportName(from)}<br>${route.to} / ${airportName(to)}</p>
    <div class="drawer-metrics">
      <div><strong>${route.count}</strong><span>${t("flightsRecorded")}</span></div>
      <div><strong>${route.distance.toLocaleString()} km</strong><span>${t("oneWayDistance")}</span></div>
    </div>
    <h3 class="drawer-section-title">${t("relatedFlights")}</h3>
    ${related.map(f=>drawerFlightMarkup(f)).join("")}
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
    <p class="drawer-subtitle">${airportName(airport)}<br>${airportCity(airport)}, ${airportCountry(airport)}${state.hubs.has(code) ? ` · ${t("hub")}` : ""}</p>
    <div class="drawer-metrics">
      <div><strong>${relatedFlights.length}</strong><span>${t("recordedSegments")}</span></div>
      <div><strong>${airport.lat.toFixed(2)}°, ${airport.lon.toFixed(2)}°</strong><span>${t("coordinates")}</span></div>
    </div>
    <h3 class="drawer-section-title">${t("connections")}</h3>
    <div class="connection-list">
      ${connections.length ? connections.map(r => {
        const other = r.from === code ? airports[r.to] : airports[r.from];
        return `<button data-connection="${r.id}"><span>${airportCity(airport)} — ${airportCity(other)}</span><b>${r.count} ${t("times")}</b></button>`;
      }).join("") : `<p class="drawer-subtitle">${t("noConnections")}</p>`}
    </div>
    <h3 class="drawer-section-title">${t("recentRecords")}</h3>
    ${relatedFlights.map(f=>drawerFlightMarkup(f,true)).join("")}
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

function setSettingsOpen(open) {
  document.getElementById("settingsPanel").classList.toggle("open",open);
  document.getElementById("settingsPanel").setAttribute("aria-hidden",String(!open));
  document.getElementById("settingsButton").classList.toggle("active",open);
  document.getElementById("settingsButton").setAttribute("aria-expanded",String(open));
}

function setView(view) {
  state.activeView = view;
  setSettingsOpen(false);
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

function classifyAircraft(value) {
  const text=String(value||"Unknown").replace(/\s+/g," ").trim();
  if(/737\s*MAX\s*8/i.test(text)||/737-8(?:\d|[A-Z])/i.test(text))return "Boeing 737-8";
  if(/737-7\d[A-Z0-9]/i.test(text))return "Boeing 737-7";
  if(/737-9\d[A-Z0-9]/i.test(text))return "Boeing 737-9";
  if(/777-3/i.test(text))return "Boeing 777-300ER";
  if(/787-8/i.test(text))return "Boeing 787-8";
  if(/787-9/i.test(text))return "Boeing 787-9";
  if(/A320-?2(?:5|7)1N|320-271\(N\)|A320neo/i.test(text))return "Airbus A320neo";
  if(/A320|Airbus 320/i.test(text))return "Airbus A320";
  if(/A321-?251N|A321neo/i.test(text))return "Airbus A321neo";
  if(/A321/i.test(text))return "Airbus A321";
  if(/A319/i.test(text))return "Airbus A319";
  if(/A330/i.test(text))return "Airbus A330";
  if(/A350/i.test(text))return "Airbus A350-900";
  if(/A380/i.test(text))return "Airbus A380";
  return text.replace(/\s+Dreamliner/i,"");
}
function aggregateBy(items,keyFn) {
  const map=new Map();
  items.forEach(item=>{const key=keyFn(item);if(!map.has(key))map.set(key,[]);map.get(key).push(item);});
  return map;
}
function durationText(minutes) {
  return `${Math.floor(minutes/60).toLocaleString()} ${t("hours")} ${minutes%60} ${t("minutes")}`;
}
function flightDetailRow(f,value) {
  return `<button class="stats-flight-row" data-flight-id="${f.id}">
    <span><strong>${f.flightNo}</strong><small>${formatDate(f.date)} · ${f.from} → ${f.to}</small></span>
    <b>${value}</b><i>›</i>
  </button>`;
}
function statIcon(type) {
  return ({time:"◷",distance:"↗",aircraft:"✈",countries:"◎",routes:"⇄",cities:"⌖",fare:"¥"})[type];
}
function statsSnapshot() {
  const totalDistance=flights.reduce((sum,f)=>sum+(Number(f.distance)||0),0);
  const totalMinutes=flights.reduce((sum,f)=>sum+(Number(f.durationMinutes)||0),0);
  const knownFares=flights.filter(f=>Number.isFinite(f.fare));
  const totalFare=knownFares.reduce((sum,f)=>sum+f.fare,0);
  const aircraft=aggregateBy(flights,f=>classifyAircraft(f.aircraft));
  const countries=new Map(),cities=new Map(),directedRoutes=aggregateBy(flights,f=>`${f.from}>${f.to}`);
  flights.forEach(f=>[f.from,f.to].forEach(code=>{
    const airport=airports[code],country=airportCountry(airport),city=airportCity(airport);
    countries.set(country,(countries.get(country)||0)+1);
    cities.set(city,(cities.get(city)||0)+1);
  }));
  return {totalDistance,totalMinutes,knownFares,totalFare,aircraft,countries,cities,directedRoutes};
}
function renderStats() {
  const s=statsSnapshot();
  const entries=[
    ["time",t("totalTime"),durationText(s.totalMinutes),`${flights.length} ${t("flightUnit")}`],
    ["distance",t("totalDistance"),`${s.totalDistance.toLocaleString()} km`,`${(s.totalDistance/40075).toFixed(2)} ${t("earthCircumference")}`],
    ["aircraft",t("aircraftTypes"),s.aircraft.size.toLocaleString(),t("typeUnit")],
    ["countries",t("countriesRegions"),s.countries.size.toLocaleString(),t("countryUnit")],
    ["routes",t("directedRoutes"),s.directedRoutes.size.toLocaleString(),t("routeUnit")],
    ["cities",t("citiesVisited"),s.cities.size.toLocaleString(),t("cityUnit")],
    ["fare",t("totalFare"),formatFare(s.totalFare),`${s.knownFares.length} ${t("knownFares")}`]
  ];
  document.getElementById("statsList").innerHTML=entries.map(([type,label,value,unit])=>`
    <button class="stat-block" data-stat="${type}">
      <span class="stat-icon">${statIcon(type)}</span>
      <span class="stat-label">${label}<small>${t("detail")}</small></span>
      <strong>${value}</strong><b>${unit}</b><i>›</i>
    </button>`).join("");
  document.querySelectorAll("[data-stat]").forEach(el=>el.addEventListener("click",()=>openStatsDetail(el.dataset.stat)));
}
function rankedMapMarkup(map,formatter) {
  return [...map.entries()].sort((a,b)=>b[1].length-a[1].length||a[0].localeCompare(b[0])).map(([key,items],index)=>`
    <div class="stats-rank-row"><span>${String(index+1).padStart(2,"0")}</span><strong>${key.replace(">"," → ")}</strong><b>${formatter(items)}</b></div>`).join("");
}
function openStatsDetail(type) {
  const s=statsSnapshot();
  const title={time:t("totalTime"),distance:t("totalDistance"),aircraft:t("aircraftTypes"),countries:t("countriesRegions"),routes:t("directedRoutes"),cities:t("citiesVisited"),fare:t("totalFare")}[type];
  const description={time:t("flightTimeDetail"),distance:t("distanceDetail"),aircraft:t("aircraftDetail"),countries:t("countriesDetail"),routes:t("routesDetail"),cities:t("citiesDetail"),fare:t("fareDetail")}[type];
  let summary="",content="";
  if(type==="time"){
    summary=durationText(s.totalMinutes);
    content=`<div class="detail-sort-label">${t("longestFirst")}</div>${[...flights].sort((a,b)=>b.durationMinutes-a.durationMinutes).map(f=>flightDetailRow(f,durationText(f.durationMinutes))).join("")}`;
  }else if(type==="distance"){
    summary=`${s.totalDistance.toLocaleString()} km`;
    content=`<div class="distance-equivalents">
      <div><strong>${(s.totalDistance/40075).toFixed(2)}</strong><span>${t("earthCircumference")}</span></div>
      <div><strong>${(s.totalDistance/384400).toFixed(3)}</strong><span>${t("moonDistance")}</span></div>
      <div><strong>${(s.totalDistance/149597870.7).toFixed(6)}</strong><span>${t("sunDistance")}</span></div>
    </div><div class="detail-sort-label">${t("longestFirst")}</div>${[...flights].sort((a,b)=>b.distance-a.distance).map(f=>flightDetailRow(f,`${f.distance.toLocaleString()} km`)).join("")}`;
  }else if(type==="aircraft"){
    summary=`${s.aircraft.size} ${t("typeUnit")}`;
    content=[...s.aircraft.entries()].sort((a,b)=>b[1].length-a[1].length).map(([family,items])=>{
      const exact=aggregateBy(items,f=>f.aircraft||"—");
      return `<section class="aircraft-family"><div><strong>${family}</strong><b>${items.length} ${t("times")}</b></div>
        <p>${t("exactVariants")}: ${[...exact.entries()].map(([name,list])=>`${name} × ${list.length}`).join(" · ")}</p></section>`;
    }).join("");
  }else if(type==="countries"){
    summary=`${s.countries.size} ${t("countryUnit")}`;
    content=[...s.countries.entries()].sort((a,b)=>b[1]-a[1]).map(([name,count],i)=>`<div class="stats-rank-row"><span>${String(i+1).padStart(2,"0")}</span><strong>${name}</strong><b>${count} ${t("visits")}</b></div>`).join("");
  }else if(type==="routes"){
    summary=`${s.directedRoutes.size} ${t("routeUnit")}`;
    content=rankedMapMarkup(s.directedRoutes,items=>`${items.length} ${t("times")}`);
  }else if(type==="cities"){
    summary=`${s.cities.size} ${t("cityUnit")}`;
    content=[...s.cities.entries()].sort((a,b)=>b[1]-a[1]).map(([name,count],i)=>`<div class="stats-rank-row"><span>${String(i+1).padStart(2,"0")}</span><strong>${name}</strong><b>${count} ${t("visits")}</b></div>`).join("");
  }else if(type==="fare"){
    summary=formatFare(s.totalFare);
    const fareGroups=new Map();
    s.knownFares.forEach(f=>{const key=f.fareGroup?`bundle:${f.fareGroup}`:`flight:${f.id}`;if(!fareGroups.has(key))fareGroups.set(key,[]);fareGroups.get(key).push(f);});
    content=`<div class="detail-sort-label">${t("highestFirst")}</div>${[...fareGroups.entries()]
      .sort((a,b)=>b[1].reduce((n,f)=>n+f.fare,0)-a[1].reduce((n,f)=>n+f.fare,0))
      .map(([key,items])=>{
        const total=items.reduce((n,f)=>n+f.fare,0),bundled=key.startsWith("bundle:");
        return `<section class="fare-group${bundled?" bundled":""}">
          <header><span>${bundled?t("bundle"):items[0].flightNo}</span><strong>${formatFare(total)}</strong></header>
          ${items.map(f=>flightDetailRow(f,bundled?`${formatFare(f.fare)} ${t("perFlight")}`:formatFare(f.fare))).join("")}
        </section>`;
      }).join("")}`;
  }
  document.getElementById("statsDetailKicker").textContent=description;
  document.getElementById("statsDetailTitle").textContent=title;
  document.getElementById("statsDetailSummary").textContent=summary;
  document.getElementById("statsDetailContent").innerHTML=content;
  document.querySelectorAll("#statsDetailContent [data-flight-id]").forEach(el=>el.addEventListener("click",()=>{closeModals();openFlight(Number(el.dataset.flightId));}));
  openModal("statsDetailModal");
}
function persistHubs(){localStorage.setItem("flightArchiveHubs",JSON.stringify([...state.hubs]));}
function renderHubSettings(){
  const available=Object.values(airports).sort((a,b)=>a.code.localeCompare(b.code));
  const select=document.getElementById("hubAirportSelect");
  select.innerHTML=available.filter(a=>!state.hubs.has(a.code)).map(a=>`<option value="${a.code}">${a.code} · ${airportName(a)}</option>`).join("");
  document.getElementById("hubChips").innerHTML=[...state.hubs].map(code=>`<button data-remove-hub="${code}" title="${t("removeHub")}">${code}<span>×</span></button>`).join("");
  document.querySelectorAll("[data-remove-hub]").forEach(el=>el.addEventListener("click",()=>{state.hubs.delete(el.dataset.removeHub);persistHubs();renderHubSettings();drawGlobe();}));
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
  const satelliteLand=ctx.createLinearGradient(centerX,centerY-globeR,centerX,centerY+globeR);
  satelliteLand.addColorStop(0,"#687066");
  satelliteLand.addColorStop(.25,"#65704b");
  satelliteLand.addColorStop(.5,"#345b3f");
  satelliteLand.addColorStop(.74,"#6e704a");
  satelliteLand.addColorStop(1,"#677069");
  landFeatures.forEach(feature=>{
    const visited=visitedCountries.has(feature.name);
    const baseColor=orbit?satelliteLand:"#d2d5d3";
    ctx.strokeStyle=orbit?"rgba(199,216,202,.34)":"#aeb3b4";
    ctx.lineWidth=visited ? .85 : .5;
    feature.rings.forEach(ring=>{
      const points=ring.map(([lon,lat])=>project(lat,lon));
      visibleSegments(points,.005).forEach(segment=>{
        if(segment.length<3)return;
        ctx.beginPath();
        segment.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
        ctx.closePath();ctx.fillStyle=baseColor;ctx.fill();
        if(visited){ctx.fillStyle="rgba(242,148,32,.62)";ctx.fill();}
        ctx.stroke();
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
function drawBackground() {
  const orbit=state.globeStyle==="orbit";
  ctx.fillStyle=orbit?"#02070b":"#081d35";ctx.fillRect(0,0,cw,ch);
  if(orbit){
    // Projection reverses the apparent screen direction, so the background offsets
    // use the inverse rotation to move with the visible globe surface.
    const shiftX=-rotation.lon/360*cw,shiftY=-rotation.lat/180*ch*.18;
    stars.forEach((star,index)=>{
      const x=((star.u*cw+shiftX)%cw+cw)%cw;
      const y=((star.v*ch+shiftY)%ch+ch)%ch;
      ctx.globalAlpha=star.alpha;ctx.fillStyle=index%11===0?"#b8d8ed":"#ffffff";
      ctx.beginPath();ctx.arc(x,y,star.r,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
  }
}
function solarPosition(date=new Date()) {
  const days=date.getTime()/86400000-10957.5;
  const g=rad((357.529+0.98560028*days)%360);
  const q=rad((280.459+0.98564736*days)%360);
  const longitude=q+rad(1.915)*Math.sin(g)+rad(.020)*Math.sin(2*g);
  const obliquity=rad(23.439-.00000036*days);
  const rightAscension=Math.atan2(Math.cos(obliquity)*Math.sin(longitude),Math.cos(longitude));
  const declination=Math.asin(Math.sin(obliquity)*Math.sin(longitude));
  const sidereal=rad((280.46061837+360.98564736629*days)%360);
  let lon=(rightAscension-sidereal)*180/Math.PI;
  lon=((lon+540)%360)-180;
  return {lat:declination*180/Math.PI,lon};
}
function drawNightLights() {
  if(state.globeStyle!=="orbit")return;
  const sun=solarPosition(),sunVector=geoVec(sun.lat,sun.lon);
  cityLights.forEach(city=>{
    const p=project(city.lat,city.lon);
    const cityVector=geoVec(city.lat,city.lon);
    const daylight=cityVector[0]*sunVector[0]+cityVector[1]*sunVector[1]+cityVector[2]*sunVector[2];
    if(p.z<=.02||daylight>-.04)return;
    ctx.globalAlpha=Math.min(1,.5-daylight*.55);ctx.shadowColor="#ffd36a";ctx.shadowBlur=8;
    ctx.fillStyle="#ffe4a0";ctx.beginPath();ctx.arc(p.x,p.y,city.size,0,Math.PI*2);ctx.fill();
  });
  ctx.globalAlpha=1;ctx.shadowBlur=0;
}
function drawSurfaceReflection() {
  if(state.globeStyle!=="orbit")return;
  const sun=solarPosition(),sunPoint=project(sun.lat,sun.lon);
  let dx=sunPoint.x-centerX,dy=sunPoint.y-centerY;
  const length=Math.hypot(dx,dy)||1;dx/=length;dy/=length;
  const highlightX=centerX+dx*globeR*.4,highlightY=centerY+dy*globeR*.4;
  const intensity=.08+.16*Math.max(0,sunPoint.z);
  const gloss=ctx.createRadialGradient(highlightX,highlightY,globeR*.02,highlightX,highlightY,globeR*.7);
  gloss.addColorStop(0,`rgba(226,248,255,${intensity})`);
  gloss.addColorStop(.26,`rgba(191,232,242,${intensity*.48})`);
  gloss.addColorStop(1,"rgba(145,206,221,0)");
  ctx.fillStyle=gloss;ctx.fillRect(centerX-globeR,centerY-globeR,globeR*2,globeR*2);
  const limb=ctx.createRadialGradient(centerX-globeR*.08,centerY-globeR*.08,globeR*.5,centerX,centerY,globeR);
  limb.addColorStop(0,"rgba(0,8,15,0)");
  limb.addColorStop(.72,"rgba(0,8,15,.04)");
  limb.addColorStop(1,"rgba(0,7,14,.34)");
  ctx.fillStyle=limb;ctx.fillRect(centerX-globeR,centerY-globeR,globeR*2,globeR*2);
}
function drawRoutes() {
  routeHitAreas=[];
  routes.forEach(route=>{
    const points=greatCircle(airports[route.from],airports[route.to]).map((p,i,array)=>project(p.lat,p.lon,Math.sin(Math.PI*i/(array.length-1))*.055));
    visibleSegments(points,-.01).forEach(segment=>{
      const selected=state.selectedRoute?.id===route.id;
      const connected=Boolean(state.selectedAirport&&(route.from===state.selectedAirport||route.to===state.selectedAirport));
      const highlighted=selected||connected;
      const orbit=state.globeStyle==="orbit";
      ctx.beginPath(); segment.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      ctx.strokeStyle=orbit?(highlighted?"#f4fdff":"#d4f4ff"):(highlighted?"#065fd4":"#1877f2");
      ctx.lineWidth=(highlighted?2.25:1)+route.count*.22;
      ctx.globalAlpha=orbit?(highlighted?1:.5+route.count*.055):(highlighted?1:.22+route.count*.1);
      ctx.shadowColor=orbit?"#78d9ff":"#1877f2";
      ctx.shadowBlur=orbit?(highlighted?18:8+route.count*.7):(highlighted?12:0);
      ctx.setLineDash([]);ctx.stroke();
      routeHitAreas.push({route,points:segment});
    });
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
    const selected=state.selectedAirport===code,hub=state.hubs.has(code);
    const radius=selected?5.5:state.mapMode==="airport"?3.8:2.7;
    ctx.beginPath();ctx.arc(p.x,p.y,radius+3,0,Math.PI*2);ctx.fillStyle=hub?"rgba(230,75,46,.19)":selected?"rgba(24,119,242,.22)":"rgba(24,119,242,.08)";ctx.fill();
    ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fillStyle=hub?"#e64b2e":selected?"#0b5fc9":"#1877f2";ctx.fill();
    if(selected||state.mapMode==="airport"){
      ctx.font="600 9px DM Sans";ctx.fillStyle=state.globeStyle==="orbit"?"#dcecf0":"#3e4b5f";ctx.fillText(code,p.x+8,p.y-6);
    }
    airportHitAreas.push({code,x:p.x,y:p.y});
  });
}
function drawGlobe(time=performance.now()) {
  if(!cw||!ch)return;
  ctx.clearRect(0,0,cw,ch);
  drawBackground();
  const orbit=state.globeStyle==="orbit";
  ctx.save();
  ctx.shadowColor=orbit?"rgba(71,119,137,.34)":"rgba(52,57,61,.18)";ctx.shadowBlur=orbit?38:35;ctx.shadowOffsetY=orbit?0:14;
  ctx.beginPath();ctx.arc(centerX,centerY,globeR,0,Math.PI*2);ctx.fillStyle=orbit?"#123a4b":"#f2f3f2";ctx.fill();
  ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(centerX,centerY,globeR,0,Math.PI*2);ctx.clip();
  if(orbit){
    const sun=solarPosition(),sunPoint=project(sun.lat,sun.lon);
    const ocean=ctx.createRadialGradient(
      centerX+(sunPoint.x-centerX)*.3,centerY+(sunPoint.y-centerY)*.3,globeR*.08,
      centerX,centerY,globeR*1.15
    );
    ocean.addColorStop(0,"#2b7285");ocean.addColorStop(.48,"#174f65");ocean.addColorStop(1,"#082b3d");
    ctx.fillStyle=ocean;
  }else{
    const ocean=ctx.createRadialGradient(centerX-globeR*.3,centerY-globeR*.35,globeR*.08,centerX,centerY,globeR);
    ocean.addColorStop(0,"#ffffff");ocean.addColorStop(1,"#e6e9e8");
    ctx.fillStyle=ocean;
  }
  ctx.fillRect(centerX-globeR,centerY-globeR,globeR*2,globeR*2);
  drawLand();drawSurfaceReflection();drawNightLights();
  if(state.mapMode==="route"||state.selectedAirport)drawRoutes();else routeHitAreas=[];
  drawAirports();
  ctx.restore();
  ctx.beginPath();ctx.arc(centerX,centerY,globeR,0,Math.PI*2);
  ctx.strokeStyle=orbit?"rgba(133,184,199,.74)":"#aeb3b4";ctx.lineWidth=orbit?1.25:1;ctx.shadowColor=orbit?"#5e9fb5":"transparent";ctx.shadowBlur=orbit?12:0;ctx.stroke();ctx.shadowBlur=0;
}
function resizeGlobe() {
  const rect=canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  cw=rect.width;ch=rect.height;globeR=Math.min(cw,ch)*.43;centerX=cw*.5;centerY=ch*.5;
  stars=Array.from({length:Math.max(90,Math.floor(cw*ch/8500))},()=>({
    u:Math.random(),v:Math.random(),r:.35+Math.random()*1.05,alpha:.3+Math.random()*.65
  }));
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
    const baseRadius=Math.min(cw,ch)*.43;
    const dragScale=Math.max(.22,Math.min(1,baseRadius/globeR));
    rotation.lon+=dx*.3*dragScale;
    rotation.lat=Math.max(-72,Math.min(72,rotation.lat+dy*.25*dragScale));
    lastPointer=pos;drawGlobe();return;
  }
  const airportHit=hitAirport(pos),routeHit=state.mapMode==="route"?hitRoute(pos):null,tooltip=document.getElementById("hoverTooltip");
  canvas.style.cursor=airportHit||routeHit?"pointer":"grab";
  if(airportHit){
    const airport=airports[airportHit.code];tooltip.style.display="block";tooltip.style.left=`${pos.x+12}px`;tooltip.style.top=`${pos.y+10}px`;tooltip.innerHTML=`<b>${airport.code}</b> · ${airportName(airport)}${state.hubs.has(airport.code)?` · ${t("hub")}`:""}`;
  }else if(routeHit){
    tooltip.style.display="block";tooltip.style.left=`${pos.x+12}px`;tooltip.style.top=`${pos.y+10}px`;tooltip.innerHTML=`${airportCity(airports[routeHit.from])} — ${airportCity(airports[routeHit.to])} · <b>${routeHit.count} ${t("times")}</b>`;
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
canvas.addEventListener("wheel",e=>{
  e.preventDefault();
  const viewportSize=Math.min(cw,ch);
  globeR=Math.max(viewportSize*.31,Math.min(viewportSize*1.35,globeR-e.deltaY*.22));
  drawGlobe();
},{passive:false});
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
document.getElementById("settingsButton").addEventListener("click",()=>{
  setSettingsOpen(!document.getElementById("settingsPanel").classList.contains("open"));
});
document.getElementById("settingsClose").addEventListener("click",()=>setSettingsOpen(false));
document.addEventListener("click",e=>{if(!e.target.closest(".settings-area"))setSettingsOpen(false);});
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
document.getElementById("addHubButton").addEventListener("click",()=>{
  const code=document.getElementById("hubAirportSelect").value;
  if(code){state.hubs.add(code);persistHubs();renderHubSettings();drawGlobe();}
});
document.getElementById("drawerClose").addEventListener("click",closeDrawer);
document.getElementById("recordSearch").addEventListener("input",renderFlights);
document.getElementById("yearFilter").addEventListener("change",e=>{state.yearFilter=e.target.value;renderFlights();});
document.querySelectorAll("[data-scope]").forEach(el=>el.addEventListener("click",()=>{
  document.querySelectorAll("[data-scope]").forEach(c=>c.classList.remove("active"));
  el.classList.add("active");state.scopeFilter=el.dataset.scope;renderFlights();
}));
document.querySelectorAll("[data-open-add]").forEach(el=>el.addEventListener("click",prepareAddForm));
document.getElementById("importButton").addEventListener("click",()=>openModal("importModal"));
document.getElementById("editFlightButton").addEventListener("click",()=>{closeModals();prepareEditForm(state.activeFlightId);});
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModals));
document.querySelectorAll(".modal-backdrop").forEach(el=>el.addEventListener("click",e=>{if(e.target===el)closeModals();}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModals();closeDrawer();setSettingsOpen(false);}});
document.getElementById("flightForm").addEventListener("submit",e=>{
  e.preventDefault();
  const edited=state.editingFlightId!==null&&saveEditedFlight();
  closeModals();
  if(edited){renderFlights();renderStats();closeDrawer();drawGlobe();}
  showToast(t("recordSaved"),t("recordUpdated"));
});
document.querySelector(".drop-zone input").addEventListener("change",e=>{if(e.target.files[0]){closeModals();showToast(t("fileRead"),t("validatingFields"));}});
window.addEventListener("resize",resizeGlobe);

rebuildRoutes();applyLanguage("en");resizeGlobe();loadGeography();requestAnimationFrame(animate);
