import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { WeatherMetricsDatastore } from "../connectors/metrics";
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
      const snapshot = parseSnapshot(request.body);
      fastify.log.info(`Creating metric - "${JSON.stringify(snapshot)}"`);

      addSnapshot(snapshot)

      const { client, collection } = await WeatherMetricsDatastore();

      await collection.insertOne(snapshot);
      await client.close();

      return reply.status(201).send();
    }
  );
}
