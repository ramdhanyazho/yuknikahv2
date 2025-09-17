// components/AvatarDropdown.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dropdown, Spinner } from 'react-bootstrap';
import SignOutButton from './SignOutButton';

export default function AvatarDropdown() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session', { cache: 'no-store' });
        const data = await res.json();

        console.log('🔍 DEBUG SESSION API response:', data);

        setSession(data?.user || null);
      } catch (err) {
        console.error('Gagal ambil session:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  console.log('🔍 DEBUG render session state:', session);

  if (loading) {
    return <Spinner animation="border" size="sm" />;
  }

  if (!session) {
    return (
      <Link href="/login" className="btn btn-outline-dark fw-semibold px-3">
        Login
      </Link>
    );
  }

  // 🔹 Null-safe handling
  const userName = session?.name || 'User';
  const avatarImage = session?.image || null;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        id="dropdown-basic"
        className="d-flex align-items-center border-0 bg-transparent"
      >
        {avatarImage ? (
          <img
            src={avatarImage}
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
            {userName[0].toUpperCase()}
          </div>
        )}
        <span className="fw-semibold">{userName}</span>
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
          <SignOutButton
            onLogout={() => {
              console.log('✅ Logout sukses, clear session');
              setSession(null);
            }}
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
