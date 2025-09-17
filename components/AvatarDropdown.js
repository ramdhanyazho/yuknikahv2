// components/AvatarDropdown.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dropdown, Spinner } from 'react-bootstrap';
import SignOutButton from './SignOutButton';

export default function AvatarDropdown() {
  const [session, setSession] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch session fresh tiap kali
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session', { cache: 'no-store' });
        const data = await res.json();
        setSession(data?.user || null);
      } catch (err) {
        console.error('Gagal ambil session:', err);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  if (loading) {
    return <Spinner animation="border" size="sm" />;
  }

  // 👉 Jangan render dropdown kalau belum login
  if (!session) {
    return (
      <Link href="/login" className="btn btn-outline-dark fw-semibold px-3">
        Login
      </Link>
    );
  }

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        id="dropdown-basic"
        className="d-flex align-items-center border-0 bg-transparent"
      >
        {session?.image ? (
          <img
            src={session.image}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-circle me-2"
          />
        ) : (
          <div
            className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2"
            style={{ width: 32, height: 32, fontSize: 14 }}
          >
            {session?.name ? session.name[0].toUpperCase() : 'U'}
          </div>
        )}
        <span className="fw-semibold">{session?.name || 'User'}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} href="/dashboard/profil">
          Profil Saya
        </Dropdown.Item>
        <Dropdown.Item as={Link} href="/dashboard/reset-password">
          Ganti Password
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <SignOutButton onLogout={() => setSession(null)} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
