import { Static, Type } from "@sinclair/typebox";

export const RawMetricSnapshotSchema = Type.Object(
  {
    PASSKEY: Type.String(),
    stationtype: Type.String(),
    dateutc: Type.String(),
    tempinf: Type.String(),
    humidityin: Type.String(),
    baromrelin: Type.String(),
    baromabsin: Type.String(),
    tempf: Type.String(),
    humidity: Type.String(),
    winddir: Type.String(),
    windspeedmph: Type.String(),
    windgustmph: Type.String(),
    maxdailygust: Type.String(),
    rainratein: Type.String(),
    eventrainin: Type.String(),
    hourlyrainin: Type.String(),
    dailyrainin: Type.String(),
    weeklyrainin: Type.String(),
    monthlyrainin: Type.String(),
    totalrainin: Type.String(),
    solarradiation: Type.String(),
    uv: Type.String(),
    wh65batt: Type.String(),
    freq: Type.String(),
    model: Type.String(),
  },
  { additionalProperties: true }
);

export interface WeatherMetricSnapshot {
  timestamp: number;
  tempInC: number;
  humidityIn: number;
  baromRelIn: number;
  baromAbsIn: number;
  tempC: number;
  humidity: number;
  windDir: number;
  windSpeedMs: number;
  windGustMs: number;
  maxDailyGust: number;
  rainRateIn: number;
  eventRainIn: number;
  hourlyRainIn: number;
  dailyRainIn: number;
  weeklyRainIn: number;
  monthlyRainIn: number;
  totalRainIn: number;
  solarRadiation: number;
  UV: number;
}

export type RawMetricResponse = Static<typeof RawMetricSnapshotSchema>;
