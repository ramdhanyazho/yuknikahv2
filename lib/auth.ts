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

          // 1. Pastikan pengguna ada DAN memiliki password (bukan akun Google)
          if (!user || !user.password) {
            console.log('Login manual gagal: Pengguna tidak ditemukan atau tidak memiliki password.');
            return null;
          }

          // 2. Bandingkan password yang diinput dengan yang ada di database
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            console.log('Login manual berhasil untuk:', user.email);
            return user; // Jika cocok, login berhasil
          }
        }
        
        console.log('Login manual gagal: Kredensial tidak valid.');
        return null; // Jika password salah atau input tidak valid
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        try {
          const existingUser = await getUserByEmail(user.email);
          if (!existingUser) {
            await db.insert(users).values({
              name: user.name,
              email: user.email,
            });
          }
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },
  },
});