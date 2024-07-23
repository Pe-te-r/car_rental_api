
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema"
import Stripe from "stripe";

export const client = new Client({
    connectionString: process.env.Database_URL as string, 
})

const main = async () => {
    await client.connect(); 
}
main();

export const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY as string,{
    apiVersion: '2024-06-20',
    typescript: true
});

const db = drizzle(client, { schema, logger: true })

export default db; 