// app/harga/page.js
import Header from '@/components/Header';
import PricingPage from '@/components/PricingPage';

export const metadata = {
  title: 'Harga Undangan Online Di yuknikah.id',
  description: 'Harga mulai 39ribu bisa sebar unlimited dan bebas pilih tema tanpa batas',
};

export default function Harga() {
  return (
    <div>
      <Header />
      <main>
        <PricingPage />
      </main>
      {/* Footer bisa ditambahkan di sini nanti */}
    </div>
  );
}