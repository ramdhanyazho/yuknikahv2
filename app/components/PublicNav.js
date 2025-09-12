// app/components/nav/PublicNav.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/tema', label: 'Tema' },
  { href: '/harga', label: 'Harga' },
  { href: '/demo', label: 'Demo' },
  { href: '/blog', label: 'Blog' },
];

export default function PublicNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="container" style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12 }}>
      <Link href="/" className="btn">yuknikah.id</Link>
      <nav style={{ display: 'flex', gap: 10, marginLeft: 'auto', alignItems: 'center' }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={`btn ${pathname === l.href ? 'primary' : ''}`}>
            {l.label}
          </Link>
        ))}
        {!session ? (
          <button className="btn accent" onClick={() => signIn()}>Masuk</button>
        ) : (
          <>
            <Link className="btn primary" href="/dashboard">Dashboard</Link>
            <button className="btn" onClick={() => signOut()}>Keluar</button>
          </>
        )}
      </nav>
    </header>
  );
}
