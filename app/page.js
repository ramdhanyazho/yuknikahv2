// app/page.js
'use client';

import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Optional (disarankan untuk mencegah Vercel pre-render error)
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
