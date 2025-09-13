// lib/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'), // <-- PERBAIKAN: .notNull() dihapus
  role: text('role').notNull().default('CLIENT'),
});

// ... sisa skema Anda (invitations, guests, dll) ...