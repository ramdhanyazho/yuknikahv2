// components/Header.js
'use client';

import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm fixed-top">
      <Container fluid className="mx-xl-5">
        <Navbar.Brand href="/">
          <img 
            src="/logo-indoinvite.png" // Asumsi Anda menyimpan logo di folder public
            alt="indoinvite" 
            style={{ height: '40px' }} 
          />
        </Navbar.Brand>
        <div className="d-flex d-lg-none">
            <Button variant="primary" className="me-2">Uji Coba Gratis</Button>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
        </div>
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/harga">Harga</Nav.Link>
            <Nav.Link href="/contoh">Contoh</Nav.Link>
            <NavDropdown title="Tools" id="tools-dropdown">
              <NavDropdown.Item href="/tools/ai-photo">Ubah Foto Jadi AI</NavDropdown.Item>
              <NavDropdown.Item href="/tools/chat-ai">Buat Undangan Di Chat AI</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Template" id="template-dropdown">
              <NavDropdown.Item href="/template/website">Website</NavDropdown.Item>
              <NavDropdown.Item href="/template/video">Video</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/tutorial">Tutorial</Nav.Link>
            <Nav.Link href="/artikel">Artikel</Nav.Link>
            <Nav.Link href="/registrasi">Registrasi</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Button variant="primary" className="d-none d-lg-block">Uji Coba Gratis</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}