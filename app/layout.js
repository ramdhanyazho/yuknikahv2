// app/layout.js
import './globals.css';
import { Poppins, Dancing_Script } from 'next/font/google';

// Konfigurasi font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins', // Nama variabel untuk body
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing-script', // Nama variabel untuk judul/script
});

export const metadata = {
  title: 'yuknikah.id — Undangan Digital',
  description: 'Buat undangan digital elegan sesuai gaya Anda.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Menggabungkan variabel font di body */}
      <body className={`${poppins.variable} ${dancingScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}