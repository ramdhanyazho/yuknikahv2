// app/login/page.js
'use client';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="container">
      <h1>Masuk Admin</h1>
      <p>Area admin dilindungi Basic Auth. Tekan tombol di bawah untuk masuk.</p>
      <Link className="btn primary" href="/dashboard">Masuk ke Dashboard</Link>
    </main>
  );
}
