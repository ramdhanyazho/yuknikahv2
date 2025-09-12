// app/layout.js (Versi Baru)
import './globals.css';
import { SessionProvider } from './providers/SessionProvider';
import { Inter } from 'next/font/google'; // Menggunakan font modern yang bersih

const inter = Inter({ subsets: ['latin'] });

// Ganti metadata agar sesuai dengan branding baru (opsional)
export const metadata = {
  title: { default: 'IndoInvite — Undangan Digital', template: '%s · IndoInvite' },
  description: 'Buat undangan digital gratis untuk segala acara tanpa ribet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* SessionProvider tetap kita butuhkan untuk mengelola login secara global */}
        <SessionProvider>
          {/* Hapus <PublicNav /> dari sini.
            Sekarang, setiap halaman atau grup halaman bertanggung jawab
            atas navigasinya sendiri.
          */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}