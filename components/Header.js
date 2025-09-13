// components/Header.js
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo Baru */}
        <Link href="/">
          <Image 
            src="/logo-yuknikah.png" // Memastikan path ini benar
            alt="yuknikah.id Logo"
            width={180}
            height={50}
            priority // Membuat logo dimuat lebih cepat
          />
        </Link>

        {/* Menu Navigasi (Desktop) */}
        <div className="hidden md:flex items-center space-x-8 text-lg">
          <Link href="/" className="text-gray-600 hover:text-pink-400">Home</Link>
          <Link href="/harga" className="text-gray-600 hover:text-pink-400">Harga</Link>
          <Link href="/template" className="text-gray-600 hover:text-pink-400">Template</Link>
          <Link href="/artikel" className="text-gray-600 hover:text-pink-400">Artikel</Link>
          <Link href="/login" className="text-gray-600 hover:text-pink-400">Login</Link>
        </div>

        {/* Tombol Aksi (Desktop) */}
        <div className="hidden md:flex">
          <Link href="/registrasi" className="bg-pink-400 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition-colors">
            Uji Coba Gratis
          </Link>
        </div>
      </nav>
    </header>
  );
}