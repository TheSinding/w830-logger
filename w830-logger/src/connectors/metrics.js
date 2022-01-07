"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherMetricsDatastore = void 0;
const mongodb_1 = require("mongodb");
if (!process.env.MONGODB_URI) {
    console.error("No mongodb URI");
    process.exit(1);
}
const WeatherMetricsDatastore = async () => {
    const client = new mongodb_1.MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const database = client.db("metrics");
    const collection = database.collection("weather");
    return { collection, client };
};
exports.WeatherMetricsDatastore = WeatherMetricsDatastore;
