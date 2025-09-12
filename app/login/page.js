// app/login/page.js
'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <main className="container">
      <h1>Masuk ke Admin</h1>
      <p>Gunakan akun OAuth (contoh: GitHub) untuk mengakses dashboard.</p>
      <button className="btn primary" onClick={() => signIn('github')}>Masuk dengan GitHub</button>
    </main>
  );
}
