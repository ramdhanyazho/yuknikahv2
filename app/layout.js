// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css'; // <-- INI KUNCI UTAMANYA
import '@splidejs/react-splide/css';
import './globals.css';
import { Poppins, Dancing_Script } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dancing-script',
});

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