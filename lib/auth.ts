// lib/auth.ts
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { db } from './turso';
import { users } from './schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { z } from 'zod';

async function getUserByEmail(email) {
  try {
    if (!email) return null;
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Database error fetching user:', error);
    return null;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Izinkan OAuth (Google, dll.) tanpa verifikasi email
      if (account.provider !== 'credentials') {
        try {
          const existingUser = await getUserByEmail(user.email);
          if (!existingUser) {
            await db.insert(users).values({
              name: user.name,
              email: user.email,
              // Password sengaja dibiarkan kosong (null)
            });
          }
          return true; // Izinkan login
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false; // Tolak login jika ada error database
        }
      }
      return true; // Izinkan login via credentials
    },
  },
});