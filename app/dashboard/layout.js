// app/dashboard/layout.js
'use client';

import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Button,
  Offcanvas,
} from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

// Komponen Sidebar Navigasi
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
      {/* 👉 Menu Reset Password diarahkan ke page */}
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar Desktop */}
        <Col lg={2} className="d-none d-lg-block p-0">
          <SidebarNav />
        </Col>

        {/* Main Content */}
        <Col lg={10} md={12} style={{ padding: '1.5rem', backgroundColor: '#f8f9fa' }}>
          {/* Navbar Mobile */}
          <Navbar bg="light" className="d-lg-none mb-3 rounded">
            <Container fluid>
              <Button variant="outline-secondary" onClick={handleShow}>
                ☰
              </Button>
              <Navbar.Text className="fw-bold">Nama Pengguna</Navbar.Text>
            </Container>
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
