import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { getUserByEmail } from './lib/data'; // <-- Impor fungsi yang baru kita buat
import bcrypt from 'bcrypt';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // Validasi input menggunakan Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // 1. Cari pengguna di database
          const user = await getUserByEmail(email);
          if (!user) return null; // Jika pengguna tidak ditemukan

          // 2. Bandingkan password
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user; // Jika password cocok, login berhasil
        }

        console.log('Invalid credentials');
        return null; // Jika validasi gagal atau password salah
      },
    }),
  ],
});