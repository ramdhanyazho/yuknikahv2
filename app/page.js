// app/page.js (Versi Baru)
import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        {/* Anda bisa menambahkan section lain di sini nanti */}
      </main>
      {/* Anda bisa menambahkan komponen Footer di sini nanti */}
    </div>
  );
}