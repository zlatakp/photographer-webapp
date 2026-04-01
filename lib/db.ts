import { Pool } from 'pg';

// Re-use the connection pool across hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    // Give containers time to start before the first query
    connectionTimeoutMillis: 5000,
  });
}

const db: Pool = global._pgPool ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  global._pgPool = db;
}

export default db;
