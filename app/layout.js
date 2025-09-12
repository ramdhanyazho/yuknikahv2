// app/layout.js
import './globals.css';

export const metadata = {
  title: {
    default: 'yuknikah — Undangan Digital',
    template: '%s · yuknikah',
  },
  description: 'Platform undangan pernikahan digital dengan RSVP dan buku tamu.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'yuknikah — Undangan Digital',
    description: 'Platform undangan pernikahan digital dengan RSVP dan buku tamu.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yuknikah — Undangan Digital',
    description: 'Platform undangan pernikahan digital dengan RSVP dan buku tamu.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
