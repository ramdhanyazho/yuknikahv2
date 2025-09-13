// app/login/page.js
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import RegisterModal from '@/components/RegisterModal'; // <-- 1. Impor komponen Modal
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

export default function LoginPage() {
  // 2. Tambahkan state untuk mengontrol modal
  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  return (
    <div>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '60px', backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="align-items-center justify-content-center">
            {/* Kolom Gambar */}
            <Col lg={6} className="d-none d-lg-block">
              <Image 
                src="https://placehold.co/600x400/EFEFEF/333333?text=Gambar+Login"
                alt="Login illustration"
                width={600}
                height={400}
                className="img-fluid rounded-4"
              />
            </Col>
            
            {/* Kolom Form Login */}
            <Col lg={6} md={8}>
              {/* 3. Kirim fungsi untuk membuka modal ke LoginForm */}
              <LoginForm onRegisterClick={handleShowRegister} />
            </Col>
          </Row>
        </Container>
      </main>

      {/* 4. Panggil komponen Modal di sini */}
      <RegisterModal show={showRegister} handleClose={handleCloseRegister} />
    </div>
  );
}