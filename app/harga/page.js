// app/harga/page.js
import Header from '@/components/Header';
import PricingPage from '@/components/PricingPage';
import Head from 'next/head';

export const metadata = {
  title: 'Harga Buat Undangan Online Di yuknikah.id',
  description: 'Harga mulai 39ribu bisa sebar unlimited dan bebas pilih tema tanpa batas',
};

export default function Harga() {
  return (
    <div>
      <Header />
      <main>
        <PricingPage />
      </main>
      {/* Di sini bisa ditambahkan footer nanti */}
    </div>
  );
}