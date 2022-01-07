"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawMetricSnapshotSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.RawMetricSnapshotSchema = typebox_1.Type.Object({
    PASSKEY: typebox_1.Type.String(),
    stationtype: typebox_1.Type.String(),
    dateutc: typebox_1.Type.String(),
    tempinf: typebox_1.Type.String(),
    humidityin: typebox_1.Type.String(),
    baromrelin: typebox_1.Type.String(),
    baromabsin: typebox_1.Type.String(),
    tempf: typebox_1.Type.String(),
    humidity: typebox_1.Type.String(),
    winddir: typebox_1.Type.String(),
    windspeedmph: typebox_1.Type.String(),
    windgustmph: typebox_1.Type.String(),
    maxdailygust: typebox_1.Type.String(),
    rainratein: typebox_1.Type.String(),
    eventrainin: typebox_1.Type.String(),
    hourlyrainin: typebox_1.Type.String(),
    dailyrainin: typebox_1.Type.String(),
    weeklyrainin: typebox_1.Type.String(),
    monthlyrainin: typebox_1.Type.String(),
    totalrainin: typebox_1.Type.String(),
    solarradiation: typebox_1.Type.String(),
    uv: typebox_1.Type.String(),
    wh65batt: typebox_1.Type.String(),
    freq: typebox_1.Type.String(),
    model: typebox_1.Type.String(),
}, { additionalProperties: true });
