// app/(admin)/layout.js
import Link from 'next/link';
import './admin.css';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: { default: 'Admin · yuknikah', template: '%s · Admin · yuknikah' },
  description: 'Kelola undangan, tamu, RSVP, ucapan, media, dan check-in.',
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession();
  if (!session) redirect('/login');

  return (
    <section className="admin-shell">
      <aside className="admin-aside">
        <div className="brand"><span className="brand-mark">💍</span><span className="brand-name">yuknikah</span></div>
        <nav className="admin-nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/guests">Tamu</Link>
          <Link href="/rsvp">RSVP</Link>
          <Link href="/wishes">Ucapan</Link>
          <Link href="/media">Media</Link>
          <Link href="/checkin">Check‑in</Link>
          <Link href="/statistik">Statistik</Link>
          <Link href="/settings">Pengaturan</Link>
        </nav>
        <div className="admin-meta"><small>v1 • Admin</small></div>
      </aside>
      <div className="admin-main">
        <header className="admin-header"><h1>Panel Admin</h1></header>
        <main className="admin-content">{children}</main>
        <footer className="admin-footer"><small>© {new Date().getFullYear()} yuknikah</small></footer>
      </div>
    </section>
  );
}
