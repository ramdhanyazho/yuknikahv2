import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Anda bisa memindahkan metadata ini ke app/layout.js jika ingin
export const metadata = {
  title: 'IndoInvite — Undangan Digital',
  description: 'Buat undangan digital gratis untuk segala acara tanpa ribet.',
};

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        {/* Di sini Anda bisa menambahkan section lain seperti Fitur, Harga, dll. */}
      </main>
      {/* Di sini Anda bisa menambahkan komponen Footer */}
    </div>
  );
}