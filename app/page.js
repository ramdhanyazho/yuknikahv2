// app/page.js
'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        {/* 
          Di sini kita bisa menambahkan komponen lain satu per satu:
          - Kategori Pilihan
          - Harga
          - Fitur
          - Testimoni
          - FAQ
          - Footer
        */}
      </main>
    </div>
  );
}
