// app/dashboard/layout.js
'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Button,
  Offcanvas,
  Dropdown,
  Spinner,
} from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

function SidebarNav() {
  return (
    <Nav
      className="flex-column"
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFF',
        padding: '1.5rem',
        borderRight: '1px solid #dee2e6',
      }}
    >
      <Navbar.Brand href="/" className="mb-4">
        <Image src="/logo-yuknikah.png" alt="Logo" width={150} height={40} />
      </Navbar.Brand>

      <p className="text-muted small text-uppercase">Content</p>
      <Nav.Link as={Link} href="/dashboard" className="fw-medium text-dark">
        Dashboard
      </Nav.Link>
      <Nav.Link as={Link} href="/dashboard/list-tema" className="fw-medium text-dark">
        List Tema
      </Nav.Link>
      <Nav.Link as={Link} href="/dashboard/cari-contoh" className="fw-medium text-dark">
        Cari Contoh
      </Nav.Link>

      <p className="text-muted small text-uppercase mt-4">Peluang</p>
      <Nav.Link as={Link} href="/dashboard/affiliator" className="fw-medium text-dark">
        Gabung Affiliator
      </Nav.Link>
      <Nav.Link as={Link} href="/dashboard/reseller" className="fw-medium text-dark">
        Gabung Reseller
      </Nav.Link>

      <p className="text-muted small text-uppercase mt-4">Akun</p>
      <Nav.Link as={Link} href="/dashboard/reset-password" className="fw-medium text-dark">
        Reset Password
      </Nav.Link>

      <div className="mt-auto">
        <hr />
        <SignOutButton />
      </div>
    </Nav>
  );
}

export default function DashboardLayout({ children }) {
  const [show, setShow] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 🔹 Ambil session dari /api/auth/session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session', { cache: 'no-store' });
        const data = await res.json();
        console.log('✅ Session data:', data);
        setSession(data?.user || null);
      } catch (err) {
        console.error('Gagal fetch session:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar Desktop */}
        <Col lg={2} className="d-none d-lg-block p-0">
          <SidebarNav />
        </Col>

        {/* Main Content */}
        <Col lg={10} md={12} style={{ padding: '1.5rem', backgroundColor: '#f8f9fa' }}>
          {/* Navbar Top */}
          <Navbar bg="light" className="mb-3 rounded d-flex justify-content-between px-3">
            {/* Mobile Button */}
            <Button variant="outline-secondary" className="d-lg-none" onClick={handleShow}>
              ☰
            </Button>

            {/* Status Login */}
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : session ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="d-flex align-items-center"
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
                    <SignOutButton />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <span className="text-muted">Belum login</span>
            )}
          </Navbar>

          {/* Offcanvas Sidebar (Mobile) */}
          <Offcanvas show={show} onHide={handleClose} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <SidebarNav />
            </Offcanvas.Body>
          </Offcanvas>

          {/* Content */}
          {children}
        </Col>
      </Row>
    </Container>
  );
}
