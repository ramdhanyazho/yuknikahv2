// app/components/nav/PublicNav.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/tema', label: 'Tema' },
  { href: '/harga', label: 'Harga' },
  { href: '/demo', label: 'Demo' },
  { href: '/blog', label: 'Blog' },
];

export default function PublicNav() {
  const pathname = usePathname();
  return (
    <header className="container" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12 }}>
      <Link href="/" className="btn">JadiUndangan.id</Link>
      <nav style={{ display: 'flex', gap: 10, marginLeft: 'auto', alignItems: 'center' }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={`btn ${pathname === l.href ? 'primary' : ''}`}>{l.label}</Link>
        ))}
        <Link className="btn primary" href="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}
