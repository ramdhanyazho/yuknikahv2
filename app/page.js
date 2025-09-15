'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { useSession } from 'next-auth/react';

// 🚨 Tambahkan agar tidak diprerender saat build
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div>
      <Header />
      <main>
        <Hero />
        {/* Komponen lainnya bisa ditambahkan di bawah ini */}
        {/* - Kategori Pilihan */}
        {/* - Harga */}
        {/* - Fitur */}
        {/* - Testimoni */}
        {/* - FAQ */}
        {/* - Footer */}
      </main>
    </div>
  );
}
