// lib/data.js
import { db } from './turso';      // <-- 1. Impor 'db', bukan 'turso'
import { users } from './schema';    // <-- 2. Impor skema 'users'
import { eq } from 'drizzle-orm';  // <-- 3. Impor 'eq' untuk perbandingan

export async function getUserByEmail(email) {
  try {
    // 4. Gunakan sintaks Drizzle untuk mencari pengguna
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}