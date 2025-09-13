// components/PricingPage.js
'use client';

import { useState } from 'react';

// Data untuk paket harga "Satuan"
const satuanPackages = [
  { name: 'Free', price: '0', description: 'Uji coba gratis tanpa batasan waktu', features: ['Akses Seluruh Tema', 'Ubah Nama Tamu', 'Tanpa Masa Aktif', 'RSVP & Ucapan'], primary: false },
  { name: 'Basic', price: '39.000', description: 'Tanpa musik & titip hadiah', features: ['Semua Fitur Free', 'Bisa Disebar'], primary: false },
  { name: 'Pro', price: '69.000', description: 'Bisa foto galery & titip hadiah', features: ['Semua Fitur Basic', 'Foto Gallery', 'Rekening Titip Hadiah', 'Musik'], primary: true },
  { name: 'Premium', price: '119.000', description: 'Semua fitur tanpa batas', features: ['Semua Fitur Pro', 'Unlimited Revisi', 'Custom Musik', 'Love Story'], primary: false },
];

// Komponen Card untuk setiap paket
function PriceCard({ name, price, description, features, primary }) {
  const cardClass = primary 
    ? "bg-white p-8 rounded-xl shadow-2xl border-2 border-theme-pink transform scale-105" 
    : "bg-white p-8 rounded-xl shadow-lg";

  return (
    <div className={cardClass}>
      <h3 className="text-2xl font-semibold text-theme-dark-text">{name}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
      <div className="mt-6 bg-theme-pink text-white rounded-lg p-4 text-center">
        <span className="text-xl">Rp.</span>
        <span className="text-5xl font-bold">{price}</span>
      </div>
      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-3 text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full mt-8 py-3 rounded-lg font-semibold text-lg ${primary ? 'bg-theme-pink text-white hover:opacity-90' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
        Pilih Paket
      </button>
    </div>
  );
}


export default function PricingPage() {
  // State untuk toggle belum kita buat, fokus ke tampilan dulu
  // const [isSubscription, setIsSubscription] = useState(false);
  const packages = satuanPackages;

  return (
    <section className="py-20" style={{ marginTop: '70px' }}>
      <div className="container mx-auto px-6">
        <div className="text-center text-theme-dark-text mb-12">
            <h1 className="text-5xl font-bold font-script">Harga Undangan Online</h1>
            <p className="lead text-gray-600 mt-4 text-xl">
                Temukan paket yang sesuai dengan kebutuhan Anda!
            </p>
        </div>
      
        {/* Kita akan tampilkan dalam grid, bukan carousel, agar lebih elegan di semua perangkat */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
                <div key={index}>
                    <PriceCard {...pkg} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}