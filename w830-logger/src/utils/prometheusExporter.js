"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prometheusWeatherMetricExporter = exports.exportMetrics = exports.collectSnapshot = void 0;
const prom_client_1 = require("prom-client");
const registry = new prom_client_1.Registry();
const camelToSnakeCase = (str) => {
    let snake_case = str.replace(/[A-Z]+/g, (letter) => `_${letter.toLowerCase()}`);
    if (snake_case.startsWith("_"))
        snake_case = snake_case.slice(1);
    return snake_case;
};
const testObj = {
    timestamp: new Date("2021-12-29T09:43:57.000Z").getTime(),
    tempC: 2.9999999999999996,
    tempInC: 22.277777777777775,
    baromAbsIn: 29.581,
    baromRelIn: 29.634,
    humidity: 94,
    humidityIn: 47,
    rainRateIn: 0,
    hourlyRainIn: 0,
    dailyRainIn: 0,
    weeklyRainIn: 0,
    monthlyRainIn: 0,
    eventRainIn: 0,
    totalRainIn: 0,
    windSpeedMs: 0,
    windGustMs: 0,
    maxDailyGust: 0.491744,
    windDir: 220,
    UV: 0,
    solarRadiation: 7.7,
};
const temperatureGauge = new prom_client_1.Gauge({
    name: "temperature",
    help: "temperature_help",
    labelNames: ["location", "unit"],
    registers: [registry],
});
const barometerGuage = new prom_client_1.Gauge({
    name: "barometer",
    help: "barometer_help",
    labelNames: ["type"],
    registers: [registry],
});
const humidityGauge = new prom_client_1.Gauge({
    name: "humidity",
    help: "humidity_help",
    labelNames: ["location"],
    registers: [registry],
});
const windSpeedGauge = new prom_client_1.Gauge({
    name: "wind_speed",
    help: "wind_speed_help",
    registers: [registry],
});
const windDirectionGauge = new prom_client_1.Gauge({
    name: "wind_direction",
    help: "wind_direction_help",
    registers: [registry],
});
const solarRadiationGauge = new prom_client_1.Gauge({
    name: "solar_radiation",
    help: "solar_radiation_help",
    registers: [registry],
});
const uvRadiationGauge = new prom_client_1.Gauge({
    name: "uv_radiation",
    help: "uv_radiation_help",
    registers: [registry],
});
const collectSnapshot = (snapshot) => {
    temperatureGauge.set({ location: "in", unit: "c" }, snapshot.tempInC);
    temperatureGauge.set({ location: "out", unit: "c" }, snapshot.tempC);
    barometerGuage.set({ type: "relative" }, snapshot.baromRelIn);
    barometerGuage.set({ type: "abolute" }, snapshot.baromAbsIn);
};
exports.collectSnapshot = collectSnapshot;
const exportMetrics = () => {
    return registry.metrics();
};
exports.exportMetrics = exportMetrics;
exports.collectSnapshot(testObj);
exports.collectSnapshot({ ...testObj, tempC: 300 });
exports.exportMetrics().then((m) => console.log(m));
const prometheusWeatherMetricExporter = (snapshots) => {
    const metricName = "weather_station_metric";
    const lines = [];
    for (const snapshot of snapshots) {
        const keys = Object.keys(snapshot);
        const pairs = [];
        for (const key of keys) {
            const label = camelToSnakeCase(key);
            pairs.push(`${label}="${snapshot[key]}"`);
        }
        const line = `${metricName}{ ${pairs.join(", ")} } ${snapshot.timestamp}`;
        lines.push(line);
    }
    return lines;
};
exports.prometheusWeatherMetricExporter = prometheusWeatherMetricExporter;
exports.prometheusWeatherMetricExporter([testObj]);
