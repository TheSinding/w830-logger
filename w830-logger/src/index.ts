require("dotenv").config();

import Fastify from "fastify";
import formBody from "fastify-formbody";
import { RoutePlugin as ReportRoute } from "./report";

const fastify = Fastify({ logger: true });

fastify.register(formBody);
fastify.register(ReportRoute);

fastify.listen(9000, "0.0.0.0").then((_) => {});
