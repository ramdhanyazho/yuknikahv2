// app/page.js
'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
