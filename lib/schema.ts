// lib/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Skema untuk tabel users
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').notNull().default('CLIENT'),
});

// Skema untuk tabel invitations
export const invitations = sqliteTable('invitations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  slug: text('slug').notNull().unique(),
  brideName: text('bride_name').notNull(),
  groomName: text('groom_name').notNull(),
  eventDate: text('event_date').notNull(),
});

// Skema untuk tabel guests
export const guests = sqliteTable('guests', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    invitationId: integer('invitation_id').notNull().references(() => invitations.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    phone: text('phone'),
    token: text('token').notNull().unique(),
    checkedInAt: text('checked_in_at'),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});