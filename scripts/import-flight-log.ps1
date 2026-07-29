param(
  [Parameter(Mandatory = $true)]
  [string]$CsvPath,
  [Parameter(Mandatory = $true)]
  [string]$AirportCsvPath,
  [Parameter(Mandatory = $true)]
  [string]$OutputPath
)

$ErrorActionPreference = "Stop"

$cityNames = @{
  SHA = "上海"; CAN = "广州"; PKX = "北京"; WUH = "武汉"; PEK = "北京"
  KTI = "金边"; XMN = "厦门"; SZX = "深圳"; SIN = "新加坡"; HKG = "香港"
  SYD = "悉尼"; MEL = "墨尔本"; DPS = "登巴萨"; KUL = "吉隆坡"; SGN = "胡志明市"
  BWN = "斯里巴加湾"; HLD = "海拉尔"; SJW = "石家庄"; BKI = "亚庇"; PVG = "上海"
  DXB = "迪拜"; MAD = "马德里"; STR = "斯图加特"; BCN = "巴塞罗那"; MUC = "慕尼黑"
  OKA = "冲绳"; LHW = "兰州"; XNN = "西宁"; HUZ = "惠州"; NKG = "南京"
  TNA = "济南"; WUX = "无锡"; CKG = "重庆"; YIH = "宜昌"; XIY = "西安"
  CGO = "郑州"; HAK = "海口"
}

$countryNames = @{
  CN = "中国"; HK = "中国香港"; KH = "柬埔寨"; SG = "新加坡"; AU = "澳大利亚"
  ID = "印度尼西亚"; MY = "马来西亚"; VN = "越南"; BN = "文莱"; JP = "日本"
  AE = "阿联酋"; ES = "西班牙"; DE = "德国"
}

$airlineNames = @{
  CZ = "China Southern Airlines"; MF = "Xiamen Airlines"; SQ = "Singapore Airlines"
  JQ = "Jetstar"; OD = "Batik Air Malaysia"; AK = "AirAsia"; BI = "Royal Brunei Airlines"
  CA = "Air China"; NS = "Hebei Airlines"; CX = "Cathay Pacific"; MU = "China Eastern Airlines"
  EK = "Emirates"; VY = "Vueling"; HX = "Hong Kong Airlines"; ZH = "Shenzhen Airlines"
  HO = "Juneyao Air"
}

function Parse-AirportLabel {
  param([string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value) -or $Value.Length -lt 3) {
    return $null
  }
  $code = $Value.Substring(0, 3).ToUpperInvariant()
  $rest = $Value.Substring(3).Trim()
  $terminal = "—"
  if ($rest -match "(T\d+|MAIN|M|B)$") {
    $terminal = $Matches[1]
    $rest = $rest.Substring(0, $rest.Length - $terminal.Length).Trim()
  }
  return [ordered]@{ code = $code; label = $rest; terminal = $terminal }
}

function Parse-Fare {
  param([string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) { return $null }
  if ($Value -match "^\s*(\d+(?:\.\d+)?)\s*/\s*(\d+(?:\.\d+)?)\s*$") {
    return [math]::Round(([double]$Matches[1]) / ([double]$Matches[2]), 0)
  }
  $number = 0.0
  if ([double]::TryParse($Value, [ref]$number)) {
    return [math]::Round($number, 0)
  }
  return $null
}

function Parse-Duration {
  param([string]$Value)
  if ($Value -match "(\d+)h\s*(\d+)min") {
    $hours = [int]$Matches[1]
    $minutes = [int]$Matches[2]
    return [ordered]@{ text = "${hours}h ${minutes}m"; minutes = $hours * 60 + $minutes }
  }
  return [ordered]@{ text = $Value; minutes = 0 }
}

$sourceRows = @(Import-Csv -LiteralPath $CsvPath -Encoding UTF8)
$completeRows = @($sourceRows | Where-Object {
  -not [string]::IsNullOrWhiteSpace($_.Date) -and
  -not [string]::IsNullOrWhiteSpace($_.'Flight number') -and
  -not [string]::IsNullOrWhiteSpace($_.'Dept Airport') -and
  -not [string]::IsNullOrWhiteSpace($_.'Arrival Airport') -and
  -not [string]::IsNullOrWhiteSpace($_.'Distance(km)')
})

$codes = [System.Collections.Generic.HashSet[string]]::new()
foreach ($row in $completeRows) {
  $from = Parse-AirportLabel $row.'Dept Airport'
  $to = Parse-AirportLabel $row.'Arrival Airport'
  if ($from) { [void]$codes.Add($from.code) }
  if ($to) { [void]$codes.Add($to.code) }
}

$airportLookup = @{}
$typeScore = @{ large_airport = 4; medium_airport = 3; small_airport = 2; seaplane_base = 1 }
foreach ($airport in (Import-Csv -LiteralPath $AirportCsvPath -Encoding UTF8)) {
  $code = $airport.iata_code
  if (-not $codes.Contains($code)) { continue }
  $score = if ($typeScore.ContainsKey($airport.type)) { $typeScore[$airport.type] } else { 0 }
  if (-not $airportLookup.ContainsKey($code) -or $score -gt $airportLookup[$code].score) {
    $airportLookup[$code] = [ordered]@{ row = $airport; score = $score }
  }
}

$labelByCode = @{}
foreach ($row in $completeRows) {
  foreach ($value in @($row.'Dept Airport', $row.'Arrival Airport')) {
    $parsed = Parse-AirportLabel $value
    if ($parsed -and -not $labelByCode.ContainsKey($parsed.code)) {
      $labelByCode[$parsed.code] = $parsed.label
    }
  }
}

$airports = [ordered]@{}
foreach ($code in ($codes | Sort-Object)) {
  if (-not $airportLookup.ContainsKey($code)) {
    throw "No airport coordinates found for IATA code $code"
  }
  $airport = $airportLookup[$code].row
  $countryCode = $airport.iso_country
  $airports[$code] = [ordered]@{
    code = $code
    city = if ($cityNames.ContainsKey($code)) { $cityNames[$code] } else { $airport.municipality }
    name = if ($labelByCode.ContainsKey($code)) { $labelByCode[$code] } else { $airport.name }
    country = if ($countryNames.ContainsKey($countryCode)) { $countryNames[$countryCode] } else { $countryCode }
    countryCode = $countryCode
    lat = [math]::Round([double]$airport.latitude_deg, 6)
    lon = [math]::Round([double]$airport.longitude_deg, 6)
  }
}

$flights = @()
$routeMap = [ordered]@{}
$id = 1
foreach ($row in $completeRows) {
  $from = Parse-AirportLabel $row.'Dept Airport'
  $to = Parse-AirportLabel $row.'Arrival Airport'
  $routeCodes = @($from.code, $to.code) | Sort-Object
  $routeId = ($routeCodes -join "-").ToLowerInvariant()
  $duration = Parse-Duration $row.Duration
  $flightNumber = $row.'Flight number'.Trim().ToUpperInvariant()
  $airlineCode = if ($flightNumber -match "^([A-Z0-9]{2})") { $Matches[1] } else { "" }
  $airlineName = if ($airlineNames.ContainsKey($airlineCode)) { $airlineNames[$airlineCode] } else { $row.Airline }
  $date = [datetime]::Parse($row.Date, [System.Globalization.CultureInfo]::InvariantCulture)
  $distance = [int][double]$row.'Distance(km)'
  $scope = if ($airports[$from.code].countryCode -eq $airports[$to.code].countryCode) { "domestic" } else { "international" }
  $flights += [ordered]@{
    id = $id
    routeId = $routeId
    from = $from.code
    to = $to.code
    date = $date.ToString("yyyy-MM-dd")
    airline = $airlineName
    airlineShort = $airlineCode
    flightNo = $flightNumber
    aircraft = $row.'Aircraft Type'
    registration = $row.'Registration No'
    depart = $row.'Dept Time'
    arrive = $row.'Arrival Time'
    duration = $duration.text
    durationMinutes = $duration.minutes
    distance = $distance
    terminalFrom = $from.terminal
    terminalTo = $to.terminal
    seat = if ([string]::IsNullOrWhiteSpace($row.Seat)) { "—" } else { $row.Seat }
    cabin = $row.Class
    fare = Parse-Fare $row.Price
    booking = "—"
    gate = "—"
    status = "Recorded"
    note = $row.notes
    scope = $scope
  }
  if (-not $routeMap.Contains($routeId)) {
    $routeMap[$routeId] = [ordered]@{
      id = $routeId
      from = $from.code
      to = $to.code
      count = 0
      distanceTotal = 0
    }
  }
  $routeMap[$routeId].count += 1
  $routeMap[$routeId].distanceTotal += $distance
  $id += 1
}

$routes = @($routeMap.Values | ForEach-Object {
  [ordered]@{
    id = $_.id
    from = $_.from
    to = $_.to
    count = $_.count
    distance = [math]::Round($_.distanceTotal / $_.count, 0)
  }
} | Sort-Object @{ Expression = { $_.count }; Descending = $true }, @{ Expression = { $_.id }; Descending = $false })

$output = [ordered]@{
  metadata = [ordered]@{
    sourceFile = [System.IO.Path]::GetFileName($CsvPath)
    airportCoordinateSource = "https://davidmegginson.github.io/ourairports-data/airports.csv"
    sourceRows = $sourceRows.Count
    importedFlights = $flights.Count
    excludedRows = $sourceRows.Count - $flights.Count
    generatedAt = (Get-Date).ToUniversalTime().ToString("o")
  }
  airports = $airports
  flights = $flights
  routes = $routes
}

$json = $output | ConvertTo-Json -Depth 8 -Compress
$javascript = "window.FLIGHT_ARCHIVE_DATA = $json;`n"
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputPath)
$outputDirectory = [System.IO.Path]::GetDirectoryName($resolvedOutput)
if (-not (Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}
Set-Content -LiteralPath $resolvedOutput -Value $javascript -Encoding UTF8

Write-Output "Imported $($flights.Count) complete flights; excluded $($sourceRows.Count - $flights.Count) incomplete/blank rows."
Write-Output "Airports: $($airports.Count); routes: $($routes.Count); output: $resolvedOutput"




