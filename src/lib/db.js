import mysql from "mysql2/promise";

let pool = globalThis._databasePool ?? null;

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getDatabasePool() {
  if (!pool) {
    const host = getRequiredEnv("DATABASE_HOST");
    const port = Number(process.env.DATABASE_PORT ?? 3306);
    const user = getRequiredEnv("DATABASE_USER");
    const password = getRequiredEnv("DATABASE_PASSWORD");
    const database = getRequiredEnv("DATABASE_NAME");

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    globalThis._databasePool = pool;
  }

  return pool;
}

export async function ensureContactTable() {
  const pool = getDatabasePool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(191) NOT NULL,
      email VARCHAR(191) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}
