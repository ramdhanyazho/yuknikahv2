// components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link href="/">IndoInvite</Link> {/* Ganti dengan logo/nama Anda */}
        </div>

        {/* Menu Navigasi (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
          <Link href="/harga" className="text-gray-600 hover:text-blue-500">Harga</Link>
          <Link href="/contoh" className="text-gray-600 hover:text-blue-500">Contoh</Link>
          <Link href="/template" className="text-gray-600 hover:text-blue-500">Template</Link>
          <Link href="/tutorial" className="text-gray-600 hover:text-blue-500">Tutorial</Link>
        </div>

        {/* Tombol Aksi (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/registrasi" className="text-gray-600 hover:text-blue-500">Registrasi</Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
          <Link href="/coba-gratis" className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-colors">
            Uji Coba Gratis
          </Link>
        </div>
        
        {/* Tombol Menu (Mobile) - bisa ditambahkan nanti */}
        <div className="md:hidden">
          <button>
            {/* Ikon hamburger menu */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}