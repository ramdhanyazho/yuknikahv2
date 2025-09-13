// components/Header.js
'use client';

import Image from 'next/image';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm fixed-top" style={{ padding: '0.75rem 0' }}>
      <Container>
        <Navbar.Brand href="/">
           <Image 
            src="/logo-yuknikah.png"
            alt="yuknikah.id Logo"
            width={200}
            height={55}
            priority
            style={{ width: 'auto', height: '55px' }} // Memastikan tinggi konsisten
          />
        </Navbar.Brand>
        <div className="d-flex d-lg-none">
            <Button variant="dark" href="/registrasi" size="sm">Uji Coba Gratis</Button>
            <Navbar.Toggle aria-controls="main-navbar" className="ms-2 border-0" />
        </div>
        <Navbar.Collapse id="main-navbar">
          {/* NAVIGASI SUDAH DISESUAIKAN */}
          <Nav className="mx-auto fw-semibold">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/harga">Harga</Nav.Link>
            <Nav.Link href="/template">Template</Nav.Link>
            <Nav.Link href="/artikel">Artikel</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Button variant="dark" href="/registrasi" className="d-none d-lg-block fw-semibold px-4">Uji Coba Gratis</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}