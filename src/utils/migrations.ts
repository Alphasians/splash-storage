import { migrate } from "postgres-migrations";
import pg  from "pg";
    
export async function applyMigrations(): Promise<void> {    
  const dbConfig = {
  connectionString: process.env.DATABASE_URL,
    // ssl: {
    //   rejectUnauthorized: false
    // }
  };
  const client = new pg.Client(dbConfig);
  try {
    await client.connect();
    await migrate({ client }, "./migrations");
  }
  finally {
    await client.end();
  }
}