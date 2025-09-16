// components/Header.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './Header.css';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  // Ambil inisial jika tidak ada foto profil
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  // Logout handler dengan refresh dan redirect
  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut({ redirect: false }); // jangan langsung redirect
    router.push('/login');              // arahkan manual ke login
    router.refresh();                   // paksa refresh session state
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      className="shadow-sm fixed-top"
      style={{ padding: '0.75rem 0' }}
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          <Image
            src="/logo-yuknikah.png"
            alt="yuknikah.id Logo"
            width={200}
            height={200}
            priority
            className="navbar-logo img-fluid"
          />
        </Navbar.Brand>

        <div className="d-flex d-lg-none">
          {!session && (
            <Button variant="dark" href="/registrasi" size="sm">
              Uji Coba Gratis
            </Button>
          )}
          <Navbar.Toggle aria-controls="main-navbar" className="ms-2 border-0" />
        </div>

        <Navbar.Collapse id="main-navbar">
          {/* NAVIGASI */}
          <Nav className="mx-auto fw-semibold">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/harga">Harga</Nav.Link>
            <Nav.Link as={Link} href="/contoh">Contoh</Nav.Link>
            <Nav.Link as={Link} href="/artikel">Artikel</Nav.Link>
          </Nav>

          {/* STATUS LOGIN */}
          {!session ? (
            <>
              <Button
                variant="outline-dark"
                as={Link}
                href="/login"
                className="fw-semibold me-2"
              >
                Login
              </Button>
              <Button
                variant="dark"
                href="/registrasi"
                className="d-none d-lg-block fw-semibold px-4"
              >
                Uji Coba Gratis
              </Button>
            </>
          ) : (
            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                id="dropdown-user"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="rounded-circle me-2"
                  />
                ) : (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#6c757d',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: '8px',
                    }}
                  >
                    {getInitials(session.user?.name)}
                  </div>
                )}
                <span className="fw-semibold">{session.user?.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} href="/dashboard/profil">
                  Profil Saya
                </Dropdown.Item>
                <Dropdown.Item as={Link} href="/dashboard/ganti-password">
                  Ganti Password
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} disabled={loggingOut}>
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
