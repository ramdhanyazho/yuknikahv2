// lib/auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Arahkan pengguna ke halaman /login jika belum login
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Jika mencoba akses dashboard tanpa login, blokir
      } else if (isLoggedIn) {
        // Jika sudah login dan mencoba akses halaman login/register, arahkan ke dashboard
        if (nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/registrasi')) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
      return true;
    },
  },
  providers: [], // Biarkan kosong, karena provider (Google, Credentials) kita definisikan di auth.ts
} satisfies NextAuthConfig;