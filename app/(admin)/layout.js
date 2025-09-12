// app/(admin)/layout.js
import Link from 'next/link';
import './admin.css';

export const metadata = {
  title: {
    default: 'Admin · yuknikah',
    template: '%s · Admin · yuknikah',
  },
  description: 'Area admin untuk mengelola undangan, RSVP, dan buku tamu.',
};

export default function AdminLayout({ children }) {
  return (
    <section className="admin-shell">
      <aside className="admin-aside">
        <div className="brand">
          <span className="brand-mark">💍</span>
          <span className="brand-name">yuknikah</span>
        </div>
        <nav className="admin-nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/">Lihat Situs</Link>
        </nav>
        <div className="admin-meta">
          <small>v1 • Admin</small>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <h1>Panel Admin</h1>
        </header>
        <main className="admin-content">
          {children}
        </main>
        <footer className="admin-footer">
          <small>© {new Date().getFullYear()} yuknikah</small>
        </footer>
      </div>
    </section>
  );
}
