// app/layout.js
import './globals.css';
import PublicNav from './components/nav/PublicNav';
import { SessionProvider } from './providers/SessionProvider';

export const metadata = {
  title: { default: 'yuknikah — Undangan Digital', template: '%s · yuknikah' },
  description: 'Platform undangan digital dengan RSVP, buku tamu, dan check-in QR.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <SessionProvider>
          <PublicNav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
