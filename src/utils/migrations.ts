import { migrate } from "postgres-migrations";
import { Client } from "pg";
    
export async function applyMigrations(): Promise<void> {    
  const client = new Client({
  connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  try {
    await client.connect();
    await migrate({ client }, "./hasura/migrations");
  }
  finally {
    await client.end();
  }
}