import { readFile } from "node:fs/promises";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());

const { getDatabasePool } = await import("../src/lib/db.js");
const command = process.argv[2];
const pool = getDatabasePool();

try {
  if (command === "setup") {
    const sql = await readFile(
      new URL("../supabase/migrations/20261020120000_create_contact_messages.sql", import.meta.url),
      "utf8",
    );
    await pool.query(sql);
    console.log("Supabase contact table configured.");
  } else if (command === "check") {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const { rows: [message] } = await client.query(
        "INSERT INTO public.contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id",
        ["Database connection test", "database-test@example.invalid", "Temporary connection test; rolled back."],
      );
      const { rows } = await client.query(
        "SELECT id FROM public.contact_messages WHERE id = $1",
        [message.id],
      );
      if (rows.length !== 1) throw new Error("Database read-back failed.");
    } finally {
      try {
        await client.query("ROLLBACK");
      } finally {
        client.release();
      }
    }
    console.log("Supabase connection, insert and read verified. Test message rolled back.");
  } else {
    throw new Error("Use npm run db:setup or npm run db:check.");
  }
} catch (error) {
  // Avoid logging connection strings or credentials.
  console.error("Database operation failed:", error.code ?? error.name, error.syscall ?? "", error.path ?? "");
  process.exitCode = 1;
} finally {
  await pool.end();
}
