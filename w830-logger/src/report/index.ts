import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { WeatherMetricsDataStore } from "../connectors/metrics";
import { addSnapshot } from "../metrics";
import { RawMetricResponse, RawMetricSnapshotSchema, WeatherMetricSnapshot } from "../type";
import { parseSnapshot } from "../utils/parseSnapshot";

type NewMetricRequest = FastifyRequest<{
  Body: RawMetricResponse;
}>;
export async function RoutePlugin(fastify: FastifyInstance) {
  fastify.post(
    "/data/report/",
    {
      schema: {
        body: RawMetricSnapshotSchema,
      },
    },
    async (request: NewMetricRequest, reply: FastifyReply) => {
      console.log(request.body);

      const snapshot = parseSnapshot(request.body);
      fastify.log.info(`Creating metric - "${JSON.stringify(snapshot)}"`);

      addSnapshot(snapshot);

      try {
        const { client, collection } = await WeatherMetricsDataStore();
        await collection.insertOne(snapshot);
        await client.close();
      } catch (error) {
        fastify.log.error("Could not open MongoDB conenction, skipping");
      }

      return reply.status(201).send();
    }
  );
}
