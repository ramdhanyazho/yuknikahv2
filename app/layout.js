import 'bootstrap/dist/css/bootstrap.min.css';
import '@splidejs/react-splide/css';
import './globals.css';
import { Poppins, Dancing_Script } from 'next/font/google';

// Konfigurasi font Poppins untuk teks biasa
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins', // Menetapkan sebagai CSS variable
});

// Konfigurasi font Dancing Script untuk judul elegan
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing-script', // Menetapkan sebagai CSS variable
});

export const metadata = {
  title: 'yuknikah.id — Undangan Digital',
  description: 'Buat undangan pernikahan digital tanpa ribet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Menggabungkan kedua variabel font ke dalam body */}
      <body className={`${poppins.variable} ${dancingScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}