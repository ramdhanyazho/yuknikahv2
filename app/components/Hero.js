// components/Hero.js
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Kolom Teks */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Buat Undangan Digital Gratis Untuk Momen Spesial Anda
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Coba sekarang dan buat undangan digital uji coba GRATIS untuk segala acara dalam waktu 5 menit. Bayar setelah jadi.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link href="/coba-gratis" className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
              Uji Coba Gratis
            </Link>
            <Link href="/hubungi-admin" className="bg-white text-green-500 border-2 border-green-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-colors">
              Dibuatin Admin Aja
            </Link>
          </div>
        </div>

        {/* Kolom Gambar */}
        <div className="relative h-96 md:h-full flex justify-center items-center">
            {/* Ganti `src` dengan path ke gambar mockup Anda */}
            {/* Anda bisa menggunakan gambar screenshot Anda untuk sementara */}
            <Image 
                src="/path/ke/gambar/mockup.png" // Ganti path ini!
                alt="Mockup Undangan Digital"
                width={500}
                height={500}
                className="object-contain"
            />
        </div>
      </div>
    </section>
  );
}