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
  CX: "./airline-logos/flightaware_logos/CPA.png",
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
  VY: "icons/Vueling-white.png",
  ZH: "icons/Shenzhen airlines.png",
  HU: "icons/Hainan-Airlines.png"
};
const manufacturerLogos = {
  Airbus: "./manufacturer%20logo/Airbus.svg",
  Boeing: "./manufacturer%20logo/Boeing.png"
};
const airportBrandLogos = {
  CAN: "./airport%20logos/guangzhou-baiyun-international-airport.avif",
  HKG: "./airport%20logos/HongKongAirportlogo.svg"
};

const aircraftVisuals = {
  "9VSHM": { src: "./airplanes/singapore%20359%209vshm.png", altKey: "aircraftIllustrationSingapore" },
  "9VSKV": { src: "./airplanes/singapore%20388%209vskv.png?v=20260730-white", altKey: "aircraftIllustrationSingaporeA380" },
  "V8DLA": { src: "./airplanes/brunei%20788%20v8dla.png", altKey: "aircraftIllustrationRoyalBrunei" },
  "BLAX": { src: "./airplanes/cathay%20pacific%20333%20blax.png", altKey: "aircraftIllustrationCathayA330" },
  "B309W": { src: "./airplanes/china%20southern%20359%20b309w.png", altKey: "aircraftIllustrationChinaSouthern" },
  "B1585": { src: "./airplanes/china%20soutehrn%2077w%20b1585.png", altKey: "aircraftIllustrationChinaSouthern737" },
  "B20C6": { src: "./airplanes/china%20southern%20789%20b20c6.png", altKey: "aircraftIllustrationChinaSouthern787" },
  "B20DM": { src: "./airplanes/china%20southern%2077w%20b20dm.png?v=20260730-white", altKey: "aircraftIllustrationChinaSouthern777" },
  "B32CE": { src: "./airplanes/air%20china%20359%20b32ce.png?v=20260730-white", altKey: "aircraftIllustrationAirChina" },
  "A6EDV": { src: "./airplanes/emirates%20388%20a6edv.png", altKey: "aircraftIllustrationEmiratesA380" },
  "A6EGR": { src: "./airplanes/emirates%2077w%20a6egr.png", altKey: "aircraftIllustrationEmirates777" }
};

const archiveData = window.FLIGHT_ARCHIVE_DATA || {};
const airports = archiveData.airports || fallbackAirports;
const flights = Array.isArray(archiveData.flights)?archiveData.flights:[];
const routes = Array.isArray(archiveData.routes)?archiveData.routes:[];
const plannedIncomingFlights = [];
const savedFavourites = {};

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
    navMap:"Flight Map", navRecords:"Flight Records", navStats:"Statistics", navIncoming:"Incoming Flights",
    mapSelection:"Map content", routes:"Routes", airports:"Airports", mapHelp:"Drag to rotate, scroll to zoom, and select a country, route, or airport for details.",
    flatMapHelp:"Drag to pan, scroll to zoom, and select a country, route, or airport for details.",
    mapStyle:"Map style", lightGlobe:"Light globe", spaceGlobe:"Space globe", flatMap:"Flat map",
    language:"Language", region:"Region", currency:"Currency", settings:"Settings", account:"Account", signOut:"Sign out", importExistingArchive:"Import existing archive", authorGithub:"Author GitHub", authorEmail:"Author email",
    hubs:"Hub airports", edit:"Edit", done:"Done", noHubs:"No hub selected", selectedAirports:"selected airports", loadingGeography:"Loading geographic data",
    searchAirports:"Search IATA, ICAO, airport, city, or country", airportSearchHint:"Search {count} locally stored airports. Enter at least two characters.", noAirportMatches:"No airports match this search.", selectedHubAirports:"Selected hub airports",
    backToMap:"Back to map", upcomingTravel:"Upcoming travel", noIncoming:"No upcoming flights", upcomingCount:"upcoming flights",
    addIncomingFlight:"Add incoming flight", incomingEntry:"UPCOMING FLIGHT", incomingEntryHelp:"Add a planned flight to the incoming list and map.",
    saveIncomingFlight:"Save incoming flight", incomingSaved:"Incoming flight saved", invalidAirportCode:"Use a valid three-letter IATA airport code.", futureFlightRequired:"The departure must be in the future.",
    daysRemaining:"days remaining", today:"Today", tomorrow:"Tomorrow",
    import:"Import", addFlight:"Add flight", recordsTitle:"Flight Records", totalFlights:"total flights",
    searchPlaceholder:"Search flight, airline, or airport", all:"All", year:"Year", allYears:"All years",
    international:"International / HK, MO & TW", domestic:"Domestic",
    flight:"Flight", date:"Date", airportTime:"Airports & time", flightInfo:"Flight information", fare:"Fare",
    statsTitle:"Flight Statistics",
    route:"Route", airport:"Airport", flightsRecorded:"Flights", oneWayDistance:"One-way distance", countryFlights:"Flights departing from or arriving in this country / region.", involvedAirports:"Airports",
    relatedFlights:"Related flights", recordedSegments:"Flights", coordinates:"Coordinates", connections:"Connected routes",
    recentRecords:"Recent flights", pastFlights:"Past flights", times:"flights", noConnections:"No connected route in the current records.",
    noRecords:"No flight records match the current filters.", aircraft:"Aircraft",
    aircraftIllustrationSingapore:"Singapore Airlines Airbus A350-900 side illustration",
    aircraftIllustrationSingaporeA380:"Singapore Airlines Airbus A380-800 side illustration",
    aircraftIllustrationChinaSouthern:"China Southern Airlines Airbus A350-900 side illustration",
    aircraftIllustrationChinaSouthern777:"China Southern Airlines Boeing 777-300ER side illustration",
    aircraftIllustrationAirChina:"Air China Airbus A350-900 side illustration",
    aircraftIllustrationEmiratesA380:"Emirates Airbus A380-800 side illustration",
    aircraftIllustrationEmirates777:"Emirates Boeing 777-300ER side illustration",
    aircraftIllustrationRoyalBrunei:"Royal Brunei Airlines Boeing 787-8 side illustration",
    aircraftIllustrationCathayA330:"Cathay Pacific Airbus A330-300 side illustration",
    aircraftIllustrationChinaSouthern737:"China Southern Airlines Boeing 737-800 side illustration",
    aircraftIllustrationChinaSouthern787:"China Southern Airlines Boeing 787-9 side illustration", registration:"Registration",
    cabin:"Cabin", seat:"Seat", gate:"Gate", notes:"Notes", noNotes:"No notes", close:"Close", editRecord:"Edit record",
    backToStatisticsDetail:"Back to",
    totalTime:"Flight time", totalDistance:"Flight distance", aircraftTypes:"Aircraft types", airlinesFlown:"Airlines flown",
    airportsVisited:"Airports visited", countriesRegions:"Countries / regions", directedRoutes:"Routes flown", citiesVisited:"Cities visited", totalFare:"Total fare",
    hours:"h", minutes:"min", flightUnit:"flights", typeUnit:"types", airportUnit:"airports", countryUnit:"countries / regions",
    airlineUnit:"airlines", routeUnit:"directed routes", cityUnit:"cities", knownFares:"known fares", longestFirst:"Longest first", highestFirst:"Highest first",
    earthCircumference:"Earth circumferences", moonDistance:"Earth–Moon distances", sunDistance:"Earth–Sun distances",
    days:"Days", weeks:"Weeks", months:"Months", years:"Years", longestFlight:"Longest flight", shortestFlight:"Shortest flight", farthestFlight:"Farthest flight",
    mostFlownAircraft:"Most flown aircraft", favouriteAircraft:"Favourite aircraft",
    mostFlownAirline:"Most flown airline", favouriteAirline:"Favourite airline",
    mostVisitedAirport:"Most visited airport", favouriteAirport:"Favourite airport",
    mostVisitedCountry:"Most visited country / region", favouriteDestination:"Favourite destination",
    mostVisitedCity:"Most visited city", favouriteCity:"Favourite city", favourite:"Favourite", notSet:"Not set",
    editFavourite:"Edit favourite", saveFavourite:"Save", favouriteUpdated:"Favourite updated",
    flightFootprint:"Flight footprint", visitedCountryMap:"Visited countries and flight paths",
    visitedLand:"Visited country / region", flightRoutes:"Flight paths",
    timeEquivalent:"Equivalent duration", distanceEquivalent:"Equivalent distance",
    visits:"visits", bundle:"Ticket bundle", perFlight:"per flight",
    flightEntry:"FLIGHT ENTRY", addFlightRecord:"Add flight record", editFlightRecord:"Edit flight record",
    autoLookup:"Automatic flight lookup",
    autoLookupHelp:"Use the date and flight number to complete times, terminals, and aircraft.", flightDate:"Flight date",
    findRealFlight:"Find a real flight", lookupRequirement:"Date is required. Enter a flight number, or both departure and arrival airports.",
    manualAdd:"Add manually", searchFlights:"Search flights", searchingFlights:"Searching flight schedules…", lookupNoResults:"No matching flights were found. You can add the flight manually.",
    lookupUnavailable:"Flight lookup is not configured yet. You can add the flight manually.", lookupInvalid:"Enter a date and either a flight number or both airport codes.",
    lookupCacheHit:"Loaded from the shared flight cache.", lookupManualFallback:"Switched to manual entry",
    lookupDailyLimit:"You have reached today's limit of 20 external flight searches.", lookupMonthlyLimit:"The shared monthly allowance is paused at 480 API Units.",
    lookupProviderLimit:"The external flight-data provider has reached its limit.", lookupFailedManual:"Automatic lookup is temporarily unavailable.",
    addThisFlight:"Add this flight", flightAdded:"Flight added", continueFlightDetails:"Continue adding seat, fare, and other details", scheduleTime:"Schedule", actualTime:"Actual",
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
    navMap:"航迹地图", navRecords:"飞行记录", navStats:"数据统计", navIncoming:"即将飞行",
    mapSelection:"地图内容", routes:"航线", airports:"机场", mapHelp:"拖拽旋转，滚轮缩放；点击国家 / 地区、航线或机场查看详情。",
    flatMapHelp:"拖拽平移，滚轮缩放；点击国家 / 地区、航线或机场查看详情。",
    mapStyle:"地图样式", lightGlobe:"浅色地球", spaceGlobe:"星空地球", flatMap:"平面地图",
    language:"语言", region:"地区", currency:"货币", settings:"设置", account:"账户", signOut:"退出登录", importExistingArchive:"导入现有档案", authorGithub:"作者 GitHub", authorEmail:"作者邮箱",
    hubs:"枢纽机场", edit:"编辑", done:"完成", noHubs:"未选择枢纽机场", selectedAirports:"个已选机场", loadingGeography:"正在载入地理数据",
    searchAirports:"搜索 IATA、ICAO、机场、城市或国家", airportSearchHint:"本地已存储 {count} 座机场，请输入至少两个字符。", noAirportMatches:"没有符合搜索条件的机场。", selectedHubAirports:"已选择的枢纽机场",
    backToMap:"返回首页", upcomingTravel:"未来行程", noIncoming:"暂无即将飞行的航班", upcomingCount:"个即将飞行",
    addIncomingFlight:"添加即将飞行", incomingEntry:"未来航班", incomingEntryHelp:"将计划航班加入即将飞行列表及地图。",
    saveIncomingFlight:"保存即将飞行", incomingSaved:"即将飞行已保存", invalidAirportCode:"请输入有效的三字 IATA 机场代码。", futureFlightRequired:"起飞时间必须晚于当前时间。",
    daysRemaining:"天后出发", today:"今天", tomorrow:"明天",
    import:"批量导入", addFlight:"添加飞行", recordsTitle:"飞行记录", totalFlights:"次飞行",
    searchPlaceholder:"搜索航班号、航司或机场", all:"全部", year:"年份", allYears:"全部年份",
    international:"国际 / 港澳台", domestic:"国内",
    flight:"航班", date:"日期", airportTime:"机场与时间", flightInfo:"飞行信息", fare:"票价",
    statsTitle:"飞行数据统计",
    route:"航线", airport:"机场", flightsRecorded:"飞行次数", oneWayDistance:"单程距离", countryFlights:"所有从该国家 / 地区起飞或抵达的航班。", involvedAirports:"相关机场",
    relatedFlights:"相关飞行", recordedSegments:"飞行次数", coordinates:"地理坐标", connections:"连接航线",
    recentRecords:"最近飞行", pastFlights:"过往航班", times:"次", noConnections:"当前记录中没有连接航线。",
    noRecords:"没有符合当前条件的飞行记录。", aircraft:"机型",
    aircraftIllustrationSingapore:"新加坡航空 Airbus A350-900 侧面示意图",
    aircraftIllustrationSingaporeA380:"新加坡航空 Airbus A380-800 侧面示意图",
    aircraftIllustrationChinaSouthern:"中国南方航空 Airbus A350-900 侧面示意图",
    aircraftIllustrationChinaSouthern777:"中国南方航空 Boeing 777-300ER 侧面示意图",
    aircraftIllustrationAirChina:"中国国际航空 Airbus A350-900 侧面示意图",
    aircraftIllustrationEmiratesA380:"阿联酋航空 Airbus A380-800 侧面示意图",
    aircraftIllustrationEmirates777:"阿联酋航空 Boeing 777-300ER 侧面示意图",
    aircraftIllustrationRoyalBrunei:"文莱皇家航空 Boeing 787-8 侧面示意图",
    aircraftIllustrationCathayA330:"国泰航空 Airbus A330-300 侧面示意图",
    aircraftIllustrationChinaSouthern737:"中国南方航空 Boeing 737-800 侧面示意图",
    aircraftIllustrationChinaSouthern787:"中国南方航空 Boeing 787-9 侧面示意图", registration:"注册号",
    cabin:"舱位", seat:"座位", gate:"登机口", notes:"备注", noNotes:"无备注", close:"关闭", editRecord:"编辑记录",
    backToStatisticsDetail:"返回",
    totalTime:"飞行时间", totalDistance:"飞行里程", aircraftTypes:"坐过的机型", airlinesFlown:"乘坐过的航司",
    airportsVisited:"曾去机场", countriesRegions:"去过的国家 / 地区", directedRoutes:"飞过的航线", citiesVisited:"去过的城市", totalFare:"总票价",
    hours:"小时", minutes:"分", flightUnit:"次飞行", typeUnit:"种机型", airportUnit:"座机场", countryUnit:"个国家 / 地区",
    airlineUnit:"家航司", routeUnit:"条有向航线", cityUnit:"座城市", knownFares:"条已知票价", longestFirst:"由长到短", highestFirst:"由高到低",
    earthCircumference:"圈地球周长", moonDistance:"倍地月距离", sunDistance:"倍地日距离",
    days:"天", weeks:"周", months:"月", years:"年", longestFlight:"最长航班", shortestFlight:"最短航班", farthestFlight:"最远航班",
    mostFlownAircraft:"乘坐最多机型", favouriteAircraft:"最喜欢的机型",
    mostFlownAirline:"乘坐最多航司", favouriteAirline:"最喜欢的航司",
    mostVisitedAirport:"到访最多机场", favouriteAirport:"最喜欢的机场",
    mostVisitedCountry:"到访最多国家 / 地区", favouriteDestination:"最喜欢的目的地",
    mostVisitedCity:"到访最多城市", favouriteCity:"最喜欢的城市", favourite:"最喜欢", notSet:"未设置",
    editFavourite:"编辑偏好", saveFavourite:"保存", favouriteUpdated:"偏好已更新",
    flightFootprint:"飞行足迹", visitedCountryMap:"到访国家 / 地区与飞行航线",
    visitedLand:"到访国家 / 地区", flightRoutes:"飞行航线",
    timeEquivalent:"时间换算", distanceEquivalent:"距离换算",
    visits:"次", bundle:"联票", perFlight:"每航段",
    flightEntry:"飞行记录", addFlightRecord:"添加飞行记录", editFlightRecord:"编辑飞行记录",
    autoLookup:"自动查询航班资料",
    autoLookupHelp:"根据日期和航班号补全计划时间、航站楼和机型。", flightDate:"航班日期",
    findRealFlight:"查找真实航班", lookupRequirement:"日期为必填项；请输入航班号，或同时输入出发和到达机场。",
    manualAdd:"手动添加", searchFlights:"查找航班", searchingFlights:"正在查询航班计划…", lookupNoResults:"未找到符合条件的航班，你可以手动添加。",
    lookupUnavailable:"航班查询尚未配置，你可以先手动添加。", lookupInvalid:"请填写日期，并输入航班号或同时输入两个机场代码。",
    lookupCacheHit:"已从共享航班缓存载入。", lookupManualFallback:"已切换到手动添加",
    lookupDailyLimit:"你今天已达到 20 次外部航班查询上限。", lookupMonthlyLimit:"全站本月已在 480 API Units 处暂停外部查询。",
    lookupProviderLimit:"外部航班数据平台当前已达到额度上限。", lookupFailedManual:"自动航班查询暂时不可用。",
    addThisFlight:"添加此航班", flightAdded:"航班已添加", continueFlightDetails:"继续添加座位号、票价等信息", scheduleTime:"计划", actualTime:"实际",
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

Object.assign(translations.en,{
  displayName:"Display name", chooseAvatar:"Choose avatar", saveProfile:"Save profile", profileSaved:"Profile saved",
  favourites:"Favourites", saveFavourites:"Save favourites", favouritesSaved:"Favourites saved",
  country:"Country / region", city:"City", feedback:"Feedback",
  deleteRecord:"Delete record", confirmDelete:"Delete this flight record? This cannot be undone.", recordDeleted:"Record deleted",
  welcomeToArchive:"WELCOME TO FLIGHT ARCHIVE", setUpArchive:"Set up your archive",
  requiredPreferencesHelp:"Choose your region and currency. You can change them later in Settings.",
  optionalSetupHelp:"Avatar, hubs, and favourites are optional. Add them now or skip this step.",
  continue:"Continue", skipForNow:"Skip for now", finishSetup:"Finish setup", setupComplete:"Your archive is ready",
  savingSetup:"Saving…",
  favouriteCountry:"Favourite country / region", collapseIncoming:"Collapse incoming flights", expandIncoming:"Expand incoming flights",
  avatarUpdated:"Avatar updated", uploadFailed:"Upload failed", saveFailed:"Save failed",
  navFriends:"Friends", friendsTitle:"Friends", friendsHelp:"Connect by username and share flight records with accepted friends.",
  username:"Username", usernamePlaceholder:"Used for friend search", searchUsername:"Search username", search:"Search",
  friendRequests:"Friend requests", yourFriends:"Your friends", addFriend:"Add friend", accept:"Accept", decline:"Decline",
  requestSent:"Request sent", requestPending:"Request pending", friendsSince:"Friends", viewFlights:"View flights",
  backToFriends:"Back to friends", noFriends:"No friends yet.", noFriendRequests:"No pending requests.",
  noSearchResults:"No users match this search.", friendshipUpdated:"Friendship updated", removeFriend:"Remove",
  friendFlights:"flight records", accountEdit:"Edit account", usernameHelp:"Username cannot be empty and must be unique.",
  changePassword:"Change password", newPasswordPlaceholder:"At least 8 characters", confirmPasswordPlaceholder:"Confirm new password",
  updatePassword:"Update password", passwordUpdated:"Password updated", passwordsDoNotMatch:"Passwords do not match.",
  other:"Other", enterOther:"Enter another value", feedbackUnavailable:"Feedback form is being configured.",
  destinationRegion:"Destination region", destinationCity:"Destination city", invalidDestinationRegion:"Choose a destination region from the list.",
  invalidDestinationCity:"Choose a city from the selected destination region."
});
Object.assign(translations.zh,{
  displayName:"显示名称", chooseAvatar:"选择头像", saveProfile:"保存账户资料", profileSaved:"账户资料已保存",
  favourites:"个人偏好", saveFavourites:"保存偏好", favouritesSaved:"偏好已保存",
  country:"国家 / 地区", city:"城市", feedback:"意见反馈",
  deleteRecord:"删除记录", confirmDelete:"确定删除这条飞行记录吗？此操作无法撤销。", recordDeleted:"记录已删除",
  welcomeToArchive:"欢迎使用 FLIGHT ARCHIVE", setUpArchive:"设置你的飞行档案",
  requiredPreferencesHelp:"请选择地区和货币，之后仍可在设置中修改。",
  optionalSetupHelp:"头像、枢纽机场与个人偏好均为选填，可现在设置或暂时跳过。",
  continue:"继续", skipForNow:"暂时跳过", finishSetup:"完成设置", setupComplete:"你的飞行档案已准备好",
  savingSetup:"正在保存…",
  favouriteCountry:"最喜欢的国家 / 地区", collapseIncoming:"收起即将飞行", expandIncoming:"展开即将飞行",
  avatarUpdated:"头像已更新", uploadFailed:"上传失败", saveFailed:"保存失败",
  navFriends:"好友", friendsTitle:"好友", friendsHelp:"通过用户名建立联系；双方成为好友后可互相查看飞行记录。",
  username:"用户名", usernamePlaceholder:"用于好友搜索", searchUsername:"搜索用户名", search:"搜索",
  friendRequests:"好友请求", yourFriends:"我的好友", addFriend:"添加好友", accept:"接受", decline:"拒绝",
  requestSent:"请求已发送", requestPending:"等待对方接受", friendsSince:"已成为好友", viewFlights:"查看飞行记录",
  backToFriends:"返回好友", noFriends:"还没有好友。", noFriendRequests:"没有待处理的好友请求。",
  noSearchResults:"没有找到匹配的用户。", friendshipUpdated:"好友状态已更新", removeFriend:"删除好友",
  friendFlights:"条飞行记录", accountEdit:"编辑账户", usernameHelp:"用户名不能为空，且不能与已有用户名重复。",
  changePassword:"修改密码", newPasswordPlaceholder:"至少 8 个字符", confirmPasswordPlaceholder:"再次输入新密码",
  updatePassword:"更新密码", passwordUpdated:"密码已更新", passwordsDoNotMatch:"两次输入的密码不一致。",
  other:"其他项", enterOther:"输入其他内容", feedbackUnavailable:"意见反馈表正在配置中。",
  destinationRegion:"目的地国家 / 地区", destinationCity:"目的地城市", invalidDestinationRegion:"请从列表中选择目的地国家 / 地区。",
  invalidDestinationCity:"请从所选目的地国家 / 地区的城市列表中选择。"
});
translations.en.invalidDestinationCity="Choose a city from the search results.";
translations.zh.invalidDestinationCity="请从城市搜索结果中选择。";
translations.en.dayNight="Real-time daylight";
translations.zh.dayNight="实时晨昏线";
translations.en.fullAirportSearch="Search all airports";
translations.zh.fullAirportSearch="进入完整搜索";
translations.en.majorAirportResults="Major airports";
translations.zh.majorAirportResults="主要枢纽机场";
Object.assign(translations.en,{
  listView:"List view",mapView:"Map view",friendMapFlights:"flights on this map",moreActions:"More actions",
  friendArchiveMenu:"Friend archive views",friendViewPrivate:"Your friend has set this view to private",
  privacy:"Privacy",privacyHelp:"Choose what accepted friends can view.",
  searchAndFilters:"Search and filters",editTrip:"Edit trip",updateTrip:"Update trip",
  fullCitySearch:"Search all cities",majorCityResults:"Major cities",citySearchHint:"Search city or country / region",
  showTripLabels:"Show trip labels",hideTripLabels:"Hide trip labels",organizeFlights:"Organize",selectedFlights:"selected flights",
  createBundle:"Create ticket bundle",addToTrip:"Add to trip",bundleHelp:"These flights share one purchase record.",bundleTotal:"Bundle total",
  tripLabel:"Trip label",tripPeriod:"Trip period",tripNamePlaceholder:"e.g. 2026 Australia",otherFlights:"Other flights",saveBundle:"Save bundle",saveTrip:"Save trip",
  tripRequired:"Enter a trip label and a valid start and end date.",bundleRequired:"Select at least two flights and enter the bundle total.",
  addAsBundle:"Add as a ticket bundle",addAnotherBundleFlight:"Add another flight to this bundle",bundleFare:"Total purchase price",
  fullAirportSearchHint:"Search the complete local airport directory"
});
Object.assign(translations.zh,{
  listView:"列表视图",mapView:"地图视图",friendMapFlights:"条好友飞行记录",moreActions:"更多操作",
  friendArchiveMenu:"好友档案页面",friendViewPrivate:"你的朋友设置此界面不可查看",
  privacy:"隐私",privacyHelp:"选择好友可以查看的档案页面。",
  searchAndFilters:"搜索与筛选",editTrip:"修改 Trip",updateTrip:"更新 Trip",
  fullCitySearch:"进入完整搜索",majorCityResults:"主要城市",citySearchHint:"搜索城市或国家 / 地区",
  showTripLabels:"显示 Trip Label",hideTripLabels:"隐藏 Trip Label",organizeFlights:"批量整理",selectedFlights:"条已选航班",
  createBundle:"创建套票",addToTrip:"加入 Trip",bundleHelp:"这些航班共享同一笔购买记录。",bundleTotal:"套票总价",
  tripLabel:"Trip Label",tripPeriod:"行程时段",tripNamePlaceholder:"例如：2026 Australia",otherFlights:"其他航班",saveBundle:"保存套票",saveTrip:"保存 Trip",
  tripRequired:"请输入 Trip Label，并填写有效的开始和结束日期。",bundleRequired:"请至少选择两趟航班并填写套票总价。",
  addAsBundle:"作为套票添加",addAnotherBundleFlight:"继续向此套票添加航班",bundleFare:"订单总票价",
  fullAirportSearchHint:"检索完整的本地机场目录"
});

Object.assign(translations.en,{
  deleteSelected:"Delete selected",confirmBulkDelete:"Delete {count} selected flights? This cannot be undone.",
  editBundle:"Edit ticket bundle",updateBundle:"Update bundle",selectOneTrip:"Select flights belonging to one trip to edit it.",
  manualRequiredFields:"Flight number, departure and arrival airports, and both local times are required.",
  airportTimezoneUnavailable:"The timezone for one of these airports is unavailable.",
  invalidCalculatedDuration:"These local times do not produce a plausible flight duration. Check the airports and times."
});
Object.assign(translations.zh,{
  deleteSelected:"批量删除",confirmBulkDelete:"确定删除选中的 {count} 趟航班吗？此操作无法撤销。",
  editBundle:"修改套票",updateBundle:"更新套票",selectOneTrip:"请选择属于同一个 Trip 的航班后再修改。",
  manualRequiredFields:"必须填写航班号、起降机场，以及起飞和到达的当地时间。",
  airportTimezoneUnavailable:"暂时无法识别其中一个机场的时区。",
  invalidCalculatedDuration:"根据这些机场和当地时间无法得到合理的飞行时长，请检查输入。"
});

const savedHubs = [];
const legacyRegionOptions = [
  { code:"CN", en:"Mainland China", zh:"中国大陆", localeEn:"en-CN", localeZh:"zh-CN" },
  { code:"HK", en:"Hong Kong SAR", zh:"中国香港", localeEn:"en-HK", localeZh:"zh-HK" },
  { code:"MO", en:"Macao SAR", zh:"中国澳门", localeEn:"en-MO", localeZh:"zh-MO" },
  { code:"TW", en:"Taiwan, China", zh:"中国台湾", localeEn:"en-TW", localeZh:"zh-TW" },
  { code:"SG", en:"Singapore", zh:"新加坡", localeEn:"en-SG", localeZh:"zh-SG" },
  { code:"JP", en:"Japan", zh:"日本", localeEn:"en-JP", localeZh:"zh-JP" },
  { code:"US", en:"United States", zh:"美国", localeEn:"en-US", localeZh:"zh-US" },
  { code:"GB", en:"United Kingdom", zh:"英国", localeEn:"en-GB", localeZh:"zh-GB" },
  { code:"EU", en:"Europe", zh:"欧洲", localeEn:"en-IE", localeZh:"zh-IE" },
  { code:"AU", en:"Australia", zh:"澳大利亚", localeEn:"en-AU", localeZh:"zh-AU" },
  { code:"CA", en:"Canada", zh:"加拿大", localeEn:"en-CA", localeZh:"zh-CA" }
];
const legacyCurrencyOptions = [
  { code:"CNY", en:"Chinese Yuan", zh:"人民币" },
  { code:"HKD", en:"Hong Kong Dollar", zh:"港币" },
  { code:"USD", en:"US Dollar", zh:"美元" },
  { code:"EUR", en:"Euro", zh:"欧元" },
  { code:"GBP", en:"British Pound", zh:"英镑" },
  { code:"SGD", en:"Singapore Dollar", zh:"新加坡元" },
  { code:"JPY", en:"Japanese Yen", zh:"日元" },
  { code:"AUD", en:"Australian Dollar", zh:"澳元" },
  { code:"CAD", en:"Canadian Dollar", zh:"加元" }
];
const fallbackCurrencyCodes = [
  "AED","ARS","AUD","BRL","CAD","CHF","CLP","CNY","COP","CZK","DKK","EGP","EUR","GBP",
  "HKD","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN",
  "QAR","RON","RUB","SAR","SEK","SGD","THB","TRY","TWD","USD","VND","ZAR"
];
const regionCodes=[...new Set(Object.values(airports).map(airport=>airport.countryCode).filter(code=>/^[A-Z]{2}$/.test(code||"")))];
const currencyCodes=typeof Intl.supportedValuesOf==="function"
  ? Intl.supportedValuesOf("currency")
  : fallbackCurrencyCodes;
const regionOptions=regionCodes.map(code=>({code}));
const currencyOptions=currencyCodes.map(code=>({code}));
const referenceData=window.FLIGHT_ARCHIVE_REFERENCE || {airlines:[],aircraft:{}};
const airportSearchData=window.FLIGHT_ARCHIVE_SEARCH_DATA || {majorAirports:new Set(),airportZh:{}};
const airportTimeZones=window.FLIGHT_ARCHIVE_TIMEZONES || {};
Object.entries(airportSearchData.airportZh||{}).forEach(([code,[name,city]])=>{
  if(!airports[code])return;
  airports[code].nameZh=name;
  airports[code].cityZh=city;
});
const savedRegion="CN";
const savedCurrency="CNY";
const state = {
  activeView:"atlas", yearFilter:"all", scopeFilter:"all", mapMode:"route", globeStyle:"orbit", dayNight:true, lang:"en",
  selectedRoute:null, selectedAirport:null, selectedCountry:null, activeFlightId:null, editingFlightId:null, editingIncomingId:null,
  hubs:new Set(savedHubs.filter(code => airports[code])), hubEditorOpen:false, hubSearch:"", hubFullSearch:false, incomingMode:false, statsReturnType:null,
  region:savedRegion, currency:savedCurrency, friends:[],friendSearchResults:[],friendRecords:null,
  privacy:{records:true,incoming:true,statistics:true},
  recordSelectionMode:false,selectedFlightIds:new Set(),showTripLabels:false,bundleSession:null,
  incomingSelectionMode:false,selectedIncomingIds:new Set(),recordBatchScope:"completed",editingTripId:null,editingTripFlightIds:new Set(),
  editingBundleId:null,editingBundleFlightIds:new Set(),statsReturnFriend:false
};
const flightLookupState={
  completed:{candidates:[],addedId:null},
  incoming:{candidates:[],addedId:null}
};
let currentProfile={};
const onboardingHubs=new Set();
const visitedCountries = new Set();
let landFeatures = fallbackLand.map((ring, index) => ({ name: `fallback-${index}`, rings: [ring] }));
let countryStatsMapFlights = [];
const t = key => translations[state.lang][key] || key;
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[char]);
const displayName=(type,code,lang=state.lang)=>{
  if(type==="region"&&String(code||"").toUpperCase()==="TW")return String(lang||"").toLowerCase().startsWith("zh")?"中国台湾":"Taiwan, China";
  try{return new Intl.DisplayNames([lang==="zh"?"zh-CN":"en"],{type}).of(code) || code;}
  catch{return code;}
};
const activeLocale = () => {
  const candidate=`${state.lang==="zh"?"zh":"en"}-${state.region}`;
  try{new Intl.NumberFormat(candidate);return candidate;}catch{return state.lang==="zh"?"zh-CN":"en-CA";}
};
const airportName = airport => state.lang === "zh" ? (airport.nameZh || airport.name || airport.globalName) : (airport.nameEn || airport.globalName || airport.name);
const cleanCityName = value => String(value||"").replace(/\s*\([^)]*\)\s*$/," ").replace(/\s+/g," ").trim();
const airportCity = airport => cleanCityName(state.lang === "zh" ? (airport.cityZh || airport.city || airport.globalCity) : (airport.cityEn || airport.globalCity || airport.city));
const airportCountry = airport => airport?.countryCode ? displayName("region",airport.countryCode) : (state.lang === "zh" ? (airport.countryZh || airport.country) : (airport.countryEn || airport.country));
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

function renderPreferenceSettings() {
  const regionSelect=document.getElementById("regionSelect");
  const currencySelect=document.getElementById("currencySelect");
  const sortedRegions=[...regionOptions].sort((a,b)=>displayName("region",a.code).localeCompare(displayName("region",b.code),activeLocale()));
  regionSelect.innerHTML=sortedRegions.map(option=>`<option value="${option.code}">${escapeHtml(displayName("region",option.code))}</option>`).join("");
  currencySelect.innerHTML=currencyOptions.map(option=>`<option value="${option.code}">${option.code} · ${escapeHtml(displayName("currency",option.code))}</option>`).join("");
  regionSelect.value=state.region;
  currencySelect.value=state.currency;
  regionSelect.setAttribute("aria-label",t("region"));
  currencySelect.setAttribute("aria-label",t("currency"));
  document.getElementById("privacyRecords").checked=state.privacy.records;
  document.getElementById("privacyIncoming").checked=state.privacy.incoming;
  document.getElementById("privacyStatistics").checked=state.privacy.statistics;
  document.getElementById("formFare").placeholder=state.currency;
  document.getElementById("incomingFare").placeholder=state.currency;
  renderFavouriteSettings();
  renderOnboardingOptions();
}
function persistPreferences() {
  if(window.flightArchiveData?.enabled){
    window.flightArchiveData.saveSettings({
      language:state.lang,
      region:state.region,
      currency:state.currency,
      mapStyle:state.globeStyle,
      dayNight:state.dayNight,
      privacyRecords:state.privacy.records,
      privacyIncoming:state.privacy.incoming,
      privacyStatistics:state.privacy.statistics
    }).catch(error=>showToast(state.lang==="zh"?"同步失败":"Sync failed",error.message));
  }
}
function applyRegionalPreferences() {
  renderPreferenceSettings();
  persistPreferences();
  renderFlights();
  renderStats();
  renderIncomingFlights();
  if(flightLookupState.completed.candidates.length)renderFlightLookupCandidates("completed");
  if(flightLookupState.incoming.candidates.length)renderFlightLookupCandidates("incoming");
  if(state.selectedRoute)openRouteDrawer(state.selectedRoute);
  if(state.selectedAirport)openAirportDrawer(state.selectedAirport);
  if(state.selectedCountry)openCountryDrawer(state.selectedCountry);
}
function countryOptionMarkup(selectedValue="") {
  const sorted=[...regionOptions].sort((a,b)=>displayName("region",a.code).localeCompare(displayName("region",b.code),activeLocale()));
  return `<option value="">${t("notSet")}</option>${sorted.map(option=>`<option value="${option.code}" ${option.code===selectedValue?"selected":""}>${escapeHtml(displayName("region",option.code))}</option>`).join("")}`;
}
function airlineByValue(value) {
  const normalized=String(value||"").trim().toLocaleLowerCase();
  return referenceData.airlines.find(airline=>[airline.iata,airline.icao,airline.en,airline.zh].some(item=>String(item||"").toLocaleLowerCase()===normalized));
}
function airlineIconSource(value,icao="",name="") {
  const normalizedValue=String(value||"").trim().toUpperCase();
  const airline=airlineByValue(value)||airlineByValue(name);
  const resolvedIcao=String(icao||airline?.icao||(normalizedValue.length===3?normalizedValue:"")).trim().toUpperCase();
  return airlineIcons[normalizedValue] || (resolvedIcao?`./airline-logos/flightaware_logos/${resolvedIcao}.png`:null);
}
function airlineSearchMarkup() {
  return referenceData.airlines.map(airline=>{
    const name=state.lang==="zh"?(airline.zh||airline.en):airline.en;
    return `<option value="${escapeHtml(`${name} (${airline.iata})`)}"></option>`;
  }).join("");
}
function aircraftSearchMarkup() {
  return Object.entries(referenceData.aircraft).flatMap(([maker,models])=>models.map(model=>{
    const value=`${maker} ${model}`;
    return `<option value="${escapeHtml(value)}">${escapeHtml(`${maker} · ${model}`)}</option>`;
  })).join("");
}
function regionSearchMarkup() {
  return [...regionOptions].sort((a,b)=>displayName("region",a.code).localeCompare(displayName("region",b.code),activeLocale()))
    .map(option=>`<option value="${escapeHtml(displayName("region",option.code))}"></option>`).join("");
}
function normalizedSearchText(value) {
  return String(value||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").trim().toLocaleLowerCase();
}
function airportSearchValues(airport) {
  return [
    airport.code,airport.icao,airport.name,airport.nameEn,airport.nameZh,airport.globalName,
    airport.city,airport.cityEn,airport.cityZh,airport.globalCity,
    airport.country,airport.countryEn,airport.countryZh,airport.countryCode,
    airport.countryCode?displayName("region",airport.countryCode,"en"):"",
    airport.countryCode?displayName("region",airport.countryCode,"zh"):""
  ].map(normalizedSearchText).filter(Boolean);
}
function airportMatchScore(airport,query) {
  const q=normalizedSearchText(query),code=airport.code.toLocaleLowerCase(),icao=String(airport.icao||"").toLocaleLowerCase();
  if(!q)return 100;
  if(code===q)return 0;
  if(q.length<=3&&code.startsWith(q))return 1;
  if(icao===q)return 2;
  if(q.length<=4&&icao.startsWith(q))return 3;
  const values=airportSearchValues(airport);
  if(values.some(value=>value===q))return 4;
  if(q.length>3&&values.some(value=>value.startsWith(q)))return 5;
  if(values.some(value=>value.includes(q)))return 8;
  return Infinity;
}
function airportSearchResults(query,{full=false,limit=18}={}) {
  const q=normalizedSearchText(query);
  if(!q)return {matches:[],needsFull:false};
  const all=Object.values(airports)
    .map(airport=>({airport,score:airportMatchScore(airport,q)}))
    .filter(item=>Number.isFinite(item.score))
    .sort((a,b)=>a.score-b.score||a.airport.code.localeCompare(b.airport.code));
  const major=all.filter(item=>airportSearchData.majorAirports?.has(item.airport.code));
  const exact=airports[q.toUpperCase()]||null;
  const exactOutside=Boolean(exact&&!airportSearchData.majorAirports?.has(exact.code));
  const matches=(full?all:major).slice(0,limit).map(item=>item.airport);
  return {matches,needsFull:!full&&(exactOutside||all.length>major.length),exactOutside};
}
function airportResultLabel(airport) {
  return `${airport.code} · ${airportCity(airport)} · ${airportName(airport)}`;
}
function normalizeAirlineFavourite(value) {
  const text=String(value||"").trim();
  if(!text)return "";
  if(text.startsWith("OTHER|"))return text;
  const cleaned=text.replace(/\s*\([A-Z0-9]{2}\)\s*$/i,"").trim();
  const lowered=cleaned.toLocaleLowerCase();
  const airline=referenceData.airlines.find(item=>[item.iata,item.icao,item.en,item.zh].some(label=>String(label).toLocaleLowerCase()===lowered));
  return airline?.iata||`OTHER|${cleaned}`;
}
function airlineInputDisplay(value) {
  if(!value)return "";
  const airline=airlineByValue(value);
  if(!airline)return value.startsWith("OTHER|")?value.slice(6):value;
  const name=state.lang==="zh"?(airline.zh||airline.en):airline.en;
  return `${name} (${airline.iata})`;
}
function localizedAirlineName(flightOrValue) {
  const flight=typeof flightOrValue==="object"?flightOrValue:null;
  const value=flight?.airlineShort||flight?.airlineCode||flight?.airline||flightOrValue;
  const airline=airlineByValue(value) || airlineByValue(flight?.flightNo?.match(/^[A-Z0-9]{2}/)?.[0]);
  if(!airline)return flight?.airline||String(value||"");
  return state.lang==="zh"?(airline.zh||airline.en):airline.en;
}
function effectiveFlightScope(flight) {
  return airports[flight?.from]?.countryCode==="CN" && airports[flight?.to]?.countryCode==="CN" ? "domestic" : "international";
}
function normalizeAircraftFavourite(value) {
  const text=String(value||"").trim();
  if(!text)return "";
  if(text.startsWith("OTHER|"))return text;
  const models=Object.entries(referenceData.aircraft).flatMap(([maker,items])=>items.map(model=>`${maker} ${model}`));
  return models.find(model=>model.toLocaleLowerCase()===text.toLocaleLowerCase())||`OTHER|${text}`;
}
function normalizeRegionFavourite(value) {
  const text=String(value||"").trim();
  if(!text)return "";
  const upper=text.toUpperCase();
  if(regionOptions.some(option=>option.code===upper))return upper;
  return regionOptions.find(option=>[displayName("region",option.code,"en"),displayName("region",option.code,"zh")].some(label=>label.toLocaleLowerCase()===text.toLocaleLowerCase()))?.code||"";
}
function normalizeAirportFavourite(value) {
  const text=String(value||"").trim();
  if(!text)return "";
  const upper=text.toUpperCase();
  if(airports[upper])return upper;
  const lowered=text.toLocaleLowerCase();
  return Object.values(airports).find(airport=>[
    airport.name,airport.nameEn,airport.nameZh,`${airport.code} · ${airportCity(airport)} · ${airportName(airport)}`
  ].some(label=>String(label||"").toLocaleLowerCase()===lowered))?.code||"";
}
function storedCityParts(value="") {
  const match=String(value).match(/^([A-Z]{2})\|(.+)$/);
  if(match)return {country:match[1],city:match[2]};
  const airport=Object.values(airports).find(item=>(item.cityEn||item.city)===value || (item.cityZh||item.city)===value);
  return {country:airport?.countryCode||state.region,city:value};
}
function canonicalCityName(value) {
  return String(value||"").replace(/\s*\([^)]*\)\s*$/," ").replace(/\s+/g," ").trim();
}
const cityIndex=(()=>{
  const map=new Map();
  Object.values(airports).forEach(airport=>{
    const cityEn=canonicalCityName(airport.cityEn||airport.city),countryCode=airport.countryCode;
    if(!cityEn||!countryCode)return;
    const key=`${countryCode}|${cityEn}`;
    const current=map.get(key)||{value:key,countryCode,cityEn,cityZh:"",major:false,airportCodes:[]};
    if(airport.cityZh)current.cityZh=canonicalCityName(airport.cityZh);
    current.major=current.major||Boolean(airportSearchData.majorAirports?.has(airport.code));
    current.airportCodes.push(airport.code);
    map.set(key,current);
  });
  return [...map.values()];
})();
function cityLabel(city) {
  return state.lang==="zh"?(city.cityZh||city.cityEn):city.cityEn;
}
function cityDisplay(city) {
  return `${cityLabel(city)} · ${displayName("region",city.countryCode)}`;
}
function cityMatchScore(city,query) {
  const q=normalizedSearchText(query);
  const values=[city.cityEn,city.cityZh,displayName("region",city.countryCode,"en"),displayName("region",city.countryCode,"zh"),cityDisplay(city)].map(normalizedSearchText);
  if(values.some(value=>value===q))return 0;
  if(values.some(value=>value.startsWith(q)))return 2;
  if(values.some(value=>value.includes(q)))return 5;
  return Infinity;
}
function citySearchResults(query,{full=false,limit=16}={}) {
  const all=cityIndex.map(city=>({city,score:cityMatchScore(city,query)})).filter(item=>Number.isFinite(item.score))
    .sort((a,b)=>a.score-b.score||cityLabel(a.city).localeCompare(cityLabel(b.city),activeLocale()));
  const major=all.filter(item=>item.city.major);
  const exactOutside=all.some(item=>item.score===0&&!item.city.major);
  return {matches:(full?all:major).slice(0,limit).map(item=>item.city),needsFull:!full&&(exactOutside||all.length>major.length)};
}
function cityFromStored(value) {
  const parts=storedCityParts(value);
  return cityIndex.find(city=>city.countryCode===parts.country&&city.cityEn===canonicalCityName(parts.city))
    ||cityIndex.find(city=>city.cityEn===canonicalCityName(parts.city));
}
function cityInputDisplay(value) {
  const city=cityFromStored(value);
  return city?cityDisplay(city):storedCityParts(value).city;
}
function normalizeCityFavourite(value,storedValue="") {
  if(storedValue&&cityIndex.some(city=>city.value===storedValue))return storedValue;
  const q=normalizedSearchText(value);
  if(!q)return "";
  const exact=cityIndex.filter(city=>[city.cityEn,city.cityZh,cityDisplay(city)].some(label=>normalizedSearchText(label)===q));
  return exact.length===1?exact[0].value:"";
}
function renderFavouriteSettings() {
  const airlineInput=document.getElementById("favouriteAirlineInput");
  if(!airlineInput)return;
  airlineInput.value=airlineInputDisplay(savedFavourites.airlines);
  document.getElementById("favouriteAircraftInput").value=savedFavourites.aircraft?.startsWith("OTHER|")?savedFavourites.aircraft.slice(6):(savedFavourites.aircraft||"");
  document.getElementById("favouriteAirportInput").value=savedFavourites.airports || "";
  document.getElementById("favouriteCountrySelect").value=savedFavourites.countries?displayName("region",savedFavourites.countries):"";
  const cityInput=document.getElementById("favouriteCityInput");
  cityInput.value=cityInputDisplay(savedFavourites.cities||"");
  cityInput.dataset.cityValue=savedFavourites.cities||"";
  document.getElementById("favouriteAirlineOptions").innerHTML=airlineSearchMarkup();
  document.getElementById("favouriteAircraftOptions").innerHTML=aircraftSearchMarkup();
  document.getElementById("favouriteRegionOptions").innerHTML=regionSearchMarkup();
  document.getElementById("airportCodeOptions").innerHTML=Object.values(airports).map(airport=>`<option value="${airport.code}">${escapeHtml(airportCity(airport))} · ${escapeHtml(airportName(airport))}</option>`).join("");
  const summary=document.getElementById("favouriteSummary");
  summary.innerHTML=["airlines","aircraft","airports","countries","cities"].map(type=>`<span><small>${t({airlines:"airline",aircraft:"aircraft",airports:"airport",countries:"destinationRegion",cities:"destinationCity"}[type])}</small><strong>${escapeHtml(favouriteDisplay(type,savedFavourites[type]||""))}</strong></span>`).join("");
}
function favouriteValuesFrom(prefix="") {
  const byId=suffix=>document.getElementById(`${prefix}${suffix}`);
  const airlineInput=byId(prefix?"FavouriteAirline":"favouriteAirlineInput");
  const aircraftInput=byId(prefix?"FavouriteAircraft":"favouriteAircraftInput");
  const airportInput=byId(prefix?"FavouriteAirport":"favouriteAirportInput").value.trim();
  const airport=normalizeAirportFavourite(airportInput);
  const destinationRegionInput=byId(prefix?"FavouriteCountry":"favouriteCountrySelect").value.trim();
  const destinationRegion=normalizeRegionFavourite(destinationRegionInput);
  const cityInput=byId(prefix?"FavouriteCity":"favouriteCityInput");
  const city=cityInput.value.trim();
  if(airportInput&&!airport)throw new Error(t("invalidAirportCode"));
  if(destinationRegionInput&&!destinationRegion)throw new Error(t("invalidDestinationRegion"));
  const normalizedCity=normalizeCityFavourite(city,cityInput.dataset.cityValue||"");
  if(city&&!normalizedCity)throw new Error(t("invalidDestinationCity"));
  return {
    airlines:normalizeAirlineFavourite(airlineInput.value),
    aircraft:normalizeAircraftFavourite(aircraftInput.value),
    airports:airport,
    countries:destinationRegion,
    cities:normalizedCity
  };
}
async function saveFavouriteValues(values) {
  Object.entries(values).forEach(([type,value])=>{
    if(value)savedFavourites[type]=value;else delete savedFavourites[type];
  });
  if(window.flightArchiveData?.enabled){
    await Promise.all(Object.entries(values).map(([type,value])=>window.flightArchiveData.saveFavourite(type,value)));
  }
  renderFavouriteSettings();
  renderStats();
}
function renderOnboardingOptions() {
  const regionSelect=document.getElementById("onboardingRegionSelect");
  if(!regionSelect)return;
  const sortedRegions=[...regionOptions].sort((a,b)=>displayName("region",a.code).localeCompare(displayName("region",b.code),activeLocale()));
  const regionValue=regionSelect.value || state.region;
  const currencyValue=document.getElementById("onboardingCurrencySelect").value || state.currency;
  regionSelect.innerHTML=sortedRegions.map(option=>`<option value="${option.code}">${escapeHtml(displayName("region",option.code))}</option>`).join("");
  document.getElementById("onboardingCurrencySelect").innerHTML=currencyOptions.map(option=>`<option value="${option.code}">${option.code} · ${escapeHtml(displayName("currency",option.code))}</option>`).join("");
  regionSelect.value=regionOptions.some(option=>option.code===regionValue)?regionValue:state.region;
  document.getElementById("onboardingCurrencySelect").value=currencyOptions.some(option=>option.code===currencyValue)?currencyValue:state.currency;
  document.getElementById("onboardingFavouriteCountry").value=savedFavourites.countries?displayName("region",savedFavourites.countries):"";
  const cityInput=document.getElementById("onboardingFavouriteCity");
  cityInput.value=cityInputDisplay(savedFavourites.cities||"");
  cityInput.dataset.cityValue=savedFavourites.cities||"";
  document.getElementById("onboardingFavouriteAirline").value=airlineInputDisplay(savedFavourites.airlines);
  document.getElementById("onboardingFavouriteAircraft").value=savedFavourites.aircraft?.startsWith("OTHER|")?savedFavourites.aircraft.slice(6):(savedFavourites.aircraft||"");
}
function renderProfile(profile=currentProfile) {
  currentProfile={...currentProfile,...(profile||{})};
  window.flightArchiveBackend?.setProfile(currentProfile);
}
function renderAvatarPreview(file) {
  const preview=document.getElementById("onboardingAvatarPreview");
  if(!file || !preview)return;
  const url=URL.createObjectURL(file);
  preview.innerHTML=`<img src="${url}" alt="" />`;
}
async function saveProfileSettings() {
  const file=document.getElementById("profileAvatarInput").files[0];
  try{
    let profile=currentProfile;
    if(file)profile=await window.flightArchiveData.uploadAvatar(file);
    renderProfile(profile);
    document.getElementById("profileAvatarInput").value="";
    setAccountEditing(false);
    showToast(t("profileSaved"),t("profileSaved"));
  }catch(error){
    showToast(t("saveFailed"),error?.message || String(error));
  }
}
async function saveSettingsFavourites() {
  try{
    await saveFavouriteValues(favouriteValuesFrom());
    setFavouritesEditing(false);
    showToast(t("favouritesSaved"),t("favouritesSaved"));
  }catch(error){
    showToast(t("saveFailed"),error?.message || String(error));
  }
}
function setAccountEditing(editing) {
  document.getElementById("accountEditor").hidden=!editing;
  document.getElementById("editAccountButton").hidden=editing;
  const passwordEditor=document.getElementById("passwordEditor");
  const revealButton=document.getElementById("showPasswordEditorButton");
  passwordEditor.hidden=true;
  revealButton.hidden=!editing;
  if(!editing){
    renderProfile(currentProfile);
    document.getElementById("profileAvatarInput").value="";
    document.getElementById("newPasswordInput").value="";
    document.getElementById("confirmPasswordInput").value="";
  }
}
function setFavouritesEditing(editing) {
  document.getElementById("favouriteEditor").hidden=!editing;
  document.getElementById("editFavouritesButton").hidden=editing;
  document.getElementById("favouriteSummary").hidden=editing;
  if(!editing)renderFavouriteSettings();
}
async function changePassword() {
  const password=document.getElementById("newPasswordInput").value;
  const confirmation=document.getElementById("confirmPasswordInput").value;
  if(password.length<8){
    showToast(t("saveFailed"),t("newPasswordPlaceholder"));
    return;
  }
  if(password!==confirmation){
    showToast(t("saveFailed"),t("passwordsDoNotMatch"));
    return;
  }
  try{
    await window.flightArchiveData.updatePassword(password);
    document.getElementById("newPasswordInput").value="";
    document.getElementById("confirmPasswordInput").value="";
    document.getElementById("passwordEditor").hidden=true;
    document.getElementById("showPasswordEditorButton").hidden=false;
    showToast(t("passwordUpdated"),t("passwordUpdated"));
  }catch(error){
    showToast(t("saveFailed"),error?.message || String(error));
  }
}

function applyLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  window.flightArchiveBackend?.setLanguage(lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const value = translations[lang][el.dataset.i18n];
    if (value) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const value = translations[lang][el.dataset.i18nPlaceholder];
    if (value) el.placeholder = value;
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const value = translations[lang][el.dataset.i18nTitle];
    if (value) { el.title = value; el.setAttribute("aria-label",value); }
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const value = translations[lang][el.dataset.i18nAria];
    if (value) el.setAttribute("aria-label",value);
  });
  document.getElementById("langZh").classList.toggle("active", lang === "zh");
  document.getElementById("langEn").classList.toggle("active", lang === "en");
  renderPreferenceSettings();
  ["cabinSelect","incomingCabinSelect"].forEach(id=>{
    document.getElementById(id).innerHTML=["economy","premiumEconomy","business","first"].map(key=>`<option>${t(key)}</option>`).join("");
  });
  const years=[...new Set(flights.map(f=>f.date.slice(0,4)))].sort((a,b)=>b.localeCompare(a));
  ["yearFilter","statsYearFilter"].forEach(id=>{
    const yearFilter=document.getElementById(id);
    yearFilter.innerHTML=`<option value="all">${t("allYears")}</option>${years.map(year=>`<option value="${year}">${year}</option>`).join("")}`;
    yearFilter.value=state.yearFilter;
  });
  syncFilterControls();
  renderFlights();
  renderStats();
  renderHubSettings();
  renderFavouriteSettings();
  renderIncomingFlights();
  if(flightLookupState.completed.candidates.length)renderFlightLookupCandidates("completed");
  if(flightLookupState.incoming.candidates.length)renderFlightLookupCandidates("incoming");
  if(state.activeView==="friends")loadFriends();
  if(state.friendRecords){populateFriendFilterYears();syncFriendViewerControls();setFriendMapIdentity();renderFriendFlightList();renderFriendIncoming();renderFriendStatistics();}
  updateMapHelp();
  if (state.selectedRoute) openRouteDrawer(state.selectedRoute);
  if (state.selectedAirport) openAirportDrawer(state.selectedAirport);
  if (state.selectedCountry) openCountryDrawer(state.selectedCountry);
}

function formatDate(date) {
  return new Intl.DateTimeFormat(activeLocale(), { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(`${date}T12:00:00`));
}
function formatFare(value) {
  return Number.isFinite(value)
    ? new Intl.NumberFormat(activeLocale(),{style:"currency",currency:state.currency,currencyDisplay:"narrowSymbol",maximumFractionDigits:0}).format(value)
    : "—";
}
function formatNumber(value,options) {
  return Number(value).toLocaleString(activeLocale(),options);
}
function parseDurationMinutes(value) {
  const text=String(value||"").trim();
  const hours=text.match(/(\d+)\s*h/i),minutes=text.match(/(\d+)\s*m(?:in)?/i);
  if(hours)return Number(hours[1])*60+(minutes?Number(minutes[1]):0);
  if(minutes)return Number(minutes[1]);
  return 0;
}
function airlineFromFlightNumber(value,currentAirline="") {
  const flightNo=String(value||"").trim().toUpperCase().replace(/\s+/g,"");
  const airlineShort=(flightNo.match(/^([A-Z0-9]{2})/)||[])[1]||"";
  const airline=airlineByValue(airlineShort);
  return {
    flightNo,airlineShort,
    airlineName:airline?.en||currentAirline||"Unknown airline",
    airlineIcao:airline?.icao||""
  };
}
function addCalendarDays(dateString,days) {
  const [year,month,day]=String(dateString).split("-").map(Number);
  const date=new Date(Date.UTC(year,month-1,day+days));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,"0")}-${String(date.getUTCDate()).padStart(2,"0")}`;
}
function zonedLocalTimeToUtc(dateString,timeString,timeZone) {
  const [year,month,day]=String(dateString).split("-").map(Number);
  const [hour,minute]=String(timeString).split(":").map(Number);
  if(!year||!month||!day||!Number.isFinite(hour)||!Number.isFinite(minute)||!timeZone)return null;
  const target=Date.UTC(year,month-1,day,hour,minute,0);
  let guess=target;
  const formatter=new Intl.DateTimeFormat("en-CA",{
    timeZone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"
  });
  for(let pass=0;pass<3;pass+=1){
    const parts=Object.fromEntries(formatter.formatToParts(new Date(guess)).filter(part=>part.type!=="literal").map(part=>[part.type,Number(part.value)]));
    const rendered=Date.UTC(parts.year,parts.month-1,parts.day,parts.hour,parts.minute,parts.second||0);
    guess=target-(rendered-guess);
  }
  return new Date(guess);
}
function calculateFlightDuration(date,depart,from,arrive,to) {
  if(!date||!depart||!arrive||!from||!to)return {error:"manualRequiredFields"};
  const fromTimeZone=airportTimeZones[from],toTimeZone=airportTimeZones[to];
  if(!fromTimeZone||!toTimeZone)return {error:"airportTimezoneUnavailable"};
  const departureUtc=zonedLocalTimeToUtc(date,depart,fromTimeZone);
  if(!departureUtc)return {error:"invalidCalculatedDuration"};
  const candidates=[];
  for(let dayOffset=-1;dayOffset<=2;dayOffset+=1){
    const arrivalDate=addCalendarDays(date,dayOffset);
    const arrivalUtc=zonedLocalTimeToUtc(arrivalDate,arrive,toTimeZone);
    const minutes=Math.round((arrivalUtc-departureUtc)/60000);
    if(minutes>=20&&minutes<=2160)candidates.push({minutes,arrivalDate,dayOffset});
  }
  if(!candidates.length)return {error:"invalidCalculatedDuration"};
  const distance=estimateAirportDistance(from,to);
  const expected=Math.max(35,(distance/820)*60+25);
  const result=candidates.sort((a,b)=>Math.abs(a.minutes-expected)-Math.abs(b.minutes-expected))[0];
  return {...result,text:flightDurationLabel(result.minutes),fromTimeZone,toTimeZone};
}
function airportCodeFromInput(value,currentCode) {
  const text=String(value||"").trim();
  if(!text)return currentCode;
  const match=text.toUpperCase().match(/\b[A-Z]{3}\b/);
  if(match&&airports[match[0]])return match[0];
  const normalized=text.toLocaleLowerCase();
  const searchable=airport=>[
    airport.name,airport.nameEn,airport.nameZh,airportCity(airport),airportName(airport),
    `${airportCity(airport)} ${airportName(airport)}`
  ].map(item=>String(item||"").trim().toLocaleLowerCase()).filter(Boolean);
  const exact=Object.values(airports).filter(airport=>searchable(airport).includes(normalized));
  if(exact.length===1)return exact[0].code;
  const partial=Object.values(airports).filter(airport=>searchable(airport).some(label=>label.includes(normalized)));
  return partial.length===1?partial[0].code:currentCode;
}
function timeInputValue(value) {
  const match=String(value||"").match(/^(\d{1,2}):(\d{2})$/);
  return match?`${match[1].padStart(2,"0")}:${match[2]}`:"";
}
function rebuildRoutes() {
  const routeMap=new Map();
  visitedCountries.clear();
  flights.forEach(f=>{
    [f.from,f.to].forEach(code=>{
      const country=geoCountryName(airports[code]);
      if(country)visitedCountries.add(country);
    });
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
function inputDateValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}
function lookupElements(kind) {
  const prefix=kind==="completed"?"completed":"incoming";
  return {
    panel:document.getElementById(`${prefix}LookupPanel`),
    success:document.getElementById(`${prefix}LookupSuccess`),
    form:document.getElementById(kind==="completed"?"flightForm":"incomingFlightForm"),
    date:document.getElementById(`${prefix}LookupDate`),
    flightNo:document.getElementById(`${prefix}LookupFlightNo`),
    from:document.getElementById(`${prefix}LookupFrom`),
    to:document.getElementById(`${prefix}LookupTo`),
    search:document.getElementById(`${prefix}LookupSearch`),
    status:document.getElementById(`${prefix}LookupStatus`),
    results:document.getElementById(`${prefix}LookupResults`),
    successSummary:document.getElementById(`${prefix}LookupSuccessSummary`)
  };
}
function showFlightEntryStep(kind,step) {
  const elements=lookupElements(kind);
  elements.panel.hidden=step!=="lookup";
  elements.success.hidden=step!=="success";
  elements.form.hidden=step!=="manual";
}
function resetFlightLookup(kind,date) {
  const elements=lookupElements(kind);
  const today=inputDateValue(new Date());
  flightLookupState[kind].candidates=[];
  flightLookupState[kind].addedId=null;
  elements.date.min=kind==="incoming"?today:"";
  elements.date.max=kind==="completed"?today:"";
  elements.date.value=date;
  elements.flightNo.value="";
  elements.from.value="";
  elements.to.value="";
  elements.status.textContent="";
  elements.status.classList.remove("error");
  elements.results.innerHTML="";
  showFlightEntryStep(kind,"lookup");
}
function activateBundleSessionFromForm() {
  if(!document.getElementById("completedBundleToggle").checked)return null;
  const raw=document.getElementById("completedBundleFare").value,total=Number(raw);
  if(raw===""||!Number.isFinite(total)||total<0){showToast(t("saveFailed"),t("bundleRequired"));return false;}
  if(!state.bundleSession)state.bundleSession={id:crypto.randomUUID(),total:Number.isFinite(total)&&total>=0?total:null,count:0};
  else if(Number.isFinite(total)&&total>=0)state.bundleSession.total=total;
  return state.bundleSession;
}
function lookupCandidateLogo(candidate) {
  const source=airlineIconSource(candidate.airlineCode||"",candidate.airlineIcao||"",candidate.airline||"");
  return source
    ? `<span class="flight-candidate-logo"><img src="${source}" alt="" /></span>`
    : `<span class="flight-candidate-logo">${escapeHtml(candidate.airlineCode||"—")}</span>`;
}
function renderFlightLookupCandidates(kind) {
  const elements=lookupElements(kind);
  const candidates=flightLookupState[kind].candidates;
  if(!elements?.results)return;
  elements.results.innerHTML=candidates.map((candidate,index)=>`
    <button class="flight-candidate" type="button" data-lookup-candidate="${index}">
      ${lookupCandidateLogo(candidate)}
      <span class="flight-candidate-main">
        <span><strong>${escapeHtml(candidate.flightNumber||"—")}</strong><b>${escapeHtml(candidate.from||"—")}</b><i></i><b>${escapeHtml(candidate.to||"—")}</b></span>
        <small>${escapeHtml(candidate.departTime||"—")} → ${escapeHtml(candidate.arriveTime||"—")} · ${escapeHtml(localizedAirlineName(candidate)||"—")}${candidate.aircraft?` · ${escapeHtml(candidate.aircraft)}`:""}</small>
      </span>
      <span class="flight-candidate-action">${t("addThisFlight")}</span>
    </button>`).join("");
  elements.results.querySelectorAll("[data-lookup-candidate]").forEach(button=>button.addEventListener("click",()=>addFlightLookupCandidate(kind,Number(button.dataset.lookupCandidate))));
}
function flightDurationLabel(minutes) {
  const value=Math.max(0,Number(minutes)||0);
  if(!value)return "—";
  if(value<60)return `${value}min`;
  return `${Math.floor(value/60)}h ${value%60}m`;
}
function flightFromLookupCandidate(candidate,recordStatus) {
  const from=String(candidate.from||"").toUpperCase(),to=String(candidate.to||"").toUpperCase();
  const flightNo=String(candidate.flightNumber||"").toUpperCase();
  const durationMinutes=Math.max(0,Number(candidate.durationMinutes)||0);
  const distance=Math.max(0,Math.round(Number(candidate.distanceKm)||estimateAirportDistance(from,to)));
  return {
    id:crypto.randomUUID(),from,to,date:candidate.date,
    airline:candidate.airline||candidate.airlineCode||"Unknown airline",
    airlineShort:candidate.airlineCode||(flightNo.match(/^([A-Z0-9]{2})/)||[])[1]||"",
    flightNo,aircraft:candidate.aircraft||"—",registration:candidate.registration||"—",
    depart:candidate.departTime||"—",arrive:candidate.arriveTime||"—",
    duration:flightDurationLabel(durationMinutes),durationMinutes,distance,
    terminalFrom:candidate.departureTerminal||"—",terminalTo:candidate.arrivalTerminal||"—",
    seat:"—",cabin:t("economy"),fare:null,fareCurrency:state.currency,fareRaw:null,fareGroup:null,booking:"",
    gate:candidate.departureGate||"—",status:candidate.status||"",note:"",
    scope:effectiveFlightScope({from,to}),
    recordStatus,metadata:{source:"aerodatabox",provider_id:candidate.id||null,airline_icao:candidate.airlineIcao||null}
  };
}
async function addFlightLookupCandidate(kind,index) {
  const candidate=flightLookupState[kind].candidates[index];
  if(!candidate)return;
  const recordStatus=kind==="completed"?"completed":"upcoming";
  let flight=flightFromLookupCandidate(candidate,recordStatus);
  if(kind==="completed"){
    const bundle=activateBundleSessionFromForm();
    if(document.getElementById("completedBundleToggle").checked&&!bundle)return;
    if(bundle){
      flight.fareGroup=bundle.id;
      flight.fare=bundle.count===0?bundle.total:null;
      flight.fareRaw=Number.isFinite(flight.fare)?String(flight.fare):null;
    }
  }
  if(!airports[flight.from]||!airports[flight.to]){
    showToast(t("saveFailed"),t("invalidAirportCode"));
    return;
  }
  if(kind==="incoming"&&departureDateTime(flight)<=new Date()){
    showToast(t("addIncomingFlight"),t("futureFlightRequired"));
    return;
  }
  const elements=lookupElements(kind);
  elements.results.querySelectorAll("button").forEach(button=>button.disabled=true);
  try{
    if(window.flightArchiveData?.enabled){
      const saved=await window.flightArchiveData.saveFlight(flight,recordStatus);
      flight={...flight,...saved,metadata:flight.metadata};
    }
    (kind==="completed"?flights:plannedIncomingFlights).push(flight);
    if(kind==="completed"){
      flights.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
      rebuildRoutes();renderFlights();renderStats();
    }else renderIncomingFlights();
    drawGlobe();
    flightLookupState[kind].addedId=flight.id;
    if(kind==="completed"&&state.bundleSession)state.bundleSession.count+=1;
    elements.successSummary.textContent=`${flight.flightNo} · ${flight.from} → ${flight.to} · ${formatDate(flight.date)}`;
    if(kind==="completed")document.getElementById("completedLookupAddAnother").hidden=!state.bundleSession;
    showFlightEntryStep(kind,"success");
  }catch(error){
    elements.results.querySelectorAll("button").forEach(button=>button.disabled=false);
    showToast(t("saveFailed"),error?.message||String(error));
  }
}
function openManualFlightEntry(kind) {
  const elements=lookupElements(kind);
  if(kind==="completed"){
    const bundle=activateBundleSessionFromForm();
    if(document.getElementById("completedBundleToggle").checked&&!bundle)return;
    setFormValue("formDate",elements.date.value);
    setFormValue("formFlightNo",elements.flightNo.value.trim().toUpperCase());
    setFormValue("formFrom",elements.from.value.trim().toUpperCase());
    setFormValue("formTo",elements.to.value.trim().toUpperCase());
  }else{
    setFormValue("incomingDate",elements.date.value);
    setFormValue("incomingFlightNo",elements.flightNo.value.trim().toUpperCase());
    setFormValue("incomingFrom",elements.from.value.trim().toUpperCase());
    setFormValue("incomingTo",elements.to.value.trim().toUpperCase());
  }
  showFlightEntryStep(kind,"manual");
}
async function searchFlightLookup(kind) {
  const elements=lookupElements(kind);
  const date=elements.date.value;
  const flightNumber=elements.flightNo.value.trim().toUpperCase().replace(/\s+/g,"");
  const from=airportCodeFromInput(elements.from.value,"");
  const to=airportCodeFromInput(elements.to.value,"");
  if(from)elements.from.value=from;
  if(to)elements.to.value=to;
  if(!date||(!flightNumber&&(!from||!to))){
    elements.status.textContent=t("lookupInvalid");
    elements.status.classList.add("error");
    return;
  }
  elements.search.disabled=true;
  elements.status.textContent=t("searchingFlights");
  elements.status.classList.remove("error");
  elements.results.innerHTML="";
  flightLookupState[kind].candidates=[];
  try{
    if(typeof window.flightArchiveData?.searchFlights!=="function")throw new Error("Flight lookup is not configured.");
    const response=await window.flightArchiveData.searchFlights({date,flightNumber,from:flightNumber?"":from,to:flightNumber?"":to});
    const candidates=Array.isArray(response)?response:(Array.isArray(response?.results)?response.results:[]);
    flightLookupState[kind].candidates=candidates;
    elements.status.textContent=response?.cached?t("lookupCacheHit"):(candidates.length?"":t("lookupNoResults"));
    renderFlightLookupCandidates(kind);
  }catch(error){
    const message=error?.message||String(error);
    const fallbackMessages={
      DAILY_SEARCH_LIMIT:"lookupDailyLimit",
      MONTHLY_UNIT_LIMIT:"lookupMonthlyLimit",
      PROVIDER_LIMIT:"lookupProviderLimit",
      LOOKUP_NOT_CONFIGURED:"lookupUnavailable",
      PROVIDER_UNAVAILABLE:"lookupFailedManual",
      LOOKUP_FAILED:"lookupFailedManual"
    };
    const fallbackKey=fallbackMessages[error?.code];
    elements.status.textContent=fallbackKey?t(fallbackKey):(/not configured|not found|non-2xx/i.test(message)?t("lookupUnavailable"):message);
    elements.status.classList.add("error");
    if(error?.manualFallback){
      const fallbackMessage=elements.status.textContent;
      openManualFlightEntry(kind);
      showToast(t("lookupManualFallback"),fallbackMessage);
    }
  }finally{
    elements.search.disabled=false;
  }
}
function prepareAddForm({preserveBundle=false}={}) {
  state.editingFlightId=null;
  if(!preserveBundle)state.bundleSession=null;
  const form=document.getElementById("flightForm");
  form.reset();
  document.getElementById("addTitle").dataset.i18n="addFlightRecord";
  document.getElementById("addTitle").textContent=t("addFlightRecord");
  const today=inputDateValue(new Date());
  setFormValue("formDate",today);
  document.getElementById("cabinSelect").value=t("economy");
  resetFlightLookup("completed",today);
  document.getElementById("completedBundleToggle").checked=Boolean(state.bundleSession);
  document.getElementById("completedBundleToggle").disabled=Boolean(state.bundleSession?.count);
  document.getElementById("completedBundleFields").hidden=!state.bundleSession;
  document.getElementById("completedBundleFare").value=state.bundleSession?.total??"";
  document.getElementById("completedBundleFare").disabled=Boolean(state.bundleSession?.count);
  document.getElementById("completedLookupAddAnother").hidden=true;
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
  setFormValue("formAircraft",f.aircraft);
  setFormValue("formRegistration",f.registration==="—"?"":f.registration);
  setFormValue("formDepart",timeInputValue(f.depart));
  setFormValue("formArrive",timeInputValue(f.arrive));
  setFormValue("formDistance",f.distance);
  setFormValue("formGate",f.gate==="—"?"":f.gate);
  setFormValue("formSeat",f.seat==="—"||f.seat==="——"?"":f.seat);
  setFormValue("formFare",Number.isFinite(f.fare)?f.fare:"");
  setFormValue("formNote",f.note);
  document.getElementById("cabinSelect").value=displayCabin(f.cabin);
  showFlightEntryStep("completed","manual");
  openModal("addModal");
}
function saveEditedFlight() {
  const f=flights.find(item=>item.id===state.editingFlightId);
  if(!f)return false;
  const previousFare=f.fare;
  const date=document.getElementById("formDate").value;
  const flightIdentity=airlineFromFlightNumber(document.getElementById("formFlightNo").value,f.airline);
  const from=airportCodeFromInput(document.getElementById("formFrom").value,"");
  const to=airportCodeFromInput(document.getElementById("formTo").value,"");
  const depart=document.getElementById("formDepart").value;
  const arrive=document.getElementById("formArrive").value;
  if(!date||!flightIdentity.flightNo||!from||!to||!depart||!arrive){showToast(t("editFlightRecord"),t("manualRequiredFields"));return false;}
  const calculated=calculateFlightDuration(date,depart,from,arrive,to);
  if(calculated.error){showToast(t("editFlightRecord"),t(calculated.error));return false;}
  f.date=date;
  f.flightNo=flightIdentity.flightNo;
  f.from=from;
  f.to=to;
  f.terminalFrom=document.getElementById("formTerminalFrom").value.trim()||"—";
  f.terminalTo=document.getElementById("formTerminalTo").value.trim()||"—";
  f.airline=flightIdentity.airlineName;
  f.airlineShort=flightIdentity.airlineShort;
  f.aircraft=document.getElementById("formAircraft").value.trim()||f.aircraft;
  f.registration=document.getElementById("formRegistration").value.trim()||"—";
  f.duration=calculated.text;
  f.durationMinutes=calculated.minutes;
  f.depart=depart;
  f.arrive=arrive;
  f.distance=Math.max(0,Number(document.getElementById("formDistance").value)||0);
  f.gate=document.getElementById("formGate").value.trim()||"—";
  f.seat=document.getElementById("formSeat").value.trim()||"—";
  f.cabin=document.getElementById("cabinSelect").value||f.cabin;
  const fareValue=document.getElementById("formFare").value;
  f.fare=fareValue===""?null:Math.max(0,Number(fareValue));
  if(f.fare!==previousFare){f.fareRaw=fareValue||null;f.fareGroup=null;}
  f.note=document.getElementById("formNote").value.trim();
  f.metadata={...(f.metadata||{}),airline_icao:flightIdentity.airlineIcao||f.metadata?.airline_icao||null,arrival_date:calculated.arrivalDate,duration_calculated:true};
  f.scope=effectiveFlightScope(f);
  rebuildRoutes();
  if(window.flightArchiveData?.enabled){
    window.flightArchiveData.saveFlight(f,"completed")
      .catch(error=>showToast(state.lang==="zh"?"同步失败":"Sync failed",error.message));
  }
  state.editingFlightId=null;
  return true;
}
function saveNewFlight() {
  const from=airportCodeFromInput(document.getElementById("formFrom").value,"");
  const to=airportCodeFromInput(document.getElementById("formTo").value,"");
  const date=document.getElementById("formDate").value;
  const depart=document.getElementById("formDepart").value;
  const arrive=document.getElementById("formArrive").value;
  const flightIdentity=airlineFromFlightNumber(document.getElementById("formFlightNo").value);
  if(!date||!flightIdentity.flightNo||!from||!to||!depart||!arrive){showToast(t("addFlightRecord"),t("manualRequiredFields"));return false;}
  const calculated=calculateFlightDuration(date,depart,from,arrive,to);
  if(calculated.error){showToast(t("addFlightRecord"),t(calculated.error));return false;}
  const fareValue=document.getElementById("formFare").value;
  const distanceValue=Number(document.getElementById("formDistance").value);
  const flight={
    id:crypto.randomUUID(),
    from,
    to,
    date,
    airline:flightIdentity.airlineName,
    airlineShort:flightIdentity.airlineShort,
    flightNo:flightIdentity.flightNo,
    aircraft:document.getElementById("formAircraft").value.trim() || "—",
    registration:document.getElementById("formRegistration").value.trim() || "—",
    depart,
    arrive,
    duration:calculated.text,
    durationMinutes:calculated.minutes,
    distance:distanceValue>0?Math.round(distanceValue):estimateAirportDistance(from,to),
    terminalFrom:document.getElementById("formTerminalFrom").value.trim() || "—",
    terminalTo:document.getElementById("formTerminalTo").value.trim() || "—",
    seat:document.getElementById("formSeat").value.trim() || "—",
    cabin:document.getElementById("cabinSelect").value || t("economy"),
    fare:fareValue===""?null:Math.max(0,Number(fareValue)),
    fareCurrency:state.currency,
    fareRaw:fareValue || null,
    fareGroup:state.bundleSession?.id||null,
    booking:"",
    gate:document.getElementById("formGate").value.trim() || "—",
    status:"",
    note:document.getElementById("formNote").value.trim(),
    scope:effectiveFlightScope({from,to}),
    recordStatus:"completed",
    metadata:{airline_icao:flightIdentity.airlineIcao||null,arrival_date:calculated.arrivalDate,duration_calculated:true}
  };
  if(state.bundleSession){
    flight.fare=state.bundleSession.count===0?state.bundleSession.total:null;
    flight.fareRaw=Number.isFinite(flight.fare)?String(flight.fare):null;
    state.bundleSession.count+=1;
  }
  flights.unshift(flight);
  rebuildRoutes();
  if(window.flightArchiveData?.enabled){
    window.flightArchiveData.saveFlight(flight,"completed")
      .then(savedFlight=>Object.assign(flight,savedFlight))
      .catch(error=>showToast(state.lang==="zh"?"同步失败":"Sync failed",error.message));
  }
  return true;
}
async function deleteFlightRecord(id) {
  const collection=flights.some(item=>String(item.id)===String(id))?flights:plannedIncomingFlights;
  const index=collection.findIndex(item=>String(item.id)===String(id));
  if(index<0 || !window.confirm(t("confirmDelete")))return;
  try{
    if(window.flightArchiveData?.enabled && /^[0-9a-f-]{36}$/i.test(String(id))){
      await window.flightArchiveData.deleteFlight(id);
    }
    collection.splice(index,1);
    if(state.activeFlightId===id)state.activeFlightId=null;
    rebuildRoutes();
    closeModals();
    closeDrawer();
    applyLanguage(state.lang);
    renderIncomingFlights();
    drawGlobe();
    showToast(t("recordDeleted"),t("recordDeleted"));
  }catch(error){
    showToast(t("saveFailed"),error?.message || String(error));
  }
}
function iconMarkup(f, className = "airline-icon") {
  const icon = airlineIconSource(f.airlineShort,f?.metadata?.airline_icao||f?.airlineIcao||"",f.airline);
  return icon
    ? `<span class="${className}"><img src="${icon}" alt="${f.airline} logo" loading="lazy" /></span>`
    : `<span class="${className} airline-fallback">${f.airlineShort}</span>`;
}

function normalizeRegistration(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function aircraftVisualForFlight(f) {
  return aircraftVisuals[normalizeRegistration(f?.registration)] || null;
}
function aircraftImageMarkup(f,className="aircraft-inline-image") {
  const visual=aircraftVisualForFlight(f);
  return visual?`<img class="${className}" src="${visual.src}" alt="${t(visual.altKey)}" loading="lazy" />`:"";
}
function genericAircraftMarkup(label) {
  return `<svg class="stats-aircraft-image generic-aircraft-image" viewBox="0 0 280 84" role="img" aria-label="${label}">
    <path class="generic-aircraft-body" d="M14 48c24-7 58-10 111-11l94-1 35-18 9 2-22 17 29 3 5 6-34 4-24 18-9 1 12-19-93-1c-53 0-88 2-113 6Z"/>
    <path class="generic-aircraft-wing" d="m117 38 39-27 12 1-24 26 56 1-2 9-55 1 22 25-12 1-37-26Z"/>
  </svg>`;
}

function bundleMembers(f,sourceFlights=null) {
  const source=sourceFlights||ownFlights();
  return f?.fareGroup?source.filter(item=>item.fareGroup===f.fareGroup):[f];
}
function bundleTotalForFlight(f,sourceFlights=null) {
  return bundleMembers(f,sourceFlights).reduce((sum,item)=>sum+(Number.isFinite(item?.fare)?Number(item.fare):0),0);
}
function flightFareMarkup(f) {
  if(!f.fareGroup)return `<strong>${formatFare(f.fare)}</strong>`;
  return `<strong>${formatFare(bundleTotalForFlight(f))}</strong><small>${t("bundle")}</small>`;
}
function flightTrip(f) {
  return f?.metadata?.trip && typeof f.metadata.trip==="object"?f.metadata.trip:null;
}

function flightRowMarkup(f) {
  const from = airports[f.from], to = airports[f.to];
  return `
    <article class="flight-row" data-flight-id="${f.id}">
      ${state.recordSelectionMode?`<label class="flight-select"><input type="checkbox" data-select-flight="${f.id}" ${state.selectedFlightIds.has(String(f.id))?"checked":""} /><span></span></label>`:""}
      <div class="airline-cell">
        ${iconMarkup(f)}
        <div><strong class="flight-number">${f.flightNo}</strong><small>${escapeHtml(localizedAirlineName(f))}</small></div>
      </div>
      <div class="date-cell"><strong>${formatDate(f.date)}</strong></div>
      <div class="route-cell">
        <div class="route-point"><strong>${f.from}</strong><span>${airportCity(from)}</span><small>${f.depart}</small></div>
        <div class="route-line"><span>${f.duration}</span><i></i><small>${formatNumber(f.distance)} km</small></div>
        <div class="route-point"><strong>${f.to}</strong><span>${airportCity(to)}</span><small>${f.arrive}</small></div>
      </div>
      <div class="flight-meta">
        <span>${t("aircraft")}<b>${f.aircraft}</b></span><span>${t("cabin")}<b>${displayCabin(f.cabin)}</b></span>
        <span>${t("registration")}<b>${f.registration || "—"}</b></span><span>${t("seat")}<b>${f.seat}</b></span>
      </div>
      <div class="fare-cell">${flightFareMarkup(f)}</div>
      <div class="flight-row-actions">
        <button type="button" data-row-edit="${f.id}" aria-label="${t("editRecord")}" title="${t("editRecord")}"><svg viewBox="0 0 24 24"><path d="m4 16.5-.5 4 4-.5L18.8 8.7l-3.5-3.5L4 16.5Z"/><path d="m13.8 6.7 3.5 3.5"/></svg></button>
        <button type="button" data-row-delete="${f.id}" aria-label="${t("deleteRecord")}" title="${t("deleteRecord")}"><svg viewBox="0 0 24 24"><path d="M4.5 7h15M9 7V4.5h6V7m-8 0 .8 13h8.4L17 7M10 10.5v6M14 10.5v6"/></svg></button>
      </div>
    </article>`;
}

function filteredFlights() {
  return flights.filter(f=>{
    const yearOk=state.yearFilter==="all"||f.date.startsWith(state.yearFilter);
    const scopeOk=state.scopeFilter==="all"||effectiveFlightScope(f)===state.scopeFilter;
    return yearOk&&scopeOk;
  });
}

function syncFilterControls() {
  ["yearFilter","statsYearFilter"].forEach(id=>{
    const select=document.getElementById(id);
    if(select)select.value=state.yearFilter;
  });
  document.querySelectorAll("[data-scope]").forEach(button=>button.classList.toggle("active",button.dataset.scope===state.scopeFilter));
  document.querySelectorAll("[data-stats-scope]").forEach(button=>button.classList.toggle("active",button.dataset.statsScope===state.scopeFilter));
}

function applyFlightFilters(year=state.yearFilter,scope=state.scopeFilter) {
  state.yearFilter=year;
  state.scopeFilter=scope;
  syncFilterControls();
  renderFlights();
  renderStats();
}

function renderFlights() {
  const query = (document.getElementById("recordSearch")?.value || "").trim().toLowerCase();
  const list = filteredFlights().filter(f => {
    const text = `${f.flightNo} ${f.airline} ${f.from} ${f.to} ${airportName(airports[f.from])} ${airportName(airports[f.to])}`.toLowerCase();
    return text.includes(query);
  });
  document.getElementById("recordTotal").textContent=list.length;
  let content="";
  if(list.length&&state.showTripLabels){
    const groups=new Map();
    list.forEach(f=>{
      const trip=flightTrip(f),key=trip?.id||trip?.label||"__other";
      if(!groups.has(key))groups.set(key,{trip,items:[]});
      groups.get(key).items.push(f);
    });
    content=[...groups.values()].sort((a,b)=>{
      if(!a.trip&&b.trip)return 1;
      if(a.trip&&!b.trip)return -1;
      return String(b.trip?.start||b.items[0]?.date||"").localeCompare(String(a.trip?.start||a.items[0]?.date||""));
    }).map(group=>{
      const label=group.trip?.label||t("otherFlights");
      const period=group.trip?`${formatDate(group.trip.start)} — ${formatDate(group.trip.end)}`:"";
      return `<section class="trip-flight-group"><header><strong>${escapeHtml(label)}</strong><small>${escapeHtml(period)}</small>${group.trip?`<button type="button" data-edit-trip="${escapeHtml(group.trip.id||group.trip.label)}">${t("editTrip")}</button>`:""}</header>${group.items.map(flightRowMarkup).join("")}</section>`;
    }).join("");
  }else content=list.map(flightRowMarkup).join("");
  document.getElementById("flightList").innerHTML = list.length ? content : `<div class="empty-state">${t("noRecords")}</div>`;
  document.getElementById("flightList").classList.toggle("selection-mode",state.recordSelectionMode);
  document.querySelectorAll("[data-flight-id]").forEach(el => el.addEventListener("click", () => {
    if(state.recordSelectionMode)return;
    openFlight(el.dataset.flightId);
  }));
  document.querySelectorAll("[data-row-edit]").forEach(button=>button.addEventListener("click",event=>{
    event.stopPropagation();
    prepareEditForm(button.dataset.rowEdit);
  }));
  document.querySelectorAll("[data-row-delete]").forEach(button=>button.addEventListener("click",event=>{
    event.stopPropagation();
    deleteFlightRecord(button.dataset.rowDelete);
  }));
  document.querySelectorAll(".flight-select").forEach(label=>label.addEventListener("click",event=>event.stopPropagation()));
  document.querySelectorAll("[data-select-flight]").forEach(input=>input.addEventListener("change",()=>{
    const id=String(input.dataset.selectFlight);
    if(input.checked)state.selectedFlightIds.add(id);else state.selectedFlightIds.delete(id);
    updateRecordBulkToolbar();
  }));
  document.querySelectorAll("[data-edit-trip]").forEach(button=>button.addEventListener("click",()=>openTripEditor(button.dataset.editTrip)));
}

function updateRecordBulkToolbar() {
  const toolbar=document.getElementById("recordBulkToolbar");
  toolbar.hidden=!state.recordSelectionMode;
  document.getElementById("selectedFlightCount").textContent=state.selectedFlightIds.size;
  document.getElementById("createBundleButton").disabled=state.selectedFlightIds.size<2;
  document.getElementById("addToTripButton").disabled=state.selectedFlightIds.size<1;
  document.getElementById("deleteSelectedFlightsButton").disabled=state.selectedFlightIds.size<1;
  document.getElementById("organizeFlightsButton").classList.toggle("active",state.recordSelectionMode);
}
function setRecordSelectionMode(active) {
  state.recordSelectionMode=Boolean(active);
  if(active){
    state.recordBatchScope="completed";
    state.editingTripId=null;
    state.editingTripFlightIds.clear();
    state.editingBundleId=null;
    state.editingBundleFlightIds.clear();
  }
  if(!active)state.selectedFlightIds.clear();
  updateRecordBulkToolbar();renderFlights();
}
function selectedFlights() {
  return flights.filter(f=>state.selectedFlightIds.has(String(f.id)));
}
function ownFlights() {
  return [...new Set([...flights,...plannedIncomingFlights])];
}
function flightsForScope(scope) {
  return scope==="incoming"?incomingFlights():flights;
}
function recordStatusForFlight(f) {
  return plannedIncomingFlights.includes(f)||f.recordStatus==="upcoming"?"upcoming":"completed";
}
function openTripEditor(tripId,scope="completed") {
  const items=ownFlights().filter(f=>{
    const trip=flightTrip(f);
    return trip&&String(trip.id||trip.label)===String(tripId);
  });
  const trip=flightTrip(items[0]);
  if(!trip||!items.length)return;
  state.recordBatchScope=scope;
  state.editingTripId=trip.id||tripId;
  state.editingTripFlightIds=new Set(items.map(f=>String(f.id)));
  state.editingBundleId=null;
  state.editingBundleFlightIds.clear();
  document.getElementById("tripModalTitle").textContent=t("editTrip");
  document.getElementById("saveTripButton").textContent=t("updateTrip");
  document.getElementById("tripLabelInput").value=trip.label||"";
  document.getElementById("tripStartInput").value=trip.start||items.map(f=>f.date).sort()[0]||"";
  document.getElementById("tripEndInput").value=trip.end||items.map(f=>f.date).sort().at(-1)||"";
  openModal("tripModal");
}
function batchSelectedFlights() {
  if(state.editingTripId)return ownFlights().filter(f=>state.editingTripFlightIds.has(String(f.id)));
  if(state.editingBundleId)return ownFlights().filter(f=>state.editingBundleFlightIds.has(String(f.id)));
  return state.recordBatchScope==="incoming"
    ? incomingFlights().filter(f=>state.selectedIncomingIds.has(String(f.id)))
    : selectedFlights();
}
async function saveFlightBatch(items) {
  if(!window.flightArchiveData?.enabled)return;
  const saved=await Promise.all(items.map(f=>window.flightArchiveData.saveFlight(f,recordStatusForFlight(f))));
  saved.forEach((row,index)=>Object.assign(items[index],row));
}
async function saveSelectedBundle() {
  const items=batchSelectedFlights(),totalRaw=document.getElementById("bundleTotalInput").value,total=Number(totalRaw);
  if(items.length<2||totalRaw===""||!Number.isFinite(total)||total<0){showToast(t("saveFailed"),t("bundleRequired"));return;}
  const groupId=state.editingBundleId||crypto.randomUUID();
  items.sort((a,b)=>String(a.date).localeCompare(String(b.date))).forEach((f,index)=>{
    f.fareGroup=groupId;f.fare=index===0?total:null;f.fareRaw=index===0?String(total):null;
  });
  try{await saveFlightBatch(items);closeModals();finishBatchEditing();renderStats();renderIncomingFlights();showToast(t("bundle"),t("recordUpdated"));}
  catch(error){showToast(t("saveFailed"),error?.message||String(error));}
}
async function saveSelectedTrip() {
  const items=batchSelectedFlights(),label=document.getElementById("tripLabelInput").value.trim(),start=document.getElementById("tripStartInput").value,end=document.getElementById("tripEndInput").value;
  if(!items.length||!label||!start||!end||start>end){showToast(t("saveFailed"),t("tripRequired"));return;}
  const trip={id:state.editingTripId||crypto.randomUUID(),label,start,end};
  items.forEach(f=>{f.metadata={...(f.metadata||{}),trip};});
  try{await saveFlightBatch(items);closeModals();finishBatchEditing();renderFlights();renderStats();renderIncomingFlights();showToast(t("tripLabel"),t("recordUpdated"));}
  catch(error){showToast(t("saveFailed"),error?.message||String(error));}
}
function finishBatchEditing() {
  state.editingTripId=null;
  state.editingTripFlightIds.clear();
  state.editingBundleId=null;
  state.editingBundleFlightIds.clear();
  if(state.recordBatchScope==="incoming"){
    state.selectedIncomingIds.clear();
    updateIncomingBulkToolbar();
    renderIncomingFlights();
  }else{
    state.selectedFlightIds.clear();
    updateRecordBulkToolbar();
    renderFlights();
  }
}
function openBundleForScope(scope) {
  state.recordBatchScope=scope;
  state.editingTripId=null;
  state.editingTripFlightIds.clear();
  state.editingBundleId=null;
  state.editingBundleFlightIds.clear();
  if(batchSelectedFlights().length<2)return;
  document.getElementById("bundleModalTitle").textContent=t("createBundle");
  document.getElementById("saveBundleButton").textContent=t("saveBundle");
  document.getElementById("bundleTotalInput").value="";
  openModal("bundleModal");
}
function openBundleEditorForFlight(f) {
  if(!f?.fareGroup)return;
  const items=ownFlights().filter(item=>String(item.fareGroup)===String(f.fareGroup));
  if(items.length<2)return;
  state.recordBatchScope=recordStatusForFlight(f)==="upcoming"?"incoming":"completed";
  state.editingTripId=null;
  state.editingTripFlightIds.clear();
  state.editingBundleId=f.fareGroup;
  state.editingBundleFlightIds=new Set(items.map(item=>String(item.id)));
  document.getElementById("bundleModalTitle").textContent=t("editBundle");
  document.getElementById("saveBundleButton").textContent=t("updateBundle");
  document.getElementById("bundleTotalInput").value=String(items.reduce((sum,item)=>sum+(Number(item.fare)||0),0));
  closeModals();
  openModal("bundleModal");
}
function openTripForScope(scope) {
  state.recordBatchScope=scope;
  state.editingTripId=null;
  state.editingTripFlightIds.clear();
  state.editingBundleId=null;
  state.editingBundleFlightIds.clear();
  const items=batchSelectedFlights();
  if(!items.length)return;
  const dates=items.map(f=>f.date).sort();
  document.getElementById("tripModalTitle").textContent=t("addToTrip");
  document.getElementById("saveTripButton").textContent=t("saveTrip");
  document.getElementById("tripLabelInput").value="";
  document.getElementById("tripStartInput").value=dates[0]||"";
  document.getElementById("tripEndInput").value=dates.at(-1)||"";
  openModal("tripModal");
}
function editSelectedIncomingTrip() {
  const trips=[...new Set(incomingFlights().filter(f=>state.selectedIncomingIds.has(String(f.id))).map(f=>flightTrip(f)?.id||flightTrip(f)?.label).filter(Boolean))];
  if(trips.length!==1){showToast(t("editTrip"),t("selectOneTrip"));return;}
  openTripEditor(trips[0],"incoming");
}
async function deleteSelectedForScope(scope) {
  const ids=scope==="incoming"?state.selectedIncomingIds:state.selectedFlightIds;
  const items=flightsForScope(scope).filter(f=>ids.has(String(f.id)));
  if(!items.length)return;
  const message=t("confirmBulkDelete").replace("{count}",String(items.length));
  if(!window.confirm(message))return;
  try{
    if(window.flightArchiveData?.enabled){
      await Promise.all(items.filter(f=>/^[0-9a-f-]{36}$/i.test(String(f.id))).map(f=>window.flightArchiveData.deleteFlight(f.id)));
    }
    items.forEach(f=>{
      let index=flights.indexOf(f);if(index>=0)flights.splice(index,1);
      index=plannedIncomingFlights.indexOf(f);if(index>=0)plannedIncomingFlights.splice(index,1);
    });
    ids.clear();
    rebuildRoutes();
    updateRecordBulkToolbar();updateIncomingBulkToolbar();renderFlights();renderStats();renderIncomingFlights();drawGlobe();
    showToast(t("recordDeleted"),`${items.length} ${t("selectedFlights")}`);
  }catch(error){showToast(t("saveFailed"),error?.message||String(error));}
}

function openFlight(id,{returnStatsType=null,returnStatsFriend=false}={}) {
  const friendFlights=[...(state.friendRecords?.records||[]),...(state.friendRecords?.incomingFlights||[]),...(state.friendRecords?.statisticsFlights||[])];
  const f = [...flights,...plannedIncomingFlights,...friendFlights].find(item => String(item.id) === String(id));
  if (!f) return;
  const ownFlight=flights.includes(f)||plannedIncomingFlights.includes(f);
  const friendFlight=friendFlights.includes(f);
  state.activeFlightId=f.id;
  state.statsReturnType=returnStatsType;
  state.statsReturnFriend=Boolean(returnStatsFriend);
  document.getElementById("editFlightButton").hidden=!ownFlight;
  document.getElementById("deleteFlightButton").hidden=!ownFlight;
  const statsBackButton=document.getElementById("detailBackToStats");
  statsBackButton.hidden=!returnStatsType;
  if(returnStatsType){
    const returnTitle={time:t("totalTime"),distance:t("totalDistance"),aircraft:t("aircraftTypes"),airlines:t("airlinesFlown"),countries:t("countriesRegions"),routes:t("directedRoutes"),cities:t("citiesVisited"),fare:t("totalFare")}[returnStatsType];
    document.getElementById("detailBackToStatsLabel").textContent=state.lang==="zh"?`${t("backToStatisticsDetail")}${returnTitle}`:`${t("backToStatisticsDetail")} ${returnTitle}`;
  }
  const from = airports[f.from], to = airports[f.to];
  const set = (id, value) => document.getElementById(id).textContent = value;
  const detailAirlineIcon=airlineIconSource(f.airlineShort,f?.metadata?.airline_icao||f?.airlineIcao||"",f.airline);
  document.getElementById("detailLogo").innerHTML = detailAirlineIcon ? `<img src="${detailAirlineIcon}" alt="${f.airline} logo" />` : f.airlineShort;
  set("detailAirline", localizedAirlineName(f)); set("detailTitle", f.flightNo); set("detailDate", formatDate(f.date));
  set("detailFromCode", f.from); set("detailFromCity", `${compactAirportName(from)} · ${f.terminalFrom}`); set("detailDeparture", f.depart);
  set("detailToCode", f.to); set("detailToCity", `${compactAirportName(to)} · ${f.terminalTo}`); set("detailArrival", f.arrive);
  set("detailDuration", f.duration); set("detailDistance", `${formatNumber(f.distance)} km`); set("detailNote", f.note || t("noNotes"));
  const aircraftVisualData=aircraftVisualForFlight(f);
  const aircraftVisual=document.getElementById("detailAircraftVisual");
  aircraftVisual.hidden=!aircraftVisualData;
  if(aircraftVisualData){
    const aircraftImage=document.getElementById("detailAircraftImage");
    aircraftImage.src=aircraftVisualData.src;
    aircraftImage.alt=t(aircraftVisualData.altKey);
  }
  document.getElementById("detailInfoGrid").innerHTML = [
    [t("aircraft"), f.aircraft], [t("registration"), f.registration || "—"], [t("seat"), f.seat],
    [t("cabin"), displayCabin(f.cabin)], [t("fare"), f.fareGroup?`${formatFare(bundleTotalForFlight(f,friendFlight?friendFlights:ownFlights()))} (${t("bundle")})`:formatFare(f.fare)], [t("gate"), f.gate || "—"]
  ].map(([key,value]) => `<div><span>${key}</span><strong>${value}</strong></div>`).join("");
  const trip=flightTrip(f),tripPanel=document.getElementById("detailTrip");
  tripPanel.hidden=!trip;
  if(trip){
    document.getElementById("detailTripLabel").textContent=trip.label;
    document.getElementById("detailTripPeriod").textContent=`${formatDate(trip.start)} — ${formatDate(trip.end)}`;
  }
  const linkedActions=document.getElementById("detailLinkedActions");
  const editTripButton=document.getElementById("editDetailTripButton");
  const editBundleButton=document.getElementById("editDetailBundleButton");
  linkedActions.hidden=!ownFlight||(!trip&&!f.fareGroup);
  editTripButton.hidden=!trip;
  editBundleButton.hidden=!f.fareGroup;
  openModal("detailModal");
}

function drawerFlightMarkup(f,highlighted=false) {
  return `<article class="drawer-flight${highlighted?" highlighted":""}" data-drawer-flight="${f.id}">
    <div class="drawer-flight-top">
      <div class="drawer-flight-identity">${iconMarkup(f,"drawer-airline-icon")}<strong>${f.flightNo} · ${escapeHtml(localizedAirlineName(f))}</strong></div>
      <span>${formatDate(f.date)}</span>
    </div>
    <div class="drawer-flight-route">
      <div><b>${f.from}</b><small>${f.depart}</small></div><i></i><div><b>${f.to}</b><small>${f.arrive}</small></div>
    </div>
  </article>`;
}

function departureDateTime(f) {
  const time=/^\d{1,2}:\d{2}$/.test(f.depart||"")?f.depart:"23:59";
  return new Date(`${f.date}T${time}:00`);
}
function incomingFlights() {
  const now=new Date(),seen=new Set();
  return [...plannedIncomingFlights,...flights].filter(f=>{
    const key=`${f.date}|${f.flightNo}|${f.from}|${f.to}`;
    if(seen.has(key)||!f.date||!airports[f.from]||!airports[f.to])return false;
    seen.add(key);
    return departureDateTime(f)>now;
  }).sort((a,b)=>departureDateTime(a)-departureDateTime(b));
}
function routeIdForFlight(f) {
  return [f.from,f.to].sort().join("-").toLowerCase();
}
function activeMapFlights() {
  if(state.friendRecords?.mapVisible){
    return state.friendRecords.contentMode==="incoming"
      ? state.friendRecords.incomingFlights
      : state.friendRecords.records;
  }
  return state.incomingMode?incomingFlights():flights;
}
function activeMapRoutes() {
  if(!state.incomingMode&&!state.friendRecords?.mapVisible)return routes;
  const routeMap=new Map();
  activeMapFlights().forEach(f=>{
    const id=routeIdForFlight(f);
    if(!routeMap.has(id))routeMap.set(id,{id,from:f.from,to:f.to,count:0,distanceTotal:0});
    const route=routeMap.get(id);route.count+=1;route.distanceTotal+=Number(f.distance)||0;
  });
  return [...routeMap.values()].map(route=>({
    id:route.id,from:route.from,to:route.to,count:route.count,
    distance:route.count?Math.round(route.distanceTotal/route.count):0
  }));
}
function activeVisitedCountries() {
  if(!state.friendRecords?.mapVisible)return visitedCountries;
  const result=new Set();
  // Incoming flights may point to future destinations. Keep a friend's country
  // shading tied to completed records so places they have not visited stay neutral.
  // Do not derive the shading from records that the friend marked as private.
  const countryFlights=state.friendRecords.privacy?.records===false
    ? []
    : (state.friendRecords.records||[]);
  countryFlights.forEach(f=>[airports[f.from],airports[f.to]].forEach(airport=>{
    const country=geoCountryName(airport);
    if(country)result.add(country);
  }));
  return result;
}
function incomingRemainingLabel(f) {
  const days=Math.max(0,Math.ceil((departureDateTime(f)-new Date())/86400000));
  if(days===0)return t("today");
  if(days===1)return t("tomorrow");
  return `${days} ${t("days")}`;
}
function incomingFlightMarkup(f,index) {
  const trip=flightTrip(f);
  return `<article class="incoming-flight" data-incoming-index="${index}" role="button" tabindex="0">
    ${state.incomingSelectionMode?`<label class="incoming-flight-select"><input type="checkbox" data-select-incoming="${f.id}" ${state.selectedIncomingIds.has(String(f.id))?"checked":""} /><span></span></label>`:""}
    <div class="incoming-flight-top">${iconMarkup(f,"incoming-airline-icon")}<span><strong>${f.flightNo}</strong><small>${escapeHtml(localizedAirlineName(f))}</small></span></div>
    <div class="incoming-flight-route"><strong>${f.from}</strong><i></i><strong>${f.to}</strong><b>${incomingRemainingLabel(f)}</b></div>
    <p>${formatDate(f.date)} · ${f.depart || "—"}</p>
    ${(f.fareGroup||trip)?`<div class="incoming-flight-tags">${f.fareGroup?`<span>${escapeHtml(formatFare(bundleTotalForFlight(f)))} · ${t("bundle")}</span>`:""}${trip?`<span>${escapeHtml(trip.label)}</span>`:""}</div>`:""}
  </article>`;
}
function renderIncomingFlights() {
  const list=incomingFlights();
  const summary=document.getElementById("incomingSummary"),container=document.getElementById("incomingList");
  if(!summary||!container)return;
  summary.textContent=`${list.length} ${t("upcomingCount")}`;
  container.innerHTML=list.length?list.map(incomingFlightMarkup).join(""):`<div class="incoming-empty"><span>✈</span><p>${t("noIncoming")}</p></div>`;
  container.classList.toggle("selection-mode",state.incomingSelectionMode);
  container.querySelectorAll("[data-incoming-index]").forEach(card=>card.addEventListener("click",()=>{
    if(state.incomingSelectionMode)return;
    const flight=list[Number(card.dataset.incomingIndex)];
    if(flight)openFlight(flight.id);
  }));
  container.querySelectorAll(".incoming-flight-select").forEach(label=>label.addEventListener("click",event=>event.stopPropagation()));
  container.querySelectorAll("[data-select-incoming]").forEach(input=>input.addEventListener("change",()=>{
    const id=String(input.dataset.selectIncoming);
    if(input.checked)state.selectedIncomingIds.add(id);else state.selectedIncomingIds.delete(id);
    updateIncomingBulkToolbar();
  }));
}
function updateIncomingBulkToolbar() {
  document.getElementById("incomingBulkToolbar").hidden=!state.incomingSelectionMode;
  document.getElementById("selectedIncomingCount").textContent=state.selectedIncomingIds.size;
  const selected=incomingFlights().filter(f=>state.selectedIncomingIds.has(String(f.id)));
  const tripIds=[...new Set(selected.map(f=>flightTrip(f)?.id||flightTrip(f)?.label).filter(Boolean))];
  document.getElementById("incomingCreateBundleButton").disabled=selected.length<2;
  document.getElementById("incomingAddToTripButton").disabled=selected.length<1;
  document.getElementById("incomingEditTripButton").disabled=tripIds.length!==1;
  document.getElementById("incomingDeleteSelectedButton").disabled=selected.length<1;
  document.getElementById("incomingOrganizeButton").classList.toggle("active",state.incomingSelectionMode);
}
function setIncomingSelectionMode(active) {
  state.incomingSelectionMode=Boolean(active);
  state.recordBatchScope="incoming";
  state.editingTripId=null;
  state.editingTripFlightIds.clear();
  state.editingBundleId=null;
  state.editingBundleFlightIds.clear();
  if(!active)state.selectedIncomingIds.clear();
  updateIncomingBulkToolbar();
  renderIncomingFlights();
}
function estimateAirportDistance(from,to) {
  const a=airports[from],b=airports[to];
  if(!a||!b)return 0;
  const lat1=rad(a.lat),lat2=rad(b.lat),deltaLat=lat2-lat1,deltaLon=rad(b.lon-a.lon);
  const hav=Math.sin(deltaLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(deltaLon/2)**2;
  return Math.round(6371*2*Math.atan2(Math.sqrt(hav),Math.sqrt(1-hav)));
}
function prepareIncomingForm() {
  state.editingIncomingId=null;
  const form=document.getElementById("incomingFlightForm");
  form.reset();
  const today=new Date(),tomorrow=new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  document.getElementById("incomingDate").min=inputDateValue(today);
  document.getElementById("incomingDate").value=inputDateValue(tomorrow);
  document.getElementById("incomingDepart").value="09:00";
  document.getElementById("incomingCabinSelect").value=t("economy");
  resetFlightLookup("incoming",inputDateValue(tomorrow));
  openModal("incomingAddModal");
}
function prepareIncomingEditForm(id) {
  const flight=plannedIncomingFlights.find(item=>String(item.id)===String(id));
  if(!flight)return;
  state.editingIncomingId=flight.id;
  const form=document.getElementById("incomingFlightForm");
  form.reset();
  document.getElementById("incomingDate").min=inputDateValue(new Date());
  setFormValue("incomingDate",flight.date);
  setFormValue("incomingFlightNo",flight.flightNo);
  setFormValue("incomingFrom",flight.from);
  setFormValue("incomingTo",flight.to);
  setFormValue("incomingDepart",timeInputValue(flight.depart));
  setFormValue("incomingArrive",timeInputValue(flight.arrive));
  setFormValue("incomingAircraft",flight.aircraft==="—"?"":flight.aircraft);
  setFormValue("incomingRegistration",flight.registration==="—"?"":flight.registration);
  setFormValue("incomingDistance",flight.distance);
  setFormValue("incomingTerminalFrom",flight.terminalFrom==="—"?"":flight.terminalFrom);
  setFormValue("incomingTerminalTo",flight.terminalTo==="—"?"":flight.terminalTo);
  setFormValue("incomingGate",flight.gate==="—"?"":flight.gate);
  setFormValue("incomingSeat",flight.seat==="—"?"":flight.seat);
  setFormValue("incomingFare",Number.isFinite(flight.fare)?flight.fare:"");
  setFormValue("incomingNote",flight.note);
  document.getElementById("incomingCabinSelect").value=displayCabin(flight.cabin);
  showFlightEntryStep("incoming","manual");
  openModal("incomingAddModal");
}
function saveIncomingFlight() {
  const date=document.getElementById("incomingDate").value;
  const flightNo=document.getElementById("incomingFlightNo").value.trim().toUpperCase();
  const depart=document.getElementById("incomingDepart").value;
  const arrive=document.getElementById("incomingArrive").value;
  const from=airportCodeFromInput(document.getElementById("incomingFrom").value,"");
  const to=airportCodeFromInput(document.getElementById("incomingTo").value,"");
  if(!date||!flightNo||!from||!to||!depart||!arrive){
    showToast(t("addIncomingFlight"),t("manualRequiredFields"));
    return false;
  }
  if(!airports[from]||!airports[to]){
    showToast(t("addIncomingFlight"),t("invalidAirportCode"));
    return false;
  }
  document.getElementById("incomingFrom").value=from;
  document.getElementById("incomingTo").value=to;
  const candidate={date,depart};
  if(!date||!depart||departureDateTime(candidate)<=new Date()){
    showToast(t("addIncomingFlight"),t("futureFlightRequired"));
    return false;
  }
  const existing=plannedIncomingFlights.find(item=>String(item.id)===String(state.editingIncomingId));
  const flightIdentity=airlineFromFlightNumber(flightNo,existing?.airline||"");
  const calculated=calculateFlightDuration(date,depart,from,arrive,to);
  if(calculated.error){showToast(t("addIncomingFlight"),t(calculated.error));return false;}
  const distanceInput=Number(document.getElementById("incomingDistance").value);
  const fareValue=document.getElementById("incomingFare").value;
  const flight={
    id:existing?.id||crypto.randomUUID(),
    from,to,date,depart,arrive,
    airline:flightIdentity.airlineName,
    airlineShort:flightIdentity.airlineShort,flightNo:flightIdentity.flightNo,
    aircraft:document.getElementById("incomingAircraft").value.trim()||"—",
    registration:document.getElementById("incomingRegistration").value.trim()||"—",
    duration:calculated.text,durationMinutes:calculated.minutes,
    distance:distanceInput>0?Math.round(distanceInput):estimateAirportDistance(from,to),
    terminalFrom:document.getElementById("incomingTerminalFrom").value.trim()||"—",
    terminalTo:document.getElementById("incomingTerminalTo").value.trim()||"—",
    seat:document.getElementById("incomingSeat").value.trim()||"—",
    cabin:document.getElementById("incomingCabinSelect").value||t("economy"),
    fare:fareValue===""?(existing?.fare??null):Math.max(0,Number(fareValue)),fareCurrency:existing?.fareCurrency||state.currency,
    fareRaw:fareValue||existing?.fareRaw||null,fareGroup:existing?.fareGroup||null,
    gate:document.getElementById("incomingGate").value.trim()||"—",
    note:document.getElementById("incomingNote").value.trim(),
    scope:effectiveFlightScope({from,to}),
    custom:true,recordStatus:"upcoming",metadata:{...(existing?.metadata||{}),airline_icao:flightIdentity.airlineIcao||existing?.metadata?.airline_icao||null,arrival_date:calculated.arrivalDate,duration_calculated:true}
  };
  if(existing)Object.assign(existing,flight);else plannedIncomingFlights.push(flight);
  if(window.flightArchiveData?.enabled){
    window.flightArchiveData.saveFlight(existing||flight,"upcoming")
      .then(savedFlight=>Object.assign(existing||flight,savedFlight))
      .catch(error=>showToast(state.lang==="zh"?"同步失败":"Sync failed",error.message));
  }
  state.editingIncomingId=null;
  renderIncomingFlights();drawGlobe();
  return true;
}
function setIncomingMode(active) {
  if(active&&state.activeView!=="atlas")setView("atlas");
  const shell=document.getElementById("appShell");
  if(active&&!state.incomingMode)shell.dataset.sidebarBeforeIncoming=String(shell.classList.contains("sidebar-collapsed"));
  state.incomingMode=active;
  if(active){
    state.mapMode="route";
    document.getElementById("routeMode").classList.add("active");
    document.getElementById("airportMode").classList.remove("active");
  }
  shell.classList.toggle("incoming-mode",active);
  if(active)shell.classList.add("sidebar-collapsed");
  if(!active){
    shell.classList.toggle("sidebar-collapsed",shell.dataset.sidebarBeforeIncoming==="true");
    delete shell.dataset.sidebarBeforeIncoming;
    shell.classList.remove("incoming-collapsed");
    state.incomingSelectionMode=false;
    state.selectedIncomingIds.clear();
    updateIncomingBulkToolbar();
  }
  document.getElementById("incomingSidebar").setAttribute("aria-hidden",String(!active));
  setSettingsOpen(false);closeDrawer();renderIncomingFlights();drawGlobe();
}

function openRouteDrawer(route) {
  state.selectedRoute = route; state.selectedAirport = null; state.selectedCountry = null;
  const from = airports[route.from], to = airports[route.to];
  const mapFlights=activeMapFlights();
  let related = mapFlights.filter(f => (f.routeId||routeIdForFlight(f)) === route.id);
  if (!related.length) related = mapFlights.filter(f => [f.from,f.to].includes(route.from) || [f.from,f.to].includes(route.to)).slice(0,3);
  document.getElementById("drawerContent").innerHTML = `
    <span class="drawer-kicker">${t("route")}</span>
    <h2 class="drawer-title">${airportCity(from)} — ${airportCity(to)}</h2>
    <p class="drawer-subtitle">${route.from} / ${airportName(from)}<br>${route.to} / ${airportName(to)}</p>
    <div class="drawer-metrics">
      <div><strong>${route.count}</strong><span>${t("flightsRecorded")}</span></div>
      <div><strong>${formatNumber(route.distance)} km</strong><span>${t("oneWayDistance")}</span></div>
    </div>
    <h3 class="drawer-section-title">${t("relatedFlights")}</h3>
    ${related.map(f=>drawerFlightMarkup(f)).join("")}
  `;
  document.querySelectorAll("[data-drawer-flight]").forEach(el => el.addEventListener("click", () => openFlight(el.dataset.drawerFlight)));
  document.getElementById("infoDrawer").classList.add("open");
  drawGlobe();
}

function openAirportDrawer(code) {
  const airport = airports[code];
  if (!airport) return;
  state.selectedAirport = code; state.selectedRoute = null; state.selectedCountry = null;
  const relatedFlights = activeMapFlights().filter(f => f.from === code || f.to === code);
  const connections = activeMapRoutes().filter(r => r.from === code || r.to === code);
  document.getElementById("drawerContent").innerHTML = `
    <span class="drawer-kicker">${t("airport")}</span>
    <h2 class="drawer-title">${airport.code}</h2>
    <p class="drawer-subtitle">${airportName(airport)}<br>${airportCity(airport)}, ${airportCountry(airport)}${state.hubs.has(code) ? ` · ${t("hub")}` : ""}</p>
    <div class="drawer-metrics">
      <div><strong>${relatedFlights.length}</strong><span>${t("recordedSegments")}</span></div>
      <div><strong>${airport.lat.toFixed(2)}°, ${airport.lon.toFixed(2)}°</strong><span>${t("coordinates")}</span></div>
    </div>
    <h3 class="drawer-section-title">${t("pastFlights")}</h3>
    ${relatedFlights.length?relatedFlights.map(f=>drawerFlightMarkup(f)).join(""):`<p class="drawer-subtitle">${t("noRecords")}</p>`}
    <h3 class="drawer-section-title">${t("connections")}</h3>
    <div class="connection-list">
      ${connections.length ? connections.map(r => {
        const other = r.from === code ? airports[r.to] : airports[r.from];
        return `<button data-connection="${r.id}"><span>${airportCity(airport)} — ${airportCity(other)}</span><b>${r.count} ${t("times")}</b></button>`;
      }).join("") : `<p class="drawer-subtitle">${t("noConnections")}</p>`}
    </div>
  `;
  document.querySelectorAll("[data-connection]").forEach(el => el.addEventListener("click", () => {
    const route = activeMapRoutes().find(r => r.id === el.dataset.connection);
    if (route) openRouteDrawer(route);
  }));
  document.querySelectorAll("[data-drawer-flight]").forEach(el => el.addEventListener("click", () => openFlight(el.dataset.drawerFlight)));
  document.getElementById("infoDrawer").classList.add("open");
  drawGlobe();
}

function openCountryDrawer(countryName) {
  const relatedFlights=activeMapFlights().filter(f=>
    geoCountryName(airports[f.from])===countryName||geoCountryName(airports[f.to])===countryName
  );
  const countryAirports=new Set();
  relatedFlights.forEach(f=>{
    if(geoCountryName(airports[f.from])===countryName)countryAirports.add(f.from);
    if(geoCountryName(airports[f.to])===countryName)countryAirports.add(f.to);
  });
  const sampleAirport=Object.values(airports).find(airport=>geoCountryName(airport)===countryName);
  const localizedName=sampleAirport?.countryCode?displayName("region",sampleAirport.countryCode):countryName;
  state.selectedCountry=countryName;state.selectedAirport=null;state.selectedRoute=null;
  document.getElementById("drawerContent").innerHTML=`
    <span class="drawer-kicker">${t("country")}</span>
    <h2 class="drawer-title">${escapeHtml(localizedName)}</h2>
    <p class="drawer-subtitle">${t("countryFlights")}</p>
    <div class="drawer-metrics">
      <div><strong>${relatedFlights.length}</strong><span>${t("flightsRecorded")}</span></div>
      <div><strong>${countryAirports.size}</strong><span>${t("involvedAirports")}</span></div>
    </div>
    <h3 class="drawer-section-title">${t("relatedFlights")}</h3>
    ${relatedFlights.length?relatedFlights.map(f=>drawerFlightMarkup(f)).join(""):`<p class="drawer-subtitle">${t("noRecords")}</p>`}
  `;
  document.querySelectorAll("[data-drawer-flight]").forEach(el=>el.addEventListener("click",()=>openFlight(el.dataset.drawerFlight)));
  document.getElementById("infoDrawer").classList.add("open");
  drawGlobe();
}

function closeDrawer() {
  document.getElementById("infoDrawer").classList.remove("open");
  state.selectedAirport = null; state.selectedRoute = null; state.selectedCountry = null;
  drawGlobe();
}

function friendInitial(profile) {
  return String(profile.username||profile.display_name||"?").trim().charAt(0).toUpperCase()||"?";
}
function friendAvatarMarkup(profile,className="friend-avatar") {
  return profile.avatar_url
    ? `<b class="${className}" data-friend-initial="${escapeHtml(friendInitial(profile))}"><img src="${escapeHtml(profile.avatar_url)}" alt="" loading="lazy" data-avatar-image /></b>`
    : `<b class="${className}">${escapeHtml(friendInitial(profile))}</b>`;
}
function friendCardMarkup(profile,mode="friend") {
  const displayName=profile.username||profile.display_name||"Flight Archive user";
  const secondary=profile.email||"";
  let actions="";
  if(mode==="search"){
    const connected=profile.status==="accepted",pending=profile.status==="pending",disabled=connected||pending;
    actions=`<button class="primary" type="button" data-add-friend="${profile.user_id}" ${disabled?"disabled":""}>${t(connected?"friendsSince":pending?"requestPending":"addFriend")}</button>`;
  }else if(mode==="incoming"){
    actions=`<button class="primary" type="button" data-respond-friend="${profile.friendship_id}" data-accept="true">${t("accept")}</button><button type="button" data-respond-friend="${profile.friendship_id}" data-accept="false">${t("decline")}</button>`;
  }else if(mode==="outgoing"){
    actions=`<button type="button" disabled>${t("requestPending")}</button>`;
  }else{
    actions=`<button class="primary" type="button" data-view-friend="${profile.user_id}">${t("viewFlights")}</button>
      <span class="friend-more"><button class="friend-more-button" type="button" aria-label="${t("moreActions")}">•••</button><span class="friend-more-menu"><button class="danger" type="button" data-remove-friend="${profile.friendship_id}">${t("removeFriend")}</button></span></span>`;
  }
  const identity=mode==="friend"
    ? `<button class="friend-profile-link" type="button" data-view-friend="${profile.user_id}">${friendAvatarMarkup(profile)}<span class="friend-copy"><strong>${escapeHtml(displayName)}</strong>${secondary?`<small>${escapeHtml(secondary)}</small>`:""}</span></button>`
    : `${friendAvatarMarkup(profile)}<span class="friend-copy"><strong>${escapeHtml(displayName)}</strong>${secondary?`<small>${escapeHtml(secondary)}</small>`:""}</span>`;
  return `<article class="friend-card">
    ${identity}
    <span class="friend-actions">${actions}</span>
  </article>`;
}
function bindFriendAvatarFallbacks(container=document) {
  container.querySelectorAll("[data-avatar-image]").forEach(image=>image.addEventListener("error",()=>{
    const wrapper=image.closest("[data-friend-initial]");
    if(wrapper)wrapper.textContent=wrapper.dataset.friendInitial||"?";
  },{once:true}));
}
function bindFriendActions(container=document) {
  bindFriendAvatarFallbacks(container);
  container.querySelectorAll("[data-add-friend]").forEach(button=>button.addEventListener("click",async()=>{
    try{
      await window.flightArchiveData.sendFriendRequest(button.dataset.addFriend);
      showToast(t("requestSent"),t("requestPending"));
      await searchFriends();
      await loadFriends();
    }catch(error){showToast(t("saveFailed"),error?.message||String(error));}
  }));
  container.querySelectorAll("[data-respond-friend]").forEach(button=>button.addEventListener("click",async()=>{
    try{
      await window.flightArchiveData.respondFriendRequest(button.dataset.respondFriend,button.dataset.accept==="true");
      showToast(t("friendshipUpdated"),t("friendshipUpdated"));
      await loadFriends();
    }catch(error){showToast(t("saveFailed"),error?.message||String(error));}
  }));
  container.querySelectorAll("[data-remove-friend]").forEach(button=>button.addEventListener("click",async()=>{
    try{
      await window.flightArchiveData.removeFriend(button.dataset.removeFriend);
      await loadFriends();
    }catch(error){showToast(t("saveFailed"),error?.message||String(error));}
  }));
  container.querySelectorAll("[data-view-friend]").forEach(button=>button.addEventListener("click",()=>openFriendRecords(button.dataset.viewFriend)));
}
let friendSearchRequest=0;
async function searchFriends() {
  const query=document.getElementById("friendSearchInput").value.trim();
  const container=document.getElementById("friendSearchResults");
  const request=++friendSearchRequest;
  if(!query){container.innerHTML="";state.friendSearchResults=[];return;}
  try{
    const results=await window.flightArchiveData.searchUsers(query);
    if(request!==friendSearchRequest)return;
    state.friendSearchResults=results;
    container.innerHTML=state.friendSearchResults.length
      ? state.friendSearchResults.map(profile=>friendCardMarkup(profile,"search")).join("")
      : `<div class="friends-empty">${t("noSearchResults")}</div>`;
    bindFriendActions(container);
  }catch(error){
    if(request!==friendSearchRequest)return;
    container.innerHTML=`<div class="friends-empty">${escapeHtml(error?.message||String(error))}</div>`;
  }
}
async function loadFriends() {
  if(!window.flightArchiveData?.enabled)return;
  try{
    state.friends=await window.flightArchiveData.listFriends();
    const incoming=state.friends.filter(item=>item.status==="pending"&&item.direction==="incoming");
    const outgoing=state.friends.filter(item=>item.status==="pending"&&item.direction==="outgoing");
    const accepted=state.friends.filter(item=>item.status==="accepted");
    const requests=document.getElementById("friendRequestsList");
    requests.innerHTML=(incoming.length||outgoing.length)
      ? `${incoming.map(item=>friendCardMarkup(item,"incoming")).join("")}${outgoing.map(item=>friendCardMarkup(item,"outgoing")).join("")}`
      : `<div class="friends-empty">${t("noFriendRequests")}</div>`;
    const list=document.getElementById("friendsList");
    list.innerHTML=accepted.length?accepted.map(item=>friendCardMarkup(item,"friend")).join(""):`<div class="friends-empty">${t("noFriends")}</div>`;
    bindFriendActions(requests);
    bindFriendActions(list);
  }catch(error){
    document.getElementById("friendsList").innerHTML=`<div class="friends-empty">${escapeHtml(error?.message||String(error))}</div>`;
  }
}
function friendArchiveFlights(content=state.friendRecords?.contentMode||"records") {
  if(!state.friendRecords)return [];
  return content==="incoming"?state.friendRecords.incomingFlights:state.friendRecords.records;
}
function friendFlightSearchText(f) {
  const from=airports[f.from],to=airports[f.to];
  return normalizedSearchText([
    f.flightNo,f.airline,localizedAirlineName(f),f.aircraft,f.registration,
    f.from,f.to,from&&airportName(from),to&&airportName(to),
    from&&airportCity(from),to&&airportCity(to)
  ].filter(Boolean).join(" "));
}
function filteredFriendFlights(mode="list") {
  if(!state.friendRecords)return [];
  const filters=state.friendRecords.filters?.[mode]||{year:"all",scope:"all",search:""};
  const source=mode==="stats"?state.friendRecords.statisticsFlights:friendArchiveFlights();
  const query=normalizedSearchText(filters.search||"");
  return source.filter(f=>{
    const yearOk=filters.year==="all"||String(f.date||"").startsWith(filters.year);
    const scopeOk=filters.scope==="all"||effectiveFlightScope(f)===filters.scope;
    return yearOk&&scopeOk&&(!query||friendFlightSearchText(f).includes(query));
  });
}
function friendFareMarkup(f) {
  if(!f.fareGroup)return `<strong>${formatFare(f.fare)}</strong>`;
  const source=[...(state.friendRecords?.records||[]),...(state.friendRecords?.incomingFlights||[])];
  return `<strong>${formatFare(bundleTotalForFlight(f,source))}</strong><small>${t("bundle")}</small>`;
}
function friendFlightMarkup(f) {
  const from=airports[f.from],to=airports[f.to];
  const duration=f.duration&&f.duration!=="—"?f.duration:durationText(f.durationMinutes);
  return `<article class="flight-row friend-readonly-flight" data-friend-flight-id="${escapeHtml(f.id)}">
    <div class="airline-cell">${iconMarkup(f)}<div><strong class="flight-number">${escapeHtml(f.flightNo)}</strong><small>${escapeHtml(localizedAirlineName(f))}</small></div></div>
    <div class="date-cell"><strong>${escapeHtml(formatDate(f.date))}</strong></div>
    <div class="route-cell">
      <div class="route-point"><strong>${escapeHtml(f.from)}</strong><span>${escapeHtml(from?airportCity(from):f.from)}</span><small>${escapeHtml(f.depart||"—")}</small></div>
      <div class="route-line"><span>${escapeHtml(duration||"—")}</span><i></i><small>${formatNumber(Number(f.distance)||0)} km</small></div>
      <div class="route-point"><strong>${escapeHtml(f.to)}</strong><span>${escapeHtml(to?airportCity(to):f.to)}</span><small>${escapeHtml(f.arrive||"—")}</small></div>
    </div>
    <div class="flight-meta">
      <span>${t("aircraft")}<b>${escapeHtml(f.aircraft||"—")}</b></span><span>${t("cabin")}<b>${escapeHtml(displayCabin(f.cabin))}</b></span>
      <span>${t("registration")}<b>${escapeHtml(f.registration||"—")}</b></span><span>${t("seat")}<b>${escapeHtml(f.seat||"—")}</b></span>
    </div>
    <div class="fare-cell">${friendFareMarkup(f)}</div><span class="flight-row-actions" aria-hidden="true"></span>
  </article>`;
}
function bindFriendFlightRows(container) {
  container.querySelectorAll("[data-friend-flight-id]").forEach(row=>row.addEventListener("click",()=>openFlight(row.dataset.friendFlightId)));
}
function renderFriendFlightList() {
  const records=filteredFriendFlights("list"),container=document.getElementById("friendFlightList");
  if(!container||!state.friendRecords)return;
  const incoming=state.friendRecords.contentMode==="incoming";
  document.getElementById("friendListTitle").textContent=t(incoming?"navIncoming":"recordsTitle");
  document.getElementById("friendListTotal").textContent=records.length;
  if(!records.length){container.innerHTML=`<div class="friends-empty">${t(incoming?"noIncoming":"noRecords")}</div>`;return;}
  let markup="";
  if(!state.friendRecords.listTripLabels){
    markup=records.map(friendFlightMarkup).join("");
  }else{
    const grouped=new Map(),unlabelled=[];
    records.forEach(f=>{
      const trip=flightTrip(f);
      if(!trip){unlabelled.push(f);return;}
      const key=String(trip.id||trip.label);
      if(!grouped.has(key))grouped.set(key,{trip,items:[]});
      grouped.get(key).items.push(f);
    });
    const groups=[...grouped.values()].sort((a,b)=>String(b.trip.start||"").localeCompare(String(a.trip.start||"")));
    if(unlabelled.length)groups.push({trip:{label:t("otherFlights")},items:unlabelled,other:true});
    markup=groups.map(group=>`<section class="trip-flight-group"><header><strong>${escapeHtml(group.trip.label)}</strong>${group.other?"":`<small>${escapeHtml(group.trip.start||"")} — ${escapeHtml(group.trip.end||"")}</small>`}</header>${group.items.map(friendFlightMarkup).join("")}</section>`).join("");
  }
  container.innerHTML=markup;
  bindFriendFlightRows(container);
}
function renderFriendIncoming() {
  if(state.friendRecords?.contentMode==="incoming")renderFriendFlightList();
}
function renderFriendStatistics() { renderStats({friend:true}); }
function friendViewAllowed(mode) {
  if(mode==="incoming")return state.friendRecords?.privacy.incoming!==false;
  if(mode==="statistics")return state.friendRecords?.privacy.statistics!==false;
  return state.friendRecords?.privacy.records!==false;
}
function applyFriendPrivacy(mode,viewId) {
  const allowed=friendViewAllowed(mode),overlay=document.getElementById("friendPrivacyOverlay");
  document.querySelectorAll(".view.friend-view-locked").forEach(view=>view.classList.remove("friend-view-locked"));
  document.getElementById(viewId)?.classList.toggle("friend-view-locked",!allowed);
  overlay.hidden=allowed;
}
async function openFriendRecords(userId) {
  const profile=state.friends.find(item=>item.user_id===userId);
  if(!profile)return;
  try{
    const archive=await window.flightArchiveData.getFriendArchive(userId);
    state.friendRecords={
      profile,records:archive.completedFlights,incomingFlights:archive.incomingFlights,
      statisticsFlights:archive.statisticsFlights,favourites:archive.favourites,
      statisticsSummary:archive.statisticsSummary,privacy:archive.privacy,
      mapVisible:true,viewMode:"map",contentMode:"records",listTripLabels:false,
      filters:{list:{year:"all",scope:"all",search:""},stats:{year:"all",scope:"all",search:""}}
    };
    populateFriendFilterYears();syncFriendViewerControls();
    renderFriendFlightList();renderFriendIncoming();renderFriendStatistics();
    showFriendMap();
  }catch(error){showToast(t("saveFailed"),error?.message||String(error));}
}
function setFriendMapIdentity() {
  const profile=state.friendRecords?.profile,records=friendArchiveFlights();
  if(!profile)return;
  const avatar=document.getElementById("friendMapAvatar");
  avatar.innerHTML=profile.avatar_url?`<img src="${escapeHtml(profile.avatar_url)}" alt="" />`:escapeHtml(friendInitial(profile));
  avatar.querySelector("img")?.addEventListener("error",()=>{avatar.textContent=friendInitial(profile);},{once:true});
  document.getElementById("friendMapName").textContent=profile.username||profile.display_name||"Flight Archive user";
  document.getElementById("friendMapCount").textContent=`${records.length} ${t("friendMapFlights")}`;
}
function syncFriendViewerControls() {
  if(!state.friendRecords)return;
  document.querySelectorAll("[data-friend-view]").forEach(button=>button.classList.toggle("active",button.dataset.friendView===state.friendRecords.viewMode));
  document.querySelectorAll("[data-friend-content]").forEach(button=>button.classList.toggle("active",button.dataset.friendContent===state.friendRecords.contentMode));
  document.getElementById("friendContentTabs").hidden=state.friendRecords.viewMode==="statistics";
  const listFilters=state.friendRecords.filters.list,statsFilters=state.friendRecords.filters.stats;
  document.getElementById("friendListSearch").value=listFilters.search;
  document.getElementById("friendStatsSearch").value=statsFilters.search;
  document.getElementById("friendListYearFilter").value=listFilters.year;
  document.getElementById("friendStatsYearFilter").value=statsFilters.year;
  const tripToggle=document.getElementById("friendListTripToggle");
  tripToggle.dataset.i18n=state.friendRecords.listTripLabels?"hideTripLabels":"showTripLabels";
  tripToggle.textContent=t(state.friendRecords.listTripLabels?"hideTripLabels":"showTripLabels");
  document.querySelectorAll("[data-friend-list-scope]").forEach(button=>button.classList.toggle("active",button.dataset.friendListScope===listFilters.scope));
  document.querySelectorAll("[data-friend-stats-scope]").forEach(button=>button.classList.toggle("active",button.dataset.friendStatsScope===statsFilters.scope));
}
function populateFriendFilterYears() {
  if(!state.friendRecords)return;
  const years=[...new Set([...state.friendRecords.records,...state.friendRecords.incomingFlights,...state.friendRecords.statisticsFlights]
    .map(f=>String(f.date||"").slice(0,4)).filter(year=>/^\d{4}$/.test(year)))].sort((a,b)=>b.localeCompare(a));
  ["friendListYearFilter","friendStatsYearFilter"].forEach(id=>{
    const select=document.getElementById(id),selected=select.value||"all";
    select.innerHTML=`<option value="all">${t("allYears")}</option>${years.map(year=>`<option value="${year}">${year}</option>`).join("")}`;
    select.value=years.includes(selected)?selected:"all";
  });
}
function showFriendMap() {
  if(!state.friendRecords)return;
  state.friendRecords.mapVisible=true;
  state.friendRecords.viewMode="map";
  document.getElementById("appShell").classList.add("friend-map-mode");
  document.getElementById("appShell").classList.remove("friend-list-mode");
  document.getElementById("friendViewerControls").hidden=false;
  setFriendMapIdentity();
  setView("atlas");
  syncFriendViewerControls();setFriendMapIdentity();
  applyFriendPrivacy(state.friendRecords.contentMode,"atlasView");
  const first=friendArchiveFlights().find(f=>airports[f.from]);
  if(first){const airport=airports[first.from];rotation={lon:-airport.lon,lat:airport.lat};}
  setTimeout(()=>{resizeGlobe();drawGlobe();},20);
}
function showFriendList() {
  if(!state.friendRecords)return;
  state.friendRecords.mapVisible=false;
  state.friendRecords.viewMode="list";
  document.getElementById("appShell").classList.remove("friend-map-mode");
  document.getElementById("appShell").classList.add("friend-list-mode");
  setFriendMapIdentity();
  setView("friendList");
  document.getElementById("friendRecordsPanel").hidden=false;
  syncFriendViewerControls();renderFriendFlightList();applyFriendPrivacy(state.friendRecords.contentMode,"friendListView");
}
function showFriendStatistics() {
  if(!state.friendRecords)return;
  state.friendRecords.mapVisible=false;
  state.friendRecords.viewMode="statistics";
  document.getElementById("appShell").classList.remove("friend-map-mode");
  document.getElementById("appShell").classList.add("friend-list-mode");
  setView("friendStatistics");syncFriendViewerControls();renderFriendStatistics();applyFriendPrivacy("statistics","friendStatisticsView");
}
function setFriendContent(content) {
  if(!state.friendRecords||!['records','incoming'].includes(content))return;
  state.friendRecords.contentMode=content;
  setFriendMapIdentity();syncFriendViewerControls();
  if(state.friendRecords.viewMode==="map")showFriendMap();
  else showFriendList();
}
function closeFriendRecords() {
  state.friendRecords=null;
  document.getElementById("appShell").classList.remove("friend-map-mode","friend-list-mode");
  document.getElementById("friendViewerControls").hidden=true;
  document.getElementById("friendPrivacyOverlay").hidden=true;
  document.querySelectorAll(".view.friend-view-locked").forEach(view=>view.classList.remove("friend-view-locked"));
  document.getElementById("friendRecordsPanel").hidden=true;
  document.getElementById("friendListFilterPanel").hidden=true;
  document.getElementById("friendStatsFilterPanel").hidden=true;
  setView("friends");
}

function setSettingsOpen(open) {
  if(!open){
    setAccountEditing(false);
    setFavouritesEditing(false);
    if(state.hubEditorOpen){state.hubEditorOpen=false;renderHubSettings();}
  }
  document.getElementById("settingsPanel").classList.toggle("open",open);
  document.getElementById("settingsPanel").setAttribute("aria-hidden",String(!open));
  document.getElementById("settingsButton").classList.toggle("active",open);
  document.getElementById("settingsButton").setAttribute("aria-expanded",String(open));
}

function updateMapHelp() {
  const help=document.querySelector("#mapControl [data-i18n='mapHelp']");
  if(help)help.textContent=state.globeStyle==="flat"?t("flatMapHelp"):t("mapHelp");
}

function setView(view) {
  if(state.incomingMode)setIncomingMode(false);
  state.activeView = view;
  if(view!=="records"){
    setRecordActionsOpen(false);
    setRecordAddOpen(false);
    setRecordFiltersOpen(false);
  }
  if(view!=="stats")setStatsFiltersOpen(false);
  setSettingsOpen(false);
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === view));
  document.getElementById(`${view}View`)?.classList.add("active");
  document.getElementById("mapControl").style.visibility = view === "atlas" ? "visible" : "hidden";
  closeDrawer();
  if (view === "atlas") setTimeout(resizeGlobe, 30);
  if (view === "friends") loadFriends();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function setRecordActionsOpen(open) {
  const menu=document.getElementById("recordActionsMenu"),button=document.getElementById("recordMoreButton");
  menu.hidden=!open;
  button.setAttribute("aria-expanded",String(open));
}
function setRecordAddOpen(open) {
  const menu=document.getElementById("recordAddMenu"),button=document.getElementById("recordAddButton");
  menu.hidden=!open;
  button.setAttribute("aria-expanded",String(open));
}
function setStatsFiltersOpen(open) {
  const menu=document.getElementById("statsFilterMenu"),button=document.getElementById("statsMoreButton");
  menu.hidden=!open;
  button.classList.toggle("active",open);
  button.setAttribute("aria-expanded",String(open));
}
function setRecordFiltersOpen(open) {
  const panel=document.getElementById("recordFilterPanel"),button=document.getElementById("recordFilterMenuButton");
  panel.hidden=!open;
  button.classList.toggle("active",open);
  button.setAttribute("aria-expanded",String(open));
  if(open)setTimeout(()=>document.getElementById("recordSearch").focus(),0);
}

function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModals() {
  document.querySelectorAll(".modal-backdrop:not(#onboardingModal)").forEach(el => el.classList.remove("open"));
  if(!document.getElementById("onboardingModal").classList.contains("open"))document.body.style.overflow = "";
}
function closeOnboarding() {
  document.getElementById("onboardingModal").classList.remove("open");
  document.body.style.overflow="";
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
  return `${formatNumber(Math.floor(minutes/60))} ${t("hours")} ${minutes%60} ${t("minutes")}`;
}
function flightDetailRow(f,value,emphasized=false) {
  return `<button class="stats-flight-row${emphasized?" metric-row":""}" data-flight-id="${f.id}">
    ${iconMarkup(f,"stats-airline-icon")}
    <span class="stats-flight-copy"><strong>${f.flightNo}</strong><small><span>${formatDate(f.date)}</span><span class="stats-route-codes"><b>${f.from}</b><i>→</i><b>${f.to}</b></span></small></span>
    <b class="stats-flight-value">${value}</b><i class="stats-flight-arrow">›</i>
  </button>`;
}
function statsSnapshot(sourceFlights=filteredFlights()) {
  const totalDistance=sourceFlights.reduce((sum,f)=>sum+(Number(f.distance)||0),0);
  const totalMinutes=sourceFlights.reduce((sum,f)=>sum+(Number(f.durationMinutes)||0),0);
  const knownFares=sourceFlights.filter(f=>Number.isFinite(f.fare));
  const totalFare=knownFares.reduce((sum,f)=>sum+f.fare,0);
  const aircraft=aggregateBy(sourceFlights,f=>classifyAircraft(f.aircraft));
  const airlines=aggregateBy(sourceFlights,f=>f.airlineShort);
  const airportVisits=new Map(),countries=new Map(),cities=new Map(),directedRoutes=aggregateBy(sourceFlights,f=>`${f.from}>${f.to}`);
  sourceFlights.forEach(f=>[f.from,f.to].forEach(code=>{
    const airport=airports[code],country=airportCountry(airport),city=airportCity(airport);
    airportVisits.set(code,(airportVisits.get(code)||0)+1);
    countries.set(country,(countries.get(country)||0)+1);
    cities.set(city,(cities.get(city)||0)+1);
  }));
  return {totalDistance,totalMinutes,knownFares,totalFare,aircraft,airlines,airportVisits,countries,cities,directedRoutes};
}
function topStatsEntry(grouped) {
  return [...grouped.entries()].sort((a,b)=>{
    const aCount=Array.isArray(a[1])?a[1].length:Number(a[1])||0;
    const bCount=Array.isArray(b[1])?b[1].length:Number(b[1])||0;
    return bCount-aCount||String(a[0]).localeCompare(String(b[0]));
  })[0]||null;
}
function aircraftPreferenceLabel(value) {
  return String(value||"").replace(/^OTHER\|/,"").replace(/^(Airbus|Boeing|COMAC|Embraer|Bombardier|ATR|McDonnell Douglas|British Aerospace|Fokker|Lockheed|Tupolev|Ilyushin|Antonov|Historic)\s+/i,"");
}
function preferenceOptions(type,sourceFlights=flights) {
  const snapshot=statsSnapshot(sourceFlights);
  let options=[];
  if(type==="aircraft")options=[...snapshot.aircraft.entries()].map(([value,items])=>({value,label:aircraftPreferenceLabel(value),count:items.length}));
  else if(type==="airlines")options=[...snapshot.airlines.entries()].map(([value,items])=>({value,label:localizedAirlineName(items[0])||value,count:items.length}));
  else if(type==="airports")options=[...snapshot.airportVisits.entries()].map(([value,count])=>({value,label:`${value} · ${airportCity(airports[value])}`,count}));
  else if(type==="countries"){
    const counts=new Map(),labels=new Map();
    sourceFlights.forEach(f=>[f.from,f.to].forEach(code=>{
      const airport=airports[code],value=airport.countryCode||airport.countryEn||airport.country;
      counts.set(value,(counts.get(value)||0)+1);labels.set(value,airportCountry(airport));
    }));
    options=[...counts.entries()].map(([value,count])=>({value,label:labels.get(value)||value,count}));
  }else if(type==="cities"){
    const counts=new Map(),labels=new Map();
    sourceFlights.forEach(f=>[f.from,f.to].forEach(code=>{
      const airport=airports[code],value=airport.cityEn||airport.city;
      counts.set(value,(counts.get(value)||0)+1);labels.set(value,airportCity(airport));
    }));
    options=[...counts.entries()].map(([value,count])=>({value,label:labels.get(value)||value,count}));
  }
  return options.sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label));
}
function favouriteOptions(type) {
  if(type==="airlines")return referenceData.airlines.map(airline=>({
    value:airline.iata,
    label:state.lang==="zh"?(airline.zh||airline.en):airline.en,
    count:0
  }));
  if(type==="aircraft")return Object.entries(referenceData.aircraft).flatMap(([maker,models])=>models.map(model=>({
    value:`${maker} ${model}`,label:`${maker} · ${model}`,count:0
  })));
  if(type==="countries")return [...regionOptions].map(option=>({value:option.code,label:displayName("region",option.code),count:0}))
    .sort((a,b)=>a.label.localeCompare(b.label,activeLocale()));
  if(type==="airports")return Object.values(airports).map(airport=>({
    value:airport.code,label:`${airport.code} · ${airportName(airport)}`,count:0
  })).sort((a,b)=>a.value.localeCompare(b.value));
  if(type==="cities"){
    return cityIndex.map(city=>({value:city.value,label:cityDisplay(city),count:0}))
      .sort((a,b)=>a.label.localeCompare(b.label,activeLocale()));
  }
  const options=preferenceOptions(type,flights);
  const current=savedFavourites[type];
  if(current && !options.some(option=>option.value===current)){
    const label=type==="airports"&&airports[current]?`${current} · ${airportCity(airports[current])}`:type==="cities"?storedCityParts(current).city:current;
    options.unshift({value:current,label,count:0});
  }
  return options;
}
function favouriteDisplay(type,value) {
  if(!value)return t("notSet");
  if(type==="countries" && /^[A-Z]{2}$/.test(value))return displayName("region",value);
  if(type==="cities")return storedCityParts(value).city || t("notSet");
  if(type==="airlines"){
    if(value.startsWith("OTHER|"))return value.slice(6);
    const airline=airlineByValue(value);
    if(airline)return state.lang==="zh"?(airline.zh||airline.en):airline.en;
  }
  if(type==="aircraft" && value.startsWith("OTHER|"))return value.slice(6);
  return favouriteOptions(type).find(option=>option.value===value)?.label||aircraftPreferenceLabel(value);
}
function airportForCountryValue(value,sourceFlights=flights) {
  const codes=sourceFlights.flatMap(f=>[f.from,f.to]);
  return codes.map(code=>airports[code]).find(airport=>(airport.countryCode||airport.countryEn||airport.country)===value)
    ||Object.values(airports).find(airport=>(airport.countryCode||airport.countryEn||airport.country)===value);
}
function airportForCityValue(value,sourceFlights=flights) {
  const parts=storedCityParts(value);
  const codes=sourceFlights.flatMap(f=>[f.from,f.to]);
  return codes.map(code=>airports[code]).find(airport=>(airport.cityEn||airport.city)===parts.city && (!parts.country||airport.countryCode===parts.country))
    ||Object.values(airports).find(airport=>(airport.cityEn||airport.city)===parts.city && (!parts.country||airport.countryCode===parts.country));
}
function manufacturerLogoMarkup(value,className="stat-entity-logo") {
  const manufacturer=/^Airbus\b/i.test(value)?"Airbus":/^Boeing\b/i.test(value)?"Boeing":null;
  if(!manufacturer)return "";
  return `<span class="${className} manufacturer-mark"><img src="${manufacturerLogos[manufacturer]}" alt="${manufacturer} logo" loading="lazy" /></span>`;
}
function airportLogoMarkup(code,className="stat-entity-logo") {
  const src=airportBrandLogos[code];
  if(!src)return `<span class="${className} entity-code-fallback">${escapeHtml(code||"—")}</span>`;
  const airport=airports[code];
  return `<span class="${className} airport-brand-mark"><img src="${src}" alt="${escapeHtml(airport?airportName(airport):code)} logo" loading="lazy" /></span>`;
}
function preferenceIcon(type,value,sourceFlights=flights,className="stat-entity-logo") {
  if(!value)return `<span class="${className} entity-empty-mark">—</span>`;
  if(type==="aircraft")return manufacturerLogoMarkup(value,className)||`<span class="${className} entity-code-fallback">${escapeHtml(aircraftPreferenceLabel(value).slice(0,3))}</span>`;
  if(type==="airlines"){
    const flight=sourceFlights.find(item=>item.airlineShort===value)||flights.find(item=>item.airlineShort===value);
    if(flight)return iconMarkup(flight,className);
    const icon=airlineIconSource(value);
    const airline=airlineByValue(value);
    return icon
      ? `<span class="${className}"><img src="${icon}" alt="${escapeHtml(favouriteDisplay(type,value))} logo" loading="lazy" /></span>`
      : `<span class="${className} entity-code-fallback">${escapeHtml(airline?.iata||value.slice(0,3))}</span>`;
  }
  if(type==="airports")return airportLogoMarkup(value,className);
  if(type==="countries")return flagIconForAirport(airportForCountryValue(value,sourceFlights),className);
  if(type==="cities")return flagIconForAirport(airportForCityValue(value,sourceFlights),className);
  return "";
}
function preferenceLabels(type) {
  return {
    aircraft:["mostFlownAircraft","favouriteAircraft"],
    airlines:["mostFlownAirline","favouriteAirline"],
    airports:["mostVisitedAirport","favouriteAirport"],
    countries:["mostVisitedCountry","favouriteDestination"],
    cities:["mostVisitedCity","favouriteCity"]
  }[type]||null;
}
function preferenceDetailMarkup(type,sourceFlights,favourites=savedFavourites,editable=true) {
  const labels=preferenceLabels(type);
  if(!labels)return "";
  const most=preferenceOptions(type,sourceFlights)[0]||null;
  const favouriteValue=favourites[type]||"";
  const options=favouriteOptions(type);
  const editorValue=type==="cities"?cityInputDisplay(favouriteValue)
    :type==="countries"&&favouriteValue?displayName("region",favouriteValue)
    :(favouriteValue.startsWith("OTHER|")?favouriteValue.slice(6):favouriteValue);
  const row=(label,value,display,icon,editable=false)=>`<div class="stats-preference-row${editable?" favourite-preference":""}">
    ${icon}
    <div class="stats-preference-copy"><span>${label}</span><strong>${escapeHtml(display)}</strong></div>
    ${editable?`<button class="stats-favourite-edit" type="button" data-edit-favourite>${t("editFavourite")}</button>`:""}
  </div>`;
  return `<section class="stats-preference-panel" data-favourite-card="${type}">
    ${row(t(labels[0]),most?.value||"",most?.label||"—",preferenceIcon(type,most?.value||"",sourceFlights,"stats-preference-logo"))}
    ${row(t(labels[1]),favouriteValue,favouriteDisplay(type,favouriteValue),preferenceIcon(type,favouriteValue,sourceFlights,"stats-preference-logo"),editable)}
    ${editable?`<div class="stats-favourite-editor" hidden>
      <input data-favourite-input ${type==="cities"?"":`list="statsFavouriteOptions-${type}"`} value="${escapeHtml(editorValue)}" autocomplete="off" />
      <datalist id="statsFavouriteOptions-${type}">
        ${options.map(option=>`<option value="${escapeHtml(type==="countries"?option.label:option.value)}">${escapeHtml(option.label)}</option>`).join("")}
      </datalist>
      <button class="primary-button" type="button" data-save-favourite>${t("saveFavourite")}</button>
    </div>`:""}
  </section>`;
}
function normalizeFavouriteEditorValue(type,value,storedValue="") {
  const text=String(value||"").trim();
  if(type==="airlines")return normalizeAirlineFavourite(text);
  if(type==="aircraft")return normalizeAircraftFavourite(text);
  if(type==="airports"){
    const code=normalizeAirportFavourite(text);
    if(text&&!code)throw new Error(t("invalidAirportCode"));
    return code;
  }
  if(type==="countries"){
    const code=normalizeRegionFavourite(text);
    if(text&&!code)throw new Error(t("invalidDestinationRegion"));
    return code;
  }
  if(type==="cities"){
    const city=normalizeCityFavourite(text,storedValue);
    if(text&&!city)throw new Error(t("invalidDestinationCity"));
    return city;
  }
  return text;
}
function bindFavouriteEditor(type) {
  const card=document.querySelector(`[data-favourite-card="${type}"]`);
  if(!card)return;
  const editor=card.querySelector(".stats-favourite-editor");
  const cityInput=card.querySelector("[data-favourite-input]");
  if(type==="cities"){
    cityInput.dataset.cityValue=savedFavourites.cities||"";
    installCityAutocomplete(cityInput);
  }
  card.querySelector("[data-edit-favourite]").addEventListener("click",()=>{
    editor.hidden=false;
    cityInput.focus();
  });
  card.querySelector("[data-save-favourite]").addEventListener("click",async()=>{
    try{
      const value=normalizeFavouriteEditorValue(type,cityInput.value,cityInput.dataset.cityValue||"");
      if(value)savedFavourites[type]=value;else delete savedFavourites[type];
      if(window.flightArchiveData?.enabled)await window.flightArchiveData.saveFavourite(type,value);
      renderFavouriteSettings();
      renderStats();
      openStatsDetail(type);
      showToast(t("favouriteUpdated"),favouriteDisplay(type,value));
    }catch(error){
      showToast(t("saveFailed"),error?.message||String(error));
    }
  });
}
function statHighlightsMarkup(items) {
  if(!items.length)return "";
  return `<div class="stat-highlights">${items.map(item=>`
    <div class="stat-highlight-entry${item.flight||item.icon?" has-highlight-logo":""}">
      ${item.flight?iconMarkup(item.flight,"stat-highlight-logo"):(item.icon||"")}
      <span class="stat-highlight-copy">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        ${item.note?`<small>${item.note}</small>`:""}
      </span>
    </div>`).join("")}</div>`;
}
function renderStats({friend=false}={}) {
  const scopedFlights=friend?filteredFriendFlights("stats"):filteredFlights(),s=statsSnapshot(scopedFlights);
  const favourites=friend?(state.friendRecords?.favourites||{}):savedFavourites;
  const durationSorted=[...scopedFlights].sort((a,b)=>b.durationMinutes-a.durationMinutes);
  const distanceSorted=[...scopedFlights].sort((a,b)=>b.distance-a.distance);
  const longest=durationSorted[0],shortest=durationSorted.at(-1);
  const farthest=distanceSorted[0],shortestDistance=distanceSorted.at(-1);
  const preferenceHighlights=type=>{
    const labels=preferenceLabels(type),most=preferenceOptions(type,scopedFlights)[0]||null;
    const favouriteValue=favourites[type]||"";
    return [
      {label:t(labels[0]),value:most?.label||"—",icon:preferenceIcon(type,most?.value||"",scopedFlights,"stat-highlight-logo")},
      {label:t(labels[1]),value:favouriteDisplay(type,favouriteValue),icon:preferenceIcon(type,favouriteValue,scopedFlights,"stat-highlight-logo")}
    ];
  };
  const entries=[
    {type:"time",label:t("totalTime"),value:durationText(s.totalMinutes),unit:`${scopedFlights.length} ${t("flightUnit")}`,highlights:longest?[
      {label:t("longestFlight"),value:`${longest.from} → ${longest.to}`,note:durationText(longest.durationMinutes),flight:longest},
      {label:t("shortestFlight"),value:`${shortest.from} → ${shortest.to}`,note:durationText(shortest.durationMinutes),flight:shortest}
    ]:[]},
    {type:"distance",label:t("totalDistance"),value:`${formatNumber(s.totalDistance)} km`,unit:`${(s.totalDistance/40075).toFixed(2)} ${t("earthCircumference")}`,highlights:farthest?[
      {label:t("farthestFlight"),value:`${farthest.from} → ${farthest.to}`,note:`${formatNumber(farthest.distance)} km`,flight:farthest},
      {label:t("shortestFlight"),value:`${shortestDistance.from} → ${shortestDistance.to}`,note:`${formatNumber(shortestDistance.distance)} km`,flight:shortestDistance}
    ]:[]},
    {type:"airlines",label:t("airlinesFlown"),value:formatNumber(s.airlines.size),unit:t("airlineUnit"),highlights:preferenceHighlights("airlines")},
    {type:"aircraft",label:t("aircraftTypes"),value:formatNumber(s.aircraft.size),unit:t("typeUnit"),highlights:preferenceHighlights("aircraft")},
    {type:"airports",label:t("airportsVisited"),value:formatNumber(s.airportVisits.size),unit:t("airportUnit"),highlights:preferenceHighlights("airports")},
    {type:"countries",label:t("countriesRegions"),value:formatNumber(s.countries.size),unit:t("countryUnit"),highlights:preferenceHighlights("countries")},
    {type:"cities",label:t("citiesVisited"),value:formatNumber(s.cities.size),unit:t("cityUnit"),highlights:preferenceHighlights("cities")},
    {type:"routes",label:t("directedRoutes"),value:formatNumber(s.directedRoutes.size),unit:t("routeUnit"),highlights:[]},
    {type:"fare",label:t("totalFare"),value:formatFare(s.totalFare),unit:`${s.knownFares.length} ${t("knownFares")}`,highlights:[]}
  ];
  const container=document.getElementById(friend?"friendStatsList":"statsList");
  if(!container)return;
  container.innerHTML=entries.map(item=>`
    <button class="stat-block${item.highlights.length?"":" simple"}${["time","distance","airlines"].includes(item.type)?" aligned-stat":""}" data-stat="${item.type}">
      <span class="stat-label">${item.label}</span><i class="stat-arrow">›</i>
      <strong class="stat-value">${item.value}</strong><b class="stat-unit">${item.unit}</b>
      ${statHighlightsMarkup(item.highlights)}
    </button>`).join("");
  container.querySelectorAll("[data-stat]").forEach(el=>el.addEventListener("click",()=>openStatsDetail(el.dataset.stat,{friend})));
}
function ratioText(value) {
  const digits=value>=100?0:value>=10?1:value>=1?2:3;
  return formatNumber(value,{minimumFractionDigits:digits,maximumFractionDigits:digits});
}
function equivalenceMarkup(label,items) {
  return `<section class="equivalence-section">
    <span class="detail-sort-label">${label}</span>
    <div class="equivalence-grid">${items.map(item=>`
      <div><span class="equivalence-symbol">${item.symbol}</span><strong>${ratioText(item.value)}</strong><small>${item.label}</small></div>`).join("")}
    </div>
  </section>`;
}
function featuredFlightMarkup(f,value,kicker=t("longestFlight")) {
  if(!f)return "";
  const image=aircraftImageMarkup(f,"featured-aircraft-image");
  return `<button class="featured-flight" data-flight-id="${f.id}">
    <div class="featured-flight-copy">
      <span>${kicker}</span>
      <div class="featured-flight-title">${iconMarkup(f,"featured-airline-icon")}<div><strong>${f.flightNo}</strong><small>${escapeHtml(localizedAirlineName(f))}</small></div></div>
      <div class="featured-flight-route"><b>${f.from}</b><i></i><b>${f.to}</b></div>
      <p>${formatDate(f.date)} · ${f.aircraft} · ${f.registration || "—"}</p>
      <em>${value}</em>
    </div>
    ${image?`<div class="featured-aircraft">${image}</div>`:""}
  </button>`;
}
function statsBarMarkup(rows) {
  const sorted=[...rows].sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label));
  const maximum=Math.max(1,...sorted.map(row=>row.count));
  return sorted.map((row,index)=>{
    const hasLeading=row.icon!==undefined||row.showRank!==false;
    const leading=row.icon!==undefined?row.icon:`<span class="stats-rank-index">${String(index+1).padStart(2,"0")}</span>`;
    return `
    <div class="stats-bar-row${row.image?" has-image":""}${hasLeading?"":" no-leading"}">
      ${hasLeading?leading:""}
      <div class="stats-bar-main">
        <div class="stats-bar-head"><span><strong>${row.label}${row.inlineNote?`<small class="stats-inline-note">${row.inlineNote}</small>`:""}</strong>${row.note?`<small>${row.note}</small>`:""}</span><b>${row.count} ${row.unit||t("times")}</b></div>
        <div class="stats-bar-track"><i style="width:${Math.max(5,row.count/maximum*100)}%"></i></div>
      </div>
      ${row.image?`<div class="stats-aircraft-visual">${row.image}</div>`:""}
    </div>`;
  }).join("");
}
function flagIconForAirport(airport,className="stats-flag") {
  const code=String(airport?.countryCode||"").toLowerCase();
  if(!/^[a-z]{2}$/.test(code))return `<span class="${className} rounded-flag-mark stats-flag-fallback" aria-hidden="true">◎</span>`;
  return `<span class="${className} rounded-flag-mark" aria-hidden="true"><img src="./circle-flags/flags/${code}.svg" alt="" loading="lazy" /></span>`;
}
function visitedCountryFlagsMarkup(sourceFlights) {
  const countries=new Map();
  sourceFlights.flatMap(f=>[f.from,f.to]).forEach(code=>{
    const airport=airports[code],countryCode=String(airport?.countryCode||"").toLowerCase();
    if(!/^[a-z]{2}$/.test(countryCode)||countries.has(countryCode))return;
    countries.set(countryCode,airportCountry(airport));
  });
  const items=[...countries.entries()].sort((a,b)=>a[1].localeCompare(b[1]));
  return `<footer class="country-map-flags" aria-label="${escapeHtml(t("visitedLand"))}">
    <div class="country-map-flags-track">
      ${items.map(([code,name])=>`<span class="country-map-flag" title="${escapeHtml(name)}" aria-label="${escapeHtml(name)}">
        <img src="./circle-flags/flags/${code}.svg" alt="" loading="lazy" />
      </span>`).join("")}
    </div>
  </footer>`;
}
function countryStatsMapMarkup(sourceFlights) {
  return `<section class="country-stats-map">
    <header class="country-stats-map-head">
      <div><span>${t("flightFootprint")}</span><strong>${t("visitedCountryMap")}</strong></div>
      <div class="country-map-legend">
        <span><i class="visited"></i>${t("visitedLand")}</span>
        <span><i class="route"></i>${t("flightRoutes")}</span>
      </div>
    </header>
    <canvas id="countryStatsMap" aria-label="${escapeHtml(t("visitedCountryMap"))}"></canvas>
    ${visitedCountryFlagsMarkup(sourceFlights)}
  </section>`;
}
function geoCountryName(airport) {
  const name=airport?.countryEn||airport?.country||"";
  const byCode={US:"USA"};
  return byCode[String(airport?.countryCode||"").toUpperCase()]||{"United States":"USA","Hong Kong SAR":"China","Macao SAR":"China"}[name]||name;
}
function countryMapProject(lat,lon,viewport) {
  return {
    x:viewport.x+(lon+180)/360*viewport.width,
    y:viewport.y+(90-lat)/180*viewport.height
  };
}
function drawCountryStatsMap(sourceFlights=countryStatsMapFlights) {
  const mapCanvas=document.getElementById("countryStatsMap");
  if(!mapCanvas)return;
  countryStatsMapFlights=[...sourceFlights];
  const bounds=mapCanvas.getBoundingClientRect();
  const width=Math.max(320,Math.round(bounds.width||820));
  const height=Math.max(260,Math.round(bounds.height||380));
  const dpr=Math.min(window.devicePixelRatio||1,2);
  mapCanvas.width=Math.round(width*dpr);
  mapCanvas.height=Math.round(height*dpr);
  const mapContext=mapCanvas.getContext("2d");
  mapContext.setTransform(dpr,0,0,dpr,0,0);
  mapContext.fillStyle="#e8f0f4";
  mapContext.fillRect(0,0,width,height);

  const padding=14,availableWidth=width-padding*2,availableHeight=height-padding*2;
  const mapWidth=Math.min(availableWidth,availableHeight*2);
  const mapHeight=mapWidth/2;
  const viewport={x:(width-mapWidth)/2,y:(height-mapHeight)/2,width:mapWidth,height:mapHeight};
  const geoVisited=new Set(sourceFlights.flatMap(f=>[f.from,f.to]).map(code=>geoCountryName(airports[code])).filter(Boolean));

  landFeatures.forEach(feature=>{
    const visited=geoVisited.has(feature.name);
    feature.rings.forEach(ring=>{
      const continuous=unwrapRing(rotateRingAtDateline(ring));
      const longitudes=continuous.map(point=>point[0]);
      const closesAtSouthPole=feature.name==="Antarctica"&&Math.max(...longitudes)-Math.min(...longitudes)>300;
      [-360,0,360].forEach(shift=>{
        const points=continuous.map(([lon,lat])=>countryMapProject(lat,lon+shift,viewport));
        if(closesAtSouthPole){
          points.push(countryMapProject(-90,continuous[continuous.length-1][0]+shift,viewport));
          points.push(countryMapProject(-90,continuous[0][0]+shift,viewport));
        }
        if(!points.length||!pointsIntersectViewport(points,viewport,5))return;
        mapContext.beginPath();
        points.forEach((point,index)=>index?mapContext.lineTo(point.x,point.y):mapContext.moveTo(point.x,point.y));
        mapContext.closePath();
        mapContext.fillStyle=visited?"#e99a32":"#cdd7da";
        mapContext.fill();
        mapContext.strokeStyle=visited?"rgba(178,99,11,.7)":"rgba(72,94,105,.5)";
        mapContext.lineWidth=visited?.75:.45;
        mapContext.stroke();
      });
    });
  });

  const routeGroups=aggregateBy(sourceFlights,f=>[f.from,f.to].sort().join(">"));
  routeGroups.forEach((items,key)=>{
    const [from,to]=key.split(">"),fromAirport=airports[from],toAirport=airports[to];
    if(!fromAirport||!toAirport)return;
    const continuous=unwrapRing(greatCircle(fromAirport,toAirport,48).map(point=>[point.lon,point.lat]));
    [-360,0,360].forEach(shift=>{
      const points=continuous.map(([lon,lat])=>countryMapProject(lat,lon+shift,viewport));
      if(!pointsIntersectViewport(points,viewport,8))return;
      mapContext.beginPath();
      points.forEach((point,index)=>index?mapContext.lineTo(point.x,point.y):mapContext.moveTo(point.x,point.y));
      mapContext.strokeStyle="rgba(24,119,242,.62)";
      mapContext.lineWidth=.8+Math.min(items.length,5)*.16;
      mapContext.stroke();
    });
  });

  const cityGroups=new Map();
  sourceFlights.flatMap(f=>[f.from,f.to]).forEach(code=>{
    const airport=airports[code];
    if(!airport)return;
    const key=airport.cityEn||airport.city||code;
    if(!cityGroups.has(key))cityGroups.set(key,new Map());
    cityGroups.get(key).set(code,airport);
  });
  mapContext.lineWidth=.35;
  cityGroups.forEach(group=>{
    const cityAirports=[...group.values()];
    const city={
      lat:cityAirports.reduce((sum,airport)=>sum+airport.lat,0)/cityAirports.length,
      lon:cityAirports.reduce((sum,airport)=>sum+airport.lon,0)/cityAirports.length
    };
    const point=countryMapProject(city.lat,city.lon,viewport);
    mapContext.beginPath();
    mapContext.arc(point.x,point.y,1.55,0,Math.PI*2);
    mapContext.fillStyle="#1877f2";
    mapContext.fill();
    mapContext.strokeStyle="rgba(255,255,255,.9)";
    mapContext.stroke();
  });
}
function airportForCountryLabel(label) {
  return Object.values(airports).find(airport=>airportCountry(airport)===label);
}
function airportForCityLabel(label) {
  return Object.values(airports).find(airport=>airportCity(airport)===label);
}
function openStatsDetail(type,{friend=false}={}) {
  const scopedFlights=friend?filteredFriendFlights("stats"):filteredFlights(),s=statsSnapshot(scopedFlights);
  const favourites=friend?(state.friendRecords?.favourites||{}):savedFavourites;
  const title={time:t("totalTime"),distance:t("totalDistance"),aircraft:t("aircraftTypes"),airlines:t("airlinesFlown"),airports:t("airportsVisited"),countries:t("countriesRegions"),routes:t("directedRoutes"),cities:t("citiesVisited"),fare:t("totalFare")}[type];
  let summary="",content="";
  if(!scopedFlights.length){
    summary="0";
    content=`<div class="empty-state">${t("noRecords")}</div>`;
  }else if(type==="time"){
    summary=durationText(s.totalMinutes);
    const sorted=[...scopedFlights].sort((a,b)=>b.durationMinutes-a.durationMinutes);
    content=`<div class="featured-flight-stack">
        ${featuredFlightMarkup(sorted[0],durationText(sorted[0].durationMinutes))}
        ${featuredFlightMarkup(sorted.at(-1),durationText(sorted.at(-1).durationMinutes),t("shortestFlight"))}
      </div>
      ${equivalenceMarkup(t("timeEquivalent"),[
        {symbol:"24",value:s.totalMinutes/1440,label:t("days")},
        {symbol:"7",value:s.totalMinutes/10080,label:t("weeks")},
        {symbol:"30",value:s.totalMinutes/43830,label:t("months")},
        {symbol:"365",value:s.totalMinutes/525960,label:t("years")}
      ])}
      <div class="detail-sort-label">${t("longestFirst")}</div>${sorted.map(f=>flightDetailRow(f,durationText(f.durationMinutes),true)).join("")}`;
  }else if(type==="distance"){
    summary=`${formatNumber(s.totalDistance)} km`;
    const sorted=[...scopedFlights].sort((a,b)=>b.distance-a.distance);
    content=`<div class="featured-flight-stack">
        ${featuredFlightMarkup(sorted[0],`${formatNumber(sorted[0].distance)} km`,t("farthestFlight"))}
        ${featuredFlightMarkup(sorted.at(-1),`${formatNumber(sorted.at(-1).distance)} km`,t("shortestFlight"))}
      </div>
      ${equivalenceMarkup(t("distanceEquivalent"),[
        {symbol:"◎",value:s.totalDistance/40075,label:t("earthCircumference")},
        {symbol:"◐",value:s.totalDistance/384400,label:t("moonDistance")},
        {symbol:"☉",value:s.totalDistance/149597870.7,label:t("sunDistance")}
      ])}
      <div class="detail-sort-label">${t("longestFirst")}</div>${sorted.map(f=>flightDetailRow(f,`${formatNumber(f.distance)} km`,true)).join("")}`;
  }else if(type==="aircraft"){
    summary=`${s.aircraft.size} ${t("typeUnit")}`;
    content=statsBarMarkup([...s.aircraft.entries()].map(([family,items])=>{
      const visualFlight=items.find(aircraftVisualForFlight);
      return {label:family,count:items.length,showRank:false,image:visualFlight?aircraftImageMarkup(visualFlight,"stats-aircraft-image"):genericAircraftMarkup(family)};
    }));
  }else if(type==="airlines"){
    summary=`${s.airlines.size} ${t("airlineUnit")}`;
    content=statsBarMarkup([...s.airlines.entries()].map(([code,items])=>({
      label:localizedAirlineName(items[0]),count:items.length,icon:iconMarkup(items[0],"stats-bar-logo")
    })));
  }else if(type==="airports"){
    summary=`${s.airportVisits.size} ${t("airportUnit")}`;
    content=statsBarMarkup([...s.airportVisits.entries()].map(([code,count])=>({
      label:code,count,unit:t("visits"),note:airportName(airports[code]),icon:flagIconForAirport(airports[code])
    })));
  }else if(type==="countries"){
    summary=`${s.countries.size} ${t("countryUnit")}`;
    content=`${countryStatsMapMarkup(scopedFlights)}${statsBarMarkup([...s.countries.entries()].map(([name,count])=>({
      label:name,count,unit:t("visits"),icon:flagIconForAirport(airportForCountryLabel(name))
    })))}`;
  }else if(type==="routes"){
    summary=`${s.directedRoutes.size} ${t("routeUnit")}`;
    content=statsBarMarkup([...s.directedRoutes.entries()].map(([name,items])=>{
      const [from,to]=name.split(">");
      return {
        label:`${from} → ${to}`,
        inlineNote:`${compactAirportName(airports[from])} – ${compactAirportName(airports[to])}`,
        count:items.length,showRank:false
      };
    }));
  }else if(type==="cities"){
    summary=`${s.cities.size} ${t("cityUnit")}`;
    content=statsBarMarkup([...s.cities.entries()].map(([name,count])=>({label:name,count,unit:t("visits"),icon:flagIconForAirport(airportForCityLabel(name))})));
  }else if(type==="fare"){
    summary=formatFare(s.totalFare);
    const fareGroups=new Map();
    scopedFlights.forEach(f=>{
      const key=f.fareGroup?`bundle:${f.fareGroup}`:`flight:${f.id}`;
      if(!f.fareGroup&&!Number.isFinite(f.fare))return;
      if(!fareGroups.has(key))fareGroups.set(key,[]);
      fareGroups.get(key).push(f);
    });
    content=`<div class="detail-sort-label">${t("highestFirst")}</div>${[...fareGroups.entries()]
      .sort((a,b)=>b[1].reduce((n,f)=>n+(Number(f.fare)||0),0)-a[1].reduce((n,f)=>n+(Number(f.fare)||0),0))
      .map(([key,items])=>{
        const total=items.reduce((n,f)=>n+(Number(f.fare)||0),0),bundled=key.startsWith("bundle:");
        return `<section class="fare-group${bundled?" bundled":""}">
          <header><span>${bundled?t("bundle"):items[0].flightNo}</span><strong>${formatFare(total)}</strong></header>
          ${items.map(f=>flightDetailRow(f,bundled?`${formatFare(total)} (${t("bundle")})`:formatFare(f.fare))).join("")}
        </section>`;
      }).join("")}`;
  }
  if(["aircraft","airlines","airports","countries","cities"].includes(type)){
    content=`${preferenceDetailMarkup(type,scopedFlights,favourites,!friend)}${content}`;
  }
  document.getElementById("statsDetailTitle").textContent=title;
  document.getElementById("statsDetailSummary").textContent=summary;
  document.getElementById("statsDetailContent").innerHTML=content;
  document.querySelectorAll("#statsDetailContent [data-flight-id]").forEach(el=>el.addEventListener("click",()=>{closeModals();openFlight(el.dataset.flightId,{returnStatsType:type,returnStatsFriend:friend});}));
  if(!friend)bindFavouriteEditor(type);
  openModal("statsDetailModal");
  if(type==="countries"){
    countryStatsMapFlights=[...scopedFlights];
    requestAnimationFrame(()=>drawCountryStatsMap(countryStatsMapFlights));
  }
}
function persistHubs(){
  const codes=[...state.hubs];
  if(window.flightArchiveData?.enabled){
    window.flightArchiveData.replaceHubs(codes)
      .catch(error=>showToast(state.lang==="zh"?"同步失败":"Sync failed",error.message));
  }
}
function renderHubSettings(){
  const available=Object.values(airports);
  const selected=[...state.hubs].sort();
  document.getElementById("hubChips").innerHTML=selected.length
    ? selected.map(code=>`<span>${escapeHtml(code)}</span>`).join("")
    : `<span class="empty-hubs">${t("noHubs")}</span>`;
  const searchField=document.getElementById("hubSearchField"),searchInput=document.getElementById("hubSearch");
  searchField.classList.toggle("open",state.hubEditorOpen);searchInput.value=state.hubSearch;
  const options=document.getElementById("hubOptions");
  options.classList.toggle("open",state.hubEditorOpen);options.setAttribute("aria-hidden",String(!state.hubEditorOpen));
  const query=state.hubSearch.trim();
  const result=query.length>=2?airportSearchResults(query,{full:state.hubFullSearch,limit:120}):{matches:[],needsFull:false};
  const matches=query.length>=2?result.matches:(!query?selected.map(code=>airports[code]).filter(Boolean):[]);
  const countryGroups=new Map();
  matches.forEach(airport=>{
    const country=airportCountry(airport)||airport.countryCode||"—";
    if(!countryGroups.has(country))countryGroups.set(country,[]);
    countryGroups.get(country).push(airport);
  });
  const groupsMarkup=[...countryGroups.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([country,list])=>`<details class="hub-country" open>
    <summary><span>${escapeHtml(country)}</span><b>${list.filter(airport=>state.hubs.has(airport.code)).length||""}${list.length?` / ${list.length}`:""}</b></summary>
    <div>${list.map(airport=>`<label class="hub-option"><input type="checkbox" value="${escapeHtml(airport.code)}" ${state.hubs.has(airport.code)?"checked":""} /><span><strong>${escapeHtml(airport.code)} · ${escapeHtml(airport.icao||"—")} · ${escapeHtml(airportCity(airport)||"—")}</strong><small>${escapeHtml(airportName(airport))}</small></span></label>`).join("")}</div>
  </details>`).join("");
  if(!state.hubEditorOpen)options.innerHTML="";
  else if(query.length===1)options.innerHTML=`<p class="hub-search-status">${t("airportSearchHint").replace("{count}",formatNumber(available.length))}</p>`;
  else options.innerHTML=`${result.needsFull?`<button class="hub-full-search" type="button" data-hub-full-search>${t("fullAirportSearch")}</button>`:""}${!query?`<p class="hub-search-status">${t("selectedHubAirports")} · ${t("airportSearchHint").replace("{count}",formatNumber(available.length))}</p>`:""}${groupsMarkup||`<p class="hub-search-status">${t("noAirportMatches")}</p>`}`;
  document.getElementById("editHubsButton").classList.toggle("active",state.hubEditorOpen);
  document.getElementById("hubEditLabel").textContent=state.hubEditorOpen?t("done"):t("edit");
  options.querySelector("[data-hub-full-search]")?.addEventListener("click",()=>{state.hubFullSearch=true;renderHubSettings();});
  options.querySelectorAll("input").forEach(input=>input.addEventListener("change",()=>{
    if(input.checked)state.hubs.add(input.value);else state.hubs.delete(input.value);
    persistHubs();renderHubSettings();drawGlobe();
  }));
}
function renderOnboardingHubs(){
  const chips=document.getElementById("onboardingHubChips");
  const results=document.getElementById("onboardingHubResults");
  const search=document.getElementById("onboardingHubSearch");
  if(!chips||!results||!search)return;
  chips.innerHTML=onboardingHubs.size
    ? [...onboardingHubs].sort().map(code=>`<span>${escapeHtml(code)}</span>`).join("")
    : `<span class="empty-hubs">${t("noHubs")}</span>`;
  const query=search.value.trim();
  const selected=[...onboardingHubs].map(code=>airports[code]).filter(Boolean);
  const searchResult=query.length>=2?airportSearchResults(query,{full:search.dataset.fullSearch==="true",limit:40}):{matches:selected,needsFull:false};
  const matches=query.length>=2?searchResult.matches:selected;
  if(query.length===1){
    results.innerHTML=`<p class="hub-search-status">${t("airportSearchHint").replace("{count}",formatNumber(Object.keys(airports).length))}</p>`;
    return;
  }
  results.innerHTML=`${searchResult.needsFull?`<button class="hub-full-search" type="button" data-onboarding-hub-full>${t("fullAirportSearch")}</button>`:""}${matches.length?matches.map(airport=>`
    <label class="hub-option">
      <input type="checkbox" value="${escapeHtml(airport.code)}" ${onboardingHubs.has(airport.code)?"checked":""} />
      <span><strong>${escapeHtml(airport.code)} · ${escapeHtml(airportCity(airport)||"")}</strong><small>${escapeHtml(airportName(airport))}</small></span>
    </label>`).join(""):`<p class="hub-search-status">${query?t("noAirportMatches"):t("airportSearchHint").replace("{count}",formatNumber(Object.keys(airports).length))}</p>`}`;
  results.querySelector("[data-onboarding-hub-full]")?.addEventListener("click",()=>{search.dataset.fullSearch="true";renderOnboardingHubs();});
  results.querySelectorAll("input").forEach(input=>input.addEventListener("change",()=>{
    if(input.checked)onboardingHubs.add(input.value);else onboardingHubs.delete(input.value);
    renderOnboardingHubs();
  }));
}
function openOnboarding(){
  renderOnboardingOptions();
  document.getElementById("onboardingRequiredStep").hidden=false;
  document.getElementById("onboardingOptionalStep").hidden=true;
  onboardingHubs.clear();
  state.hubs.forEach(code=>onboardingHubs.add(code));
  document.getElementById("onboardingHubSearch").value="";
  document.getElementById("onboardingHubSearch").dataset.fullSearch="false";
  document.getElementById("onboardingFavouriteAirline").value=airlineInputDisplay(savedFavourites.airlines);
  document.getElementById("onboardingFavouriteAircraft").value=savedFavourites.aircraft?.startsWith("OTHER|")?savedFavourites.aircraft.slice(6):(savedFavourites.aircraft||"");
  document.getElementById("onboardingFavouriteAirport").value=savedFavourites.airports || "";
  document.getElementById("onboardingFavouriteCountry").value=savedFavourites.countries?displayName("region",savedFavourites.countries):"";
  const cityInput=document.getElementById("onboardingFavouriteCity");
  cityInput.value=cityInputDisplay(savedFavourites.cities||"");
  cityInput.dataset.cityValue=savedFavourites.cities||"";
  document.getElementById("onboardingAvatarInput").value="";
  ["onboardingSkip","onboardingFinish"].forEach(id=>document.getElementById(id).disabled=false);
  renderOnboardingHubs();
  document.getElementById("onboardingModal").classList.add("open");
  document.body.style.overflow="hidden";
}
function acceptRequiredOnboardingPreferences(){
  state.region=document.getElementById("onboardingRegionSelect").value;
  state.currency=document.getElementById("onboardingCurrencySelect").value;
  document.getElementById("onboardingRequiredStep").hidden=true;
  document.getElementById("onboardingOptionalStep").hidden=false;
  renderOnboardingHubs();
}
async function completeOnboarding(includeOptional){
  const data=window.flightArchiveData;
  if(!data?.enabled){
    showToast(t("saveFailed"),state.lang==="zh"?"账户数据服务尚未准备好，请稍后重试。":"Your account data is not ready yet. Please try again.");
    return;
  }
  const skipButton=document.getElementById("onboardingSkip");
  const finishButton=document.getElementById("onboardingFinish");
  const activeButton=includeOptional?finishButton:skipButton;
  skipButton.disabled=true;
  finishButton.disabled=true;
  activeButton.textContent=t("savingSetup");
  try{
    await data.saveSettings({language:state.lang,region:state.region,currency:state.currency,mapStyle:state.globeStyle,dayNight:state.dayNight});
    let profile=currentProfile;
    if(includeOptional){
      state.hubs=new Set([...onboardingHubs].filter(code=>airports[code]));
      await data.replaceHubs([...state.hubs]);
      await saveFavouriteValues(favouriteValuesFrom("onboarding"));
      const avatarFile=document.getElementById("onboardingAvatarInput").files[0];
      if(avatarFile)profile=await data.uploadAvatar(avatarFile);
    }
    profile=await data.saveProfile({onboardingCompleted:true,avatarUrl:profile.avatar_url});
    currentProfile={...currentProfile,...profile,onboarding_completed:true};
    renderProfile(currentProfile);
    closeOnboarding();
    applyLanguage(state.lang);
    renderHubSettings();
    drawGlobe();
    showToast(t("setupComplete"),t("setupComplete"));
  }catch(error){
    showToast(t("saveFailed"),error?.message || String(error));
  }finally{
    skipButton.disabled=false;
    finishButton.disabled=false;
    skipButton.textContent=t("skipForNow");
    finishButton.textContent=t("finishSetup");
  }
}

// Globe rendering
const canvas = document.getElementById("globeCanvas");
const ctx = canvas.getContext("2d");
const daylightCanvas=document.createElement("canvas");
const daylightCtx=daylightCanvas.getContext("2d");
let cw = 0, ch = 0, globeR = 200, centerX = 0, centerY = 0;
const firstHubAirport=airports[[...state.hubs][0]]||airports.CAN;
let rotation = { lon: -firstHubAirport.lon, lat: firstHubAirport.lat };
let dragging = false, moved = false, lastPointer = null, autoSpin = true;
let routeHitAreas = [], airportHitAreas = [], countryHitAreas = [];
let flatView = { zoom:1.08, panX:0, panY:0 };

const rad = value => value * Math.PI / 180;
function flatViewport() {
  const mapAspect=2;
  let mapWidth=cw,mapHeight=mapWidth/mapAspect;
  if(mapHeight<ch){mapHeight=ch;mapWidth=mapHeight*mapAspect;}
  return {x:0,y:0,width:cw,height:ch,mapWidth,mapHeight};
}
function cylindricalPoint(lat,lon) {
  return {x:lon/180,y:Math.max(-90,Math.min(90,lat))/90};
}
function projectFlat(lat,lon) {
  const viewport=flatViewport(),point=cylindricalPoint(lat,lon);
  return {
    x:centerX+point.x*viewport.mapWidth*.5*flatView.zoom+flatView.panX,
    y:centerY-point.y*viewport.mapHeight*.5*flatView.zoom+flatView.panY,
    z:1
  };
}
function normalizeFlatPanX() {
  const worldWidth=flatViewport().mapWidth*flatView.zoom;
  if(!worldWidth)return;
  flatView.panX=((flatView.panX+worldWidth*.5)%worldWidth+worldWidth)%worldWidth-worldWidth*.5;
}
function clampFlatPan() {
  const viewport=flatViewport();
  const maxY=Math.max(0,(viewport.mapHeight*flatView.zoom-ch)/2);
  normalizeFlatPanX();
  flatView.panY=Math.max(-maxY,Math.min(maxY,flatView.panY));
}
function project(lat, lon, altitude = 0) {
  if(state.globeStyle==="flat")return projectFlat(lat,lon);
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
    if(document.getElementById("countryStatsMap"))drawCountryStatsMap(countryStatsMapFlights);
  }
}
function viewVector(lat,lon) {
  const phi=rad(lat),lambda=rad(lon+rotation.lon),tilt=rad(rotation.lat);
  const x=Math.cos(phi)*Math.sin(lambda);
  const y0=Math.sin(phi),z0=Math.cos(phi)*Math.cos(lambda);
  return {x,y:y0*Math.cos(tilt)-z0*Math.sin(tilt),z:y0*Math.sin(tilt)+z0*Math.cos(tilt)};
}
function unwrapRing(ring) {
  let previous=null,offset=0;
  return ring.map(([lon,lat])=>{
    let unwrapped=lon+offset;
    if(previous!==null){
      while(unwrapped-previous>180){offset-=360;unwrapped-=360;}
      while(unwrapped-previous<-180){offset+=360;unwrapped+=360;}
    }
    previous=unwrapped;
    return [unwrapped,lat];
  });
}
function rotateRingAtDateline(ring) {
  if(ring.length<3)return ring;
  let seamIndex=0,largestJump=0;
  for(let index=1;index<ring.length;index++){
    const jump=Math.abs(ring[index][0]-ring[index-1][0]);
    if(jump>largestJump){largestJump=jump;seamIndex=index;}
  }
  if(largestJump<180)return ring;
  const closed=ring[0][0]===ring[ring.length-1][0]&&ring[0][1]===ring[ring.length-1][1];
  const openRing=closed?ring.slice(0,-1):ring;
  const start=Math.min(seamIndex,openRing.length-1);
  const rotated=[...openRing.slice(start),...openRing.slice(0,start)];
  if(closed)rotated.push(rotated[0]);
  return rotated;
}
function pointsIntersectViewport(points,viewport,padding=0) {
  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  points.forEach(point=>{
    minX=Math.min(minX,point.x);maxX=Math.max(maxX,point.x);
    minY=Math.min(minY,point.y);maxY=Math.max(maxY,point.y);
  });
  return maxX>=viewport.x-padding&&minX<=viewport.x+viewport.width+padding&&
    maxY>=viewport.y-padding&&minY<=viewport.y+viewport.height+padding;
}
function drawFlatLand() {
  countryHitAreas=[];
  const viewport=flatViewport();
  const mapVisited=activeVisitedCountries();
  landFeatures.forEach(feature=>{
    const visited=mapVisited.has(feature.name);
    const selected=state.selectedCountry===feature.name;
    feature.rings.forEach(ring=>{
      const continuous=unwrapRing(rotateRingAtDateline(ring));
      const longitudes=continuous.map(point=>point[0]);
      const closesAtSouthPole=feature.name==="Antarctica"&&Math.max(...longitudes)-Math.min(...longitudes)>300;
      [-360,0,360].forEach(shift=>{
        const points=continuous.map(([lon,lat])=>projectFlat(lat,lon+shift));
        if(closesAtSouthPole){
          points.push(projectFlat(-90,continuous[continuous.length-1][0]+shift));
          points.push(projectFlat(-90,continuous[0][0]+shift));
        }
        if(!points.length)return;
        if(!pointsIntersectViewport(points,viewport,8))return;
        ctx.beginPath();
        points.forEach((p,index)=>index?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
        ctx.closePath();
        ctx.fillStyle=selected?"#f5b24a":visited?"#e99a32":"#cdd7da";
        ctx.fill();
        ctx.strokeStyle=selected?"rgba(125,72,5,.92)":visited?"rgba(178,99,11,.7)":"rgba(72,94,105,.5)";
        ctx.lineWidth=selected?1.35:visited?.8:.5;
        ctx.stroke();
        countryHitAreas.push({name:feature.name,points});
      });
    });
  });
}
function drawLand() {
  if(state.globeStyle==="flat"){drawFlatLand();return;}
  countryHitAreas=[];
  const orbit=state.globeStyle==="orbit";
  const satelliteLand=ctx.createLinearGradient(centerX,centerY-globeR,centerX,centerY+globeR);
  satelliteLand.addColorStop(0,"#687066");
  satelliteLand.addColorStop(.25,"#65704b");
  satelliteLand.addColorStop(.5,"#345b3f");
  satelliteLand.addColorStop(.74,"#6e704a");
  satelliteLand.addColorStop(1,"#677069");
  const mapVisited=activeVisitedCountries();
  landFeatures.forEach(feature=>{
    const visited=mapVisited.has(feature.name);
    const selected=state.selectedCountry===feature.name;
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
        if(visited||selected){ctx.fillStyle=selected?"rgba(255,177,61,.88)":"rgba(242,148,32,.62)";ctx.fill();}
        if(selected){ctx.strokeStyle="rgba(255,215,142,.95)";ctx.lineWidth=1.35;}
        ctx.stroke();
        countryHitAreas.push({name:feature.name,points:segment});
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
  if(state.globeStyle!=="orbit"||!state.dayNight)return;
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
function drawDayNightShade(){
  if(state.globeStyle!=="orbit"||!state.dayNight)return;
  const sun=solarPosition(),sunView=viewVector(sun.lat,sun.lon);
  const size=192;
  if(daylightCanvas.width!==size){daylightCanvas.width=size;daylightCanvas.height=size;}
  const image=daylightCtx.createImageData(size,size),pixels=image.data;
  const smoothstep=value=>value*value*(3-2*value);
  for(let py=0;py<size;py++)for(let px=0;px<size;px++){
    const sx=(px+.5)/size*2-1,screenY=(py+.5)/size*2-1,r2=sx*sx+screenY*screenY;
    if(r2>1)continue;
    const surface={x:sx,y:-screenY,z:Math.sqrt(1-r2)};
    const light=surface.x*sunView.x+surface.y*sunView.y+surface.z*sunView.z;
    const transition=smoothstep(Math.max(0,Math.min(1,(light+.12)/.24)));
    const offset=(py*size+px)*4;
    pixels[offset]=1;pixels[offset+1]=9;pixels[offset+2]=23;
    pixels[offset+3]=Math.round(178*(1-transition));
  }
  daylightCtx.putImageData(image,0,0);
  ctx.imageSmoothingEnabled=true;
  ctx.drawImage(daylightCanvas,centerX-globeR,centerY-globeR,globeR*2,globeR*2);
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
  activeMapRoutes().forEach(route=>{
    const geoPoints=greatCircle(airports[route.from],airports[route.to]);
    let segments;
    if(state.globeStyle==="flat"){
      const continuous=unwrapRing(geoPoints.map(p=>[p.lon,p.lat]));
      const viewport=flatViewport();
      segments=[-360,0,360]
        .map(shift=>continuous.map(([lon,lat])=>projectFlat(lat,lon+shift)))
        .filter(points=>pointsIntersectViewport(points,viewport,12));
    }else{
      const points=geoPoints.map((p,i,array)=>project(p.lat,p.lon,Math.sin(Math.PI*i/(array.length-1))*.055));
      segments=visibleSegments(points,-.01);
    }
    segments.forEach(segment=>{
      const selected=state.selectedRoute?.id===route.id;
      const connected=Boolean(state.selectedAirport&&(route.from===state.selectedAirport||route.to===state.selectedAirport));
      const countryConnected=Boolean(state.selectedCountry&&(
        geoCountryName(airports[route.from])===state.selectedCountry||geoCountryName(airports[route.to])===state.selectedCountry
      ));
      const highlighted=selected||connected||countryConnected;
      const orbit=state.globeStyle==="orbit";
      const flat=state.globeStyle==="flat";
      ctx.beginPath(); segment.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      ctx.strokeStyle=orbit?(highlighted?"#f4fdff":"#d4f4ff"):(highlighted?"#065fd4":"#1877f2");
      ctx.lineWidth=(highlighted?2.25:1)+route.count*.22;
      ctx.globalAlpha=orbit?(highlighted?1:.5+route.count*.055):(highlighted?1:(flat?.34:.22)+route.count*.1);
      ctx.shadowColor=orbit?"#78d9ff":"#1877f2";
      ctx.shadowBlur=orbit?(highlighted?18:8+route.count*.7):(highlighted?12:flat?2:0);
      ctx.setLineDash([]);ctx.stroke();
      routeHitAreas.push({route,points:segment});
    });
  });
  ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.setLineDash([]);ctx.lineDashOffset=0;
}
function drawAirports() {
  airportHitAreas=[];
  const codes=new Set(activeMapRoutes().flatMap(r=>[r.from,r.to]));
  if(!state.friendRecords?.mapVisible)state.hubs.forEach(code=>codes.add(code));
  codes.forEach(code=>{
    const airport=airports[code],flat=state.globeStyle==="flat";
    if(!airport)return;
    const positions=flat
      ? [-360,0,360].map(shift=>projectFlat(airport.lat,airport.lon+shift))
      : [project(airport.lat,airport.lon)];
    const selected=state.selectedAirport===code,hub=!state.friendRecords?.mapVisible&&state.hubs.has(code);
    const radius=selected?5.5:state.mapMode==="airport"?3.8:2.7;
    positions.forEach(p=>{
      if(!flat&&p.z<=0)return;
      if(flat){
        const viewport=flatViewport();
        if(p.x<viewport.x||p.x>viewport.x+viewport.width||p.y<viewport.y||p.y>viewport.y+viewport.height)return;
      }
      ctx.beginPath();ctx.arc(p.x,p.y,radius+3,0,Math.PI*2);ctx.fillStyle=hub?"rgba(230,75,46,.19)":selected?"rgba(24,119,242,.22)":"rgba(24,119,242,.08)";ctx.fill();
      ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fillStyle=hub?"#e64b2e":selected?"#0b5fc9":"#1877f2";ctx.fill();
      if(selected||state.mapMode==="airport"){
        ctx.font="600 9px DM Sans";ctx.fillStyle=state.globeStyle==="orbit"?"#dcecf0":"#3e4b5f";ctx.fillText(code,p.x+8,p.y-6);
      }
      airportHitAreas.push({code,x:p.x,y:p.y});
    });
  });
}
function drawFlatMap() {
  ctx.fillStyle="#e8f0f4";
  ctx.fillRect(0,0,cw,ch);
  drawLand();
  if(state.mapMode==="route"||state.selectedAirport)drawRoutes();else routeHitAreas=[];
  drawAirports();
}
function drawGlobe(time=performance.now()) {
  if(!cw||!ch)return;
  ctx.clearRect(0,0,cw,ch);
  if(state.globeStyle==="flat"){drawFlatMap();return;}
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
  drawLand();drawDayNightShade();drawSurfaceReflection();drawNightLights();
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
  clampFlatPan();
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
function pointInPolygon(point,points){
  let inside=false;
  for(let index=0,previous=points.length-1;index<points.length;previous=index++){
    const currentPoint=points[index],previousPoint=points[previous];
    const crosses=(currentPoint.y>point.y)!==(previousPoint.y>point.y) &&
      point.x<(previousPoint.x-currentPoint.x)*(point.y-currentPoint.y)/(previousPoint.y-currentPoint.y)+currentPoint.x;
    if(crosses)inside=!inside;
  }
  return inside;
}
function hitCountry(pos){
  for(let index=countryHitAreas.length-1;index>=0;index--){
    const area=countryHitAreas[index];
    if(area.points.length>=3&&pointInPolygon(pos,area.points))return area.name;
  }
  return null;
}
canvas.addEventListener("pointerdown",e=>{dragging=true;moved=false;autoSpin=false;lastPointer=pointerPos(e);canvas.setPointerCapture(e.pointerId);canvas.classList.add("dragging");});
canvas.addEventListener("pointermove",e=>{
  const pos=pointerPos(e);
  if(dragging){
    const dx=pos.x-lastPointer.x,dy=pos.y-lastPointer.y;
    if(Math.abs(dx)+Math.abs(dy)>2)moved=true;
    if(state.globeStyle==="flat"){
      flatView.panX+=dx;flatView.panY+=dy;clampFlatPan();
    }else{
      const baseRadius=Math.min(cw,ch)*.43;
      const dragScale=Math.max(.22,Math.min(1,baseRadius/globeR));
      rotation.lon+=dx*.3*dragScale;
      rotation.lat=Math.max(-72,Math.min(72,rotation.lat+dy*.25*dragScale));
    }
    lastPointer=pos;drawGlobe();return;
  }
  const airportHit=hitAirport(pos),routeHit=state.mapMode==="route"?hitRoute(pos):null,countryHit=hitCountry(pos),tooltip=document.getElementById("hoverTooltip");
  canvas.style.cursor=airportHit||routeHit||countryHit?"pointer":"grab";
  if(airportHit){
    const airport=airports[airportHit.code];tooltip.style.display="block";tooltip.style.left=`${pos.x+12}px`;tooltip.style.top=`${pos.y+10}px`;tooltip.innerHTML=`<b>${airport.code}</b> · ${airportName(airport)}${state.hubs.has(airport.code)?` · ${t("hub")}`:""}`;
  }else if(routeHit){
    tooltip.style.display="block";tooltip.style.left=`${pos.x+12}px`;tooltip.style.top=`${pos.y+10}px`;tooltip.innerHTML=`${airportCity(airports[routeHit.from])} — ${airportCity(airports[routeHit.to])} · <b>${routeHit.count} ${t("times")}</b>`;
  }else if(countryHit){
    const sample=Object.values(airports).find(airport=>geoCountryName(airport)===countryHit);
    tooltip.style.display="block";tooltip.style.left=`${pos.x+12}px`;tooltip.style.top=`${pos.y+10}px`;tooltip.textContent=sample?.countryCode?displayName("region",sample.countryCode):countryHit;
  }else tooltip.style.display="none";
});
canvas.addEventListener("pointerup",e=>{
  if(!moved){
    const pos=pointerPos(e),airportHit=hitAirport(pos),routeHit=state.mapMode==="route"?hitRoute(pos):null,countryHit=hitCountry(pos);
    if(airportHit)openAirportDrawer(airportHit.code);else if(routeHit)openRouteDrawer(routeHit);else if(countryHit)openCountryDrawer(countryHit);else closeDrawer();
  }
  dragging=false;lastPointer=null;canvas.classList.remove("dragging");
});
canvas.addEventListener("pointerleave",()=>document.getElementById("hoverTooltip").style.display="none");
canvas.addEventListener("wheel",e=>{
  e.preventDefault();
  if(state.globeStyle==="flat"){
    const pos=pointerPos(e),oldZoom=flatView.zoom;
    flatView.zoom=Math.max(1,Math.min(5,flatView.zoom-e.deltaY*.0015));
    const scale=flatView.zoom/oldZoom;
    flatView.panX=pos.x-centerX-(pos.x-centerX-flatView.panX)*scale;
    flatView.panY=pos.y-centerY-(pos.y-centerY-flatView.panY)*scale;
    clampFlatPan();
  }else{
    const viewportSize=Math.min(cw,ch);
    globeR=Math.max(viewportSize*.31,Math.min(viewportSize*1.35,globeR-e.deltaY*.22));
  }
  drawGlobe();
},{passive:false});
let lastFrame=0;
function animate(time){
  if(state.activeView==="atlas"&&time-lastFrame>40){
    if(autoSpin&&state.globeStyle!=="flat")rotation.lon+=.016;
    drawGlobe(time);lastFrame=time;
  }
  requestAnimationFrame(animate);
}

const airportAutocomplete=document.getElementById("airportAutocomplete");
let activeAirportInput=null;
function closeAirportAutocomplete(){
  airportAutocomplete.hidden=true;
  airportAutocomplete.innerHTML="";
  activeAirportInput=null;
}
function positionAirportAutocomplete(input){
  const rect=input.getBoundingClientRect();
  airportAutocomplete.style.left=`${Math.max(8,Math.min(rect.left,window.innerWidth-Math.min(520,rect.width)-8))}px`;
  airportAutocomplete.style.top=`${Math.min(window.innerHeight-160,rect.bottom+5)}px`;
  airportAutocomplete.style.width=`${Math.max(300,Math.min(520,rect.width))}px`;
}
function renderAirportAutocomplete(input){
  const query=input.value.trim();
  if(!query){closeAirportAutocomplete();return;}
  activeAirportInput=input;
  const full=input.dataset.fullAirportSearch==="true";
  const result=airportSearchResults(query,{full,limit:12});
  positionAirportAutocomplete(input);
  airportAutocomplete.innerHTML=`
    ${result.needsFull?`<button class="airport-search-all" type="button" data-airport-full-search><strong>${t("fullAirportSearch")}</strong><small>${escapeHtml(query.toUpperCase())}</small></button>`:""}
    ${result.matches.map(airport=>`<button class="airport-search-result" type="button" data-airport-code="${airport.code}"><b>${airport.code}</b><span><strong>${escapeHtml(airportCity(airport))}</strong><small>${escapeHtml(airportName(airport))} · ${escapeHtml(airportCountry(airport))}</small></span></button>`).join("")}
    ${!result.matches.length&&!result.needsFull?`<p>${t("noAirportMatches")}</p>`:""}`;
  airportAutocomplete.hidden=false;
  airportAutocomplete.querySelector("[data-airport-full-search]")?.addEventListener("mousedown",event=>{
    event.preventDefault();input.dataset.fullAirportSearch="true";renderAirportAutocomplete(input);
  });
  airportAutocomplete.querySelectorAll("[data-airport-code]").forEach(button=>button.addEventListener("mousedown",event=>{
    event.preventDefault();
    input.value=button.dataset.airportCode;
    input.dataset.fullAirportSearch="false";
    input.dispatchEvent(new Event("change",{bubbles:true}));
    closeAirportAutocomplete();
  }));
}
function installAirportAutocomplete(){
  const ids=[
    "completedLookupFrom","completedLookupTo","formFrom","formTo",
    "incomingLookupFrom","incomingLookupTo","incomingFrom","incomingTo",
    "favouriteAirportInput","onboardingFavouriteAirport"
  ];
  ids.map(id=>document.getElementById(id)).filter(Boolean).forEach(input=>{
    input.removeAttribute("list");
    input.dataset.fullAirportSearch="false";
    input.addEventListener("focus",()=>renderAirportAutocomplete(input));
    input.addEventListener("input",()=>{input.dataset.fullAirportSearch="false";renderAirportAutocomplete(input);});
    input.addEventListener("keydown",event=>{
      if(event.key==="Escape"){closeAirportAutocomplete();return;}
      if(event.key==="Enter"&&!airportAutocomplete.hidden&&activeAirportInput===input){
        const first=airportAutocomplete.querySelector("[data-airport-code]");
        if(first){event.preventDefault();event.stopPropagation();first.dispatchEvent(new MouseEvent("mousedown",{bubbles:true}));}
      }
    });
  });
}
installAirportAutocomplete();
document.addEventListener("pointerdown",event=>{
  if(!event.target.closest("#airportAutocomplete")&&event.target!==activeAirportInput)closeAirportAutocomplete();
});
window.addEventListener("resize",()=>{if(activeAirportInput&&!airportAutocomplete.hidden)positionAirportAutocomplete(activeAirportInput);});

const cityAutocomplete=document.getElementById("cityAutocomplete");
let activeCityInput=null;
function closeCityAutocomplete(){
  cityAutocomplete.hidden=true;
  cityAutocomplete.innerHTML="";
  activeCityInput=null;
}
function positionCityAutocomplete(input){
  const rect=input.getBoundingClientRect();
  cityAutocomplete.style.left=`${Math.max(8,Math.min(rect.left,window.innerWidth-Math.min(520,rect.width)-8))}px`;
  cityAutocomplete.style.top=`${Math.min(window.innerHeight-160,rect.bottom+5)}px`;
  cityAutocomplete.style.width=`${Math.max(300,Math.min(520,rect.width))}px`;
}
function renderCityAutocomplete(input){
  const query=input.value.trim();
  if(!query){closeCityAutocomplete();return;}
  activeCityInput=input;
  const result=citySearchResults(query,{full:input.dataset.fullCitySearch==="true",limit:14});
  positionCityAutocomplete(input);
  cityAutocomplete.innerHTML=`
    ${result.needsFull?`<button class="airport-search-all" type="button" data-city-full-search><strong>${t("fullCitySearch")}</strong><small>${escapeHtml(query)}</small></button>`:""}
    ${result.matches.map(city=>`<button class="airport-search-result" type="button" data-city-value="${escapeHtml(city.value)}"><b>${escapeHtml(city.countryCode)}</b><span><strong>${escapeHtml(cityLabel(city))}</strong><small>${escapeHtml(displayName("region",city.countryCode))}</small></span></button>`).join("")}
    ${!result.matches.length&&!result.needsFull?`<p>${t("noSearchResults")}</p>`:""}`;
  cityAutocomplete.hidden=false;
  cityAutocomplete.querySelector("[data-city-full-search]")?.addEventListener("mousedown",event=>{
    event.preventDefault();input.dataset.fullCitySearch="true";renderCityAutocomplete(input);
  });
  cityAutocomplete.querySelectorAll("[data-city-value]").forEach(button=>button.addEventListener("mousedown",event=>{
    event.preventDefault();
    const city=cityIndex.find(item=>item.value===button.dataset.cityValue);
    if(!city)return;
    input.value=cityDisplay(city);
    input.dataset.cityValue=city.value;
    input.dataset.fullCitySearch="false";
    input.dispatchEvent(new Event("change",{bubbles:true}));
    closeCityAutocomplete();
  }));
}
function installCityAutocomplete(input){
  if(!input||input.dataset.cityAutocompleteInstalled==="true")return;
  input.dataset.cityAutocompleteInstalled="true";
  input.dataset.fullCitySearch="false";
  input.removeAttribute("list");
  input.addEventListener("focus",()=>renderCityAutocomplete(input));
  input.addEventListener("input",()=>{
    input.dataset.cityValue="";
    input.dataset.fullCitySearch="false";
    renderCityAutocomplete(input);
  });
  input.addEventListener("keydown",event=>{
    if(event.key==="Escape"){closeCityAutocomplete();return;}
    if(event.key==="Enter"&&!cityAutocomplete.hidden&&activeCityInput===input){
      const first=cityAutocomplete.querySelector("[data-city-value]");
      if(first){event.preventDefault();event.stopPropagation();first.dispatchEvent(new MouseEvent("mousedown",{bubbles:true}));}
    }
  });
}
["favouriteCityInput","onboardingFavouriteCity"].forEach(id=>installCityAutocomplete(document.getElementById(id)));
document.addEventListener("pointerdown",event=>{
  if(!event.target.closest("#cityAutocomplete")&&event.target!==activeCityInput)closeCityAutocomplete();
});
window.addEventListener("resize",()=>{if(activeCityInput&&!cityAutocomplete.hidden)positionCityAutocomplete(activeCityInput);});

document.querySelectorAll(".nav-item[data-view]").forEach(el=>el.addEventListener("click",()=>setView(el.dataset.view)));
document.querySelectorAll("[data-view-link]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();setView(el.dataset.viewLink);}));
document.getElementById("incomingNavButton").addEventListener("click",()=>setIncomingMode(true));
document.getElementById("incomingBackButton").addEventListener("click",()=>setIncomingMode(false));
document.getElementById("incomingCollapseButton").addEventListener("click",()=>{
  const shell=document.getElementById("appShell");
  const collapsed=shell.classList.toggle("incoming-collapsed");
  const button=document.getElementById("incomingCollapseButton");
  button.title=t(collapsed?"expandIncoming":"collapseIncoming");
  button.setAttribute("aria-label",button.title);
});
document.getElementById("addIncomingButton").addEventListener("click",prepareIncomingForm);
document.getElementById("completedManualAdd").addEventListener("click",()=>openManualFlightEntry("completed"));
document.getElementById("incomingManualAdd").addEventListener("click",()=>openManualFlightEntry("incoming"));
document.getElementById("completedLookupSearch").addEventListener("click",()=>searchFlightLookup("completed"));
document.getElementById("incomingLookupSearch").addEventListener("click",()=>searchFlightLookup("incoming"));
document.getElementById("completedLookupDone").addEventListener("click",()=>{state.bundleSession=null;closeModals();});
document.getElementById("completedLookupAddAnother").addEventListener("click",()=>prepareAddForm({preserveBundle:true}));
document.getElementById("completedBundleToggle").addEventListener("change",event=>{
  document.getElementById("completedBundleFields").hidden=!event.target.checked;
  if(!event.target.checked)state.bundleSession=null;
});
document.getElementById("incomingLookupDone").addEventListener("click",closeModals);
document.getElementById("completedLookupContinue").addEventListener("click",()=>prepareEditForm(flightLookupState.completed.addedId));
document.getElementById("incomingLookupContinue").addEventListener("click",()=>prepareIncomingEditForm(flightLookupState.incoming.addedId));
["completedLookupPanel","incomingLookupPanel"].forEach(id=>document.getElementById(id).addEventListener("keydown",event=>{
  if(event.key!=="Enter"||!event.target.matches("input"))return;
  event.preventDefault();
  searchFlightLookup(id.startsWith("completed")?"completed":"incoming");
}));
document.getElementById("collapseButton").addEventListener("click",()=>{document.getElementById("appShell").classList.toggle("sidebar-collapsed");});
document.getElementById("settingsButton").addEventListener("click",()=>{
  setSettingsOpen(!document.getElementById("settingsPanel").classList.contains("open"));
});
document.getElementById("settingsClose").addEventListener("click",()=>setSettingsOpen(false));
document.addEventListener("click",e=>{if(!e.target.closest(".settings-area"))setSettingsOpen(false);});
document.getElementById("editAccountButton").addEventListener("click",()=>setAccountEditing(true));
document.getElementById("cancelAccountEditButton").addEventListener("click",()=>setAccountEditing(false));
document.getElementById("saveProfileButton").addEventListener("click",saveProfileSettings);
document.getElementById("showPasswordEditorButton").addEventListener("click",()=>{
  document.getElementById("passwordEditor").hidden=false;
  document.getElementById("showPasswordEditorButton").hidden=true;
  document.getElementById("newPasswordInput").focus();
});
document.getElementById("changePasswordButton").addEventListener("click",changePassword);
document.getElementById("editFavouritesButton").addEventListener("click",()=>setFavouritesEditing(true));
document.getElementById("saveFavouritesButton").addEventListener("click",saveSettingsFavourites);
document.getElementById("profileAvatarInput").addEventListener("change",event=>{
  const file=event.target.files[0];
  if(!file)return;
  const url=URL.createObjectURL(file);
  document.getElementById("accountAvatar").innerHTML=`<img src="${url}" alt="" />`;
});
document.getElementById("routeMode").addEventListener("click",()=>{
  state.mapMode="route";document.getElementById("routeMode").classList.add("active");document.getElementById("airportMode").classList.remove("active");closeDrawer();drawGlobe();
});
document.getElementById("airportMode").addEventListener("click",()=>{
  state.mapMode="airport";document.getElementById("airportMode").classList.add("active");document.getElementById("routeMode").classList.remove("active");closeDrawer();drawGlobe();
});
document.querySelectorAll("[data-map-style]").forEach(button=>button.addEventListener("click",()=>{
  state.globeStyle=button.dataset.mapStyle;
  document.querySelectorAll("[data-map-style]").forEach(item=>item.classList.toggle("active",item===button));
  persistPreferences();updateMapHelp();closeDrawer();drawGlobe();
}));
document.getElementById("langZh").addEventListener("click",()=>{applyLanguage("zh");persistPreferences();});
document.getElementById("langEn").addEventListener("click",()=>{applyLanguage("en");persistPreferences();});
document.getElementById("regionSelect").addEventListener("change",event=>{
  if(regionOptions.some(option=>option.code===event.target.value)){
    state.region=event.target.value;
    applyRegionalPreferences();
  }
});
document.getElementById("dayNightToggle").addEventListener("change",event=>{
  state.dayNight=event.target.checked;
  persistPreferences();drawGlobe();
});
document.getElementById("currencySelect").addEventListener("change",event=>{
  if(currencyOptions.some(option=>option.code===event.target.value)){
    state.currency=event.target.value;
    applyRegionalPreferences();
  }
});
["Records","Incoming","Statistics"].forEach(key=>{
  document.getElementById(`privacy${key}`).addEventListener("change",event=>{
    state.privacy[key.toLocaleLowerCase()]=event.target.checked;
    persistPreferences();
  });
});
document.getElementById("editHubsButton").addEventListener("click",()=>{
  state.hubEditorOpen=!state.hubEditorOpen;renderHubSettings();
});
document.getElementById("hubSearch").addEventListener("input",event=>{
  state.hubSearch=event.target.value;state.hubFullSearch=false;renderHubSettings();
});
document.getElementById("drawerClose").addEventListener("click",closeDrawer);
document.addEventListener("pointerdown",event=>{
  const drawer=document.getElementById("infoDrawer");
  if(!drawer.classList.contains("open")||drawer.contains(event.target)||event.target===canvas)return;
  closeDrawer();
});
document.getElementById("recordSearch").addEventListener("input",renderFlights);
document.getElementById("recordMoreButton").addEventListener("click",event=>{
  event.stopPropagation();setRecordAddOpen(false);setRecordActionsOpen(document.getElementById("recordActionsMenu").hidden);
});
document.getElementById("recordAddButton").addEventListener("click",event=>{
  event.stopPropagation();setRecordActionsOpen(false);setRecordAddOpen(document.getElementById("recordAddMenu").hidden);
});
document.getElementById("recordFilterMenuButton").addEventListener("click",event=>{
  event.stopPropagation();setRecordFiltersOpen(document.getElementById("recordFilterPanel").hidden);
});
document.getElementById("recordActionsMenu").addEventListener("click",event=>event.stopPropagation());
document.getElementById("recordAddMenu").addEventListener("click",event=>event.stopPropagation());
document.addEventListener("click",event=>{
  if(!event.target.closest(".record-menu-wrap")){setRecordActionsOpen(false);setRecordAddOpen(false);setStatsFiltersOpen(false);}
});
document.getElementById("statsMoreButton").addEventListener("click",event=>{
  event.stopPropagation();setStatsFiltersOpen(document.getElementById("statsFilterMenu").hidden);
});
document.getElementById("statsFilterMenu").addEventListener("click",event=>event.stopPropagation());
document.getElementById("organizeFlightsButton").addEventListener("click",()=>{
  setRecordActionsOpen(false);setRecordSelectionMode(!state.recordSelectionMode);
});
document.getElementById("cancelOrganizeButton").addEventListener("click",()=>setRecordSelectionMode(false));
document.getElementById("toggleTripLabelsButton").addEventListener("click",()=>{
  state.showTripLabels=!state.showTripLabels;
  document.querySelector("#toggleTripLabelsButton span").dataset.i18n=state.showTripLabels?"hideTripLabels":"showTripLabels";
  document.querySelector("#toggleTripLabelsButton span").textContent=t(state.showTripLabels?"hideTripLabels":"showTripLabels");
  setRecordActionsOpen(false);
  renderFlights();
});
document.getElementById("createBundleButton").addEventListener("click",()=>openBundleForScope("completed"));
document.getElementById("addToTripButton").addEventListener("click",()=>openTripForScope("completed"));
document.getElementById("deleteSelectedFlightsButton").addEventListener("click",()=>deleteSelectedForScope("completed"));
document.getElementById("incomingOrganizeButton").addEventListener("click",()=>setIncomingSelectionMode(!state.incomingSelectionMode));
document.getElementById("cancelIncomingOrganizeButton").addEventListener("click",()=>setIncomingSelectionMode(false));
document.getElementById("incomingCreateBundleButton").addEventListener("click",()=>openBundleForScope("incoming"));
document.getElementById("incomingAddToTripButton").addEventListener("click",()=>openTripForScope("incoming"));
document.getElementById("incomingEditTripButton").addEventListener("click",editSelectedIncomingTrip);
document.getElementById("incomingDeleteSelectedButton").addEventListener("click",()=>deleteSelectedForScope("incoming"));
document.getElementById("saveBundleButton").addEventListener("click",saveSelectedBundle);
document.getElementById("saveTripButton").addEventListener("click",saveSelectedTrip);
document.getElementById("yearFilter").addEventListener("change",e=>applyFlightFilters(e.target.value));
document.getElementById("statsYearFilter").addEventListener("change",e=>applyFlightFilters(e.target.value));
document.querySelectorAll("[data-scope]").forEach(el=>el.addEventListener("click",()=>{
  applyFlightFilters(state.yearFilter,el.dataset.scope);
}));
document.querySelectorAll("[data-stats-scope]").forEach(el=>el.addEventListener("click",()=>{
  applyFlightFilters(state.yearFilter,el.dataset.statsScope);
}));
document.querySelectorAll("[data-open-add]").forEach(el=>el.addEventListener("click",()=>{setRecordActionsOpen(false);setRecordAddOpen(false);prepareAddForm();}));
document.getElementById("importButton").addEventListener("click",()=>{setRecordActionsOpen(false);setRecordAddOpen(false);openModal("importModal");});
document.getElementById("detailBackToStats").addEventListener("click",()=>{
  const returnType=state.statsReturnType;
  if(!returnType)return;
  const returnFriend=state.statsReturnFriend;
  state.statsReturnType=null;
  state.statsReturnFriend=false;
  closeModals();
  openStatsDetail(returnType,{friend:returnFriend});
});
document.getElementById("editFlightButton").addEventListener("click",()=>{
  const incoming=plannedIncomingFlights.some(f=>String(f.id)===String(state.activeFlightId));
  closeModals();
  if(incoming)prepareIncomingEditForm(state.activeFlightId);else prepareEditForm(state.activeFlightId);
});
document.getElementById("editDetailTripButton").addEventListener("click",()=>{
  const flight=ownFlights().find(f=>String(f.id)===String(state.activeFlightId)),trip=flightTrip(flight);
  if(!flight||!trip)return;
  closeModals();
  openTripEditor(trip.id||trip.label,recordStatusForFlight(flight)==="upcoming"?"incoming":"completed");
});
document.getElementById("editDetailBundleButton").addEventListener("click",()=>{
  const flight=ownFlights().find(f=>String(f.id)===String(state.activeFlightId));
  if(flight)openBundleEditorForFlight(flight);
});
document.getElementById("deleteFlightButton").addEventListener("click",()=>deleteFlightRecord(state.activeFlightId));
document.getElementById("onboardingContinue").addEventListener("click",acceptRequiredOnboardingPreferences);
document.getElementById("onboardingSkip").addEventListener("click",()=>completeOnboarding(false));
document.getElementById("onboardingFinish").addEventListener("click",()=>completeOnboarding(true));
document.getElementById("onboardingHubSearch").addEventListener("input",event=>{event.target.dataset.fullSearch="false";renderOnboardingHubs();});
document.getElementById("onboardingAvatarInput").addEventListener("change",event=>renderAvatarPreview(event.target.files[0]));
document.getElementById("friendSearchButton").addEventListener("click",searchFriends);
document.getElementById("friendSearchInput").addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();searchFriends();}});
let friendSearchTimer=null;
document.getElementById("friendSearchInput").addEventListener("input",()=>{
  clearTimeout(friendSearchTimer);
  friendSearchTimer=setTimeout(searchFriends,220);
});
document.getElementById("friendMapBack").addEventListener("click",closeFriendRecords);
document.querySelectorAll("[data-friend-view]").forEach(button=>button.addEventListener("click",()=>{
  ({map:showFriendMap,list:showFriendList,statistics:showFriendStatistics}[button.dataset.friendView])();
}));
document.querySelectorAll("[data-friend-content]").forEach(button=>button.addEventListener("click",()=>setFriendContent(button.dataset.friendContent)));
document.getElementById("friendListTripToggle").addEventListener("click",event=>{
  state.friendRecords.listTripLabels=!state.friendRecords.listTripLabels;
  event.currentTarget.dataset.i18n=state.friendRecords.listTripLabels?"hideTripLabels":"showTripLabels";
  event.currentTarget.textContent=t(state.friendRecords.listTripLabels?"hideTripLabels":"showTripLabels");
  renderFriendFlightList();
});
function setFriendFilterPanel(mode,open){
  const list=mode==="list",panel=document.getElementById(list?"friendListFilterPanel":"friendStatsFilterPanel");
  const button=document.getElementById(list?"friendListFilterButton":"friendStatsFilterButton");
  panel.hidden=!open;button.classList.toggle("active",open);button.setAttribute("aria-expanded",String(open));
  if(open)setTimeout(()=>document.getElementById(list?"friendListSearch":"friendStatsSearch").focus(),0);
}
document.getElementById("friendListFilterButton").addEventListener("click",event=>{
  event.stopPropagation();setFriendFilterPanel("stats",false);setFriendFilterPanel("list",document.getElementById("friendListFilterPanel").hidden);
});
document.getElementById("friendStatsFilterButton").addEventListener("click",event=>{
  event.stopPropagation();setFriendFilterPanel("list",false);setFriendFilterPanel("stats",document.getElementById("friendStatsFilterPanel").hidden);
});
["friendListFilterPanel","friendStatsFilterPanel"].forEach(id=>document.getElementById(id).addEventListener("click",event=>event.stopPropagation()));
document.getElementById("friendListSearch").addEventListener("input",event=>{state.friendRecords.filters.list.search=event.target.value;renderFriendFlightList();});
document.getElementById("friendStatsSearch").addEventListener("input",event=>{state.friendRecords.filters.stats.search=event.target.value;renderFriendStatistics();});
document.getElementById("friendListYearFilter").addEventListener("change",event=>{state.friendRecords.filters.list.year=event.target.value;renderFriendFlightList();});
document.getElementById("friendStatsYearFilter").addEventListener("change",event=>{state.friendRecords.filters.stats.year=event.target.value;renderFriendStatistics();});
document.querySelectorAll("[data-friend-list-scope]").forEach(button=>button.addEventListener("click",()=>{
  state.friendRecords.filters.list.scope=button.dataset.friendListScope;syncFriendViewerControls();renderFriendFlightList();
}));
document.querySelectorAll("[data-friend-stats-scope]").forEach(button=>button.addEventListener("click",()=>{
  state.friendRecords.filters.stats.scope=button.dataset.friendStatsScope;syncFriendViewerControls();renderFriendStatistics();
}));
document.addEventListener("click",event=>{
  if(!event.target.closest(".friend-filter-panel")&&!event.target.closest("#friendListFilterButton")&&!event.target.closest("#friendStatsFilterButton")){
    setFriendFilterPanel("list",false);setFriendFilterPanel("stats",false);
  }
});
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModals));
document.querySelectorAll(".modal-backdrop:not(#onboardingModal)").forEach(el=>el.addEventListener("click",e=>{if(e.target===el)closeModals();}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("onboardingModal").classList.contains("open")){closeModals();closeDrawer();setSettingsOpen(false);}});
document.getElementById("flightForm").addEventListener("submit",e=>{
  e.preventDefault();
  const editing=state.editingFlightId!==null;
  const saved=editing?saveEditedFlight():saveNewFlight();
  if(!saved)return;
  if(!editing&&state.bundleSession){
    const flight=flights[0];
    flightLookupState.completed.addedId=flight.id;
    document.getElementById("completedLookupSuccessSummary").textContent=`${flight.flightNo} · ${flight.from} → ${flight.to} · ${formatDate(flight.date)}`;
    document.getElementById("completedLookupAddAnother").hidden=false;
    showFlightEntryStep("completed","success");
    renderFlights();renderStats();drawGlobe();
    return;
  }
  closeModals();
  renderFlights();renderStats();closeDrawer();drawGlobe();
  showToast(t("recordSaved"),editing?t("recordUpdated"):t("recordSaved"));
});
document.getElementById("incomingFlightForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!saveIncomingFlight())return;
  closeModals();
  showToast(t("incomingSaved"),t("recordSaved"));
});
document.querySelector(".drop-zone input").addEventListener("change",e=>{if(e.target.files[0]){closeModals();showToast(t("fileRead"),t("validatingFields"));}});
window.addEventListener("resize",()=>{
  resizeGlobe();
  if(document.getElementById("countryStatsMap"))drawCountryStatsMap(countryStatsMapFlights);
});

function hydrateUserData(payload) {
  flights.splice(0,flights.length,...(payload.flights || []));
  plannedIncomingFlights.splice(0,plannedIncomingFlights.length,...(payload.incomingFlights || []));
  Object.keys(savedFavourites).forEach(key=>delete savedFavourites[key]);
  Object.assign(savedFavourites,payload.favourites || {});
  currentProfile=payload.profile || {};
  renderProfile(currentProfile);
  state.hubs=new Set((payload.hubs || []).filter(code=>airports[code]));
  state.selectedRoute=null;
  state.selectedAirport=null;
  state.yearFilter="all";
  state.scopeFilter="all";
  const settings=payload.settings || {};
  if(["en","zh"].includes(settings.language))state.lang=settings.language;
  if(regionOptions.some(option=>option.code===settings.region))state.region=settings.region;
  if(currencyOptions.some(option=>option.code===settings.currency))state.currency=settings.currency;
  if(["light","orbit","flat"].includes(settings.map_style))state.globeStyle=settings.map_style;
  state.dayNight=settings.day_night!==false;
  state.privacy={
    records:settings.friends_can_view_records!==false,
    incoming:settings.friends_can_view_incoming!==false,
    statistics:settings.friends_can_view_statistics!==false
  };
  document.getElementById("dayNightToggle").checked=state.dayNight;
  document.querySelectorAll("[data-map-style]").forEach(button=>button.classList.toggle("active",button.dataset.mapStyle===state.globeStyle));
  const firstHub=airports[[...state.hubs][0]];
  if(firstHub)rotation={lon:-firstHub.lon,lat:firstHub.lat};
  rebuildRoutes();
  closeDrawer();
  applyLanguage(state.lang);
  renderIncomingFlights();
  drawGlobe();
  if(currentProfile.onboarding_completed===false)openOnboarding();
}

window.flightArchiveApp={hydrateUserData};
window.addEventListener("flightarchive:data-error",event=>{
  showToast(state.lang==="zh"?"数据同步失败":"Data sync failed",event.detail.message);
});

rebuildRoutes();applyLanguage("en");resizeGlobe();loadGeography();requestAnimationFrame(animate);
const feedbackUrl=window.FLIGHT_ARCHIVE_BACKEND?.feedbackUrl;
if(feedbackUrl){
  const feedbackLink=document.getElementById("feedbackLink");
  const updateFeedbackLink=()=>{
    const url=new URL(feedbackUrl);
    const username=currentProfile.username || "";
    if(username)url.searchParams.set("username",username);
    feedbackLink.href=url.toString();
  };
  updateFeedbackLink();
  feedbackLink.addEventListener("click",updateFeedbackLink);
}else{
  document.getElementById("feedbackLink").addEventListener("click",event=>{
    event.preventDefault();
    showToast(t("feedback"),t("feedbackUnavailable"));
  });
}
window.dispatchEvent(new Event("flightarchive:app-ready"));
