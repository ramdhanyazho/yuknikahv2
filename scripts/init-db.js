// scripts/init-db.js
import { readFileSync } from 'node:fs';
import { createClient } from '@libsql/client';

const db = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
const sql = readFileSync('schema.sql', 'utf8');

const statements = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
for (const s of statements) {
  // eslint-disable-next-line no-await-in-loop
  await db.execute(s);
}
console.log('Schema applied');
