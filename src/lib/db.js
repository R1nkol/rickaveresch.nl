import "server-only";
import pg from "pg";
import supabaseCa from "./supabaseCa.mjs";

export function getDatabasePool() {
  if (!globalThis._postgresPool) {
    const connectionString = process.env.DATABASE_URL?.trim();
    if (!connectionString) {
      throw new Error("Missing required environment variable: DATABASE_URL");
    }

    const url = new URL(connectionString);
    if (!url.searchParams.has("sslmode")) {
      url.searchParams.set("sslmode", "verify-full");
    }

    const usesSupabasePooler = url.hostname.endsWith(".pooler.supabase.com");
    if (usesSupabasePooler) {
      // pg replaces explicit SSL options when sslmode is present in the URI.
      url.searchParams.delete("sslmode");
    }

    const pool = new pg.Pool({
      connectionString: url.toString(),
      ...(usesSupabasePooler && {
        ssl: { ca: supabaseCa, rejectUnauthorized: true },
      }),
      max: 3,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
    });
    pool.on("error", (error) => {
      console.error("Unexpected database pool error", error.code);
    });
    globalThis._postgresPool = pool;
  }

  return globalThis._postgresPool;
}
