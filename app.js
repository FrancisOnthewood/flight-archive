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
    mapSelection:"Map content", routes:"Routes", airports:"Airports", mapHelp:"Drag to rotate, scroll to zoom, and select a route or airport for details.",
    flatMapHelp:"Drag to pan, scroll to zoom, and select a route or airport for details.",
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
    route:"Route", airport:"Airport", flightsRecorded:"Flights", oneWayDistance:"One-way distance",
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
    entryHelp:"Enter the core fields first; other details can be added later.", autoLookup:"Automatic flight lookup",
    autoLookupHelp:"Use the date and flight number to complete times, terminals, and aircraft.", flightDate:"Flight date",
    findRealFlight:"Find a real flight", lookupRequirement:"Date is required. Enter a flight number, or both departure and arrival airports.",
    flightNumberOptional:"Flight number (optional)", departureAirportOptional:"Departure airport (optional)", arrivalAirportOptional:"Arrival airport (optional)",
    manualAdd:"Add manually", searchFlights:"Search flights", searchingFlights:"Searching flight schedules…", lookupNoResults:"No matching flights were found. You can add the flight manually.",
    lookupUnavailable:"Flight lookup is not configured yet. You can add the flight manually.", lookupInvalid:"Enter a date and either a flight number or both airport codes.",
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
    mapSelection:"地图内容", routes:"航线", airports:"机场", mapHelp:"拖拽旋转，滚轮缩放；点击航线或机场查看详情。",
    flatMapHelp:"拖拽平移，滚轮缩放；点击航线或机场查看详情。",
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
    route:"航线", airport:"机场", flightsRecorded:"飞行次数", oneWayDistance:"单程距离",
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
    entryHelp:"先填写核心字段，其他资料可以稍后补充。", autoLookup:"自动查询航班资料",
    autoLookupHelp:"根据日期和航班号补全计划时间、航站楼和机型。", flightDate:"航班日期",
    findRealFlight:"查找真实航班", lookupRequirement:"日期为必填项；请输入航班号，或同时输入出发和到达机场。",
    flightNumberOptional:"航班号（可选）", departureAirportOptional:"出发机场（可选）", arrivalAirportOptional:"到达机场（可选）",
    manualAdd:"手动添加", searchFlights:"查找航班", searchingFlights:"正在查询航班计划…", lookupNoResults:"未找到符合条件的航班，你可以手动添加。",
    lookupUnavailable:"航班查询尚未配置，你可以先手动添加。", lookupInvalid:"请填写日期，并输入航班号或同时输入两个机场代码。",
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
  favouriteCountry:"Favourite country / region", collapseIncoming:"Collapse incoming flights", expandIncoming:"Expand incoming flights",
  avatarUpdated:"Avatar updated", uploadFailed:"Upload failed", saveFailed:"Save failed",
  navFriends:"Friends", friendsTitle:"Friends", friendsHelp:"Connect by username and share flight records with accepted friends.",
  username:"Username", usernamePlaceholder:"Used for friend search", searchUsername:"Search username", search:"Search",
  friendRequests:"Friend requests", yourFriends:"Your friends", addFriend:"Add friend", accept:"Accept", decline:"Decline",
  requestSent:"Request sent", requestPending:"Request pending", friendsSince:"Friends", viewFlights:"View flights",
  backToFriends:"Back to friends", noFriends:"No friends yet.", noFriendRequests:"No pending requests.",
  noSearchResults:"No users match this search.", friendshipUpdated:"Friendship updated", removeFriend:"Remove",
  friendFlights:"flight records", accountEdit:"Edit account", usernameHelp:"3–30 letters, numbers, dots, hyphens, or underscores.",
  changePassword:"Change password", newPasswordPlaceholder:"At least 8 characters", confirmPasswordPlaceholder:"Confirm new password",
  updatePassword:"Update password", passwordUpdated:"Password updated", passwordsDoNotMatch:"Passwords do not match.",
  cityCountry:"City country / region", other:"Other", enterOther:"Enter another value", feedbackUnavailable:"Feedback form is being configured.",
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
  favouriteCountry:"最喜欢的国家 / 地区", collapseIncoming:"收起即将飞行", expandIncoming:"展开即将飞行",
  avatarUpdated:"头像已更新", uploadFailed:"上传失败", saveFailed:"保存失败",
  navFriends:"好友", friendsTitle:"好友", friendsHelp:"通过用户名建立联系；双方成为好友后可互相查看飞行记录。",
  username:"用户名", usernamePlaceholder:"用于好友搜索", searchUsername:"搜索用户名", search:"搜索",
  friendRequests:"好友请求", yourFriends:"我的好友", addFriend:"添加好友", accept:"接受", decline:"拒绝",
  requestSent:"请求已发送", requestPending:"等待对方接受", friendsSince:"已成为好友", viewFlights:"查看飞行记录",
  backToFriends:"返回好友", noFriends:"还没有好友。", noFriendRequests:"没有待处理的好友请求。",
  noSearchResults:"没有找到匹配的用户。", friendshipUpdated:"好友状态已更新", removeFriend:"删除好友",
  friendFlights:"条飞行记录", accountEdit:"编辑账户", usernameHelp:"3–30 位字母、数字、点、连字符或下划线。",
  changePassword:"修改密码", newPasswordPlaceholder:"至少 8 个字符", confirmPasswordPlaceholder:"再次输入新密码",
  updatePassword:"更新密码", passwordUpdated:"密码已更新", passwordsDoNotMatch:"两次输入的密码不一致。",
  cityCountry:"城市所属国家 / 地区", other:"其他项", enterOther:"输入其他内容", feedbackUnavailable:"意见反馈表正在配置中。",
  destinationRegion:"目的地国家 / 地区", destinationCity:"目的地城市", invalidDestinationRegion:"请从列表中选择目的地国家 / 地区。",
  invalidDestinationCity:"请从所选目的地国家 / 地区的城市列表中选择。"
});

const savedHubs = [];
const legacyRegionOptions = [
  { code:"CN", en:"Mainland China", zh:"中国大陆", localeEn:"en-CN", localeZh:"zh-CN" },
  { code:"HK", en:"Hong Kong SAR", zh:"中国香港", localeEn:"en-HK", localeZh:"zh-HK" },
  { code:"MO", en:"Macao SAR", zh:"中国澳门", localeEn:"en-MO", localeZh:"zh-MO" },
  { code:"TW", en:"Taiwan", zh:"中国台湾", localeEn:"en-TW", localeZh:"zh-TW" },
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
const savedRegion="CN";
const savedCurrency="CNY";
const state = {
  activeView:"atlas", yearFilter:"all", scopeFilter:"all", mapMode:"route", globeStyle:"orbit", lang:"en",
  selectedRoute:null, selectedAirport:null, activeFlightId:null, editingFlightId:null, editingIncomingId:null,
  hubs:new Set(savedHubs.filter(code => airports[code])), hubEditorOpen:false, hubSearch:"", incomingMode:false, statsReturnType:null,
  region:savedRegion, currency:savedCurrency, friends:[],friendSearchResults:[],friendRecords:null
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
  try{return new Intl.DisplayNames([lang==="zh"?"zh-CN":"en"],{type}).of(code) || code;}
  catch{return code;}
};
const activeLocale = () => {
  const candidate=`${state.lang==="zh"?"zh":"en"}-${state.region}`;
  try{new Intl.NumberFormat(candidate);return candidate;}catch{return state.lang==="zh"?"zh-CN":"en-CA";}
};
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
      mapStyle:state.globeStyle
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
}
function countryOptionMarkup(selectedValue="") {
  const sorted=[...regionOptions].sort((a,b)=>displayName("region",a.code).localeCompare(displayName("region",b.code),activeLocale()));
  return `<option value="">${t("notSet")}</option>${sorted.map(option=>`<option value="${option.code}" ${option.code===selectedValue?"selected":""}>${escapeHtml(displayName("region",option.code))}</option>`).join("")}`;
}
function airlineByValue(value) {
  return referenceData.airlines.find(airline=>airline.iata===value || airline.icao===value);
}
function airlineIconSource(value) {
  const airline=airlineByValue(value);
  return airlineIcons[value] || (airline?.icao?`./airline-logos/flightaware_logos/${airline.icao}.png`:null);
}
function airlineSearchMarkup() {
  return referenceData.airlines.map(airline=>`<option value="${airline.iata}">${escapeHtml(state.lang==="zh"?`${airline.zh} · ${airline.en}`:airline.en)}</option>`).join("");
}
function aircraftSearchMarkup() {
  return Object.entries(referenceData.aircraft).flatMap(([maker,models])=>models.map(model=>{
    const value=`${maker} ${model}`;
    return `<option value="${escapeHtml(value)}">${escapeHtml(`${maker} · ${model}`)}</option>`;
  })).join("");
}
function regionSearchMarkup() {
  return [...regionOptions].sort((a,b)=>displayName("region",a.code).localeCompare(displayName("region",b.code),activeLocale()))
    .map(option=>`<option value="${option.code}">${escapeHtml(displayName("region",option.code))}</option>`).join("");
}
function normalizeAirlineFavourite(value) {
  const text=String(value||"").trim();
  if(!text)return "";
  if(text.startsWith("OTHER|"))return text;
  const lowered=text.toLocaleLowerCase();
  const airline=referenceData.airlines.find(item=>[item.iata,item.icao,item.en,item.zh].some(label=>String(label).toLocaleLowerCase()===lowered));
  return airline?.iata||`OTHER|${text}`;
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
function citiesForCountry(countryCode) {
  const values=new Map();
  Object.values(airports).filter(airport=>airport.countryCode===countryCode).forEach(airport=>{
    const key=airport.cityEn||airport.city;
    if(key)values.set(key,state.lang==="zh"?(airport.cityZh||airport.city||key):key);
  });
  return [...values].map(([value,label])=>({value,label})).sort((a,b)=>a.label.localeCompare(b.label,activeLocale()));
}
function renderCityOptions(prefix="") {
  const country=document.getElementById(prefix?`${prefix}FavouriteCountry`:"favouriteCountrySelect");
  const input=document.getElementById(prefix?`${prefix}FavouriteCity`:"favouriteCityInput");
  const datalist=document.getElementById(prefix?"onboardingCityOptions":"favouriteCityOptions");
  if(!country||!input||!datalist)return;
  const countryCode=normalizeRegionFavourite(country.value);
  datalist.innerHTML=citiesForCountry(countryCode).map(city=>`<option value="${escapeHtml(city.value)}">${escapeHtml(city.label)}</option>`).join("");
}
function renderFavouriteSettings() {
  const airlineInput=document.getElementById("favouriteAirlineInput");
  if(!airlineInput)return;
  airlineInput.value=savedFavourites.airlines?.startsWith("OTHER|")?savedFavourites.airlines.slice(6):(savedFavourites.airlines||"");
  document.getElementById("favouriteAircraftInput").value=savedFavourites.aircraft?.startsWith("OTHER|")?savedFavourites.aircraft.slice(6):(savedFavourites.aircraft||"");
  document.getElementById("favouriteAirportInput").value=savedFavourites.airports || "";
  const city=storedCityParts(savedFavourites.cities || "");
  document.getElementById("favouriteCountrySelect").value=savedFavourites.countries || city.country || "";
  document.getElementById("favouriteCityInput").value=city.city;
  renderCityOptions();
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
  const city=byId(prefix?"FavouriteCity":"favouriteCityInput").value.trim();
  if(airportInput&&!airport)throw new Error(t("invalidAirportCode"));
  if(destinationRegionInput&&!destinationRegion)throw new Error(t("invalidDestinationRegion"));
  const availableCities=citiesForCountry(destinationRegion);
  const normalizedCity=availableCities.find(item=>[item.value,item.label].some(label=>label.toLocaleLowerCase()===city.toLocaleLowerCase()))?.value||"";
  if(city&&!normalizedCity)throw new Error(t("invalidDestinationCity"));
  return {
    airlines:normalizeAirlineFavourite(airlineInput.value),
    aircraft:normalizeAircraftFavourite(aircraftInput.value),
    airports:airport,
    countries:destinationRegion,
    cities:normalizedCity?`${destinationRegion}|${normalizedCity}`:""
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
  const city=storedCityParts(savedFavourites.cities || "");
  document.getElementById("onboardingFavouriteCountry").value=savedFavourites.countries || city.country || "";
  document.getElementById("onboardingFavouriteAirline").value=savedFavourites.airlines?.startsWith("OTHER|")?savedFavourites.airlines.slice(6):(savedFavourites.airlines||"");
  document.getElementById("onboardingFavouriteAircraft").value=savedFavourites.aircraft?.startsWith("OTHER|")?savedFavourites.aircraft.slice(6):(savedFavourites.aircraft||"");
  renderCityOptions("onboarding");
}
function renderProfile(profile=currentProfile) {
  currentProfile={...currentProfile,...(profile||{})};
  window.flightArchiveBackend?.setProfile(currentProfile);
  const usernameInput=document.getElementById("profileUsername");
  if(usernameInput)usernameInput.value=currentProfile.username || "";
}
function renderAvatarPreview(file) {
  const preview=document.getElementById("onboardingAvatarPreview");
  if(!file || !preview)return;
  const url=URL.createObjectURL(file);
  preview.innerHTML=`<img src="${url}" alt="" />`;
}
async function saveProfileSettings() {
  const username=document.getElementById("profileUsername").value.trim();
  const file=document.getElementById("profileAvatarInput").files[0];
  if(!/^[A-Za-z0-9_.-]{3,30}$/.test(username)){
    showToast(t("saveFailed"),t("usernameHelp"));
    return;
  }
  try{
    let profile=await window.flightArchiveData.saveProfile({displayName:username,username,avatarUrl:currentProfile.avatar_url});
    if(file)profile=await window.flightArchiveData.uploadAvatar(file);
    renderProfile({...profile,display_name:username,username});
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
  if(!editing)renderProfile(currentProfile);
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
  updateMapHelp();
  if (state.selectedRoute) openRouteDrawer(state.selectedRoute);
  if (state.selectedAirport) openAirportDrawer(state.selectedAirport);
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
function lookupCandidateLogo(candidate) {
  const source=airlineIconSource(candidate.airlineCode||"");
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
        <small>${escapeHtml(candidate.departTime||"—")} → ${escapeHtml(candidate.arriveTime||"—")} · ${escapeHtml(candidate.airline||candidate.airlineCode||"—")}${candidate.aircraft?` · ${escapeHtml(candidate.aircraft)}`:""}</small>
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
    scope:airports[from]?.countryCode===airports[to]?.countryCode?"domestic":"international",
    recordStatus,metadata:{source:"aerodatabox",provider_id:candidate.id||null}
  };
}
async function addFlightLookupCandidate(kind,index) {
  const candidate=flightLookupState[kind].candidates[index];
  if(!candidate)return;
  const recordStatus=kind==="completed"?"completed":"upcoming";
  let flight=flightFromLookupCandidate(candidate,recordStatus);
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
    elements.successSummary.textContent=`${flight.flightNo} · ${flight.from} → ${flight.to} · ${formatDate(flight.date)}`;
    showFlightEntryStep(kind,"success");
  }catch(error){
    elements.results.querySelectorAll("button").forEach(button=>button.disabled=false);
    showToast(t("saveFailed"),error?.message||String(error));
  }
}
function openManualFlightEntry(kind) {
  const elements=lookupElements(kind);
  if(kind==="completed"){
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
    const candidates=await window.flightArchiveData.searchFlights({date,flightNumber,from:flightNumber?"":from,to:flightNumber?"":to});
    flightLookupState[kind].candidates=Array.isArray(candidates)?candidates:[];
    elements.status.textContent=candidates.length?"":t("lookupNoResults");
    renderFlightLookupCandidates(kind);
  }catch(error){
    const message=error?.message||String(error);
    elements.status.textContent=/not configured|not found|non-2xx/i.test(message)?t("lookupUnavailable"):message;
    elements.status.classList.add("error");
  }finally{
    elements.search.disabled=false;
  }
}
function prepareAddForm() {
  state.editingFlightId=null;
  const form=document.getElementById("flightForm");
  form.reset();
  document.getElementById("addTitle").dataset.i18n="addFlightRecord";
  document.getElementById("addTitle").textContent=t("addFlightRecord");
  const today=inputDateValue(new Date());
  setFormValue("formDate",today);
  document.getElementById("cabinSelect").value=t("economy");
  resetFlightLookup("completed",today);
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
  showFlightEntryStep("completed","manual");
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
  if(!from || !to)return false;
  const flightNo=document.getElementById("formFlightNo").value.trim().toUpperCase();
  const duration=document.getElementById("formDuration").value.trim() || "0min";
  const fareValue=document.getElementById("formFare").value;
  const distanceValue=Number(document.getElementById("formDistance").value);
  const flight={
    id:crypto.randomUUID(),
    from,
    to,
    date:document.getElementById("formDate").value,
    airline:document.getElementById("formAirline").value.trim() || "Unknown airline",
    airlineShort:(flightNo.match(/^([A-Z0-9]{2})/)||[])[1] || "",
    flightNo,
    aircraft:document.getElementById("formAircraft").value.trim() || "—",
    registration:document.getElementById("formRegistration").value.trim() || "—",
    depart:document.getElementById("formDepart").value || "—",
    arrive:document.getElementById("formArrive").value || "—",
    duration,
    durationMinutes:parseDurationMinutes(duration),
    distance:distanceValue>0?Math.round(distanceValue):estimateAirportDistance(from,to),
    terminalFrom:document.getElementById("formTerminalFrom").value.trim() || "—",
    terminalTo:document.getElementById("formTerminalTo").value.trim() || "—",
    seat:document.getElementById("formSeat").value.trim() || "—",
    cabin:document.getElementById("cabinSelect").value || t("economy"),
    fare:fareValue===""?null:Math.max(0,Number(fareValue)),
    fareCurrency:state.currency,
    fareRaw:fareValue || null,
    fareGroup:null,
    booking:"",
    gate:document.getElementById("formGate").value.trim() || "—",
    status:"",
    note:document.getElementById("formNote").value.trim(),
    scope:airports[from].countryCode===airports[to].countryCode?"domestic":"international",
    recordStatus:"completed"
  };
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
  const icon = airlineIconSource(f.airlineShort);
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
        <div class="route-line"><span>${f.duration}</span><i></i><small>${formatNumber(f.distance)} km</small></div>
        <div class="route-point"><strong>${f.to}</strong><span>${airportCity(to)}</span><small>${f.arrive}</small></div>
      </div>
      <div class="flight-meta">
        <span>${t("aircraft")}<b>${f.aircraft}</b></span><span>${t("cabin")}<b>${displayCabin(f.cabin)}</b></span>
        <span>${t("registration")}<b>${f.registration || "—"}</b></span><span>${t("seat")}<b>${f.seat}</b></span>
      </div>
      <div class="fare-cell"><strong>${formatFare(f.fare)}</strong></div>
      <div class="flight-row-actions">
        <button type="button" data-row-edit="${f.id}" aria-label="${t("editRecord")}" title="${t("editRecord")}"><svg viewBox="0 0 24 24"><path d="m4 16.5-.5 4 4-.5L18.8 8.7l-3.5-3.5L4 16.5Z"/><path d="m13.8 6.7 3.5 3.5"/></svg></button>
        <button type="button" data-row-delete="${f.id}" aria-label="${t("deleteRecord")}" title="${t("deleteRecord")}"><svg viewBox="0 0 24 24"><path d="M4.5 7h15M9 7V4.5h6V7m-8 0 .8 13h8.4L17 7M10 10.5v6M14 10.5v6"/></svg></button>
      </div>
    </article>`;
}

function filteredFlights() {
  return flights.filter(f=>{
    const yearOk=state.yearFilter==="all"||f.date.startsWith(state.yearFilter);
    const scopeOk=state.scopeFilter==="all"||f.scope===state.scopeFilter;
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
  document.getElementById("flightList").innerHTML = list.length ? list.map(flightRowMarkup).join("") : `<div class="empty-state">${t("noRecords")}</div>`;
  document.querySelectorAll("[data-flight-id]").forEach(el => el.addEventListener("click", () => openFlight(el.dataset.flightId)));
  document.querySelectorAll("[data-row-edit]").forEach(button=>button.addEventListener("click",event=>{
    event.stopPropagation();
    prepareEditForm(button.dataset.rowEdit);
  }));
  document.querySelectorAll("[data-row-delete]").forEach(button=>button.addEventListener("click",event=>{
    event.stopPropagation();
    deleteFlightRecord(button.dataset.rowDelete);
  }));
}

function openFlight(id,{returnStatsType=null}={}) {
  const f = [...flights,...plannedIncomingFlights].find(item => String(item.id) === String(id));
  if (!f) return;
  const completedFlight=flights.includes(f);
  state.activeFlightId=f.id;
  state.statsReturnType=returnStatsType;
  document.getElementById("editFlightButton").hidden=!completedFlight;
  document.getElementById("deleteFlightButton").hidden=false;
  const statsBackButton=document.getElementById("detailBackToStats");
  statsBackButton.hidden=!returnStatsType;
  if(returnStatsType){
    const returnTitle={time:t("totalTime"),distance:t("totalDistance"),aircraft:t("aircraftTypes"),airlines:t("airlinesFlown"),countries:t("countriesRegions"),routes:t("directedRoutes"),cities:t("citiesVisited"),fare:t("totalFare")}[returnStatsType];
    document.getElementById("detailBackToStatsLabel").textContent=state.lang==="zh"?`${t("backToStatisticsDetail")}${returnTitle}`:`${t("backToStatisticsDetail")} ${returnTitle}`;
  }
  const from = airports[f.from], to = airports[f.to];
  const set = (id, value) => document.getElementById(id).textContent = value;
  const detailAirlineIcon=airlineIconSource(f.airlineShort);
  document.getElementById("detailLogo").innerHTML = detailAirlineIcon ? `<img src="${detailAirlineIcon}" alt="${f.airline} logo" />` : f.airlineShort;
  set("detailAirline", f.airline); set("detailTitle", f.flightNo); set("detailDate", formatDate(f.date));
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
  return state.incomingMode?incomingFlights():flights;
}
function activeMapRoutes() {
  if(!state.incomingMode)return routes;
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
function incomingRemainingLabel(f) {
  const days=Math.max(0,Math.ceil((departureDateTime(f)-new Date())/86400000));
  if(days===0)return t("today");
  if(days===1)return t("tomorrow");
  return `${days} ${t("days")}`;
}
function incomingFlightMarkup(f,index) {
  return `<button class="incoming-flight" data-incoming-index="${index}">
    <div class="incoming-flight-top">${iconMarkup(f,"incoming-airline-icon")}<span><strong>${f.flightNo}</strong><small>${f.airline}</small></span></div>
    <div class="incoming-flight-route"><strong>${f.from}</strong><i></i><strong>${f.to}</strong><b>${incomingRemainingLabel(f)}</b></div>
    <p>${formatDate(f.date)} · ${f.depart || "—"}</p>
  </button>`;
}
function renderIncomingFlights() {
  const list=incomingFlights();
  const summary=document.getElementById("incomingSummary"),container=document.getElementById("incomingList");
  if(!summary||!container)return;
  summary.textContent=`${list.length} ${t("upcomingCount")}`;
  container.innerHTML=list.length?list.map(incomingFlightMarkup).join(""):`<div class="incoming-empty"><span>✈</span><p>${t("noIncoming")}</p></div>`;
  container.querySelectorAll("[data-incoming-index]").forEach(button=>button.addEventListener("click",()=>{
    const flight=list[Number(button.dataset.incomingIndex)];
    if(flight)openFlight(flight.id);
  }));
}
function estimateAirportDistance(from,to) {
  const a=airports[from],b=airports[to];
  if(!a||!b)return 0;
  const lat1=rad(a.lat),lat2=rad(b.lat),deltaLat=lat2-lat1,deltaLon=rad(b.lon-a.lon);
  const hav=Math.sin(deltaLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(deltaLon/2)**2;
  return Math.round(6371*2*Math.atan2(Math.sqrt(hav),Math.sqrt(1-hav)));
}
function inferDuration(depart,arrive) {
  if(!depart||!arrive)return {text:"—",minutes:0};
  const [dh,dm]=depart.split(":").map(Number),[ah,am]=arrive.split(":").map(Number);
  let minutes=ah*60+am-(dh*60+dm);
  if(minutes<=0)minutes+=1440;
  return {text:`${Math.floor(minutes/60)}h ${minutes%60}m`,minutes};
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
  setFormValue("incomingAirline",flight.airline);
  setFormValue("incomingAircraft",flight.aircraft==="—"?"":flight.aircraft);
  setFormValue("incomingRegistration",flight.registration==="—"?"":flight.registration);
  setFormValue("incomingDuration",flight.duration);
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
  const from=document.getElementById("incomingFrom").value.trim().toUpperCase();
  const to=document.getElementById("incomingTo").value.trim().toUpperCase();
  if(!airports[from]||!airports[to]){
    showToast(t("addIncomingFlight"),t("invalidAirportCode"));
    return false;
  }
  const date=document.getElementById("incomingDate").value;
  const depart=document.getElementById("incomingDepart").value;
  const candidate={date,depart};
  if(!date||!depart||departureDateTime(candidate)<=new Date()){
    showToast(t("addIncomingFlight"),t("futureFlightRequired"));
    return false;
  }
  const flightNo=document.getElementById("incomingFlightNo").value.trim().toUpperCase();
  const airlineShort=(flightNo.match(/^([A-Z0-9]{2})/)||[])[1]||"—";
  const knownAirline=[...flights,...plannedIncomingFlights].find(f=>f.airlineShort===airlineShort)?.airline;
  const arrive=document.getElementById("incomingArrive").value;
  const durationInput=document.getElementById("incomingDuration").value.trim();
  const inferred=inferDuration(depart,arrive);
  const duration=durationInput||inferred.text;
  const durationMinutes=durationInput?parseDurationMinutes(durationInput):inferred.minutes;
  const distanceInput=Number(document.getElementById("incomingDistance").value);
  const fareValue=document.getElementById("incomingFare").value;
  const existing=plannedIncomingFlights.find(item=>String(item.id)===String(state.editingIncomingId));
  const flight={
    id:existing?.id||crypto.randomUUID(),
    from,to,date,depart,arrive:arrive||"—",
    airline:document.getElementById("incomingAirline").value.trim()||knownAirline||airlineShort,
    airlineShort,flightNo,
    aircraft:document.getElementById("incomingAircraft").value.trim()||"—",
    registration:document.getElementById("incomingRegistration").value.trim()||"—",
    duration,durationMinutes,
    distance:distanceInput>0?Math.round(distanceInput):estimateAirportDistance(from,to),
    terminalFrom:document.getElementById("incomingTerminalFrom").value.trim()||"—",
    terminalTo:document.getElementById("incomingTerminalTo").value.trim()||"—",
    seat:document.getElementById("incomingSeat").value.trim()||"—",
    cabin:document.getElementById("incomingCabinSelect").value||t("economy"),
    fare:fareValue===""?null:Math.max(0,Number(fareValue)),fareCurrency:state.currency,fareRaw:fareValue||null,fareGroup:null,
    gate:document.getElementById("incomingGate").value.trim()||"—",
    note:document.getElementById("incomingNote").value.trim(),
    scope:airports[from].countryCode===airports[to].countryCode?"domestic":"international",
    custom:true,recordStatus:"upcoming",metadata:existing?.metadata||{}
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
  state.incomingMode=active;
  if(active){
    state.mapMode="route";
    document.getElementById("routeMode").classList.add("active");
    document.getElementById("airportMode").classList.remove("active");
  }
  const shell=document.getElementById("appShell");
  shell.classList.toggle("incoming-mode",active);
  if(!active)shell.classList.remove("incoming-collapsed");
  document.getElementById("incomingSidebar").setAttribute("aria-hidden",String(!active));
  setSettingsOpen(false);closeDrawer();renderIncomingFlights();drawGlobe();
}

function openRouteDrawer(route) {
  state.selectedRoute = route; state.selectedAirport = null;
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
  state.selectedAirport = code; state.selectedRoute = null;
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

function closeDrawer() {
  document.getElementById("infoDrawer").classList.remove("open");
  state.selectedAirport = null; state.selectedRoute = null;
  drawGlobe();
}

function friendInitial(profile) {
  return String(profile.username||profile.display_name||"?").trim().charAt(0).toUpperCase()||"?";
}
function friendCardMarkup(profile,mode="friend") {
  const username=profile.username?`@${profile.username}`:"";
  let actions="";
  if(mode==="search"){
    const connected=profile.status==="accepted",pending=profile.status==="pending",disabled=connected||pending;
    actions=`<button class="primary" type="button" data-add-friend="${profile.user_id}" ${disabled?"disabled":""}>${t(connected?"friendsSince":pending?"requestPending":"addFriend")}</button>`;
  }else if(mode==="incoming"){
    actions=`<button class="primary" type="button" data-respond-friend="${profile.friendship_id}" data-accept="true">${t("accept")}</button><button type="button" data-respond-friend="${profile.friendship_id}" data-accept="false">${t("decline")}</button>`;
  }else if(mode==="outgoing"){
    actions=`<button type="button" disabled>${t("requestPending")}</button>`;
  }else{
    actions=`<button class="primary" type="button" data-view-friend="${profile.user_id}">${t("viewFlights")}</button><button class="danger" type="button" data-remove-friend="${profile.friendship_id}">${t("removeFriend")}</button>`;
  }
  return `<article class="friend-card">
    <b class="friend-avatar">${escapeHtml(friendInitial(profile))}</b>
    <span class="friend-copy"><strong>${escapeHtml(profile.username||profile.display_name||"Flight Archive user")}</strong><small>${escapeHtml(username)}</small></span>
    <span class="friend-actions">${actions}</span>
  </article>`;
}
function bindFriendActions(container=document) {
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
async function searchFriends() {
  const query=document.getElementById("friendSearchInput").value.trim();
  if(query.length<2)return;
  const container=document.getElementById("friendSearchResults");
  try{
    state.friendSearchResults=await window.flightArchiveData.searchUsers(query);
    container.innerHTML=state.friendSearchResults.length
      ? state.friendSearchResults.map(profile=>friendCardMarkup(profile,"search")).join("")
      : `<div class="friends-empty">${t("noSearchResults")}</div>`;
    bindFriendActions(container);
  }catch(error){
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
function friendFlightMarkup(f) {
  return `<article class="friend-flight-row">
    <div class="airline-cell">${iconMarkup(f)}<div><strong>${escapeHtml(f.flightNo)}</strong><small>${escapeHtml(f.airline)}</small></div></div>
    <b>${escapeHtml(formatDate(f.date))}</b>
    <div class="friend-flight-route"><strong>${f.from}</strong><i></i><strong>${f.to}</strong></div>
    <small>${escapeHtml(f.aircraft)} · ${escapeHtml(durationText(f.durationMinutes))}</small>
  </article>`;
}
async function openFriendRecords(userId) {
  const profile=state.friends.find(item=>item.user_id===userId);
  if(!profile)return;
  try{
    const records=await window.flightArchiveData.getFriendFlights(userId);
    state.friendRecords={profile,records};
    document.getElementById("friendRecordsAvatar").textContent=friendInitial(profile);
    document.getElementById("friendRecordsName").textContent=profile.username||profile.display_name||"Flight Archive user";
    document.getElementById("friendRecordsUsername").textContent=`@${profile.username||""} · ${records.length} ${t("friendFlights")}`;
    document.getElementById("friendFlightList").innerHTML=records.length?records.map(friendFlightMarkup).join(""):`<div class="friends-empty">${t("noRecords")}</div>`;
    document.getElementById("friendRecordsPanel").hidden=false;
  }catch(error){showToast(t("saveFailed"),error?.message||String(error));}
}
function closeFriendRecords() {
  state.friendRecords=null;
  document.getElementById("friendRecordsPanel").hidden=true;
}

function setSettingsOpen(open) {
  if(!open && state.hubEditorOpen){state.hubEditorOpen=false;renderHubSettings();}
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
  state.activeView = view;
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
  else if(type==="airlines")options=[...snapshot.airlines.entries()].map(([value,items])=>({value,label:items[0]?.airline||value,count:items.length}));
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
    label:state.lang==="zh"?`${airline.zh} · ${airline.en}`:airline.en,
    count:0
  }));
  if(type==="aircraft")return Object.entries(referenceData.aircraft).flatMap(([maker,models])=>models.map(model=>({
    value:`${maker} ${model}`,label:`${maker} · ${model}`,count:0
  })));
  if(type==="countries")return [...regionOptions].map(option=>({value:option.code,label:displayName("region",option.code),count:0}))
    .sort((a,b)=>a.label.localeCompare(b.label,activeLocale()));
  if(type==="airports")return Object.values(airports).map(airport=>({
    value:airport.code,label:`${airport.code} · ${airportCity(airport)} · ${airportName(airport)}`,count:0
  })).sort((a,b)=>a.value.localeCompare(b.value));
  if(type==="cities"){
    const country=savedFavourites.countries || storedCityParts(savedFavourites.cities||"").country;
    return citiesForCountry(country).map(city=>({value:`${country}|${city.value}`,label:city.label,count:0}));
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
    if(airline)return state.lang==="zh"?`${airline.zh} · ${airline.en}`:airline.en;
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
function preferenceDetailMarkup(type,sourceFlights) {
  const labels=preferenceLabels(type);
  if(!labels)return "";
  const most=preferenceOptions(type,sourceFlights)[0]||null;
  const favouriteValue=savedFavourites[type]||"";
  const options=favouriteOptions(type);
  const row=(label,value,display,icon,editable=false)=>`<div class="stats-preference-row${editable?" favourite-preference":""}">
    ${icon}
    <div class="stats-preference-copy"><span>${label}</span><strong>${escapeHtml(display)}</strong></div>
    ${editable?`<button class="stats-favourite-edit" type="button" data-edit-favourite>${t("editFavourite")}</button>`:""}
  </div>`;
  return `<section class="stats-preference-panel" data-favourite-card="${type}">
    ${row(t(labels[0]),most?.value||"",most?.label||"—",preferenceIcon(type,most?.value||"",sourceFlights,"stats-preference-logo"))}
    ${row(t(labels[1]),favouriteValue,favouriteDisplay(type,favouriteValue),preferenceIcon(type,favouriteValue,flights,"stats-preference-logo"),true)}
    <div class="stats-favourite-editor" hidden>
      <input data-favourite-input list="statsFavouriteOptions-${type}" value="${escapeHtml(favouriteValue.startsWith("OTHER|")?favouriteValue.slice(6):favouriteValue)}" autocomplete="off" />
      <datalist id="statsFavouriteOptions-${type}">
        ${options.map(option=>`<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("")}
      </datalist>
      <button class="primary-button" type="button" data-save-favourite>${t("saveFavourite")}</button>
    </div>
  </section>`;
}
function normalizeFavouriteEditorValue(type,value) {
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
    const option=favouriteOptions("cities").find(item=>[item.value,item.label].some(label=>label.toLocaleLowerCase()===text.toLocaleLowerCase()));
    if(text&&!option)throw new Error(t("invalidDestinationCity"));
    return option?.value||"";
  }
  return text;
}
function bindFavouriteEditor(type) {
  const card=document.querySelector(`[data-favourite-card="${type}"]`);
  if(!card)return;
  const editor=card.querySelector(".stats-favourite-editor");
  card.querySelector("[data-edit-favourite]").addEventListener("click",()=>{
    editor.hidden=false;
    editor.querySelector("input").focus();
  });
  card.querySelector("[data-save-favourite]").addEventListener("click",async()=>{
    try{
      const value=normalizeFavouriteEditorValue(type,card.querySelector("[data-favourite-input]").value);
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
function renderStats() {
  const scopedFlights=filteredFlights(),s=statsSnapshot(scopedFlights);
  const durationSorted=[...scopedFlights].sort((a,b)=>b.durationMinutes-a.durationMinutes);
  const distanceSorted=[...scopedFlights].sort((a,b)=>b.distance-a.distance);
  const longest=durationSorted[0],shortest=durationSorted.at(-1);
  const farthest=distanceSorted[0],shortestDistance=distanceSorted.at(-1);
  const preferenceHighlights=type=>{
    const labels=preferenceLabels(type),most=preferenceOptions(type,scopedFlights)[0]||null;
    const favouriteValue=savedFavourites[type]||"";
    return [
      {label:t(labels[0]),value:most?.label||"—",icon:preferenceIcon(type,most?.value||"",scopedFlights,"stat-highlight-logo")},
      {label:t(labels[1]),value:favouriteDisplay(type,favouriteValue),icon:preferenceIcon(type,favouriteValue,flights,"stat-highlight-logo")}
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
  document.getElementById("statsList").innerHTML=entries.map(item=>`
    <button class="stat-block${item.highlights.length?"":" simple"}${["time","distance","airlines"].includes(item.type)?" aligned-stat":""}" data-stat="${item.type}">
      <span class="stat-label">${item.label}</span><i class="stat-arrow">›</i>
      <strong class="stat-value">${item.value}</strong><b class="stat-unit">${item.unit}</b>
      ${statHighlightsMarkup(item.highlights)}
    </button>`).join("");
  document.querySelectorAll("[data-stat]").forEach(el=>el.addEventListener("click",()=>openStatsDetail(el.dataset.stat)));
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
      <div class="featured-flight-title">${iconMarkup(f,"featured-airline-icon")}<div><strong>${f.flightNo}</strong><small>${f.airline}</small></div></div>
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
  return {"Hong Kong SAR":"China","Macao SAR":"China"}[name]||name;
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
function openStatsDetail(type) {
  const scopedFlights=filteredFlights(),s=statsSnapshot(scopedFlights);
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
      label:items[0].airline,count:items.length,icon:iconMarkup(items[0],"stats-bar-logo")
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
  if(["aircraft","airlines","airports","countries","cities"].includes(type)){
    content=`${preferenceDetailMarkup(type,scopedFlights)}${content}`;
  }
  document.getElementById("statsDetailTitle").textContent=title;
  document.getElementById("statsDetailSummary").textContent=summary;
  document.getElementById("statsDetailContent").innerHTML=content;
  document.querySelectorAll("#statsDetailContent [data-flight-id]").forEach(el=>el.addEventListener("click",()=>{closeModals();openFlight(el.dataset.flightId,{returnStatsType:type});}));
  bindFavouriteEditor(type);
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
  const available=Object.values(airports).sort((a,b)=>a.code.localeCompare(b.code));
  const selected=[...state.hubs].sort();
  document.getElementById("hubChips").innerHTML=selected.length
    ? selected.map(code=>`<span>${escapeHtml(code)}</span>`).join("")
    : `<span class="empty-hubs">${t("noHubs")}</span>`;
  const searchField=document.getElementById("hubSearchField");
  const searchInput=document.getElementById("hubSearch");
  searchField.classList.toggle("open",state.hubEditorOpen);
  searchInput.value=state.hubSearch;
  const options=document.getElementById("hubOptions");
  options.classList.toggle("open",state.hubEditorOpen);
  options.setAttribute("aria-hidden",String(!state.hubEditorOpen));
  const query=state.hubSearch.trim().toLocaleLowerCase();
  let matches=[];
  if(query.length>=2){
    matches=available.filter(airport=>[
      airport.code,airport.icao,airport.name,airport.nameEn,airport.nameZh,airport.globalName,
      airport.city,airport.cityEn,airport.cityZh,airport.globalCity,
      airport.country,airport.countryEn,airport.countryZh,airport.countryCode
    ].some(value=>String(value||"").toLocaleLowerCase().includes(query))).slice(0,120);
  }else if(!query){
    matches=selected.map(code=>airports[code]).filter(Boolean);
  }
  const countryGroups=new Map();
  matches.forEach(airport=>{
    const country=airportCountry(airport)||airport.countryCode||"—";
    if(!countryGroups.has(country))countryGroups.set(country,[]);
    countryGroups.get(country).push(airport);
  });
  const groupsMarkup=[...countryGroups.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([country,list])=>{
    const selectedCount=list.filter(airport=>state.hubs.has(airport.code)).length;
    return `<details class="hub-country" open>
      <summary><span>${escapeHtml(country)}</span><b>${selectedCount?`${selectedCount} / `:""}${list.length}</b></summary>
      <div>${list.map(airport=>`
        <label class="hub-option">
          <input type="checkbox" value="${escapeHtml(airport.code)}" ${state.hubs.has(airport.code)?"checked":""} />
          <span><strong>${escapeHtml(airport.code)} · ${escapeHtml(airport.icao||"—")} · ${escapeHtml(airportCity(airport)||"—")}</strong><small>${escapeHtml(airportName(airport))}</small></span>
        </label>`).join("")}</div>
    </details>`;
  }).join("");
  if(!state.hubEditorOpen)options.innerHTML="";
  else if(query.length===1)options.innerHTML=`<p class="hub-search-status">${t("airportSearchHint").replace("{count}",formatNumber(available.length))}</p>`;
  else if(!query&&!matches.length)options.innerHTML=`<p class="hub-search-status">${t("airportSearchHint").replace("{count}",formatNumber(available.length))}</p>`;
  else if(query.length>=2&&!matches.length)options.innerHTML=`<p class="hub-search-status">${t("noAirportMatches")}</p>`;
  else options.innerHTML=`${!query?`<p class="hub-search-status">${t("selectedHubAirports")} · ${t("airportSearchHint").replace("{count}",formatNumber(available.length))}</p>`:""}${groupsMarkup}`;
  const editButton=document.getElementById("editHubsButton");
  editButton.classList.toggle("active",state.hubEditorOpen);
  document.getElementById("hubEditLabel").textContent=state.hubEditorOpen?t("done"):t("edit");
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
  const query=search.value.trim().toLocaleLowerCase();
  const selected=[...onboardingHubs].map(code=>airports[code]).filter(Boolean);
  const matches=query.length>=2
    ? Object.values(airports).filter(airport=>[
      airport.code,airport.icao,airport.name,airport.nameEn,airport.nameZh,
      airport.city,airport.cityEn,airport.cityZh,airport.country,airport.countryEn,airport.countryCode
    ].some(value=>String(value||"").toLocaleLowerCase().includes(query))).slice(0,40)
    : selected;
  if(query.length===1){
    results.innerHTML=`<p class="hub-search-status">${t("airportSearchHint").replace("{count}",formatNumber(Object.keys(airports).length))}</p>`;
    return;
  }
  results.innerHTML=matches.length?matches.map(airport=>`
    <label class="hub-option">
      <input type="checkbox" value="${escapeHtml(airport.code)}" ${onboardingHubs.has(airport.code)?"checked":""} />
      <span><strong>${escapeHtml(airport.code)} · ${escapeHtml(airportCity(airport)||"")}</strong><small>${escapeHtml(airportName(airport))}</small></span>
    </label>`).join(""):`<p class="hub-search-status">${query?t("noAirportMatches"):t("airportSearchHint").replace("{count}",formatNumber(Object.keys(airports).length))}</p>`;
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
  document.getElementById("onboardingFavouriteAirline").value=savedFavourites.airlines?.startsWith("OTHER|")?savedFavourites.airlines.slice(6):(savedFavourites.airlines||"");
  document.getElementById("onboardingFavouriteAircraft").value=savedFavourites.aircraft?.startsWith("OTHER|")?savedFavourites.aircraft.slice(6):(savedFavourites.aircraft||"");
  document.getElementById("onboardingFavouriteAirport").value=savedFavourites.airports || "";
  document.getElementById("onboardingFavouriteCity").value=savedFavourites.cities || "";
  const city=storedCityParts(savedFavourites.cities || "");
  document.getElementById("onboardingFavouriteCity").value=city.city;
  document.getElementById("onboardingUsername").value=currentProfile.username || window.flightArchiveBackend?.user?.user_metadata?.username || "";
  document.getElementById("onboardingAvatarInput").value="";
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
  if(!data?.enabled)return;
  const username=document.getElementById("onboardingUsername").value.trim();
  const displayName=username || currentProfile.username || currentProfile.display_name || window.flightArchiveBackend?.user?.user_metadata?.username || "";
  try{
    await data.saveSettings({language:state.lang,region:state.region,currency:state.currency,mapStyle:state.globeStyle});
    let profile=currentProfile;
    if(includeOptional){
      state.hubs=new Set([...onboardingHubs].filter(code=>airports[code]));
      await data.replaceHubs([...state.hubs]);
      await saveFavouriteValues(favouriteValuesFrom("onboarding"));
      const avatarFile=document.getElementById("onboardingAvatarInput").files[0];
      if(avatarFile)profile=await data.uploadAvatar(avatarFile);
    }
    profile=await data.saveProfile({displayName,username,onboardingCompleted:true,avatarUrl:profile.avatar_url});
    currentProfile={...currentProfile,...profile,username,onboarding_completed:true};
    renderProfile(currentProfile);
    closeOnboarding();
    applyLanguage(state.lang);
    renderHubSettings();
    drawGlobe();
    showToast(t("setupComplete"),t("setupComplete"));
  }catch(error){
    showToast(t("saveFailed"),error?.message || String(error));
  }
}

// Globe rendering
const canvas = document.getElementById("globeCanvas");
const ctx = canvas.getContext("2d");
let cw = 0, ch = 0, globeR = 200, centerX = 0, centerY = 0;
const firstHubAirport=airports[[...state.hubs][0]]||airports.CAN;
let rotation = { lon: -firstHubAirport.lon, lat: firstHubAirport.lat };
let dragging = false, moved = false, lastPointer = null, autoSpin = true;
let routeHitAreas = [], airportHitAreas = [];
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
  const viewport=flatViewport();
  landFeatures.forEach(feature=>{
    const visited=visitedCountries.has(feature.name);
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
        ctx.fillStyle=visited?"#e99a32":"#cdd7da";
        ctx.fill();
        ctx.strokeStyle=visited?"rgba(178,99,11,.7)":"rgba(72,94,105,.5)";
        ctx.lineWidth=visited?.8:.5;
        ctx.stroke();
      });
    });
  });
}
function drawLand() {
  if(state.globeStyle==="flat"){drawFlatLand();return;}
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
      const highlighted=selected||connected;
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
  state.hubs.forEach(code=>codes.add(code));
  codes.forEach(code=>{
    const airport=airports[code],flat=state.globeStyle==="flat";
    if(!airport)return;
    const positions=flat
      ? [-360,0,360].map(shift=>projectFlat(airport.lat,airport.lon+shift))
      : [project(airport.lat,airport.lon)];
    const selected=state.selectedAirport===code,hub=state.hubs.has(code);
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
document.getElementById("completedLookupDone").addEventListener("click",closeModals);
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
document.getElementById("changePasswordButton").addEventListener("click",changePassword);
document.getElementById("editFavouritesButton").addEventListener("click",()=>setFavouritesEditing(true));
document.getElementById("saveFavouritesButton").addEventListener("click",saveSettingsFavourites);
document.getElementById("favouriteCountrySelect").addEventListener("change",()=>{document.getElementById("favouriteCityInput").value="";renderCityOptions();});
document.getElementById("onboardingFavouriteCountry").addEventListener("change",()=>{document.getElementById("onboardingFavouriteCity").value="";renderCityOptions("onboarding");});
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
document.getElementById("currencySelect").addEventListener("change",event=>{
  if(currencyOptions.some(option=>option.code===event.target.value)){
    state.currency=event.target.value;
    applyRegionalPreferences();
  }
});
document.getElementById("editHubsButton").addEventListener("click",()=>{
  state.hubEditorOpen=!state.hubEditorOpen;renderHubSettings();
});
document.getElementById("hubSearch").addEventListener("input",event=>{
  state.hubSearch=event.target.value;renderHubSettings();
});
document.getElementById("drawerClose").addEventListener("click",closeDrawer);
document.getElementById("recordSearch").addEventListener("input",renderFlights);
document.getElementById("yearFilter").addEventListener("change",e=>applyFlightFilters(e.target.value));
document.getElementById("statsYearFilter").addEventListener("change",e=>applyFlightFilters(e.target.value));
document.querySelectorAll("[data-scope]").forEach(el=>el.addEventListener("click",()=>{
  applyFlightFilters(state.yearFilter,el.dataset.scope);
}));
document.querySelectorAll("[data-stats-scope]").forEach(el=>el.addEventListener("click",()=>{
  applyFlightFilters(state.yearFilter,el.dataset.statsScope);
}));
document.querySelectorAll("[data-open-add]").forEach(el=>el.addEventListener("click",prepareAddForm));
document.getElementById("importButton").addEventListener("click",()=>openModal("importModal"));
document.getElementById("detailBackToStats").addEventListener("click",()=>{
  const returnType=state.statsReturnType;
  if(!returnType)return;
  state.statsReturnType=null;
  closeModals();
  openStatsDetail(returnType);
});
document.getElementById("editFlightButton").addEventListener("click",()=>{closeModals();prepareEditForm(state.activeFlightId);});
document.getElementById("deleteFlightButton").addEventListener("click",()=>deleteFlightRecord(state.activeFlightId));
document.getElementById("onboardingContinue").addEventListener("click",acceptRequiredOnboardingPreferences);
document.getElementById("onboardingSkip").addEventListener("click",()=>completeOnboarding(false));
document.getElementById("onboardingFinish").addEventListener("click",()=>completeOnboarding(true));
document.getElementById("onboardingHubSearch").addEventListener("input",renderOnboardingHubs);
document.getElementById("onboardingAvatarInput").addEventListener("change",event=>renderAvatarPreview(event.target.files[0]));
document.getElementById("friendSearchButton").addEventListener("click",searchFriends);
document.getElementById("friendSearchInput").addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();searchFriends();}});
document.getElementById("closeFriendRecordsButton").addEventListener("click",closeFriendRecords);
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModals));
document.querySelectorAll(".modal-backdrop:not(#onboardingModal)").forEach(el=>el.addEventListener("click",e=>{if(e.target===el)closeModals();}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("onboardingModal").classList.contains("open")){closeModals();closeDrawer();setSettingsOpen(false);}});
document.getElementById("flightForm").addEventListener("submit",e=>{
  e.preventDefault();
  const editing=state.editingFlightId!==null;
  const saved=editing?saveEditedFlight():saveNewFlight();
  if(!saved){
    showToast(t("invalidAirportCode"),t("recordSaved"));
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
