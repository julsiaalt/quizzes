import { postgres, PostgresStore } from "../deps.js";
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const DATABASE_URL = env["DATABASE_URL"];

let sql;
if (DATABASE_URL) {
  sql = postgres(DATABASE_URL);
} else {
  sql = postgres({});
}

// Pass postgres connection into a new PostgresStore. Optionally add a custom table name as second string argument, default is 'sessions'
const store = new PostgresStore(sql)

// Initialize sessions table. Will create a table if one doesn't exist already.
await store.initSessionsTable()

export { sql, store };