// lib/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { query } from '@/lib/db';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const res = await query(
          'SELECT id, name, email, password, role FROM users WHERE email = ?',
          [email]
        );

        if (res.rows.length === 0) return null;

        const user = res.rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
