"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutePlugin = void 0;
const metrics_1 = require("../connectors/metrics");
const type_1 = require("../type");
const parseSnapshot_1 = require("../utils/parseSnapshot");
const prometheusExporter_1 = require("../utils/prometheusExporter");
const cache = new Set();
async function RoutePlugin(fastify) {
    fastify.post("/data/report/", {
        schema: {
            body: type_1.RawMetricSnapshotSchema,
        },
    }, async (request, reply) => {
        const snapshot = parseSnapshot_1.parseSnapshot(request.body);
        fastify.log.info(`Creating metric - "${JSON.stringify(snapshot)}"`);
        cache.add(snapshot);
        const { client, collection } = await metrics_1.WeatherMetricsDatastore();
        await collection.insertOne(snapshot);
        await client.close();
        return reply.status(201).send();
    });
    fastify.get("/data/scrape", {}, async (request, reply) => {
        fastify.log.info("Sending metrics to scraper");
        const metrics = Array.from(cache);
        const lines = prometheusExporter_1.prometheusWeatherMetricExporter(metrics);
        cache.clear();
        reply.send(lines.join("\n"));
    });
}
exports.RoutePlugin = RoutePlugin;
