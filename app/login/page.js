'use client'; // <-- TAMBAHKAN BARIS INI

import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '60px', backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="align-items-center justify-content-center">
            <Col lg={6} className="d-none d-lg-block">
              <Image 
                src="https://placehold.co/600x400/EFEFEF/333333?text=Gambar+Login"
                alt="Login illustration"
                width={600}
                height={400}
                className="img-fluid rounded-4"
              />
            </Col>
            <Col lg={6} md={8}>
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}