import { Client } from 'pg';

export async function cleanupTestUser(email: string): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }

  const url = new URL(databaseUrl);
  const databaseName = url.pathname.slice(1);

  if (databaseName !== 'pc_architect_test') {
    throw new Error(
      `Cleanup blocked: unexpected database "${databaseName}"`
    );
  }

  const client = new Client({
    connectionString: databaseUrl
  });

  try {
    await client.connect();

    await client.query(
      'DELETE FROM "User" WHERE email = $1',
      [email]
    );
  } finally {
    await client.end();
  }
}