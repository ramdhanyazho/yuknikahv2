// lib/db-edge.js (opsional)
import { connect } from '@tursodatabase/serverless';
export const conn = connect({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
