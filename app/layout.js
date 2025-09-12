// app/layout.js (Versi Baru)

import './globals.css';
// SessionProvider mungkin tidak Anda gunakan di sini, tergantung kebutuhan.
// Jika tidak ada login di halaman depan, ini bisa dihapus atau dibiarkan.
// import { SessionProvider } from './providers/SessionProvider'; 
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'IndoInvite — Undangan Digital', template: '%s · IndoInvite' },
  description: 'Buat undangan digital gratis untuk segala acara tanpa ribet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* <SessionProvider> */}
          {children}
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}