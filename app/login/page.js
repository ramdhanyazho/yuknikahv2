// app/login/page.js
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm'; // Impor komponen form
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

export const metadata = {
  title: 'Login | yuknikah.id',
  description: 'Masuk ke akun yuknikah.id Anda.',
};

export default function LoginPage() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: '120px', paddingBottom: '60px', backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="align-items-center justify-content-center">
            {/* Kolom Gambar (kiri) */}
            <Col lg={6} className="d-none d-lg-block">
              <Image 
                src="https://placehold.co/600x400/EFEFEF/333333?text=Gambar+Login" // Ganti dengan gambar Anda di /public
                alt="Login illustration"
                width={600}
                height={400}
                className="img-fluid rounded-4"
              />
            </Col>
            
            {/* Kolom Form (kanan) */}
            <Col lg={6} md={8}>
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}