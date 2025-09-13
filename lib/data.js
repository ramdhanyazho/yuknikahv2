// lib/data.js
import { turso } from './turso'; // Asumsi koneksi Turso ada di lib/turso.ts atau .js

export async function getUserByEmail(email) {
  try {
    const result = await turso.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });
    return result.rows[0] || null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}