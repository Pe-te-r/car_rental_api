"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = exports.client = void 0;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schema = require("./schema");
const stripe_1 = require("stripe");
exports.client = new pg_1.Client({
    connectionString: process.env.Database_URL,
});
const main = async () => {
    await exports.client.connect();
};
main();
exports.stripe = new stripe_1.default(process.env.STRIPE_SECRET_API_KEY, {
    apiVersion: '2024-06-20',
    typescript: true
});
const db = (0, node_postgres_1.drizzle)(exports.client, { schema, logger: true });
exports.default = db;
