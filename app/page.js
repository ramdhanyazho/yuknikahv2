'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';

// 🚨 WAJIB tambahkan agar tidak di-prerender secara statis oleh Vercel
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        {/* Tambahkan komponen lain di sini kalau perlu */}
      </main>
    </div>
  );
}
