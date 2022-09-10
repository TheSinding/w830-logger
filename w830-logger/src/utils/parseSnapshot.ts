import { WeatherMetricSnapshot, RawMetricResponse } from "../type";

const FIXED_LENGTH = 2
const MPH_MS_CONST = 0.44704;
const convertToNumber = (n: string | number, fixed?: number) => Number(Number(n).toFixed(fixed !== undefined ? fixed : FIXED_LENGTH))
const convertFtoC = (f: number): number => convertToNumber(((5 / 9) * (f - 32)));
const convertMphToMs = (mph: number) => convertToNumber(mph * MPH_MS_CONST);


export function parseSnapshot(rawSnapshot: RawMetricResponse): WeatherMetricSnapshot {
  return {
    timestamp: new Date(rawSnapshot.dateutc).getTime(),
    tempC: convertFtoC(Number(rawSnapshot.tempf)),
    tempInC: convertFtoC(Number(rawSnapshot.tempinf)),
    baromAbsIn: convertToNumber(rawSnapshot.baromabsin, 0),
    baromRelIn: convertToNumber(rawSnapshot.baromrelin, 0),
    humidity: convertToNumber(rawSnapshot.humidity, 0),
    humidityIn: convertToNumber(rawSnapshot.humidityin, 0),
    rainRateIn: convertToNumber(rawSnapshot.rainratein),
    hourlyRainIn: convertToNumber(rawSnapshot.hourlyrainin),
    dailyRainIn: convertToNumber(rawSnapshot.dailyrainin),
    weeklyRainIn: convertToNumber(rawSnapshot.weeklyrainin),
    monthlyRainIn: convertToNumber(rawSnapshot.monthlyrainin),
    eventRainIn: convertToNumber(rawSnapshot.eventrainin),
    totalRainIn: convertToNumber(rawSnapshot.totalrainin),
    windSpeedMs: convertMphToMs(Number(rawSnapshot.windspeedmph)),
    windGustMs: convertMphToMs(Number(rawSnapshot.windgustmph)),
    maxDailyGust: convertMphToMs(Number(rawSnapshot.maxdailygust)),
    windDir: Number(Number(rawSnapshot.winddir).toFixed(0)),
    UV: convertToNumber(rawSnapshot.uv, 0),
    solarRadiation: convertToNumber(rawSnapshot.solarradiation, 0),
  };
}
