// components/Header.js
'use client';

import Image from 'next/image';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm fixed-top">
      <Container>
        <Navbar.Brand href="/">
           <Image 
            src="/logo-yuknikah.png" // Mengambil dari folder /public
            alt="yuknikah.id Logo"
            // SESUAIKAN ANGKA INI dengan rasio gambar Anda setelah di-crop
            // Coba dengan angka ini dulu, lalu ubah jika perlu.
            width={150} 
            height={40}
            priority
            style={{ height: 'auto', width: 'auto' }} // Menjaga rasio aspek
          />
        </Navbar.Brand>
        <div className="d-flex d-lg-none">
            <Button variant="dark" href="/registrasi">Uji Coba Gratis</Button>
            <Navbar.Toggle aria-controls="main-navbar" className="ms-2" />
        </div>
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/harga">Harga</Nav.Link>
            <Nav.Link href="/template">Template</Nav.Link>
            <Nav.Link href="/artikel">Artikel</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Button variant="dark" href="/registrasi" className="d-none d-lg-block">Uji Coba Gratis</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}