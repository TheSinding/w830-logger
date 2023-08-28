require("dotenv").config();

import Fastify from "fastify";
import formBody from "@fastify/formbody";
import { RoutePlugin as ReportRoute } from "./report";
import { plugin as MetricsPlugin } from "./metrics";

const fastify = Fastify({ logger: true });

fastify.register(formBody);
fastify.register(ReportRoute);
fastify.register(MetricsPlugin);

fastify.listen({ port: 9000, host: "0.0.0.0" }).then((_) => {});
