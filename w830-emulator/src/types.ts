export interface WeatherPackage {
  PASSKEY: string;
  stationtype: string;
  dateutc: string;
  tempinf: number;
  tempf: number;
  humidityin: number;
  humidity: number;
  baromrelin: number;
  baromabsin: number;
  winddir: number;
  windspeedmph: number;
  windgustmph: number;
  maxdailygust: number;
  rainratein: number;
  eventrainin: number;
  hourlyrainin: number;
  dailyrainin: number;
  weeklyrainin: number;
  monthlyrainin: number;
  totalrainin: number;
  solarradiation: number;
  uv: number;
  wh65batt: number;
  freq: number;
  model: string;
}
