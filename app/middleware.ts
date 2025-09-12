// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = [/^\/dashboard/, /^\/guests/, /^\/media/, /^\/checkin/, /^\/statistik/, /^\/settings/];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = PROTECTED.some(rx => rx.test(pathname));
  if (!needsAuth) return NextResponse.next();

  const auth = req.headers.get('authorization');
  const user = process.env.BASIC_AUTH_USER || '';
  const pass = process.env.BASIC_AUTH_PASS || '';

  if (auth && user && pass) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic') {
      const [u, p] = Buffer.from(encoded || '', 'base64').toString().split(':');
      if (u === user && p === pass) {
        return NextResponse.next();
      }
    }
  }

  const res = new NextResponse('Authentication required', { status: 401 });
  res.headers.set('WWW-Authenticate', 'Basic realm="yuknikah-admin"');
  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/guests/:path*',
    '/media/:path*',
    '/checkin/:path*',
    '/statistik/:path*',
    '/settings/:path*',
  ],
};
