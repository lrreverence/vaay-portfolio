import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Redis } from "@upstash/redis";

async function clearCache() {
  // clear existing data
  (await Redis.fromEnv()).flushdb();
}

clearCache();
