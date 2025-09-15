'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';

export const dynamic = 'force-dynamic'; // WAJIB agar useSession tidak error saat prerender

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        {/* Tambahkan komponen lain di sini jika ada */}
      </main>
    </div>
  );
}
