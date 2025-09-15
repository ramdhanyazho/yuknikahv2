// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '@splidejs/react-splide/css';
import './globals.css';
import { Poppins, Dancing_Script } from 'next/font/google';

// Konfigurasi font Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

// Konfigurasi font Dancing Script
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing-script',
});

// WAJIB: untuk menghindari SSG error ketika child pakai useSession
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'yuknikah.id — Undangan Digital',
  description: 'Buat undangan pernikahan digital tanpa ribet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${dancingScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
