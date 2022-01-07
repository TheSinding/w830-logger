import { WeatherMetricSnapshot, RawMetricResponse } from "../type";

const MPH_MS_CONST = 0.44704;
const convertFtoC = (f: number) => (5 / 9) * (f - 32);
const convertMphToMs = (mph: number) => mph * MPH_MS_CONST;

export function parseSnapshot(rawSnapshot: RawMetricResponse): WeatherMetricSnapshot {
  return {
    timestamp: new Date(rawSnapshot.dateutc).getTime(),
    tempC: convertFtoC(Number(rawSnapshot.tempf)),
    tempInC: convertFtoC(Number(rawSnapshot.tempinf)),
    baromAbsIn: Number(rawSnapshot.baromabsin),
    baromRelIn: Number(rawSnapshot.baromrelin),
    humidity: Number(rawSnapshot.humidity),
    humidityIn: Number(rawSnapshot.humidityin),
    rainRateIn: Number(rawSnapshot.rainratein),
    hourlyRainIn: Number(rawSnapshot.hourlyrainin),
    dailyRainIn: Number(rawSnapshot.dailyrainin),
    weeklyRainIn: Number(rawSnapshot.weeklyrainin),
    monthlyRainIn: Number(rawSnapshot.monthlyrainin),
    eventRainIn: Number(rawSnapshot.eventrainin),
    totalRainIn: Number(rawSnapshot.totalrainin),
    windSpeedMs: convertMphToMs(Number(rawSnapshot.windspeedmph)),
    windGustMs: convertMphToMs(Number(rawSnapshot.windgustmph)),
    maxDailyGust: convertMphToMs(Number(rawSnapshot.maxdailygust)),
    windDir: Number(rawSnapshot.winddir),
    UV: Number(rawSnapshot.uv),
    solarRadiation: Number(rawSnapshot.solarradiation),
  };
}
