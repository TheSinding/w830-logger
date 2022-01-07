"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const fastify_1 = __importDefault(require("fastify"));
const fastify_formbody_1 = __importDefault(require("fastify-formbody"));
const report_1 = require("./report");
const fastify = fastify_1.default({ logger: true });
fastify.register(fastify_formbody_1.default);
fastify.register(report_1.RoutePlugin);
fastify.listen(9000, "0.0.0.0").then((_) => { });
