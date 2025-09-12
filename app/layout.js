// app/layout.js (Versi Baru)

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
// SessionProvider bisa diaktifkan kembali jika dibutuhkan untuk login
// import { SessionProvider } from './providers/SessionProvider'; 
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Metadata sudah disesuaikan dengan nama baru 'yuknikah.id'
export const metadata = {
  title: { default: 'yuknikah.id — Undangan Digital', template: '%s · yuknikah.id' },
  description: 'Buat undangan digital gratis untuk segala acara tanpa ribet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* <SessionProvider> */}
          {children}
        {/* </Session-Provider> */}
      </body>
    </html>
  );
}